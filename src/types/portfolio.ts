export type NavItem = {
  label: string;
  path: string;
  external?: boolean;
};

export type SocialPlatform = "github" | "linkedin" | "instagram" | "spotify" | "other";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  url: string;
};

export type TechItem = {
  name: string;
  iconKey?: string;
  borderClass?: string;
  textClass?: string;
  iconClass?: string;
};

export type TechStackRow = {
  label?: string;
  reverse?: boolean;
  items: TechItem[];
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  imageUrl?: string;
  imageAlt?: string;
  employmentType?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  summary: string;
  highlights?: string[];
  techTags?: string[];
  order?: number;
};

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  imageUrl?: string;
  imageAlt?: string;
  program?: string;
  startDate?: string;
  endDate?: string;
  honors?: string;
  description?: string;
  tags?: string[];
  order?: number;
};

export type SpotifyFeaturedPlaylist = {
  spotifyPlaylistId: string;
  customLabel?: string;
  order?: number;
};

export type SpotifySettings = {
  enabled: boolean;
  topTracksLimit: number;
  topTracksRange: "short_term" | "medium_term" | "long_term";
  featuredPlaylists: SpotifyFeaturedPlaylist[];
};

export type GithubSettings = {
  enabled: boolean;
  username: string;
  pinnedReposLimit: number;
};

export type SiteSettings = {
  brandName: string;
  navItems: NavItem[];
  resumeUrl?: string;
  socials: SocialLink[];
};

export type HomePageContent = {
  introTitle: string;
  introSubtitle: string;
  techSectionTitle: string;
  techStackRows: TechStackRow[];
  experienceSectionTitle: string;
  experiences: ExperienceItem[];
  educationSectionTitle: string;
  educationItems: EducationItem[];
  spotifySectionTitle: string;
  spotify: SpotifySettings;
  githubSectionTitle: string;
  github: GithubSettings;
};

export type AboutPageContent = {
  title: string;
  name: string;
  profileImageUrl?: string;
  bioTitle: string;
  bioParagraphs: string[];
};

export type ProjectsPageContent = {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaUrl?: string;
  projects: ProjectItem[];
};

export type ContactPageContent = {
  title: string;
  description: string;
  email?: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  slug?: string;
  summary: string;
  imageUrl?: string;
  imageAlt?: string;
  techTags?: string[];
  repoUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  demoLabel?: string;
  featured?: boolean;
  status?: string;
  order?: number;
};

export type PortfolioContent = {
  siteSettings: SiteSettings;
  homePage: HomePageContent;
  aboutPage: AboutPageContent;
  projectsPage: ProjectsPageContent;
  contactPage: ContactPageContent;
};

export type PortfolioContentResult = {
  content: PortfolioContent;
  source: "sanity" | "fallback";
};

export type SpotifyTrackCard = {
  id: string;
  name: string;
  artists: string[];
  albumName?: string;
  albumImageUrl?: string;
  externalUrl?: string;
  previewUrl?: string | null;
};

export type SpotifyPlaylistCard = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  externalUrl?: string;
  ownerName?: string;
  trackCount?: number;
};

export type SpotifyTopTracksResponse = {
  tracks: SpotifyTrackCard[];
  fetchedAt: string;
  source?: "spotify" | "cache";
};

export type SpotifyPlaylistsResponse = {
  playlists: SpotifyPlaylistCard[];
  fetchedAt: string;
};

export type GithubProfile = {
  login: string;
  avatarUrl: string;
  bio?: string;
  followers: number;
  following: number;
  publicRepos: number;
  profileUrl: string;
};

export type GithubRepoCard = {
  id: string;
  name: string;
  description?: string;
  url: string;
  stars: number;
  primaryLanguage?: string;
  updatedAt?: string;
};

export type GithubProfileResponse = {
  profile: GithubProfile;
  fetchedAt: string;
};

export type GithubPinnedReposResponse = {
  repos: GithubRepoCard[];
  fetchedAt: string;
};
