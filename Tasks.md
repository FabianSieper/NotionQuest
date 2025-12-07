## 1. Projekt-Zusammenfassung

Du entwickelst ein rundenbasiertes 2D-Top-Down-Spiel, das im Browser läuft. Das Besondere: Das Level-Design passiert nicht im Code, sondern in einer **öffentlichen Notion-Seite**. Das Backend (Go) liest diese Karte, berechnet die Spielzüge und verwaltet den Status. Das Frontend (Angular) visualisiert das Spielgitter und animiert die Figuren (Sprites), die du per KI generierst.

---

## 2. Detaillierte Anforderungen

### A. Datenquelle (Level-Design)
* **Ablage:** Eine öffentlich zugängliche Notion-Seite.
* **Format:** Ein "Code-Block" (Monospace Text) auf dieser Seite.
* **Zeichen-Legende:**
    * `#` = Wand (unpassierbar)
    * `.` = Boden (begehbar)
    * `S` = Startposition des Spielers
    * `Z` = Ziel / Ausgang (Gewinn-Bedingung)
    * `M` = Monster (Gegner)

### B. Backend (Golang) - "Game Master"
* **Map-Parser:** Muss den Textblock von Notion laden und in ein internes Raster (Grid/2D-Array) umwandeln.
* **Zustandsverwaltung:** Speichert die aktuelle Position von Spieler und allen Monstern sowie deren HP (Lebenspunkte).
* **API:** Bietet Endpunkte für das Frontend (z.B. `GetState`, `MovePlayer`).
* **Spiel-Logik:**
    * Validierung: Darf der Spieler auf das Feld? (Kollisionsabfrage mit Wänden).
    * Runden-Abfolge: Nach jedem Spieler-Zug berechnet das Backend automatisch die Züge aller Monster.
    * Monster-KI: Primitive Verfolgung (Monster bewegt sich ein Feld auf den Spieler zu).
    * Kampf: Wenn Spieler auf Monster zieht -> Angriff.

### C. Frontend (Angular) - "Visualisierung"
* **Rendering:** Zeichnet das Raster basierend auf den Daten vom Backend.
* **Input:** Erfasst Tastatureingaben (Pfeiltasten/WASD) und sendet Befehle an das Backend.
* **Animationen:**
    * **Bewegung:** Weicher Übergang zwischen zwei Feldern (kein Springen) mittels CSS Transitions.
    * **Idle:** Dauerhafte "Atmen"-Animation (Skalieren/Wippen) mittels CSS Keyframes.
* **Assets:** Nutzung von Sprite-Sheets (Bilddateien), die per KI erstellt wurden.

---

## 3. Schritt-für-Schritt Umsetzungsplan

Halte dich an diese Reihenfolge, um nicht von der Komplexität erschlagen zu werden.

### Phase 1: Das Fundament & Die Karte

1.  **Notion Setup:**
    * Erstelle die Notion-Seite mit dem Code-Block und deiner Map (nutze `#`, `.`, `S`, `Z`).
    * Schalte die Seite auf "Public".
2.  **Go Projekt Setup:**
    * Initialisiere dein Go-Modul.
    * Erstelle die Ordnerstruktur (z.B. `/cmd`, `/internal`, `/api`).
3.  **Der Parser (Backend):**
    * Schreibe eine Funktion in Go, die den String aus Notion holt (erstmal hardcodiert oder via einfacher HTTP Get Request auf die Public URL).
    * Wandel den String in ein 2D-Slice (Array) um.
    * Finde die Koordinaten von `S` (Start).
    * *Test:* Lass dir das Grid in der Konsole ausgeben.

### Phase 2: Die API & Der Spieler

4.  **Webserver (Backend):**
    * Richte einen einfachen Webserver ein (Standard Library oder Framework wie Gin/Fiber).
    * Erstelle einen Endpoint `GET /gamestate`, der das Grid und die Spielerposition als JSON zurückgibt.
5.  **Angular Init (Frontend):**
    * Erstelle das Angular Projekt.
    * Baue eine Service-Komponente, die `GET /gamestate` aufruft.
6.  **Das Grid Rendern (Frontend):**
    * Nutze HTML/CSS (Grid Layout oder Flexbox), um das 2D-Array darzustellen.
    * Verwende vorerst nur Farben: Grau für Wände, Weiß für Boden, Blau für den Spieler.
    * Positioniere den Spieler absolut auf dem Grid basierend auf seinen X/Y Koordinaten.

### Phase 3: Bewegung & Spielschleife

7.  **Bewegungs-Logik (Backend):**
    * Erstelle einen Endpoint `POST /move`. Erwartet die Richtung (Up, Down, Left, Right).
    * Implementiere die Logik: Berechne neue Koordinate -> Prüfe ob Wand -> Wenn frei, update Spieler-Position.
    * Sende den neuen State zurück.
8.  **Input (Frontend):**
    * Fange Tastatur-Events ab.
    * Rufe `POST /move` auf.
    * Update das UI mit den neuen Daten (nutze Angular Signals oder Observables).
9.  **Gewinn-Check (Backend):**
    * Prüfe nach jedem Zug: Steht der Spieler auf `Z`? Wenn ja, setze Status im JSON auf "WON".
    * Frontend: Zeige "Gewonnen" Nachricht an.

### Phase 4: Die Gegner (Monster)

10. **Parser Update (Backend):**
    * Erkenne das `M` in der Notion-Map.
    * Speichere eine Liste von Monstern (mit ID und Position) im State.
    * Ersetze das `M` im Grid durch Boden (damit man drauf laufen kann), aber merke dir, dass dort ein Monster steht.
11. **Gegner-KI (Backend):**
    * Erweitere den `POST /move` Endpoint.
    * *Nachdem* der Spieler bewegt wurde: Loop über alle Monster.
    * Bewege jedes Monster ein Feld in Richtung Spieler (Simple Logik: Ist Spieler X größer als Monster X? Dann X+1).
12. **Frontend Update:**
    * Zeige die Monster als rote Quadrate an.

### Phase 5: "Polish" & Animationen (Das Auge spielt mit)

13. **Asset Generation:**
    * Nutze eine KI, um ein Sprite-Sheet zu erstellen (Top-Down Ansicht, Grid-basiert).
14. **Sprites einbinden:**
    * Ersetze die farbigen Quadrate im Frontend durch `divs` mit Hintergrundbildern (deine Sprites).
15. **Animation (CSS):**
    * Füge die **Idle-Animation** (Atmen) hinzu (Keyframes).
    * Füge die **Move-Transition** hinzu (CSS `transition: all 0.3s ease`), damit die Figuren gleiten.

---

**Mein Tipp:** Fange wirklich erst mit Phase 1 an und ignoriere Monster und Animationen komplett, bis der blaue Kasten (Spieler) durch das graue Labyrinth (Notion Map) laufen kann.

Bereit für den Start?