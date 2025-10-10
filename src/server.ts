import { createCanvas } from 'canvas';
import { readFile, writeFile } from 'node:fs/promises';
import Chart, { ChartItem } from 'chart.js/auto';

const FILE_PATHS = [
  'assets/Il-Gattopardo-_Italian-Edition_-Giuseppe-Tomasi.txt',
  "assets/L'amore molesto -- Elena Ferrante.txt",
];
const OUTPUT_FILE_PATH = 'res.txt';

async function loadTextContent(filePaths: string[]): Promise<string> {
  const contents = await Promise.all(
    filePaths.map((filePath) => readFile(filePath))
  );
  return contents.join('');
}

async function saveTextContent(textContent: string) {
  await writeFile(OUTPUT_FILE_PATH, textContent);
}

async function processTextContent(text: string): Promise<string> {
  const normalized = text
    .toLowerCase()
    .replace(/[^\p{L}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return normalized;
}

function countWords(text: string): Record<string, number> {
  const words = text.split(' ');
  const wordCount: Record<string, number> = {};

  for (const word of words) {
    if (word in wordCount) {
      wordCount[word]++;
    } else {
      wordCount[word] = 1;
    }
  }

  return wordCount;
}

function printTop500Words(wordCount: Record<string, number>) {
  const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);
  const top100Words = sortedWords.slice(0, 500);

  console.log('Top 500 words:');
  console.log(
    `${'word'.padEnd(20, ' ')}${'count'.padStart(4, ' ')}${'rank'.padStart(
      8,
      ' '
    )}${'count * rank'.padStart(20, ' ')}`
  );
  let rank = 1;
  for (const [word, count] of top100Words) {
    console.log(
      `${word.padEnd(20, ' ')}${count.toString().padStart(4, ' ')}${rank
        .toString()
        .padStart(8, ' ')}${(rank * count).toString().padStart(20, ' ')}`
    );
    rank++;
  }
}

function saveCountRankChart(
  wordCount: Record<string, number>,
  path: string
) {
  const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);

  const ranks: number[] = [];
  const countRankValues: number[] = [];

  sortedWords.forEach(([_, count], index) => {
    const rank = index + 1;
    ranks.push(rank);
    countRankValues.push(count * rank);
  });

  // Create a canvas
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Generate the chart
  new Chart(canvas as unknown as ChartItem, {
    type: 'line',
    data: {
      labels: ranks,
      datasets: [
        {
          label: 'Count * Rank',
          data: countRankValues,
          borderColor: 'green',
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Rank',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Count * Rank',
          },
        },
      },
    },
  });

  const buffer = canvas.toBuffer('image/png');
  return writeFile(path, buffer).then(() => {
    console.log(`Chart saved to ${path}`);
  });
}

function buildWordGraph(text: string): Record<string, Set<string>> {
  const wordGraph: Record<string, Set<string>> = {};
  const words = text.split(' ');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (!wordGraph[word]) {
      wordGraph[word] = new Set();
    }

    if (i < words.length - 1) {
      const nextWord = words[i + 1];
      wordGraph[word].add(nextWord);
    }
    if (i > 0) {
      const prevWord = words[i - 1];
      wordGraph[word].add(prevWord);
    }
  }

  return wordGraph;
}

function printWordsFromGraph(wordGraph: Record<string, Set<string>>) {
  const entries = Object.entries(wordGraph);
  entries.sort((a, b) => b[1].size - a[1].size);
  console.log('Top 100 words from graph:');
  for (let i = 0; i < Math.min(100, entries.length); i++) {
    console.log(
      `${entries[i][0].toString().padEnd(30, ' ')} ${entries[i][1].size
        .toString()
        .padStart(4, ' ')}`
    );
  }
}

function printCoreWords(wordGraph: Record<string, Set<string>>) {
  const entries = Object.entries(wordGraph);
  entries.sort((a, b) => b[1].size - a[1].size);
  let coreWords = entries
    .filter((entry) => entry[1].size >= 2000)
    .map((entry) => entry[0])
    .join(', ');
  console.log('Core words (more than 2000 connections):', coreWords);
}

async function saveCoreWordsGraph(
  wordGraph: Record<string, Set<string>>,
  path: string
) {
  const entries = Object.entries(wordGraph);
  entries.sort((a, b) => b[1].size - a[1].size);

  const ids: number[] = [];
  const connections: number[] = [];

  for (let i = 0; i < Math.min(100, entries.length); i++) {
    ids.push(i + 1);
    connections.push(entries[i][1].size);
  }

  // Create a canvas
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Generate the chart
  new Chart(canvas as unknown as ChartItem, {
    // Cast canvas to ChartItem
    type: 'line',
    data: {
      labels: ids,
      datasets: [
        {
          label: 'Core Words',
          data: connections,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'ID',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Connections',
          },
        },
      },
    },
  });

  const buffer = canvas.toBuffer('image/png');
  await writeFile(path, buffer);
  console.log(`Graph saved to ${path}`);
}

async function main() {
  const textContent = await loadTextContent(FILE_PATHS);
  console.log('Words before processing', textContent.split(' ').length);
  const processedContent = await processTextContent(textContent);
  await saveTextContent(processedContent);
  console.log('Words after processing', processedContent.split(' ').length);
  console.log(`Processed content saved to ${OUTPUT_FILE_PATH}`);

  const wordCount = countWords(processedContent);
  console.log('Unique words count:', Object.keys(wordCount).length);

  printTop500Words(wordCount);
  await saveCountRankChart(wordCount, 'count_rank_chart.png');

  const wordGraph = buildWordGraph(processedContent);
  printWordsFromGraph(wordGraph);

  await saveCoreWordsGraph(wordGraph, 'word_graph.png');

  printCoreWords(wordGraph);

}

main();
