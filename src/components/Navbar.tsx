import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import ProgramsDropdown from './ProgramsDropdown';

interface NavItem {
  name: string;
  path: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState<boolean>(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProgramsOpen(false);
  }, [location]);
  
  // Close programs dropdown when clicking outside or when route changes
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const handleClickOutsidePrograms = (event: MouseEvent) => {
      if (programsRef.current && !programsRef.current.contains(event.target as Node)) {
        // Add a small delay to allow for clicking on the dropdown items
        timer = setTimeout(() => {
          setIsProgramsOpen(false);
        }, 200);
      }
    };

    const handleRouteChange = () => {
      setIsProgramsOpen(false);
    };

    if (isProgramsOpen) {
      document.addEventListener('mousedown', handleClickOutsidePrograms);
      window.addEventListener('popstate', handleRouteChange);
    }
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutsidePrograms);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [isProgramsOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsProgramsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: NavItem[] = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'GET INVOLVED', path: '/get-involved' }
  ];

  // Mobile view uses the same nav items
  const mobileNavItems = [...navItems, { name: 'CONTACT', path: '/contact' }];

  return (
    <div className="relative" ref={menuRef}>
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm fixed w-full top-0 left-0 z-50 border-b border-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
                <img 
                  src="/tdtlogo.jpg" 
                  alt="Tribal Development Trust Logo"
                  className="h-10 w-auto object-contain"
                />
                <span className="hidden sm:block">
                  <h1 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 leading-tight whitespace-nowrap">
                    <span>Tribal</span> Development Trust
                  </h1>
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'text-orange-600 font-medium bg-orange-50' 
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              
              {/* Programs Dropdown */}
              <div 
                className="relative group"
                ref={programsRef}
                onMouseEnter={() => !isMenuOpen && setIsProgramsOpen(true)}
                onMouseLeave={(e) => {
                  if (!isMenuOpen && e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) {
                    return;
                  }
                  setIsProgramsOpen(false);
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProgramsOpen(!isProgramsOpen);
                  }}
                  onMouseEnter={() => !isMenuOpen && setIsProgramsOpen(true)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    location.pathname.startsWith('/programs') 
                      ? 'text-orange-600 font-medium bg-orange-50' 
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
                  }`}
                  aria-expanded={isProgramsOpen}
                  aria-haspopup="true"
                >
                  <span>OUR PROGRAMMES</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isProgramsOpen ? 'transform rotate-180 text-orange-600' : 'text-gray-500 group-hover:text-orange-600'
                    }`}
                    aria-hidden="true"
                  />
                </button>
                
                <div 
                  className={`absolute left-0 mt-2 w-[360px] bg-white shadow-lg z-50 transition-all duration-300 ease-out ${
                    isProgramsOpen 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                  style={{
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={() => !isMenuOpen && setIsProgramsOpen(true)}
                  onMouseLeave={() => !isMenuOpen && setIsProgramsOpen(false)}
                >
                  <ProgramsDropdown onItemClick={() => {
                    setIsProgramsOpen(false);
                    setIsMenuOpen(false);
                  }} />
                </div>
              </div>
              
              {/* Contact Link */}
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'text-orange-600 font-medium bg-orange-50' 
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
                  }`
                }
              >
                CONTACT
              </NavLink>
              
              <NavLink to="/donate" className="ml-6">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                  Donate Now
                </Button>
              </NavLink>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  if (!isMenuOpen) {
                    setIsProgramsOpen(false);
                  }
                }}
                className="flex flex-col items-center justify-center w-12 h-12 -mr-2 transition-all duration-200 focus:outline-none"
                aria-expanded={isMenuOpen}
              >
                <span 
                  className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'}`}
                ></span>
                <span 
                  className={`block h-0.5 w-6 bg-gray-800 transition-all duration-200 mt-1.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                ></span>
                <span 
                  className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 mt-1.5 ${isMenuOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'}`}
                ></span>
                <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity duration-300"
          onClick={() => {
            setIsMenuOpen(false);
            setIsProgramsOpen(false);
          }}
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full flex flex-col">
          {/* Close Button */}
          <div className="px-4 py-4 flex justify-end">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-2 space-y-2 flex-1 overflow-y-auto">
            {mobileNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-medium ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}

            {/* Programs Dropdown */}
            <div className="mt-2">
              <ProgramsDropdown 
                mobile={true} 
                onItemClick={() => {
                  setIsMenuOpen(false);
                  setIsProgramsOpen(false);
                }} 
              />
            </div>
          </nav>

          {/* Donate Button */}
          <div className="p-4 border-t">
            <NavLink 
              to="/donate" 
              className="block w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2">
                DONATE NOW
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
      
      {/* Spacer to push content below fixed navbar */}
      <div className="h-16"></div>
    </div>
  );
};

export default Navbar;
