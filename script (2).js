const productsData = [
    {
        id: 1,
        title: "Big Size Bouquet",
        category: "big",
        price: 120000,
        priceTag: "Start 120K ♡",
        priceLabel: "Starting from Rp120.000",
        desc: "A statement-sized custom bouquet made with 10 pcs bunga besar, 2 pcs bunga kecil, 1 pc daun, and your choice of wrapping.",
        badge: "Best Seller",
        wrapper: "Custom Wrapping",
        svgType: "big-lavender",
        photo: "images/big-bouquet.jpeg"
    },
    {
        id: 2,
        title: "Medium Size Bouquet",
        category: "medium",
        price: 35000,
        priceTag: "Start 35K ♡",
        priceLabel: "Starting from Rp35.000",
        desc: "A sweet and balanced custom bouquet with 2 pcs bunga besar, 2 pcs bunga kecil, 1 pc daun, and your choice of wrapping.",
        badge: "Popular",
        wrapper: "Custom Wrapping",
        svgType: "tulip-set",
        photo: "images/medium-bouquet.jpeg"
    },
    {
        id: 3,
        title: "Single Size Bouquet",
        category: "single",
        price: 15000,
        priceTag: "Start 15K ♡",
        priceLabel: "Starting from Rp15.000",
        desc: "A simple custom single-flower bouquet with your preferred wrapping style and paper color.",
        badge: "Sweet & Simple",
        wrapper: "Custom Wrapping",
        svgType: "single-stem",
        photo: "images/single-bouquet.jpeg"
    },
    {
        id: 4,
        title: "Love Board Bouquet",
        category: "loveboard",
        price: 35000,
        priceTag: "Start 35K ♡",
        priceLabel: "Starting from Rp35.000",
        desc: "A personalized gift combination featuring 1 Love Board and 1 Single Bouquet.",
        badge: "Special Gift",
        wrapper: "Custom Wrapping",
        svgType: "gift-box",
        photo: "images/love-board.jpeg"
    }
];

function generateProductSVG(type) {
    const isBig = type === "big-lavender";
    const isMedium = type === "tulip-set";
    const isSingle = type === "single-stem";
    const isLove = type === "gift-box";

    const flowerCount = isBig ? 10 : isMedium ? 4 : 1;
    const flowerPositions = [
        [100, 42], [75, 55], [125, 55], [55, 78], [145, 78],
        [85, 88], [115, 88], [68, 105], [132, 105], [100, 100]
    ];

    const flowers = flowerPositions.slice(0, flowerCount).map(([x, y], i) => `
        <g>
            <path d="M100 125 Q${x} ${y + 18} ${x} ${y + 8}" stroke="#8F9E8B" stroke-width="2.3" stroke-linecap="round"/>
            <circle cx="${x}" cy="${y}" r="${i % 3 === 0 ? 9 : 7}" fill="${["#D8C7F3","#C5B0EC","#F3D7E2","#DDEEDC","#F8E5B8"][i % 5]}" stroke="#4A3B59" stroke-width="1.2"/>
            ${i % 2 === 0 ? `<circle cx="${x-7}" cy="${y+5}" r="5" fill="#EBE3F8"/><circle cx="${x+7}" cy="${y+5}" r="5" fill="#C5B0EC"/>` : ""}
        </g>
    `).join("");

    return `
        <svg class="w-full h-full p-4" viewBox="0 0 200 220" fill="none">
            <rect width="200" height="220" rx="12" fill="#FAF6EE"/>
            <path d="M38 100 L100 205 L162 100 C162 100 132 116 100 116 C68 116 38 100 38 100 Z" fill="#D8C7F3" stroke="#4A3B59" stroke-width="2"/>
            <path d="M52 92 L100 182 L148 92 C148 92 126 102 100 102 C74 102 52 92 52 92 Z" fill="#FFFDF7" stroke="#4A3B59" stroke-width="1.5"/>
            ${flowers}
            ${isBig ? `
                <path d="M68 150 Q55 142 50 130" stroke="#8F9E8B" stroke-width="2.5"/>
                <path d="M132 150 Q145 142 150 130" stroke="#8F9E8B" stroke-width="2.5"/>
                <path d="M70 150 Q55 140 62 132 Q73 138 70 150 Z" fill="#8F9E8B"/>
                <path d="M130 150 Q145 140 138 132 Q127 138 130 150 Z" fill="#8F9E8B"/>
            ` : ""}
            <path d="M100 152 C85 137 70 152 90 160 C95 162 100 160 100 160 C100 160 105 162 110 160 C130 152 115 137 100 152 Z" fill="#F3D7E2" stroke="#4A3B59" stroke-width="1.5"/>
            ${isLove ? `<rect x="72" y="55" width="56" height="32" rx="5" fill="#FFFDF7" stroke="#C5B0EC" stroke-width="2"/><path d="M100 70 C94 60 84 66 100 78 C116 66 106 60 100 70 Z" fill="#F3D7E2"/>` : ""}
        </svg>
    `;
}


