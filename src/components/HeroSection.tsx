
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HeartHandshake } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center md:items-start justify-center overflow-hidden px-4 pt-12 md:pt-16 pb-16 sm:py-20">
      {/* Mobile Background (sm only) */}
      <div className="md:hidden absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/hero-bg-mobile.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/80 to-white/80"></div>
      </div>
      
      {/* Desktop/Tablet Background (md and up) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden hidden md:block">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 mt-0 md:mt-6 lg:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-10 xl:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight">
          <span className="block">Helping People</span>
          <span className="text-orange-600">Life & Their</span>
          <span className="block text-gray-800">Formation</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-lg text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto md:mx-0 leading-relaxed">
          Join us in transforming lives through education, healthcare, and sustainable development 
          programs for tribal communities across India.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-3 lg:gap-4 justify-center md:justify-start">
          <Link to="/donate" className="w-full sm:w-auto">
            <Button 
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 md:px-6 lg:px-8 py-3 md:py-4 lg:py-6 text-sm md:text-base lg:text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              size="lg"
            >
              Donate Now
            </Button>
          </Link>
          
          <Link to="/about" className="w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-5 md:px-6 lg:px-8 py-3 md:py-4 lg:py-6 text-sm md:text-base lg:text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              Learn More
            </Button>
          </Link>
          
          {/* Mobile hero image */}
          <div className="md:hidden w-full mt-8">
            <div className="relative w-full h-72 overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10"></div>
              <img 
                src="/Homepage-images/moblie-herosectionImage.jpeg.jpeg" 
                alt="Tribal community support and development"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <h3 className="text-2xl font-bold mb-2">Transforming Lives</h3>
                <p className="text-sm opacity-90">Join our mission to create lasting impact in tribal communities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Container - Hidden on mobile, visible on md and up */}
      <div className="hidden md:block relative w-full max-w-xs mx-auto lg:max-w-2xl lg:ml-auto mt-4 md:mt-8 lg:mt-4">
        {/* Larger Image - Main Fundraising Focus */}
        <div className="relative z-10 w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transform rotate-2 scale-90 md:scale-100">
          <img 
            src="/Homepage-images/herosection-MainBigImage.jpeg" 
            alt="Tribal community development and support"
            className="w-full h-full object-cover"
          />
          {/* Decorative element */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-orange-500 rounded-full mix-blend-multiply opacity-20"></div>
        </div>
        
        {/* Smaller Overlapping Image */}
        <div className="absolute -bottom-8 -left-8 z-20 w-2/3 sm:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-2xl transform -rotate-6 border-4 border-white">
          <img 
            src="/1stsection-2ndimage.jpeg" 
            alt="Tribal community development"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Decorative shape */}
        <div className="absolute -top-6 -right-6 z-0 w-32 h-32 bg-orange-100 rounded-full"></div>
      </div>
    </div>
  </div>
</section>
  );
};

export default HeroSection;

// Add custom animation for the blob effect
const style = document.createElement('style');
style.textContent = `
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;
document.head.appendChild(style);
