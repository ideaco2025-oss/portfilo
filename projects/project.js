function initProjectPage(strings) {
  let lang = localStorage.getItem("veloce-lang") || "ar";

  function setLang(nextLang) {
    lang = nextLang;
    localStorage.setItem("veloce-lang", lang);
    const t = strings[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = t.pageTitle;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      if (t[el.dataset.i18n] !== undefined) el.textContent = t[el.dataset.i18n];
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      if (t[el.dataset.i18nHtml] !== undefined) el.innerHTML = t[el.dataset.i18nHtml];
    });
    document.querySelectorAll(".lang-opt").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  document.querySelectorAll(".lang-opt").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  setLang(lang);
}
