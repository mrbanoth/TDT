import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, ArrowLeft, MapPin } from 'lucide-react';
import { StepIndicator } from '@/components/ui/StepIndicator';

const volunteerOptions = [
  { id: 'time', label: 'Volunteer my time and skills' },
  { id: 'professional', label: 'Professional services (legal, medical, etc.)' },
  { id: 'transportation', label: 'Transportation assistance' },
  { id: 'equipment', label: 'Equipment and technology' },
  { id: 'other', label: 'Other ways to help' },
];

const formSteps = [
  'Volunteer Details',
  'Contact Information',
  'Review & Submit'
];

interface VolunteerSupportFormProps {
  onClose: () => void;
}

export const VolunteerSupportForm = ({ onClose }: VolunteerSupportFormProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});
  const [otherOption, setOtherOption] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    availability: '',
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

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: !prev[optionId]
    }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < formSteps.length - 1) {
      nextStep();
      return;
    }
    
    setIsSubmitting(true);
    
    // Prepare submission data
    const submissionData = {
      ...formData,
      supportTypes: Object.entries(selectedOptions)
        .filter(([_, isSelected]) => isSelected)
        .map(([id]) => id === 'other' ? otherOption : volunteerOptions.find(opt => opt.id === id)?.label)
    };
    
    console.log('Volunteer form submitted:', submissionData);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 2000);
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
            className="space-y-6"
          >
            <div>
              <h4 className="text-sm font-medium mb-3">How can you help? (select all that apply) *</h4>
              <div className="space-y-2">
                {volunteerOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={option.id}
                      checked={!!selectedOptions[option.id]}
                      onCheckedChange={() => handleOptionToggle(option.id)}
                    />
                    <label
                      htmlFor={option.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>

              {selectedOptions['other'] && (
                <div className="mt-4">
                  <Input
                    type="text"
                    value={otherOption}
                    onChange={(e) => setOtherOption(e.target.value)}
                    placeholder="Please specify how you'd like to help"
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="availability">
                When are you available? *
              </label>
              <Input
                type="text"
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                placeholder="e.g., Weekends, Evenings, Specific dates"
                required
              />
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
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="phone">
                  Phone Number *
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
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email Address *
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
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium" htmlFor="address">
                  Address (Optional)
                </label>
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                  disabled={isLocating}
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  {isLocating ? 'Locating...' : 'Use my location'}
                </button>
              </div>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your address (optional)"
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
              <h4 className="font-medium">Volunteer Details:</h4>
              <div className="space-y-2">
                <div className="text-sm">
                  <p className="font-medium mb-1">How you can help:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {Object.entries(selectedOptions)
                      .filter(([_, isSelected]) => isSelected)
                      .map(([id]) => {
                        const option = volunteerOptions.find(opt => opt.id === id);
                        return (
                          <li key={id}>
                            {id === 'other' ? otherOption : option?.label}
                          </li>
                        );
                      })}
                  </ul>
                </div>
                {formData.availability && (
                  <p className="text-sm">
                    <span className="font-medium">Availability:</span>{' '}
                    {formData.availability}
                  </p>
                )}
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
                  ? 'Submit' 
                  : 'Continue'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VolunteerSupportForm;
