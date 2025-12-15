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
    description: 'tribaldevelopmenttrust77@gmail.com',
    link: 'mailto:tribaldevelopmenttrust77@gmail.com'
  },
  {
    id: 'phone',
    icon: 'Phone',
    title: 'Call Us',
    description: '+91 9182827123',
    link: 'tel:+9182827123'
  },
  {
    id: 'location',
    icon: 'MapPin',
    title: 'Our Location',
    description: '17°29\'05.1\"N 78°19\'42.5\"E, Hyderabad, Telangana',
    link: 'https://www.google.com/maps/place/17%C2%B029\'05.1%22N+78%C2%B019\'42.5%22E/@17.4847355,78.3259011,17z/data=!3m1!4b1!4m4!3m3!8m2!3d17.4847355!4d78.328476?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D'
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
  url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.074525123419!2d78.3259011!3d17.4847355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91f8f8d1f2b1%3A0x1b8e6d7c9d4d4f1d!2s17%C2%B029%2705.1%22N%2078%C2%B019%2742.5%22E!5e0!3m2!1sen!2sin!4v1679999999999!5m2!1sen!2sin',
  title: 'Tribal Development Trust Location'
};
