# WEDE5020POE — Little Woods Books (Parts 1, 2 & 3)

## 1. Project Title

Little Woods Books

## 2. Student Information

- **Name:** Madison Wood
- **Student Number:** ST10517344
- **Module:** WEDE5020 — Web Development Introduction

## 3. Project Overview

Little Woods Books is a planned independent secondhand bookstore based in Cape Town, drawing inspiration from local retailers such as Bargain Books. The project aims to create a welcoming and cosy online space where readers can discover a curated selection of books, including popular fiction genres such as romance and thrillers, as well as affordable secondhand titles.

The website focuses on making reading more accessible, with secondhand books priced between R95 and R149. Its design takes inspiration from the experience of browsing a physical bookstore, using a bookshelf-style layout to create an inviting and familiar shopping experience.

The website was developed using HTML, CSS and JavaScript, incorporating responsive layouts and interactive features to provide a user-friendly experience across different devices.

## 4. Website Goals and Objectives

**Primary Goal:**

To turn a love of reading into a business by creating an accessible online bookstore where customers can easily discover and purchase books.

**Objectives:**

- Showcase a curated selection of discounted new books and secondhand titles.
- Encourage book donations and community involvement.
- Support online sales through a searchable and filterable book catalogue.
- Build a local reading community through a dedicated blog and book reviews.

**Key Performance Indicators (KPIs):**

The success of the website will be measured through online orders, newsletter subscriptions and gift bundle purchases.

## 5. Key Features and Functionality

**Core Pages:**

The website consists of six main pages:

- Homepage
- Shop/Catalogue
- Gift Bundles
- Blog/Reviews
- About Us
- Contact

**Search Functionality:**

The catalogue includes a search feature that allows users to find specific books by title or author.

**Filtering Options:**

Users can narrow down the available books according to genre, price and condition, including new, used and like-new titles.

**Responsive Design:**

The website is designed to adapt to different screen sizes, providing a consistent browsing experience across desktop, tablet and mobile devices.

## 6. Timeline and Milestones

- **Phase 1:** Proposal — Project overview, goals and technical requirements (Completed).
- **Phase 2:** Architecture — Sitemap and catalogue structure (Completed).
- **Phase 3:** Design — Wireframes and visual style guide (Completed).
- **Phase 4:** Development — HTML and CSS structure (Completed).
- **Phase 5:** Integration — Website content, search and interactive functionality (Completed).
- **Phase 6:** Launch — Final POE submission.

## 7. Part 1 Details

Part 1 focused on the planning and design of the website. This included establishing the overall website structure, navigation and visual direction before development began.

The planning process included creating a sitemap to organise the website's pages, developing a navigation strategy to make the site easy to use, and designing low-fidelity wireframes for both desktop and mobile layouts.

## 8. Sitemap

The website follows a clear structure to help users navigate between its main sections.

- **Home (`index.html`):** Introduces the bookstore and features the Book of the Week, its matching gift bundle and a selection of trending books.
- **Catalogue (`catalogue.html`):** Displays the available books in a searchable catalogue with filtering options.
- **Gift Bundles (`bundles.html`):** Showcases themed book and gift combinations with descriptions and customisation options.
- **Blog/Reviews (`blog.html`):** Features book reviews, reading recommendations and new releases.
- **About Us (`about.html`):** Introduces the bookstore, its mission and background, with photographs and a location map.
- **Contact (`contact.html`):** Provides the bookstore's contact information and an enquiry form.

## 9. Part 2 Details

Part 2 focused on developing the website's visual design using HTML and CSS. The wireframes and style guide created in Part 1 were used as the foundation for building and styling all six pages.

The visual identity uses a combination of forest green, terracotta and warm cream to create a consistent and welcoming appearance. A recurring bookshelf-inspired design was also incorporated throughout the website to reflect the experience of browsing a physical secondhand bookstore.

Styling was managed through an external CSS stylesheet (`style/style.css`), allowing colours, typography and layouts to remain consistent across the different pages.

### 9.1 Page-by-Page CSS Summary

**Home (`index.html`):**

- Created a two-section hero layout using CSS Grid, combining a dark green introduction area with a cream section featuring the Book of the Week and its matching gift bundle.
- Added image styling to give the featured book cover a natural shadow effect.
- Created an overlapping image arrangement to display the featured book alongside its matching gift bundle.
- Added a horizontally scrolling section for the week's other book selections, styled to resemble a small bookshelf.

**Catalogue (`catalogue.html`):**

- Used Flexbox to organise the catalogue into a filter sidebar and a book display area.
- Created custom bookshelf-inspired filter controls, with checkbox options styled to resemble vertical book spines.
- Developed a responsive book grid that automatically adjusts the number of columns according to the available screen width.

