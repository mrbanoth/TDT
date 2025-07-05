import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import ProgramsDropdown from './ProgramsDropdown';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
  ];

  const navItemsAfterPrograms = [
    { name: 'EVENTS', path: '/events' },
    { name: 'CONTACT', path: '/contact' },
  ];

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    const handleMobileMenuClose = () => {
      setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mobileMenuClose', handleMobileMenuClose);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mobileMenuClose', handleMobileMenuClose);
    };
  }, [isMenuOpen]);

  return (
    <>
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
                <div className="hidden xs:block">
                  <h1 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-charity-dark leading-tight">
                    Tribal Development Trust
                  </h1>
                </div>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="hidden lg:flex items-baseline space-x-8">
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
                {/* Programmes with dropdown */}
                <div className="relative group">
                  <NavLink
                    to="/programmes"
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 flex items-center ${
                        isActive 
                          ? 'text-primary font-semibold' 
                          : 'text-gray-700 hover:text-primary hover:font-medium'
                      }`
                    }
                  >
                    OUR PROGRAMMES
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </NavLink>
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <ProgramsDropdown />
                  </div>
                </div>
                {navItemsAfterPrograms.map((item) => (
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
                <NavLink to="/donate">
                  <Button className="ml-4 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 hover:shadow-lg">
                    Donate Now
                  </Button>
                </NavLink>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible delay-300'
          }`}
        >
          {/* Overlay */}
          <div 
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div 
            className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <img 
                    src="/tdtlogo.jpg" 
                    alt="TDT Logo"
                    className="h-8 w-auto"
                  />
                  <span className="font-bold text-gray-900">TDT</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1 mobile-menu-container">
                {navItems.map((item, index) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-base font-medium tracking-wide rounded-lg transition-colors duration-200 ${
                        isActive 
                          ? 'bg-primary/10 text-primary font-semibold' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary hover:font-medium'
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                      transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                      opacity: isMenuOpen ? 1 : 0,
                      transitionProperty: 'opacity, transform',
                      transitionDuration: '0.3s',
                      transitionTimingFunction: 'ease-in-out'
                    }}
                  >
                    {item.name}
                  </NavLink>
                ))}
                
                {/* Mobile Programs Dropdown - Only show the dropdown, not the separate link */}
                <div className="lg:hidden">
                  <div 
                    className="w-full"
                    style={{
                      transitionDelay: isMenuOpen ? `${navItems.length * 50}ms` : '0ms',
                      transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                      opacity: isMenuOpen ? 1 : 0,
                      transitionProperty: 'opacity, transform',
                      transitionDuration: '0.3s',
                      transitionTimingFunction: 'ease-in-out'
                    }}
                  >
                    <ProgramsDropdown />
                  </div>
                </div>
                
                {navItemsAfterPrograms.map((item, index) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-base font-medium tracking-wide rounded-lg transition-colors duration-200 ${
                        isActive 
                          ? 'bg-primary/10 text-primary font-semibold' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary hover:font-medium'
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      transitionDelay: isMenuOpen ? `${(navItems.length + index + 1) * 50}ms` : '0ms',
                      transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                      opacity: isMenuOpen ? 1 : 0,
                      transitionProperty: 'opacity, transform',
                      transitionDuration: '0.3s',
                      transitionTimingFunction: 'ease-in-out'
                    }}
                  >
                    {item.name}
                  </NavLink>
                ))}
                
                <div 
                  className="mt-6 px-4"
                  style={{
                    transitionDelay: isMenuOpen ? `${(navItems.length + navItemsAfterPrograms.length + 1) * 50}ms` : '0ms',
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                    opacity: isMenuOpen ? 1 : 0,
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '0.3s',
                    transitionTimingFunction: 'ease-in-out'
                  }}
                >
                  <NavLink 
                    to="/donate" 
                    className="block w-full text-center bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-full transition-all duration-200 hover:shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Donate Now
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16"></div> {/* Spacer to push content below fixed navbar */}
    </>
  );
};

export default Navbar;
