// ===== Mobile navigation (hamburger menu) =====
const hamburger = document.getElementById("hamburger");
const navHead = document.getElementById("navHead");
const navOverlay = document.getElementById("navOverlay");

function openNav() {
    navHead.classList.add("active");
    navOverlay.classList.add("active");
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
}

function closeNav() {
    navHead.classList.remove("active");
    navOverlay.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
}

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navHead.classList.contains("active") ? closeNav() : openNav();
    });
}

if (navOverlay) {
    navOverlay.addEventListener("click", closeNav);
}

document.querySelectorAll(".nav-head a").forEach((link) => {
    link.addEventListener("click", closeNav);
});

// Close the mobile menu if the viewport grows back to desktop size
window.addEventListener("resize", () => {
    if (window.innerWidth > 700) closeNav();
});

// ===== Active nav-link highlighting while scrolling =====
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
    let currentId = "";
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active-link", link.getAttribute("href") === `#${currentId}`);
    });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// ===== Scroll-reveal animations =====
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
} else {
    // Fallback: just show everything if IntersectionObserver isn't supported
    revealEls.forEach((el) => el.classList.add("in-view"));
}

// ===== Copy email to clipboard =====
const copyEmailBtn = document.getElementById("copyEmailBtn");
const toast = document.getElementById("toast");
let toastTimeout;

function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
}

if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
        const email = copyEmailBtn.dataset.email;
        try {
            await navigator.clipboard.writeText(email);
            showToast("Email copied to clipboard!");
        } catch (err) {
            // Fallback for browsers without clipboard API access
            window.location.href = `mailto:${email}`;
        }
    });
}

// ===== Back to top button =====
const backToTop = document.getElementById("backToTop");

function toggleBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("show", window.scrollY > 400);
}

window.addEventListener("scroll", toggleBackToTop);
toggleBackToTop();

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}