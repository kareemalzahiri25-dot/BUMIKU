---
name: BumiKita WonderLearn Edition
description: Platform edukasi iklim & petualangan interaktif anak SD (SDGs 4 & 13) dengan gaya visual 3D playful, ramah anak, berkarakter maskot ekspresif, dan bento card pastel.
version: 1.0.0
source: visual-audit
mode: light
default-mode: light
style-direction: Playful 3D Gamification + Organic Pastel Bento (Kids EdTech)
mood: playful, magical, encouraging, trustworthy, warm
comparable-to: Khan Academy Kids, Duolingo, Toca Boca, Epic! Books
screen-type: Kids EdTech Landing & Adventure Discovery Portal (Ages 5-12 / Anak SD)
target-platform: Web App (Modular MVC / Tailwind v4 via CDN / Google Apps Script compatible)

# ============================================
# DESIGN TOKENS
# Consumed by index.html via Tailwind v4 @theme directive (CSS custom properties).
# Format: hex codes lowercase, rem-based sizing for typography & spacing.
# ============================================

colors:
  # Brand
  primary: "#fbbf24"             # purpose: main CTA (Start Exploring, Start Adventure, Subscribe)
  primary-hover: "#f59e0b"
  primary-subtle: "#fef3c7"      # ~10% tint: active tab background, highlight badges
  secondary: "#0284c7"           # bright sky blue: headings, hero emphasis, icon backgrounds
  secondary-hover: "#0369a1"
  secondary-subtle: "#e0f2fe"
  
  # Accents (Kids EdTech Palette)
  accent-green: "#10b981"        # emerald green: Join Now, play buttons, success badges
  accent-green-subtle: "#d1fae5"
  accent-purple: "#8b5cf6"       # magical story tag, playful mascots
  accent-purple-subtle: "#ede9fe"
  accent-pink: "#f43f5e"         # art & heart badges
  accent-pink-subtle: "#ffe4e6"
  accent-coral: "#fb7185"
  
  # Canvas
  background: "#f0f9ff"          # soft sky blue background canvas with wave transitions
  surface: "#ffffff"             # crisp white card/panel
  surface-2: "#f8fafc"           # nested sub-card, input container, modal surface
  surface-hover: "#f1f5f9"
  surface-footer: "#0d9488"      # deep teal/sea-green organic wave footer
  
  # Text
  text-primary: "#0f172a"        # slate-900: contrast vs white 15.3:1 (WCAG AAA Pass)
  text-secondary: "#475569"      # slate-600: subtitles, body descriptions
  text-muted: "#94a3b8"          # slate-400: placeholders, disabled states
  text-on-primary: "#1e293b"     # dark navy on yellow CTA: contrast 8.6:1 (WCAG AAA Pass)
  text-on-accent: "#ffffff"      # white text on blue/green/teal buttons
  
  # Lines
  border: "#e0f2fe"              # soft sky-tinted hairline border (1px)
  border-strong: "#cbd5e1"       # input border & focused boundary
  
  # Semantic
  success: "#10b981"
  success-subtle: "#d1fae5"
  warning: "#f59e0b"
  warning-subtle: "#fef3c7"
  error: "#ef4444"
  error-subtle: "#fee2e2"
  info: "#0284c7"
  info-subtle: "#e0f2fe"

