/* بابي — قالب صفحة تعليمات الوصول. يقرأ data.json من مجلد العميل ويبني الصفحة. */
(async function () {
  const UI = {
    ar: { dir: "rtl", sub: "4 خطوات · بالصور · دقيقتان", st: ["الخريطة", "المدخل", "المفتاح", "الشقة", "تنبيه"],
      h1: "الموقع", maps: "افتح خرائط Google", copy: "نسخ الإحداثيات", copied: "تم النسخ", hud: "هدهد", zoom: "تكبير",
      h2: "المدخل الصحيح", h3: "فتح الباب الخارجي", h4: "الوصول إلى الشقة", h5: "مهم جدًا عند المغادرة",
      thanks: "شكرًا جزيلًا على جهودك وتعاونك، نقدّر تعبك في إيصال الطلب حتى باب الشقة.", wa: "واتساب", call: "اتصال",
      powered: "صُنع بواسطة", demo: "نموذج تجريبي — البيانات افتراضية" },
    en: { dir: "ltr", sub: "4 steps · with photos · 2 minutes", st: ["Map", "Entrance", "Key", "Apartment", "Alert"],
      h1: "Location", maps: "Open Google Maps", copy: "Copy coordinates", copied: "Copied", hud: "Hudhud", zoom: "Zoom",
      h2: "The right entrance", h3: "Open the outer door", h4: "Reach the apartment", h5: "Very important when leaving",
      thanks: "Thank you so much for your effort. We truly appreciate you bringing the order all the way to our door.", wa: "WhatsApp", call: "Call",
      powered: "Made with", demo: "Demo page — sample data" },
    ur: { dir: "rtl", sub: "4 مراحل · تصاویر کے ساتھ · 2 منٹ", st: ["نقشہ", "داخلہ", "چابی", "فلیٹ", "انتباہ"],
      h1: "مقام", maps: "Google Maps کھولیں", copy: "کوآرڈینیٹس کاپی کریں", copied: "کاپی ہو گیا", hud: "ہدہد", zoom: "بڑا کریں",
      h2: "صحیح داخلی دروازہ", h3: "باہر کا دروازہ کھولیں", h4: "فلیٹ تک پہنچیں", h5: "جاتے وقت بہت ضروری",
      thanks: "آپ کی محنت اور تعاون کا بہت شکریہ۔ آرڈر فلیٹ کے دروازے تک پہنچانے پر ہم آپ کے ممنون ہیں۔", wa: "واٹس ایپ", call: "کال",
      powered: "بنایا گیا", demo: "نمونہ صفحہ — فرضی ڈیٹا" }
  };
  const I = {
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l2 2M19 4l2 2"/></svg>',
    door: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1"/><circle cx="15" cy="12" r="1"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5"/><circle cx="12" cy="18" r=".8"/></svg>',
    nav: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-8-8 18-2-8-8-2z"/></svg>',
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h14l2-6-3-6H6L3 11z"/><circle cx="8" cy="20" r="1.5"/><circle cx="16" cy="20" r="1.5"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
    rotR: '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 3v5h-5"/></svg>',
    rotL: '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.3-5.7"/><path d="M4 3v5h5"/></svg>',
    doorOk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 12l2 2 4-4"/></svg>',
    noLock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M3 3l18 18"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-8-5.3-8-11.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.7 12 21 12 21z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
  };
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);

  let D;
  try { D = await (await fetch("data.json", { cache: "no-cache" })).json(); }
  catch (e) { document.body.innerHTML = '<div class="err">تعذّر تحميل بيانات الصفحة.</div>'; return; }

  const LANGS = ["ar", "en", "ur"];
  const tx = (o, l) => (o && typeof o === "object") ? (o[l] || o.ar || o.en || "") : (o || "");
  const phone = (D.phone || "").replace(/\D/g, "");
  const coords = D.coords || "";

  function build(l) {
    const U = UI[l];
    document.documentElement.lang = l; document.documentElement.dir = U.dir;
    const title = tx(D.title, l) || U.h1;
    document.title = title + " — بابي";
    const steps = (D.apartment?.steps || []).map((s, i) => `<li><span class="n">${i + 1}</span><span>${esc(tx(s, l))}</span></li>`).join("");
    const warns = (D.warnings || []).map(w => `<div class="wline ${w.type === "no" ? "no" : "ok"}">${w.type === "no" ? I.noLock : I.doorOk}<span>${esc(tx(w.text, l))}</span></div>`).join("");
    const mainWarn = (D.warnings || []).find(w => w.type === "no");
    const others = mainWarn ? LANGS.filter(k => k !== l).map(k => `<div dir="${UI[k].dir}">${esc(tx(mainWarn.text, k))}</div>`).join("") : "";
    const fig = (img, label) => img ? `<figure><img src="${esc(img)}" alt="" loading="lazy">${label ? `<span class="label">${esc(label)}</span>` : ""}<span class="zoom">${I.zoom}<span>${U.zoom}</span></span></figure>` : "";
    const keyDir = D.outerDoor?.keyDirection === "left" ? "left" : "right";
    const tip = D.outerDoor?.tip ? `<div class="tip"><span class="keyAnim ${keyDir}">${I.key}</span><div><b>${esc(tx(D.outerDoor.tip, l))}</b><small>${esc(tx(D.outerDoor.tipSub, l))}</small></div>${keyDir === "left" ? I.rotL : I.rotR}</div>` : "";

    document.body.innerHTML = `
<header class="hero"><div class="sun"></div><div class="cloud c1"></div><div class="cloud c2"></div>
  <div class="top">
    <div class="langs">${LANGS.map(k => `<button data-lang="${k}" class="${k === l ? "active" : ""}">${{ ar: "عربي", en: "EN", ur: "اردو" }[k]}</button>`).join("")}</div>
    <button id="themeBtn" aria-label="theme"></button>
  </div>
  <h1>${esc(title)}</h1><div class="sub">${esc(tx(D.subtitle, l) || U.sub)}</div>
  ${D.demo ? `<div class="tag">${U.demo}</div>` : ""}
</header>
<div class="sheet">
  <nav class="steps">${["s1", "s2", "s3", "s4", "s5"].map((id, i) => `<a href="#${id}"><span>${[I.pin, I.home, I.key, I.door, I.alert][i]}</span><i>${U.st[i]}</i></a>`).join("")}</nav>
  <main>
    <section class="card" id="s1"><h2><span class="ico">${I.pin}</span><span>${U.h1}</span></h2>
      <div class="mapbox"><iframe src="https://maps.google.com/maps?q=${encodeURIComponent(coords)}&z=17&output=embed" loading="lazy" title="map" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      <a class="btn" id="mapsBtn" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(coords)}" target="_blank" rel="noopener">${I.nav}<span>${U.maps}</span></a>
      <div class="row">${D.hudhud ? `<a class="btn sm" href="${esc(D.hudhud)}" target="_blank" rel="noopener">${I.pin}<span>${U.hud}</span></a>` : ""}<button class="btn sm" id="copyBtn">${I.copy}<span>${U.copy}</span></button></div>
    </section>
    <section class="card" id="s2"><h2><span class="ico">${I.home}</span><span>${U.h2}</span></h2>
      <p>${D.entrance?.badge ? `<span class="badge">${I.check}<span>${esc(tx(D.entrance.badge, l))}</span></span> ` : ""}${esc(tx(D.entrance?.text, l))}</p>
      ${fig(D.entrance?.image, tx(D.entrance?.label, l))}
    </section>
    <section class="card" id="s3"><h2><span class="ico">${I.key}</span><span>${U.h3}</span></h2>
      <p>${esc(tx(D.outerDoor?.text, l))}</p>${tip}
      ${fig(D.outerDoor?.image, tx(D.outerDoor?.label, l))}
    </section>
    <section class="card" id="s4"><h2><span class="ico">${I.door}</span><span>${U.h4}</span></h2>
      <ul class="list">${steps}</ul>
      ${fig(D.apartment?.image, tx(D.apartment?.label, l))}
    </section>
    ${warns ? `<section class="card warn" id="s5"><h2><span class="ico">${I.alert}</span><span>${U.h5}</span></h2>${warns}${D.warningNote ? `<p>${esc(tx(D.warningNote, l))}</p>` : ""}<div class="other">${others}</div></section>` : ""}
    <section class="card thanks">${I.heart}<p>${esc(tx(D.thanks, l) || U.thanks)}</p></section>
    <div class="foot">${U.powered} <a href="../">بابي · babi</a></div>
  </main>
</div>
<div class="bar">
  ${phone ? `<a class="wa" href="https://wa.me/${phone}" target="_blank" rel="noopener">${I.wa}<span>${U.wa}</span></a><a class="call" href="tel:+${phone}">${I.phone}<span>${U.call}</span></a>` : ""}
</div>
<div id="lb"><button aria-label="close">✕</button><img id="lbImg" alt=""></div>
<div class="toast" id="toast"></div>`;

    $$(".langs button").forEach(b => b.onclick = () => { localStorage.setItem("babi-lang", b.dataset.lang); build(b.dataset.lang); });
    $("#themeBtn").innerHTML = document.documentElement.dataset.theme === "dark" ? I.sun : I.moon;
    $("#themeBtn").onclick = () => { const n = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; setTheme(n); localStorage.setItem("babi-theme", n); };
    $("#copyBtn").onclick = async () => { try { await navigator.clipboard.writeText(coords.replace(",", ", ")); toast(U.copied); } catch (e) { prompt("", coords); } };
    $("#mapsBtn").addEventListener("click", () => setTimeout(() => $("#s2").scrollIntoView({ behavior: "smooth" }), 800));
    $$("figure").forEach(f => f.onclick = () => { $("#lbImg").src = f.querySelector("img").src; $("#lb").classList.add("open"); });
    $("#lb").onclick = () => $("#lb").classList.remove("open");
    const secs = [...$$("main section[id]")], links = [...$$(".steps a")];
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id)); }), { rootMargin: "-35% 0px -50% 0px" });
    secs.forEach(s => io.observe(s));
  }
  function setTheme(t) { document.documentElement.dataset.theme = t; const b = $("#themeBtn"); if (b) b.innerHTML = t === "dark" ? I.sun : I.moon; }
  function toast(m) { const e = $("#toast"); e.textContent = m; e.classList.add("show"); setTimeout(() => e.classList.remove("show"), 2600); }

  const hr = new Date().getHours();
  setTheme(localStorage.getItem("babi-theme") || ((hr >= 19 || hr < 6) ? "dark" : "light"));
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  build(localStorage.getItem("babi-lang") || (LANGS.includes(nav) ? nav : (D.defaultLang || "en")));
})();
