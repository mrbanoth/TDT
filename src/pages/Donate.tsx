
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Package, Utensils, Gift, Heart, Phone, Shield, Users, Clock, Calendar } from 'lucide-react';

const Donate = () => {
  const donationTypes = [
    {
      title: "Financial Donations",
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
      description: "Monetary contributions that help fund our various programs and services",
      gradient: "bg-gradient-to-br from-blue-50 to-blue-100 border-b-4 border-blue-200",
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
      title: "Material Donations",
      icon: <Package className="h-8 w-8 text-green-600" />,
      description: "Physical items and supplies that directly benefit tribal communities",
      gradient: "bg-gradient-to-br from-green-50 to-green-100 border-b-4 border-green-200",
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
      title: "Food Donations",
      icon: <Utensils className="h-8 w-8 text-orange-600" />,
      description: "Nutritious food items and groceries for tribal families and children",
      gradient: "bg-gradient-to-br from-orange-50 to-orange-100 border-b-4 border-orange-200",
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
      title: "Volunteer Support",
      icon: <Heart className="h-8 w-8 text-purple-600" />,
      description: "Various other ways you can contribute to our mission",
      gradient: "bg-gradient-to-br from-purple-50 to-purple-100 border-b-4 border-purple-200",
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
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure Payments",
      description: "Bank-level security for all transactions"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Direct Impact",
      description: "100% of donations reach communities"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
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
                <span className="block text-secondary">Difference</span>
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

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-charity-dark mb-6">Quick Donation</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? 'default' : 'outline'}
                    onClick={() => handleAmountClick(amount)}
                    className={`h-14 text-lg font-semibold transition-all duration-200 ${
                      selectedAmount === amount 
                        ? 'bg-charity-dark text-white hover:bg-charity-dark/90 border-charity-dark' 
                        : 'bg-white text-charity-dark border-2 border-gray-200 hover:border-charity-dark hover:bg-gray-50 hover:text-charity-dark'
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
                    className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-charity-dark focus:ring-2 focus:ring-charity-dark/20 focus:outline-none text-lg font-medium"
                  />
                </div>
                <Button 
                  className="w-full bg-charity-dark hover:bg-charity-dark/90 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
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
            <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
              Ways to Contribute
            </h2>
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
                      className="w-full text-sm py-3 h-auto rounded-xl font-medium transition-all duration-200 bg-gray-900 hover:bg-gray-800 text-white"
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
            <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
              Volunteer Pickup Service
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Can't deliver your donations? No problem! Our dedicated volunteers can pick up 
              your material and food donations directly from your location.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3" 
                alt="Volunteer pickup service" 
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
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
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
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
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Need Help with Pickup?</p>
                        <p className="text-gray-600 text-sm">Our team is ready to assist you with scheduling</p>
                      </div>
                    </div>
                    <a href="tel:9390730129" className="block w-full sm:w-auto px-4 sm:px-8 mx-auto mt-4">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white text-sm py-3 sm:py-3 h-auto rounded-full font-medium px-6 sm:px-8">
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
            <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
              Your Impact
            </h2>
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
                    <div className="text-2xl sm:text-3xl font-bold text-primary mb-2 sm:mb-3">
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

      {/* Call to Action */}
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

      <Footer />
    </div>
  );
};

export default Donate;
