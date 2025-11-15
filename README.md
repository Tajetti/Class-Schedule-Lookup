# Controle de Aula

Sistema simples para gerenciar disponibilidade de salas e listar aulas usando Flask (Python) e regras em Prolog (SWI-Prolog). A API consulta regras Prolog via pyswip e oferece uma interface web básica.

## Recursos
- Consultar salas livres por dia/hora
- Verificar se uma sala está ocupada
- Retornar capacidade de uma sala
- Listar aulas de um dia
- UI simples em templates/static para testes rápidos

## Requisitos
- Windows (testado)
- Python 3.8+
- SWI-Prolog instalado e acessível no PATH (ex.: swipl)
- Pacotes Python: ver requirements.txt

## Estrutura do projeto
- app.py — servidor Flask com endpoints REST
- regras.pl — fatos e regras Prolog (sala/2, aula/4, ocupada/3, etc.)
- templates/index.html — interface web
- static/script.js, static/style.css — frontend
- requirements.txt — dependências Python

## Instalação
1. Abra o terminal no diretório do projeto:
   cd "c:\Users\Samsung-Win11\Desktop\Controle de aula"
2. Crie e ative um ambiente virtual (recomendado):
   python -m venv .venv
   .venv\Scripts\activate
3. Instale dependências:
   pip install -r requirements.txt
4. Verifique se o SWI-Prolog (swipl) está no PATH.

## Executando
No terminal com o ambiente ativo:
python app.py
Por padrão o servidor roda em http://127.0.0.1:5050/

## Endpoints principais (JSON)
- GET /salas-livres?dia=segunda&hora=19  
  Exemplo:
  curl "http://127.0.0.1:5050/salas-livres?dia=segunda&hora=19"

- GET /ocupada?sala=lab1&dia=segunda&hora=19  
  Exemplo:
  curl "http://127.0.0.1:5050/ocupada?sala=lab1&dia=segunda&hora=19"

- GET /capacidade?sala=lab1  
  Exemplo:
  curl "http://127.0.0.1:5050/capacidade?sala=lab1"

- GET /aulas-do-dia?dia=terca  
  Exemplo:
  curl "http://127.0.0.1:5050/aulas-do-dia?dia=terca"

A interface em templates/index.html também usa esses endpoints via fetch.