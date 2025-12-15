import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DonationModal } from '@/components/DonationModal';
import { contactInfo } from '@/data/contact/info';
import { DollarSign, Package, Utensils, Gift, Heart, Phone, Shield, Users, Clock, Calendar, X } from 'lucide-react';

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
    amount: '',
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
    
    // Simulate form submission
    setTimeout(() => {
      // For demo purposes, we'll use a test payment gateway
      const paymentData = {
        amount: formData.amount || '100', // Default to 100 if no amount selected
        currency: 'INR',
        name: formData.name || 'Anonymous Donor',
        email: formData.email || '',
        phone: formData.phone || '',
        description: 'Donation to Tribal Development Trust'
      };
      
      // Form submission logic here
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: '',
        amount: '',
        donationType: ''
      });
      
      // Close modal after a short delay
      setTimeout(() => {
        setActiveModal(null);
        setIsSubmitting(false);
      }, 1000);
      
    }, 1000); // Simulate network delay
  };

  const renderModalHeader = () => {
    if (activeModal === 'financial') {
      return (
        <div className="flex items-center justify-between w-full">
          <h3 className="text-xl font-bold text-gray-900">
            {donationTypes.find(t => t.id === activeModal)?.title} - Donation Form
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 mr-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-5 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" alt="Paytm" className="h-5 object-contain" />
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-between w-full">
        <h3 className="text-xl font-bold text-gray-900">
          {donationTypes.find(t => t.id === activeModal)?.title} - Donation Form
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
      case 'financial':
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[100, 500, 1000, 2000, 5000, 'Other'].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, amount: amount === 'Other' ? '' : String(amount) }))}
                    className={`p-2 border rounded-lg text-sm ${formData.amount === String(amount) ? 'bg-[rgb(234,88,12)] text-white' : 'bg-white hover:bg-gray-50'}`}
                  >
                    {amount === 'Other' ? 'Other' : `₹${amount}`}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <h4 className="font-medium">Payment Method</h4>
              <div className="space-y-2">
                {['Credit/Debit Card', 'UPI', 'Net Banking', 'PayPal'].map(method => (
                  <label key={method} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="radio" name="paymentMethod" className="h-4 w-4 text-[rgb(234,88,12)]" />
                    <span className="text-sm">{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        );
      
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
                      <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Use Current Location
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
                placeholder="Enter your address for pickup"
                required
              />
              {locationError && formData.address === '' && (
                <p className="mt-1 text-xs text-red-600">{locationError}</p>
              )}
            </div>
          </div>
        );
      
      case 'food':
        return (
          <div className="space-y-4">
            {renderContactFields()}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type of Food</label>
              <select
                name="donationType"
                value={formData.donationType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select food type</option>
                <option value="grains">Grains & Pulses</option>
                <option value="packaged">Packaged Food</option>
                <option value="fresh">Fresh Produce</option>
                <option value="cooked">Cooked Meals</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g., 5kg rice, 10 packets, etc."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (if applicable)</label>
              <input
                type="date"
                name="expiryDate"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Pickup/Delivery Details</label>
                <button
                  type="button"
                  onClick={() => handleGetCurrentLocation('message')}
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
                      <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Use Current Location
                    </span>
                  )}
                </button>
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Any special instructions or your current address for pickup"
              />
              {locationError && formData.message === '' && (
                <p className="mt-1 text-xs text-red-600">{locationError}</p>
              )}
            </div>
          </div>
        );
      
      case 'volunteer':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
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
                  pattern="[0-9]{10}"
                  title="Please enter a 10-digit mobile number"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">How to help?</label>
                <select
                  name="donationType"
                  value={formData.donationType}
                  onChange={handleInputChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select</option>
                  <option value="teaching">Teaching/Education</option>
                  <option value="medical">Medical Services</option>
                  <option value="events">Event Volunteering</option>
                  <option value="skills">Professional Skills</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Availability</label>
              <div className="grid grid-cols-3 gap-1 text-xs">
                {['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings', 'Flexible'].map(option => (
                  <label key={option} className="flex items-center space-x-1">
                    <input type="checkbox" className="h-3 w-3 text-[rgb(234,88,12)] rounded" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">About You</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={2}
                className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                placeholder="Your skills, experience, and why you want to volunteer"
                required
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const donationTypes = [
    {
      title: "Financial Donations",
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
      description: "Monetary contributions that help fund our various programs and services",
      gradient: "bg-gradient-to-br from-[rgba(234,88,12,0.05)] to-[rgba(234,88,12,0.1)] border-b-4 border-[rgba(234,88,12,0.2)]",
      options: [
        "Monthly recurring donations",
        "One-time contributions",
        "Program-specific funding",
        "Emergency relief fund",
        "Educational scholarships",
        "Health camp support"
      ],
      impact: "₹1000 can provide medical care for 5 families",
      action: "Donate Money"
    },
    {
      id: 'material',
      title: "Material Donations",
      icon: <Package className="h-8 w-8 text-green-600" />,
      description: "Physical items and supplies that directly benefit tribal communities",
      gradient: "bg-gradient-to-br from-[rgba(234,88,12,0.05)] to-[rgba(234,88,12,0.1)] border-b-4 border-[rgba(234,88,12,0.2)]",
      options: [
        "Blankets and warm clothing",
        "Educational materials and books",
        "Medical supplies and medicines",
        "School supplies and stationery",
        "Sports equipment",
        "Hygiene and sanitation items"
      ],
      impact: "Your donated items reach families directly",
      action: "Donate Materials"
    },
    {
      id: 'food',
      title: "Food Donations",
      icon: <Utensils className="h-8 w-8 text-orange-600" />,
      description: "Nutritious food items and groceries for tribal families and children",
      gradient: "bg-gradient-to-br from-[rgba(234,88,12,0.05)] to-[rgba(234,88,12,0.1)] border-b-4 border-[rgba(234,88,12,0.2)]",
      options: [
        "Rice, wheat, and grains",
        "Pulses and lentils",
        "Cooking oil and spices",
        "Nutritional supplements",
        "Baby food and formula",
        "Fresh fruits and vegetables"
      ],
      impact: "Feed a family of 5 for a week",
      action: "Donate Food"
    },
    {
      id: 'volunteer',
      title: "Volunteer Support",
      icon: <Heart className="h-8 w-8 text-purple-600" />,
      description: "Various other ways you can contribute to our mission",
      gradient: "bg-gradient-to-br from-[rgba(234,88,12,0.05)] to-[rgba(234,88,12,0.1)] border-b-4 border-[rgba(234,88,12,0.2)]",
      options: [
        "Volunteer your time and skills",
        "Professional services (legal, medical)",
        "Transportation assistance",
        "Equipment and technology",
        "Event sponsorship",
        "Awareness campaigns"
      ],
      impact: "Your skills and time are invaluable",
      action: "Get Involved"
    }
  ];

  const features = [
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
  ];

  const quickAmounts = [500, 1000, 2500, 5000, 10000];
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    // If the custom amount matches one of the quick amounts, update selectedAmount
    const numValue = parseInt(value.replace(/\D/g, ''));
    if (quickAmounts.includes(numValue)) {
      setSelectedAmount(numValue);
    } else {
      setSelectedAmount(null);
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
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? 'default' : 'outline'}
                    onClick={() => handleAmountClick(amount)}
                    className={`h-14 text-lg font-semibold transition-all duration-200 ${
                      selectedAmount === amount 
                        ? 'bg-[rgb(234,88,12)] text-white hover:bg-[rgba(234,88,12,0.9)] border-[rgb(234,88,12)]' 
                        : 'bg-white text-charity-dark border-2 border-gray-200 hover:border-[rgb(234,88,12)] hover:bg-gray-50 hover:text-charity-dark'
                    }`}
                  >
                    ₹{amount.toLocaleString('en-IN')}
                  </Button>
                ))}
                <Button
                  variant={!quickAmounts.includes(Number(customAmount)) && customAmount ? 'default' : 'outline'}
                  className={`h-14 text-lg font-semibold transition-all duration-200 ${
                    !quickAmounts.includes(Number(customAmount)) && customAmount 
                      ? 'bg-charity-dark text-white hover:bg-charity-dark/90 border-charity-dark' 
                      : 'bg-white text-charity-dark border-2 border-gray-200 hover:border-charity-dark hover:bg-gray-50 hover:text-charity-dark'
                  }`}
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
                    value={customAmount}
                    onChange={handleCustomAmountChange}
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
                {features.map((feature, index) => (
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
            {donationTypes.map((type, index) => (
              <Card key={index} className="border-0 shadow-sm overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md rounded-2xl min-h-[420px]">
                <div className={`${type.gradient} p-6 rounded-t-2xl`}>
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
                          <span className="text-sm text-gray-600 leading-relaxed">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-2">
                    <div className="bg-blue-50 p-3 rounded-xl mb-4 border border-blue-100">
                      <p className="text-blue-700 font-medium text-sm flex items-start">
                        <span className="mr-2">💡</span>
                        <span>{type.impact}</span>
                      </p>
                    </div>
                    
                    <Button 
                      className="w-full text-sm py-3 h-auto rounded-lg font-medium transition-all duration-200 bg-gray-900 hover:bg-gray-800 text-white"
                      onClick={() => setActiveModal(type.id)}
                    >
                      {type.action}
                    </Button>
                  </div>
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charity-dark mb-6">Your <span className="text-[rgb(234,88,12)]">Impact</span></h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              See how your donations create real change in tribal communities
            </p>
          </div>

          <div className="w-full overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                {[
                { amount: "₹500", impact: "Medical care for 1 family for a month" },
                { amount: "₹1,000", impact: "Supports education for 5 children" },
                { amount: "₹2,500", impact: "Funds a health checkup camp" },
                { amount: "₹5,000", impact: "Vocational training for 2 women" }
              ].map((item, index) => (
                <Card key={index} className="text-center p-4 sm:p-6 border-0 shadow-sm h-full">
                  <CardContent className="p-0">
                    <div className="text-2xl sm:text-3xl font-bold text-[rgb(234,88,12)] mb-2 sm:mb-3">
                      {item.amount}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 leading-snug">
                      {item.impact}
                    </p>
                  </CardContent>
                </Card>
              ))}
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
              className="bg-charity-dark text-white hover:bg-charity-dark/90 px-8 py-3 text-base font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              onClick={() => setActiveModal('financial')}
            >
              Donate Now
            </Button>
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
      {donationTypes.map((type) => (
        <DonationModal
          key={type.id}
          isOpen={activeModal === type.id}
          onClose={() => setActiveModal(null)}
          title={type.title}
          customHeader={renderModalHeader()}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderModalContent()}
            <div className="mt-6">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : `Submit ${type.title}`}
              </Button>
            </div>
          </form>
        </DonationModal>
      ))}
    </div>
  );
};

export default Donate;
