import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';

const teamMembers = {
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
    quote: 'Empowering tribal communities is not just our mission, it\'s our responsibility.'
  },
  'BANOTH-LALITHAMMA': {
    name: 'BANOTH LALITHAMMA',
    role: 'Trustee',
    image: '/aboutuspage/TRUSTEE.jpg',
    description: 'A dedicated social worker with a passion for women empowerment and education in tribal areas. Her work has transformed the lives of countless women and children.',
    details: [
      '15+ years of experience in women empowerment',
      'Specializes in education and skill development',
      'Leads multiple self-help group programs',
      'Advocate for tribal women\'s rights'
    ],
    quote: 'Education is the most powerful tool to break the cycle of poverty.'
  },
  'R-SURESH-NAIK': {
    name: 'R. SURESH NAIK',
    role: 'Trustee & Community Mobilizer',
    image: '/aboutuspage/TRUST-MEMBER.jpg',
    description: 'A dedicated social worker with 6 years of experience in community mobilization and tribal development. Suresh Naik has been instrumental in organizing and mobilizing communities to participate in Tribal Development Trust\'s initiatives. His ability to connect with people and understand their needs has helped bridge the gap between the organization and tribal communities.',
    details: [
      '6+ years of experience in community mobilization and social work',
      'Successfully organized and led awareness campaigns in 50+ tribal villages',
      'Mobilized thousands of community members to participate in development programs',
      'Played a key role in establishing self-help groups and community-based organizations',
      'Facilitated training programs on health, education, and livelihood opportunities',
      'Helped implement various Tribal Development Trust initiatives at the grassroots level'
    ],
    quote: 'True development happens when we work together as a community. My goal is to help people understand their potential and work collectively towards a better future through the initiatives of Tribal Development Trust.'
  }
};

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const member = id ? teamMembers[id as keyof typeof teamMembers] : null;

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Simulate API call or data loading
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error loading profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-charity-light">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-charity-dark mb-4">Member Not Found</h1>
          <Link to="/about" className="text-primary hover:underline">
            Back to Our Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charity-light">
      <Navbar />
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link 
          to="/about" 
          className="inline-flex items-center text-charity-dark hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Our Team
        </Link>
      </div>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-8">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: member.name.includes('LALITHAMMA') || member.name.includes('SURESH NAIK') ? 'center 10%' : 'center 20%' }}
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-2/3 p-8 md:p-12">
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-3">
                  {member.role}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-charity-dark mb-4">
                  {member.name}
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  {member.description}
                </p>
                
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-xl font-semibold text-charity-dark mb-4">Key Contributions</h3>
                  <ul className="space-y-3">
                    {member.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <blockquote className="bg-charity-light/50 border-l-4 border-primary px-6 py-4 rounded-r-lg">
                  <p className="text-charity-dark italic">"{member.quote}"</p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
