/* =====================================================
   Ambil data produk dari Supabase dan tampilkan di katalog.
   Kalau gagal / kosong, website tetap memakai data bawaan
   di index.html (tidak akan rusak).
   ===================================================== */
(async function () {
  const SUPABASE_URL = "https://prvnhdncscdfyhmtrwqj.supabase.co";
  const SUPABASE_KEY = "sb_publishable_H4qdLfdVVg_UyU1GWFNSuA_A49qSmPU";

  try {
    const res = await fetch(
      SUPABASE_URL + "/rest/v1/products?select=*&is_active=eq.true&order=sort_order.asc",
      { headers: { apikey: SUPABASE_KEY } }
    );
    if (!res.ok) return;
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) return;

    // data bawaan (untuk ikon, nama, dan foto cadangan)
    const lama = {};
    bouquetTypes.forEach(t => (lama[t.id] = t));

    const baru = rows.map(r => {
      const o = lama[r.category] || {};
      return {
        ...o,
        id: r.category,
        name: o.name || r.title,
        icon: o.icon || "💐",
        title: r.title,
        composition: r.composition || o.composition || "",
        desc: r.description || o.desc || "",
        badge: r.badge || o.badge || "",
        startPrice: r.price,
        priceLabel: r.price
          ? "Start from Rp " + Number(r.price).toLocaleString("id-ID")
          : "Hubungi untuk harga",
        image: r.image_url || o.image
      };
    });

    bouquetTypes.length = 0;
    bouquetTypes.push(...baru);

    renderProducts("all");
    renderBouquetTypeOptions();
    updateCustomizerPreview();
  } catch (e) {
    console.warn("Supabase tidak terjangkau, memakai data bawaan.", e);
  }
})();
