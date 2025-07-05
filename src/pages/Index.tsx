
import { useState, useEffect } from 'react';
import React from 'react';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import ProgramsCarousel from '@/components/ProgramsCarousel';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { Heart, Users, Home } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API calls or data loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Show loading spinner only when loading data
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const programs = [
    {
      title: "Children's Programmes",
      description: "Educational support (tutoring center), nutrition programs, and skill development for tribal children",
      icon: <Users className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary" />,
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3",
    },
    {
      title: "Health Camps",
      description: "Free healthcare services, health checkups, and medical assistance for tribal communities",
      icon: <Heart className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary" />,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3",
    },
    {
      title: "Women's Empowerment",
      description: "Skill training, self-help groups, and economic empowerment programs for tribal women",
      icon: <Home className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-secondary" />,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3",
    },
    {
      title: "Community Development",
      description: "Building stronger communities together through infrastructure, education, and social programs",
      icon: <Home className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-secondary" />,
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3",
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen no-horizontal-scroll">
      <Navbar />
      <HeroSection />
      
      {/* About Section */}
      <section className="padding-responsive bg-white no-horizontal-scroll">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            {/* Mobile: Heading -> Image -> Description */}
            <div className="lg:hidden space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark text-center">
                About Our Mission
              </h2>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3" 
                  alt="Tribal community development" 
                  className="rounded-2xl shadow-2xl w-full h-48 sm:h-64 object-cover"
                />
              </div>
              <p className="text-xl text-gray-600 text-center">
                Tribal Development Trust is dedicated to improving the lives of tribal communities 
                through comprehensive development programs that address education, healthcare, and social welfare.
              </p>
            </div>

            {/* Desktop: Left side image */}
            <div className="hidden lg:block order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3" 
                alt="Tribal community development" 
                className="rounded-2xl shadow-2xl w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
              />
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-6 order-1 lg:order-2">
              {/* Desktop: Heading and description */}
              <div className="hidden lg:block">
                <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
                  About Our Mission
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Tribal Development Trust is dedicated to improving the lives of tribal communities 
                  through comprehensive development programs that address education, healthcare, and social welfare.
                </p>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
                Our organization works tirelessly to bridge the gap between tribal communities and 
                modern development while preserving their rich cultural heritage. We believe in 
                sustainable development that empowers communities from within.
              </p>
              <div className="space-y-3 sm:space-y-4 md:space-y-5">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Community-centered approach</span>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Sustainable development programs</span>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Cultural preservation programs</span>
                </div>
              </div>
              <div className="mt-4 sm:mt-6 md:mt-8 sm:text-left">
                <div className="text-center sm:text-left">
                  <NavLink to="/about" className="inline-block w-full sm:w-auto">
                    <Button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full font-normal font-serif text-sm sm:text-base w-full sm:w-auto max-w-[180px] transition-all duration-200 hover:shadow-lg hover:scale-[1.02] tracking-normal">
                      Our Story
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="padding-responsive bg-charity-light no-horizontal-scroll">
        <div className="container-responsive">
          <div className="w-full">
            {/* Mobile: Heading, Description, then Carousel */}
            <div className="lg:hidden space-y-6 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark text-center">
                Our Key Programs
              </h2>
              <p className="text-xl text-gray-600 text-center">
                Comprehensive development programs designed to address the core needs 
                of tribal communities and create lasting positive impact.
              </p>
              <div className="flex justify-center">
                <ProgramsCarousel />
              </div>
            </div>

            {/* Desktop: Normal layout */}
            <div className="hidden lg:block text-center mb-8 sm:mb-12 md:mb-16 w-full">
              <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
                Our Key Programs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive development programs designed to address the core needs 
                of tribal communities and create lasting positive impact.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start w-full">
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 md:gap-6">
                {programs.map((program, index) => {
                  const IconComponent = program.icon.type;
                  const iconProps = { ...program.icon.props };
                  
                  return (
                    <div 
                      key={index} 
                      className="flex flex-col sm:flex-row items-start p-3 sm:p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      <div className="flex-shrink-0 mb-2 sm:mb-0 sm:mr-3 md:mr-4 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full p-2">
                        <IconComponent 
                          {...iconProps}
                          className={`w-5 h-5 sm:w-6 sm:h-6 text-primary ${iconProps.className || ''}`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-charity-dark mb-1 sm:mb-2">
                          {program.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {program.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 sm:mt-6 md:mt-8 sm:text-left">
                <div className="text-center sm:text-left">
                  <NavLink to="/programmes" className="inline-block w-full sm:w-auto">
                    <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-normal font-serif text-base sm:text-lg w-full sm:w-auto max-w-[180px] transition-all duration-200 hover:shadow-lg hover:scale-[1.02] tracking-wide">
                      All Programs
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <ProgramsCarousel />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action */}
      <section className="padding-responsive bg-white no-horizontal-scroll">
        <div className="container-responsive text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
            Make a Difference Today
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Your contribution can transform lives and create lasting impact in tribal communities. 
            Join us in our mission to empower and uplift.
          </p>
          <NavLink to="/donate">
            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-normal font-serif text-base sm:text-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] tracking-wide w-full max-w-[180px]">
              Start Donating
            </Button>
          </NavLink>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
