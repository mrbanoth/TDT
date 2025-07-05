import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

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

const AllEvents = () => {
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

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Sample events data (in a real app, this would come from an API)
  const upcomingEvents: Event[] = [
    {
      id: "1",
      title: "Annual Health Camp",
      date: "2024-07-15",
      time: "9:00 AM - 5:00 PM",
      location: "Tribal Village, Telangana",
      description: "Free comprehensive health checkups, medicines, and health awareness programs for the tribal community.",
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Link
                to="/events"
                className="mb-6 inline-flex items-center text-primary hover:bg-primary/10 rounded-full px-4 py-2 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Events
              </Link>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-charity-dark mb-4">
                All Upcoming Events
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover all our upcoming events and join us in making a difference in tribal communities.
              </p>
            </div>
          </div>
        </section>

        {/* Events List with Alternating Layout */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16 md:space-y-24">
              {upcomingEvents.map((event, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <div 
                    key={event.id}
                    className={`group flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all duration-300 rounded-2xl p-6 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Image - Circular */}
                    <div className="w-full md:w-1/3 lg:w-2/5 flex-shrink-0">
                      <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto overflow-hidden rounded-full border-4 border-primary/20 shadow-xl">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                        {event.type}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {event.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1.5 text-primary" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1.5 text-primary" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1.5 text-primary" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-5 leading-relaxed">
                        {event.description}
                      </p>
                      
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                        {event.details.slice(0, 3).map((detail, i) => (
                          <span 
                            key={i} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {detail}
                          </span>
                        ))}
                        {event.details.length > 3 && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                            +{event.details.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Button 
                          onClick={() => handleRegisterClick(event)}
                          className="bg-charity-dark hover:bg-charity-dark/90 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 min-w-[120px]"
                        >
                          Register
                        </Button>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-1.5 text-primary" />
                          <span>{event.participants}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
              Can't find what you're looking for?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Subscribe to our newsletter to stay updated on upcoming events, volunteer opportunities, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button className="bg-charity-dark hover:bg-charity-dark/90 text-white rounded-lg px-8 py-3 transition-colors duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <div className="mt-16">
        <Footer />
      </div>

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

export default AllEvents;
