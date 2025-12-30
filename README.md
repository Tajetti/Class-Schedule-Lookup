Class Control
Simple system to manage classroom availability and list classes using Flask (Python) and rules in Prolog (SWI-Prolog).
The API queries Prolog rules via pyswip and exposes a basic web interface.
Features
Check available rooms by day/time
Verify whether a room is occupied
Return a room’s capacity
List classes for a given day
Simple UI in templates/static for quick testing
Requirements
Windows (tested)
Python 3.8+
SWI-Prolog installed and available in PATH (e.g., swipl)
Python packages — see requirements.txt
Project Structure
app.py — Flask server with REST endpoints
regras.pl — Prolog facts and rules (sala/2, aula/4, ocupada/3, etc.)
templates/index.html — web interface
static/script.js, static/style.css — frontend
requirements.txt — Python dependencies
Installation
Open the terminal inside the project directory:
cd "c:\Users\Samsung-Win11\Desktop\Controle de aula"
Create and activate a virtual environment (recommended):
python -m venv .venv
.venv\Scripts\activate
Install dependencies:
pip install -r requirements.txt
Make sure SWI-Prolog (swipl) is in your PATH.
Running
With the virtual environment active, run:
python app.py
By default the server runs at:
http://127.0.0.1:5050/
Main Endpoints (JSON)
GET /salas-livres?dia=segunda&hora=19
Example:
curl "http://127.0.0.1:5050/salas-livres?dia=segunda&hora=19"
GET /ocupada?sala=lab1&dia=segunda&hora=19
Example:
curl "http://127.0.0.1:5050/ocupada?sala=lab1&dia=segunda&hora=19"
GET /capacidade?sala=lab1
Example:
curl "http://127.0.0.1:5050/capacidade?sala=lab1"
GET /aulas-do-dia?dia=terca
Example:
curl "http://127.0.0.1:5050/aulas-do-dia?dia=terca"
The interface in templates/index.html also uses these endpoints via fetch.
Simple Explanation of How It Works
The project has three main parts: the webpage you see in the browser, the Python server, and the Prolog rules.
When someone requests information (for example, “which rooms are available?”), the webpage sends this request to the server.
The server receives the request and forwards it to the rules file (regras.pl) — it doesn’t decide anything on its own.
Prolog checks the rules and returns the matching rooms/times.
The server takes that response and returns it to the webpage, which displays the result to the user.
To change how the system behaves (times, room names, subjects), you only need to edit regras.pl.
To change the UI, edit the files inside templates/ and static/.