**Gift Bundles (`bundles.html`):**

- Created a responsive grid layout to display the available gift bundles.
- Used flexible card layouts to keep descriptions, prices and buttons consistently positioned.

**Blog/Reviews (`blog.html`):**

- Added a decorative opening letter to the introductory paragraph to create a more traditional editorial style.
- Designed review cards to resemble postcards, using alternating angles and hover effects.
- Created a decorative section divider to separate the different content areas.

**About Us (`about.html`):**

- Created a two-column hero section combining an image with introductory text, which changes to a single-column layout on smaller screens.
- Added subtle decorative background elements to complement the page design.
- Incorporated a pull-quote section to highlight important text and improve the visual layout.

**Contact (`contact.html`):**

- Used a two-column layout to separate the bookstore's contact information from the enquiry form.
- Added visual feedback to form fields when users select or interact with them.
- Reused the decorative background elements from the About page to maintain consistency throughout the website.

### 9.2 Layout Techniques

CSS Grid and Flexbox were used throughout the website to create organised and responsive layouts.

- **CSS Grid:** Used for layouts that require multiple rows and columns, including the homepage hero section, About page and Contact page.
- **Flexbox:** Used for arranging content in a single direction, including the catalogue layout, bookshelf filters, scrolling book selections and individual content cards.

Both techniques helped create flexible layouts that adjust to different screen sizes.

### 9.3 Visual Styling and Interactivity

Several CSS styling techniques were used to improve the website's appearance and provide visual feedback.

- Background colours, borders and shadows were used to create visual separation and depth across cards, buttons and sections.
- Hover effects were added to buttons, book cards and bookshelf filters to provide feedback when users interact with them.
- Focus indicators were included on links, buttons and form fields to support keyboard navigation.
- Active button styles provide a subtle visual response when buttons are pressed.

### 9.4 Responsive Design

The website was designed to adjust to different screen sizes while maintaining readability and functionality.

- Relative sizing units such as `rem` and percentage-based widths were used to make layouts and spacing more flexible.
- CSS Grid functions such as `minmax()`, `auto-fit` and `auto-fill` allow content to adjust automatically to the available screen space.
- Three responsive breakpoints were implemented:
  - **1024px:** Adjusts spacing, sidebar widths and heading sizes for smaller screens.
  - **768px:** Changes multi-column layouts to single-column layouts and adjusts text and spacing.
  - **480px:** Further adjusts buttons, text and card widths for smaller mobile screens.
- Images were styled to remain within their containers without overflowing.
- Responsive images were implemented using the HTML `<picture>` element, allowing different image sizes to be displayed depending on the screen size.
- WebP image formats were included to reduce image file sizes and improve loading performance.
- Images further down the page use lazy loading to avoid loading them before they are needed.
- Fluid typography using `clamp()` allows heading sizes to adjust according to the screen width.

### 9.5 Project Structure

The project files are organised into separate folders to keep the website's structure clear and manageable.

```text
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
├── script/
│   └── script.js
└── images/
    ├── About/
    ├── products/
    └── *.jpg
```

The images folder contains the bookstore photographs, book covers and gift bundle images, including their different WebP sizes where applicable.

### 9.6 Validation and Fixes After Feedback

The following improvements and corrections were made after reviewing the website:

- Corrected HTML structure on the homepage by removing an unnecessary closing tag and ensuring the main content was properly contained within a `<main>` element.
- Removed an incorrectly nested `<main>` element from the Gift Bundles page.
- Updated the Google Maps embed on the About page and added a descriptive title to improve accessibility.
- Improved the alternative text of catalogue images by replacing generic descriptions with the relevant book titles.
- Corrected the project folder structure documented in the README to match the actual files.

## 10. Part 3 Details — Website Functionality and JavaScript Features

Part 3 focused on adding JavaScript functionality to the website to make it more interactive and improve the overall user experience.

JavaScript was used to introduce features such as shopping cart management, catalogue searching and filtering, gift bundle customisation and form validation. These features allow users to interact with the website and make use of its main functions.

### 10.1 Global Navigation and Shopping Cart

Several interactive features are available across all six website pages:

- **Shopping Cart:** Users can add books and gift bundles to a shopping cart. The cart displays selected items, cover images, individual prices and the overall total.
- **Item Removal and Cart Clearing:** Users can remove individual items from the cart or clear all selected items at once. The cart and item counter update automatically when changes are made.
- **Data Persistence:** Cart information is stored using `localStorage`, allowing selected items to remain available when users refresh the page or navigate between pages.
- **Responsive Mobile Navigation:** A hamburger menu is provided for smaller screens, allowing users to open and close the main navigation menu easily.
- **Active Page Indicator:** The navigation menu automatically highlights the page currently being viewed, helping users identify their location within the website.
- **Dynamic Copyright Year:** The current year is automatically displayed in the website footer.
- **Toast Notifications:** Temporary notifications provide feedback when users add or remove items from the shopping cart.

