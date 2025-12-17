import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const StepIndicator = ({ steps, currentStep, className = '' }: StepIndicatorProps) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium relative
                  ${isCompleted 
                    ? 'bg-green-500 text-white' 
                    : isActive 
                      ? 'bg-[#1F2937] text-white ring-2 ring-offset-2 ring-[#1F2937]' 
                      : 'bg-gray-200 text-gray-600'
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              <div 
                className={`mt-2 text-xs text-center ${isActive ? 'text-[#1F2937] font-medium' : 'text-gray-500'}`}
              >
                {step}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-full -mt-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
