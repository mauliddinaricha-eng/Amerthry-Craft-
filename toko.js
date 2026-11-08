/* =====================================================
   toko.js  (menggantikan supabase-produk.js)
   - Katalog: banyak produk per kategori, data dari Supabase
   - Foto hero (Freshly Crafted) dari pengaturan
   - Custom order: klik produk -> foto preview ikut berubah
   - Pilihan wrapping/kertas berupa chip warna (boleh pilih lebih dari satu)
   Kalau Supabase tidak terjangkau, website memakai data bawaan.
   ===================================================== */
(function () {
  const SUPABASE_URL = "https://prvnhdncscdfyhmtrwqj.supabase.co";
  const SUPABASE_KEY = "sb_publishable_H4qdLfdVVg_UyU1GWFNSuA_A49qSmPU";
  const NOMOR_WA = (typeof WA_NUMBER !== "undefined") ? WA_NUMBER : "6285766500905";
  const IKON = { big: "💐", medium: "🌷", single: "🌸", loveboard: "🎀", custom: "✨" };

  // Pilihan wrapping bawaan (dipakai kalau tabel wrappers belum ada / kosong)
  const WRAPPER_BAWAAN = [
    { id: "b1", name: "Kertas Koran",     color: "#E3DFD3", image: null },
    { id: "b2", name: "Pink",             color: "#F4B6C8", image: null },
    { id: "b3", name: "Cream",            color: "#F5EFE6", image: null },
    { id: "b4", name: "Putih",            color: "#FFFFFF", image: null },
    { id: "b5", name: "Hitam",            color: "#222222", image: null },
    { id: "b6", name: "Biru",             color: "#9CC3EA", image: null },
    { id: "b7", name: "Kain Tille Salju", color: "#EAF1F8", image: null },
    { id: "b8", name: "Kain Spunbond",    color: "#CFC3E8", image: null }
  ];

  let PRODUK = [];
  let WRAPPERS = WRAPPER_BAWAAN;
  const terpilih = new Set(); // nama wrapping yang dipilih

  /* ---------- helper ---------- */
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rupiah = n => "Rp " + Number(n).toLocaleString("id-ID");
  const labelHarga = p => (p ? "Start from " + rupiah(p) : "Hubungi untuk harga");

  async function ambil(path) {
    try {
      const r = await fetch(SUPABASE_URL + "/rest/v1/" + path, { headers: { apikey: SUPABASE_KEY } });
      return r.ok ? await r.json() : null;
    } catch (e) { return null; }
  }

  function aktifFilter() {
    const b = document.querySelector("#category-filters .filter-btn.active");
    return (b && b.dataset.filter) || "all";
  }

  /* ---------- data bawaan dari index.html ---------- */
  function dariBawaan() {
    if (typeof bouquetTypes === "undefined") return [];
    return bouquetTypes.map(t => ({
      id: t.id, category: t.id, title: t.title, name: t.name, icon: t.icon,
      composition: t.composition, desc: t.desc, badge: t.badge,
      price: t.startPrice || null, priceLabel: t.priceLabel, image: t.image || null
    }));
  }

  /* ---------- KATALOG ---------- */
  window.renderProducts = function (filter) {
    filter = filter || aktifFilter();
    const grid = document.getElementById("product-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const daftar = filter === "all" ? PRODUK : PRODUK.filter(p => p.category === filter);
    if (!daftar.length) {
      grid.innerHTML = '<p class="col-span-full text-center font-hand text-2xl text-sage-dark">Belum ada produk di kategori ini ♡</p>';
      return;
    }

    daftar.forEach((p, idx) => {
      const card = document.createElement("div");
      card.className = "scrapbook-card bg-cream-paper rounded-3xl p-4 border-2 border-lavender-soft shadow-sm relative flex flex-col justify-between";
      card.style.transform = "rotate(" + (idx % 2 === 0 ? "-1.5deg" : "1.5deg") + ")";
      const pesan = "Halo Amerthry Craft! Saya mau tanya tentang " + p.title + " ♡";

      card.innerHTML = `
        <div>
          <div class="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 rotate-[-1deg]"></div>
          <div class="sticker-price absolute top-2 right-2 bg-lavender text-lavender-deep border border-white font-hand font-bold text-sm px-3 py-1 rounded-xl shadow-xs z-10 transition-transform">${esc(p.priceLabel)}</div>
          ${p.badge ? `<span class="absolute top-3 left-3 bg-cream-ivory border border-lavender-soft text-sage-dark text-[10px] font-bold px-2 py-0.5 rounded-md z-10">✦ ${esc(p.badge)}</span>` : ""}
          <div class="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-lavender-pale/80 to-cream-ivory border border-lavender-soft flex items-center justify-center my-2">
            ${p.image ? `<img data-foto src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" class="w-full h-full object-cover">` : generateProductSVG()}
          </div>
          <h3 class="font-display font-bold text-lg text-lavender-deep mt-2 leading-tight">${esc(p.title)}</h3>
          ${p.composition ? `<p class="text-xs text-lavender-dark/80 mt-1">Isi: ${esc(p.composition)}</p>` : ""}
          ${p.desc ? `<p class="text-xs text-lavender-dark/70 mt-1 line-clamp-2">${esc(p.desc)}</p>` : ""}
        </div>
        <div class="mt-4 pt-3 border-t border-dashed border-lavender-soft flex items-center justify-between">
          <div>
            <span class="text-[10px] text-sage-dark font-semibold block">Harga</span>
            <span class="font-display font-bold text-base text-lavender-deep">${p.price ? rupiah(p.price) : "Hubungi kami"}</span>
          </div>
          <a href="https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}" target="_blank" rel="noopener noreferrer" class="bg-lavender-light hover:bg-lavender-dusty text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5">
            <i class="fa-brands fa-whatsapp text-sm"></i><span>Order</span>
          </a>
        </div>`;

      // kalau foto gagal dimuat, pakai gambar ilustrasi
      card.querySelectorAll("img[data-foto]").forEach(img => {
        img.onerror = () => { img.parentElement.innerHTML = generateProductSVG(); };
      });
      grid.appendChild(card);
    });
  };

  /* ---------- CUSTOM ORDER: pilih produk ---------- */
  window.getSelectedType = function () {
    return PRODUK.find(p => p.id === customState.typeId) || PRODUK[0];
  };

  window.renderBouquetTypeOptions = function () {
    const wadah = document.getElementById("custom-flower-options");
    if (!wadah || !PRODUK.length) return;
    if (!PRODUK.some(p => p.id === customState.typeId)) customState.typeId = PRODUK[0].id;

    wadah.classList.add("max-h-96", "overflow-y-auto", "pr-1");
    wadah.innerHTML = "";

    PRODUK.forEach(p => {
      const aktif = p.id === customState.typeId;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "custom-option " + (aktif
        ? "active border-2 border-lavender-dusty bg-lavender-pale"
        : "border-2 border-lavender-soft bg-white hover:border-lavender-light") + " p-3 rounded-2xl text-left transition-all";
      btn.innerHTML = `
        ${p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:10px;margin-bottom:.4rem">` : ""}
        <span class="font-bold text-sm block text-lavender-deep">${p.icon} ${esc(p.title)}</span>
        ${p.composition ? `<span class="text-xs text-sage-dark font-semibold block">${esc(p.composition)}</span>` : ""}
        <span class="text-xs text-lavender-dusty font-bold">${esc(p.priceLabel)}</span>`;
      btn.addEventListener("click", () => {
        customState.typeId = p.id;
        renderBouquetTypeOptions();
        updateCustomizerPreview();
      });
      wadah.appendChild(btn);
    });
  };

  /* ---------- CUSTOM ORDER: pilihan wrapping (chip warna) ---------- */
  function titikWarna(w, ukuran) {
    const latar = w.image
      ? "background:url(" + encodeURI(w.image) + ") center/cover"
      : "background:" + esc(w.color);
    return `<span style="display:inline-block;width:${ukuran}px;height:${ukuran}px;border-radius:50%;border:2px solid #C5B0EC;${latar};flex-shrink:0"></span>`;
  }

  function renderWrapperOptions() {
    const wadah = document.getElementById("custom-wrapper-options");
    if (!wadah) return;
    wadah.innerHTML = "";

    WRAPPERS.forEach(w => {
      const aktif = terpilih.has(w.name);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-pressed", aktif);
      btn.className = "wrapper-option flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all " +
        (aktif ? "active border-lavender-dusty bg-lavender-soft text-lavender-deep"
               : "border-lavender-soft bg-white text-lavender-dark hover:border-lavender-light");
      btn.innerHTML = titikWarna(w, 22) + "<span>" + esc(w.name) + "</span>";
      btn.addEventListener("click", () => {
        if (terpilih.has(w.name)) terpilih.delete(w.name); else terpilih.add(w.name);
        customState.wrapper = [...terpilih].join(" + ");
        renderWrapperOptions();
        updateCustomizerPreview();
      });
      wadah.appendChild(btn);
    });

    const info = document.createElement("p");
    info.className = "w-full text-[11px] text-sage-dark";
    info.textContent = "Boleh pilih lebih dari satu (misalnya kertas koran + kain tille).";
    wadah.appendChild(info);
  }

  /* ---------- CUSTOM ORDER: preview ---------- */
  window.updateCustomizerPreview = function () {
    const tipe = getSelectedType();
    if (!tipe) return;

    const ikon = document.getElementById("preview-flower-icon");
    let foto = document.getElementById("preview-photo");
    if (!foto && ikon) {
      foto = document.createElement("img");
      foto.id = "preview-photo";
      foto.alt = "";
      foto.style.cssText = "width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:12px;display:none;margin-bottom:.5rem";
      ikon.parentNode.insertBefore(foto, ikon);
    }
    if (foto && ikon) {
      if (tipe.image) {
        foto.onerror = () => { foto.style.display = "none"; ikon.style.display = ""; };
        foto.src = tipe.image;
        foto.alt = tipe.title;
        foto.style.display = "block";
        ikon.style.display = "none";
      } else {
        foto.style.display = "none";
        ikon.style.display = "";
        ikon.innerText = tipe.icon;
      }
    }

    const nama = document.getElementById("preview-flower-name");
    if (nama) nama.innerText = tipe.title + (tipe.composition ? " — " + tipe.composition : "");

    const daftarWrap = WRAPPERS.filter(w => terpilih.has(w.name));
    const wrapEl = document.getElementById("preview-wrapper-name");
    if (wrapEl) {
      wrapEl.innerText = "Wrapping: " + (daftarWrap.length ? daftarWrap.map(w => w.name).join(" + ") : "belum dipilih");
      let titik = document.getElementById("preview-wrapper-swatches");
      if (!titik) {
        titik = document.createElement("div");
        titik.id = "preview-wrapper-swatches";
        titik.style.cssText = "display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:6px";
        wrapEl.parentNode.insertBefore(titik, wrapEl.nextSibling);
      }
      titik.innerHTML = daftarWrap.map(w => titikWarna(w, 22)).join("");
    }

    const harga = document.getElementById("preview-total-price");
    if (harga) harga.innerText = "Estimated Price: " + tipe.priceLabel;

    const catatan = document.getElementById("preview-note-text");
    if (catatan) {
      const t = (customState.note || "").trim();
      catatan.innerText = t ? '"' + t + '"' : '"Your special request will appear here... ♡"';
    }
  };

  /* ---------- Tombol pesan WhatsApp (custom) ---------- */
  function pasangTombolWA() {
    const lama = document.getElementById("send-custom-wa");
    if (!lama) return;
    const baru = lama.cloneNode(true); // buang pendengar klik lama
    lama.replaceWith(baru);
    baru.addEventListener("click", () => {
      const t = getSelectedType();
      if (!t) return;
      const wrap = WRAPPERS.filter(w => terpilih.has(w.name)).map(w => w.name).join(" + ") || "-";
      const baris = [
        "Halo Amerthry Craft! 💜",
        "Saya mau order Custom Bouquet:",
        "- Produk: " + t.title,
        "- Isi: " + (t.composition || "-"),
        "- Wrapping: " + wrap,
        '- Special Request: "' + ((customState.note || "").trim() || "-") + '"',
        "- Estimasi Harga: " + t.priceLabel,
        "",
        "Mohon diproses ya, terima kasih! ♡"
      ];
      window.open("https://wa.me/" + NOMOR_WA + "?text=" + encodeURIComponent(baris.join("\n")), "_blank");
    });
  }

  /* ---------- Foto hero (Freshly Crafted) ---------- */
  function terapkanPengaturan(s) {
    const svg = document.querySelector('#hero svg[viewBox="0 0 300 350"]');
    if (!svg) return;
    const bingkai = svg.parentElement;
    const kartu = bingkai.parentElement;

    if (s.hero_image) {
      const img = new Image();
      img.alt = s.hero_caption || "Amerthry Craft";
      img.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover";
      img.onload = () => svg.replaceWith(img); // kalau gagal dimuat, ilustrasi lama tetap tampil
      img.src = s.hero_image;
    }
    if (s.hero_caption) {
      const lapisan = bingkai.querySelector("div.absolute");
      if (lapisan) lapisan.textContent = "✦ " + s.hero_caption;
      const teks = kartu.querySelector(".mt-3 p");
      if (teks) teks.textContent = '"' + s.hero_caption + '" ♡';
    }
  }

  /* ---------- Testimoni (bukti chat / Love Notes) ---------- */
  function bukaZoom(src) {
    const o = document.createElement("div");
    o.style.cssText = "position:fixed;inset:0;z-index:100;background:rgba(53,39,69,.85);display:flex;align-items:center;justify-content:center;padding:1rem;cursor:zoom-out";
    o.innerHTML = '<img src="' + esc(src) + '" alt="" style="max-width:100%;max-height:100%;border-radius:12px;background:#fff">';
    const tutup = e => { if (e.type === "click" || e.key === "Escape") { o.remove(); document.removeEventListener("keydown", tutup); } };
    o.addEventListener("click", tutup);
    document.addEventListener("keydown", tutup);
    document.body.appendChild(o);
  }

  function renderTestimoni(rows) {
    const bagian = document.getElementById("testimonials");
    const grid = document.querySelector("#testimonials .grid");
    if (!bagian || !grid) return;
    if (!rows.length) { bagian.style.display = "none"; return; } // tidak ada -> bagian disembunyikan

    const miring = ["rotate-[-1.5deg]", "rotate-[2deg]", "rotate-[-1deg]"];
    const lakban = [
      '<div class="washi-tape absolute -top-3 left-6 w-24 h-6 rotate-[-5deg]"></div>',
      '<div class="washi-tape-cream absolute -top-3 right-6 w-24 h-6 rotate-[8deg]"></div>',
      '<div class="washi-tape absolute -top-3 left-1/3 w-24 h-6 rotate-[2deg]"></div>'
    ];
    grid.className = "columns-1 sm:columns-2 gap-6 " + (rows.length === 4 ? "lg:columns-4" : "lg:columns-3");
    grid.innerHTML = rows.map((r, i) => {
      const bintang = r.content ? '<div class="flex text-amber-400 text-xs gap-1 mb-2">' + "★".repeat(Math.min(5, Math.max(1, r.rating || 5))) + "</div>" : "";
      const teks = r.content ? '<p class="font-hand text-xl text-lavender-dark leading-snug">"' + esc(r.content) + '"</p>' : "";
      const kaki = (r.name || r.tag) ? `
        <div class="mt-3 pt-3 border-t border-dashed border-lavender-soft flex justify-between items-center gap-2">
          <span class="font-bold text-xs text-lavender-deep">${r.name ? "— " + esc(r.name) : ""}</span>
          ${r.tag ? '<span class="text-[10px] bg-lavender-pale px-2 py-0.5 rounded-md text-sage-dark font-bold">' + esc(r.tag) + "</span>" : ""}
        </div>` : "";
      return `
      <div class="break-inside-avoid mb-8 ${i % 2 ? "bg-cream-ivory" : "bg-cream-paper"} p-4 rounded-2xl border border-lavender-soft shadow-md relative transform ${miring[i % 3]} hover:rotate-0 hover:-translate-y-2 transition-all duration-300">
        ${lakban[i % 3]}
        ${r.image_url ? `<img data-zoom src="${esc(r.image_url)}" alt="Bukti chat pelanggan" loading="lazy" style="width:100%;height:auto;display:block;border-radius:12px;margin-bottom:.6rem;cursor:zoom-in">` : ""}
        ${bintang}${teks}${kaki}
      </div>`;
    }).join("");

    grid.onclick = e => { const im = e.target.closest("img[data-zoom]"); if (im) bukaZoom(im.src); };
    bagian.style.display = "";
  }

  /* ---------- Mulai ---------- */
  function renderSemua() {
    renderProducts();
    renderBouquetTypeOptions();
    renderWrapperOptions();
    updateCustomizerPreview();
  }

  PRODUK = dariBawaan();
  const bagianTesti = document.getElementById("testimonials");
  if (bagianTesti) bagianTesti.style.display = "none";
  pasangTombolWA();
  renderWrapperOptions();

  (async function () {
    const [prod, wrap, atur, testi] = await Promise.all([
      ambil("products?select=*&is_active=eq.true&order=sort_order.asc,id.asc"),
      ambil("wrappers?select=*&is_active=eq.true&order=sort_order.asc,id.asc"),
      ambil("site_settings?select=*"),
      ambil("testimonials?select=*&is_active=eq.true&order=sort_order.asc,id.asc")
    ]);

    if (Array.isArray(testi)) renderTestimoni(testi);

    if (Array.isArray(prod) && prod.length) {
      // foto lama dari GitHub dipakai untuk produk pertama tiap kategori yang belum punya foto
      const fotoLama = {};
      dariBawaan().forEach(t => { if (t.image) fotoLama[t.category] = t.image; });
      const sudah = new Set();
      PRODUK = prod.map(r => {
        let gambar = r.image_url || null;
        if (!gambar && !sudah.has(r.category)) gambar = fotoLama[r.category] || null;
        sudah.add(r.category);
        return {
          id: String(r.id), category: r.category, title: r.title, name: r.title,
          icon: IKON[r.category] || "💐", composition: r.composition || "",
          desc: r.description || "", badge: r.badge || "",
          price: r.price || null, priceLabel: labelHarga(r.price), image: gambar
        };
      });
    }

    if (Array.isArray(wrap) && wrap.length) {
      WRAPPERS = wrap.map(r => ({ id: String(r.id), name: r.name, color: r.color || "#FFFFFF", image: r.image_url || null }));
    }

    if (Array.isArray(atur)) {
      const s = {};
      atur.forEach(r => { s[r.key] = r.value; });
      terapkanPengaturan(s);
    }

    renderSemua();
  })();
})();
