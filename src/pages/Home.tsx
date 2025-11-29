import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Phone, Mail, Quote, Shield, Award, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductCard } from "@/components/cards/ProductCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { api } from "@/db/api";
import type { Product, Service } from "@/types";
import { cartUtils } from "@/lib/cart";
import { toast } from "sonner";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, servicesData, projectsData] = await Promise.all([
          api.products.getAll(true),
          api.services.getAll(true),
          api.projects.getAll(true),
        ]);
        setFeaturedProducts(productsData.slice(0, 4));
        setServices(servicesData.slice(0, 6));
        setFeaturedProjects(projectsData);
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
      <section className="relative min-h-screen xl:h-screen flex items-stretch overflow-hidden">
        <div className="w-full xl:grid xl:grid-cols-2 xl:gap-0">
          <div className="flex items-center justify-center px-8 xl:px-28 py-20 xl:py-0 min-h-[600px] xl:min-h-screen border-solid bg-cover bg-center bg-no-repeat border-[0px] border-[rgb(218,226,231)] bg-[#ffffff] bg-none">
            <div className="max-w-2xl w-full space-y-10 animate-fade-in">
              <h1 className="text-4xl xl:text-6xl leading-tight font-serif text-[#0c0c0dff]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>We are DuroCap — offering trusted, durable, and affordable roofing solutions for commercial and residential projects across Kerala.</h1>
              
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <Link to="/about">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-[#5ED4C4] hover:bg-[#4EC4B4] text-white font-bold px-10 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    ABOUT US
                  </Button>
                </Link>
                <Link to="/services">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-[#174B63] font-bold px-10 py-6 text-lg rounded-lg bg-transparent transition-all transform hover:scale-105 text-[#0c0c0dff]"
                  >OUR SERVICES</Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="hidden xl:flex from-[#CBE5F1] to-white relative items-start justify-center pt-28 min-h-screen overflow-hidden bg-inherit bg-cover bg-center bg-no-repeat bg-[url(https://miaoda-edit-image.s3cdn.medo.dev/7p9lig9vkiyp/IMG-7w0wspha1eyo.png)]">
            <div className="w-full max-w-xl px-12 mb-auto">
              <img 
                src="https://miaoda-conversation-file.s3cdn.medo.dev/user-7fwukq22idq8/conv-7p9lig9vkiyo/20251126/file-7tmweuqklfy9.png" 
                alt="DuroCap Roofing Solutions" 
                className="w-full h-auto drop-shadow-2xl animate-fade-in"
              />
            </div>
            
            <div className="absolute bottom-0 right-0 w-[95%] animate-fade-in" style={{ animationDelay: '0.3s' }}>

            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-12 text-center">
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-5xl xl:text-6xl font-black text-[#2AA7C6] mb-3">100+</div>
              <div className="text-base text-gray-700 font-semibold">Successful Projects</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-5xl xl:text-6xl font-black text-[#2AA7C6] mb-3">15+</div>
              <div className="text-base text-gray-700 font-semibold">Years Experience</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-5xl xl:text-6xl font-black text-[#2AA7C6] mb-3">500+</div>
              <div className="text-base text-gray-700 font-semibold">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://miaoda-site-img.s3cdn.medo.dev/images/2640ebd5-f26b-42a2-b319-8f6cd7116f71.jpg" 
            alt="Modern architecture background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 xl:mb-20">
            <h2 className="text-3xl xl:text-6xl font-black text-[#2C5F7C] mb-4 xl:mb-6 tracking-tight">
              Our <span className="text-[#2AA7C6]">Completed Projects</span>
            </h2>
            <div className="w-24 xl:w-32 h-1.5 xl:h-2 bg-gradient-to-r from-[#2C5F7C] to-[#2AA7C6] mx-auto rounded-full mb-4 xl:mb-6"></div>
            <p className="text-base xl:text-xl text-gray-600 max-w-3xl mx-auto font-medium px-4">
              Explore our portfolio of successful roofing installations across Kerala
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-gray-600 text-lg">Loading projects...</div>
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No featured projects available yet.</p>
            </div>
          ) : (
            <Carousel 
              opts={{
                align: "start",
                loop: true,
              }}
              className="max-w-6xl mx-auto"
            >
              <CarouselContent>
                {featuredProjects.map((project) => (
                  <CarouselItem key={project.id}>
                    <div className="px-2 xl:px-4">
                      <div className="relative rounded-2xl xl:rounded-3xl overflow-hidden shadow-2xl group">
                        <img 
                          src={project.image_url || 'https://via.placeholder.com/1200x500'} 
                          alt={project.title} 
                          className="w-full h-[280px] xl:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 xl:p-10 text-white">
                          <h3 className="text-xl xl:text-3xl font-black mb-2 xl:mb-3 line-clamp-2">
                            {project.title}
                          </h3>
                          <p className="text-sm xl:text-lg text-gray-200 mb-3 xl:mb-4 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 xl:gap-4">
                            {project.category && (
                              <span className="bg-[#2AA7C6] px-3 xl:px-4 py-1 xl:py-2 rounded-full text-xs xl:text-sm font-bold">
                                {project.category}
                              </span>
                            )}
                            {project.year && (
                              <span className="bg-white/20 backdrop-blur-sm px-3 xl:px-4 py-1 xl:py-2 rounded-full text-xs xl:text-sm font-bold">
                                {project.year}
                              </span>
                            )}
                            {project.location && (
                              <span className="bg-white/20 backdrop-blur-sm px-3 xl:px-4 py-1 xl:py-2 rounded-full text-xs xl:text-sm font-bold">
                                {project.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 xl:left-4 bg-white/90 hover:bg-white border-2 border-[#2AA7C6]" />
              <CarouselNext className="right-2 xl:right-4 bg-white/90 hover:bg-white border-2 border-[#2AA7C6]" />
            </Carousel>
          )}

          <div className="text-center mt-10 xl:mt-16">
            <Link to="/projects">
              <Button 
                size="lg" 
                className="bg-[#2AA7C6] hover:bg-[#2597B3] text-white font-black px-8 xl:px-12 py-5 xl:py-7 text-base xl:text-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 group"
              >
                View All Projects
                <ArrowRight className="ml-2 xl:ml-3 w-5 xl:w-6 h-5 xl:h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://miaoda-site-img.s3cdn.medo.dev/images/0c78722e-4900-4bda-974a-f5910dc8d5fe.jpg" 
            alt="Roofing pattern background"
            className="w-full h-full object-cover"
          />
        </div>
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
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://miaoda-site-img.s3cdn.medo.dev/images/b7f4130b-2883-41b8-9410-cf895054cd18.jpg" 
            alt="Modern roofing construction background"
            className="w-full h-full object-cover"
          />
        </div>
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
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://miaoda-site-img.s3cdn.medo.dev/images/c76df02a-6717-4c12-8c3e-2bd57a2cd760.jpg" 
            alt="Roofing materials background"
            className="w-full h-full object-cover"
          />
        </div>
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
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://miaoda-site-img.s3cdn.medo.dev/images/2640ebd5-f26b-42a2-b319-8f6cd7116f71.jpg" 
            alt="Modern architecture roof design background"
            className="w-full h-full object-cover"
          />
        </div>
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
