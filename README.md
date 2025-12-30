# Class Control

A simple system for managing classroom availability and listing classes using Flask (Python) and Prolog (SWI-Prolog).  
The API queries Prolog rules via `pyswip` and provides a basic web interface.

## Features
- Check available rooms by day and time  
- Verify whether a room is occupied  
- Get a room’s capacity  
- List classes for a specific day  
- Simple UI for quick testing  

## Requirements
- Windows (tested)
- Python 3.8+
- SWI-Prolog installed and available in `PATH` (e.g., `swipl`)
- Python packages listed in `requirements.txt`

## Project Structure
- `app.py` — Flask server with REST endpoints  
- `regras.pl` — Prolog facts and rules (`sala/2`, `aula/4`, `ocupada/3`, etc.)  
- `templates/index.html` — web interface  
- `static/script.js`, `static/style.css` — frontend files  
- `requirements.txt` — dependencies  

## Installation
```bash
cd "c:\Users\Samsung-Win11\Desktop\Controle de aula"
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Ensure `swipl` is available in your system PATH.

## Running
```bash
python app.py
```

Default URL:  
`http://127.0.0.1:5050/`

## API Endpoints (JSON)

### Free rooms
```bash
GET /salas-livres?dia=segunda&hora=19
```

### Room occupancy
```bash
GET /ocupada?sala=lab1&dia=segunda&hora=19
```

### Room capacity
```bash
GET /capacidade?sala=lab1
```

### Classes of the day
```bash
GET /aulas-do-dia?dia=terca
```

The web interface (`templates/index.html`) also consumes these endpoints via `fetch`.

## How It Works
- The project has three parts: the browser UI, the Python server, and the Prolog rules.
- The UI sends a request (e.g., available rooms) to the Flask server.
- Flask queries the Prolog rules defined in `regras.pl`.
- Prolog returns the matching results.
- Flask sends the response back to the UI.
- To change schedules, rooms, or subjects, edit `regras.pl`.  
  To change the interface, edit files in `templates/` and `static/`.