typography:
  font-family-display: "'Fredoka', 'Quicksand', 'Nunito', system-ui, sans-serif"
  font-family-body: "'Nunito', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
  font-family-mono: "'JetBrains Mono', ui-monospace, monospace"
  
  display:
    size: "3.25rem"              # ~52px (Hero headline)
    weight: 800
    line-height: 1.15
    letter-spacing: "-0.02em"
  h1:
    size: "2.5rem"               # ~40px
    weight: 800
    line-height: 1.2
    letter-spacing: "-0.015em"
  h2:
    size: "1.875rem"             # ~30px (Section titles: "Explore by Topic", "Magical Stories")
    weight: 700
    line-height: 1.25
    letter-spacing: "-0.01em"
  h3:
    size: "1.25rem"              # ~20px (Card titles, story headers)
    weight: 700
    line-height: 1.3
  h4:
    size: "1.125rem"             # ~18px
    weight: 700
    line-height: 1.4
  body-lg:
    size: "1.125rem"             # ~18px (Hero subtitle, testimonial text)
    weight: 500
    line-height: 1.6
  body:
    size: "1rem"                 # ~16px (Standard body copy)
    weight: 500
    line-height: 1.55
  body-sm:
    size: "0.875rem"             # ~14px (Card captions, button text)
    weight: 600
    line-height: 1.5
  label:
    size: "0.8125rem"            # ~13px (Category pill badges, tags)
    weight: 700
    line-height: 1.4
    letter-spacing: "0.01em"
  caption:
    size: "0.75rem"              # ~12px (Legal notes, metadata, star counters)
    weight: 600
    line-height: 1.35
  numeric:
    feature: "tabular-nums"
    weight: 700

spacing:
  base: 8                        # 8px grid unit (with 4px half-steps)
  scale:
    "0": "0"
    "0.5": "0.125rem"            # 2px
    "1": "0.25rem"               # 4px
    "2": "0.5rem"                # 8px
    "3": "0.75rem"               # 12px
    "4": "1rem"                  # 16px
    "5": "1.25rem"               # 20px
    "6": "1.5rem"                # 24px
    "8": "2rem"                  # 32px
    "10": "2.5rem"               # 40px
    "12": "3rem"                 # 48px
    "16": "4rem"                 # 64px
    "20": "5rem"                 # 80px
    "24": "6rem"                 # 96px

radius:
  none: "0"
  sm: "0.5rem"                   # 8px
  md: "0.75rem"                  # 12px
  lg: "1rem"                     # 16px (Testimonial cards, badges)
  xl: "1.25rem"                  # 20px (Topic cards, story cards)
  "2xl": "1.5rem"                # 24px (Large bento cards, game cards)
  "3xl": "2rem"                  # 32px (Special promo banners)
  full: "9999px"                 # Pill buttons, avatar rings, tags

shadow:
  none: "none"
  xs: "0 1px 3px rgba(15, 23, 42, 0.05)"
  sm: "0 4px 12px rgba(15, 23, 42, 0.06)"
  md: "0 8px 24px rgba(15, 23, 42, 0.08)"
  lg: "0 14px 32px rgba(15, 23, 42, 0.10)"
  xl: "0 20px 48px rgba(15, 23, 42, 0.12)"
  glow-yellow: "0 8px 20px rgba(251, 191, 36, 0.45)"
  glow-green: "0 8px 20px rgba(16, 185, 129, 0.35)"
  focus: "0 0 0 3px rgba(2, 132, 199, 0.35)"

motion:
  duration-fast: "150ms"
  duration-base: "220ms"
  duration-slow: "350ms"
  duration-float: "3000ms"       # Infinite floating breathing animation for mascots & clouds
  easing-standard: "cubic-bezier(0.4, 0, 0.2, 1)"
  easing-bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)" # Friendly kid bounce effect

breakpoints:
  sm: "640px"
  md: "768px"
  lg: "1024px"
  xl: "1280px"
  "2xl": "1440px"

layout:
  max-content-width: "1240px"
  topbar-height: "76px"
  page-padding-x: "1.5rem"
  page-padding-y: "2rem"
  card-padding: "1.5rem"
  section-gap: "4rem"

