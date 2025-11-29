import { useEffect, useState } from "react";
import BackButton from "@/components/common/BackButton";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { api } from "@/db/api";
import type { Service } from "@/types";
import { toast } from "sonner";
import SEO from "@/components/common/SEO";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.services.getAll(true);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <SEO 
        title="Roofing Services | Durocap Roofing Solutions Kerala"
        description="Professional roofing services in Kerala including installation, repair, maintenance, waterproofing, and custom roofing solutions for residential and commercial buildings."
        keywords="Roofing services Kerala, Roof installation, Roof repair, Waterproofing Kerala, Commercial roofing TVM"
        ogUrl="https://durocap.com/services"
        canonical="https://durocap.com/services"
      />
      <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional roofing services tailored to your needs. From installation to maintenance, we've got you covered.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">No Services Yet</h3>
              <p className="text-muted-foreground">
                Services will appear here once they are added through the admin panel.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
