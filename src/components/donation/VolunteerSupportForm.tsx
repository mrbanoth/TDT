import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

const volunteerOptions = [
  { id: 'time', label: 'Volunteer my time and skills' },
  { id: 'professional', label: 'Professional services (legal, medical, etc.)' },
  { id: 'transportation', label: 'Transportation assistance' },
  { id: 'equipment', label: 'Equipment and technology' },
  { id: 'other', label: 'Other ways to help' },
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
    experience: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: !prev[optionId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 2) {
      setCurrentStep(2);
      return;
    }
    
    setIsSubmitting(true);
    
    // Prepare submission data
    const submissionData = {
      ...formData,
      supportTypes: Object.entries(selectedOptions)
        .filter(([_, isSelected]) => isSelected)
        .map(([id]) => id === 'other' ? otherOption : volunteerOptions.find(opt => opt.id === id)?.label),
      skills: [],
    };
    
    console.log('Volunteer form submitted:', submissionData);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {currentStep === 1 && (
        <>
          <h3 className="text-lg font-medium mb-4">How would you like to help?</h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-2">I can offer (select all that apply) *</p>
              <div className="space-y-2">
                {volunteerOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`option-${option.id}`}
                      checked={!!selectedOptions[option.id]}
                      onCheckedChange={() => handleOptionToggle(option.id)}
                    />
                    <label
                      htmlFor={`option-${option.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              
              {selectedOptions['other'] && (
                <div className="mt-2">
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
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <h3 className="text-lg font-medium mb-4">Your Contact Information</h3>
          <div className="space-y-4">
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
              <label className="block text-sm font-medium mb-1" htmlFor="address">
                Address
              </label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your address (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="experience">
                Relevant Experience
              </label>
              <Textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Tell us about any relevant experience or qualifications"
                rows={2}
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
                placeholder="Any other information you'd like to share"
                rows={2}
              />
            </div>
          </div>
        </>
      )}

      <div className="flex justify-between pt-4">
        {currentStep === 2 ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep(1)}
            disabled={isSubmitting}
          >
            Back
          </Button>
        ) : (
          <div></div>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {currentStep === 1 ? 'Continue' : 'Submit'}
            </>
          ) : currentStep === 1 ? (
            'Continue'
          ) : (
            'Submit'
          )}
        </Button>
      </div>
    </form>
  );
};

export default VolunteerSupportForm;
