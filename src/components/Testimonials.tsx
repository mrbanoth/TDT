import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Quote, MessageSquare, Share2, ArrowRight, Play, Eye, X, ThumbsUp, Bookmark, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import testimonials from data file
import { testimonials as textTestimonials } from '@/data/testimonials';

// Common card styles
const cardBase = "bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full min-h-[320px] sm:min-h-[360px] md:min-h-[400px]";
const cardPadding = "p-4 sm:p-5";
const cardTitle = "text-base sm:text-lg font-semibold text-gray-900 leading-tight";
const cardText = "text-sm sm:text-base text-gray-600 leading-relaxed";
const cardButton = "mt-4 w-full bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-colors";
const cardMeta = "text-xs sm:text-sm text-gray-500 flex items-center";
const cardIcon = "w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white flex-shrink-0";

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'social'>('text');
  const [selectedVideo, setSelectedVideo] = useState<{url: string; title: string} | null>(null);

  const videoStories = [
    {
      id: 'education-program',
      title: 'Education Program',
      description: 'See how our education programs are transforming lives in tribal communities',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '5:42',
      views: '1.2M',
      date: '2 weeks ago',
      category: 'Education'
    },
    {
      id: 'clean-water',
      title: 'Clean Water Initiative',
      description: 'Bringing clean water to remote tribal villages',
      thumbnail: 'https://img.youtube.com/vi/9xwazD5SyVg/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/9xwazD5SyVg',
      duration: '3:18',
      views: '856K',
      date: '1 month ago',
      category: 'Health'
    },
    {
      id: 'healthcare-camp',
      title: 'Healthcare Camp',
      description: 'Providing medical care to underserved tribal communities',
      thumbnail: 'https://img.youtube.com/vi/7wtfhZwyrcc/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/7wtfhZwyrcc',
      duration: '8:15',
      views: '2.1M',
      date: '3 weeks ago',
      category: 'Health'
    },
    {
      id: 'school-program',
      title: 'School Program',
      description: 'Building a better future through education',
      thumbnail: 'https://img.youtube.com/vi/1Ne1hqOXKKI/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/1Ne1hqOXKKI',
      duration: '6:52',
      views: '1.5M',
      date: '2 months ago',
      category: 'Education'
    },
    {
      id: 'cultural-heritage',
      title: 'Preserving Cultural Heritage',
      description: 'Documenting and preserving tribal traditions and culture',
      thumbnail: 'https://img.youtube.com/vi/J---aiyznGQ/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/J---aiyznGQ',
      duration: '12:45',
      views: '3.7M',
      date: '1 month ago',
      category: 'Culture'
    },
    {
      id: 'women-empowerment',
      title: 'Women Empowerment',
      description: 'Empowering tribal women through skill development',
      thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
      duration: '7:23',
      views: '2.8M',
      date: '3 weeks ago',
      category: 'Empowerment'
    }
  ];

  const PlatformIcon = ({ platform }: { platform: string }) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <section className="pt-12 pb-20 bg-charity-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
            Stories of Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Hear from the communities and families whose lives have been transformed through our programs
          </p>
          
          {/* Tabs */}
          <div className="flex justify-center mb-8 border-b border-gray-200">
            <div className="flex space-x-1 sm:space-x-4">
              <button
                onClick={() => setActiveTab('text')}
                className={`px-4 py-2 text-sm sm:text-base font-medium rounded-t-lg transition-colors ${
                  activeTab === 'text'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Text Stories</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('social')}
                className={`px-4 py-2 text-sm sm:text-base font-medium rounded-t-lg transition-colors ${
                  activeTab === 'social'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Media Stories</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          {activeTab === 'text' && (
            <Carousel 
              className="w-full max-w-6xl mx-auto relative"
              opts={{
                align: 'center',
                loop: true,
              }}
            >
              <CarouselContent className="flex items-center">
                {textTestimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="basis-10/12 sm:basis-1/2 lg:basis-1/3 px-2 pb-4">
                    <div className={`${cardBase} group hover:-translate-y-1`}>
                      <div className={`${cardPadding} flex-1 flex flex-col`}>
                        <div className="flex flex-col items-center text-center mb-4">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 border-2 border-primary/20">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-avatar.png'; // Fallback image
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                            <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                          </div>
                        </div>
                        
                        <div className="relative mb-4 flex-1">
                          <p className={`${cardText} line-clamp-4`}>
                            "{testimonial.content}"
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
                          <div className="flex space-x-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
                              />
                            ))}
                          </div>
                          <button 
                            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center group bg-transparent border-none p-0 cursor-pointer"
                            onClick={() => {
                              // Force scroll to top instantly
                              window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: 'instant'
                              });
                              // Navigate after ensuring scroll position is reset
                              window.location.href = `/stories/${testimonial.id}`;
                            }}
                          >
                            Read Full Story
                            {/* <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" /> */}
                          </button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 sm:left-4" />
              <CarouselNext className="right-0 sm:right-4" />
            </Carousel>
          )}



          {activeTab === 'social' && (
            <>
              <Carousel
                className="w-full max-w-6xl mx-auto relative"
                opts={{
                  align: 'center',
                  loop: true,
                }}
              >
                <CarouselContent className="flex items-center">
                  {videoStories.map((story) => (
                    <CarouselItem key={story.id} className="basis-10/12 sm:basis-1/2 lg:basis-1/3 px-2 h-full">
                      <div 
                        className={`${cardBase} group hover:-translate-y-1 cursor-pointer p-0 overflow-hidden h-full flex flex-col`}
                        onClick={() => setSelectedVideo({ url: story.videoUrl, title: story.title })}
                      >
                        <div className="relative flex-1 w-full bg-gray-100">
                          <img 
                            src={story.thumbnail} 
                            alt={story.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity group-hover:bg-black/30">
                            <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center group-hover:bg-white/90 transition-all transform group-hover:scale-110">
                              <Play className="w-6 h-6 text-primary ml-1" />
                            </div>
                            <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {story.duration}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">{story.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{story.description}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 sm:left-4" />
                <CarouselNext className="right-0 sm:right-4" />
              </Carousel>

              {/* Video Modal */}
              {selectedVideo && (
                <div 
                  className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" 
                  onClick={() => setSelectedVideo(null)}
                >
                  <div 
                    className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden" 
                    onClick={e => e.stopPropagation()}
                  >
                    <button 
                      className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      onClick={() => setSelectedVideo(null)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="relative pt-[56.25%] w-full">
                      <iframe
                        src={`${selectedVideo.url}?autoplay=1`}
                        title={selectedVideo.title}
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-4 bg-gray-900 text-white">
                      <h3 className="text-lg font-medium mb-2">{selectedVideo.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center hover:text-white">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            Like
                          </button>
                          <button className="flex items-center hover:text-white">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Comment
                          </button>
                          <button className="flex items-center hover:text-white">
                            <Share2 className="w-4 h-4 mr-1" />
                            Share
                          </button>
                        </div>
                        <button className="hover:text-white">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
