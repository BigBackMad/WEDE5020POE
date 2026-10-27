# WEDE5020POE — Little Woods Books (Parts 1 & 2)

## 1. Project Title
Little Woods Books

## 2. Student Information
- **Name:** Madison Wood
- **Student Number:** ST10517344
- **Module:** WEDE5020 — Web Development Introduction

## 3. Project Overview
Little Woods Books is a planned independent bookstore based in Cape Town, drawing inspiration from local retailers like Bargain Books. The project aims to create an inviting, "cosy" digital space where readers can find curated titles, including trending fiction (romance, thrillers) and high-quality secondhand stock. The website focuses on making reading accessible through affordable pricing (ranging from R95 to R149 for secondhand books) and mimics a real-world browsing experience through a grid-based "shelf-life" layout.

## 4. Website Goals and Objectives

**Primary Goal:** To turn a "love of reading into a business" by creating a platform that is findable and easy for customers to buy from.

**Objectives:**
- Showcase a curated selection of discounted new books and secondhand gems.
- Facilitate book donations and community engagement.
- Drive online sales through a fully searchable and filterable catalogue.
- Build a local reading community via a dedicated blog and "owner reviews."

**Key Performance Indicators (KPIs):** Success will be measured by online order volume, newsletter sign-up rates using "never miss a deal" hooks, and the frequency of gift bundle purchases.

## 5. Key Features and Functionality

**Core Pages:** The site consists of six primary pages: Homepage, Shop/Catalogue, Gift Bundles, Blog/Reviews, About Us, and Contact.

**Search Functionality:** A "not optional" working search bar to help users find specific titles, authors, or ISBNs.

**Advanced Filtering:** Secondary navigation within the catalogue allows users to filter by Genre, Price, and Condition (New/Used/Like New).

**Responsive Design:** A layout designed to function seamlessly across desktop and mobile devices.

## 6. Timeline and Milestones

- **Phase 1:** Proposal — Overview, Goals, and Technical Requirements *(Completed)*
- **Phase 2:** Architecture — Sitemap and Catalogue Structure *(Completed)*
- **Phase 3:** Design — Wireframes and Visual Style Guide *(Completed)*
- **Phase 4:** Development — HTML and CSS Structural Build *(Completed)*
- **Phase 5:** Integration — Content Sourcing, Search *(In Progress)*
- **Phase 6:** Launch — Final POE Submission

## 7. Part 1 Details
Part 1 of this project focuses on Planning and Design. It establishes the structural and visual blueprints, including Information Architecture (Site Map), Navigation Strategy (Wayfinding), and low-fidelity Wireframes for both desktop and mobile.

## 8. Sitemap
The website structure follows a logical hierarchy to ensure ease of navigation:

- **Home** (`index.html`): Introduction, "Book of the Week" with its matching gift bundle, and a scrolling row of trending picks.
- **Catalogue** (`catalogue.html`): The main content area with a searchable book grid and filter sidebar.
- **Gift Bundles** (`bundles.html`): Curated "book + gift" sets with clear descriptions.
- **Blog/Reviews** (`blog.html`): Owner-led "Highlight of the Week," reading lists, and new releases.
- **About Us** (`about.html`): The shop's mission story, shop photo, and location map.
- **Contact** (`contact.html`): Shop contact details and the reservation/query form.

## 9. Part 2 Details
Part 2 of this project focuses on Development — specifically, translating the Part 1 wireframes and style guide into a fully styled CSS build across all six pages. The visual identity centres on a forest-green and terracotta colour palette against a warm cream background, with a recurring "bookshelf" motif used to tie the site's browsing experience back to the physical, in-store feel of a secondhand bookshop. All styling was implemented in a single external stylesheet (`style.css`), using CSS custom properties (variables) for colour and font consistency across pages.

### 9.1 Page-by-Page CSS Summary

**Home (`index.html`):**
- A full-width, two-tone hero section built with CSS Grid (`.hero-split`), pairing a dark green introduction panel with a cream panel showcasing the "Book of the Week" and a matching gift bundle.
- A flat book cover image paired with `filter: drop-shadow()` (rather than `box-shadow`) to correctly shadow a transparent-background PNG.
- An overlapping image technique (`.bundle-stack`) using `position: absolute` to layer a book cover over a gift bundle photo, showing the same title both standalone and as part of a bundle.
- A horizontally scrolling "This Week's Other Picks" row using Flexbox and `scroll-snap-type`, styled to resemble a compact shop shelf rather than a full grid.

**Catalogue (`catalogue.html`):**
- A Flexbox layout splitting the page into a fixed-width filter sidebar and a flexible book grid (`.catalogue-wrapper`).
- A custom "bookshelf" filter control: functional `<input type="checkbox">` elements visually hidden and paired with `<label>` elements styled as vertical book spines (using `writing-mode: vertical-rl`), grouped into shelf rows with a wood-toned bottom border to resemble a shelf ledge.
- A responsive book grid (`.book-grid`) using `repeat(auto-fill, minmax())` so card count adjusts automatically to screen width.

