// ===== Einstellungen: hier deine Discord-Einladungslinks eintragen =====
// Format: "https://discord.gg/DEINCODE"
const DISCORD_LINKS = {
  haupt: "https://discord.gg/dGDnvbU97E",      // Haupt-Discord (Buttons "Discord beitreten")
  polizei: "",    // Polizei-Discord
  feuerwehr: "https://discord.gg/bnDZ7dGVBq"   // Feuerwehr- & Rettungsdienst-Discord
};

// Texte hinter den 24 Türchen (ohne Eintrag erscheint "Überraschung folgt")
const SURPRISES = {
  2: "Verlosung – Der Gewinner darf einen Tag lang ein Event seiner Wahl mitplanen.",
  3: "100 Juwelen für 1 Woche",
  6: "1.000 Gold für 1 Woche",
  8: "Verlosung – Der Gewinner darf das Thema eines Community-Events bestimmen.",
  10: "25 Diamanten für 1 Woche",
  11: "Verlosung von 3 – Eigene temporäre Voice-Channel für 1 Woche",
  12: "Verlosung von 3 – Eigene temporäre Voice-Channel für 1 Monat",
  13: "Verlosung – Der Gewinner darf das Thema eines Community-Events bestimmen.",
  14: "250 Juwelen für 1 Woche",
  16: "Eine Woche früher Zugang zu Informationen über ein Community-Event",
  18: "500 Juwelen für 1 Woche",
  20: "Verlosung – Der Gewinner darf einen Tag lang ein Event seiner Wahl mitplanen.",
  22: "Teilnahme an einer Sonderverlosung für einen Büroschlüssel nach Wahl",
  23: "Teilnahme an einer Sonderverlosung für 1 Tag Fly",
  24: "3.000 Gold für 1 Woche – Exklusive Weihnachtsrolle im Discord"
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
          span.textContent = SURPRISES[n] || "Überraschung folgt";
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

// Lichterstadt: kleine Skyline mit leuchtenden Fenstern
(function () {
  const city = document.getElementById("city");
  const ns = "http://www.w3.org/2000/svg";
  const W = 1200, H = 190;
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 " + W + " " + H);
  svg.setAttribute("preserveAspectRatio", "xMidYMax slice");
  svg.setAttribute("aria-hidden", "true");

  function el(name, attrs) {
    const e = document.createElementNS(ns, name);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    svg.appendChild(e);
    return e;
  }

  let x = 0, i = 0;
  while (x < W) {
    const w = 46 + ((i * 17) % 40);
    const h = 50 + ((i * 53) % 110);
    const y = H - h;
    el("rect", { x: x, y: y, width: w - 4, height: h, fill: i % 2 ? "#14062c" : "#1d0a3d" });
    el("rect", { x: x - 1, y: y - 5, width: w - 2, height: 6, rx: 3, class: "snowcap" });
    if (i % 5 === 2) el("rect", { x: x + w / 2 - 3, y: y - 28, width: 2, height: 24, fill: "#14062c" });
    for (let wy = y + 12; wy < H - 10; wy += 16) {
      for (let wx = x + 8; wx < x + w - 14; wx += 12) {
        const r = (wx * 7 + wy * 13 + i * 3) % 10;
        if (r < 6) {
          const win = el("rect", { x: wx, y: wy, width: 5, height: 7, class: "win" + (r === 0 ? " violet" : "") });
          win.style.animationDelay = "-" + ((wx * 3 + wy) % 30) / 10 + "s";
        }
      }
    }
    x += w;
    i++;
  }
  city.appendChild(svg);
})();
