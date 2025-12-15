import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users as UsersIcon, Heart, Home, Gift, HandHeart, Video, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProgramDetailsCard } from '@/components/ProgramDetailsCard';
import { ImagePreviewPopup } from '@/components/ImagePreviewPopup';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getEvents } from '@/lib/contentful';

interface Program {
  id: string;
  title: string;
  icon: JSX.Element;
  color: string;
  duration: string;
  beneficiaries: string;
  location?: string;
  description: string;
  impact: string;
  features: string[];
  stats: { value: string; label: string }[];
  media: { type: 'image' | 'video'; url: string; alt?: string; title?: string }[];
  eventType?: string; // To match with Contentful event type
}

interface ContentfulEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  participants: string;
  image: string;
  description: string;
  details: string[];
  duration?: string;
  beneficiaries?: string;
  programCategory?: string;
}

const programData: Record<string, Program> = {
  "helping-poor": {
    id: "helping-poor",
    title: "Helping the Poor",
    icon: <Gift className="h-8 w-8 sm:h-12 sm:w-12 text-red-500" />,
    color: "red",
    duration: "Ongoing",
    beneficiaries: "Underprivileged Families, Homeless Individuals",
    description:
      "Providing essential support and resources to uplift underprivileged communities and break the cycle of poverty",
    impact:
      "10,000+ lives transformed annually through our poverty alleviation programs",
    features: [
      "Food distribution drives and community kitchens",
      "Emergency financial assistance for basic needs",
      "Housing support and shelter programs",
      "Livelihood training and employment assistance",
      "Educational support for children from low-income families",
      "Healthcare access and medical assistance",
    ],
    stats: [
      { value: "10,000+", label: "Lives Impacted" },
      { value: "50+", label: "Communities Served" },
      { value: "1M+", label: "Meals Served" },
    ],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3",
        alt: "Helping the poor",
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Helping the Poor Video",
      },
    ],
  },
  children: {
    id: "children",
    title: "Children's Programmes",
    icon: <UsersIcon className="h-8 w-8 sm:h-12 sm:w-12 text-blue-500" />,
    color: "blue",
    duration: "3 hours per session",
    beneficiaries: "Children (Ages 5-18)",
    description:
      "Comprehensive educational support and development programs for tribal children",
    impact: "Over 1,000 children supported annually",
    features: [
      "Educational scholarships and school supplies",
      "Nutritional support and meal programs",
      "Skill development workshops",
      "Computer literacy training",
      "Sports and cultural activities",
      "Mentorship programs",
    ],
    stats: [
      { value: "1,000+", label: "Children Impacted" },
      { value: "25+", label: "Schools Supported" },
      { value: "50+", label: "Workshops Conducted" },
    ],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3",
        alt: "Children learning",
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Children Program Video",
      },
    ],
  },
  medical: {
    id: "medical",
    title: "Medical Camps",
    icon: <Heart className="h-8 w-8 sm:h-12 sm:w-12 text-green-500" />,
    color: "green",
    duration: "1 day per camp",
    beneficiaries: "Tribal Communities, Low-Income Families",
    description:
      "Free healthcare services and medical assistance for tribal communities",
    impact: "50+ medical camps conducted yearly",
    features: [
      "Regular health checkups and screenings",
      "Free medicines and treatments",
      "Vaccination drives",
      "Maternal and child healthcare",
      "Health awareness programs",
      "Emergency medical assistance",
    ],
    stats: [
      { value: "5,000+", label: "Patients Treated" },
      { value: "50+", label: "Camps Conducted" },
      { value: "100+", label: "Villages Covered" },
    ],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3",
        alt: "Medical camp",
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Medical Camp Video",
      },
    ],
  },
  women: {
    id: "women",
    title: "Women's Empowerment",
    icon: <UsersIcon className="h-8 w-8 sm:h-12 sm:w-12 text-purple-500" />,
    color: "purple",
    duration: "2-4 hours per session",
    beneficiaries: "Women (Ages 18-60)",
    description:
      "Empowering women through skill development and economic independence programs",
    impact: "500+ women empowered annually",
    features: [
      "Vocational training programs",
      "Microfinance and self-help groups",
      "Health and hygiene awareness",
      "Legal rights education",
      "Leadership development",
      "Entrepreneurship support",
    ],
    stats: [
      { value: "500+", label: "Women Empowered" },
      { value: "20+", label: "Self-Help Groups" },
      { value: "30+", label: "Villages Covered" },
    ],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1529626455595-9f5f4a2e2faf?ixlib=rb-4.0.3",
        alt: "Women empowerment",
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Women Empowerment Video",
      },
    ],
  },
  blanket: {
    id: "blanket",
    title: "Blanket Distribution",
    icon: <Home className="h-8 w-8 sm:h-12 sm:w-12 text-orange-500" />,
    color: "orange",
    duration: "Seasonal (Winter)",
    beneficiaries: "Homeless, Elderly, Low-Income Families",
    description:
      "Providing warmth and comfort to those in need during winter months",
    impact: "10,000+ blankets distributed annually",
    features: [
      "Winter relief distribution",
      "Targeted distribution to most vulnerable",
      "Community outreach programs",
      "Collaboration with local authorities",
      "Volunteer-driven initiatives",
      "Year-round preparation",
    ],
    stats: [
      { value: "10,000+", label: "Blankets Distributed" },
      { value: "100+", label: "Locations Covered" },
      { value: "5,000+", label: "Families Helped" },
    ],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1512626120412-faf41adb4874?ixlib=rb-4.0.3",
        alt: "Blanket distribution",
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Blanket Distribution Video",
      },
    ],
  },
  counseling: {
    id: "counseling",
    title: "Family Counseling",
    icon: <HandHeart className="h-8 w-8 sm:h-12 sm:w-12 text-teal-500" />,
    color: "teal",
    duration: "1-2 hours per session",
    beneficiaries: "Families, Couples, Individuals",
    description: "Supporting families through counseling and guidance services",
    impact: "200+ families supported annually",
    features: [
      "Family counseling sessions",
      "Marriage counseling",
      "Child and parent relationship guidance",
      "Mental health support",
      "Community support groups",
      "Crisis intervention",
    ],
    stats: [
      { value: "200+", label: "Families Supported" },
      { value: "500+", label: "Counseling Sessions" },
      { value: "10+", label: "Support Groups" },
    ],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1507208773393-40d26b35a7ce?ixlib=rb-4.0.3",
        alt: "Family counseling",
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Family Counseling Video",
      },
    ],
  },
};