# ============================================
# COMPONENT BEHAVIOR SPECS
# Resolved tokens — index.html generator & views pakai ini as authority.
# ============================================
components:
  button-primary:
    bg: "{colors.primary}"
    text: "{colors.text-on-primary}"
    padding: "0.875rem 2rem"
    radius: "{radius.full}"
    weight: 700
    font-size: "{typography.body.size}"
    shadow: "{shadow.glow-yellow}"
    hover-bg: "{colors.primary-hover}"
    hover-transform: "translateY(-2px) scale(1.02)"
    focus-ring: "{shadow.focus}"
    
  button-cta-join:
    bg: "{colors.accent-green}"
    text: "{colors.text-on-accent}"
    padding: "0.625rem 1.5rem"
    radius: "{radius.full}"
    weight: 700
    font-size: "{typography.body-sm.size}"
    shadow: "{shadow.glow-green}"
    hover-bg: "#059669"
    
  button-secondary-pill:
    bg: "{colors.surface}"
    text: "{colors.secondary}"
    border: "1.5px solid {colors.secondary-subtle}"
    padding: "0.5rem 1.25rem"
    radius: "{radius.full}"
    weight: 700
    font-size: "{typography.body-sm.size}"
    hover-bg: "{colors.secondary-subtle}"
    
  topic-card:
    bg: "{colors.surface}"
    border: "1.5px solid {colors.border}"
    radius: "{radius.xl}"
    padding: "1.25rem 1rem"
    shadow: "{shadow.sm}"
    hover-shadow: "{shadow.md}"
    hover-transform: "translateY(-6px)"
    transition: "transform 250ms ease, box-shadow 250ms ease"
    icon-size: "64px"
    
  story-card:
    bg: "{colors.surface}"
    border: "1px solid {colors.border}"
    radius: "{radius.xl}"
    overflow: "hidden"
    shadow: "{shadow.sm}"
    hover-shadow: "{shadow.lg}"
    hover-transform: "translateY(-4px)"
    image-aspect: "16/10"
    
  game-card:
    bg: "{colors.surface}"
    border: "2px solid #e0f2fe"
    radius: "{radius.2xl}"
    padding: "1rem"
    shadow: "{shadow.sm}"
    play-button-bg: "{colors.accent-green}"
    play-button-size: "40px"
    
  trust-bar:
    bg: "{colors.surface}"
    radius: "{radius.full}"
    border: "1px solid #e2e8f0"
    shadow: "{shadow.md}"
    padding: "0.75rem 2rem"
    gap: "2rem"
    
  bento-featured:
    bg: "linear-gradient(135deg, #e0f2fe 0%, #ffffff 100%)"
    border: "2px solid #bae6fd"
    radius: "{radius.2xl}"
    padding: "2.5rem"
    shadow: "{shadow.md}"
    
  testimonial-card:
    bg: "{colors.surface}"
    border: "1px solid #f1f5f9"
    radius: "{radius.lg}"
    padding: "1.5rem"
    shadow: "{shadow.sm}"
    avatar-size: "48px"
    star-color: "#f59e0b"
    
  mascot-companion:
    animation: "float 3s ease-in-out infinite"
    filter: "drop-shadow(0 12px 20px rgba(15, 23, 42, 0.12))"
    interactive-hover: "scale(1.05) rotate(2deg)"

---

# 📖 OVERVIEW
UI WonderLearn merepresentasikan standar emas untuk **EdTech ramah anak usia SD (5–12 tahun)**: memadukan ilustrasi 3D bertema fantasi (rumah pohon perpustakaan terapung, pulau awan melayang) dengan elemen visual interaktif berorientasi gamifikasi.

Antarmuka ini menggunakan sistem warna pastel hangat berkontras tinggi, kartu bento berbentuk membulat ramah anak (*high squircle radius*), dan tombol aksi bertipe *full pill*. Kehadiran maskot 3D di setiap zona interaksi memberikan rasa persahabatan, keamanan pedagogis, dan rasa ingin tahu (*curiosity-driven learning*).

