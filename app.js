let amigos  = [];

const avatares = [
  "assets/avatar-1.jpg",
  "assets/avatar-2.webp",
  "assets/avatar-3.jpg",
  "assets/avatar-4.webp",
  "assets/avatar-5.webp",
  "assets/avatar-6.webp",
  "assets/avatar-7.webp",
];

  function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim();

    if (nombre === "") {
      showAlert("Por favor, ingresa un nombre de amigo.");
      return;
    }

    if (amigos.some(a => a.nombre.toLowerCase() === nombre.toLowerCase())) {
      showAlert("Ese nombre ya fue agregado.");
      input.value = "";
      input.focus();
      return;
    }

    let avatar = avatares[Math.floor(Math.random() * avatares.length)];

    amigos.push({ nombre, avatar });

    input.value = "";
    input.focus();

    mostrarLista();
  }

  function mostrarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach(function(amigo) {
      let li = document.createElement("li");
      li.classList.add("amigo-card");

      li.innerHTML = `
        <img src="${amigo.avatar}" alt="avatar" class="avatar">
        <span class="nombre">${amigo.nombre}</span>
      `;

      lista.appendChild(li);
    });
  }

  document.getElementById("amigo").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      agregarAmigo();
    }
  });

function sortearAmigo() {
  if (!Array.isArray(amigos) || amigos.length === 0) {
    showAlert("No hay amigos para sortear.");
    return;
  }

  const indiceSorteado = Math.floor(Math.random() * amigos.length);
  const seleccionado = amigos[indiceSorteado];

  const nombre = (typeof seleccionado === "string")
    ? seleccionado
    : (seleccionado.nombre || seleccionado.name || "Amigo");
  const avatar = (typeof seleccionado === "string")
    ? "assets/default-avatar.png"
    : (seleccionado.avatar || seleccionado.img || "assets/default-avatar.png");

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  const li = document.createElement("li");
  li.className = "amigo-card winner";

  const img = document.createElement("img");
  img.className = "avatar winner-avatar";
  img.src = avatar;
  img.alt = nombre;

  const info = document.createElement("div");
  info.className = "winner-info";

  const label = document.createElement("div");
  label.className = "winner-label";
  label.textContent = "¡Ganador!";

  const nameDiv = document.createElement("div");
  nameDiv.className = "nombre winner-name";
  nameDiv.textContent = nombre;

  info.appendChild(label);
  info.appendChild(nameDiv);

  li.appendChild(img);
  li.appendChild(info);
  resultado.appendChild(li);

  const confettiPath = "assets/confetti.gif";
  const confetti = new Image();
  confetti.src = confettiPath;
  confetti.className = "confetti-gif";
  confetti.alt = "Celebración";

  confetti.onload = () => {
    resultado.appendChild(confetti);
    setTimeout(() => {
      if (confetti.parentNode) confetti.parentNode.removeChild(confetti);
    }, 5000);
  };

  li.classList.add("pulse");
  li.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => li.classList.remove("pulse"), 1800);
}

function showAlert(message, type = "warning") {
  const container = document.getElementById("custom-alert-container");

  const alert = document.createElement("div");
  alert.className = `custom-alert ${type}`;
  alert.textContent = message;

  container.appendChild(alert);

  setTimeout(() => {
    alert.style.animation = "fadeOut 0.5s forwards";
    setTimeout(() => alert.remove(), 500);
  }, 3000);
}

