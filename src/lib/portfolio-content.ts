import { defaultPortfolioContent } from "@/lib/default-portfolio-content";
import type {
  EducationItem,
  ExperienceItem,
  ProjectItem,
  PortfolioContent,
  PortfolioContentResult,
} from "@/types/portfolio";

const sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const sanityDataset = import.meta.env.VITE_SANITY_DATASET as string | undefined;
const sanityApiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) ?? "2025-01-01";
const sanityUseCdn = String(import.meta.env.VITE_SANITY_USE_CDN ?? "true") !== "false";

export const hasSanityConfig = Boolean(sanityProjectId && sanityDataset);

export const portfolioSanityQuery = `{
  "siteSettings": *[_type == "siteSettings"][0]{
    brandName,
    resumeUrl,
    navItems[]{label, path, external},
    socials[]{platform, label, url}
  },
  "homePage": *[_type == "homePage"][0]{
    introTitle,
    introSubtitle,
    techSectionTitle,
    techStackRows[]{label, reverse, items[]{name, iconKey, borderClass, textClass, iconClass}},
    experienceSectionTitle,
    experiences[]{
      "id": coalesce(_key, _id),
      company,
      role,
      "imageUrl": image.asset->url,
      "imageAlt": coalesce(imageAlt, role),
      employmentType,
      location,
      startDate,
      endDate,
      isCurrent,
      summary,
      highlights,
      techTags,
      order
    },
    educationSectionTitle,
    educationItems[]{
      "id": coalesce(_key, _id),
      school,
      degree,
      "imageUrl": image.asset->url,
      "imageAlt": coalesce(imageAlt, school),
      program,
      startDate,
      endDate,
      honors,
      description,
      tags,
      order
    },
    spotifySectionTitle,
    spotify{
      enabled,
      topTracksLimit,
      topTracksRange,
      featuredPlaylists[]{spotifyPlaylistId, customLabel, order}
    },
    githubSectionTitle,
    github{enabled, username, pinnedReposLimit}
  },
  "aboutPage": *[_type == "aboutPage"][0]{
    title,
    name,
    profileImageUrl,
    bioTitle,
    bioParagraphs
  },
  "projectsPage": *[_type == "projectsPage"][0]{
    title,
    description,
    ctaLabel,
    ctaUrl,
    projects[]{
      "id": coalesce(_key, _id),
      title,
      slug,
      summary,
      "imageUrl": image.asset->url,
      "imageAlt": coalesce(imageAlt, title),
      techTags,
      repoUrl,
      liveUrl,
      demoUrl,
      demoLabel,
      featured,
      status,
      order
    }
  },
  "contactPage": *[_type == "contactPage"][0]{
    title,
    description,
    email,
    ctaLabel,
    ctaUrl
  },
  "experienceItems": *[_type == "experienceItem"] | order(order asc){
    "id": coalesce(_id, _key),
    company,
    role,
    "imageUrl": image.asset->url,
    "imageAlt": coalesce(imageAlt, role),
    employmentType,
    location,
    startDate,
    endDate,
    isCurrent,
    summary,
    highlights,
    techTags,
    order
  },
  "educationEntries": *[_type == "educationItem"] | order(order asc){
    "id": coalesce(_id, _key),
    school,
    degree,
    "imageUrl": image.asset->url,
    "imageAlt": coalesce(imageAlt, school),
    program,
    startDate,
    endDate,
    honors,
    description,
    tags,
    order
  },
  "projectItems": *[_type == "project"] | order(order asc){
    "id": coalesce(_id, _key),
    title,
    "slug": slug.current,
    summary,
    "imageUrl": image.asset->url,
    "imageAlt": coalesce(imageAlt, title),
    techTags,
    repoUrl,
    liveUrl,
    demoUrl,
    demoLabel,
    featured,
    status,
    order
  }
}`;

type SanityQueryResponse<T> = {
  result?: T;
};

type PortfolioContentQueryResult = Partial<PortfolioContent> & {
  experienceItems?: ExperienceItem[];
  educationEntries?: EducationItem[];
  projectItems?: ProjectItem[];
};

