
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { getEvents, getPastEvents, PastEvent } from '@/lib/contentful';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  participants: string;
  image: string;
  description: string;
  details: string[];
}

// PastEvent interface is now imported from contentful.ts

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Removed registration modal state

  // State for events
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([]);

  // Fetch events from Contentful
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch upcoming events
        const events = await getEvents();
        
        if (events && events.length > 0) {
          setUpcomingEvents(events);
        } else {
          console.warn('No upcoming events found or empty response from Contentful');
          setError('no_events');
        }

        // Fetch past events
        const pastEventsData = await getPastEvents();
        
        if (pastEventsData && pastEventsData.length > 0) {
          setPastEvents(pastEventsData);
        } else {
          console.warn('No past events found in Contentful');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('network_error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Removed registration modal handlers

  // Hero Section
  const heroSection = (
    <section className="relative pt-8 sm:pt-16 pb-16 sm:pb-24 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[rgb(234,88,12)] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 leading-tight font-serif text-charity-dark">
          Upcoming <span className="text-[rgb(234,88,12)]">Programs</span>
        </h1>
        <div className="max-w-3xl mx-auto">
          <div className="relative text-center sm:text-left">
            <div className="hidden sm:block absolute -left-4 top-1/2 w-1 h-16 bg-[rgb(234,88,12)] transform -translate-y-1/2"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 sm:pl-8">
              Join us in our mission to empower tribal communities through our upcoming events, 
              workshops, and community programs across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  // Extract the event card into a separate component for reusability
  const renderEventCard = (event: Event, index: number) => (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-[rgb(234,88,12)]/20 flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-semibold bg-[rgb(234,88,12)]/90 text-white backdrop-blur-sm">
            {event.type}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">
            {event.title}
          </h3>
          <div className="flex items-center text-white/90 text-sm">
            <Calendar className="h-4 w-4 mr-1.5" />
            <span>{formatDate(event.date)} • {event.time}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-gray-600 text-sm mb-4 space-x-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1.5 text-[rgb(234,88,12)]" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1.5 text-[rgb(234,88,12)]" />
            <span>{event.participants}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {event.description}
        </p>
        
        <ul className="space-y-1.5 mb-6">
          {event.details.slice(0, 2).map((detail, i) => (
            <li key={i} className="flex items-start text-sm text-gray-600">
              <span className="text-[rgb(234,88,12)] mr-2">•</span>
              <span className="line-clamp-1">{detail}</span>
            </li>
          ))}
          {event.details.length > 2 && (
            <li className="text-sm text-gray-500">+{event.details.length - 2} more</li>
          )}
        </ul>
        
        <Link to="/donate" className="block w-full">
          <Button 
            className="w-full bg-[#1F2937] hover:bg-gray-900 text-white rounded-lg py-2 text-sm font-medium transition-all duration-300 h-9"
          >
            Participate
          </Button>
        </Link>
      </div>
    </div>
  );

  // Format date helper function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

// Render past event card with all details
const renderPastEventCard = (event: PastEvent, index: number) => {
  if (!event) return null;

  // Safely parse the date
  let eventDate: Date;
  let formattedDate = 'Date not available';
  
  try {
    eventDate = new Date(event.eventDate);
    if (!isNaN(eventDate.getTime())) {
      formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  } catch (e) {
    console.error('Error parsing date:', e);
  }

  return (
    <div 
      key={event.id || `event-${index}`} 
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-orange-300 flex flex-col h-full"
    >
      {/* Image with overlay */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={event.featuredImage || '/placeholder-event.jpg'} 
          alt={event.title || 'Past Event'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-event.jpg';
          }}
        />
        
        {/* Event Type Badge */}
        {event.eventType && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-600 text-white">
              {event.eventType}
            </span>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Event Date */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-1.5 text-center shadow-sm min-w-[45px]">
          <div className="text-orange-600 font-bold text-base leading-none">
            {eventDate.getDate()}
          </div>
          <div className="text-gray-700 text-[10px] font-medium uppercase leading-tight">
            {eventDate.toLocaleString('default', { month: 'short' })}
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2.5 group-hover:text-orange-600 transition-colors line-clamp-2">
          {event.title || 'Past Event'}
        </h3>
        
        {/* Date and Location */}
        <div className="space-y-2.5 mb-3.5">
          <div className="flex items-start">
            <Calendar className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5 mr-2" />
            <span className="text-sm text-gray-600">{formattedDate}</span>
          </div>
          
          {event.location && (
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5 mr-2" />
              <span className="text-sm text-gray-600">{event.location}</span>
            </div>
          )}
          
          {(event.participantCount && event.participantCount > 0) && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 text-orange-600 mr-2" />
              <span>{event.participantCount} Participants</span>
            </div>
          )}
        </div>
        
        {/* Description and Details */}
        <div className="space-y-3 text-sm text-gray-600 mt-auto">
          {event.shortDescription && (
            <div className="text-gray-700 leading-relaxed line-clamp-3">
              {typeof event.shortDescription === 'string' 
                ? event.shortDescription 
                : documentToReactComponents(event.shortDescription)}
            </div>
          )}
          
          {event.keyAchievements && (
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
              <h4 className="font-semibold text-orange-800 text-sm mb-1.5">Key Achievements</h4>
              <div className="text-gray-700 text-sm leading-relaxed">
                {typeof event.keyAchievements === 'string' 
                  ? event.keyAchievements 
                  : documentToReactComponents(event.keyAchievements)}
              </div>
            </div>
          )}
          
          {event.impactMetrics && (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <h4 className="font-semibold text-gray-800 text-sm mb-1.5">Impact</h4>
              <div className="text-gray-700 text-sm leading-relaxed">
                {typeof event.impactMetrics === 'string' 
                  ? event.impactMetrics 
                  : documentToReactComponents(event.impactMetrics)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ... (rest of the code remains the same)
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      {heroSection}
      
      {/* Events Section */}
      <section className="pt-1 md:pt-2 lg:pt-3 pb-8 md:pb-12 lg:pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-center space-x-1">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'upcoming'
                  ? 'text-orange-600 font-medium bg-orange-50' 
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
              }`}
            >
              Upcoming Programs
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'past'
                  ? 'text-orange-600 font-medium bg-orange-50' 
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
              }`}
            >
              Pervious  Programs
            </button>
          </div>

          {activeTab === 'upcoming' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-600">Loading programs...</p>
                </div>
              ) : error === 'network_error' ? (
                <div className="col-span-3 text-center py-12 px-4">
                  <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
                      <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">Unable to Load Programs</h3>
                    <p className="text-gray-600 mb-6">We're having trouble loading upcoming Programs. This could be due to a network issue or server problem.</p>
                    <div className="space-y-3">
                      <button 
                        onClick={() => window.location.reload()}
                        className="w-full sm:w-auto px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
                      >
                        Try Again
                      </button>
                      <p className="text-sm text-gray-500">or check your internet connection and try again later</p>
                    </div>
                  </div>
                </div>
              ) : error === 'no_events' ? (
                <div className="col-span-3 text-center py-12 px-4">
                  <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Programs Posted Yet</h3>
                    <p className="text-gray-600">We haven't added any upcoming programs yet. Please check back later for updates.</p>
                  </div>
                </div>
              ) : upcomingEvents.length > 0 ? (
                <>
                  {upcomingEvents.map((event, index) => (
                    <div key={event.id || index} className="w-full">
                      {renderEventCard(event, index)}
                    </div>
                  ))}
                  {Array.from({ length: 3 - Math.min(upcomingEvents.length, 3) }).map((_, index) => (
                    <div key={`placeholder-${index}`} className="w-full">
                      <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200 p-6 h-full flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium text-gray-700 mb-2">More Programs Coming Soon</h4>
                        <p className="text-gray-500 text-sm mb-4">We're working on organizing more amazing Programs for you.</p>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                          <div className="bg-orange-200 h-2.5 rounded-full animate-pulse" style={{width: '70%'}}></div>
                        </div>
                        <div className="w-32 h-9 bg-gray-100 rounded-lg mt-2"></div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="col-span-3 text-center py-12 px-4">
                  <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Upcoming Events</h3>
                    <p className="text-gray-600 mb-6">We don't have any upcoming events scheduled at the moment. Our team is working on organizing some amazing events for you.</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Past Events Tab
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-600">Loading past Programs...</p>
                  </div>
                ) : pastEvents && pastEvents.length > 0 ? (
                  <>
                    {pastEvents.map((event, index) => (
                      <div key={event.id || `event-${index}`} className="w-full">
                        {renderPastEventCard(event, index)}
                      </div>
                    ))}
                    {Array.from({ length: Math.max(0, 3 - pastEvents.length) }).map((_, index) => (
                      <div key={`placeholder-${index}`} className="w-full">
                        <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200 p-6 h-full flex flex-col items-center justify-center text-center">
                          <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                          <h4 className="text-lg font-medium text-gray-700 mb-2">More Programs Coming Soon</h4>
                          <p className="text-gray-500 text-sm mb-4">We're working on documenting more of our past Programs.</p>
                          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                            <div className="bg-orange-200 h-2.5 rounded-full animate-pulse" style={{width: '70%'}}></div>
                          </div>
                          <div className="w-32 h-9 bg-gray-100 rounded-lg mt-2"></div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="col-span-3 text-center py-12 px-4">
                    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Past Programs Yet</h3>
                      <p className="text-gray-600 mb-6">We haven't added any past Programs yet. Check back soon to see our Programs history and impact.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
