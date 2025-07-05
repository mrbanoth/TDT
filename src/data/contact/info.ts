// Contact information data structure
export interface ContactInfo {
  id: string;
  icon: string; // Icon component name
  title: string;
  description: string;
  link?: string;
}

// Map location data
export interface MapLocation {
  url: string;
  title: string;
}

// Contact information array
export const contactInfo: ContactInfo[] = [
  {
    id: 'email',
    icon: 'Mail',
    title: 'Email Us',
    description: 'info@tdt.org',
    link: 'mailto:info@tdt.org'
  },
  {
    id: 'phone',
    icon: 'Phone',
    title: 'Call Us',
    description: '+91 9390730129',
    link: 'tel:+919390730129'
  },
  {
    id: 'location',
    icon: 'MapPin',
    title: 'Our Location',
    description: '123 Main Street, Hyderabad, Telangana, 500001',
    link: 'https://maps.google.com?q=Hyderabad,Telangana,India'
  },
  {
    id: 'hours',
    icon: 'Clock',
    title: 'Working Hours',
    description: 'Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 2:00 PM'
  }
];

// Map location configuration
export const mapLocation: MapLocation = {
  url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.168301423964!2d78.36787441535483!3d17.44893168803623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19630804d0b3a4cd!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
  title: 'Our Location on Map'
};
