import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { ArrowLeft, Mail, Twitter, Linkedin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';

// Define types for team member data
type SocialLinks = {
  twitter?: string;
  linkedin?: string;
  email?: string;
};

type TeamMember = {
  name: string;
  role: string;
  image: string;
  description: string;
  details: string[];
  quote: string;
  socialLinks?: SocialLinks;
  detailImage?: string; // For larger detail image if needed
};

type TeamMembers = Record<string, TeamMember>;

// Team member data - could be moved to a separate data file
const TEAM_MEMBERS: TeamMembers = {
  'banoth-srinivas-naik': {
    name: 'BANOTH SRINIVAS NAIK',
    role: 'Founder & President',
    image: '/aboutuspage/FOUNDER.jpg',
    detailImage: '/aboutuspage/FOUNDER.jpg', // Larger image for detail view
    description: 'A visionary leader with over 20 years of experience in tribal development and social work. His dedication to uplifting tribal communities has been the driving force behind our organization\'s success.',
    details: [
      'Founder and Chief Functionary of the organization',
      '20+ years of experience in tribal development',
      'Expert in community mobilization and social entrepreneurship',
      'Recipient of multiple awards for social service'
    ],
    quote: 'Empowering tribal communities is not just our mission, it\'s our responsibility.',
    socialLinks: {
      email: 'srinivas@example.com',
      linkedin: 'linkedin.com/in/example'
    }
  },
  'banoth-lalithamma': {
    name: 'BANOTH LALITHAMMA',
    role: 'Trustee & Women\'s Welfare Head',
    image: '/aboutuspage/TRUSTEE.jpg',
    detailImage: '/aboutuspage/TRUSTEE.jpg', // Larger image for detail view
    description: 'A dedicated social worker with a passion for women empowerment and education in tribal areas. She has been instrumental in implementing various programs for women\'s self-reliance and education.',
    details: [
      '15+ years of experience in women empowerment',
      'Specializes in education and skill development',
      'Leads multiple self-help group programs',
      'Advocate for women\'s rights and education'
    ],
    quote: 'Education is the most powerful tool to change the world and uplift communities.',
    socialLinks: {
      email: 'lalithamma@example.com',
      linkedin: 'linkedin.com/in/example-lalithamma'
    }
  },
  'r-suresh-naik': {
    name: 'R. SURESH NAIK',
    role: 'Trustee & Program Director',
    image: '/aboutuspage/TRUST-MEMBER.jpg',
    detailImage: '/aboutuspage/TRUST-MEMBER.jpg',
    description: 'With expertise in community development, Suresh oversees the implementation of our various programs, ensuring they effectively address the needs of tribal communities.',
    details: [
      '12+ years of experience in program management',
      'Expert in community-based development approaches',
      'Leads field operations and program implementation',
      'Specializes in sustainable development projects'
    ],
    quote: 'Sustainable change comes from empowering communities to be the architects of their own development.',
    socialLinks: {
      email: 'suresh@example.com'
    }
  }
};

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get team member data with consistent ID matching
  const member = useMemo(() => {
    if (!id) return null;
    
    // Normalize the ID to match the format used in TEAM_MEMBERS
    const normalizeId = (str: string) => 
      str.toLowerCase()
         .replace(/\./g, '')  // Remove periods
         .replace(/\s+/g, '-') // Replace spaces with hyphens
         .toLowerCase();
    
    const normalizedId = normalizeId(id);
    
    // Try to find exact match first
    if (TEAM_MEMBERS[normalizedId]) {
      return TEAM_MEMBERS[normalizedId];
    }
    
    // If no exact match, try case-insensitive search
    const memberKey = Object.keys(TEAM_MEMBERS).find(key => 
      normalizeId(key) === normalizedId
    );
    
    return memberKey ? TEAM_MEMBERS[memberKey] : null;
  }, [id]);

  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  // If member not found, show 404
  if (!member) {
    return (
      <div className="min-h-screen flex flex-col bg-charity-light">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <h1 className="text-5xl font-bold text-charity-dark mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Team member not found</p>
            <button
              onClick={handleBack}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[rgb(234,88,12)] hover:bg-[rgb(200,70,10)] transition-colors duration-300"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Team
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-charity-light">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center text-[rgb(234,88,12)] hover:text-[rgb(200,70,10)] mb-8 transition-colors duration-300 group"
            >
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Leadership Team</span>
            </button>

            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="md:flex">
                {/* Profile Image */}
                <div className="md:w-2/5 relative">
                  <div className="h-full min-h-80 bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: member.name.includes('LALITHAMMA') || member.name.includes('SURESH NAIK') 
                          ? 'center 10%' 
                          : 'center 20%'
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.error(`Failed to load image: ${member.image}`);
                        // Try fallback images
                        if (member.name.includes('SURESH NAIK')) {
                          target.src = '/aboutuspage/TRUSTEE2.jpg';
                        } else if (member.name.includes('LALITHAMMA')) {
                          target.src = '/aboutuspage/TRUSTEE.jpg';
                        } else if (member.name.includes('SRINIVAS')) {
                          target.src = '/aboutuspage/FOUNDER.jpg';
                        } else {
                          target.src = '/placeholder-profile.jpg';
                        }
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Role Badge */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-[rgb(234,88,12)] text-white text-sm font-medium">
                      {member.role}
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="md:w-3/5 p-8 md:p-10">
                  <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-charity-dark mb-2">
                      {member.name}
                    </h1>
                    
                    <p className="text-gray-600 mt-4">{member.description}</p>
                  </div>
                  
                  {/* Social Links */}
                  {member.socialLinks && (
                    <div className="flex space-x-4 mb-8">
                      {member.socialLinks.email && (
                        <a 
                          href={`mailto:${member.socialLinks.email}`}
                          className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-600 hover:bg-[rgb(234,88,12)] hover:text-white transition-colors duration-300"
                          aria-label="Email"
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                      {member.socialLinks.linkedin && (
                        <a 
                          href={`https://${member.socialLinks.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-600 hover:bg-[#0A66C2] hover:text-white transition-colors duration-300"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a 
                          href={`https://twitter.com/${member.socialLinks.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-colors duration-300"
                          aria-label="Twitter"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  )}
                  
                  {/* About Section */}
                  <div className="border-t border-gray-100 pt-6">
                    <h2 className="text-xl font-semibold text-charity-dark mb-4">About</h2>
                    <ul className="space-y-3">
                      {member.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[rgb(234,88,12)]/10 text-[rgb(234,88,12)] text-sm font-medium mr-3 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Quote Section */}
              <div className="bg-gray-50 px-8 py-8 border-t border-gray-100 relative">
                <div className="absolute top-0 left-8 -translate-y-1/2 bg-white px-4 text-4xl text-[rgb(234,88,12)]">"</div>
                <blockquote className="text-lg text-gray-700 italic max-w-3xl mx-auto relative z-10">
                  {member.quote}
                </blockquote>
                <div className="absolute bottom-0 right-8 translate-y-1/2 bg-white px-4 text-4xl text-[rgb(234,88,12)]">"</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
