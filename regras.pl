% =========================
%   Fatos das Salas
% =========================
sala(lab1, 30).
sala(lab2, 25).
sala(lab3, 40).
sala(lab4, 20).
sala(lab5, 35).
sala(auditorio, 100).

% =========================
%   Fatos das Aulas
%   aula(Curso, Dia, Hora, Sala)
% =========================
aula(paradigmas, segunda, 19, lab1).
aula(ia, terca, 20, lab2).
aula(bd, quarta, 19, lab3).
aula(so, quinta, 18, lab1).
aula(redes, sexta, 19, lab4).
aula(python, segunda, 20, lab2).
aula(algoritmos, terca, 18, lab3).
aula(calculo, quarta, 20, auditorio).
aula(logica, quinta, 19, lab5).
aula(web, sexta, 20, lab1).
aula(estatistica, segunda, 18, lab4).
aula(engenharia, terca, 19, lab5).
aula(programacao_funcional, quarta, 18, lab2).
aula(mobile, quinta, 20, lab3).
aula(robotica, sexta, 18, auditorio).
aula(gestao, segunda, 21, lab1).
aula(etica, terca, 21, lab4).
aula(ingles, quarta, 21, lab5).
aula(seguranca, quinta, 21, lab2).
aula(compiladores, sexta, 21, lab3).
aula(devops, segunda, 22, lab4).
aula(hardware, terca, 22, lab5).
aula(ia_avancada, quarta, 22, lab1).

% =========================
%   Regras
% =========================

% 1️⃣ Uma sala está ocupada se houver aula nela no mesmo dia e hora.
ocupada(Sala, Dia, Hora) :-
    aula(_, Dia, Hora, Sala).

% 2️⃣ Uma sala está disponível se existe e não está ocupada.
disponivel(Sala, Dia, Hora) :-
    sala(Sala, _),
    \+ ocupada(Sala, Dia, Hora).

% 3️⃣ Retorna a capacidade da sala.
capacidade(Sala, Capacidade) :-
    sala(Sala, Capacidade).

% 4️⃣ Retorna todas as aulas de um determinado dia.
aulas_do_dia(Dia, Curso, Sala, Hora) :-
    aula(Curso, Dia, Hora, Sala).