function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const filtered = filter === 'all' ? productsData : productsData.filter(p => p.category === filter);

    filtered.forEach((p, idx) => {
        const rotationDeg = (idx % 2 === 0) ? '-1.5deg' : '1.5deg';
        
        const card = document.createElement('div');
        card.className = 'scrapbook-card bg-cream-paper rounded-3xl p-4 border-2 border-lavender-soft shadow-sm relative flex flex-col justify-between';
        card.style.transform = `rotate(${rotationDeg})`;

        card.innerHTML = `
            <div>
                <!-- Tape Header -->
                <div class="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 rotate-[-1deg]"></div>

                <!-- Price Sticker Tag -->
                <div class="sticker-price absolute top-2 right-2 bg-lavender text-lavender-deep border border-white font-hand font-bold text-base px-3 py-1 rounded-xl shadow-xs z-10 transition-transform">
                    ${p.priceTag}
                </div>

                <!-- Badge -->
                <span class="absolute top-3 left-3 bg-cream-ivory border border-lavender-soft text-sage-dark text-[10px] font-bold px-2 py-0.5 rounded-md z-10">
                    ✦ ${p.badge}
                </span>

                <!-- Image / Graphic Illustration -->
                <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-lavender-pale/80 to-cream-ivory border border-lavender-soft flex items-center justify-center my-2">
                    ${generateProductSVG(p.svgType)}
                </div>

                <!-- Content Info -->
                <h3 class="font-display font-bold text-lg text-lavender-deep mt-2 leading-tight">${p.title}</h3>
                <p class="text-xs text-lavender-dark/80 mt-1 line-clamp-2">${p.desc}</p>
            </div>

            <!-- Footer Action & WhatsApp Order -->
            <div class="mt-4 pt-3 border-t border-dashed border-lavender-soft flex items-center justify-between">
                <div>
                    <span class="text-[10px] text-sage-dark font-semibold block">Price</span>
                    <span class="font-display font-bold text-base text-lavender-deep">${p.priceLabel}</span>
                </div>
                <a href="https://wa.me/628123456789?text=Halo%20Amerthry%20Craft!%20Saya%20mau%20order%20buket%20${encodeURIComponent(p.title)}%20(${p.priceTag})%20♡" target="_blank" class="bg-lavender-light hover:bg-lavender-dusty text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5">
                    <i class="fa-brands fa-whatsapp text-sm"></i>
                    <span>Order</span>
                </a>
            </div>
        `;

        grid.appendChild(card);
    });
}

document.querySelectorAll('#category-filters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#category-filters .filter-btn').forEach(b => {
            b.classList.remove('active', 'bg-lavender-dusty', 'text-white');
            b.classList.add('bg-cream-paper', 'text-lavender-dark');
        });
        btn.classList.add('active', 'bg-lavender-dusty', 'text-white');
        btn.classList.remove('bg-cream-paper', 'text-lavender-dark');

        const filter = btn.getAttribute('data-filter');
        renderProducts(filter);
    });
});

