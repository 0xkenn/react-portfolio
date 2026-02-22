# Sanity Starter Content (0xkenn Portfolio)

Use this as a manual copy/paste guide when creating your first Sanity documents.

## 1) `siteSettings` (singleton)

- `brandName`: `0xkenn`
- `resumeUrl`: `https://docs.google.com/document/d/1256y-Cy_sXboqbvpiMf-pVD8hbM3a-DEOMTaLAcopoM/edit?usp=sharing`

### `navItems`
- `{ label: "Home", path: "/", external: false }`
- `{ label: "Projects", path: "/projects", external: false }`
- `{ label: "Contact", path: "/contact", external: false }`

Optional:
- `{ label: "About", path: "/about", external: false }` (if you still want a dedicated About page in the main nav)

### `socials`
- `{ platform: "github", label: "GitHub", url: "https://github.com/0xkenn" }`
- `{ platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/kc-tabon/" }`
- `{ platform: "instagram", label: "Instagram", url: "https://www.instagram.com/0xkenn/" }`

## 2) `homePage` (singleton)

- `introTitle`: `Hey, I’m Kenny.`
- `introSubtitle`: `I love video games, tennis, pickleball — and building whatever excites me.`
- `techSectionTitle`: `Technology Used`
- `experienceSectionTitle`: `Experience`
- `educationSectionTitle`: `Education`
- `spotifySectionTitle`: `Listening on Spotify`
- `githubSectionTitle`: `GitHub`

### Homepage section order (current implementation)
1. Intro
2. Social links
3. Experience
4. Education
5. Tech Stack
6. Spotify
7. GitHub

### `spotify`
- `enabled`: `true`
- `topTracksLimit`: `5`
- `topTracksRange`: `medium_term`
- `featuredPlaylists`: add your playlist IDs later (e.g. `37i9dQZF...`)

### `github`
- `enabled`: `true`
- `username`: `0xkenn`
- `pinnedReposLimit`: `6`

### `techStackRows` (copy current site values)

#### Row 1 (`reverse: false`)
- JavaScript (`iconKey`: `javascript`)
- Python (`iconKey`: `python`)
- PHP (`iconKey`: `php`)
- PySpark (`iconKey`: `spark`)
- PostgreSQL (`iconKey`: `postgresql`)
- MySQL (`iconKey`: `mysql`)

#### Row 2 (`reverse: true`)
- Databricks (`iconKey`: `databricks`)
- React (`iconKey`: `react`)
- Laravel (`iconKey`: `laravel`)
- GDAL | OGR (`iconKey`: `gdal`)

#### Row 3 (`reverse: false`)
- Git (`iconKey`: `git`)
- Bash (`iconKey`: `bash`)
- GitHub (`iconKey`: `github`)
- Bitbucket (`iconKey`: `bitbucket`)
- Jira (`iconKey`: `jira`)
- QGIS (`iconKey`: `qgis`)
- Postman (`iconKey`: `postman`)
- Docker (`iconKey`: `docker`)

## 3) `aboutPage` (singleton)

- `title`: `About`
- `name`: `Kenny Charles U. Tabon`
- `profileImageUrl`: (use your existing image URL or hosted asset URL)
- `bioTitle`: `About Me`

### `bioParagraphs`
1. `Hello, my name is Kenny. I am currently working as a Data Engineer, with a strong focus on building scalable data solutions using Databricks, Apache Airflow, and managing spatial data workflows.`
2. `Outside of work, I enjoy staying active through tennis and pickleball. I also spend time playing video games as a way to unwind.`
3. `On Sundays, I look forward to watching new episodes of my favorite anime series and attending church to reflect and reset for the upcoming week.`

## 4) `projectsPage` (singleton)

- `title`: `Projects`
- `description`: `This section is ready to be managed from Sanity. Add featured projects and links next.`
- `projects`: leave empty if using separate `project` documents (recommended)

## 5) `contactPage` (singleton)

- `title`: `Contact`
- `description`: `Reach out through your social links or add a preferred email/contact CTA in Sanity.`