Untuk proyek **BumiKita (SDG 4 & SDG 13)**, design system ini diaplikasikan dengan mengganti tema buku fantasi umum menjadi **Ekspedisi Iklim & Alam Hijau**, di mana anak menjelajahi pulau-pulau iklim ditemani oleh maskot resmi: **Terra (Bumi), Awa (Atmosfer), Nala (Energi Bersih), Pila (Pilah Sampah), dan Tata (Kota Asri)**.

---

# 🎨 COLORS PHILOSOPHY
- **Primary Golden Yellow (`#FBBF24`)**: Digunakan secara eksklusif untuk tombol aksi terpenting (CTA Hero "Mulai Petualangan", "Mulai Misi", dan "Langganan"). Memberi kesan ceria, penghargaan (bintang), dan energi tanpa menyilaukan mata anak.
- **Secondary Sky Blue (`#0284C7`)**: Melambangkan langit bersih, air jernih, dan keterbukaan belajar. Digunakan untuk teks sorotan headline, ikon modul sains, dan navigasi aktif.
- **Emerald Mint (`#10B981`)**: Warna aksi kelestarian alam dan verifikasi positif (tombol "Gabung Sekarang", tombol Play game, dan lencana keberhasilan).
- **Surface & Canvas (`#FFFFFF` & `#F0F9FF`)**: Latar belakang langit lembut dengan transisi kurva awan putih, menciptakan kontras baca bersih tanpa kejenuhan warna (*visual fatigue*).
- **A11y Contrast Rule**: Teks utama wajib `#0F172A` (kontras 15.3:1 di atas putih, 8.6:1 di atas tombol kuning `#FBBF24`), melampaui standar ketat WCAG AAA.

---

# 🔤 TYPOGRAPHY PHILOSOPHY
- **Display & Heading (`Fredoka` / `Quicksand`)**: Karakter tipografi membulat di setiap sudutnya, menghilangkan sudut tajam agar terasa hangat, ramah, dan tidak mengintimidasi anak-anak pemula membaca.
- **Body (`Nunito` / `Plus Jakarta Sans`)**: Font sans-serif yang dirancang dengan x-height proporsional dan aperture terbuka lebar, menjamin keterbacaan tinggi untuk siswa SD kelas 1 hingga 6.
- **Angka Skor & KPI**: Wajib menggunakan font feature `tabular-nums` untuk perolehan poin iklim, suhu mikro bumi (°C), dan persentase kebersihan taman.

---

# 📐 SPACING & LAYOUT PHILOSOPHY
- **8px Base Grid**: Mengatur seluruh proporsi padding card (16px, 20px, 24px) dan jarak antar section (48px - 64px) agar mata anak tidak kewalahan memproses terlalu banyak informasi dalam satu pandangan.
- **Organic Wave Dividers**: Pergantian antar-bagian konten tidak menggunakan garis lurus kaku, melainkan transisi bentuk awan putih lengkung (*SVG cloud waves*) atau gelombang laut pirus di footer.
- **Max Content Width**: Dibatasi pada 1240px agar seluruh elemen tetap proporsional dan mudah dijangkau di layar tablet maupun monitor desktop sekolah.

---

# 🟦 SHAPE & RADIUS PHILOSOPHY
- **Child-Safe Corner Ladder**: 
  - Tombol CTA, Search, Badge: `Full Pill (9999px)`
  - Kartu Topik & Kartu Game: `20px - 24px (1.25rem - 1.5rem)`
  - Kartu Cerita & Ulasan: `16px (1rem)`
  - Banner Utama Bento: `24px (1.5rem)`
- Tidak ada elemen interaktif berujung tajam (*sharp corners 0px*) untuk mempertahankan psikologi antarmuka yang lembut dan ramah anak.

---

# 🌫️ ELEVATION & DEPTH PHILOSOPHY
- **Soft Fluffy Shadows**: Bayangan lembut multi-layer (`0 8px 24px rgba(15, 23, 42, 0.08)`) tanpa garis luar gelap yang pekat, menghasilkan ilusi kartu yang mengapung ringan di atas awan.
- **Subtle Sky Border**: Setiap kartu memiliki garis tepi tipis `1.5px solid #E0F2FE` untuk memberikan ketegasan batas sentuh (*touch target affordance*) bagi anak yang menggunakan layar sentuh/tablet.

