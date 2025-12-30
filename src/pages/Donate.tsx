import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Counter } from '@/components/ui/Counter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DonationModal } from '@/components/DonationModal';
import { contactInfo } from '@/data/contact/info';
import { DollarSign, Package, Utensils, Gift, Heart, Phone, Shield, Users, Clock, Calendar, X, CheckCircle } from 'lucide-react';
import { MaterialDonationForm } from '@/components/donation/MaterialDonationForm';
import { FoodDonationForm } from '@/components/donation/FoodDonationForm';
import { VolunteerSupportForm } from '@/components/donation/VolunteerSupportForm';

const Donate = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    donationType: ''
  });

  // Function to render name and phone fields
  const renderContactFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Your full name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Your mobile number"
            pattern="[0-9]{10}"
            title="Please enter a 10-digit mobile number"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Your email address"
        />
      </div>
    </>
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGetCurrentLocation = (fieldName: 'address' | 'message') => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          const data = await response.json();
          
          if (data.display_name) {
            const address = data.display_name;
            setFormData(prev => ({
              ...prev,
              [fieldName]: prev[fieldName] ? `${prev[fieldName]}\n\nCurrent Location: ${address}` : `Current Location: ${address}`
            }));
          } else {
            setLocationError('Could not retrieve address from coordinates');
          }
        } catch (error) {
          console.error('Error getting address:', error);
          setLocationError('Error getting address. Please enter manually.');
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationError('Unable to retrieve your location. Please enable location services or enter manually.');
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Form submission logic here
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      message: '',
      donationType: ''
    });
    
    // Close modal after a short delay
    setTimeout(() => {
      setActiveModal(null);
      setIsSubmitting(false);
    }, 1000);
  };

  const renderModalHeader = () => {
    const title = activeModal === 'material' ? 'Material Donations' : 
                 activeModal === 'food' ? 'Food Donations' : 'Volunteer Support';
    
    return (
      <div className="flex items-center justify-between w-full">
        <h3 className="text-xl font-bold text-gray-900">
          {title} - Donation Form
        </h3>
        <button
          onClick={() => setActiveModal(null)}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    );
  };

  const renderModalContent = () => {
    switch(activeModal) {
      case 'material':
        return (
          <div className="space-y-4">
            {renderContactFields()}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Items to Donate</label>
              <select
                name="donationType"
                value={formData.donationType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select items</option>
                <option value="clothing">Clothing and Blankets</option>
                <option value="books">Books and Educational Materials</option>
                <option value="medical">Medical Supplies</option>
                <option value="other">Other Items</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Please describe the items you wish to donate"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Pickup Address</label>
                <button
                  type="button"
                  onClick={() => handleGetCurrentLocation('address')}
                  disabled={isLocating}
                  className="text-xs text-[rgb(234,88,12)] hover:text-[rgba(234,88,12,0.8)] flex items-center disabled:opacity-50"
                >
                  {isLocating ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-[rgb(234,88,12)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Locating...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <svg className="h-3 w-3 mr-1 text-[rgb(234,88,12)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Use my location
                    </span>
                  )}
                </button>
              </div>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your full address for pickup"
                required
              />
            </div>
            {locationError && <p className="text-red-500 text-sm mt-1">{locationError}</p>}
          </div>
        );
      
      case 'food':
        return (
          <div className="space-y-4">
            {renderContactFields()}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type of Food Donation</label>
              <select
                name="donationType"
                value={formData.donationType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select food type</option>
                <option value="grains">Grains (Rice, Wheat, etc.)</option>
                <option value="pulses">Pulses and Lentils</option>
                <option value="oils">Cooking Oils</option>
                <option value="other">Other Food Items</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Please describe the food items you wish to donate"
                required
              />
            </div>
          </div>
        );
      
      case 'volunteer':
        return (
          <div className="space-y-4">
            {renderContactFields()}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">How would you like to help?</label>
              <select
                name="donationType"
                value={formData.donationType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select volunteer role</option>
                <option value="teaching">Teaching/Education</option>
                <option value="medical">Medical Services</option>
                <option value="technical">Technical Skills</option>
                <option value="other">Other Ways to Help</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about yourself</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Please share your skills, experience, and availability"
                required
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-20 gradient-charity">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-black">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Make a
                <span className="block text-[rgb(234,88,12)]">Difference</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed text-gray-800">
                Your generosity can transform lives and create lasting impact in tribal communities. 
                Choose how you'd like to contribute to our mission.
              </p>
              
              <div className="flex items-center space-x-4 text-gray-700">
                <Heart className="h-6 w-6 text-red-500 fill-current" />
                <span className="text-lg font-medium">Every contribution matters</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-bold text-charity-dark mb-6">Make an Impact Today</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {[500, 1000, 2500, 5000, 10000].map((amount) => (
                  <Button
                    key={amount}
                    variant={amount === 1000 ? 'default' : 'outline'}
                    className={`h-14 text-lg font-semibold transition-all duration-200 ${
                      amount === 1000 
                        ? 'bg-[rgb(234,88,12)] text-white hover:bg-[rgba(234,88,12,0.9)] border-[rgb(234,88,12)]' 
                        : 'bg-white text-charity-dark border-2 border-gray-200 hover:border-[rgb(234,88,12)] hover:bg-gray-50 hover:text-charity-dark'
                    }`}
                  >
                    ₹{amount.toLocaleString('en-IN')}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  className="h-14 text-lg font-semibold transition-all duration-200 bg-white text-charity-dark border-2 border-gray-200 hover:border-charity-dark hover:bg-gray-50 hover:text-charity-dark"
                >
                  Other
                </Button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-medium">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-charity-dark focus:ring-2 focus:ring-charity-dark/20 focus:outline-none text-lg font-medium"
                  />
                </div>
                <Button 
                  className="w-full bg-[rgb(234,88,12)] hover:bg-[rgba(234,88,12,0.9)] py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                  onClick={() => setActiveModal('financial')}
                >
                  Donate Now
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  {
                    icon: <Shield className="h-8 w-8 text-[rgb(234,88,12)]" />,
                    title: "Secure Payments",
                    description: "Bank-level security for all transactions"
                  },
                  {
                    icon: <Users className="h-8 w-8 text-[rgb(234,88,12)]" />,
                    title: "Direct Impact",
                    description: "100% of donations reach communities"
                  },
                  {
                    icon: <Clock className="h-8 w-8 text-[rgb(234,88,12)]" />,
                    title: "Quick Process",
                    description: "Donation process takes less than 2 minutes"
                  }
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      {feature.icon}
                    </div>
                    <p className="text-xs font-medium text-gray-600">{feature.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charity-dark mb-4 sm:mb-6">Ways to <span className="text-[rgb(234,88,12)]">Contribute</span></h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Multiple ways to support our mission and make a meaningful impact in tribal communities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                id: 'financial',
                title: "Financial Support",
                icon: <DollarSign className="h-8 w-8 text-blue-600" />,
                description: "Your monetary donations help us sustain and expand our programs",
                gradient: "bg-gradient-to-br from-blue-50 to-blue-100 border-b-4 border-blue-200",
                options: [
                  "Monthly recurring donations",
                  "One-time contributions",
                  "Program-specific funding",
                  "Emergency relief fund"
                ],
                impact: "₹1000 can provide medical care for 5 families",
                action: "Donate Now"
              },
              {
                id: 'material',
                title: "Material Donations",
                icon: <Package className="h-8 w-8 text-green-600" />,
                description: "Physical items and supplies that directly benefit tribal communities",
                gradient: "bg-gradient-to-br from-green-50 to-green-100 border-b-4 border-green-200",
                options: [
                  "Blankets and warm clothing",
                  "Educational materials and books",
                  "Medical supplies and medicines",
                  "School supplies and stationery"
                ],
                impact: "Your donated items reach families directly",
                action: "Donate Items"
              },
              {
                id: 'food',
                title: "Food Donations",
                icon: <Utensils className="h-8 w-8 text-orange-600" />,
                description: "Nutritious food items and groceries for tribal families and children",
                gradient: "bg-gradient-to-br from-orange-50 to-orange-100 border-b-4 border-orange-200",
                options: [
                  "Rice, wheat, and grains",
                  "Pulses and lentils",
                  "Cooking oil and spices",
                  "Nutritional supplements"
                ],
                impact: "Feed a family of 5 for a week",
                action: "Donate Food"
              },
              {
                id: 'volunteer',
                title: "Volunteer Support",
                icon: <Heart className="h-8 w-8 text-purple-600" />,
                description: "Various other ways you can contribute to our mission",
                gradient: "bg-gradient-to-br from-purple-50 to-purple-100 border-b-4 border-purple-200",
                options: [
                  "Volunteer your time and skills",
                  "Professional services (legal, medical)",
                  "Transportation assistance",
                  "Equipment and technology"
                ],
                impact: "Your skills and time are invaluable",
                action: "Volunteer Now"
              }
            ].map((type, index) => (
              <Card key={index} className="border-0 shadow-sm overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md rounded-2xl min-h-[420px]">
                <div className={`${type.gradient || 'bg-gradient-to-br from-gray-50 to-gray-100 border-b-4 border-gray-200'} p-6 rounded-t-2xl`}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-white shadow-sm">
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{type.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">What we accept:</h4>
                    <div className="space-y-2">
                      {type.options.slice(0, 4).map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    <span className="font-medium">Impact:</span> {type.impact}
                  </p>
                  <a 
                    href={type.id === 'material' ? 'https://forms.gle/voFpWeg3ERbv3p5f8' : type.id === 'food' ? 'https://forms.gle/XPqjosbawZnSem398' : type.id === 'volunteer' ? 'https://forms.gle/BQpVqtQqSq7dT1CW7' : '#'}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button 
                      className="w-full bg-[#1F2937] hover:bg-gray-800 text-white"
                    >
                      {type.action}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Pickup Service */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charity-dark mb-6">Volunteer <span className="text-[rgb(234,88,12)]">Pickup Service</span></h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Can't deliver your donations? No problem! Our dedicated volunteers can pick up 
              your material and food donations directly from your location.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-2xl shadow-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <div className="text-center p-6">
                <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Volunteer Pickup Service</h3>
                <p className="text-gray-500 mt-2">Serving with care and compassion</p>
              </div>
            </div>
            <div>
              <Card className="p-8 border-0 rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-charity-dark mb-6">
                    How Pickup Works
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        number: 1,
                        title: "Contact Us",
                        description: "Call or message us with details about your donation",
                        icon: <Phone className="h-5 w-5 text-white" />
                      },
                      {
                        number: 2,
                        title: "Schedule Pickup",
                        description: "We'll arrange a convenient time for collection",
                        icon: <Calendar className="h-5 w-5 text-white" />
                      },
                      {
                        number: 3,
                        title: "Safe Collection",
                        description: "Our volunteers will collect your donations safely",
                        icon: <Shield className="h-5 w-5 text-white" />
                      },
                      {
                        number: 4,
                        title: "Direct Impact",
                        description: "Your donations reach tribal communities quickly",
                        icon: <Heart className="h-5 w-5 text-white" />
                      }
                    ].map((step, index) => (
                      <div key={index} className="flex items-start space-x-4 p-5 rounded-3xl bg-white border border-gray-100 shadow-sm">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-[rgb(234,88,12)] flex items-center justify-center flex-shrink-0">
                            {step.icon}
                          </div>
                          {index < 3 && (
                            <div className="absolute left-5 top-10 w-0.5 h-6 bg-gray-200"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1 flex items-center">
                            <span className="mr-2">
                              {step.number}.
                            </span>
                            {step.title}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-[rgba(234,88,12,0.1)] flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-[rgb(234,88,12)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Need Help with Pickup?</p>
                        <p className="text-gray-600 text-sm">Our team is ready to assist you with scheduling</p>
                      </div>
                    </div>
                    <a 
                      href={`tel:${contactInfo.find(info => info.id === 'phone')?.link?.replace('tel:', '')}`} 
                      className="block w-full sm:w-auto px-4 sm:px-8 mx-auto mt-4 no-underline hover:no-underline hover:bg-transparent focus:bg-transparent active:bg-transparent visited:no-underline"
                      style={{ textDecoration: 'none !important' }}
                    >
                      <Button className="w-full bg-[rgb(234,88,12)] hover:bg-[rgba(234,88,12,0.9)] text-white text-sm py-3 sm:py-3 h-auto rounded-lg font-medium px-6 sm:px-8">
                        Schedule Pickup Now
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-charity-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charity-dark mb-6">
              Your <span className="text-[rgb(234,88,12)]">Impact</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              See how your donations create real change in tribal communities
            </p>
          </div>

          <div className="w-full overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="h-full"
              >
                <Card className="text-center p-4 sm:p-6 border-0 shadow-sm h-full hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="text-2xl sm:text-3xl font-bold text-[rgb(234,88,12)] mb-2 sm:mb-3 min-h-[3rem] flex items-center justify-center">
                      <Counter value={500} prefix="₹" duration={2} />
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 leading-snug">
                      Medical care for <Counter value={1} duration={2} /> family for a month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-full"
              >
                <Card className="text-center p-4 sm:p-6 border-0 shadow-sm h-full hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="text-2xl sm:text-3xl font-bold text-[rgb(234,88,12)] mb-2 sm:mb-3 min-h-[3rem] flex items-center justify-center">
                      <Counter value={1000} prefix="₹" duration={2} />
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 leading-snug">
                      Supports education for <Counter value={5} duration={2} /> children
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="h-full"
              >
                <Card className="text-center p-4 sm:p-6 border-0 shadow-sm h-full hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="text-2xl sm:text-3xl font-bold text-[rgb(234,88,12)] mb-2 sm:mb-3 min-h-[3rem] flex items-center justify-center">
                      <Counter value={2500} prefix="₹" duration={2} />
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 leading-snug">
                      Funds a health checkup camp
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="h-full"
              >
                <Card className="text-center p-4 sm:p-6 border-0 shadow-sm h-full hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="text-2xl sm:text-3xl font-bold text-[rgb(234,88,12)] mb-2 sm:mb-3 min-h-[3rem] flex items-center justify-center">
                      <Counter value={5000} prefix="₹" duration={2} />
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 leading-snug">
                      Vocational training for <Counter value={2} duration={2} /> women
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Commented out as per request
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
            Start Making a Difference Today
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of supporters who are helping us transform tribal communities. 
            Your contribution, no matter the size, creates lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-charity-dark text-charity-dark hover:bg-charity-dark hover:text-white px-8 py-3 text-base font-semibold rounded-full transition-all duration-300"
            >
              Become a Volunteer
            </Button>
          </div>
        </div>
      </section>
      */}

      <Footer />
      
      {/* Donation Modals */}

      {activeModal === 'material' && (
        <DonationModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Material Donation"
        >
          <MaterialDonationForm onClose={() => setActiveModal(null)} />
        </DonationModal>
      )}

      {activeModal === 'food' && (
        <DonationModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Food Donation"
        >
          <FoodDonationForm onClose={() => setActiveModal(null)} />
        </DonationModal>
      )}

      {activeModal === 'volunteer' && (
        <DonationModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Volunteer Support"
        >
          <VolunteerSupportForm onClose={() => setActiveModal(null)} />
        </DonationModal>
      )}
    </div>
  );
};

export default Donate;
