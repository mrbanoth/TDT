import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface ProgramsDropdownProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

const ProgramsDropdown = ({ mobile = false, onItemClick }: ProgramsDropdownProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobileView = mobile || window.innerWidth < 1024; // lg breakpoint

  const programs = [
    { name: "Children's Programmes", path: "/programs/children" },
    { name: "Health Camps", path: "/programs/medical" },
    { name: "Women's Empowerment", path: "/programs/women" },
    { name: "Helping the Poor", path: "/programs/helping-poor" },
    { name: "Family Counseling", path: "/programs/counseling" },
  ];

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Desktop Dropdown - Just the dropdown items
  const renderDesktopDropdown = () => (
    <div className="py-1">
      {programs.map((program) => (
        <NavLink
          key={program.path}
          to={program.path}
          onClick={onItemClick}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
        >
          {program.name}
        </NavLink>
      ))}
      <div className="border-t border-gray-100 my-1" />
      <NavLink
        to="/programs/gallery"
        className="flex items-center px-4 py-2.5 text-sm font-medium text-primary bg-primary/5 rounded-md mx-2 my-1 transition-all duration-200 hover:bg-primary/10 hover:shadow-sm"
      >
        <ImageIcon className="h-4 w-4 mr-2" />
        View All Gallery
      </NavLink>
    </div>
  );

  // Mobile Dropdown with Programs link and submenu
  const renderMobileDropdown = () => (
    <div className="w-full">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMobileMenuOpen(!isMobileMenuOpen);
        }}
        className="w-full flex justify-between items-center px-4 py-3 text-base font-medium tracking-wide rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-50 hover:text-primary"
      >
        <div className="flex items-center">
          <span>OUR PROGRAMMES</span>
          <ChevronDown 
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </button>
      
      {isMobileMenuOpen && (
        <div className="pl-6 mt-1 space-y-1 border-l-2 border-gray-100 ml-4">
          {programs.map((program) => (
            <NavLink
              key={program.path}
              to={program.path}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg"
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.dispatchEvent(new Event('mobileMenuClose'));
              }}
            >
              {program.name}
            </NavLink>
          ))}
          <div className="border-t border-gray-100 my-1"></div>
          <NavLink
            to="/programs/gallery"
            className="flex items-center px-4 py-2.5 text-sm font-medium text-primary bg-primary/5 rounded-lg mx-1 my-1 transition-all duration-200 hover:bg-primary/10 hover:shadow-sm"
            onClick={() => {
              setIsMobileMenuOpen(false);
              document.dispatchEvent(new Event('mobileMenuClose'));
            }}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            View All Gallery
          </NavLink>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      {isMobileView ? renderMobileDropdown() : renderDesktopDropdown()}
    </div>
  );
};

export default ProgramsDropdown;