function sortByOrder<T extends { order?: number }>(items: T[] | undefined): T[] {
  return [...(items ?? [])].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
}

function mergePortfolioContent(raw?: PortfolioContentQueryResult | null): PortfolioContent {
  if (!raw) {
    return defaultPortfolioContent;
  }

  const merged: PortfolioContent = {
    ...defaultPortfolioContent,
    ...raw,
    siteSettings: {
      ...defaultPortfolioContent.siteSettings,
      ...(raw.siteSettings ?? {}),
      navItems: raw.siteSettings?.navItems ?? defaultPortfolioContent.siteSettings.navItems,
      socials: raw.siteSettings?.socials ?? defaultPortfolioContent.siteSettings.socials,
    },
    homePage: {
      ...defaultPortfolioContent.homePage,
      ...(raw.homePage ?? {}),
      techStackRows: raw.homePage?.techStackRows ?? defaultPortfolioContent.homePage.techStackRows,
      experiences: sortByOrder(
        raw.homePage?.experiences?.length ? raw.homePage.experiences : raw.experienceItems,
      ).length
        ? sortByOrder(raw.homePage?.experiences?.length ? raw.homePage.experiences : raw.experienceItems)
        : defaultPortfolioContent.homePage.experiences,
      educationItems: sortByOrder(
        raw.homePage?.educationItems?.length ? raw.homePage.educationItems : raw.educationEntries,
      ).length
        ? sortByOrder(raw.homePage?.educationItems?.length ? raw.homePage.educationItems : raw.educationEntries)
        : defaultPortfolioContent.homePage.educationItems,
      spotify: {
        ...defaultPortfolioContent.homePage.spotify,
        ...(raw.homePage?.spotify ?? {}),
        featuredPlaylists:
          raw.homePage?.spotify?.featuredPlaylists ?? defaultPortfolioContent.homePage.spotify.featuredPlaylists,
      },
      github: {
        ...defaultPortfolioContent.homePage.github,
        ...(raw.homePage?.github ?? {}),
      },
    },
    aboutPage: {
      ...defaultPortfolioContent.aboutPage,
      ...(raw.aboutPage ?? {}),
      bioParagraphs: raw.aboutPage?.bioParagraphs ?? defaultPortfolioContent.aboutPage.bioParagraphs,
    },
    projectsPage: {
      ...defaultPortfolioContent.projectsPage,
      ...(raw.projectsPage ?? {}),
      projects: sortByOrder(raw.projectsPage?.projects?.length ? raw.projectsPage.projects : raw.projectItems).length
        ? sortByOrder(raw.projectsPage?.projects?.length ? raw.projectsPage.projects : raw.projectItems)
        : defaultPortfolioContent.projectsPage.projects,
    },
    contactPage: {
      ...defaultPortfolioContent.contactPage,
      ...(raw.contactPage ?? {}),
    },
  };

  return merged;
}

async function fetchSanityPortfolioContent(): Promise<PortfolioContent | null> {
  if (!hasSanityConfig || !sanityProjectId || !sanityDataset) {
    return null;
  }

  const host = sanityUseCdn ? "apicdn.sanity.io" : "api.sanity.io";
  const endpoint = new URL(`https://${sanityProjectId}.${host}/v${sanityApiVersion}/data/query/${sanityDataset}`);
  endpoint.searchParams.set("query", portfolioSanityQuery);
  endpoint.searchParams.set("perspective", "published");

  const response = await fetch(endpoint.toString());
  if (!response.ok) {
    throw new Error(`Sanity request failed: ${response.status}`);
  }

  const payload = (await response.json()) as SanityQueryResponse<PortfolioContentQueryResult>;
  return mergePortfolioContent(payload.result);
}

export async function getPortfolioContent(): Promise<PortfolioContentResult> {
  if (!hasSanityConfig) {
    return { content: defaultPortfolioContent, source: "fallback" };
  }

  try {
    const content = await fetchSanityPortfolioContent();
    return {
      content: content ?? defaultPortfolioContent,
      source: content ? "sanity" : "fallback",
    };
  } catch (error) {
    console.error("Failed to fetch Sanity content, using fallback", error);
    return { content: defaultPortfolioContent, source: "fallback" };
  }
}
