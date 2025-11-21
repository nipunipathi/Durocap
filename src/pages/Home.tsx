import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Phone, Mail, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/cards/ProductCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { api } from "@/db/api";
import type { Product, Service } from "@/types";
import { cartUtils } from "@/lib/cart";
import { toast } from "sonner";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, servicesData] = await Promise.all([
          api.products.getAll(true),
          api.services.getAll(true),
        ]);
        setFeaturedProducts(productsData.slice(0, 4));
        setServices(servicesData.slice(0, 6));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product: Product) => {
    cartUtils.addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-hero text-primary-foreground py-20 xl:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl xl:text-6xl font-bold mb-6 animate-fade-in">
              We are DuroCap — offering trusted, durable, and affordable roofing solutions
            </h1>
            <p className="text-lg xl:text-xl mb-6 opacity-90 animate-fade-in">
              For commercial and residential projects across Kerala
            </p>
            <div className="mb-8 space-y-2 text-base xl:text-lg opacity-95 animate-fade-in">
              <p>✓ Protecting Every Structure with Lasting Strength and Trust</p>
              <p>✓ Built Strong. Built Smart. Built by DuroCap</p>
              <p>✓ Raising Standards in Roofing, One Roof at a Time</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Link to="/about">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  About Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block">
              <div className="text-5xl xl:text-6xl font-bold text-primary mb-2">100+</div>
              <div className="text-lg xl:text-xl font-semibold text-foreground">Successful Projects</div>
              <Link to="/projects" className="inline-flex items-center text-secondary hover:underline mt-2">
                See more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl xl:text-4xl font-bold mb-4">Why Choose DuroCap?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner for durable and dependable roofing solutions since 2015
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Quality & Durability", desc: "Premium materials from trusted brands ensuring long-lasting protection" },
              { title: "Expert Craftsmanship", desc: "Professional installation and repair services with modern techniques" },
              { title: "Customer Trust", desc: "100+ successful projects across Kerala with satisfied clients" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl xl:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive roofing services to meet all your needs
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">Loading services...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/services">
              <Button variant="outline">
                View All Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl xl:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our selection of high-quality roofing products
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/products">
              <Button>
                View All Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl xl:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from our satisfied customers across Kerala
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Balaji Subrahmonyan",
                text: "I have contacted Mr. Rajesh for making a temporary building for our Panchakarma treatment section. After discussions, the plan was fixed. The sheets were green-colored UPVC and the sides were of V Panel. Their team made everything perfect with awesome workers under the supervision of an engineer. The work and team are superb. You can trust them for the best construction in a limited time period."
              },
              {
                name: "JiNi S J",
                text: "I was looking for clay jaali for my house and finally heard about Durocap. Their wide range of jaali collections truly impressed me. Special thanks to Remya for her excellent assistance—knowledgeable, patient, and helpful. Their customer service was top-notch, and they even provided architectural consultations. Highly recommend Durocap Roofing Solutions!"
              },
              {
                name: "Jibin Varghese",
                text: "Great service from DuroCap! Quality materials, timely completion, and a very professional team. Highly recommended for roofing solutions. Thank you!"
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="bg-background">
                <CardContent className="pt-6">
                  <Quote className="w-8 h-8 text-secondary mb-4" />
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-foreground">— {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl xl:text-4xl font-bold mb-4">Need A Free Estimate?</h2>
          <p className="text-lg mb-8 opacity-90">
            If you want a roofing installation or replacement done or know someone who needs a roof repair and coating, get in touch with us today! Get the Best Roofing Services in Kerala.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                <Mail className="mr-2 w-5 h-5" />
                Get A Free Estimate
              </Button>
            </Link>
            <a href="tel:08593852223">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Phone className="mr-2 w-5 h-5" />
                Call Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
