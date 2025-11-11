from flask import Flask, request, jsonify, render_template
from pyswip import Prolog

app = Flask(__name__)
prolog = Prolog()

# Carrega o arquivo de regras Prolog
prolog.consult("regras.pl")

@app.route('/')
def index():
    return render_template('index.html')

# Endpoint principal -> /salas-livres?dia=segunda&hora=19
@app.route('/salas-livres')
def salas_livres():
    dia = request.args.get('dia')
    hora = request.args.get('hora')

    if not dia or not hora:
        return jsonify({'erro': 'Informe dia e hora na URL, ex: /salas-livres?dia=segunda&hora=19'})

    try:
        consulta = f"disponivel(Sala, {dia}, {hora})"
        salas = [r["Sala"] for r in prolog.query(consulta)]
        return jsonify({'salas_livres': salas})
    except Exception as e:
        return jsonify({'erro': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5050)
