import { useState, useEffect } from "react";
import { Search, Download, Eye, FileText, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { api } from "@/db/api";
import type { BrochureWithCategory, BrochureCategory } from "@/types";
import { useNavigate } from "react-router-dom";

export default function Catalog() {
  const [brochures, setBrochures] = useState<BrochureWithCategory[]>([]);
  const [categories, setCategories] = useState<BrochureCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [brochuresData, categoriesData] = await Promise.all([
        api.brochures.getAll(),
        api.brochureCategories.getAll(),
      ]);
      setBrochures(brochuresData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading catalog:", error);
      toast.error("Failed to load catalog");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadData();
      return;
    }

    try {
      setLoading(true);
      const results = await api.brochures.search(searchTerm);
      setBrochures(results);
    } catch (error) {
      console.error("Error searching:", error);
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (brochure: BrochureWithCategory) => {
    try {
      await api.brochures.incrementDownloadCount(brochure.id);
      window.open(brochure.file_url, "_blank");
      toast.success("Download started");
    } catch (error) {
      console.error("Error downloading:", error);
      toast.error("Download failed");
    }
  };

  const handleView = async (brochure: BrochureWithCategory) => {
    try {
      await api.brochures.incrementViewCount(brochure.id);
      window.open(brochure.file_url, "_blank");
    } catch (error) {
      console.error("Error viewing:", error);
      toast.error("Failed to open brochure");
    }
  };

  const handleRequestQuote = () => {
    navigate("/contact");
  };

  const filteredBrochures = brochures.filter((brochure) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "featured") return brochure.is_featured;
    return brochure.category_id === selectedCategory;
  });

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown size";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Product Catalog & Resources</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Browse and download our comprehensive collection of product brochures, technical specifications, and installation guides.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-2 max-w-2xl">
            <Input
              placeholder="Search brochures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="all">All Brochures</TabsTrigger>
            <TabsTrigger value="featured">
              <Star className="w-4 h-4 mr-2" />
              Featured
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-20 bg-muted rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredBrochures.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No brochures found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Try adjusting your search terms" : "No brochures available in this category"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBrochures.map((brochure) => (
                  <Card key={brochure.id} className="flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg line-clamp-2">{brochure.title}</CardTitle>
                        {brochure.is_featured && (
                          <Badge variant="secondary" className="shrink-0">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      {brochure.category && (
                        <CardDescription>{brochure.category.name}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {brochure.description || "No description available"}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {brochure.download_count}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {brochure.view_count}
                        </div>
                        <div>{formatFileSize(brochure.file_size)}</div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                      <div className="flex gap-2 w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleView(brochure)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDownload(brochure)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full"
                        onClick={handleRequestQuote}
                      >
                        Request Quote
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Our team is here to help you find the right products and information for your roofing project.
          </p>
          <Button onClick={() => navigate("/contact")}>
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
