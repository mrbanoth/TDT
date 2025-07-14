
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
      icon: "👥",
      color: "primary"
    },
    {
      title: "Cultural Respect",
      description: "Preserving and honoring tribal traditions while promoting development",
      icon: "🌿",
      color: "secondary"
    },
    {
      title: "Sustainable Impact",
      description: "Creating long-term solutions that empower communities to thrive independently",
      icon: "♻️",
      color: "accent"
    },
    {
      title: "Transparency",
      description: "Maintaining open communication and accountability in all our operations",
      icon: "🔍",
      color: "accent"
    },
  ];

  const stats = [
    { 
      number: animatedStats.students.toLocaleString(), 
      label: "students", 
      description: "children supported",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    { 
      number: `Since 2015`, 
      label: "founded", 
      description: `${animatedStats.years} years of service`,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    { 
      number: `${animatedStats.programs} programs`, 
      label: "offering", 
      description: "comprehensive programs",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-16 sm:pb-24 bg-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
<h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 leading-tight font-serif text-charity-dark">
            About <span className="text-primary">Us</span>
          </h1>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute -left-4 top-1/2 w-1 h-16 bg-primary transform -translate-y-1/2 hidden sm:block"></div>
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
                  Our <span className="text-primary">Mission</span> & <span className="text-secondary">Vision</span>
                </h2>
                
                <div className="space-y-8 sm:space-y-12">
                  <div className="bg-charity-light/30 p-6 sm:p-8 rounded-xl border-l-4 border-primary">
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
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0 border-4 border-primary">
                        <img 
                          src={stat.image} 
                          alt={stat.label}
                          className="w-full h-full object-cover"
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

      {/* Our Story - moved before core values */}
      <section className="py-12 sm:py-20 bg-charity-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-4 sm:mb-6">
                Our Humble Beginnings
              </h2>
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
              <Link to="/profile/BANOTH-SRINIVAS-NAIK" className="block relative w-full h-80 sm:h-[32rem] overflow-hidden rounded-2xl cursor-pointer hover:cursor-pointer">
                <img 
                  src="/aboutuspage/FOUNDER.jpg" 
                  alt="B. Srinivas Naik - Founder" 
                  className="w-full h-full object-cover object-top"
                />
              </Link>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-charity-dark mb-2">B. Srinivas Naik</h3>
                <p className="text-primary font-medium mb-4 text-sm">Founder & President</p>
                <div className="border-l-4 border-primary pl-4">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed italic">
                    "My vision is to see every tribal individual empowered with education, healthcare, and opportunities to build a better future while preserving their rich cultural heritage."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
                Our Core Values
              </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and shape our approach to tribal development
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary/20 hover:-translate-y-1 flex flex-col items-center"
              >
                <div 
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${value.color === 'primary' ? 'bg-primary/10' : value.color === 'secondary' ? 'bg-secondary/10' : 'bg-accent/10'} flex items-center justify-center text-3xl sm:text-4xl mb-4 sm:mb-6`}
                >
                  {value.icon}
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold text-charity-dark mb-3 sm:mb-4`}>
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center mb-4 sm:mb-6">
                  {value.description}
                </p>
                <div className={`h-1 w-12 ${value.color === 'primary' ? 'bg-primary' : value.color === 'secondary' ? 'bg-secondary' : 'bg-orange-500'} rounded-full mx-auto transition-all duration-300 group-hover:w-16`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-12 sm:py-20 bg-charity-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
                Our Leadership Team
              </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced leaders committed to transforming tribal communities across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {trustees.map((trustee, index) => {
              // Create URL-friendly ID for routing
              const memberId = trustee.name.replace(/\./g, '').replace(/\s+/g, '-').toUpperCase();
              
              return (
                <Link 
                  key={index} 
                  to={`/profile/${memberId}`}
                  className="group h-full block"
                >
                  <Card className="h-full flex flex-col border-2 border-charity-light/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group/card">
                    <div className="relative overflow-hidden h-48 sm:h-64 flex-shrink-0">
                      <div className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                          <img 
                            src={trustee.image} 
                            alt={trustee.name}
                            className="w-full h-[120%] object-cover object-top transition-transform duration-700 group-hover/card:scale-105"
                            style={{
                              objectPosition: 'center 20%',
                              ...(trustee.name.includes('LALITHAMMA') || trustee.name.includes('SURESH NAIK') 
                                ? { objectPosition: 'center 10%' }
                                : {})
                            }}
                            onError={(e) => {
                              console.error('Error loading image:', trustee.image);
                              (e.target as HTMLImageElement).style.border = '2px solid red';
                            }}
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                    </div>
                    <CardContent className="p-5 sm:p-6 text-center group-hover/card:bg-charity-light/10 transition-all duration-300 flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-lg sm:text-xl font-bold text-charity-dark mb-2 group-hover/card:text-primary transition-colors">
                          {trustee.name}
                        </h3>
                        <p className="text-primary/90 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                          {trustee.role}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3 mb-4">
                          {trustee.description}
                        </p>
                      </div>
                      <div className="mt-auto">
                        <Link 
                          to={`/profile/${memberId}`} 
                          className="inline-flex items-center justify-center w-full px-4 py-2.5 text-xs sm:text-sm font-semibold text-black hover:text-charity-dark border-2 border-black hover:border-charity-dark transition-all duration-300 rounded-full hover:bg-charity-light/10 group-hover/card:text-charity-dark tracking-wide uppercase"
                        >
                          View Profile
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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
