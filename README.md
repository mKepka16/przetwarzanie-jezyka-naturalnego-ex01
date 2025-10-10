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