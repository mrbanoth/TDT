// src/components/ProgramDetailsCard.tsx
import { Calendar, MapPin, Users as UsersIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProgramDetailsCardProps {
  programType?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
    button: string;
  };
  duration?: string;
  beneficiaries?: string;
  location?: string;
}

export const ProgramDetailsCard = ({ 
  programType, 
  colors, 
  duration: propDuration, 
  beneficiaries: propBeneficiaries,
  location: propLocation
}: ProgramDetailsCardProps) => {
  // No default values - we'll only show Contentful data or 'Coming Soon'
  
  // Clean and format the data before displaying
  const cleanText = (text: string | undefined) => {
    if (!text || typeof text !== 'string' || text.trim() === '') return null;
    // Remove duplicate words and extra commas
    const words = text.split(',').map(w => w.trim()).filter(Boolean);
    const uniqueWords = [...new Set(words)];
    return uniqueWords.join(', ');
  };

  // Get display values with placeholders for missing data
  const defaultMessage = "Coming Soon";
  const hasDuration = cleanText(propDuration) !== null;
  const hasLocation = cleanText(propLocation) !== null;
  const hasBeneficiaries = cleanText(propBeneficiaries) !== null;
  
  const displayDuration = hasDuration ? cleanText(propDuration) : defaultMessage;
  const displayLocation = hasLocation ? cleanText(propLocation) : defaultMessage;
  const displayBeneficiaries = hasBeneficiaries ? cleanText(propBeneficiaries) : defaultMessage;
  
  // Show the general message if any data is missing
  const showGeneralMessage = !hasDuration || !hasLocation || !hasBeneficiaries;

  return (
    <div className={`p-6 rounded-lg ${colors?.bg || 'bg-white'} border ${colors?.border || 'border-gray-200'}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Program Details</h3>
      <div className="space-y-4">
        <div className="flex items-start">
          <Calendar className={`h-5 w-5 ${colors?.text || 'text-gray-500'} flex-shrink-0 mt-0.5`} />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Duration</p>
            <p className="text-sm text-gray-900">
              {displayDuration}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <MapPin className={`h-5 w-5 ${colors?.text || 'text-gray-500'} flex-shrink-0 mt-0.5`} />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Location</p>
            <p className="text-sm text-gray-900">
              {displayLocation}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <UsersIcon className={`h-5 w-5 ${colors?.text || 'text-gray-500'} flex-shrink-0 mt-0.5`} />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Beneficiaries</p>
            <p className="text-sm text-gray-900">
              {displayBeneficiaries}
            </p>
          </div>
        </div>
        
        {showGeneralMessage && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md">
            <p className="text-sm text-blue-700 text-center">
              Program details will be available soon. Please check back later for updates.
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <Link
          to="/contact"
          className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white ${
            colors?.button || 'bg-orange-600 hover:bg-orange-700'
          } shadow-sm hover:shadow-md transition-all duration-200`}
        >
          Get Involved
        </Link>
      </div>
    </div>
  );
};