// Map program types to match Contentful event categories
const programTypeMap: Record<string, string> = {
  'children': "Children's Programmes",
  'medical': 'Health Camps',
  'women': "Women's Empowerment",
  'helping-poor': 'Helping the Poor',
  'counseling': 'Family Counseling',
  'blanket': 'Blanket Distribution'
};

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const program = programData[id as keyof typeof programData];
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  // Hardcoded event data for Children's Programmes
  const [eventData, setEventData] = useState<ContentfulEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<Record<string, any>>({});

  // Fetch events and match with current program
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const events = await getEvents();
        
        // Log the events and program title for debugging
        console.log('All events from Contentful:', events);
        console.log('Current program title:', program.title);
        
        // Find event that matches the current program
        const matchedEvent = events.find(event => {
          const eventCategory = event.programCategory?.toLowerCase() || '';
          const programTitle = program.title.toLowerCase();
          
          // Check for exact match or partial match in either direction
          return (
            eventCategory === programTitle ||
            eventCategory.includes(programTitle) ||
            programTitle.includes(eventCategory) ||
            // Special case for Family Counseling which might be named differently in Contentful
            (programTitle.includes('counseling') && eventCategory.includes('counsel')) ||
            (programTitle.includes('counsel') && eventCategory.includes('counseling'))
          );
        });

        if (matchedEvent) {
          console.log('Found matching event:', matchedEvent);
          setEventData({
            ...matchedEvent,
            // Ensure we have fallbacks for required fields
            location: matchedEvent.location || program.location || 'Tribal Regions, India',
            duration: matchedEvent.duration || program.duration,
            beneficiaries: matchedEvent.beneficiaries || program.beneficiaries,
            description: matchedEvent.description || program.description,
            details: matchedEvent.details?.length ? matchedEvent.details : program.features
          });
        } else {
          console.log('No matching event found, using program data');
          // If no matching event, don't set eventData at all
          // This will make ProgramDetailsCard show 'Coming Soon' for all fields
          setEventData(null);
        }
      } catch (err) {
        console.error('Error fetching event data:', err);
        setError('Failed to load program details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  // Get exactly 3 items for the preview: [image, video, image]
  const programMedia = (() => {
    const allImages = program.media.filter((item) => item.type === "image");
    const allVideos = program.media.filter((item) => item.type === "video");

    // Get first image (or placeholder)
    const firstImage = allImages[0] || {
      type: "image",
      url: "https://via.placeholder.com/800x600?text=No+Image+Available",
      alt: "No image available",
      title: "No image available",
    };

    // Get first video (or placeholder)
    const video = allVideos[0] || {
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "No video available",
      alt: "No video available",
    };

    // Get second image (or duplicate first image)
    const secondImage = allImages[1] || firstImage;

    return [firstImage, video, secondImage];
  })();

  const openImagePreview = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImagePreview = () => {
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImageIndex === null) return;

    const totalImages = program.media.length;
    if (direction === "prev") {
      setSelectedImageIndex((prev) =>
        prev === 0 ? totalImages - 1 : prev - 1
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev === totalImages - 1 ? 0 : prev + 1
      );
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImageIndex === null) return;

    if (e.key === "Escape") {
      closeImagePreview();
    } else if (e.key === "ArrowLeft") {
      navigateImage("prev");
    } else if (e.key === "ArrowRight") {
      navigateImage("next");
    }
  };

  // Add keyboard event listener when image is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      window.addEventListener("keydown", handleKeyDown as any);
      return () => window.removeEventListener("keydown", handleKeyDown as any);
    }
  }, [selectedImageIndex]);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Program not found
          </h1>
          <Link
            to="/"
            className="mt-4 inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const colorVariants = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      button: "bg-green-600 hover:bg-green-700",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
      button: "bg-purple-600 hover:bg-purple-700",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      border: "border-orange-200",
      button: "bg-orange-600 hover:bg-orange-700",
    },
    teal: {
      bg: "bg-teal-50",
      text: "text-teal-700",
      border: "border-teal-200",
      button: "bg-teal-600 hover:bg-teal-700",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      button: "bg-red-600 hover:bg-red-700",
    },
  };

  const colors =
    colorVariants[program.color as keyof typeof colorVariants] ||
    colorVariants.blue;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <div className={`${colors.bg} py-12 sm:py-16`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2">
                <div className="mb-6">
                  <Link
                    to="/"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Home
                  </Link>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                  {program.title}
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  {program.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Link
                    to="/donate"
                    className={`flex-1 sm:flex-none inline-flex justify-center items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white ${colors.button} shadow-sm hover:shadow-md transition-all duration-200`}
                  >
                    Donate Now
                  </Link>
                  <Link
                    to="/programs/gallery"
                    className="flex-1 sm:flex-none inline-flex justify-center items-center px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-sm sm:text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
                  >
                    View Gallery
                  </Link>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:ml-10 lg:pl-10 lg:border-l lg:border-gray-200 lg:w-1/2">
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
                  {program.media[0].type === "video" ? (
                    <iframe
                      src={program.media[0].url}
                      title={program.media[0].title}
                      className="w-full h-80 object-cover"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <img
                      src={program.media[0].url}
                      alt={
                        program.media[0].alt ||
                        `${program.title} - Tribal Development Trust`
                      }
                      className="w-full h-80 object-cover"
                      loading="lazy"
                      width={800}
                      height={450}
                      decoding="async"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white py-6 sm:py-10">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full">
              {program.stats.map((stat, index) => (
                <div key={index} className="w-full">
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center h-full">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] xs:text-xs sm:text-[13px] text-gray-600 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Program Details */}
        <div className="bg-gray-50 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  About This Program
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-6">
                    Our {program.title.toLowerCase()} initiative is designed to
                    address the specific needs of the communities we serve.
                    Through targeted interventions and sustainable solutions, we
                    aim to create lasting positive change.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {program.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className={`h-5 w-5 text-${program.color}-500 flex-shrink-0 mr-2 mt-0.5`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                    Impact
                  </h3>
                  <p className="text-gray-700">
                    {program.impact} through our comprehensive programs and
                    initiatives. We measure our success by the positive changes
                    we see in the communities we serve.
                  </p>
                </div>
              </div>

              <div className="mt-12 lg:mt-0">
                <div className="p-4 rounded-lg">
                  {isLoading ? (
                    <div className="p-6 bg-white rounded-lg border border-gray-200">
                      <p className="text-center text-gray-500">Loading program details...</p>
                    </div>
                  ) : (
                    <ProgramDetailsCard 
                      programType={program.title}
                      colors={colors}
                      duration={eventData?.duration}
                      beneficiaries={eventData?.beneficiaries}
                      location={eventData?.location}
                    />
                  )}
                </div>

                <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Gallery Preview
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {program.media.slice(0, 4).map((item, index) => {
                        const imageIndex =
                          program.media
                            .slice(0, index + 1)
                            .filter((i) => i.type === "image").length - 1;

                        return (
                          <div
                            key={index}
                            className={`aspect-square overflow-hidden rounded-lg border border-gray-200 ${
                              item.type === "image"
                                ? "cursor-pointer hover:opacity-90 transition-opacity"
                                : ""
                            }`}
                            onClick={() =>
                              item.type === "image" &&
                              openImagePreview(imageIndex)
                            }
                          >
                            {item.type === "video" ? (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <Video className="h-8 w-8 text-gray-400" />
                              </div>
                            ) : (
                              <img
                                src={item.url}
                                alt={item.alt || "Gallery image"}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => navigate("/programs/gallery")}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[rgb(234,88,12)] hover:bg-[rgba(234,88,12,0.9)] transition-colors"
                    >
                      View Full Gallery
                    </button>
                  </div>

                  {/* Media Preview Popup */}
                  {selectedImageIndex !== null && programMedia.length > 0 && (
                    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                      <button
                        onClick={closeImagePreview}
                        className="absolute right-4 top-4 z-10 text-white hover:text-gray-300"
                      >
                        <X className="h-8 w-8" />
                      </button>

                      <div className="relative w-full max-w-4xl">
                        {/* Navigation Arrows */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex((prev) =>
                              prev === 0 ? programMedia.length - 1 : prev - 1
                            );
                          }}
                          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white hover:text-primary transition-colors z-10 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm shadow-lg"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" />
                        </button>

                        {/* Current Media */}
                        <div className="relative w-full h-full flex items-center justify-center">
                          {programMedia[selectedImageIndex]?.type ===
                          "video" ? (
                            <div className="w-full max-w-4xl aspect-video bg-black">
                              <iframe
                                src={programMedia[selectedImageIndex].url}
                                title={programMedia[selectedImageIndex].title}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                          ) : (
                            <img
                              src={programMedia[selectedImageIndex]?.url}
                              alt={
                                programMedia[selectedImageIndex]?.alt ||
                                "Gallery image"
                              }
                              className="max-h-[80vh] max-w-full object-contain"
                              onClick={(e) => e.stopPropagation()}
                            />
                          )}

                          {/* Image counter */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                            {selectedImageIndex + 1} / {programMedia.length}
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex((prev) =>
                              prev === programMedia.length - 1 ? 0 : prev + 1
                            );
                          }}
                          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white hover:text-primary transition-colors z-10 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm shadow-lg"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-8 w-8 md:h-10 md:w-10" />
                        </button>

                        {/* Dot Indicators */}
                        <div className="flex justify-center items-center mt-4 space-x-2">
                          {programMedia.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImageIndex(index)}
                              className={`w-2.5 h-2.5 rounded-full transition-all ${
                                index === selectedImageIndex
                                  ? "bg-white scale-125"
                                  : "bg-white/50 hover:bg-white/75"
                              }`}
                              aria-label={`Go to slide ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProgramDetail;
