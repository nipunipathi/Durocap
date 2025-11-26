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
      <section className="relative min-h-[800px] xl:min-h-[900px] flex items-center overflow-hidden bg-gradient-to-br from-[#2C5F7C] via-[#1e4a5f] to-[#0f2d3d]">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#7DD3E8] rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#7DD3E8] rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#7DD3E8] rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLS45LTItMi0yaC00Yy0xLjEgMC0yIC45LTIgMnY0YzAgMS4xLjkgMiAyIDJoNGMxLjEgMCAyLS45IDItMnYtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-10">
              <div className="inline-block animate-fade-in">
                <img 
                  src="https://miaoda-conversation-file.s3cdn.medo.dev/user-7fwukq22idq8/conv-7p9lig9vkiyo/20251126/file-7tmweuqklfy9.png" 
                  alt="DuroCap Roofing Solutions" 
                  className="h-24 xl:h-32 w-auto mb-8 drop-shadow-2xl"
                />
              </div>
              
              <h1 className="text-5xl xl:text-7xl font-black leading-[1.1] tracking-tight animate-fade-in">
                Trusted, Durable &<br/>
                <span className="text-[#7DD3E8] drop-shadow-[0_0_30px_rgba(125,211,232,0.5)]">Affordable</span><br/>
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Roofing Solutions</span>
              </h1>
              
              <p className="text-xl xl:text-2xl text-gray-100 leading-relaxed font-medium animate-fade-in">
                For commercial and residential projects across Kerala.<br/>
                <span className="text-[#7DD3E8]">Protecting every structure</span> with lasting strength and trust.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-6 animate-fade-in">
                <Link to="/products" className="group">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-[#7DD3E8] hover:bg-[#6BC2D7] text-[#2C5F7C] font-black px-10 py-8 text-xl shadow-2xl hover:shadow-[0_20px_60px_rgba(125,211,232,0.4)] transition-all transform hover:scale-105 hover:-translate-y-1"
                  >
                    Explore Products
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact" className="group">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto border-4 border-white text-white hover:bg-white hover:text-[#2C5F7C] font-black px-10 py-8 text-xl backdrop-blur-sm bg-white/10 hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1"
                  >
                    Get Free Quote
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-3 gap-8 pt-12 border-t-2 border-white/30 animate-fade-in">
                <div className="text-center transform hover:scale-110 transition-transform">
                  <div className="text-5xl xl:text-6xl font-black text-[#7DD3E8] drop-shadow-lg mb-2">100+</div>
                  <div className="text-sm xl:text-base text-gray-200 font-semibold">Projects Done</div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform">
                  <div className="text-5xl xl:text-6xl font-black text-[#7DD3E8] drop-shadow-lg mb-2">15+</div>
                  <div className="text-sm xl:text-base text-gray-200 font-semibold">Years Experience</div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform">
                  <div className="text-5xl xl:text-6xl font-black text-[#7DD3E8] drop-shadow-lg mb-2">500+</div>
                  <div className="text-sm xl:text-base text-gray-200 font-semibold">Happy Clients</div>
                </div>
              </div>
            </div>
            
            <div className="hidden xl:block relative animate-fade-in">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#7DD3E8] to-[#2C5F7C] rounded-3xl blur-2xl opacity-30"></div>
                <img 
                  src="https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=1200&q=80" 
                  alt="Professional Roofing Installation" 
                  className="relative rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.5)] w-full h-auto border-4 border-white/20"
                />
                <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-8 max-w-sm transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-5">
                    <div className="bg-gradient-to-br from-[#7DD3E8] to-[#2C5F7C] rounded-2xl p-4 shadow-lg">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <div className="font-black text-[#2C5F7C] text-2xl">Quality Assured</div>
                      <div className="text-base text-gray-600 font-semibold">Premium Materials</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7DD3E8] rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2C5F7C] rounded-full blur-3xl opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl xl:text-6xl font-black text-[#2C5F7C] mb-6 tracking-tight">
              Why Choose <span className="text-[#7DD3E8]">DuroCap</span>?
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#2C5F7C] to-[#7DD3E8] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Your trusted partner for premium roofing solutions across Kerala
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
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
              <Card key={idx} className="border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-3 duration-300 group bg-gradient-to-br from-white to-gray-50">
                <CardContent className="pt-10 pb-8 text-center">
                  <div className="bg-gradient-to-br from-[#2C5F7C] to-[#1e4a5f] rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform group-hover:shadow-2xl">
                    <item.icon className="w-10 h-10 text-[#7DD3E8]" />
                  </div>
                  <h3 className="font-black text-2xl mb-4 text-[#2C5F7C]">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyQzVGN0MiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLS45LTItMi0yaC00Yy0xLjEgMC0yIC45LTIgMnY0YzAgMS4xLjkgMiAyIDJoNGMxLjEgMCAyLS45IDItMnYtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl xl:text-6xl font-black text-[#2C5F7C] mb-6 tracking-tight">
              Our <span className="text-[#7DD3E8]">Services</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#2C5F7C] to-[#7DD3E8] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Comprehensive roofing services tailored to your needs
            </p>
          </div>
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#2C5F7C]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
          <div className="text-center mt-16">
            <Link to="/services" className="group inline-block">
              <Button size="lg" className="bg-[#2C5F7C] hover:bg-[#1e4a5f] text-white font-black px-12 py-7 text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                View All Services
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#7DD3E8] rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2C5F7C] rounded-full blur-3xl opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl xl:text-6xl font-black text-[#2C5F7C] mb-6 tracking-tight">
              Featured <span className="text-[#7DD3E8]">Products</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#2C5F7C] to-[#7DD3E8] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Browse our selection of high-quality roofing products
            </p>
          </div>
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#2C5F7C]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
          <div className="text-center mt-16">
            <Link to="/products" className="group inline-block">
              <Button size="lg" className="bg-[#7DD3E8] hover:bg-[#6BC2D7] text-[#2C5F7C] font-black px-12 py-7 text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                View All Products
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyQzVGN0MiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLS45LTItMi0yaC00Yy0xLjEgMC0yIC45LTIgMnY0YzAgMS4xLjkgMiAyIDJoNGMxLjEgMCAyLS45IDItMnYtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl xl:text-6xl font-black text-[#2C5F7C] mb-6 tracking-tight">
              What Our <span className="text-[#7DD3E8]">Clients Say</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#2C5F7C] to-[#7DD3E8] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Hear from our satisfied customers across Kerala
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
              <Card key={idx} className="bg-white border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 group">
                <CardContent className="pt-10 pb-8">
                  <Quote className="w-12 h-12 text-[#7DD3E8] mb-6 group-hover:scale-110 transition-transform" />
                  <p className="text-gray-700 mb-8 italic leading-relaxed text-base">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2C5F7C] to-[#7DD3E8] flex items-center justify-center text-white font-black text-xl shadow-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-[#2C5F7C] text-lg">{testimonial.name}</p>
                      <p className="text-sm text-gray-500 font-semibold">Verified Customer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#2C5F7C] via-[#1e4a5f] to-[#0f2d3d] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-96 h-96 bg-[#7DD3E8] rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#7DD3E8] rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLS45LTItMi0yaC00Yy0xLjEgMC0yIC45LTIgMnY0YzAgMS4xLjkgMiAyIDJoNGMxLjEgMCAyLS45IDItMnYtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl xl:text-6xl font-black mb-8 tracking-tight">
            Need A <span className="text-[#7DD3E8]">Free Estimate</span>?
          </h2>
          <div className="w-32 h-2 bg-[#7DD3E8] mx-auto rounded-full mb-10"></div>
          <p className="text-xl xl:text-2xl mb-14 text-gray-100 leading-relaxed max-w-3xl mx-auto font-medium">
            If you want a roofing installation or replacement done or know someone who needs a roof repair and coating, get in touch with us today! Get the Best Roofing Services in Kerala.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link to="/contact" className="group">
              <Button size="lg" className="bg-[#7DD3E8] hover:bg-[#6BC2D7] text-[#2C5F7C] font-black px-12 py-8 text-xl shadow-2xl hover:shadow-[0_20px_60px_rgba(125,211,232,0.4)] transform hover:scale-105 transition-all">
                <Mail className="mr-3 w-7 h-7" />
                Get A Free Estimate
              </Button>
            </Link>
            <a href="tel:08593852223" className="group">
              <Button size="lg" variant="outline" className="border-4 border-white text-white hover:bg-white hover:text-[#2C5F7C] font-black px-12 py-8 text-xl backdrop-blur-sm bg-white/10 hover:shadow-2xl transform hover:scale-105 transition-all">
                <Phone className="mr-3 w-7 h-7" />
                Call Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
