/* أبو أنس للأبواب الأوتوماتيكية — سكربت خفيف بدون مكتبات */
(function () {
  "use strict";

  /* ===== Google Tag Manager =====
     ضع معرّف الحاوية هنا (مثال: "GTM-ABC1234") ليتم تحميل GTM تلقائياً في جميع الصفحات.
     يُحمَّل بعد اكتمال تحميل الصفحة حفاظاً على سرعة الموقع. */
  var GTM_ID = "";

  window.dataLayer = window.dataLayer || [];

  function loadGTM() {
    if (!GTM_ID || window.__gtmLoaded) return;
    window.__gtmLoaded = true;
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(GTM_ID);
    document.head.appendChild(s);
  }
  if (document.readyState === "complete") loadGTM();
  else window.addEventListener("load", loadGTM);

  /* ===== تتبع نقرات الاتصال وواتساب =====
     يرسل أحداث phone_click و whatsapp_click إلى dataLayer مع موقع الزر في الصفحة. */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"], a[href*="wa.me/"]');
    if (!a) return;
    var isPhone = a.getAttribute("href").indexOf("tel:") === 0;
    window.dataLayer.push({
      event: isPhone ? "phone_click" : "whatsapp_click",
      click_location: a.getAttribute("data-loc") || "unknown",
      page_path: location.pathname,
      page_title: document.title
    });
  });

  /* ===== قائمة الجوال ===== */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ===== معرض الصور ===== */
  var dialog = document.getElementById("lightbox");
  if (dialog && typeof dialog.showModal === "function") {
    var img = dialog.querySelector("img");
    var cap = dialog.querySelector("p");
    document.querySelectorAll("[data-lightbox]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = btn.querySelector("img");
        img.src = src.currentSrc || src.src;
        img.alt = src.alt;
        cap.textContent = src.alt;
        dialog.showModal();
      });
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog || e.target.closest(".lightbox-close")) dialog.close();
    });
  }

  /* ===== السنة الحالية في التذييل ===== */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
