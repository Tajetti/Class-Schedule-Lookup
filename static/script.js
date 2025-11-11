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
