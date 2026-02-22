import { Link } from "react-router";

import { ProjectCard, ProjectCardSkeleton } from "@/components/portfolio/project-card";
import { EmptyStateCard, SectionHeading } from "@/components/portfolio/section-shared";
import { Button } from "@/components/ui/button";
import type { ProjectItem } from "@/types/portfolio";

export function FeaturedProjectsSection({ projects, loading = false }: { projects: ProjectItem[]; loading?: boolean }) {
  const featured = projects.filter((project) => project.featured);
  const displayProjects = (featured.length ? featured : projects).slice(0, 3);

  return (
    <section id="featured-projects" className="mt-16 w-full max-w-5xl mx-auto px-4">
      <div className="flex items-end justify-between gap-3 mb-6">
        <SectionHeading
          title="Featured Projects"
          subtitle={featured.length ? "Highlighted work from your projects collection." : "Add featured projects in Sanity or the newest projects will appear here."}
          className="mb-0"
        />
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <Link to="/projects">See All</Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <ProjectCardSkeleton key={index} compact />
          ))}
        </div>
      ) : displayProjects.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {displayProjects.map((project) => (
            <ProjectCard key={project.id} project={project} compact />
          ))}
        </div>
      ) : (
        <EmptyStateCard
          title="No projects yet"
          description="Create project documents in Sanity and they will appear here automatically."
          action={
            <Button asChild variant="outline" size="sm">
              <Link to="/projects">Open Projects Page</Link>
            </Button>
          }
        />
      )}
    </section>
  );
}