---

# 🧩 MATRIKS ASSET KARAKTER LENGKAP UNTUK BUMIKITA
*Untuk merealisasikan kekayaan karakter 3D seperti pada referensi WonderLearn, berikut spesifikasi dan prompt generator tiap aset maskot yang disesuaikan dengan kurikulum iklim anak SD:*

| ID Karakter | Nama & Peran | Posisi di Layout UI | Deskripsi Visual & Gaya |
|---|---|---|---|
| `CH-01` | **Terra (Bumi Ceria)** | Hero Section (samping headline) & Floating Guide | Bola bumi kartun 3D lembut dengan mata besar berbinar, tersenyum memakai mahkota daun hijau kecil, memegang teropong petualang. |
| `CH-02` | **Awa (Awan Pintar)** | Samping "Explore by Topic" (menggantikan Professor Bunny) | Karakter awan putih halus 3D memakai kacamata bulat emas dan dasi kupu-kupu kuning, memegang buku iklim bercahaya lembut. |
| `CH-03` | **Nala (Kunang-kunang Energi)** | Promo Banner Aplikasi (samping App Store) | Karakter bohlam/kunang-kunang kuning emas bercahaya hangat 3D, mengenakan ransel mini, memegang smartphone mini dengan layar ceria. |
| `CH-04` | **Pila (Penyelamat Sampah)** | Promo Banner Aplikasi (sisi kiri) | Robot tempat sampah 3D ramah anak dengan 3 lencana warna (organik, anorganik, b3), melambaikan tangan dengan riang sambil memegang tablet. |
| `CH-05` | **Tata (Pohon Arsitek)** | Hero Sky Observatory Balcony | Pohon mini rimbun 3D berwajah ramah mengenakan helm arsitek kuning kecil, memegang peta/denah taman kota hijau. |
| `CH-06` | **Naga Hijau Sahabat Hutan** | Balcony kanan atas (mirip naga di WonderLearn) | Naga bayi hijau zamrud menggemaskan dengan sayap daun kecil, sedang duduk santai membaca dongeng pohon purba. |
| `CH-07` | **Burung Pipit Penunjuk Arah** | Papan penunjuk kayu "Jelajah / Belajar / Beraksi" | Burung biru mungil 3D mengenakan topi petualang kecil berdiri di atas plang kayu warna-warni. |
| `CH-08` | **Trio Detektif Iklim Cilik** | Anjungan Utama Rumah Pohon | Tiga anak SD berbusana petualang (ransel, kaca pembesar, seragam pramuka santai) memandang antusias ke pulau terapung masa depan. |

---

# 🎨 PROMPT RECIPES GENERATOR UNTUK ASET 3D BUMIKITA
*Gunakan format prompt standar industri (Midjourney v6 / Flux / DALL-E 3) berikut untuk menghasilkan aset konsisten:*

### 1. Hero World Background:
```text
3D Pixar and DreamWorks style panoramic fantasy treehouse observatory on floating sky islands, giant lush magical trees with spiral bookshelves, waterfalls flowing into clouds, clean green energy wind turbines and solar leaf petals in the distance, sunny warm blue sky with soft white clouds, ultra-detailed, vibrant cheerful colors, 8k render, octane render, child-friendly illustration --ar 16:9
```

### 2. Maskot Awa Si Awan Sarjana (Pengganti Kelinci Kiri):
```text
Cute 3D fluffy white cloud character mascot named Awa, big sparkling eyes, wearing small round golden spectacles and a tiny yellow bowtie, holding an open glowing fairy book, friendly warm smile, Pixar style 3D character, soft studio lighting, transparent white background, isolated, 8k --ar 1:1
```