**Gift Bundles (`bundles.html`):**
- A responsive card grid (`.bundles-container`) using `repeat(auto-fit, minmax())`.
- `flex-grow` applied to card description text so price and button elements align across cards of differing description lengths.

**Blog/Reviews (`blog.html`):**
- A CSS-only drop cap on the opening blog paragraph using the `::first-letter` pseudo-element.
- "Postcard-style" review cards with alternating rotation via `:nth-child(odd)`/`:nth-child(even)`, straightening on `:hover`, with a decorative "washi tape" corner accent built from a rotated `::before` pseudo-element.
- A custom section divider using a background line and a centred symbol character in place of a default `<hr>`.

**About Us (`about.html`):**
- A two-column hero (photo + introduction text) using CSS Grid, collapsing to a single column on smaller screens.
- Soft, low-opacity decorative circles positioned behind the content using `::before`/`::after` pseudo-elements and `z-index`.
- A pulled-quote component to visually break up longer body text.

**Contact (`contact.html`):**
- A two-column layout (`.contact-grid`) separating shop contact details from the reservation/query form.
- Custom `:focus` states on form inputs (border colour change plus a soft `box-shadow` glow) to clearly indicate active fields.
- Reused the decorative background-circle technique from the About page for visual consistency between the two pages.

### 9.2 Layout Techniques
Both CSS Grid and Flexbox were used throughout, chosen based on the layout need:
- **Grid** was used for two-dimensional layouts with a defined column structure — the homepage hero split, the about-page hero, and the contact-page two-column layout.
- **Flexbox** was used for one-dimensional, content-driven layouts — the catalogue's sidebar-plus-grid structure, the bookshelf filter rows, the horizontally scrolling picks row, and centring/alignment within individual cards.

### 9.3 Visual Styling and Interactivity
- `background-color`, `border`, and `box-shadow` were used across cards, buttons, and sections to establish visual hierarchy and depth (e.g. elevated cards on hover, shelf-ledge shadows).
- `:hover` was used extensively for interactive feedback — card lift effects, button colour swaps, and the bookshelf spine "pull-up" animation.
- `:focus-visible` was added to links, buttons, and form fields to support keyboard navigation, satisfying accessibility best practice referenced in the accessibility guideline sources below.
- `:active` states were added to buttons for a subtle pressed effect on click.

### 9.4 Responsive Design
- Font sizes and internal spacing (margins, padding) were converted from fixed `px` values to `rem` units so they scale relative to the user's base font size rather than staying fixed regardless of accessibility settings.
- Percentage-based widths (`%`) and `minmax()`/`auto-fit`/`auto-fill` grid functions were used throughout so grids and images resize fluidly rather than requiring separate fixed layouts.
- Three media query breakpoints were implemented: **1024px** (tablet-range devices, adjusting spacing, sidebar width and the hero heading), **768px** (mobile, collapsing multi-column layouts to a single column and reducing body text, quote and drop-cap sizes) and **480px** (small phones, tightening text, buttons and card widths further).
- A global `img { max-width: 100%; height: auto; }` rule stops any image from overflowing its container.
- Responsive images: every image is wrapped in a `<picture>` element with a WebP `<source>` using `srcset` (width descriptors) and `sizes`, with the original file kept as the fallback `<img>`. Smaller and larger WebP versions of each image (e.g. `verity-250w.webp`, `verity-500w.webp`) mean small screens download far less data than the original full-size PNGs. Images below the fold use `loading="lazy"`.
- Typography uses `clamp()` for fluid heading sizes (`h1`–`h3`), plus explicit body text, hero heading, pull-quote and drop-cap adjustments at each breakpoint.

### 9.5 Project Structure
```
WEDE5020POE/
├── index.html
├── catalogue.html
├── bundles.html
├── blog.html
├── about.html
├── contact.html
├── README.md
├── style/
│   └── style.css
└── images/
    ├── About/            (shop photo)
    ├── products/         (book covers + gift bundle photos)
    └── *.jpg             (homepage book covers)
    (each image also has -250w/-500w or -400w/-800w .webp versions beside it)
```

### 9.6 Validation and Fixes After Feedback
- Removed a stray closing `</main>` and trailing `>` in `index.html`, and wrapped the homepage content in a proper `<main>`.
- Removed a duplicate nested `<main>` in `bundles.html`.
- Replaced the placeholder Google Maps URL in `about.html` with a working embed, added a `title` for screen readers, and moved the iframe border styling into the stylesheet.
- Replaced the generic "Actual photo of book title" alt text in the catalogue with each book's real title.
- Corrected the folder structure in this README so it matches the repository (`style/`, not `css/`).

## 10. Changelog

