import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Rahul Meena',
    role: 'Scholarship Recipient',
    quote: 'The Tribal Development Trust changed my life by providing me with an education when I had no hope.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    name: 'Sunita Devi',
    role: 'Healthcare Beneficiary',
    quote: 'The mobile health clinic saved my child\'s life. We are forever grateful for their support and care.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    name: 'Arjun Singh',
    role: 'Livelihood Program Participant',
    quote: 'The agricultural training program helped me double my crop yield and significantly improve my family\'s income.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 4,
    name: 'Meena Kumari',
    role: 'Women\'s Group Leader',
    quote: 'The self-help group training empowered me to start my own business and become financially independent.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  }
];

const Testimonials = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollToTestimonial = (index: number) => {
    if (scrollContainer.current) {
      const container = scrollContainer.current;
      const cards = container.firstChild?.childNodes as NodeListOf<HTMLElement>;
      if (!cards || !cards[index]) return;
      
      // Calculate scroll position to center the card
      const card = cards[index];
      const containerWidth = container.offsetWidth;
      const cardWidth = card.offsetWidth;
      const scrollLeft = card.offsetLeft - (containerWidth - cardWidth) / 2;
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
      
      setActiveIndex(index);
      updateArrowVisibility(scrollLeft);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainer.current) return;
    
    const container = scrollContainer.current;
    const containerWidth = container.offsetWidth;
    const scrollAmount = containerWidth * 0.8; // Scroll 80% of container width
    
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const updateArrowVisibility = (scrollPosition: number) => {
    if (!scrollContainer.current) return;
    
    const container = scrollContainer.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    // Add a small threshold to prevent premature hiding of arrows
    setShowLeftArrow(scrollPosition > 10);
    setShowRightArrow(scrollPosition < maxScroll - 10);
    
    // Update active index based on scroll position
    const cards = container.firstChild?.childNodes as NodeListOf<HTMLElement>;
    if (!cards) return;
    
    const containerCenter = scrollPosition + (container.offsetWidth / 2);
    let newActiveIndex = 0;
    let minDistance = Infinity;
    
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
      const distance = Math.abs(containerCenter - cardCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        newActiveIndex = index;
      }
    });
    
    setActiveIndex(newActiveIndex);
  };

  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;
    
    const handleScroll = () => {
      updateArrowVisibility(container.scrollLeft);
    };
    
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initial check
    updateArrowVisibility(0);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5">
        <div className="absolute top-1/4 -right-40 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charity-dark mb-4 sm:mb-6">
            Stories of <span className="text-[rgb(234,88,12)]">Transformation</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from individuals whose lives have been transformed through our programs and initiatives
          </p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className={`hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 items-center justify-center rounded-full bg-white/95 shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110 -translate-x-7 ${!showLeftArrow ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Previous testimonial"
            disabled={!showLeftArrow}
          >
            <ChevronLeft className={`w-7 h-7 ${showLeftArrow ? 'text-gray-800' : 'text-gray-300'}`} strokeWidth={2.5} />
          </button>
          
          {/* Testimonials Container */}
          <div 
            ref={scrollContainer}
            className="w-full overflow-x-auto pb-10 no-scrollbar scroll-smooth"
            style={{ 
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
            onScroll={(e) => {
              updateArrowVisibility(e.currentTarget.scrollLeft);
            }}
          >
            <style>
              {`.no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }`}
            </style>
            
            <div className="flex w-full gap-8 px-1">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className="flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)]"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col border border-gray-100 hover:border-orange-100">
                    <div className="p-8 flex-1 flex flex-col h-full">
                      <Quote className="w-8 h-8 text-orange-100 mb-4" />
                      <p className="text-gray-600 text-lg leading-relaxed mb-6 flex-1">"{testimonial.quote}"</p>
                      
                      <div className="flex items-center mt-6 pt-6 border-t border-gray-100">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
                        />
                        <div className="ml-4">
                          <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                          <p className="text-sm text-orange-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className={`hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 items-center justify-center rounded-full bg-white/95 shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110 translate-x-7 ${!showRightArrow ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Next testimonial"
            disabled={!showRightArrow}
          >
            <ChevronRight className={`w-7 h-7 ${showRightArrow ? 'text-gray-800' : 'text-gray-300'}`} strokeWidth={2.5} />
          </button>
        </div>

        {/* Mobile navigation dots */}
        <div className="flex justify-center mt-10 space-x-3 md:hidden">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              onClick={() => scrollToTestimonial(index)}
              className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${index === activeIndex ? 'w-8 bg-orange-600' : 'w-3 bg-gray-200'}`}
              aria-label={`View testimonial ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