### 3. Maskot Terra Sang Penjaga Bumi (Hero Mascot):
```text
Adorable 3D planet Earth character mascot named Terra, cute chibi face, happy smile, wearing a little explorer backpack and leafy crown, waving hand, Pixar animation render, soft ambient lighting, vibrant green continents and bright cyan oceans, isolated on white background, 8k --ar 1:1
```

### 4. Maskot Nala & Pila (App Download Banner Mascots):
```text
Cute 3D cartoon mascots: on the right, a glowing friendly lightbulb-firefly character wearing mini headphones holding a smartphone; on the left, a friendly rounded toy recycle bin character with smiling eyes holding a learning tablet, Pixar 3D style, joyful expression, clean vibrant rendering, isolated --ar 16:9
```

### 5. Set 6 Ikon Topik 3D (Claymorphic Topic Icons):
- **Iklim & Cuaca**: `3D claymorphic icon of a smiling smiling sun with a friendly rain cloud and mini rainbow, soft pastel gradient, clean 3D render, white background`
- **Pilah Sampah**: `3D claymorphic icon of three colorful mini sorting bins with smiling faces and shiny recycle symbol, pastel colors, white background`
- **Energi Bersih**: `3D claymorphic icon of a tiny cute windmill with a glowing yellow lightbulb, soft rounded edges, white background`
- **Hutan & Tanaman**: `3D claymorphic icon of a sprout growing out of fertile soil with gentle water drops and a mini watering can, pastel green, white background`
- **Laut & Air**: `3D claymorphic icon of a cute clean water drop wearing swim goggles with mini coral, bright cyan, white background`
- **Kota Hijau**: `3D claymorphic icon of a modern green city building with rooftop trees and a bicycle, pastel colors, white background`

---

# 🚫 RULES TO NEVER BREAK
- Jangan gunakan warna gelap suram (#000000 murni) pada background atau bayangan — gunakan tint biru/slate (`#0F172A`, `#E0F2FE`).
- Jangan gunakan sudut tajam (border-radius < 8px) pada tombol atau kartu interaktif.
- Jangan gunakan font kondensasi tinggi atau font formal kaku (seperti Times New Roman, Garamond kaku, atau font display agresif).
- Jangan membuat ukuran sentuh (*touch target*) tombol kurang dari 48x48px (standar aksesibilitas anak pada tablet/ponsel).
- Jangan menyajikan teks panjang tanpa ilustrasi pendamping atau karakter pemandu.

---

# ✅ RULES TO ALWAYS FOLLOW
- Selalu sertakan maskot pendamping di setiap bagian utama untuk membimbing anak (*scaffolding visual*).
- Gunakan efek hover melayang lembut (`translateY(-4px)` hingga `-6px`) dan bayangan membesar untuk memberi tanda bahwa kartu bisa diklik.
- Terapkan kontras warna teks minimal 4.5:1 (AA) dan targetkan 7:1 (AAA) pada seluruh teks deskripsi.
- Berikan efek suara sintetis ceria (*pop sound, star sparkle*) saat tombol atau kartu ditekan.
- Gunakan efek confetti saat anak menyelesaikan misi atau kuis di modul `MisiPahlawanView`.

---

# 🔧 GAS / MODULAR MVC INTEGRATION NOTES
- File token ini dapat langsung diintegrasikan ke `index.html` proyek `d:\FIPP` melalui Tailwind CDN `@theme` block.
- Class CSS kustom dapat ditautkan ke controller MVC (`AppController.js`, `ParkGameController.js`, `KenaliController.js`, `MisiController.js`).
- Gambar karakter yang di-generate dapat ditempatkan di direktori statis proyek: `public/images/characters/`.
- Sifat responsif: Gunakan tata letak grid yang fleksibel (1 kolom pada mobile `sm`, 2 kolom pada tablet `md`, dan 4–6 kolom pada desktop `xl`).
