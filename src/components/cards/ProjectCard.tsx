import { MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";
import { format } from "date-fns";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-hover transition-shadow duration-300">
      <div className="aspect-video overflow-hidden bg-muted relative">
        <img
          src={project.image_url || "https://via.placeholder.com/600x400"}
          alt={project.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {project.is_featured && (
          <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
            Featured
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          {project.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{project.location}</span>
            </div>
          )}
          {project.completion_date && (
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Completed: {format(new Date(project.completion_date), "MMM yyyy")}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
