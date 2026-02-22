import { useEffect, useRef, useState } from "react";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EducationSection } from "@/components/portfolio/education-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { FeaturedProjectsSection } from "@/components/portfolio/featured-projects-section";
import { GithubSection } from "@/components/portfolio/github-section";
import { getSocialIcon, getTechIcon } from "@/components/portfolio/icons";
import { SpotifySection } from "@/components/portfolio/spotify-section";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";
import { hasSanityConfig } from "@/lib/portfolio-content";

const HomePage = () => {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const connectMenuRef = useRef<HTMLDivElement | null>(null);
  const { data, isFetching, isLoading } = usePortfolioContent();
  const content = data?.content;

  if (!content && isLoading) {
    return (
      <main className="px-4 py-10">
        <p className="text-sm text-muted-foreground">Loading portfolio content…</p>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="px-4 py-10">
        <p className="text-sm text-muted-foreground">Unable to load content.</p>
      </main>
    );
  }

  const { homePage, siteSettings, projectsPage, aboutPage } = content;
  const showFallbackBanner = data?.source === "fallback" && (!hasSanityConfig || !isFetching);
  const showProjectsLoading = Boolean(hasSanityConfig && isFetching && data?.source === "fallback");
  const defaultTechGroupLabels = ["Languages & Data", "Frameworks", "Tools"];
  const techItems = homePage.techStackRows
    .flatMap((row) => row.items)
    .filter((item, index, array) => array.findIndex((candidate) => candidate.name === item.name) === index);
  const techGroups = homePage.techStackRows.map((row, index) => ({
    label: row.label || defaultTechGroupLabels[index] || `Group ${index + 1}`,
    items: row.items,
  }));
  const coreTechItems = techItems.slice(0, 10);
  const moreTechItems = techItems.slice(10);

  useEffect(() => {
    if (!isConnectOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (!connectMenuRef.current?.contains(target)) {
        setIsConnectOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsConnectOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isConnectOpen]);

  return (
    <main>
      {showFallbackBanner ? (
        <div className="mx-auto mt-4 w-full max-w-5xl px-4">
          <div className="rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground">
            Using local fallback content. Configure Sanity env vars to load CMS content.
          </div>
        </div>
      ) : null}

      <section id="hero" className="mt-16 px-4">
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <div id="intro" className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left min-h-[180px]">
            <div className="flex flex-col items-center lg:items-start max-w-3xl">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                {aboutPage.profileImageUrl ? (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border bg-card shadow-sm shrink-0">
                    <img
                      src={aboutPage.profileImageUrl}
                      alt={`${aboutPage.name} profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}

                <div className="flex flex-col items-center lg:items-start">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Data Engineer · Software Developer</p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mt-1">{homePage.introTitle}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">{aboutPage.name}</p>
                  <TypingAnimation
                    startOnView
                    className="font-semibold text-[10px] sm:text-sm md:text-md lg:text-lg leading-normal mt-2"
                  >
                    {homePage.introSubtitle}
                  </TypingAnimation>
                </div>
              </div>

              {aboutPage.bioParagraphs?.length ? (
                <div className="mt-4 space-y-2 text-left w-full">
                  <p className="text-sm text-muted-foreground leading-6 text-center lg:text-left">
                    {aboutPage.bioParagraphs[0]}
                  </p>
                  {aboutPage.bioParagraphs[1] ? (
                    <p className="hidden sm:block text-sm text-muted-foreground/90 leading-6 text-center lg:text-left">
                      {aboutPage.bioParagraphs[1]}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <Button asChild size="sm" className="h-8 px-3">
                  <Link to="/projects">View Projects</Link>
                </Button>
                {siteSettings.resumeUrl ? (
                  <Button asChild variant="secondary" size="sm" className="h-8 px-3">
                    <a href={siteSettings.resumeUrl} target="_blank" rel="noreferrer">
                      Resume
                    </a>
                  </Button>
                ) : null}

                <div ref={connectMenuRef} className="sm:hidden relative">
                  <button
                    type="button"
                    onClick={() => setIsConnectOpen((open) => !open)}
                    className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border px-3 text-sm font-medium bg-background/70"
                    aria-expanded={isConnectOpen}
                    aria-haspopup="menu"
                  >
                    Connect
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${isConnectOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isConnectOpen ? (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 top-10 z-20 min-w-44 rounded-lg border bg-background p-2 shadow-sm"
                      role="menu"
                    >
                    <div className="flex flex-col gap-1">
                      {siteSettings.socials.map((social) => (
                        <a
                          key={`mobile-social-${social.platform}-${social.url}`}
                          href={social.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent/50"
                          role="menuitem"
                          onClick={() => setIsConnectOpen(false)}
                        >
                          {getSocialIcon(social.platform, "text-sm")}
                          <span>{social.label}</span>
                        </a>
                      ))}
                    </div>
                    </div>
                  ) : null}
                </div>

                <div className="hidden sm:flex flex-wrap items-center gap-2">
                  {siteSettings.socials.map((social) => (
                    <Button key={`${social.platform}-${social.url}`} asChild variant="outline" size="sm" className="h-8 px-3">
                      <a href={social.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5">
                        {getSocialIcon(social.platform, "text-sm")}
                        <span>{social.label}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div id="tech-stack" className="w-full overflow-x-hidden">
            <Card className="bg-transparent">
              <CardContent className="px-4 py-4 sm:px-5 sm:py-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-left">{homePage.techSectionTitle}</h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Core tools up front. Full stack is tucked below.
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground border rounded-full px-2 py-1 shrink-0">
                    {techItems.length} tools
                  </span>
                </div>

                <div className="mb-3 flex flex-wrap gap-2">
                  {techGroups.map((group) => (
                    <span
                      key={`tech-group-${group.label}`}
                      className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] text-muted-foreground bg-background/40"
                    >
                      <span className="font-medium text-foreground">{group.label}</span>
                      <span>({group.items.length})</span>
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {coreTechItems.map((tech) => (
                    <div
                      key={`core-tech-${tech.name}`}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 bg-background/50 ${tech.borderClass ?? "border-border"}`}
                    >
                      {getTechIcon(tech.iconKey, `text-sm ${tech.iconClass ?? ""}`) ?? (
                        <span className="text-xs font-semibold">•</span>
                      )}
                      <span className={`text-xs sm:text-sm font-medium ${tech.textClass ?? ""}`}>{tech.name}</span>
                    </div>
                  ))}
                </div>

                {moreTechItems.length ? (
                  <details className="mt-4 rounded-lg border bg-background/30 px-3 py-2">
                    <summary className="cursor-pointer text-sm font-medium">
                      See full tech stack (+{moreTechItems.length})
                    </summary>
                    <div className="mt-3 space-y-3">
                      {techGroups.map((group) => (
                        <div key={`details-group-${group.label}`}>
                          <p className="text-xs font-semibold text-muted-foreground mb-2">{group.label}</p>
                          <div className="flex flex-wrap gap-2">
                            {group.items.map((tech) => (
                              <div
                                key={`more-tech-${group.label}-${tech.name}`}
                                className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs bg-background/60"
                              >
                                {getTechIcon(tech.iconKey, "text-xs") ?? <span>•</span>}
                                <span>{tech.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FeaturedProjectsSection projects={projectsPage.projects} loading={showProjectsLoading} />
      <ExperienceSection title={homePage.experienceSectionTitle} items={homePage.experiences} />
      <EducationSection title={homePage.educationSectionTitle} items={homePage.educationItems} />
      <SpotifySection title={homePage.spotifySectionTitle} settings={homePage.spotify} />
      <GithubSection title={homePage.githubSectionTitle} settings={homePage.github} />
    </main>
  );
};

export default HomePage;
