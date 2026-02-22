import { ProjectCard, ProjectCardSkeleton } from "@/components/portfolio/project-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";
import { hasSanityConfig } from "@/lib/portfolio-content";

const ProjectsPage = () => {
  const { data, isFetching } = usePortfolioContent();
  const projects = data?.content.projectsPage;
  const showSkeletons = Boolean(hasSanityConfig && isFetching && data?.source === "fallback");

  if (!projects) {
    return <p className="p-4 text-sm text-muted-foreground">Loading…</p>;
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-10">
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-2xl">{projects.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-6">{projects.description}</p>
          {projects.ctaLabel && projects.ctaUrl ? (
            <Button asChild>
              <a href={projects.ctaUrl} target="_blank" rel="noreferrer">
                {projects.ctaLabel}
              </a>
            </Button>
          ) : null}
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {showSkeletons ? (
          Array.from({ length: 4 }).map((_, index) => <ProjectCardSkeleton key={index} />)
        ) : projects.projects.length ? (
          projects.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <Card className="bg-transparent md:col-span-2 border-dashed">
            <CardContent className="py-6">
              <p className="text-sm text-muted-foreground">
                No projects yet. Add `project` documents in Sanity to populate this page.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;
