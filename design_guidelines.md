# MobileAPI.dev Device Catalog - Design Guidelines

## Design Approach
**Reference-Based Approach** drawing inspiration from:
- Apple.com product pages for premium device presentation
- GSMArena for technical specification layouts
- Newegg/Best Buy for filtering and comparison tools
- Modern SaaS design patterns for clean, data-dense interfaces

**Core Principle**: Balance visual product showcase with technical information density. Prioritize device imagery while maintaining scannable specification layouts.

---

## Typography System

**Font Stack**: Google Fonts
- Primary: Inter (headings, UI elements) - weights 400, 500, 600, 700
- Secondary: JetBrains Mono (specs, technical data) - weight 400

**Hierarchy**:
- Hero Headlines: text-5xl to text-6xl, font-bold
- Section Headers: text-3xl to text-4xl, font-semibold
- Device Names: text-xl to text-2xl, font-semibold
- Body Text: text-base, font-normal
- Specifications: text-sm, font-mono (JetBrains Mono)
- Captions/Labels: text-xs, font-medium, uppercase tracking-wide

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24**
- Component padding: p-4, p-6, p-8
- Section spacing: py-12, py-16, py-20, py-24
- Element gaps: gap-4, gap-6, gap-8
- Grid gaps: gap-6, gap-8

**Grid System**:
- Device Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Comparison View: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Spec Details: grid-cols-1 md:grid-cols-2
- Filters Sidebar: Fixed 280px width on desktop, full-width drawer on mobile

**Container Widths**:
- Main content: max-w-7xl
- Device detail pages: max-w-6xl
- Centered text content: max-w-4xl

---

## Component Library

### Navigation
- Fixed header with backdrop blur effect
- Logo + Search bar (prominent, centered) + Sign In/Sign Up
- Secondary nav: Browse All | Compare | API Docs | Pricing
- Mobile: Hamburger menu with slide-out drawer

### Hero Section
- Full-width, 85vh height
- Large hero image showcasing multiple flagship devices in a clean product shot composition
- Centered headline + subtitle + search bar CTA
- Stats bar below: "15,000+ Devices • 200+ Brands • Updated Daily"

### Search Component
- Large search input with icon (Heroicons: MagnifyingGlass)
- Autocomplete dropdown with device thumbnails + brand name + model
- Recent searches section
- Fuzzy matching with highlighted matching text

### Device Cards
- Aspect ratio 3:4 with device image centered on gradient background
- Brand logo badge (top-left corner)
- Device name + storage/RAM variant
- Key specs grid: 3 columns (screen, camera, battery)
- Price badge (bottom-right, slight elevation)
- Hover: subtle lift effect (translate-y-1), shadow increase

### Filter Panel
- Accordion sections: Brand, Price Range, Release Year, Screen Size, Camera
- Multi-select checkboxes with counts
- Dual-range sliders for price/screen size
- "Clear all" and "Apply" actions
- Sticky positioning on scroll

### Device Detail Page
- Image Gallery: Large preview + thumbnail strip (horizontal scroll)
- Sticky sidebar: Price, storage options, "Compare" + "Share" buttons
- Tabbed sections: Specifications, Images, Reviews, Price History
- Specifications table: 2-column layout, grouped by category (Display, Camera, Performance, Battery, etc.)
- Visual spec highlights: Large icons with values (screen size, battery, camera MP)

### Comparison Tool
- Side-by-side layout: 2-4 devices
- Sticky headers with device names + images
- Synchronized scrolling
- Highlight differences in specifications
- "Add to compare" button limit of 4 devices

### Footer
- Comprehensive: 4-column layout
  - Column 1: About, API Documentation, Status Page
  - Column 2: Devices (Phones, Tablets, Wearables, Laptops)
  - Column 3: Resources (Pricing, Support, Blog)
  - Column 4: Newsletter signup + Social links
- Bottom bar: Copyright, Terms, Privacy, Status badge

---

## Icons
**Library**: Heroicons (via CDN)
- Search: MagnifyingGlass
- Filter: FunnelIcon
- Compare: ScaleIcon
- Close: XMarkIcon
- Menu: Bars3Icon
- External Link: ArrowTopRightOnSquareIcon
- Check: CheckIcon
- Star: StarIcon (for ratings)

---

## Images

### Hero Image
Large, high-quality product photography showing 3-5 flagship devices (mix of phones/tablets) in a clean, professional composition. Devices should be arranged at slight angles with subtle shadows, shot against a clean gradient or minimal background. Image should feel premium and tech-forward.

**Placement**: Full-width hero section, devices occupying center 60% of frame, generous breathing room

### Device Images
- Gallery of 5-10 professional images per device (provided by API)
- Product shots: front, back, side angles
- Lifestyle shots where available
- All images: lazy-loaded, optimized aspect ratio

### Background Treatments
- Hero: Subtle gradient mesh or soft radial gradient
- Card backgrounds: Very light gradient from transparent to subtle tint
- Section dividers: Geometric patterns (dots/grids) at very low opacity

---

## Interactions & Animations

**Minimal Animation Strategy**:
- Card hover: Smooth lift (transition-all duration-300)
- Image gallery: Fade transitions between images (opacity)
- Filter panel: Smooth slide-in/out (translate-x with duration-300)
- Search autocomplete: Fade-in dropdown
- Tab switching: Content fade (opacity transition)
- No scroll-triggered animations
- No parallax effects
- No loading spinners on filters (instant update)

---

## Page Layouts

### Homepage
1. Hero (85vh) - Search-focused with hero image
2. Featured Devices Grid (py-20) - "Latest Releases" 3-4 cards
3. Browse by Brand (py-16) - Logo grid with hover states
4. Stats Section (py-12) - 4-column: Devices, Brands, Updates, Uptime
5. How It Works (py-20) - 4 steps with icons
6. CTA Section (py-16) - "Start exploring 15,000+ devices"

### Browse/Catalog Page
- Sticky filter sidebar (left, 280px)
- Main grid (right, flex-1)
- Top bar: Sort dropdown + view toggle (grid/list)
- Pagination at bottom
- Breadcrumbs: Home > Phones > Samsung

### Device Detail Page
- Image gallery section (60% width)
- Sidebar (40% width, sticky)
- Full-width spec tabs below
- Related devices carousel at bottom
- Comparison CTA floating button

---

## Responsive Breakpoints

**Mobile (base)**: Single column, full-width cards, drawer filters
**Tablet (md: 768px)**: 2-column grid, side-by-side layouts
**Desktop (lg: 1024px)**: 3-4 column grids, sidebar filters visible
**Wide (xl: 1280px)**: Maximum grid density, optimal spacing