- **Initial Setup:** Created the project root folder with a `style/` folder for the stylesheet and an `images/` folder (with `products/` and `About/` subfolders) for site assets.
- **HTML:** Created the basic HTML5 skeleton for all five pages, including mandatory `<!DOCTYPE html>`, `<head>`, and `<body>` tags.
- **Navigation Implementation:** Developed a site-wide navigation bar using `<nav>`, `<ul>`, and `<li>` elements.
- **Page Structuring:** Added primary headings (`<h1>`) and defined the main content areas (`<main>`) for all core pages.
- **Visual Layout:** Applied inline CSS to achieve a horizontal, top-right navigation bar layout for immediate structural testing.
- **CSS Foundation:** Established a shared external stylesheet with CSS custom properties for colour palette (forest green, terracotta, cream) and typography.
- **Homepage Styling:** Built the two-tone hero section, featured book/bundle overlap display, and horizontally scrolling "other picks" row.
- **Catalogue Styling:** Developed the custom bookshelf-style filter sidebar (hidden checkboxes styled as book spines) and the responsive book grid.
- **Gift Bundles Styling:** Built the responsive bundle card grid with aligned pricing/button placement.
- **Blog Styling:** Added drop-cap styling, postcard-style review cards, and a decorative section divider.
- **About & Contact Styling:** Built two-column hero/grid layouts with decorative background elements and accessible form focus states.
- **Responsive Pass:** Consolidated and expanded media queries to include both tablet (1024px) and mobile (768px) breakpoints across all pages.
- **Feedback Fixes (Part 2):** Fixed the HTML structural errors (stray `</main>`, duplicate `<main>`, placeholder map URL), added a global responsive image rule, `<picture>`/`srcset`/`sizes` with WebP versions of all images, fluid typography with a third 480px breakpoint, real catalogue alt text, and corrected the README folder structure.
- **Bug Fixes:** Resolved duplicate/conflicting CSS selectors (nav list styling leaking into other page elements, duplicate `.search-container` and `header` rules), corrected `box-shadow` artefacts on transparent PNG images by switching to `filter: drop-shadow()`, and removed an unintended hover transform affecting image sizing.

## 11. References

- AcceDe Web, 2026. *Accessibility guidelines for HTML and CSS.* [pdf] Available at: [Accessed 18 September 2026].
- Bargain Books, 2026. *Bargain Books — discount books, bestsellers & kids' books.* [online] Available at: https://bargainbooks.co.za/ [Accessed 6 August 2026].
- CodewithFaraz, 2026. *Creating a book store website using HTML, CSS, and JavaScript.* [online] Available at: https://www.codewithfaraz.com/ [Accessed 18 September 2026].
- CodingNepal, 2026. *Create a responsive search bar in HTML & CSS.* [online] Available at: https://www.codingnepalweb.com/ [Accessed 18 September 2026].
- CSSAWWWARDS, 2026. *CSS Grid vs Flexbox: when to use each (2026 decision guide).* [online] Available at: https://cssawwwards.com/blog/css-grid-vs-flexbox-guide [Accessed 18 September 2026].
- DEV Community, 2026. *Essential modern CSS features for 2026.* [online] Available at: https://dev.to/ [Accessed 18 September 2026].
- Duckett, J., 2011. *HTML and CSS: design and build websites.* Indianapolis: John Wiley & Sons, Inc.
- Edington, C., 2026. *How to start an online bookstore in South Africa.* Shopstar, [online] 14 July. Available at: https://www.shopstar.co.za/blog/how-to-start-an-online-bookstore-in-south-africa [Accessed 6 August 2026].
- Figma, 2026. *24 best fonts for websites in 2026.* [online] Available at: https://www.figma.com/ [Accessed 18 September 2026].
- MDN Web Docs, 2025. *CSS performance optimization.* [online] Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS [Accessed 18 September 2026].
- MDN Web Docs, 2025. *Introduction to CSS syntax: declarations, rulesets, and statements.* [online] Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax/Introduction [Accessed 18 September 2026].
- MDN Web Docs, 2026. *CSS container queries.* [online] Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries [Accessed 18 September 2026].
- MDN Web Docs, 2026. *Responsive web design.* [online] Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design [Accessed 18 September 2026].
- MDN Web Docs, 2026. *&lt;h1&gt;–&lt;h6&gt;: HTML section heading elements.* [online] Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements [Accessed 14 August 2026].
- Meyer, E.A., 2018. *CSS pocket reference.* 5th ed. Sebastopol: O'Reilly Media.
- Taskco Digital, 2026. *The future of web development: trends shaping 2026 and beyond.* [online] Available at: https://taskcodigital.com/ [Accessed 18 September 2026].
- The Independent Institute of Education (IIE), 2026. *Web development introduction [WEDE5020MM].* [online via internal VLE] The Independent Institute of Education. Available at: <internal VLE> [Accessed 6 August 2026].
- The Independent Institute of Education (IIE), 2026. *Web development introduction [WEDE5020POE].* [online via internal VLE] The Independent Institute of Education. Available at: <internal VLE> [Accessed 6 August 2026].
- University of California Office of the President (UCOP), 2026. *IT accessibility guidelines for web developers.* [pdf] Oakland: University of California.
- W3Schools, 2026. *CSS tutorial.* [online] Available at: https://www.w3schools.com/css/default.asp [Accessed 18 September 2026].