# Menni Kiran Kumar — 3D Creator, Web Developer & AI Engineer Portfolio

A premium, responsive developer portfolio and integrated blog application built for **Menni Kiran Kumar**. This project combines sleek visual aesthetics, smooth animations, dynamic headless CMS controls, and functional analytics tools using a modern web development stack.

---

## 🚀 Tech Stack

- **Core**: React 18.3, TypeScript, Vite
- **Headless CMS**: Sanity CMS v3 (GROQ Query Language)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Persistence**: Local Storage (as local fallback)

---

## 🎨 Design System & Aesthetics

- **Dark Theme Palette**: Dominant background of `#0C0C0C` paired with steel-light `#D7E2EA` typography and custom accent overlays.
- **Custom Typography**: Configured with the **Kanit** Google Font family (weights 300–900).
- **Text Gradients**: Custom `.hero-heading` styles utilizing linear gradients:
  `linear-gradient(180deg, #646973 0%, #BBCCD7 100%)` with webkit-background-clipping.
- **Micro-Animations**: Custom hover effects, magnet offsets, and scroll-driven parallax transitions using Framer Motion.

---

## ⚡ Sanity CMS Integration

The portfolio is fully connected to **Sanity CMS**, enabling code-free remote updates for every section:
- **Structured Content Schemas**: Custom schema definitions for all content types (`hero`, `about`, `skillCategory`, `project`, `blogPost`) located in the [studio/](file:///c:/Users/M.Kiran%20Kumar/OneDrive/Desktop/portfolio%20test/studio/) folder.
- **Real-Time Live Updates**: Integrated a Sanity live listener in the frontend that automatically re-fetches content using **GROQ** queries the moment you hit "Publish" in the Studio.
- **Fail-Safe Fallback System**: If the Sanity Content Lake is not reachable, components automatically fallback to preloaded local static datasets, ensuring the website never goes down.
- **Easy Data Seeding**: Includes a local generator and client import script (`seed.ndjson` and `seed-client.js`) to instantly migrate all portfolio data into your live dataset.

---

## 📁 Project Structure & Sections

The application is structured into a Single Page Application (SPA) with a custom view router managing transitions between the main portfolio landing page and the blog sections.

### 1. Hero Section
- Full-viewport (`h-screen`) layout featuring a custom navigation header (`About`, `Skills`, `Projects`, `Contact`).
- Responsive call-to-action buttons directing users to custom external platforms:
  - **Links**: Resource collections.
  - **Kiran Moments Gallery**: Photography portfolio website.
  - **2022-26 Btech Memories**: Project hosting college photos/videos.
  - **Blog**: Launches the integrated blog application.

### 2. Marquee Section
- A high-frame-rate infinite marquee loop showcasing active design assets and scroll-driven media tracks, linking directly to your resume PDF (fetched dynamically from Sanity when uploaded).

### 3. About Section
- Custom resume-based details mapping Menni Kiran Kumar's B.Tech Computer Science career.
- Showcases skills, certifications, and achievements (e.g., Cynosure 2K25 winner, tech coordinator).
- Uses a character-reveal animation triggered on scroll.

### 4. Skills Section
- Replaces the old Services section with a premium categorized skills layout.
- Integrates interactive, spring-animated tech pills that react dynamically to cursor hover.
- Features technical skills from Menni Kiran Kumar's resume plus creative fields:
  - **Programming**: Python, JavaScript, HTML, CSS, Node.js, MongoDB
  - **Development**: Full-Stack Development, API Integration, Frontend & Backend, Git/GitHub
  - **AI / ML**: Machine Learning, Computer Vision, Google Cloud, Vertex AI, Generative AI
  - **AI Tools**: Data Analysis, Power BI, Testing, Prompt Engineering
  - **Creative & Media**: Photography, Videography, Video/Photo Editing

### 5. Projects Section
- Dynamic **Sticky Cards Stacking** layout.
- As the user scrolls, project cards stack on top of each other, shrinking and translating dynamically to create a depth-scaling effect.

### 6. Contact Section
- Interactive contact form with input validation, success animations, and direct contact options (email).
- Includes the primary social links grid.

### 7. Shared Footer Component
- A unified footer ([Footer.tsx](file:///c:/Users/M.Kiran%20Kumar/OneDrive/Desktop/portfolio%20test/src/components/Footer.tsx)) rendered at the bottom of **every single page** (Landing Page, Blog Feed, Blog Detail, and Blog Dashboard).
- Displays direct links to **Instagram**, **WhatsApp Channel**, **GitHub**, and **LinkedIn**.
- Includes a copyright row stating "with love kiran" where the name links directly to `https://github.com/mennikiran`.
- Handles cross-view transitions: clicking any section link while inside the Blog redirects you to the home portfolio and automatically scrolls down to the designated section smoothly.

---

## 📝 Integrated Blog Application

The blog includes a comprehensive content management and feedback ecosystem with the following views:

### 📱 Blog Home Feed
- Search filter matching search queries to article titles, tags, and content.
- Category pills filter articles instantly.
- Displays stats for each card (read time, views count, likes count).

### 📖 Blog Post Detail Page
- Renders full article markdown-style content.
- Interactive **Like** button updating likes count instantly.
- **Star Review System**: Allows users to post reviews containing name, rating (1-5 stars), and review comments, saving them dynamically.
- **Article Contact Deck**: Preloaded contact form directly relevant to the article context.

### 📊 Blog Dashboard & Analytics
- **Aggregated Performance Grid**: Displays Total Views, Total Likes, Average Star Rating, and Total Reviews across all articles.
- **Interactive Visual Charts**: Custom Tailwind/React bars representing views and likes for each article.
- **Status Control**: Quick toggling between `Draft` and `Published` states.
- **CRUD Operations**: Side drawers to Create new articles and Edit existing articles.
- All modifications are saved instantly to the user's Local Storage.

---

## 💻 Getting Started

### Portfolio Frontend
Clone the repository, install dependencies, and run locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

### CMS Sanity Studio
Open a separate terminal window and run:

```bash
# Navigate to studio directory
cd studio

# Install studio dependencies
npm install

# Start the local Sanity Studio
npm run dev
```