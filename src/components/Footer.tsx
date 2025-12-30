
import { Heart, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
              src="/tdtlogo.jpg" 
              alt="Tribal Development Trust Logo"
              className="h-10 w-auto object-contain"
            />
              <h3 className="text-xl font-bold">
                <span>Tribal</span> Development Trust
              </h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Empowering tribal communities through comprehensive development programs, 
              healthcare programs, and social welfare activities across India.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Registration:</strong> NGO Tribal Development Trust</p>
              <p><strong>Location:</strong> India</p>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-4 flex space-x-4">
              <a 
                href="https://www.facebook.com/share/17SuuUhSnh/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/tribal-development-trust-34a430340" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/get-involved" className="hover:text-primary transition-colors">Get Involved</a></li>
              <li><a href="/donate" className="hover:text-secondary transition-colors">Donate</a></li>
            </ul>
          </div>

          {/* Our Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Programs</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/programs/children" className="hover:text-primary transition-colors">
                  Children's Programmes
                </a>
              </li>
              <li>
                <a href="/programs/medical" className="hover:text-primary transition-colors">
                  Health Camps
                </a>
              </li>
              <li>
                <a href="/programs/women" className="hover:text-primary transition-colors">
                  Women's Empowerment
                </a>
              </li>
              <li>
                <a href="/programs/helping-poor" className="hover:text-primary transition-colors">
                  Helping the Poor
                </a>
              </li>
              <li>
                <a href="/programs/counseling" className="hover:text-primary transition-colors">
                  Family Counseling
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-current" /> for tribal development
          </p>
          <p className="text-gray-400 text-sm mt-2">
            © 2024 Tribal Development Trust. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
