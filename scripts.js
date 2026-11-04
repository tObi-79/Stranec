document.getElementById("year").textContent = new Date().getFullYear();

// Upozornění dole na obrazovce
const toast = document.getElementById("toast");
let toastTimer;

function showToast(text) {
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

// Discord: zkopírovat jméno do schránky
document.querySelectorAll(".js-discord").forEach((button) => {
    button.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(button.dataset.username);
            showToast("Discord jméno zkopírováno");
        } catch {
            showToast(button.dataset.username);
        }
    });
});

const navLinks = [...document.querySelectorAll(".nav-links a")];

// Navigace ztmavne po odscrollování
const nav = document.getElementById("nav");
const onScroll = () => {
    nav.classList.toggle("scrolled", scrollY > 12);
    // Na úvodu není žádná položka navigace aktivní
    if (scrollY < 200) navLinks.forEach((link) => link.classList.remove("active"));
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Projekty: karty se vytvoří ze seznamu PROJEKTY v projekty.js
function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
}

// Barva náhledu podle názvu, vždy z palety webu (fialová, modrá, růžová, tyrkysová)
const PREVIEW_HUES = [262, 222, 292, 200, 322];

function hueFor(text) {
    let hash = 0;
    for (const char of text) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    return PREVIEW_HUES[hash % PREVIEW_HUES.length];
}

const projects = typeof PROJEKTY !== "undefined" ? PROJEKTY : [];
const grid = document.getElementById("project-grid");

projects.forEach((projekt, i) => {
    // Projekt bez odkazu se ukáže jako neklikací karta
    const card = el(projekt.odkaz ? "a" : "article", "project spotlight reveal");
    card.style.setProperty("--delay", `${i * 0.08}s`);
    if (projekt.odkaz) {
        card.href = projekt.odkaz;
        card.target = "_blank";
        card.rel = "noopener";
    }

    const preview = el("div", "project-preview");
    const bar = el("div", "browser-bar");
    bar.append(el("span"), el("span"), el("span"));
    preview.append(bar);

    if (projekt.obrazek) {
        const img = el("img");
        img.src = projekt.obrazek;
        img.alt = projekt.nazev;
        img.loading = "lazy";
        preview.append(img);
    } else {
        const placeholder = el("div", "placeholder");
        placeholder.style.setProperty("--hue", hueFor(projekt.nazev));
        placeholder.append(el("span", "", projekt.nazev));
        preview.append(placeholder);
    }

    const body = el("div", "project-body");
    const head = el("div", "project-head");
    head.append(el("h3", "project-name", projekt.nazev));

    if (projekt.odkaz) {
        const link = el("span", "project-link");
        link.append(el("i", "fa-solid fa-arrow-right"));
        head.append(link);
    } else {
        head.append(el("span", "project-private", "Interní projekt"));
    }
    body.append(head);

    if (projekt.popis) body.append(el("p", "project-desc", projekt.popis));

    if (projekt.stitky && projekt.stitky.length) {
        const tags = el("div", "project-tags");
        projekt.stitky.forEach((stitek) => tags.append(el("span", "tag", stitek)));
        body.append(tags);
    }

    card.append(preview, body);
    grid.append(card);
});

// Světlo, které sleduje myš na kartách
document.addEventListener("pointermove", (event) => {
    document.querySelectorAll(".spotlight").forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--y", `${event.clientY - rect.top}px`);
    });
});

// Postupné objevování prvků při scrollu
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".hero .reveal").forEach((node, i) => node.style.setProperty("--delay", `${i * 0.08}s`));
document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));

// Zvýraznění aktivní sekce v navigaci
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
}, { rootMargin: "-45% 0px -50% 0px" });

navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) sectionObserver.observe(section);
});

// Střídání frází v hlavním nadpisu
const rotator = document.getElementById("rotator");

if (rotator && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const words = rotator.dataset.words.split("|");
    let index = 0;

    setInterval(() => {
        rotator.classList.add("out");
        setTimeout(() => {
            index = (index + 1) % words.length;
            rotator.textContent = words[index];
            rotator.classList.remove("out");
        }, 350);
    }, 2600);
}
