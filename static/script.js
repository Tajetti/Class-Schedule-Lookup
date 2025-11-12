document.getElementById("consultar").addEventListener("click", async () => {
  const dia = document.getElementById("dia").value;
  const hora = document.getElementById("hora").value;

  const res = await fetch(`/salas-livres?dia=${dia}&hora=${hora}`);
  const data = await res.json();

  const lista = document.getElementById("resultado");
  lista.innerHTML = "";

  if (data.salas_livres && data.salas_livres.length > 0) {
    data.salas_livres.forEach(sala => {
      const li = document.createElement("li");
      li.textContent = sala;
      lista.appendChild(li);
    });
  } else {
    lista.innerHTML = "<li>Nenhuma sala livre neste horário.</li>";
  }
});

document.getElementById("consultar-capacidade").addEventListener("click", async () => {
  const sala = document.getElementById("sala").value.trim();
  const lista = document.getElementById("resultado");
  lista.innerHTML = "";
  if (!sala) {
    lista.innerHTML = "<li>Informe uma sala (ex: lab1).</li>";
    return;
  }
  const res = await fetch(`/capacidade?sala=${encodeURIComponent(sala)}`);
  const data = await res.json();
  if (data.capacidade !== undefined) {
    lista.innerHTML = `<li>Sala ${data.sala} — Capacidade: ${data.capacidade}</li>`;
  } else {
    lista.innerHTML = `<li>Erro: ${data.erro || 'não encontrada'}</li>`;
  }
});

document.getElementById("verificar-ocupada").addEventListener("click", async () => {
  const sala = document.getElementById("sala").value.trim();
  const dia = document.getElementById("dia").value;
  const hora = document.getElementById("hora").value;
  const lista = document.getElementById("resultado");
  lista.innerHTML = "";
  if (!sala) {
    lista.innerHTML = "<li>Informe uma sala (ex: lab1).</li>";
    return;
  }
  const res = await fetch(`/ocupada?sala=${encodeURIComponent(sala)}&dia=${dia}&hora=${hora}`);
  const data = await res.json();
  if (data.ocupada !== undefined) {
    lista.innerHTML = `<li>Sala ${data.sala} — Ocupada neste dia/hora? ${data.ocupada ? 'Sim' : 'Não'}</li>`;
  } else {
    lista.innerHTML = `<li>Erro: ${data.erro || 'consulta inválida'}</li>`;
  }
});

document.getElementById("listar-aulas").addEventListener("click", async () => {
  const dia = document.getElementById("dia-aulas").value;
  const lista = document.getElementById("resultado");
  lista.innerHTML = "";
  const res = await fetch(`/aulas-do-dia?dia=${dia}`);
  const data = await res.json();
  if (data.aulas && data.aulas.length > 0) {
    data.aulas.forEach(a => {
      const li = document.createElement("li");
      li.textContent = `${a.hora}h — ${a.curso} — ${a.sala}`;
      lista.appendChild(li);
    });
  } else {
    lista.innerHTML = "<li>Nenhuma aula encontrada neste dia.</li>";
  }
});