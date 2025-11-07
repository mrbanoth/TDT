
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Play, Users, HeartHandshake, HandCoins, MapPin, Phone, Mail, Clock } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{
            backgroundImage: 'url(https://www.kilroy.net/media/12978/asia-india-volunteering-with-kids-group-of-kids.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="text-white drop-shadow-lg w-full">
            <div className="animate-fade-in max-w-3xl mx-auto sm:mx-0 text-center sm:text-left px-4">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight font-serif text-white">
                Helps People
                <br />
                <span className="text-[#e67e22] font-normal">Life & Their</span>
                <br />
                <span className="text-white font-normal">Formation</span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 max-w-2xl leading-relaxed text-white/90 font-light">
                Join us in transforming lives through education, healthcare, and sustainable development 
programs and services for tribal communities across India.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-start">
                <Link to="/events" className="w-full sm:w-auto block">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-normal font-serif text-base sm:text-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] tracking-wide w-full max-w-[180px]">
                    View Events
                  </Button>
                </Link>
                
                <Link to="/about" className="w-full sm:w-auto block">
                  <Button variant="outline" className="bg-white/5 hover:bg-white/10 hover:text-white text-white border-white/30 hover:border-white/50 px-6 py-3 rounded-lg font-normal font-serif text-base sm:text-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] tracking-wide w-full max-w-[180px]">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content - Action Cards */}
          <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-0">
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-charity-dark leading-tight">Become a Volunteer</h3>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">Join our mission to help tribal communities</p>
                </div>
              </div>
              <div className="flex justify-center">
                <Link to="/all-events" className="w-full flex justify-center">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-normal font-serif text-base sm:text-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] tracking-wide w-full max-w-[180px]">
                    Join Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary/10 rounded-full flex-shrink-0 flex items-center justify-center">
                  <HandCoins className="w-6 h-6 sm:w-7 sm:h-7 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-charity-dark leading-tight">Quick Fundraising</h3>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">Support our programs with donations</p>
                </div>
              </div>
              <div className="flex justify-center">
                <Link to="/donate" className="w-full flex justify-center">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-normal font-serif text-base sm:text-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] tracking-wide w-full max-w-[180px]">
                    Donate Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
