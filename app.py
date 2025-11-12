from flask import Flask, request, jsonify, render_template
from pyswip import Prolog

app = Flask(__name__)
prolog = Prolog()

prolog.consult("regras.pl")

@app.route('/')
def index():
    return render_template('index.html')

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

@app.route('/capacidade')
def capacidade_sala():
    sala = request.args.get('sala')
    if not sala:
        return jsonify({'erro': 'Informe sala na URL, ex: /capacidade?sala=lab1'})
    try:
        consulta = f"capacidade({sala}, Cap)"
        res = list(prolog.query(consulta))
        if not res:
            return jsonify({'erro': 'Sala não encontrada'})
        return jsonify({'sala': sala, 'capacidade': res[0]['Cap']})
    except Exception as e:
        return jsonify({'erro': str(e)})

@app.route('/ocupada')
def sala_ocupada():
    sala = request.args.get('sala')
    dia = request.args.get('dia')
    hora = request.args.get('hora')
    if not sala or not dia or not hora:
        return jsonify({'erro': 'Informe sala, dia e hora, ex: /ocupada?sala=lab1&dia=segunda&hora=19'})
    try:
        consulta = f"ocupada({sala}, {dia}, {hora})"
        res = list(prolog.query(consulta))
        return jsonify({'sala': sala, 'ocupada': len(res) > 0})
    except Exception as e:
        return jsonify({'erro': str(e)})

@app.route('/aulas-do-dia')
def aulas_do_dia_route():
    dia = request.args.get('dia')
    if not dia:
        return jsonify({'erro': 'Informe dia, ex: /aulas-do-dia?dia=segunda'})
    try:
        aulas = [{'curso': r['Curso'], 'sala': r['Sala'], 'hora': r['Hora']} for r in prolog.query(f"aulas_do_dia({dia}, Curso, Sala, Hora)")]
        return jsonify({'dia': dia, 'aulas': aulas})
    except Exception as e:
        return jsonify({'erro': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5050)
