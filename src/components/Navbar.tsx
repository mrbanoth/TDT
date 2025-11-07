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
    { name: 'EVENTS', path: '/events' },
    { name: 'CONTACT', path: '/contact' },
  ];

  // Mobile view uses the same nav items
  const mobileNavItems = [...navItems];

  return (
    <div className="relative" ref={menuRef}>
      <nav className="bg-white shadow-lg fixed w-full top-0 left-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex items-center space-x-2">
                <img 
                  src="/tdtlogo.jpg" 
                  alt="Tribal Development Trust Logo"
                  className="h-10 w-auto object-contain"
                />
                <span className="hidden sm:block">
                  <h1 className="text-xs sm:text-sm md:text-lg font-bold text-charity-dark leading-tight whitespace-nowrap font-serif">
                    Tribal Development Trust
                  </h1>
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                        isActive 
                          ? 'text-primary font-semibold' 
                          : 'text-gray-700 hover:text-primary hover:font-medium'
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
                    if (!isMenuOpen && !e.currentTarget.contains(e.relatedTarget as Node)) {
                      setIsProgramsOpen(false);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsProgramsOpen(!isProgramsOpen);
                      }}
                      onMouseEnter={() => !isMenuOpen && setIsProgramsOpen(true)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                        location.pathname.startsWith('/programs') 
                          ? 'text-primary font-semibold bg-primary/5' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                      }`}
                      aria-expanded={isProgramsOpen}
                      aria-haspopup="true"
                    >
                      <span>OUR PROGRAMMES</span>
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isProgramsOpen ? 'transform rotate-180 text-primary' : 'text-gray-400 group-hover:text-primary'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  
                  <div 
                    className={`absolute left-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-gray-100 z-50 py-2 transition-all duration-300 ease-out ${
                      isProgramsOpen 
                        ? 'opacity-100 visible translate-y-0 scale-100' 
                        : 'opacity-0 invisible -translate-y-2 scale-95'
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
                
                <NavLink to="/donate">
                  <Button className="ml-4 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-lg">
                    Donate Now
                  </Button>
                </NavLink>
              </div>
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
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary focus:outline-none"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-white/95 backdrop-blur-sm shadow-2xl transform transition-all duration-300 ease-in-out z-40 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            paddingTop: '1rem'  // Add padding to the top of the menu
          }}
        >
          <div className="h-full flex flex-col">
            {/* Menu Header with Logo */}
            <div className="bg-primary p-4 pb-3 flex justify-between items-center rounded-b-lg">
              <NavLink to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <img 
                  src="/tdtlogo.jpg" 
                  alt="Tribal Development Trust Logo"
                  className="h-10 w-auto object-contain"
                />
              </NavLink>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1 text-white hover:bg-white/20 rounded-full"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto bg-white pt-2">
              <div className="divide-y divide-gray-100">
                {mobileNavItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) => 
                      `block px-6 py-4 text-base font-medium transition-all duration-200 ${
                        isActive 
                          ? 'text-primary bg-primary/5 border-l-4 border-primary' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary hover:pl-7'
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}

                {/* Mobile Programs Dropdown */}
                <div className="border-b border-gray-100">
                  <div className="flex flex-col">
                    <button
                      className="w-full flex justify-between items-center px-6 py-4 text-base font-medium text-gray-900 hover:bg-gray-50 text-left"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsProgramsOpen(!isProgramsOpen);
                      }}
                    >
                      <span>OUR PROGRAMMES</span>
                      <ChevronRight
                        className={`h-5 w-5 transition-transform duration-200 ${
                          isProgramsOpen ? 'transform rotate-90' : ''
                        }`}
                      />
                    </button>
                    
                    {/* Dropdown Content */}
                    <div 
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        isProgramsOpen ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="bg-gray-50 pl-6 pr-4 py-2">
                        <ProgramsDropdown 
                          mobile={true} 
                          onItemClick={() => {
                            setIsProgramsOpen(false);
                            setIsMenuOpen(false);
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Donate Now Button */}
                <div className="p-4">
                  <NavLink 
                    to="/donate" 
                    className="block w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-base font-medium rounded-lg">
                      DONATE NOW
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer to push content below fixed navbar */}
      <div className="h-16"></div>
      
      {/* Overlay when mobile menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => {
            setIsMenuOpen(false);
            setIsProgramsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
