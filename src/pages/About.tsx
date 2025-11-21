import { CheckCircle, Award, Users, Clock } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl xl:text-5xl font-bold mb-4">About Roofing Solutions Hub</h1>
          <p className="text-lg opacity-90">
            Your trusted partner for professional roofing solutions
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Roofing Solutions Hub has been serving the Texas community for over 15 years, providing top-quality roofing products and services to both residential and commercial clients.
              </p>
              <p className="text-muted-foreground mb-4">
                We pride ourselves on offering durable, affordable, and trusted roofing solutions that stand the test of time. Our team of experienced professionals is dedicated to ensuring customer satisfaction on every project.
              </p>
              <p className="text-muted-foreground">
                From premium roofing materials to expert installation and repair services, we are your one-stop shop for all roofing needs.
              </p>
            </div>
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
              <img
                src="placeholder-about-image.jpg"
                alt="About Us"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "15+ Years Experience",
                desc: "Proven track record of excellence in the roofing industry",
              },
              {
                icon: CheckCircle,
                title: "Quality Guaranteed",
                desc: "Premium materials and workmanship on every project",
              },
              {
                icon: Users,
                title: "Expert Team",
                desc: "Certified professionals dedicated to your satisfaction",
              },
              {
                icon: Clock,
                title: "24/7 Emergency Service",
                desc: "Available when you need us most",
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
            To provide our customers with the highest quality roofing products and services, delivered with integrity, professionalism, and a commitment to excellence.
          </p>
          <p className="text-lg text-muted-foreground">
            We strive to build lasting relationships with our clients by exceeding expectations and ensuring complete satisfaction on every project.
          </p>
        </div>
      </section>
    </div>
  );
}
