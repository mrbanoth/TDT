
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Leaf, HeartHandshake, ShieldCheck } from 'lucide-react';

const About = () => {
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    years: 0,
    programs: 0
  });

  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000; // 2 seconds
      const stepTime = 50; // 50ms intervals
      const steps = duration / stepTime;
      
      const targets = {
        students: 14000,
        years: 9, // Since 2015
        programs: 6
      };

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setAnimatedStats({
          students: Math.floor(targets.students * progress),
          years: Math.floor(targets.years * progress),
          programs: Math.floor(targets.programs * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedStats(targets);
        }
      }, stepTime);
    };

    animateStats();
  }, []);

  // Continuous scroll animation
  useEffect(() => {
    const scrollContainer = document.querySelector('.stats-scroll-container');
    if (!scrollContainer) return;

    const scrollHeight = scrollContainer.scrollHeight / 2; // Since we duplicate the items
    let scrollPosition = 0;
    const scrollSpeed = 30; // Pixels per second
    let lastTimestamp = 0;

    const scroll = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      scrollPosition += (scrollSpeed * delta) / 1000; // Convert to seconds
      
      // Reset scroll position when we've scrolled one full cycle
      if (scrollPosition >= scrollHeight) {
        scrollPosition = 0;
      }

      if (scrollContainer) {
        scrollContainer.scrollTop = scrollPosition;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    let animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const trustees = [
    {
      name: "BANOTH SRINIVAS NAIK",
      role: "Founder & President",
      description: "A visionary social worker and passionate advocate for tribal rights, Srinivas Naik has dedicated his life to uplifting tribal communities. His hands-on approach and deep understanding of tribal challenges have been instrumental in shaping the Trust's impactful initiatives.",
      image: "/aboutuspage/FOUNDER.jpg",
      detailImage: "/aboutuspage/FOUNDER.jpg"
    },
    {
      name: "BANOTH LALITHAMMA",
      role: "Trustee & Women's Welfare Head",
      description: "Leading our women's empowerment initiatives, Lalithamma works tirelessly to create opportunities for tribal women through skill development and education programs.",
      image: "/aboutuspage/TRUSTEE.jpg",
      detailImage: "/aboutuspage/TRUSTEE.jpg"
    },
    {
      name: "R. SURESH NAIK",
      role: "Trustee & Program Director",
      description: "With expertise in community development, Suresh oversees the implementation of our various programs, ensuring they effectively address the needs of tribal communities.",
      image: "/aboutuspage/TRUST-MEMBER.jpg",
      detailImage: "/aboutuspage/TRUST-MEMBER.jpg"
    },
  ];

  const values = [
    {
      title: "Community First",
      description: "We prioritize the needs and voices of tribal communities in all our programs",
      icon: <Users className="w-10 h-10 text-primary" />,
      color: "primary"
    },
    {
      title: "Cultural Respect",
      description: "Preserving and honoring tribal traditions while promoting development",
      icon: <Leaf className="w-10 h-10 text-secondary" />,
      color: "secondary"
    },
    {
      title: "Sustainable Impact",
      description: "Creating long-term solutions that empower communities to thrive independently",
      icon: <HeartHandshake className="w-8 h-8 text-[rgb(234,88,12)]" />,
      color: "accent"
    },
    {
      title: "Transparency",
      description: "Maintaining open communication and accountability in all our operations",
      icon: <ShieldCheck className="w-8 h-8 text-[rgb(234,88,12)]" />,
      color: "accent"
    },
  ];

  const stats = [
    { 
      number: animatedStats.students.toLocaleString(), 
      label: "students", 
      description: "children supported",
      image: "/Aboutpage-Images/Students-Images.jpeg"
    },
    { 
      number: `Since 2015`, 
      label: "founded", 
      description: `${animatedStats.years} years of service`,
      image: "/Aboutpage-Images/FoundedImage.jpeg"
    },
    { 
      number: `${animatedStats.programs} programs`, 
      label: "offering", 
      description: "comprehensive programs",
      image: "/Aboutpage-Images/6-programsImage.jpeg"
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-16 sm:pb-24 bg-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[rgb(234,88,12)] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
<h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 leading-tight font-serif text-charity-dark">
            About <span className="text-[rgb(234,88,12)]">Us</span>
          </h1>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute -left-4 top-1/2 w-1 h-16 bg-[rgb(234,88,12)] transform -translate-y-1/2 hidden sm:block"></div>
              <p className="text-lg sm:text-xl text-gray-700 relative pl-6 sm:pl-8">
                Dedicated to empowering tribal communities through comprehensive development programs 
                and sustainable programs across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="pb-12 sm:pb-20 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-8 sm:space-y-12">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-8 sm:mb-10 text-center lg:text-left">
                  Our <span className="text-[rgb(234,88,12)]">Mission</span> & <span className="text-secondary">Vision</span>
                </h2>
                
                <div className="space-y-8 sm:space-y-12">
                  <div className="bg-charity-light/30 p-6 sm:p-8 rounded-xl border-l-4 border-[rgb(234,88,12)]">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-1 bg-charity-dark mr-3"></div>
                      <h3 className="text-xl sm:text-2xl font-bold text-charity-dark uppercase tracking-wider">Our Mission</h3>
                    </div>
                    <p className="text-base sm:text-lg text-gray-800 leading-relaxed pl-2 sm:pl-4">
                      To provide both tribal and rural communities with excellent 
                      development opportunities within a wide range of educational, 
                      economic and healthcare programs as well as other social 
                      programmes at the grassroots, community and regional levels.
                    </p>
                  </div>
                  
                  <div className="bg-charity-light/30 p-6 sm:p-8 rounded-xl border-l-4 border-secondary">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-1 bg-charity-dark mr-3"></div>
                      <h3 className="text-xl sm:text-2xl font-bold text-charity-dark uppercase tracking-wider">Our Vision</h3>
                    </div>
                    <p className="text-base sm:text-lg text-gray-800 leading-relaxed pl-2 sm:pl-4">
                      To assume the role of a leader in the development of tribal and rural 
                      communities through sustainable projects that preserve cultural heritage 
                      while promoting modern development opportunities across India.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Continuous Scrolling Stats */}
            <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
              <div className="stats-scroll-container h-full overflow-y-hidden">
                <div className="flex flex-col">
                  {/* Duplicate the stats for seamless looping */}
                  {[...stats, ...stats].map((stat, index) => (
                    <div key={`${stat.label}-${index}`} className="flex items-center space-x-4 sm:space-x-6 bg-white rounded-2xl p-4 sm:p-6 shadow-lg mb-6 sm:mb-8 min-h-[120px] sm:min-h-[150px] flex-shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0 border-4 border-[rgb(234,88,12)]">
                        <img 
                          src={stat.image} 
                          alt={stat.label}
                          className="w-full h-full object-cover object-center"
                          style={{ objectPosition: 'center 30%' }}
                        />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-charity-dark">
                          {stat.number}
                        </div>
                        <div className="text-base sm:text-lg text-gray-700">{stat.label}</div>
                        <div className="text-sm text-gray-500">{stat.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Gradient fade effect at top and bottom */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-charity-light to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-charity-light to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-24 bg-charity-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charity-dark mb-4 sm:mb-6">
              Our <span className="text-[rgb(234,88,12)]">Humble Beginnings</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              The journey that shaped our commitment to tribal development
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                The Tribal Development Trust was born in 2015 from the vision of B. Srinivas Naik, who was deeply moved by the struggles of tribal communities. Witnessing the harsh realities of tribal life - lack of education, healthcare, and economic opportunities - he was inspired to make a difference. Srinivas noticed how many families were trapped in cycles of poverty, often falling prey to harmful habits due to limited awareness and opportunities.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                Starting in 2016, Srinivas began with small but impactful steps, establishing evening tutoring centers in tribal communities. Despite facing numerous personal challenges, his determination to uplift these communities never wavered. He dedicated himself to understanding their needs, conducting extensive research, and developing programs that would bring about real, sustainable change.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                What began with basic education initiatives soon expanded to include health camps, women's empowerment programs, and community development projects. Each program was designed with a deep respect for tribal culture and traditions, ensuring that development complemented rather than disrupted their way of life.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Today, Tribal Development Trust has grown into a beacon of hope, transforming countless lives across tribal communities. Under Srinivas's visionary leadership, we look forward to expanding our impact through his ambitious plans that include child adoption programs for underprivileged children, comprehensive elderly care services, dedicated widow support programs, and sustainable village development projects that will ensure long-term self-reliance for tribal communities.
              </p>
            </div>
            <div className="space-y-6">
              <div 
                onClick={() => window.location.href = '/profile/BANOTH-SRINIVAS-NAIK'}
                className="block relative w-full h-80 sm:h-[32rem] overflow-hidden rounded-2xl cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img 
                  src="/aboutuspage/FOUNDER.jpg" 
                  alt="B. Srinivas Naik - Founder" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-charity-dark mb-2">B. Srinivas Naik</h3>
                <p className="text-[rgb(234,88,12)] font-medium mb-4 text-sm">Founder & President</p>
                <div className="border-l-4 border-[rgb(234,88,12)] pl-4">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed italic">
                    "My vision is to see every tribal individual empowered with education, healthcare, and opportunities to build a better future while preserving their rich cultural heritage."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values - Simplified */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charity-dark mb-4 sm:mb-6">
              Core Values That <span className="text-[rgb(234,88,12)]">Guide Us</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and shape our approach to tribal development
            </p>
          </div>

          <div className="relative">
            {/* Hide scrollbar but keep functionality */}
            <style jsx global>{`
              .values-scroll-container {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
              }
              .values-scroll-container::-webkit-scrollbar {
                display: none;  /* Chrome, Safari and Opera */
              }
              @media (min-width: 768px) {
                .values-scroll-container {
                  overflow-x: visible !important;
                }
              }
            `}</style>
            
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 overflow-x-auto pb-6 -mx-4 px-4 values-scroll-container">
              {values.map((value, index) => {
                const colors = [
                  'from-[#fef3c7] to-[#fef3c7]/50', // Community First
                  'from-[#d1fae5] to-[#d1fae5]/50',  // Cultural Respect
                  'from-[#f0f9ff] to-[#f0f9ff]/50',  // Sustainable Impact
                  'from-[#f3e8ff] to-[#f3e8ff]/50'   // Transparency
                ];
                
                return (
                  <div 
                    key={index}
                    className="group flex-shrink-0 w-[calc(100vw-4rem)] sm:w-96 md:w-auto md:flex-shrink"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    <div className={`h-full bg-gradient-to-br ${colors[index]} rounded-2xl p-6 sm:p-8 transition-all duration-500 group-hover:-translate-y-2 relative z-10 border border-gray-100 hover:shadow-xl`}>
                      <div className="w-16 h-16 rounded-xl bg-white shadow-md flex items-center justify-center text-3xl text-[rgb(234,88,12)] mb-6 mx-auto transition-transform group-hover:scale-110 group-hover:rotate-3">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-bold text-charity-dark mb-4 text-center">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-center mb-6">
                        {value.description}
                      </p>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[rgb(234,88,12)] to-secondary rounded-full transition-all duration-300 group-hover:w-24"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 sm:py-24 bg-charity-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charity-dark mb-4 sm:mb-6">
              Our <span className="text-[rgb(234,88,12)]">Leadership Team</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced leaders committed to transforming tribal communities across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {trustees.map((trustee, index) => {
              const memberId = trustee.name.replace(/\./g, '').replace(/\s+/g, '-').toLowerCase();
              
              return (
                <div key={index} className="group h-full">
                  <Card className="h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                    {/* Image with gradient overlay */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={trustee.image} 
                        alt={trustee.name}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                          trustee.name.includes('LALITHAMMA') || trustee.name.includes('SURESH NAIK') 
                            ? 'object-top' 
                            : 'object-center'
                        }`}
                        style={{
                          objectPosition: trustee.name.includes('LALITHAMMA') || trustee.name.includes('SURESH NAIK') 
                            ? 'center 10%' 
                            : 'center 20%'
                        }}
                        onError={(e) => {
                          console.error('Error loading image:', trustee.image);
                          (e.target as HTMLImageElement).style.border = '2px solid #f87171';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      {/* Role Badge */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[rgb(234,88,12)]/90 text-white text-xs font-medium">
                          {trustee.role}
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                          {trustee.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
                          {trustee.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <Link 
                          to={`/profile/${memberId}`}
                          className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-[rgb(234,88,12)] hover:text-white bg-transparent hover:bg-[rgb(234,88,12)] border border-[rgb(234,88,12)] rounded-lg transition-all duration-300 group-hover:shadow-md"
                        >
                          View Full Profile
                          <svg 
                            className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M14 5l7 7m0 0l-7 7m7-7H3" 
                            />
                          </svg>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
