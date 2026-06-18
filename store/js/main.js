let cartCount = 0;

const toast = document.querySelector(".toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function scrollTo(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}

function updateCartBadge() {
  const cartBtn = document.querySelector(".header-btn");
  if (!cartBtn) return;
  cartBtn.textContent = cartCount > 0 ? `Cart (${cartCount})` : "Cart";
}

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => loader.remove(), 500);
  }, 1000);
});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((el) => observer.observe(el));

document.querySelector(".hero-buttons .primary")?.addEventListener("click", () => {
  scrollTo(".products");
});

document.querySelector(".hero-buttons .secondary")?.addEventListener("click", () => {
  scrollTo(".categories");
});

document.querySelector(".header-btn")?.addEventListener("click", () => {
  if (cartCount === 0) {
    showToast("Demo — cart is empty");
    return;
  }
  showToast(`Demo — ${cartCount} item${cartCount > 1 ? "s" : ""} in cart`);
});

const navTargets = [".hero", ".products", ".categories", "footer"];

document.querySelectorAll("nav a").forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    scrollTo(navTargets[index]);
  });
});

document.querySelectorAll(".card").forEach((card) => {
  const btn = card.querySelector("button");
  const name = card.querySelector("h3")?.textContent || "Item";

  btn?.addEventListener("click", (e) => {
    e.stopPropagation();
    cartCount += 1;
    updateCartBadge();
    showToast(`Demo — ${name} added ✓`);
  });
});

document.querySelectorAll(".category").forEach((category) => {
  category.addEventListener("click", () => {
    scrollTo(".products");
    showToast(`Demo — ${category.textContent} category`);
  });
});

document.querySelector("section.sale")?.addEventListener("click", () => {
  scrollTo(".products");
  showToast("Demo — browse sale items");
});

const form = document.getElementById("newsletterForm");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Demo — subscription simulated ✓");
  form.reset();
});