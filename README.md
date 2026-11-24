# Mimir

Überraschende Fakten statt Doomscrolling. Mimir funktioniert wie Reels, nur mit Fakten:
nach oben wischen = nächster Fakt, rechts = gefällt, links = gefällt nicht,
Stern = als Icebreaker merken, auf die Karte tippen = ganzen Text lesen.

**App öffnen:** https://semihpusuc.github.io/mimir/

## Aus welchen Dateien die App besteht

| Datei | Was sie macht |
|---|---|
| `index.html` | Die ganze App: Aufbau (HTML), Design (CSS) und Logik (JavaScript) samt Fakten |
| `manifest.webmanifest` | Die „Visitenkarte“ der App: Name, Icons, Farben, Vollbild. Damit bietet Android „Installieren“ an |
| `sw.js` | Der Service Worker: speichert die App auf dem Handy, damit sie auch offline startet |
| `icons/` | Das App-Icon in allen Größen, die Android, iPhone und Browser brauchen |

## Wie eine Änderung live geht

1. Dateien ändern
2. Commit (ein gespeicherter Versionsstand mit Beschreibung)
3. Push zu GitHub
4. GitHub Pages veröffentlicht die neue Version nach etwa einer Minute automatisch

Wichtig: Bei jeder neuen Version in `sw.js` die Nummer in `CACHE` erhöhen,
sonst zeigt das Handy noch eine Weile die alte, gespeicherte Version.

## Daten

Bewertungen und gemerkte Fakten bleiben nur auf dem Handy (im Browser-Speicher).
Die App zählt außerdem mit, wie lange ein Fakt auf dem Bildschirm war und ob der ganze Text
geöffnet wurde. Für neue, passendere Fakten: im Tab „Gemerkt“ auf „Bewertungen kopieren“ tippen
und den Text im Chat mit Claude einfügen.
