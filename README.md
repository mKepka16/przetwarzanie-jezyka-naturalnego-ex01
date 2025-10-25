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

### Uruchomienie programu
W katalogu projektu zainstaluj(jeśli nie masz na vsc) typescript, tsx, chart.js+canvas:
Komendą w katalogu projektu: npm install
# Uruchom tryb deweloperski
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
    -w konsoli
    -w pliku word_graph.png jako wykres 
word_graph.png przedstawia jak wiele połączeń mają poszczególne słowa.
Oś X ("ID") - to kolejne słowa uporządkowane według liczby połączeń.
    -Na początku osi są najważniejsze słowa (najczęściej występujące)
    -Na końcu osi - najrzadziej używane słowa, oraz te, które występują tylko kilka razy w języku.
Oś Y ("Connections") - to liczba połączeń danego słowa z innymi słowami,
    - Im wyżej tym częściej dane słowo jest używane w języku i różnych kontekstach.
Niebieska linia ("Core words") - obrazuje jak szybko spada liczba połączeń, gdy przechodzimy od naczęstszych słów do narzadszych.
7. W pliku count_rank_chart.png wykresprzedstawia zależność Count*Rank (oś Y) od Rank (oś X).
W idealnym przypadku zgodnym z prawem Zipfa iloczyn Count*Rank byłby stały - punkty tworzyłyby prostą, równoległą do osi X. 
Na wygenerowanym wykresie możemy zauważyć zbliżoną zależność dla przedziału X:(619, 2473) - punkty tworzą kształt zbliżony do prostej.
Natomiast dla X:<1, 619> są widoczne duże skoki na wykresie. Odchylenia te spowodowane są częstym występowaniem zaimków, przyimków lub rodzajników w języku włoskim, które zaburzają wykres w punkcie X=1.
Od przedziału X=<2473, inf) zauważyć możemy, że częstość występowań danych słów w języku nie zmienia się, ale ranga rośnie. Z tego powodu następuję coraz większe odchylenie wykresu.
# Wnioski
Prawo Zipfa głosi, że częstość występowania słowa w danym języku jest odwrotnie proporcjonalne do jego rangi w uporządkowanej liście słów: f(r)=1/r.
Na podstawie wykresu (word_graph.png) możemy stwierdzić, że spełnia on prawo Zipfa. Analizując strukturę wykresu, możemy zauważyć, że: 
    -posiada on strome opadanie na początku (kilka słów występuje ekstremalnie często),
    -ma długi, płaski ogon (duża liczba słów występuje rzadko),
    -jest on podobny do hiperboli, co jest zgodne z zależnością f ~ 1/r - częstość maleje odwrotnie proporcjonalnie do rangi.
