import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OurApproach = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-white">
        {/* Back Button */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-charity-dark mb-6">
                Our Approach to Tribal Development
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how we create sustainable impact through our comprehensive and community-driven approach.
              </p>
            </div>
          </div>
        </section>

        {/* Approach Sections */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-charity-dark mb-3">Community-Centric Design</h3>
                  <p className="text-gray-600">
                    We work closely with tribal communities to understand their unique needs and co-create solutions that are culturally appropriate and sustainable.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                    <span className="text-green-600 text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-charity-dark mb-3">Holistic Development</h3>
                  <p className="text-gray-600">
                    Our programs address multiple dimensions of development including education, healthcare, livelihood, and cultural preservation.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                    <span className="text-purple-600 text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-charity-dark mb-3">Sustainable Impact</h3>
                  <p className="text-gray-600">
                    We focus on creating long-term, sustainable change by building local capacity and ensuring community ownership of projects.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                    <span className="text-orange-600 text-xl font-bold">4</span>
                  </div>
                  <h3 className="text-xl font-bold text-charity-dark mb-3">Partnership & Collaboration</h3>
                  <p className="text-gray-600">
                    We collaborate with local organizations, government agencies, and other stakeholders to maximize our impact and reach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Join us in our mission to create lasting change for tribal communities across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/donate" 
                className="inline-block bg-charity-dark text-white hover:bg-charity-dark/90 px-8 py-3 text-base font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Donate Now
              </Link>
              <Link 
                to="/contact" 
                className="inline-block border-2 border-charity-dark text-charity-dark hover:bg-charity-dark hover:text-white px-8 py-3 text-base font-semibold rounded-full transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default OurApproach;
