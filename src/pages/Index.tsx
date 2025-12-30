import { useState, useEffect } from "react";
import React from "react";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import ProgramsCarousel from "@/components/ProgramsCarousel";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Heart, Users, Home } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API calls or data loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error loading data:", error);
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
      description:
        "Educational support (tutoring center), nutrition programs, and skill development for tribal children",
      icon: (
        <Users className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary" />
      ),
      image:
        "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3",
    },
    {
      title: "Health Camps",
      description:
        "Free healthcare services, health checkups, and medical assistance for tribal communities",
      icon: (
        <Heart className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary" />
      ),
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3",
    },
    {
      title: "Women's Empowerment",
      description:
        "Skill training, self-help groups, and economic empowerment programs for tribal women",
      icon: (
        <Home className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-secondary" />
      ),
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3",
    },
    {
      title: "Community Development",
      description:
        "Building stronger communities together through infrastructure, education, and social programs",
      icon: (
        <Home className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-secondary" />
      ),
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3",
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
<section className="py-16 md:py-24 bg-white relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
    <div className="absolute top-1/4 -right-40 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
    <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
  </div>

  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="flex flex-col lg:flex-row gap-12 items-center">
      {/* Content - Appears first on mobile, left on desktop */}
      <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charity-dark mb-4 sm:mb-6">
            About Our <span className="text-[rgb(234,88,12)]">Mission</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Tribal Development Trust is dedicated to improving the lives of tribal communities 
            through comprehensive development programs that address education, healthcare, and social welfare.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Our organization works tirelessly to bridge the gap between tribal communities and 
            modern development while preserving their rich cultural heritage. We believe in 
            sustainable development that empowers communities from within.
          </p>
        </div>

        {/* Key Points */}
        <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
          {[
            "Community-centered approach",
            "Sustainable development programs",
            "Cultural preservation programs"
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 text-lg text-left">{item}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 flex justify-center lg:justify-start">
          <NavLink 
            to="/about" 
            className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Our Story
          </NavLink>
        </div>
      </div>

      {/* Image - Appears second on mobile, right on desktop */}
      <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg">
          <img
            src="/Homepage-images/srinivas-corona-time-image.jpeg"
            alt="Tribal community development"
            className="w-full h-full object-cover"
          />
          {/* Decorative element */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-500 rounded-full mix-blend-multiply opacity-20"></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Programs Section */}
<section className="py-16 md:py-24 bg-gray-50">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-16 sm:mb-20">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charity-dark mb-4 sm:mb-6">
        Our <span className="text-[rgb(234,88,12)]">Key Programs</span>
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
        Comprehensive development programs designed to address the core needs of tribal communities and create lasting positive impact.
      </p>
    </div>

    {/* Programs Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {[
        {
          title: "Children's Programmes",
          description: "Educational support, nutrition programs, and skill development for tribal children",
          icon: <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                 </svg>,
          color: "bg-blue-100 text-blue-600"
        },
        {
          title: "Health Camps",
          description: "Free healthcare services and medical assistance for tribal communities",
          icon: <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                 </svg>,
          color: "bg-green-100 text-green-600"
        },
        {
          title: "Women's Empowerment",
          description: "Skill training and economic empowerment programs for tribal women",
          icon: <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                 </svg>,
          color: "bg-purple-100 text-purple-600"
        },
        {
          title: "Community Development",
          description: "Infrastructure, education, and social programs for stronger communities",
          icon: <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                 </svg>,
          color: "bg-amber-100 text-amber-600"
        }
      ].map((program, index) => (
        <div 
          key={index}
          className="group bg-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full"
        >
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${program.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
            {program.icon}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors">
            {program.title}
          </h3>
          <p className="text-sm sm:text-sm text-gray-600 leading-relaxed flex-grow">
            {program.description}
          </p>
        </div>
      ))}
    </div>

    {/* View All Button */}
    <div className="text-center mt-10 sm:mt-12">
      <NavLink
        to="/programs/gallery"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
      >
        View All Programs
        <svg 
          className="ml-2 -mr-1 w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M14 5l7 7m0 0l-7 7m7-7H3" 
          />
        </svg>
      </NavLink>
    </div>
  </div>
</section>

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charity-dark mb-4 sm:mb-6">
              Make a <span className="text-[rgb(234,88,12)]">Difference Today</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Your contribution can transform lives and create lasting impact in tribal communities. 
              Join us in our mission to empower and uplift.
            </p>
            <NavLink 
              to="/donate"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
            >
              Start Donating
              <svg 
                className="ml-2 -mr-1 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