let customState = {
    size: "big",
    title: "Custom Big Bouquet • 10 Bunga Besar + 2 Bunga Kecil + 1 Daun",
    price: 120000,
    priceLabel: "Starting from Rp120.000",
    flowerElements: [],
    wrappingStyle: "",
    wrappingColor: "",
    note: ""
};
const customizerData = {
    big: {
        title: "Custom Big Bouquet • 10 Bunga Besar + 2 Bunga Kecil + 1 Daun",
        previewTitle: "Big Size Pipe Cleaner Flower Bouquet",
        code: "3",
        kicker: "Big Bouquet",
        price: 120000,
        priceLabel: "Starting from Rp120.000",
        photo: "images/big-bouquet.jpeg",
        badge: "Big Size • Best Seller",
        icon: "💐",
        elements: [
            "10 pcs Bunga Besar",
            "2 pcs Bunga Kecil",
            "1 pc Daun"
        ],
        description:
            "Bouquet ukuran besar dengan komposisi 10 bunga besar, 2 bunga kecil, dan 1 daun. Cocok untuk hadiah utama dan momen spesial.",
        note:
            "Komposisi Big Bouquet sudah ditentukan seperti di atas. Kamu tetap bisa memilih gaya wrapping dan warna paper pastel."
    },

    medium: {
        title: "Custom Medium Bouquet • 2 Bunga Besar + 2 Bunga Kecil + 1 Daun",
        previewTitle: "Medium Size Pipe Cleaner Flower Bouquet",
        code: "2",
        kicker: "Medium Bouquet",
        price: 35000,
        priceLabel: "Starting from Rp35.000",
        photo: "images/medium-bouquet.jpeg",
        badge: "Medium Bouquet",
        icon: "🌷",
        elements: [
            "2 pcs Bunga Besar",
            "2 pcs Bunga Kecil",
            "1 pc Daun"
        ],
        description:
            "Bouquet medium dengan komposisi 2 bunga besar, 2 bunga kecil, dan 1 daun. Ukurannya lebih ringkas tetapi tetap terlihat penuh dan manis.",
        note:
            "Komposisi Medium Bouquet sudah ditentukan. Pilih wrapping style dan warna paper pastel sesuai tema hadiah."
    },

    single: {
        title: "Custom Single Bouquet • 1 Bunga Besar",
        previewTitle: "Single Size Pipe Cleaner Flower Bouquet",
        code: "1",
        kicker: "Single Bouquet",
        price: 15000,
        priceLabel: "Starting from Rp15.000",
        photo: "images/single-bouquet.jpeg",
        badge: "Sweet & Simple",
        icon: "🌸",
        elements: [
            "1 pc Bunga Besar"
        ],
        description:
            "Bouquet simple dengan 1 bunga besar. Pilihan yang ringkas untuk hadiah kecil, ucapan, atau pelengkap hadiah.",
        note:
            "Single Bouquet terdiri dari 1 bunga besar. Kamu bisa memilih gaya wrapping dan paper pastel."
    },

    loveboard: {
        title: "Custom Love Board • 1 Love Board + 1 Single Bouquet",
        previewTitle: "Love Board + Single Bouquet",
        code: "4",
        kicker: "Love Board",
        price: 35000,
        priceLabel: "Starting from Rp35.000",
        photo: "images/love-board.jpeg",
        badge: "Special Gift",
        icon: "🎀",
        elements: [
            "1 pc Love Board",
            "1 pc Single Bouquet"
        ],
        description:
            "Gift set yang terdiri dari 1 Love Board dan 1 Single Bouquet. Cocok untuk pesan personal dan hadiah yang lebih memorable.",
        note:
            "Love Board + Single Bouquet dapat dipadukan dengan wrapping pastel pilihanmu."
    }
};
function setCustomizerType(type) {
    const data = customizerData[type];

    if (!data) return;

    customState.size = type;
    customState.title = data.title;
    customState.price = data.price;
    customState.priceLabel = data.priceLabel;
    customState.flowerElements = [...data.elements];
    customState.wrappingStyle = "";
    customState.wrappingColor = "";
    customState.note = "";

    document.querySelectorAll(".size-option").forEach(button => {
        const isActive = button.getAttribute("data-size") === type;
        button.classList.toggle("active", isActive);
        button.classList.toggle("bg-lavender-pale", isActive);
        button.classList.toggle("border-lavender-dusty", isActive);
        button.classList.toggle("bg-white", !isActive);
        button.classList.toggle("border-lavender-soft", !isActive);
    });

    // Customizer title
    const customizerTitle = document.getElementById("customizer-title");

    if (customizerTitle) {
        customizerTitle.innerText = data.title;
    }

    // Preview title
    const previewTitle = document.getElementById("preview-flower-name");

    if (previewTitle) {
        previewTitle.innerText = data.previewTitle;
    }

    // Preview price
    const previewPrice = document.getElementById("preview-total-price");

    if (previewPrice) {
        previewPrice.innerText = data.priceLabel;
    }

    // Description
    const customizerDescription =
        document.getElementById("customizer-description");

    if (customizerDescription) {
        customizerDescription.innerText = data.description;
    }

    // Dedicated type detail "page"
    const detailPhoto = document.getElementById("custom-type-photo");
    const detailFallback = document.getElementById("photo-fallback");
    const detailHeading = document.getElementById("custom-type-heading");
    const detailKicker = document.getElementById("custom-type-kicker");
    const detailPrice = document.getElementById("custom-type-price");
    const detailDescription = document.getElementById("custom-type-long-description");
    const detailBadge = document.getElementById("custom-photo-badge");
    const detailNote = document.getElementById("custom-type-note");
    const fallbackIcon = document.getElementById("fallback-icon");

    if (detailPhoto) {
        detailPhoto.style.display = "block";
        detailPhoto.src = data.photo;
        detailPhoto.alt = data.previewTitle;
    }

    if (detailFallback) {
        detailFallback.classList.add("hidden");
    }

    if (detailHeading) detailHeading.innerText = data.previewTitle;
    if (detailKicker) detailKicker.innerText = data.kicker;
    if (detailPrice) detailPrice.innerText = data.priceLabel;
    if (detailDescription) detailDescription.innerText = data.description;
    if (detailBadge) detailBadge.innerText = `Kode ${data.code} • ${data.badge}`;
    if (detailNote) detailNote.innerText = data.note;
    if (fallbackIcon) fallbackIcon.innerText = data.icon;

    const composition = document.getElementById("custom-type-composition");
    if (composition) {
        composition.innerHTML = data.elements.map((element, index) => `
            <div class="composition-item">
                <span class="composition-number">${index + 1}</span>
                <div>
                    <strong>${element}</strong>
                    <small>Included in ${data.kicker}</small>
                </div>
            </div>
        `).join("");
    }

    renderFlowerElements(data.elements);
    renderWrappingOptions();

    const firstStyle = document.querySelector(".wrapper-style-option");
    const firstColor = document.querySelector(".wrapper-color-option");

    if (firstStyle) firstStyle.click();
    if (firstColor) firstColor.click();

    updateCustomizerPreview();
}
function renderFlowerElements(elements) {
    const container = document.getElementById("custom-flower-options");

    if (!container) return;

    container.innerHTML = "";

    elements.forEach((element, index) => {
        const option = document.createElement("div");

        option.className =
            "custom-option border border-lavender-soft bg-white rounded-2xl p-4";

        option.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-lavender-pale flex items-center justify-center">
                    ✿
                </div>

                <div>
                    <p class="font-bold text-lavender-deep">
                        ${element}
                    </p>

                    <p class="text-xs text-lavender-dark/70 mt-1">
                        Included in this bouquet size
                    </p>
                </div>
            </div>
        `;

        container.appendChild(option);
    });
}
function renderWrappingOptions() {
    const container = document.getElementById("custom-wrapper-options");

    if (!container) return;

    container.innerHTML = `
        <div class="mb-5">
            <h4 class="font-bold text-lavender-deep mb-3">
                Choose Your Wrapping Style
            </h4>

            <div class="grid grid-cols-2 gap-3">
                ${wrappingStyles.map(style => `
                    <button
                        type="button"
                        class="wrapper-style-option border border-lavender-soft bg-white rounded-xl p-3 text-sm text-lavender-dark hover:border-lavender-dusty transition"
                        data-style="${style}"
                    >
                        ${style}
                    </button>
                `).join("")}
            </div>
        </div>

        <div>
            <h4 class="font-bold text-lavender-deep mb-3">
                Choose Your Paper Color
            </h4>

            <div class="grid grid-cols-3 gap-3">
                ${wrappingColors.map(color => `
                    <button
                        type="button"
                        class="wrapper-color-option border border-lavender-soft bg-white rounded-xl p-3 text-sm text-lavender-dark hover:border-lavender-dusty transition"
                        data-color="${color}"
                    >
                        ${color}
                    </button>
                `).join("")}
            </div>
        </div>

        <p class="text-xs text-lavender-dark/70 mt-4">
            Choose the wrapping style and paper color that best match your bouquet.
            Custom wrapping colors and styles are available by request.
        </p>
    `;

    container
        .querySelectorAll(".wrapper-style-option")
        .forEach(button => {
            button.addEventListener("click", () => {
                container
                    .querySelectorAll(".wrapper-style-option")
                    .forEach(btn => {
                        btn.classList.remove(
                            "bg-lavender-pale",
                            "border-lavender-dusty"
                        );
                    });

                button.classList.add(
                    "bg-lavender-pale",
                    "border-lavender-dusty"
                );

                customState.wrappingStyle =
                    button.getAttribute("data-style");

                updateCustomizerPreview();
            });
        });

    container
        .querySelectorAll(".wrapper-color-option")
        .forEach(button => {
            button.addEventListener("click", () => {
                container
                    .querySelectorAll(".wrapper-color-option")
                    .forEach(btn => {
                        btn.classList.remove(
                            "bg-lavender-pale",
                            "border-lavender-dusty"
                        );
                    });

                button.classList.add(
                    "bg-lavender-pale",
                    "border-lavender-dusty"
                );

                customState.wrappingColor =
                    button.getAttribute("data-color");

                updateCustomizerPreview();
            });
        });
}
const wrappingStyles = [
    "Classic Pastel Wrap",
    "Layered Pastel Wrap",
    "Cone Pastel Wrap",
    "Gift Pastel Wrap"
];

const wrappingColors = [
    "Pastel Lavender",
    "Baby Pink",
    "Baby Blue",
    "Mint Green",
    "Peach",
    "Butter Yellow",
    "Cream",
    "Blush Pink"
];

const customNoteInput = document.getElementById('custom-note');

if (customNoteInput) {
    customNoteInput.addEventListener('input', (e) => {
        customState.note = e.target.value;
        updateCustomizerPreview();
    });
}
function updateCustomizerPreview() {
    const data = customizerData[customState.size];

    const previewFlowerName =
        document.getElementById("preview-flower-name");

    const previewWrapperName =
        document.getElementById("preview-wrapper-name");

    const previewPrice =
        document.getElementById("preview-total-price");

    const previewNote =
        document.getElementById("preview-note-text");

    if (previewFlowerName) {
        previewFlowerName.innerText = data.previewTitle;
    }

    if (previewWrapperName) {
        let wrappingText = "Custom Wrapping";

        if (
            customState.wrappingStyle &&
            customState.wrappingColor
        ) {
            wrappingText =
                `${customState.wrappingStyle} • ${customState.wrappingColor}`;
        } else if (customState.wrappingStyle) {
            wrappingText = customState.wrappingStyle;
        } else if (customState.wrappingColor) {
            wrappingText = customState.wrappingColor;
        }

        previewWrapperName.innerText =
            `Wrapping: ${wrappingText}`;
    }

    if (previewPrice) {
        previewPrice.innerText = data.priceLabel;
    }

    if (previewNote) {
        previewNote.innerText =
            customState.note.trim()
                ? `"${customState.note.trim()}"`
                : `"Your special request will appear here... ♡"`;
    }
}
document.getElementById("send-custom-wa")
    ?.addEventListener("click", () => {

        const data = customizerData[customState.size];

        const elements =
            customState.flowerElements.length
                ? customState.flowerElements.join(", ")
                : "-";

        const price =
            customState.price
                ? `Rp ${customState.price.toLocaleString("id-ID")}`
                : "Price Based on Request";

        const message = `
Halo Amerthry Craft! 💜

Saya mau order:
*${data.previewTitle}*

*Flower Elements:*
${elements}

*Wrapping Style:*
${customState.wrappingStyle || "-"}

*Paper Color:*
${customState.wrappingColor || "-"}

*Special Request:*
${customState.note || "-"}

*Estimated Price:*
${price}

Mohon dibantu untuk proses dan konfirmasi detail request saya ya. Terima kasih! ♡
        `.trim();

        window.open(
            `https://wa.me/628123456789?text=${encodeURIComponent(message)}`,
            "_blank"
        );
    });

