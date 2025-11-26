import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Phone, Mail, Quote, Shield, Award, Users, Wrench } from "lucide-react";
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
      <section className="relative min-h-[700px] xl:min-h-[800px] flex items-center overflow-hidden bg-gradient-to-br from-[#2C5F7C] via-[#1e4a5f] to-[#0f2d3d]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#7DD3E8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7DD3E8] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="inline-block">
                <img 
                  src="https://miaoda-conversation-file.s3cdn.medo.dev/user-7fwukq22idq8/conv-7p9lig9vkiyo/20251126/file-7tmweuqklfy9.png" 
                  alt="DuroCap Roofing Solutions" 
                  className="h-20 xl:h-24 w-auto mb-6"
                />
              </div>
              
              <h1 className="text-4xl xl:text-6xl font-bold leading-tight">
                Trusted, Durable & Affordable{" "}
                <span className="text-[#7DD3E8]">Roofing Solutions</span>
              </h1>
              
              <p className="text-lg xl:text-xl text-gray-200 leading-relaxed">
                For commercial and residential projects across Kerala. Protecting every structure with lasting strength and trust.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/products">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-[#7DD3E8] hover:bg-[#6BC2D7] text-[#2C5F7C] font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
                  >
                    Explore Products
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-[#2C5F7C] font-bold px-8 py-6 text-lg"
                  >
                    Get Free Quote
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl xl:text-4xl font-bold text-[#7DD3E8]">100+</div>
                  <div className="text-sm text-gray-300 mt-1">Projects Done</div>
                </div>
                <div>
                  <div className="text-3xl xl:text-4xl font-bold text-[#7DD3E8]">15+</div>
                  <div className="text-sm text-gray-300 mt-1">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl xl:text-4xl font-bold text-[#7DD3E8]">500+</div>
                  <div className="text-sm text-gray-300 mt-1">Happy Clients</div>
                </div>
              </div>
            </div>
            
            <div className="hidden xl:block relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=1200&q=80" 
                  alt="Professional Roofing Installation" 
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-2xl p-6 max-w-xs">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#7DD3E8] rounded-full p-3">
                      <Shield className="w-8 h-8 text-[#2C5F7C]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#2C5F7C] text-lg">Quality Assured</div>
                      <div className="text-sm text-gray-600">Premium Materials</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold text-[#2C5F7C] mb-4">Why Choose DuroCap?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your trusted partner for premium roofing solutions across Kerala
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Quality Assurance",
                desc: "Premium materials from trusted brands ensuring long-lasting protection for your property"
              },
              {
                icon: Award,
                title: "Expert Team",
                desc: "Professional installation and repair services with certified craftsmen"
              },
              {
                icon: Users,
                title: "Customer First",
                desc: "100+ successful projects with satisfied clients across Kerala"
              },
              {
                icon: Wrench,
                title: "Full Service",
                desc: "From consultation to installation and maintenance, we handle it all"
              }
            ].map((item, idx) => (
              <Card key={idx} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="bg-gradient-to-br from-[#2C5F7C] to-[#1e4a5f] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-[#7DD3E8]" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-[#2C5F7C]">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold text-[#2C5F7C] mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive roofing services tailored to your needs
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5F7C]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" className="bg-[#2C5F7C] hover:bg-[#1e4a5f] text-white font-bold px-8">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold text-[#2C5F7C] mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our selection of high-quality roofing products
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5F7C]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" className="bg-[#7DD3E8] hover:bg-[#6BC2D7] text-[#2C5F7C] font-bold px-8">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold text-[#2C5F7C] mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied customers across Kerala
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <Card key={idx} className="bg-white border-none shadow-lg hover:shadow-xl transition-all">
                <CardContent className="pt-8 pb-6">
                  <Quote className="w-10 h-10 text-[#7DD3E8] mb-4" />
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2C5F7C] to-[#7DD3E8] flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[#2C5F7C]">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">Verified Customer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#2C5F7C] via-[#1e4a5f] to-[#0f2d3d] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#7DD3E8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#7DD3E8] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl xl:text-5xl font-bold mb-6">Need A Free Estimate?</h2>
          <p className="text-lg xl:text-xl mb-10 text-gray-200 leading-relaxed max-w-3xl mx-auto">
            If you want a roofing installation or replacement done or know someone who needs a roof repair and coating, get in touch with us today! Get the Best Roofing Services in Kerala.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-[#7DD3E8] hover:bg-[#6BC2D7] text-[#2C5F7C] font-bold px-10 py-6 text-lg shadow-xl">
                <Mail className="mr-2 w-6 h-6" />
                Get A Free Estimate
              </Button>
            </Link>
            <a href="tel:08593852223">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#2C5F7C] font-bold px-10 py-6 text-lg">
                <Phone className="mr-2 w-6 h-6" />
                Call Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