### 10.2 Catalogue Features

The catalogue page includes interactive features to help users browse and find books more efficiently.

- **Live Search:** Users can search for books by title or author, with the displayed results updating as they type.
- **Multiple Filters:** Books can be filtered according to genre, condition and price range. These filters can also be used together to narrow down the available results.
- **Sorting Options:** Users can organise books by price, from lowest to highest or highest to lowest, or alphabetically by title.
- **Results Feedback:** The page displays the number of books matching the selected search or filters. A message appears when no matching results are found, and users can clear their selected filters.
- **Quick View:** Users can select a book to view additional information, including its cover image, title, author, condition, price and description, without leaving the catalogue page.

### 10.3 Gift Bundle Customisation

The Gift Bundles page allows users to personalise their selected gift sets.

- **Book Selection:** Each gift bundle includes a dropdown menu that allows users to choose a specific book to accompany their selected gift set.
- **Optional Add-Ons:** Users can select additional options, including gift wrapping (R25), a wooden bookmark (R15) and a handwritten note (R20). The total price updates automatically according to the selected options.
- **Cart Integration:** Customised gift bundles can be added directly to the shopping cart together with the selected book and any additional options.

### 10.4 Contact Page Features

The Contact page includes interactive features to assist users when communicating with the bookstore.

- **Form Validation:** The contact form checks that users provide the required information before submission. It validates the name, email address, enquiry subject and message, displaying clear error messages when information is missing or incorrectly entered.
- **Real-Time Shop Status:** The website automatically displays whether the bookstore is currently open or closed according to its business hours (Monday to Saturday, 09:00–17:00).
- **Interactive FAQ Section:** Users can expand and collapse frequently asked questions to view the relevant answers.

### 10.5 Blog and Review Features

The Blog page includes interactive features designed to encourage user engagement.

- **Review Like Counter:** Users can like book reviews by selecting the heart icon. The like count updates automatically, and the selected like status is saved using `localStorage`.
- **Newsletter Validation:** The newsletter form checks that users enter a valid email address and provides feedback when the subscription form is successfully submitted.

### 10.6 Homepage Carousel

The homepage includes a trending books section with interactive controls.

- **Carousel Controls:** Previous and next buttons allow users to move smoothly through the displayed book selection, making it easier to browse the featured titles.

## 11. Accessibility and User Experience

Accessibility and user experience were considered throughout the development of the website to ensure that it is easy to navigate and use across different devices.

- **Accessibility Attributes:** ARIA attributes are used to provide additional information about interactive elements, including the mobile navigation menu and FAQ section.
- **Keyboard Navigation:** Interactive features, including the quick-view window and mobile navigation menu, support keyboard interaction. Users can also close these elements using the `Escape` key.
- **Focus Indicators:** Visible focus outlines are provided for links, buttons and form fields to help users navigate the website using a keyboard.
- **Visual Hierarchy and Contrast:** A consistent earth-tone colour palette is used throughout the website, consisting of Forest Green (`#2D4A3E`), Terracotta (`#C85A32`) and Cream (`#FDFBF7`). Typography, spacing and colour contrast help maintain readability and visual consistency.
- **Responsive Layouts:** CSS Grid, Flexbox and responsive styling allow the website to adapt to mobile, tablet and desktop screen sizes.

## 12. Technologies Used

The following technologies were used to develop the Little Woods Books website:

- **HTML5:** Used to create the structure and content of the website.
- **CSS3:** Used to style the website, create layouts and implement responsive design.
- **JavaScript:** Used to add interactive features and dynamic functionality across the website.
- **localStorage:** Used to save shopping cart information and review like selections between page visits.
- **WebP:** Used to provide optimised image formats to improve website loading performance.

## 13. Development Changelog

The following summarises the main stages of development and improvements made throughout the project.

