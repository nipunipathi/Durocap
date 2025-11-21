import { useEffect, useState } from "react";
import BackButton from "@/components/common/BackButton";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/db/api";
import type { Project } from "@/types";
import { toast } from "sonner";
import { CheckCircle2, Users, Award, TrendingUp } from "lucide-react";

// Project gallery images
const projectGallery = [
  {
    id: 1,
    title: "Modern Residential Roofing",
    category: "Residential",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/2ac82384-49fd-4bdd-83ad-6fa7a18d2e38.jpg",
  },
  {
    id: 2,
    title: "Luxury Villa Premium Tiles",
    category: "Residential",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/14fd8834-ae46-4a56-b336-07cd4be5846c.jpg",
  },
  {
    id: 3,
    title: "Contemporary Dark Grey Roofing",
    category: "Residential",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/c185878b-d1a6-4824-8654-432419db952b.jpg",
  },
  {
    id: 4,
    title: "Commercial Building Installation",
    category: "Commercial",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/84bc8e36-6a1e-444f-8408-6b5b2ef79ff9.jpg",
  },
  {
    id: 5,
    title: "Industrial Warehouse Metal Roofing",
    category: "Industrial",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/585b7ce5-cbce-4e1b-af0d-1a91f0f8336d.jpg",
  },
  {
    id: 6,
    title: "Modern Flat Roof Commercial",
    category: "Commercial",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/17d0376b-970f-4c47-8316-1a2d09d360e2.jpg",
  },
  {
    id: 7,
    title: "Elegant Villa Roofing Design",
    category: "Residential",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/26605862-f83c-47a8-b219-1bd262658128.jpg",
  },
  {
    id: 8,
    title: "Asphalt Shingle Residential",
    category: "Residential",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/c6dedeb9-efa3-43a0-8103-950ac58792f2.jpg",
  },
  {
    id: 9,
    title: "Traditional Terracotta Tile",
    category: "Residential",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/a14807c1-c43f-4da4-a6f2-8322be4615aa.jpg",
  },
  {
    id: 10,
    title: "Aerial View Completed Project",
    category: "Residential",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/7af572cc-3be3-49c7-8fef-4cd62be7a09c.jpg",
  },
  {
    id: 11,
    title: "Professional Installation Team",
    category: "Service",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/445ff891-0abc-428f-b42c-b2e74d8f2c7f.jpg",
  },
  {
    id: 12,
    title: "Before & After Renovation",
    category: "Renovation",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/f2629f59-f528-4514-b7b6-f31c572a53ac.jpg",
  },
];

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

        {/* Project Gallery with Hover Effects */}
        <div className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-3">Project Gallery</h2>
            <p className="text-muted-foreground">
              Hover over images to see project details
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projectGallery.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-[4/3]"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                  </div>
                </div>

                {/* Corner Badge */}
                <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Projects Section */}
        {!loading && projects.length > 0 && (
          <div>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-3">Featured Projects</h2>
              <p className="text-muted-foreground">
                Detailed information about our recent work
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        )}
      </div>
    </div>
  );
}
