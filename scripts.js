document.getElementById("year").textContent = new Date().getFullYear();

const toast = document.getElementById("toast");
let toastTimer;

function showToast(text) {
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

// Discord: zkopírovat jméno do schránky
const discord = document.getElementById("discord");
const discordIcon = document.getElementById("discord-icon");

discord.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(discord.dataset.username);
        discordIcon.className = "fa-solid fa-check";
        showToast("Discord jméno zkopírováno");
        setTimeout(() => (discordIcon.className = "fa-brands fa-discord"), 1800);
    } catch {
        showToast(discord.dataset.username);
    }
});

// Projekty: karty se vytvoří ze seznamu PROJEKTY v projekty.js
function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
}

const projects = typeof PROJEKTY !== "undefined" ? PROJEKTY : [];
const grid = document.getElementById("project-grid");

projects.forEach((projekt) => {
    const card = el("a", "project");
    card.href = projekt.odkaz;
    card.target = "_blank";
    card.rel = "noopener";

    if (projekt.obrazek) {
        const img = el("img", "project-img");
        img.src = projekt.obrazek;
        img.alt = projekt.nazev;
        img.loading = "lazy";
        card.append(img);
    }

    const body = el("div", "project-body");
    const head = el("div", "project-head");
    head.append(el("h3", "project-name", projekt.nazev), el("i", "fa-solid fa-arrow-right arrow ext"));
    body.append(head);

    if (projekt.popis) body.append(el("p", "project-desc", projekt.popis));

    if (projekt.stitky && projekt.stitky.length) {
        const tags = el("div", "project-tags");
        projekt.stitky.forEach((stitek) => tags.append(el("span", "tag", stitek)));
        body.append(tags);
    }

    card.append(body);
    grid.append(card);
});

document.getElementById("projects").hidden = projects.length === 0;
