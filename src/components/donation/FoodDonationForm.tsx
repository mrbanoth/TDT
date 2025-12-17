import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

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

export const FoodDonationForm = ({ onClose }: FoodDonationFormProps) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [otherItem, setOtherItem] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    quantity: '',
    expiryDate: '',
    notes: '',
    pickupRequired: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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
    if (currentStep < 2) {
      setCurrentStep(2);
      return;
    }
    
    setIsSubmitting(true);
    // Handle form submission
    const donationData = {
      ...formData,
      foodItems: Object.entries(selectedItems)
        .filter(([_, isSelected]) => isSelected)
        .map(([id]) => id === 'other' ? otherItem : foodItems.find(item => item.id === id)?.label),
    };
    
    console.log('Food donation submitted:', donationData);
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
          <h3 className="text-lg font-medium mb-4">Food Donation Details</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Select food items you'd like to donate *</p>
              <div className="space-y-2">
                {foodItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={!!selectedItems[item.id]}
                      onCheckedChange={() => handleItemToggle(item.id)}
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
              
              {selectedItems['other'] && (
                <div className="mt-2">
                  <Input
                    type="text"
                    value={otherItem}
                    onChange={(e) => setOtherItem(e.target.value)}
                    placeholder="Please specify the food items"
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="quantity">
                  Approximate Quantity *
                </label>
                <Input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 5kg, 2 packets"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="expiryDate">
                  Pickup service date *
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

            <div className="pt-2">
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
                placeholder="Any special instructions or additional information about the food items"
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

export default FoodDonationForm;
