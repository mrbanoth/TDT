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
};

type TeamMembers = Record<string, TeamMember>;

// Team member data - could be moved to a separate data file
const TEAM_MEMBERS: TeamMembers = {
  'BANOTH-SRINIVAS-NAIK': {
    name: 'BANOTH SRINIVAS NAIK',
    role: 'Founder & President',
    image: '/aboutuspage/FOUNDER.jpg',
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
  'BANOTH-LALITHAMMA': {
    name: 'BANOTH LALITHAMMA',
    role: 'Trustee',
    image: '/aboutuspage/TRUSTEE.jpg',
    description: 'A dedicated social worker with a passion for women empowerment and education in tribal areas.',
    details: [
      '15+ years of experience in women empowerment',
      'Specializes in education and skill development',
      'Leads multiple self-help group programs'
    ],
    quote: 'Education is the most powerful tool to change the world.',
    socialLinks: {
      email: 'lalithamma@example.com'
    }
  }
};

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get team member data
  const member = useMemo(() => {
    if (!id) return null;
    return TEAM_MEMBERS[id.toUpperCase()] || null;
  }, [id]);

  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  // If member not found, show 404
  if (!member) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-lg mb-6">Team member not found</p>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="inline mr-2 h-4 w-4" />
              Go Back
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Team
          </button>

          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              {/* Profile Image */}
              <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-8">
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full h-64 w-64 object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-profile.jpg';
                  }}
                />
              </div>

              {/* Profile Info */}
              <div className="md:w-2/3 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h1>
                <p className="text-lg text-primary font-medium mb-6">{member.role}</p>
                
                <p className="text-gray-700 mb-6">{member.description}</p>
                
                {/* Social Links */}
                {member.socialLinks && (
                  <div className="flex space-x-4 mb-6">
                    {member.socialLinks.email && (
                      <a 
                        href={`mailto:${member.socialLinks.email}`}
                        className="text-gray-600 hover:text-primary transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="h-6 w-6" />
                      </a>
                    )}
                    {member.socialLinks.linkedin && (
                      <a 
                        href={`https://${member.socialLinks.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-6 w-6" />
                      </a>
                    )}
                    {member.socialLinks.twitter && (
                      <a 
                        href={`https://twitter.com/${member.socialLinks.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  <ul className="space-y-2">
                    {member.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Quote Section */}
            <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
              <blockquote className="text-lg italic text-gray-700">
                "{member.quote}"
              </blockquote>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
