# Prawo Zipfa

Najważniejsze prawo 

Sortujemy słowa po częstości występowania. Najwięcej zaimków, najmniej pomyłek / nazw własnych. Nas interesuje środek. Słowom przydzielamy rangi.

Języki, które nie spełniają prawa Zipfa są ciężkie do przyswojenia. Prawo Zipfa minimalizuje *energię* języka.

# Pierwsze zadanie

Każdy zespół dostanie język naturalny, trzeba zebrać zestaw tesktów w danym języku (można wziąć z wikipedii patrząc po artykułach). 100k wyrazów około trzeba zebrać (w postaci tekstów). Liczymy ile każde słowo się powtórzyło. Liczymy rangi statystyczne (z prawa Zipfa). W ostatniej kolumnie powinny być zbliżone wartości.


### Tworzymy tabelę

| słowo | r (ranga) | f (częstotliwość występowania) | r * f - iloczyn |
| --- | --- | --- | --- |
| pies | 1 | 54543 | 54543 |
| kundel | 2 | 12234 | 2*12234 |

### Tworzymy graf nieskierowany

Wierzchołki to unikatowe słowa, łączymy słowa gdy w jakimś tekście wystąpiły obok siebie. 

**Rdzeń języka** - wyrazy, które mają dużo krawędzi wychodzących od siebie. (np. *der, die, das* w niemieckim)

### Zadanie z gwiazdką (pół stopnia do góry) - zaliczenie na 3.5, bez tego na 3.0

Idziemy od góry tabelki i namierzamy pierwsze 50 rzeczowników i je tłumaczymy.

# Uruchomienie programu
W katalogu projektu zainstaluj(jeśli nie masz na vsc) typescript, tsx, chart.js+canvas.  
Komendą w katalogu projektu: npm install
## Uruchom tryb deweloperski
npm run dev  
W przypadku błędu "sh:1 tsx: not found" zainstaluj tsx ręcznie:  
npm install --save-dev tsx
## Działanie po starcie
Program analizuje język naturalny z prawem Zipfa.  
Wykorzystuje do tego kilka tekstów znajdujących się w folderze assets/.  
W naszym projekcie zastosowaliśmy artykuły w języku włoskim do analizy.
# Program:
1. Wczytuje teksty z folderu assets/
2. Przetwarza je -usuwa znaki interpunkcyjne, dzieli na słowa, zmienia na małe litery.
3. Liczy częstotliwości występowania każdych słów.
4. Nadaje rangi (r) - sortuje od najczęstszych do najrzadszych.
5. Oblicza prawo Zipfa za pomocą wzoru: r*f
6. Wynik wyświetlany jest:
   - w **konsoli**
   - w pliku **word_graph.png** jako wykres  

     `word_graph.png` przedstawia, jak wiele połączeń mają poszczególne słowa.

     - **Oś X ("ID")** – to kolejne słowa uporządkowane według liczby połączeń.  
       - Na początku osi są najważniejsze słowa (najczęściej występujące).  
       - Na końcu osi – najrzadziej używane słowa oraz te, które występują tylko kilka razy w języku.
     - **Oś Y ("Connections")** – to liczba połączeń danego słowa z innymi słowami.  
       - Im wyżej, tym częściej dane słowo jest używane w języku i różnych kontekstach.
     - **Niebieska linia ("Core words")** – obrazuje, jak szybko spada liczba połączeń,
       gdy przechodzimy od najczęstszych słów do najrzadszych.
7. W pliku **count_rank_chart.png** wykres przedstawia zależność **Count * Rank (oś Y)** od **Rank (oś X)**.  

   W idealnym przypadku, zgodnie z prawem Zipfa, iloczyn `Count * Rank` byłby **stały** — punkty tworzyłyby prostą równoległą do osi X.  

   Na wygenerowanym wykresie możemy zauważyć zbliżoną zależność dla przedziału **X ∈ (619, 2473)** — punkty tworzą kształt zbliżony do prostej.  

   Natomiast dla **X ∈ <1, 619>** widoczne są duże skoki na wykresie.  
   Odchylenia te spowodowane są częstym występowaniem **zaimków, przyimków i rodzajników** w języku włoskim (np. *il, la, di, e, a, che*), które zaburzają przebieg w punkcie X = 1.  

   Od przedziału **X ≥ 2473** można zauważyć, że częstotliwość występowań słów w języku prawie się nie zmienia, ale rośnie ich ranga.  
   W efekcie pojawia się coraz większe odchylenie wykresu.
8. W pliku **first_50_nouns.txt** zostały przedstawione 50 najczęściej wystepujących rzeczowników w języku włoskim na podstawie literatury wraz z ich tłumaczeniem na język polski.
# Wnioski
Prawo Zipfa głosi, że **częstość występowania słowa w danym języku jest odwrotnie proporcjonalna do jego rangi** w uporządkowanej liście słów:  
> f(r) = 1 / r

Oznacza to, że drugie najczęściej występujące słowo pojawia się około dwa razy rzadziej niż najczęstsze, trzecie trzy razy rzadziej itd.  
Zależność ta jest uniwersalna i występuje we wszystkich językach naturalnych — od angielskiego po włoski czy polski.

Na podstawie wykresu **`word_graph.png`** oraz **`count_rank_chart.png`** możemy stwierdzić, że **język włoski w dużym stopniu spełnia prawo Zipfa**.  

Analizując strukturę wykresów, można zauważyć, że:  
- posiadają **strome opadanie na początku**, co oznacza, że kilka słów (np. rodzajniki, zaimki, spójniki) występuje ekstremalnie często,  
- mają **długi, płaski ogon**, co wskazuje, że duża liczba słów pojawia się rzadko, tylko w specyficznych kontekstach,  
- kształt wykresu przypomina **hiperbolę**, zgodnie z zależnością `f ~ 1/r`, czyli częstość maleje odwrotnie proporcjonalnie do rangi.

Odchylenia od idealnego przebiegu wynikają z:  
- **bogatego słowotwórstwa języka włoskiego** (różne formy tego samego słowa),  
- **częstego użycia zaimków, przyimków i rodzajników** – takich jak *il, la, di, e, a, che*,  
- **ograniczonej liczby analizowanych tekstów** – próbka obejmowała jedynie wybrane artykuły, a nie cały korpus języka.

Analiza potwierdza, że język jest logicznym i samoregulującym się systemem – najczęstsze słowa pozwalają szybko przekazywać treść, a rzadkie dodają jej precyzji i znaczenia.
