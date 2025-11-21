import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm opacity-90">
              Roofing Solutions Hub provides professional roofing products and services for residential and commercial properties. Quality and customer satisfaction are our top priorities.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/products" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                Products
              </Link>
              <Link to="/services" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                Services
              </Link>
              <Link to="/projects" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                Projects
              </Link>
              <Link to="/about" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                About Us
              </Link>
              <Link to="/contact" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3 text-sm opacity-90">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Roofing Street, Austin, TX 78701</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(512) 555-0123</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@roofingsolutions.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <div className="space-y-2 text-sm opacity-90">
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
              <p className="mt-4 text-xs">Emergency services available 24/7</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-light/30 text-center text-sm opacity-90">
          <p>2025 Roofing Solutions Hub</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
