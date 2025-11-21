import { useState } from "react";
import { Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import BackButton from "@/components/common/BackButton";
import { toast } from "sonner";

export default function AdminPages() {
  // Home Page Content
  const [homeContent, setHomeContent] = useState({
    heroTitle: "We are DuroCap — offering trusted, durable, and affordable roofing solutions",
    heroSubtitle: "For commercial and residential projects across Kerala",
    heroTagline1: "10+ Years of Excellence",
    heroTagline2: "100+ Successful Projects",
    heroTagline3: "Expert Team & Quality Materials",
  });

  // About Page Content
  const [aboutContent, setAboutContent] = useState({
    title: "About DuroCap Roofing Solutions",
    subtitle: "Shaping the future of roofing across Kerala since 2015",
    description: "DuroCap Roofing Solutions has been a trusted name in the roofing industry since 2015...",
  });

  // Contact Page Content
  const [contactContent, setContactContent] = useState({
    phone: "085938 52223",
    email: "info@durocap.com",
    address: "Near IOC Gas Plant, Kolayil, Parippally P.O, Kollam, Kerala 691574",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM (Sat-Sun: Closed)",
  });

  const handleSaveHome = () => {
    // In a real app, this would save to database
    toast.success("Home page content saved successfully!");
  };

  const handleSaveAbout = () => {
    toast.success("About page content saved successfully!");
  };

  const handleSaveContact = () => {
    toast.success("Contact page content saved successfully!");
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Edit Pages</h1>
          <p className="text-muted-foreground mt-2">Manage content for all website pages</p>
        </div>

        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="home">Home Page</TabsTrigger>
            <TabsTrigger value="about">About Page</TabsTrigger>
            <TabsTrigger value="contact">Contact Page</TabsTrigger>
          </TabsList>

          {/* Home Page Editor */}
          <TabsContent value="home">
            <Card>
              <CardHeader>
                <CardTitle>Home Page Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Hero Title</Label>
                  <Textarea
                    id="heroTitle"
                    value={homeContent.heroTitle}
                    onChange={(e) => setHomeContent({ ...homeContent, heroTitle: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                  <Input
                    id="heroSubtitle"
                    value={homeContent.heroSubtitle}
                    onChange={(e) => setHomeContent({ ...homeContent, heroSubtitle: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tagline1">Tagline 1</Label>
                    <Input
                      id="tagline1"
                      value={homeContent.heroTagline1}
                      onChange={(e) => setHomeContent({ ...homeContent, heroTagline1: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline2">Tagline 2</Label>
                    <Input
                      id="tagline2"
                      value={homeContent.heroTagline2}
                      onChange={(e) => setHomeContent({ ...homeContent, heroTagline2: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline3">Tagline 3</Label>
                    <Input
                      id="tagline3"
                      value={homeContent.heroTagline3}
                      onChange={(e) => setHomeContent({ ...homeContent, heroTagline3: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveHome} className="w-full" size="lg">
                  <Save className="w-4 h-4 mr-2" />
                  Save Home Page
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Page Editor */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Page Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="aboutTitle">Page Title</Label>
                  <Input
                    id="aboutTitle"
                    value={aboutContent.title}
                    onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aboutSubtitle">Subtitle</Label>
                  <Input
                    id="aboutSubtitle"
                    value={aboutContent.subtitle}
                    onChange={(e) => setAboutContent({ ...aboutContent, subtitle: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aboutDescription">Description</Label>
                  <Textarea
                    id="aboutDescription"
                    value={aboutContent.description}
                    onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
                    rows={6}
                  />
                </div>

                <Button onClick={handleSaveAbout} className="w-full" size="lg">
                  <Save className="w-4 h-4 mr-2" />
                  Save About Page
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Page Editor */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Page Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={contactContent.phone}
                      onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactContent.email}
                      onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Physical Address</Label>
                  <Textarea
                    id="address"
                    value={contactContent.address}
                    onChange={(e) => setContactContent({ ...contactContent, address: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours">Business Hours</Label>
                  <Input
                    id="hours"
                    value={contactContent.hours}
                    onChange={(e) => setContactContent({ ...contactContent, hours: e.target.value })}
                  />
                </div>

                <Button onClick={handleSaveContact} className="w-full" size="lg">
                  <Save className="w-4 h-4 mr-2" />
                  Save Contact Page
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Links to Other Editors */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Products & Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Manage products and services through their dedicated pages
              </p>
              <div className="flex gap-4">
                <Button variant="outline" asChild className="flex-1">
                  <a href="/admin/products">Edit Products</a>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <a href="/services">Edit Services</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Projects page showcases your completed work
              </p>
              <Button variant="outline" asChild className="w-full">
                <a href="/projects">View Projects Page</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
