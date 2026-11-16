// ===== Einstellungen: hier deine Discord-Einladungslinks eintragen =====
// Format: "https://discord.gg/DEINCODE"
const DISCORD_LINKS = {
  haupt: "",      // Haupt-Discord (Buttons "Discord beitreten")
  polizei: "",    // Polizei-Discord
  feuerwehr: ""   // Feuerwehr- & Rettungsdienst-Discord
};

// Texte hinter den 24 Türchen (leer lassen = Platzhalter)
const SURPRISES = {
  // 1: "Dein Text für Türchen 1",
  // 2: "Dein Text für Türchen 2",
};
// =====================================================================

// Discord-Links setzen
document.querySelectorAll("[data-link]").forEach(function (el) {
  const link = DISCORD_LINKS[el.dataset.link];
  if (link) {
    el.href = link;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  } else {
    el.title = "Link folgt";
  }
});

// Schneefall
(function () {
  const snow = document.getElementById("snow");
  for (let i = 0; i < 36; i++) {
    const flake = document.createElement("div");
    const size = 3 + ((i * 7) % 6);
    const duration = 14 + ((i * 5) % 16);
    const delay = (i * 3) % duration;
    flake.className = "flake";
    flake.style.left = ((i * 29 + 7) % 100) + "%";
    flake.style.width = size + "px";
    flake.style.height = size + "px";
    flake.style.opacity = 0.35 + ((i * 11) % 6) / 10;
    flake.style.animationDuration = duration + "s";
    flake.style.animationDelay = "-" + delay + "s";
    snow.appendChild(flake);
  }
})();

// Countdown bis Heiligabend
(function () {
  const now = new Date();
  let xmas = new Date(now.getFullYear(), 11, 24);
  if (now > xmas) xmas = new Date(now.getFullYear() + 1, 11, 24);
  document.getElementById("days-left").textContent = Math.ceil((xmas - now) / 86400000);
})();

// Adventskalender: Türchen öffnen sich ab dem jeweiligen Dezember-Datum
(function () {
  const container = document.getElementById("doors");
  const now = new Date();

  for (let n = 1; n <= 24; n++) {
    const unlocked = now.getMonth() === 11 && now.getDate() >= n;
    const door = document.createElement("button");
    door.className = "door";
    door.type = "button";
    door.disabled = !unlocked;
    door.setAttribute("aria-label", "Türchen " + n);

    const number = document.createElement("span");
    number.className = "door-number";
    number.textContent = n;
    door.appendChild(number);

    if (!unlocked) {
      const hint = document.createElement("span");
      hint.className = "door-hint";
      hint.textContent = "Ab " + n + ". Dezember";
      door.appendChild(hint);
    } else {
      let open = false;
      door.addEventListener("click", function () {
        open = !open;
        door.innerHTML = "";
        const span = document.createElement("span");
        if (open) {
          span.className = "door-surprise";
          span.textContent = SURPRISES[n] || "[Überraschung Nr. " + n + "]";
        } else {
          span.className = "door-number";
          span.textContent = n;
        }
        door.appendChild(span);
      });
    }

    container.appendChild(door);
  }
})();