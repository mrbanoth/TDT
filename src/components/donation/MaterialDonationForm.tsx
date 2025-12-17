import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

interface MaterialDonationFormProps {
  onClose: () => void;
}

export const MaterialDonationForm = ({ onClose }: MaterialDonationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    itemType: '',
    description: '',
    quantity: '',
    pickupRequired: false,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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
    if (currentStep < 2) {
      setCurrentStep(2);
      return;
    }
    
    setIsSubmitting(true);
    // Handle form submission
    console.log('Form submitted:', formData);
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
          <h3 className="text-lg font-medium mb-4">Material Donation Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="itemType">
                Type of Item *
              </label>
              <Select 
                name="itemType" 
                value={formData.itemType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, itemType: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
                <SelectContent>
                  {itemTypes.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="pickupRequired" 
                    name="pickupRequired"
                    checked={formData.pickupRequired}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, pickupRequired: Boolean(checked) }))
                    }
                  />
                  <label htmlFor="pickupRequired" className="text-sm font-medium">
                    I need pickup service
                  </label>
                </div>
              </div>
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
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="address">
                {formData.pickupRequired ? 'Pickup Address *' : 'Address (Optional)'}
              </label>
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
              {currentStep === 1 ? 'Continue' : 'Submit Donation'}
            </>
          ) : currentStep === 1 ? (
            'Continue'
          ) : (
            'Submit Donation'
          )}
        </Button>
      </div>
    </form>
  );
};

export default MaterialDonationForm;
