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

// Ukázky konverzací v okně vedle nadpisu; postupně se „píšou“ a střídají
const KONVERZACE = [
    {
        jmeno: "Jana", barvy: ["#fde68a", "#f9a8d4"], cas: "9:41",
        zprava: "Ahoj, notebook se mi strašně zpomalil a nejde mi tisknout 😕",
        odpoved: "Ahoj! Zastavím se zítra odpoledne a dám to do pořádku.",
        hotovo: ["Notebook vyčištěný a zrychlený", "Tiskárna zase tiskne", "Fotky se samy zálohují"],
    },
    {
        jmeno: "Petr", barvy: ["#a7f3d0", "#93c5fd"], cas: "18:05",
        zprava: "V obýváku skoro nejde Wi-Fi a v dětském pokoji vůbec.",
        odpoved: "To spravíme. Hodí se ti čtvrtek? Mrknu na router i pokrytí.",
        hotovo: ["Router správně nastavený", "Signál v celém bytě", "Nové bezpečné heslo"],
    },
    {
        jmeno: "Marie", barvy: ["#fecaca", "#fdba74"], cas: "10:12",
        zprava: "Koupila jsem nový telefon a nevím, jak přenést fotky a kontakty.",
        odpoved: "V pohodě, přenesu všechno a ukážu vám, jak na to.",
        hotovo: ["Fotky i kontakty přenesené", "WhatsApp funguje jako dřív", "Automatická záloha do cloudu"],
    },
    {
        jmeno: "Lenka", barvy: ["#ddd6fe", "#f0abfc"], cas: "14:30",
        zprava: "Potřebovala bych jednoduchý web pro svoje kadeřnictví.",
        odpoved: "Jasně! Do pár dnů ti pošlu první návrh.",
        hotovo: ["Web je online", "Skvěle vypadá na mobilu", "Vlastní doména a e-mail"],
    },
    {
        jmeno: "Tomáš", barvy: ["#bae6fd", "#c4b5fd"], cas: "20:47",
        zprava: "Na počítači mi vyskočilo varování před virem a chce po mně platbu!",
        odpoved: "Nic neplať a na nic neklikej, hned se na to podívám.",
        hotovo: ["Škodlivý program odstraněný", "Ochrana nastavená", "Žádná data se neztratila"],
    },
];

function renderChat(chat, k) {
    const zprava = el("div", "msg msg-in chat-step");
    const avatar = el("span", "avatar", k.jmeno[0]);
    avatar.style.background = `linear-gradient(135deg, ${k.barvy[0]}, ${k.barvy[1]})`;
    const zpravaText = el("div");
    zpravaText.append(el("p", "bubble", k.zprava), el("p", "time", `${k.jmeno} · ${k.cas}`));
    zprava.append(avatar, zpravaText);

    const pise = el("div", "msg msg-out chat-step");
    const tecky = el("p", "bubble typing");
    tecky.append(el("span"), el("span"), el("span"));
    pise.append(tecky);

    const odpoved = el("div", "msg msg-out chat-step");
    const odpovedText = el("div");
    odpovedText.append(el("p", "bubble", k.odpoved), el("p", "time", "t0bi · hned"));
    odpoved.append(odpovedText);

    const hotovo = el("div", "done chat-step");
    const titulek = el("p", "done-title");
    titulek.append(el("i", "fa-solid fa-circle-check"), " Hotovo");
    const seznam = el("ul");
    k.hotovo.forEach((bod) => {
        const li = el("li");
        li.append(el("i", "fa-solid fa-check"), ` ${bod}`);
        seznam.append(li);
    });
    hotovo.append(titulek, seznam);

    chat.replaceChildren(zprava, pise, odpoved, hotovo);
    return { zprava, pise, odpoved, hotovo };
}

const chat = document.getElementById("chat");

if (chat && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let index = 0;

    const play = () => {
        chat.classList.add("fade");
        setTimeout(() => {
            index = (index + 1) % KONVERZACE.length;
            const kroky = renderChat(chat, KONVERZACE[index]);
            chat.classList.remove("fade");
            setTimeout(() => kroky.zprava.classList.add("show"), 150);
            setTimeout(() => kroky.pise.classList.add("show"), 1100);
            setTimeout(() => {
                kroky.pise.remove();
                kroky.odpoved.classList.add("show");
            }, 2300);
            setTimeout(() => kroky.hotovo.classList.add("show"), 3300);
        }, 400);
    };

    setInterval(play, 8000);
}
