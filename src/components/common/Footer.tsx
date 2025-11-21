import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <img 
                src="https://miaoda-conversation-file.s3cdn.medo.dev/user-7fwukq22idq8/conv-7p9lig9vkiyo/20251121/file-7paq17shhn28.png" 
                alt="DuroCap Roofing Solutions" 
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm opacity-90 mb-2 font-medium">Shaping the future</p>
            <p className="text-sm opacity-90">
              A trusted roofing company committed to quality, durability, and innovation in roofing solutions since 2015.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                Home
              </Link>
              <Link to="/about" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                About Us
              </Link>
              <Link to="/projects" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                Project Gallery
              </Link>
              <Link to="/services" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                Services
              </Link>
              <Link to="/contact" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                Contact Us
              </Link>
              <Link to="/admin/login" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                Admin Login
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3 text-sm opacity-90">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Near IOC Gas Plant, Kolayil parippally.p.o, kollam, Kerala 691574</span>
              </div>
              <a href="tel:08593852223" className="flex items-center space-x-2 hover:opacity-100 transition-opacity">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>085938 52223</span>
              </a>
              <a href="mailto:info@durocap.com" className="flex items-center space-x-2 hover:opacity-100 transition-opacity">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@durocap.com</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <div className="space-y-2 text-sm opacity-90">
              <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
              <p>Saturday: Closed</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-light/30 text-center text-sm opacity-90">
          <p>© {currentYear} Durocap Roofing Solution</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
