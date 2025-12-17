import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, ArrowLeft, MapPin } from 'lucide-react';
import { StepIndicator } from '@/components/ui/StepIndicator';

const foodItems = [
  { id: 'rice', label: 'Rice, wheat, and grains' },
  { id: 'pulses', label: 'Pulses and lentils' },
  { id: 'oil', label: 'Cooking oil' },
  { id: 'spices', label: 'Spices' },
  { id: 'supplements', label: 'Nutritional supplements' },
  { id: 'other', label: 'Other food items' },
];

interface FoodDonationFormProps {
  onClose: () => void;
}

const formSteps = [
  'Food Details',
  'Contact Info',
  'Review & Submit'
];

export const FoodDonationForm = ({ onClose }: FoodDonationFormProps) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [otherItem, setOtherItem] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    expiryDate: '',
    needsPickup: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsSubmitting(true);
    
    // Prepare submission data
    const submissionData = {
      ...formData,
      foodItems: Object.entries(selectedItems)
        .filter(([_, isSelected]) => isSelected)
        .map(([id]) => {
          if (id === 'other') return otherItem;
          return foodItems.find(item => item.id === id)?.label || id;
        })
    };
    
    console.log('Food donation form submitted:', submissionData);
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
              <h4 className="text-sm font-medium mb-3">Select food items you'd like to donate:</h4>
              <div className="space-y-2">
                {foodItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={item.id}
                      checked={!!selectedItems[item.id]}
                      onCheckedChange={() => {
                        setSelectedItems(prev => ({
                          ...prev,
                          [item.id]: !prev[item.id]
                        }));
                      }}
                    />
                    <label
                      htmlFor={item.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>

              {selectedItems.other && (
                <div className="mt-4">
                  <Input
                    type="text"
                    value={otherItem}
                    onChange={(e) => setOtherItem(e.target.value)}
                    placeholder="Please specify other food items"
                    className="mt-2"
                  />
                </div>
              )}

              <div className="mt-4">
                <label className="block text-sm font-medium mb-1" htmlFor="expiryDate">
                  Preferred Pickup Date *
                </label>
                <Input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
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
                  disabled={isLocating}
                >
                  {isLocating ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <MapPin className="h-3 w-3" />
                  )}
                  {isLocating ? 'Locating...' : 'Auto-fill location'}
                </button>
              </div>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={formData.needsPickup 
                  ? 'Please provide complete address for pickup' 
                  : 'Your address (optional)'}
                rows={2}
                required={formData.needsPickup}
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h4 className="font-medium">Food Items:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {Object.entries(selectedItems)
                  .filter(([_, isSelected]) => isSelected)
                  .map(([id]) => {
                    const item = foodItems.find(item => item.id === id);
                    return (
                      <li key={id}>
                        {id === 'other' ? otherItem : item?.label}
                      </li>
                    );
                  })}
              </ul>
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">Quantity: {formData.quantity}</p>
                <p className="text-sm text-muted-foreground">Pickup Date: {formData.expiryDate}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Contact Information:</h4>
              <p className="text-sm">{formData.name}</p>
              <p className="text-sm text-muted-foreground">{formData.email}</p>
              <p className="text-sm text-muted-foreground">{formData.phone}</p>
              {formData.address && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Address:</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{formData.address}</p>
                </div>
              )}
            </div>

            {formData.notes && (
              <div>
                <h4 className="font-medium">Special Instructions:</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{formData.notes}</p>
              </div>
            )}
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

export default FoodDonationForm;
