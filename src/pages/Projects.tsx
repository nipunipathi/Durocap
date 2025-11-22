import { useEffect, useState } from "react";
import BackButton from "@/components/common/BackButton";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/db/api";
import type { Project } from "@/types";
import { toast } from "sonner";
import { CheckCircle2, Users, Award, TrendingUp } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.projects.getAll();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of completed roofing projects across Texas
          </p>
        </div>

        {/* Statistics Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold mb-2">100+</h3>
                <p className="text-muted-foreground font-medium">Successful Projects</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold mb-2">500+</h3>
                <p className="text-muted-foreground font-medium">Happy Clients</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold mb-2">15+</h3>
                <p className="text-muted-foreground font-medium">Years Experience</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold mb-2">98%</h3>
                <p className="text-muted-foreground font-medium">Satisfaction Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Projects Section */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground">
                Projects will appear here once they are added through the admin panel.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-3">Our Projects</h2>
              <p className="text-muted-foreground">
                Explore our portfolio of completed roofing projects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
