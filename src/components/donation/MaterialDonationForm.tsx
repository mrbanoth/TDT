import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, ArrowLeft, MapPin } from 'lucide-react';
import { StepIndicator } from '@/components/ui/StepIndicator';

interface MaterialDonationFormProps {
  onClose: () => void;
}

const formSteps = [
  'Item Details',
  'Contact Info',
  'Review & Submit'
];

export const MaterialDonationForm = ({ onClose }: MaterialDonationFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    itemType: '',
    description: '',
    quantity: '',
    condition: 'Good',
    needsPickup: false,
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          if (data.display_name) {
            setFormData(prev => ({
              ...prev,
              address: data.display_name
            }));
          }
        } catch (error) {
          console.error('Error getting address from coordinates:', error);
          alert('Could not retrieve address. Please enter it manually.');
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Could not get your location. Please enter your address manually.');
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const itemTypes = [
    'Blankets and warm clothing',
    'Educational materials and books',
    'Medical supplies and medicines',
    'School supplies and stationery',
    'Other'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle form submission
    console.log('Form submitted:', formData);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="itemType">
                Type of Item *
              </label>
              <select
                id="itemType"
                name="itemType"
                value={formData.itemType}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Select item type</option>
                {itemTypes.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Description *
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please describe the items you're donating"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="quantity">
                  Quantity *
                </label>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="condition">
                  Condition
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="New">New</option>
                  <option value="Good">Good</option>
                  <option value="Used">Used</option>
                  <option value="Needs Repair">Needs Repair</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="needsPickup" 
                checked={formData.needsPickup}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, needsPickup: checked as boolean }))
                }
              />
              <label
                htmlFor="needsPickup"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I need pickup service
              </label>
            </div>
          </motion.div>
        );
      
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Full Name *
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email *
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="phone">
                  Phone *
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium" htmlFor="address">
                  {formData.needsPickup ? 'Pickup Address *' : 'Address (Optional)'}
                </label>
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  title="Use my current location"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Auto-fill location
                </button>
              </div>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={formData.pickupRequired 
                  ? 'Please provide complete address for pickup' 
                  : 'Your address (optional)'}
                rows={2}
                required={formData.pickupRequired}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="notes">
                Additional Notes
              </label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions or additional information"
                rows={2}
              />
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <StepIndicator 
          steps={formSteps} 
          currentStep={currentStep} 
          className="max-w-md mx-auto mb-6"
        />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>

        <div className="flex justify-between pt-6 border-t border-gray-200">
          <div className="flex-1">
            {currentStep > 0 && (
              <Button 
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isSubmitting}
                className="flex items-center gap-2 min-w-[100px]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
          </div>
          
          <div className="flex-1 flex justify-end">
            <Button 
              type={currentStep === formSteps.length - 1 ? 'submit' : 'button'}
              onClick={currentStep < formSteps.length - 1 ? nextStep : undefined}
              disabled={isSubmitting}
              className="bg-[#1F2937] hover:bg-gray-800 min-w-[120px] justify-center"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {isSubmitting 
                ? 'Processing...' 
                : currentStep === formSteps.length - 1 
                  ? 'Submit Donation' 
                  : 'Continue'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MaterialDonationForm;
