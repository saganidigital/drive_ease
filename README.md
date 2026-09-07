# DriveEase — Luxury & Premium Rental Car Frontend

![DriveEase](https://img.shields.io/badge/DriveEase-Rental%20Platform-FF5722?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**DriveEase** is a high-conversion, luxury car rental website frontend. Designed with a **Warm Obsidian & Burnt Orange** palette, glassmorphism surfaces, responsive fleet filtering, and modern native `<dialog>` modals.

---

## ✨ Features

- 🏎️ **Immersive Hero Stage**: 3D vehicle stage with ambient lighting, stats chips, and social proof.
- 🔍 **Interactive Search Widget**: Round-trip, one-way, and chauffeur modes with pickup hub, date pickers, and fleet filtering sync.
- 🚗 **Fleet Showcase & Filter**: Filterable categories (*All*, *SUVs*, *Sedans*, *Luxury & VIP*, *Electric*, *Sports / Exotic*) with specs, wishlist toggles, and daily rates.
- 🛡️ **Why Choose Us & Animated Counters**: Numbers count up when scrolled into view via `IntersectionObserver`.
- 🔑 **3-Step Frictionless Process**: Clear visual journey from car selection to highway driving.
- 💬 **WhatsApp Demo Integration**: Dedicated feedback alerts configured for demo deployment.
- ⭐ **Testimonials Carousel**: Smooth review carousel with next/prev navigation.
- 🎟️ **Promo Discount**: Copyable discount code banner (`DRIVE20`).
- 📱 **Native `<dialog>` Modals**: Built with modern `@starting-style` transitions for Sign In, Sign Up, and instant reservation pre-fill.
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices.

---

## 🎨 Color Palette

- **Background**: `#0A0604` / `#120B08` (Warm Obsidian)
- **Surfaces & Cards**: `#1A100B` / `#231610` (Frosted Glassmorphism)
- **Accents**: `#FF5722` / `#FF6E40` / `#E64A19` (Burnt Orange & Ember)
- **Text**: `#FFF8F3` (Cream) / `#C8B8AE` (Warm Sand)

---

## 🚀 Getting Started

### Direct Browser Opening
Simply open `index.html` in any modern web browser.

### Local Server
Run with Node.js:
```bash
node server.js
```
Then navigate to `http://localhost:3000/`.

---

## 📂 Project Structure

```
Rent_a_car/
├── index.html              # Core semantic structure
├── server.js               # Zero-dependency local Node server
├── .gitignore
├── README.md
├── css/
│   ├── style.css           # Design tokens, variables, typography, reset
│   ├── navbar.css          # Frosted navbar & mobile drawer
│   ├── hero.css            # Split hero & 3D vehicle showcase
│   ├── search.css          # Booking search widget
│   ├── cars.css            # Fleet grid & category filters
│   ├── features.css        # Why Us & animated stats counters
│   ├── testimonials.css    # Reviews carousel & promo banner
│   ├── modals.css          # Modern <dialog> modal transitions
│   └── footer.css          # 4-column footer
└── js/
    ├── main.js             # Toast engine & counter animations
    ├── navbar.js           # Scroll spying & mobile drawer toggle
    ├── cars.js             # Fleet filter, search sync, & wishlist
    └── modals.js           # Modal dialog controller & booking pre-fill
```

---

## 📄 License
MIT License. Free for commercial and personal use.
