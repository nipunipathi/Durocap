import { CheckCircle, Award, Users, Target } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import SEO from "@/components/common/SEO";

export default function About() {
  return (
    <>
      <SEO 
        title="About Us | Durocap Roofing Solutions Kerala"
        description="Learn about Durocap Roofing Solutions - trusted roofing company in Kerala since 2015. Quality, durability, and innovation in roofing for commercial and residential projects."
        keywords="About Durocap, Roofing company Kerala, Roofing contractor TVM, Professional roofing services"
        ogUrl="https://durocap.com/about"
        canonical="https://durocap.com/about"
      />
      <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl xl:text-5xl font-bold mb-4">About DuroCap Roofing Solutions</h1>
          <p className="text-lg opacity-90">
            Shaping the future of roofing across Kerala since 2015
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
              <p className="text-muted-foreground mb-4">
                DuroCap Roofing Solutions is a trusted roofing company committed to quality, durability, and innovation in roofing solutions since 2015. We specialize in providing comprehensive roofing services for both commercial and residential projects across Kerala.
              </p>
              <p className="text-muted-foreground mb-4">
                We are DuroCap — offering trusted, durable, and affordable roofing solutions that protect every structure with lasting strength and trust. Our motto is simple: Built Strong. Built Smart. Built by DuroCap.
              </p>
              <p className="text-muted-foreground mb-6">
                From custom 3D roof designs to high-quality material supply and expert installations, we are your one-stop solution for all roofing needs. With over 100 successful projects completed, we continue to raise standards in roofing, one roof at a time.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">Protecting Every Structure with Lasting Strength and Trust</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">Your Trusted Partner for Durable and Dependable Roofing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">Raising Standards in Roofing, One Roof at a Time</p>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center overflow-hidden">
              <img
                src="https://miaoda-site-img.s3cdn.medo.dev/images/81741052-c8ef-4098-80b4-25e5cd8fbc7a.jpg"
                alt="DuroCap Roofing Solutions"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose DuroCap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Since 2015",
                desc: "Nearly a decade of excellence in roofing solutions across Kerala",
              },
              {
                icon: CheckCircle,
                title: "100+ Projects",
                desc: "Successfully completed projects for satisfied clients",
              },
              {
                icon: Users,
                title: "Expert Team",
                desc: "Skilled professionals with architectural consultation services",
              },
              {
                icon: Target,
                title: "Quality Focus",
                desc: "Premium materials from trusted brands with top-notch service",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-4">
            To provide our customers across Kerala with the highest quality roofing products and services, delivered with integrity, professionalism, and a commitment to excellence.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            We strive to build lasting relationships with our clients by exceeding expectations and ensuring complete satisfaction on every project — from custom 3D designs to final installation.
          </p>
          <p className="text-lg font-semibold text-primary">
            Durocap Roofing Solutions - Strength Above All
          </p>
        </div>
      </section>
    </div>
    </>
  );
}
