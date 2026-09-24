lucide.createIcons();

const works = [
  { type: "short films", title: "Stories in the in-between", role: "Writer · Director", code: "WRK / 01", image: "images/scene.jpeg" },
  { type: "advertising", title: "Commercial worlds", role: "Director · Visual storyteller", code: "WRK / 02", image: "images/outdoor_set.jpeg" },
  { type: "music videos", title: "Rhythm as narrative", role: "Director", code: "WRK / 03", image: "images/camera_set.jpeg" }
];

function renderWorks(filter) {
    const grid = document.getElementById("work-grid");
    grid.innerHTML = "";
    
    const visibleWorks = filter === "all" ? works : works.filter((work) => work.type === filter);
    
    visibleWorks.forEach((work, index) => {
        const article = document.createElement("article");
        article.className = `work-card work-card--${index + 1}`;
        
        article.innerHTML = `
            <div class="work-card__image">
                <img src="${work.image}" alt="Cinematic production still" />
                <div class="work-card__veil"></div>
                <span class="work-card__code">${work.code}</span>
                <span class="work-card__play"><i data-lucide="play" fill="currentColor"></i></span>
            </div>
            <div class="work-card__info">
                <span>${work.type}</span>
                <h3>${work.title}</h3>
                <p>${work.role}</p>
                <i data-lucide="arrow-up-right"></i>
            </div>
        `;
        grid.appendChild(article);
    });
    lucide.createIcons({ root: grid });
}

renderWorks("all");

document.getElementById("work-filters").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        document.querySelectorAll("#work-filters button").forEach(b => b.classList.remove("filter-button--active"));
        e.target.classList.add("filter-button--active");
        renderWorks(e.target.dataset.filter);
    }
});

const menuButton = document.getElementById("mobile-menu-button");
const mobileNav = document.getElementById("mobile-nav");
const menuIcon = document.getElementById("menu-icon");
let menuOpen = false;

menuButton.addEventListener("click", () => {
    menuOpen = !menuOpen;
    menuButton.setAttribute("aria-expanded", menuOpen);
    if (menuOpen) {
        mobileNav.style.display = "flex";
        menuIcon.setAttribute("data-lucide", "x");
    } else {
        mobileNav.style.display = "none";
        menuIcon.setAttribute("data-lucide", "menu");
    }
    lucide.createIcons({ root: menuButton });
});

document.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", () => {
        menuOpen = false;
        mobileNav.style.display = "none";
        menuButton.setAttribute("aria-expanded", "false");
        menuIcon.setAttribute("data-lucide", "menu");
        lucide.createIcons({ root: menuButton });
    });
});

function showToast(message, isError = false) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.style.background = isError ? "#ef4444" : "#10b981";
    toast.style.color = "white";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "6px";
    toast.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    toast.style.fontFamily = "sans-serif";
    toast.style.fontSize = "14px";
    toast.style.transition = "opacity 0.3s ease";
    toast.innerText = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
        const val = btn.dataset.value;
        try {
            await navigator.clipboard.writeText(val);
            const originalLucide = btn.innerHTML;
            btn.innerHTML = `<i data-lucide="check"></i>`;
            lucide.createIcons({ root: btn });
            showToast("Copied to clipboard");
            
            setTimeout(() => {
                btn.innerHTML = originalLucide;
            }, 1800);
        } catch(err) {
            showToast("Could not copy right now", true);
        }
    });
});

document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    if(!name.trim() || !email.trim() || !message.trim()) {
        showToast("Please complete your name, email and message.", true);
        return;
    }
    
    const whatsappNumber = "919482109265";
    const formattedText = `*New Inquiry from Website*
*Name:* ${name.trim()}
*Email:* ${email.trim()}

*Message:*
${message.trim()}`;
    
    const encodedText = encodeURIComponent(formattedText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
    
    showToast("Redirecting to WhatsApp...");
    e.target.reset();
});



