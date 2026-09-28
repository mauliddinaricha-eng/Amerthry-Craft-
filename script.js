const productsData = [
    {
        id: 1,
        title: "Big Size",
        category: "big",
        price: 120000,
        priceTag: "Start 120K ♡",
        desc: "Buket ukuran besar yang dibuat sesuai request dan pilihan desainmu.",
        badge: "Big Size",
        wrapper: "Custom",
        svgType: "big-lavender"
    },
    {
        id: 2,
        title: "Medium Size",
        category: "medium",
        price: 35000,
        priceTag: "Start 35K ♡",
        desc: "Buket ukuran medium yang dibuat berdasarkan request pelanggan.",
        badge: "Medium Size",
        wrapper: "Custom",
        svgType: "tulip-set"
    },
    {
        id: 3,
        title: "Single Size",
        category: "single",
        price: 15000,
        priceTag: "Start 15K ♡",
        desc: "Satu tangkai atau satu buket kecil yang dibuat sesuai request.",
        badge: "Single Size",
        wrapper: "Custom",
        svgType: "single-stem"
    },
    {
        id: 4,
        title: "Love Board",
        category: "loveboard",
        price: 35000,
        priceTag: "Start 35K ♡",
        desc: "Love board custom untuk hadiah spesial dan momen berkesan.",
        badge: "Love Board",
        wrapper: "Custom",
        svgType: "gift-box"
    },
    {
        id: 5,
        title: "Custom Request",
        category: "custom",
        price: 0,
        priceTag: "By Request ♡",
        desc: "Buat buket sesuai ukuran, warna, bentuk, dan konsep yang kamu inginkan.",
        badge: "Custom",
        wrapper: "By Request",
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
                    <span class="font-display font-bold text-base text-lavender-deep">Rp ${p.price.toLocaleString('id-ID')}</span>
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
    flowerName: "Custom Request",
    price: 0,
    wrapper: "Kawat Bulu",
    note: ""
};

const flowerBtnGroup = document.querySelectorAll('#custom-flower-options .custom-option');
flowerBtnGroup.forEach(btn => {
    btn.addEventListener('click', () => {
        flowerBtnGroup.forEach(b => {
            b.classList.remove('active', 'border-lavender-dusty', 'bg-lavender-pale');
            b.classList.add('border-lavender-soft', 'bg-white');
        });
        btn.classList.add('active', 'border-lavender-dusty', 'bg-lavender-pale');
        btn.classList.remove('border-lavender-soft', 'bg-white');

        customState.flowerName = btn.querySelector('.font-bold').innerText;
        customState.price = parseInt(btn.getAttribute('data-price'));
        updateCustomizerPreview();
    });
});

const wrapperBtnGroup = document.querySelectorAll('#custom-wrapper-options .wrapper-option');
wrapperBtnGroup.forEach(btn => {
    btn.addEventListener('click', () => {
        wrapperBtnGroup.forEach(b => {
            b.classList.remove('active', 'border-lavender-dusty', 'bg-lavender-soft', 'text-lavender-deep');
            b.classList.add('border-lavender-soft', 'bg-white', 'text-lavender-dark');
        });
        btn.classList.add('active', 'border-lavender-dusty', 'bg-lavender-soft', 'text-lavender-deep');
        btn.classList.remove('border-lavender-soft', 'bg-white', 'text-lavender-dark');

        customState.wrapper = btn.getAttribute('data-wrapper');
        updateCustomizerPreview();
    });
});

const customNoteInput = document.getElementById('custom-note');
customNoteInput.addEventListener('input', (e) => {
    customState.note = e.target.value;
    updateCustomizerPreview();
});

function updateCustomizerPreview() {
    document.getElementById('preview-flower-name').innerText = customState.flowerName;
    document.getElementById('preview-wrapper-name').innerText = `Wrapper: ${customState.wrapper}`;
    document.getElementById('preview-total-price').innerText = `Rp ${customState.price.toLocaleString('id-ID')}`;
    
    const noteText = customState.note.trim() ? `"${customState.note.trim()}"` : `"Your message will appear here... ♡"`;
    document.getElementById('preview-note-text').innerText = noteText;
}

// Send Custom Order WhatsApp Link
document.getElementById('send-custom-wa').addEventListener('click', () => {
    const message = `Halo Amerthry Craft! 💜%0ASaya mau order Custom Bouquet:%0A- *Bunga:* ${customState.flowerName}%0A- *Wrapper:* ${customState.wrapper}%0A- *Pesan Kartu:* "${customState.note || '-'}"%0A- *Total Price:* Rp ${customState.price.toLocaleString('id-ID')}%0A%0AMohon diproses ya, terima kasih! ♡`;
    window.open(`https://wa.me/628123456789?text=${message}`, '_blank');
});

document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        content.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    });
});

document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

const canvas = document.getElementById('trail-canvas');
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
            color: Math.random() > 0.5 ? '#D8C7F3' : '#C5B0EC',
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

    // Draw 5 flower petals
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.rotate((72 * Math.PI) / 180);
        ctx.ellipse(0, size / 2, size / 4, size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // Center circle
    ctx.beginPath();
    ctx.arc(0, 0, size / 3, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFDF7';
    ctx.fill();

    ctx.restore();
}

function animateTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = flowers.length - 1; i >= 0; i--) {
        const f = flowers[i];
        f.x += f.vx;
        f.y += f.vy;
        f.alpha -= 0.015;
        f.rotation += 1;

        drawFlower(ctx, f.x, f.y, f.size, f.color, f.alpha, f.rotation);

        if (f.alpha <= 0) {
            flowers.splice(i, 1);
        }
    }
    requestAnimationFrame(animateTrail);
}

// Initial Load
window.onload = function() {
    renderProducts('all');
    animateTrail();
};
