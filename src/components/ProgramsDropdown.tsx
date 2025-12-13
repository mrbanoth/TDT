import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

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
    { name: "Gallery", path: "/programs/gallery" }
  ];
  
  // Filter out the main programs link from the dropdown
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
          <div className="pl-4 mt-1 space-y-1">
            {dropdownItems.map((program) => (
              <NavLink
                key={program.path}
                to={program.path}
                className={`block px-4 py-2.5 text-sm rounded-lg ${
                  program.name === 'Gallery' 
                    ? 'text-orange-600 font-medium bg-orange-50' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={handleItemClick}
              >
                {program.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop view - This is just the dropdown content, no heading needed here
  return (
    <div className="space-y-1">
      {programs.map((program) => (
        <NavLink
          key={program.path}
          to={program.path}
          className={`block px-4 py-2.5 text-sm ${
            program.name === 'Gallery' 
              ? 'text-orange-600 font-medium bg-orange-50' 
              : 'text-gray-700 hover:bg-gray-50'
          }`}
          onClick={onItemClick}
        >
          {program.name}
        </NavLink>
      ))}
    </div>
  );
};

export default ProgramsDropdown;
