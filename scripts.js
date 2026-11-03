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
        discordIcon.className = "fa-solid fa-check arrow";
        showToast("Discord jméno zkopírováno");
        setTimeout(() => (discordIcon.className = "fa-regular fa-copy arrow"), 1800);
    } catch {
        showToast(discord.dataset.username);
    }
});

// Hudba: pouští se jen na kliknutí
const music = document.getElementById("music");
const audio = document.getElementById("background-music");
audio.volume = 0.4;

music.addEventListener("click", () => {
    if (audio.paused) {
        audio.play().catch(() => {});
        music.setAttribute("aria-pressed", "true");
        music.setAttribute("aria-label", "Vypnout hudbu");
    } else {
        audio.pause();
        music.setAttribute("aria-pressed", "false");
        music.setAttribute("aria-label", "Pustit hudbu");
    }
});
