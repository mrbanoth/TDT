import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface ProgramsDropdownProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

const ProgramsDropdown = ({ mobile = false, onItemClick }: ProgramsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const programs = [
    { name: "Children's Programmes", path: "/programs/children" },
    { name: "Health Camps", path: "/programs/medical" },
    { name: "Women's Empowerment", path: "/programs/women" },
    { name: "Helping the Poor", path: "/programs/helping-poor" },
    { name: "Family Counseling", path: "/programs/counseling" },
    { name: "Gallery", path: "/programs/gallery", isSpecial: true }
  ];
  
  const dropdownItems = programs;

  // Close menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
    if (onItemClick) onItemClick();
  };

  if (mobile) {
    return (
      <div className="w-full">
        <button
          onClick={toggleMenu}
          className="w-full flex justify-between items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
        >
          <span>OUR PROGRAMMES</span>
          <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="pl-2 mt-1 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {dropdownItems
                .filter(program => program.name !== 'Gallery')
                .map((program) => (
                  <NavLink
                    key={program.path}
                    to={program.path}
                    className={`px-2 py-2 text-xs text-center rounded border transition-colors ${
                      location.pathname === program.path
                        ? 'bg-orange-50 text-orange-600 border-orange-200 font-medium'
                        : 'text-gray-700 hover:bg-gray-50 border-gray-200'
                    }`}
                    onClick={handleItemClick}
                  >
                    {program.name}
                  </NavLink>
                ))}
            </div>
            
            {/* Mobile Gallery Button */}
            <NavLink 
              to="/programs/gallery" 
              className="block mt-2"
              onClick={handleItemClick}
            >
              <Button 
                variant="outline" 
                size="sm"
                className="w-full bg-white text-orange-600 border-orange-300 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-400 text-xs py-1.5 h-auto"
              >
                Gallery
              </Button>
            </NavLink>
          </div>
        )}
      </div>
    );
  }

  // Desktop view with 2x2 grid layout
  return (
    <div className="w-[360px] p-3">
      <div className="grid grid-cols-2 gap-2 w-full">
        {programs.filter(p => !p.isSpecial).map((program) => (
          <NavLink
            key={program.path}
            to={program.path}
            className={`px-3 py-2.5 text-sm text-center transition-colors border-0 ${
              location.pathname === program.path
                ? 'bg-orange-50 text-orange-600 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={onItemClick}
          >
            {program.name}
          </NavLink>
        ))}
      </div>
      
      {/* Gallery Button */}
      <div className="mt-3 border-t border-gray-100 pt-3">
        <NavLink 
          to="/programs/gallery" 
          className="block w-full"
          onClick={onItemClick}
        >
          <Button 
            variant="outline" 
            className="w-full bg-white text-orange-600 border-orange-300 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-400 transition-all duration-200 text-sm py-2 h-auto rounded-none"
          >
            Gallery
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default ProgramsDropdown;
