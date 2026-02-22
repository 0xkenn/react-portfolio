import meImage from "@/assets/me.jpg";
import type { PortfolioContent } from "@/types/portfolio";

export const defaultPortfolioContent: PortfolioContent = {
  siteSettings: {
    brandName: "0xkenn",
    navItems: [
      { label: "Home", path: "/" },
      { label: "Projects", path: "/projects" },
      { label: "Contact", path: "/contact" },
    ],
    resumeUrl:
      "https://docs.google.com/document/d/1256y-Cy_sXboqbvpiMf-pVD8hbM3a-DEOMTaLAcopoM/edit?usp=sharing",
    socials: [
      { platform: "github", label: "GitHub", url: "https://github.com/0xkenn" },
      { platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/kc-tabon/" },
      { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/0xkenn/" },
    ],
  },
  homePage: {
    introTitle: "Hey, I’m Kenny.",
    introSubtitle: "I love video games, tennis, pickleball — and building whatever excites me.",
    techSectionTitle: "Technology Used",
    techStackRows: [
      {
        items: [
          { name: "JavaScript", iconKey: "javascript", borderClass: "border-yellow-300", textClass: "text-yellow-300", iconClass: "text-yellow-300" },
          { name: "Python", iconKey: "python", borderClass: "border-blue-500", textClass: "text-blue-300", iconClass: "text-blue-800" },
          { name: "PHP", iconKey: "php", borderClass: "border-blue-300", textClass: "text-blue-100", iconClass: "text-blue-300" },
          { name: "PySpark", iconKey: "spark", borderClass: "border-red-400", textClass: "text-red-100", iconClass: "text-red-500" },
          { name: "PostgreSQL", iconKey: "postgresql", borderClass: "border-sky-300", textClass: "text-blue-100", iconClass: "text-sky-400" },
          { name: "MySQL", iconKey: "mysql", borderClass: "border-blue-300", textClass: "text-blue-100", iconClass: "text-blue-400" },
        ],
      },
      {
        reverse: true,
        items: [
          { name: "Databricks", iconKey: "databricks", borderClass: "border-red-600", textClass: "text-red-100", iconClass: "text-red-600" },
          { name: "React", iconKey: "react", borderClass: "border-blue-500", textClass: "text-blue-200", iconClass: "text-blue-500" },
          { name: "Laravel", iconKey: "laravel", borderClass: "border-red-500", textClass: "text-red-100", iconClass: "text-red-500" },
          { name: "GDAL | OGR", iconKey: "gdal", borderClass: "border-blue-500", textClass: "text-blue-100", iconClass: "text-blue-500" },
        ],
      },
      {
        items: [
          { name: "Git", iconKey: "git", borderClass: "border-orange-500", textClass: "text-orange-100", iconClass: "text-orange-500" },
          { name: "Bash", iconKey: "bash", borderClass: "border-green-500", textClass: "text-green-100", iconClass: "text-green-500" },
          { name: "GitHub", iconKey: "github", borderClass: "border-gray-400", textClass: "text-gray-100", iconClass: "text-gray-300" },
          { name: "Bitbucket", iconKey: "bitbucket", borderClass: "border-blue-500", textClass: "text-blue-100", iconClass: "text-blue-500" },
          { name: "Jira", iconKey: "jira", borderClass: "border-blue-600", textClass: "text-blue-100", iconClass: "text-blue-600" },
          { name: "QGIS", iconKey: "qgis", borderClass: "border-green-600", textClass: "text-green-100", iconClass: "text-green-600" },
          { name: "Postman", iconKey: "postman", borderClass: "border-orange-400", textClass: "text-orange-100", iconClass: "text-orange-400" },
          { name: "Docker", iconKey: "docker", borderClass: "border-sky-400", textClass: "text-sky-100", iconClass: "text-sky-400" },
        ],
      },
    ],
    experienceSectionTitle: "Experience",
    experiences: [],
    educationSectionTitle: "Education",
    educationItems: [],
    spotifySectionTitle: "Listening on Spotify",
    spotify: {
      enabled: true,
      topTracksLimit: 5,
      topTracksRange: "medium_term",
      featuredPlaylists: [],
    },
    githubSectionTitle: "GitHub",
    github: {
      enabled: true,
      username: "0xkenn",
      pinnedReposLimit: 6,
    },
  },
  aboutPage: {
    title: "About",
    name: "Kenny Charles U. Tabon",
    profileImageUrl: meImage,
    bioTitle: "About Me",
    bioParagraphs: [
      "Hello, my name is Kenny. I am currently working as a Data Engineer, with a strong focus on building scalable data solutions using Databricks, Apache Airflow, and managing spatial data workflows.",
      "Outside of work, I enjoy staying active through tennis and pickleball. I also spend time playing video games as a way to unwind.",
      "On Sundays, I look forward to watching new episodes of my favorite anime series and attending church to reflect and reset for the upcoming week.",
    ],
  },
  projectsPage: {
    title: "Projects",
    description: "This section is ready to be managed from Sanity. Add featured projects and links next.",
    projects: [],
  },
  contactPage: {
    title: "Contact",
    description: "Reach out through your social links or add a preferred email/contact CTA in Sanity.",
  },
};
