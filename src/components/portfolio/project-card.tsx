import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/types/portfolio";

function ProjectImage({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={cn("relative w-full h-44 rounded-lg border bg-background/40", className)}>
        <div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground">No image</div>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-44 rounded-lg border bg-background/40 overflow-hidden", className)}>
      {!loaded ? <div className="absolute inset-0 animate-pulse bg-muted/60" aria-hidden="true" /> : null}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}

export function ProjectCard({ project, compact = false }: { project: ProjectItem; compact?: boolean }) {
  return (
    <Card className="bg-transparent h-full">
      <div className="px-6 pt-6">
        <ProjectImage src={project.imageUrl} alt={project.imageAlt ?? project.title} className={compact ? "h-36" : undefined} />
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg">{project.title}</CardTitle>
            {project.status ? <p className="text-xs text-muted-foreground mt-1">{project.status}</p> : null}
          </div>
          {project.featured ? (
            <span className="text-xs px-2 py-1 rounded-full border bg-background/50">Featured</span>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className={cn("text-sm text-muted-foreground leading-6", compact ? "line-clamp-3" : "")}>{project.summary}</p>

        {project.techTags?.length ? (
          <div className="flex flex-wrap gap-2">
            {project.techTags.map((tag) => (
              <span key={`${project.id}-${tag}`} className="text-xs px-2 py-1 rounded-full border bg-background/50">
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {project.repoUrl ? (
            <Button asChild variant="outline" size="sm">
              <a href={project.repoUrl} target="_blank" rel="noreferrer">
                Repo
              </a>
            </Button>
          ) : null}
          {project.liveUrl ? (
            <Button asChild variant="outline" size="sm">
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Live
              </a>
            </Button>
          ) : null}
          {project.demoUrl ? (
            <Button asChild variant="outline" size="sm">
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                {project.demoLabel || "Demo"}
              </a>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectCardSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <Card className="bg-transparent h-full animate-pulse">
      <div className="px-6 pt-6">
        <div className={cn("w-full rounded-lg border bg-muted/60", compact ? "h-36" : "h-44")} />
      </div>
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <div className="h-4 w-2/3 rounded bg-muted/60" />
          <div className="h-3 w-1/3 rounded bg-muted/50" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-3 w-full rounded bg-muted/50" />
        <div className="h-3 w-5/6 rounded bg-muted/50" />
        <div className="flex gap-2 pt-1">
          <div className="h-8 w-16 rounded bg-muted/50" />
          <div className="h-8 w-16 rounded bg-muted/50" />
        </div>
      </CardContent>
    </Card>
  );
}
