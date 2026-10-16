# Alder & Ember — Café website (HTML, CSS, vanilla JS)

A four-page website for a fictional café. No framework, no build step, no npm.

## Pages
- `index.html` — hero, introduction, popular items, atmosphere, menu preview, visit info, final invitation
- `about.html` — story, values, experience
- `menu.html` — Breakfast / Lunch / Drinks / Desserts with working tabs (sample items and prices)
- `contact.html` — contact details, hours, validated form, map placeholder

## Folders
```
css/style.css   all styles (colours, fonts and timing are variables at the top)
js/main.js      mobile menu, reveals, parallax, menu tabs, form validation
assets/images/  local SVG illustrations (placeholders for photography)
```

## Run it (Windows)
1. Right-click `premium-cafe-website.zip` → **Extract All…**
2. Open the extracted folder and double-click `index.html`.
No server is needed. Optional server: open a terminal in the folder and run `python -m http.server 8000`, then visit http://localhost:8000.

## Internet
Only the fonts (Fraunces, Inter) come from Google Fonts. Offline, the site falls back to Georgia and system sans-serif and still works. No JavaScript libraries are used: reveals use the native IntersectionObserver and parallax uses requestAnimationFrame. GSAP, Lenis and AOS were considered and not added because they would give no clear benefit here.

## Customize
- **Name:** search all `.html` files for `Alder` and replace.
- **Images:** the illustrations in `assets/images/` are original placeholders, not photographs. Replace them with your own licensed photos (same file names, or edit the `src`). Keep photos under ~200 KB each and add `width`/`height`.
- **Menu / prices:** edit the `<ul class="items">` lists in `menu.html` (and the preview in `index.html`).
- **Contact details:** phone, email, address and hours appear in the footer of every page and in `contact.html`. All are placeholders.
- **Map:** replace the `.map` block in `contact.html` with an embed from Google Maps or OpenStreetMap.
- **Social links:** currently point to the networks' home pages; replace with your profiles.

## Connect the contact form
The form only validates and shows a message; it sends nothing. To deliver messages, either set `<form action="https://formspree.io/f/YOUR_ID" method="POST">` (or a similar service) and remove `e.preventDefault()` in `js/main.js`, or `fetch()` a backend at the `TODO` comment in `js/main.js`.

## Licence
All code and illustrations in this project are original and free to use. Fonts are under the SIL Open Font License via Google Fonts.

## Photos and map (added)
- Photos load from Unsplash and Pexels (free licences, no attribution required but appreciated) and need internet. If one fails, a local illustration in `assets/images/` is shown instead. To work offline, download the photos and change the `src` in the HTML.
- Credits: Marko Stamenkovic, Hannah Reid and Natalia Gusakova (Unsplash); Pexels contributors for the café interiors and cup.
- The map is an OpenStreetMap embed centred on Rynok Square, Lviv, used as the example location. Change the `bbox` and `marker` values in the iframe URL (`index.html`, `contact.html`) to your own address.
- Address, phone and email are example data. Replace them before going live.
