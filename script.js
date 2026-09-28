const productsData = [
    {
        id: 1,
        title: "Big Size Bouquet",
        category: "big",
        price: 120000,
        priceTag: "Start 120K ♡",
        priceLabel: "Starting from Rp120.000",
        desc: "A statement-sized custom bouquet made with 10 large flowers, 2 small flower clusters, 1 leaf, and your choice of wrapping.",
        badge: "Best Seller",
        wrapper: "Custom Wrapping",
        svgType: "big-lavender"
    },
    {
        id: 2,
        title: "Medium Size Bouquet",
        category: "medium",
        price: 35000,
        priceTag: "Start 35K ♡",
        priceLabel: "Starting from Rp35.000",
        desc: "A sweet and balanced custom bouquet with 2 large flowers, 2 small flower clusters, 1 leaf, and your choice of wrapping.",
        badge: "Popular",
        wrapper: "Custom Wrapping",
        svgType: "tulip-set"
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
        svgType: "single-stem"
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
        svgType: "gift-box"
    },
    {
        id: 5,
        title: "Custom Bouquet",
        category: "custom",
        price: null,
        priceTag: "By Request ♡",
        priceLabel: "Price Based on Request",
        desc: "A fully personalized bouquet combining custom items, snacks, gifts, or other elements based on your request.",
        badge: "Made by Request",
        wrapper: "Custom",
        svgType: "daisy-rose"
    }
];

function generateProductSVG(type) {
    return `
        <svg class="w-full h-full p-4" viewBox="0 0 200 220" fill="none">
            <rect width="200" height="220" rx="12" fill="#FAF6EE"/>
            <!-- Wrapping Paper -->
            <path d="M40 90 L100 200 L160 90 C160 90 130 105 100 105 C70 105 40 90 40 90 Z" fill="#D8C7F3" stroke="#4A3B59" stroke-width="2"/>
            <path d="M50 85 L100 180 L150 85 C150 85 125 95 100 95 C75 95 50 85 50 85 Z" fill="#FFFDF7" stroke="#4A3B59" stroke-width="1.5"/>
            
            <!-- Flowers -->
            <path d="M100 40 L100 110" stroke="#8F9E8B" stroke-width="2.5"/>
            <circle cx="100" cy="35" r="5" fill="#9E8CC2"/>
            <circle cx="95" cy="45" r="4" fill="#C5B0EC"/>
            <circle cx="105" cy="45" r="4" fill="#C5B0EC"/>
            <circle cx="94" cy="55" r="5" fill="#D8C7F3"/>
            <circle cx="106" cy="55" r="5" fill="#D8C7F3"/>

            <path d="M75 60 Q90 75 100 110" stroke="#8F9E8B" stroke-width="2.5"/>
            <circle cx="75" cy="55" r="8" fill="#EBE3F8" stroke="#4A3B59" stroke-width="1.5"/>

            <path d="M125 60 Q110 75 100 110" stroke="#8F9E8B" stroke-width="2.5"/>
            <circle cx="125" cy="55" r="8" fill="#C5B0EC" stroke="#4A3B59" stroke-width="1.5"/>

            <!-- Ribbon Bow -->
            <path d="M100 150 C85 135 70 150 90 158 C95 160 100 158 100 158 C100 158 105 160 110 158 C130 150 115 135 100 150 Z" fill="#C5B0EC" stroke="#4A3B59" stroke-width="1.5"/>
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
    title: "Build Your Custom Big Size Bouquet",
    price: 120000,
    priceLabel: "Starting from Rp120.000",
    flowerElements: [],
    wrappingStyle: "",
    wrappingColor: "",
    note: ""
};
const customizerData = {
    big: {
        title: "Build Your Custom Big Size Bouquet",
        previewTitle: "Big Size Bouquet",
        price: 120000,
        priceLabel: "Starting from Rp120.000",

        elements: [
            "10 pcs Large Flowers",
            "2 pcs Small Flower Clusters",
            "1 pc Leaf"
        ],

        description:
            "A statement-sized bouquet designed for special moments, with plenty of room to personalize your flower colors and wrapping."
    },

    medium: {
        title: "Build Your Custom Medium Size Bouquet",
        previewTitle: "Medium Size Bouquet",
        price: 35000,
        priceLabel: "Starting from Rp35.000",

        elements: [
            "2 pcs Large Flowers",
            "2 pcs Small Flower Clusters",
            "1 pc Leaf"
        ],

        description:
            "A balanced and charming bouquet for everyday gifting, celebrations, and special moments."
    },

    single: {
        title: "Build Your Custom Single Size Bouquet",
        previewTitle: "Single Size Bouquet",
        price: 15000,
        priceLabel: "Starting from Rp15.000",

        elements: [
            "1 pc Large Flower"
        ],

        description:
            "A simple yet meaningful single-flower bouquet with your choice of wrapping style and paper color."
    },

    loveboard: {
        title: "Build Your Custom Love Board Bouquet",
        previewTitle: "Love Board Bouquet",
        price: 35000,
        priceLabel: "Starting from Rp35.000",

        elements: [
            "1 pc Love Board",
            "1 pc Single Bouquet"
        ],

        description:
            "A personalized gift combining a Love Board and Single Bouquet, perfect for expressing a special message."
    },

    custom: {
        title: "Build Your Custom Bouquet",
        previewTitle: "Custom Bouquet",
        price: null,
        priceLabel: "Price Based on Request",

        elements: [
            "Custom Items",
            "Snacks",
            "Personal Gifts",
            "Other Requested Items"
        ],

        description:
            "Tell us what you have in mind. We can create a personalized bouquet using snacks, gifts, custom items, or other elements based on your request."
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

    renderFlowerElements(data.elements);
    renderWrappingOptions();

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
    "Classic Wrap",
    "Layered Wrap",
    "Cone Wrap",
    "Gift Wrap",
    "Custom Style"
];

const wrappingColors = [
    "Cream",
    "White",
    "Lavender",
    "Soft Pink",
    "Sage Green",
    "Custom Color"
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
window.onload = function() {
    renderProducts('all');
};