## 5.5) `project` documents (recommended collection)

Create one document per project. `ProjectsPage` will automatically render these.

### Template
- `title`: `Project Name`
- `slug`: generated from title (optional)
- `summary`: short description of the project
- `image`: upload project screenshot/cover (optional)
- `imageAlt`: accessible description of the image (optional but recommended)
- `techTags`: tags like `React`, `TypeScript`, `Sanity`
- `repoUrl`: GitHub repo link (optional)
- `liveUrl`: deployed app/site link (optional)
- `demoUrl`: demo/video link (YouTube, Loom, etc.) (optional)
- `demoLabel`: e.g. `Demo`, `Watch Demo`, `YouTube Demo` (optional)
- `featured`: `true/false` (optional badge)
- `status`: `Completed`, `In Progress`, or `Archived` (optional)
- `order`: `1`, `2`, `3` (lower shows first)

### Example
- `title`: `Portfolio CMS Migration`
- `summary`: `Migrated a React portfolio to Sanity CMS with Spotify and GitHub integrations.`\n- `image`: upload homepage screenshot
- `imageAlt`: `Screenshot of portfolio homepage with experience and Spotify sections`
- `techTags`: `React`, `TypeScript`, `Sanity`, `Vercel`
- `repoUrl`: `https://github.com/0xkenn/react-portfolio`
- `liveUrl`: `https://0xkenn.me`
- `demoUrl`: `https://www.youtube.com/watch?v=YOUR_VIDEO_ID`
- `demoLabel`: `Watch Demo`
- `featured`: `true`
- `status`: `In Progress`
- `order`: `1`

## 6) `experienceItem` documents (collection)

Create one document per job. New image fields are supported.

### Template
- `company`: `Your Company`
- `role`: `Data Engineer`
- `image`: upload company logo or role-related image (optional)
- `imageAlt`: `Company logo` (recommended if image is added)
- `employmentType`: `Full-time` (optional)
- `location`: `City, Country` (optional)
- `startDate`: `YYYY-MM-DD`
- `endDate`: `YYYY-MM-DD` (leave empty if current)
- `isCurrent`: `true/false`
- `summary`: short role summary
- `highlights`: bullets (optional)
- `techTags`: tags like `Databricks`, `Airflow`, `Python`
- `order`: `1`, `2`, `3` (lower shows first)

### Example (replace with your real details)
- `company`: `Acme Data`
- `role`: `Data Engineer`
- `image`: (upload company logo)
- `imageAlt`: `Acme Data logo`
- `employmentType`: `Full-time`
- `location`: `Philippines`
- `startDate`: `2023-01-01`
- `isCurrent`: `true`
- `summary`: `Building scalable data pipelines and analytics workflows.`
- `highlights`:
  - `Built ETL pipelines for internal analytics and reporting`
  - `Automated data quality checks and monitoring`
- `techTags`: `Databricks`, `Python`, `SQL`, `Airflow`
- `order`: `1`

## 7) `educationItem` documents (collection)

Create one document per school/program. New image fields are supported.

### Template
- `school`: `University Name`
- `degree`: `Bachelor of Science`
- `image`: upload school logo or campus image (optional)
- `imageAlt`: `University logo` (recommended if image is added)
- `program`: `Computer Science` (optional)
- `startDate`: `YYYY-MM-DD` (optional)
- `endDate`: `YYYY-MM-DD` (optional)
- `honors`: `Cum Laude` (optional)
- `description`: short description (optional)
- `tags`: coursework/skills (optional)
- `order`: `1`, `2`, `3`

### Example (replace with your real details)
- `school`: `Example University`
- `degree`: `Bachelor of Science`
- `image`: (upload school logo)
- `imageAlt`: `Example University logo`
- `program`: `Information Technology`
- `startDate`: `2018-06-01`
- `endDate`: `2022-05-31`
- `honors`: `Dean’s List`
- `description`: `Focused on software engineering and data systems.`
- `tags`: `Databases`, `Algorithms`, `GIS`, `Web Development`
- `order`: `1`
