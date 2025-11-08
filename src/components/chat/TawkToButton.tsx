import { useState, useEffect, useCallback } from "react";

// Type definitions for Tawk.to API
interface TawkApi {
  toggle: () => void;
  showWidget: () => void;
  hideWidget: () => void;
  // Add other Tawk.to API methods as needed
}

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

interface TawkToButtonProps {
  propertyId?: string;
  widgetId?: string;
  className?: string;
  buttonAriaLabel?: string;
  buttonTitle?: string;
}

// Default values from environment variables
const DEFAULT_PROPERTY_ID = import.meta.env.VITE_TAWKTO_PROPERTY_ID;
const DEFAULT_WIDGET_ID = import.meta.env.VITE_TAWKTO_WIDGET_ID;

export const TawkToButton = ({
  propertyId = DEFAULT_PROPERTY_ID,
  widgetId = DEFAULT_WIDGET_ID,
  className = "bg-[#00B67A] hover:bg-[#009B6B] text-white rounded-full p-3 shadow-lg z-50 transition-all duration-300 transform hover:scale-110 flex items-center justify-center",
  buttonAriaLabel = "Open chat with support",
  buttonTitle = "Chat with us",
}: TawkToButtonProps = {}) => {
  const [error, setError] = useState<string | null>(null);

  const initializeTawkTo = useCallback(() => {
    // Validate required props
    if (!propertyId || !widgetId) {
      setError("Tawk.to property ID and widget ID are required");
      return () => {};
    }

    // Check if already initialized
    if (window.Tawk_API) {
      return () => {};
    }

    // Configure Tawk.to widget position
    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
    // Add Tawk.to configuration
    const s0 = document.createElement('script');
    s0.type = 'text/javascript';
    s0.text = `
      var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
      Tawk_API.customStyle = {
        'zIndex': 50,
        'right': '90px',  // Position to the left of WhatsApp button (60px + 30px gap)
        'bottom': '24px',
        'transition': 'all 0.3s ease'
      };
    `;

    // Error handling
    s1.onerror = () => {
      setError("Failed to load Tawk.to script");
    };

    // Success handler
    s1.onload = () => {
      if (window.Tawk_API) {
        setError(null);
      } else {
        setError("Tawk.to API not available after script load");
      }
    };

    // Insert scripts
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(s0, firstScript);
      firstScript.parentNode.insertBefore(s1, firstScript);
    } else {
      document.body.appendChild(s0);
      document.body.appendChild(s1);
    }

    // Cleanup function
    return () => {
      if (s0.parentNode) s0.parentNode.removeChild(s0);
      if (s1.parentNode) s1.parentNode.removeChild(s1);
      // Note: This doesn't unload Tawk.to, just the scripts
      // Tawk.to doesn't provide a proper cleanup method
    };
  }, [propertyId, widgetId]);

  useEffect(() => {
    const cleanup = initializeTawkTo();
    return cleanup;
  }, [initializeTawkTo]);

  if (error) {
    console.error("TawkTo Error:", error);
    return null;
  }

  // This component doesn't render anything visible
  // It only initializes the Tawk.to widget with custom positioning
  return null;
};

export default TawkToButton;
