import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Testimonial data
const textStories = [
  {
    id: 1,
    name: 'Rahul Meena',
    role: 'Scholarship Recipient',
    quote: 'The Tribal Development Trust changed my life by providing me with an education when I had no hope.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    readTime: '3 min read'
  },
  {
    id: 2,
    name: 'Sunita Devi',
    role: 'Healthcare Beneficiary',
    quote: 'The mobile health clinic saved my child\'s life. We are forever grateful for their support.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    readTime: '4 min read'
  },
  {
    id: 3,
    name: 'Arjun Singh',
    role: 'Livelihood Program Participant',
    quote: 'The agricultural training program helped me double my crop yield and improve my family\'s income.',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    readTime: '5 min read'
  },
  {
    id: 4,
    name: 'Meena Kumari',
    role: 'Women\'s Group Leader',
    quote: 'The self-help group training empowered me to start my own business and support my family.',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    readTime: '4 min read'
  }
];

const Testimonials = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const { scrollLeft, clientWidth } = scrollContainer.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      scrollContainer.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from the communities and families whose lives have been transformed through our programs
          </p>
        </div>

        <div className="relative">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 -ml-5 transition-colors duration-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
          </button>
          
          <div 
            ref={scrollContainer}
            className="flex overflow-x-hidden pb-8 -mx-4 px-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            <div className="flex space-x-8">
              {textStories.slice(0, 3).map((story) => (
                <div 
                  key={story.id} 
                  className="flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] px-2"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="p-6">
                      <div className="flex items-start">
                        <img 
                          src={story.image} 
                          alt={story.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div className="ml-4">
                          <h3 className="font-semibold text-lg text-gray-900">{story.name}</h3>
                          <p className="text-sm text-gray-500">{story.role}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-gray-600 leading-relaxed">"{story.quote}"</p>
                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm text-gray-500">{story.readTime}</span>
                        <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
                          Read Full Story
                          <ChevronRight className="ml-1 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 -mr-5 transition-colors duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