document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        content.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    });
});

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

const canvas = document.getElementById('trail-canvas');

if (canvas) {
    const ctx = canvas.getContext('2d');
    let flowers = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.2) {
            flowers.push({
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 12 + 8,
                color: Math.random() > 0.5
                    ? '#D8C7F3'
                    : '#C5B0EC',
                alpha: 1,
                vy: Math.random() * -1 - 0.5,
                vx: (Math.random() - 0.5) * 1.5,
                rotation: Math.random() * 360
            });
        }
    });

    function drawFlower(ctx, x, y, size, color, alpha, rotation) {
        ctx.save();

        ctx.translate(x, y);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;

        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.rotate((72 * Math.PI) / 180);

            ctx.ellipse(
                0,
                size / 2,
                size / 4,
                size / 2,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(0, 0, size / 3, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFDF7';
        ctx.fill();

        ctx.restore();
    }

    function animateTrail() {
        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        for (let i = flowers.length - 1; i >= 0; i--) {
            const f = flowers[i];

            f.x += f.vx;
            f.y += f.vy;
            f.alpha -= 0.015;
            f.rotation += 1;

            drawFlower(
                ctx,
                f.x,
                f.y,
                f.size,
                f.color,
                f.alpha,
                f.rotation
            );

            if (f.alpha <= 0) {
                flowers.splice(i, 1);
            }
        }

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
}

// Initial Load
window.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    setCustomizerType('big');
});


// Real-photo fallback: if the selected local photo is missing, show the cute placeholder.
document.getElementById("custom-type-photo")?.addEventListener("error", function () {
    this.style.display = "none";
    document.getElementById("photo-fallback")?.classList.remove("hidden");
});