- **Initial Setup:** Created the project folder and organised the stylesheet and image folders to keep the website files structured.
- **HTML Development:** Created the HTML structure for all six website pages, including the main content areas and navigation.
- **Navigation Implementation:** Developed a consistent navigation bar across the website to allow users to move between pages.
- **Page Structure:** Added headings, content sections and semantic HTML elements to organise the website content.
- **CSS Foundation:** Created a shared external stylesheet and established the colour palette and typography used throughout the website.
- **Homepage Styling:** Developed the two-section hero layout, featured book and gift bundle display, and horizontally scrolling book selection.
- **Catalogue Styling:** Created the bookshelf-inspired filter sidebar and responsive book grid.
- **Gift Bundles Styling:** Developed the responsive gift bundle cards and organised their descriptions, prices and buttons.
- **Blog Styling:** Added decorative introductory text, postcard-style review cards and section dividers.
- **About and Contact Styling:** Created the page layouts, decorative background elements and styled contact form.
- **Responsive Design:** Improved the layouts across different screen sizes by adding tablet and mobile breakpoints.
- **Part 2 Feedback Improvements:** Corrected HTML structure, improved image descriptions, updated the map embed and introduced optimised responsive images and fluid typography.
- **CSS Improvements:** Corrected conflicting styles, improved image shadows and adjusted hover effects to maintain consistent layouts.
- **JavaScript Development:** Created the main JavaScript file to manage interactive features across all six website pages.
- **Catalogue Functionality:** Implemented live search, multiple filters, sorting options, results feedback and the quick-view feature.
- **Shopping Cart:** Developed an interactive cart with item removal, cart clearing, automatic total calculations and `localStorage` persistence.
- **Gift Bundle Customisation:** Added book selection dropdowns, optional add-ons and automatic price updates.
- **Contact Page Functionality:** Implemented contact form validation, dynamic shop status and an interactive FAQ section.
- **Blog Functionality:** Added review like counters and newsletter email validation.
- **Homepage Functionality:** Implemented the trending books carousel with previous and next controls.
- **Accessibility Improvements:** Added accessibility attributes and keyboard interaction to support easier website navigation.
- **Final Styling and Organisation:** Continued refining the CSS stylesheet and JavaScript functionality to maintain consistency across all website pages.

## 14. References

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

- MDN Web Docs, 2026. *<h1>–<h6>: HTML section heading elements.* [online] Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements [Accessed 14 August 2026].

- MDN Web Docs, 2026. *Responsive web design.* [online] Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design [Accessed 18 September 2026].

- Meyer, E.A., 2018. *CSS pocket reference.* 5th ed. Sebastopol: O'Reilly Media.

- Taskco Digital, 2026. *The future of web development: trends shaping 2026 and beyond.* [online] Available at: https://taskcodigital.com/ [Accessed 18 September 2026].

- The Independent Institute of Education (IIE), 2026. *Web development introduction [WEDE5020MM].* [online via internal VLE] The Independent Institute of Education. Available at: <internal VLE> [Accessed 6 August 2026].

- The Independent Institute of Education (IIE), 2026. *Web development introduction [WEDE5020POE].* [online via internal VLE] The Independent Institute of Education. Available at: <internal VLE> [Accessed 6 August 2026].

- University of California Office of the President (UCOP), 2026. *IT accessibility guidelines for web developers.* [pdf] Oakland: University of California.

- W3Schools, 2026. *CSS tutorial.* [online] Available at: https://www.w3schools.com/css/default.asp [Accessed 18 September 2026].

- Coddy. 2026. Filter By Genre – JavaScript. Available at: https://coddy.tech/learn/javascript/logic_and_flow/filter_by_genre [Accessed 27 October 2026].

- Coddy. 2026. Search By Title – JavaScript. Available at: https://coddy.tech/learn/javascript/logic_and_flow/search_by_title [Accessed 27 October 2026].

- GeeksforGeeks. 2026. How to create Hamburger Menu for mobile devices? Available at: https://www.geeksforgeeks.org/javascript/how-to-create-hamburger-menu-for-mobile-devices/ [Accessed 27 October 2026].

- GeeksforGeeks. 2026. Introduction to JavaScript. Available at: https://www.geeksforgeeks.org/javascript/introduction-to-javascript/ [Accessed 27 October 2026].

- Kavanagh, J. 2026. Using the filter() method in JavaScript. Available at: https://johnkavanagh.co.uk/articles/using-the-filter-method-in-javascript/ [Accessed 27 October 2026].

- Sitebulb. 2026. The Role of JavaScript in E-Commerce SEO. Available at: https://sitebulb.com/resources/guides/the-role-of-javascript-in-e-commerce-seo/ [Accessed 27 October 2026].

- University of California Office of the President (UCOP). 2026. IT Accessibility Guidelines for Web Developers. Oakland: UCOP.

- Anon. 2026a. Cart with LocalStorage. Available at: https://srikanthtechnologies.com/blog/richclient/jquery_cart.aspx [Accessed 27 October 2026].

- Anon. 2026c. Shopping Cart - JavaScript. Available at: https://www.tutorjoes.in/JS_tutorial/food_shopping_cart_in_js [Accessed 27 October 2026].

- Learnable Content. 2026. js-shopping-cart: main.js. GitHub Repository. Available at: https://github.com/learnable-content/js-shopping-cart/blob/master/files/main.js [Accessed 27 October 2026].