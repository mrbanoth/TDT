
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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

interface PastEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  participants: string;
  type: string;
  impact?: string;
}

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleRegisterClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Registration submitted:', {
      ...formData,
      eventId: selectedEvent?.id,
      eventTitle: selectedEvent?.title
    });
    
    // Show success message and close modal
    alert('Registration successful! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    handleCloseModal();
  };
  
  // Hero Section
  const heroSection = (
    <section className="relative pt-8 sm:pt-16 pb-16 sm:pb-24 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 leading-tight font-serif text-charity-dark">
          Upcoming <span className="text-primary">Events</span>
        </h1>
        <div className="max-w-3xl mx-auto">
          <div className="relative text-center sm:text-left">
            <div className="hidden sm:block absolute -left-4 top-1/2 w-1 h-16 bg-primary transform -translate-y-1/2"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 sm:pl-8">
              Join us in our mission to empower tribal communities through our upcoming events, 
              workshops, and community programs across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
  const upcomingEvents: Event[] = [
    {
      id: "1",
      title: "Annual Health Camp",
      date: "2024-07-15",
      time: "9:00 AM - 5:00 PM",
      location: "Tribal Village, Telangana",
      description: "Free comprehensive health checkups, medicines, and health awareness programs for the tribal.",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3",
      participants: "200+ expected",
      type: "Health Camp",
      details: [
        "Free health check-ups",
        "Specialist consultations",
        "Free medicines distribution",
        "Health awareness sessions"
      ]
    },
    {
      id: "2",
      title: "Women's Empowerment Workshop",
      date: "2024-08-10",
      time: "10:00 AM - 4:00 PM",
      location: "Adilabad District, Telangana",
      description: "Skill development and entrepreneurship training for tribal women to promote self-reliance.",
      image: "https://images.unsplash.com/photo-1529154691717-33091991a2c9?ixlib=rb-4.0.3",
      participants: "50 women",
      type: "Workshop",
      details: [
        "Skill development training",
        "Entrepreneurship guidance",
        "Financial literacy",
        "Success stories sharing"
      ]
    },
    {
      id: "3",
      title: "Educational Scholarship Distribution",
      date: "2024-09-05",
      time: "11:00 AM - 2:00 PM",
      location: "Khammam, Telangana",
      description: "Awarding scholarships to meritorious tribal students to support their higher education.",
      image: "https://images.unsplash.com/photo-1523050853548-5d4093d06a2b?ixlib=rb-4.0.3",
      participants: "100 students",
      type: "Educational",
      details: [
        "Scholarship distribution ceremony",
        "Mentorship program launch",
        "Career guidance session",
        "Alumni interaction"
      ]
    },
    {
      id: "4",
      title: "Helping the Poor Initiative",
      type: "Relief Program",
      date: "2024-12-15",
      time: "10:00 AM - 4:00 PM",
      location: "Multiple Villages, Adilabad",
      participants: "500+ families",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3",
      description: "Winter relief program providing warm blankets and clothing to tribal families in remote areas.",
      details: [
        "Essential aid distribution",
        "Winter clothing drive",
        "Elderly care kits",
        "Children's winter essentials"
      ]
    }
  ];

  const pastEvents: PastEvent[] = [
    {
      title: "Community Health Awareness Program",
      date: "2024-05-20",
      time: "10:00 AM - 4:00 PM",
      location: "Tribal Village, Telangana",
      description: "Awareness sessions on hygiene, nutrition, and preventive healthcare for tribal communities.",
      image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3",
      participants: "150+ community members",
      type: "Health Camp",
      impact: "150+ families educated on health and hygiene practices"
    },
    {
      title: "Tree Plantation Drive",
      date: "2024-04-15",
      time: "8:00 AM - 2:00 PM",
      location: "Adilabad District, Telangana",
      description: "Community-led tree plantation initiative to promote environmental sustainability.",
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3",
      participants: "200+ volunteers",
      type: "Environment",
      impact: "500+ saplings planted with community participation"
    },
    {
      title: "Educational Kit Distribution",
      date: "2024-03-10",
      time: "11:00 AM - 3:00 PM",
      location: "Warangal, Telangana",
      description: "Distribution of school supplies and educational materials to underprivileged tribal children.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0a?ixlib=rb-4.0.3",
      participants: "300+ students",
      type: "Education",
      impact: "300+ children received educational support"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      {heroSection}
      
      {/* Upcoming Events */}

      {/* Upcoming Events */}
      <section className="pt-0 pb-12 sm:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {upcomingEvents.slice(0, 3).map((event, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-primary/20 flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/90 text-white backdrop-blur-sm">
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
                      <MapPin className="h-4 w-4 mr-1.5 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1.5 text-primary" />
                      <span>{event.participants}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <ul className="space-y-1.5 mb-6">
                    {event.details.slice(0, 2).map((detail, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600">
                        <span className="text-primary mr-2">•</span>
                        <span className="line-clamp-1">{detail}</span>
                      </li>
                    ))}
                    {event.details.length > 2 && (
                      <li className="text-sm text-gray-500">+{event.details.length - 2} more</li>
                    )}
                  </ul>
                  
                  <Button 
                    onClick={() => handleRegisterClick(event)}
                    className="w-full bg-charity-dark hover:bg-charity-dark/90 text-white rounded-xl py-2 text-sm font-medium transition-all duration-300 h-9"
                  >
                    Register
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Events Button */}
          <div className="text-center mt-16">
            <Link 
              to="/all-events"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-full shadow hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 group/btn h-10"
            >
              View All Upcoming Events
              {/* <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-200" /> */}
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Impact */}
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-20 bg-gradient-to-b from-white to-charity-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
              Recent Impact Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how our programs are making a difference in tribal communities across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {pastEvents.map((event, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-primary/20 flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/90 text-white backdrop-blur-sm">
                      {event.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-xs text-gray-500 mb-3 flex-wrap">
                    <div className="flex items-center mr-3 mb-1">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary flex-shrink-0" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-charity-dark mb-3 line-clamp-2 leading-tight">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  
                  {event.impact && (
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Impact</p>
                        <p className="text-sm font-semibold text-primary">
                          {event.impact}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
            Support Our Events
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Your donations help us organize more events and reach more communities in need. 
            Every contribution makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center w-full px-4 sm:px-0">
            <Link 
              to="/donate" 
              className="flex items-center justify-center w-full max-w-[260px] sm:w-auto bg-charity-dark hover:bg-charity-dark/95 text-white font-medium font-sans px-7 py-2.5 sm:py-2.5 rounded-full text-sm sm:text-[15px] hover:shadow-lg hover:scale-[1.02] transition-all duration-200 tracking-wide whitespace-nowrap"
            >
              Donate to Support Events
            </Link>
            <Link 
              to="/events" 
              className="flex items-center justify-center w-full max-w-[260px] sm:w-auto bg-white border-2 border-charity-dark text-charity-dark hover:bg-charity-dark hover:text-white font-medium font-sans px-7 py-2.5 sm:py-2.5 rounded-full text-sm sm:text-[15px] hover:shadow-lg hover:scale-[1.02] transition-all duration-200 tracking-wide whitespace-nowrap"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Registration Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md relative">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Register for {selectedEvent.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                {formatDate(selectedEvent.date)} • {selectedEvent.time}
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Any special requirements or questions?"
                  />
                </div>
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-charity-dark hover:bg-charity-dark/90 text-white py-2.5 rounded-lg font-medium"
                  >
                    Submit Registration
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
