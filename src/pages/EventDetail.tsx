import { useParams } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  ArrowLeft,
  Check,
  X,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data - in a real app, this would come from an API
const eventData = {
  id: "tribal-heritage-festival",
  title: "Tribal Heritage Festival",
  type: "Cultural",
  date: "2023-11-15",
  time: "10:00 AM - 6:00 PM",
  location: "Araku Valley, Andhra Pradesh",
  participants: "500+ expected",
  image:
    "https://images.unsplash.com/photo-1540575469863-5c9a4a560541?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  description:
    "Join us for a vibrant celebration of tribal culture, traditions, and heritage. Experience traditional dances, music, crafts, and cuisine from various tribal communities across the region. This festival is a unique opportunity to learn about and appreciate the rich cultural diversity of tribal India.",
  details: [
    "Traditional dance and music performances",
    "Artisan market with authentic tribal crafts",
    "Cultural workshops and demonstrations",
    "Traditional food stalls",
    "Photo exhibition on tribal life",
    "Interactive sessions with tribal elders",
  ],
  about:
    "The Tribal Heritage Festival is an annual event organized to promote and preserve the rich cultural heritage of tribal communities. It provides a platform for tribal artists to showcase their talents and for visitors to experience the diversity of indigenous cultures.",
};

const EventDetail = () => {
  const { id } = useParams();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim() ? "Name is required" : "",
      email: !formData.email.trim()
        ? "Email is required"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? "Please enter a valid email"
        : "",
      phone: !formData.phone.trim()
        ? "Phone number is required"
        : !/^[0-9]{10}$/.test(formData.phone)
        ? "Please enter a valid 10-digit phone number"
        : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsRegistering(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const adminTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const userTemplateId = import.meta.env
        .VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const adminEmail = import.meta.env.VITE_EMAILJS_TO_EMAIL;

      if (
        !serviceId ||
        !adminTemplateId ||
        !userTemplateId ||
        !publicKey ||
        !adminEmail
      ) {
        throw new Error("EmailJS configuration is missing");
      }

      // Prepare email parameters for admin
      const adminTemplateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: adminEmail,
        subject: `New Event Registration: ${eventData.title}`,
        message: `Event: ${eventData.title}
Date: ${formatDate(eventData.date)}
Time: ${eventData.time}
Location: ${eventData.location}

Registrant Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message: ${formData.message || "No additional message"}`,
        date: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Prepare email parameters for user (auto-reply)
      const userTemplateParams = {
        name: formData.name,
        email: formData.email,
        subject: `Registration Confirmation: ${eventData.title}`,
        message: `Thank you for registering for ${eventData.title}!

Event Details:
- Date: ${formatDate(eventData.date)}
- Time: ${eventData.time}
- Location: ${eventData.location}

We look forward to seeing you there!

Best regards,
Tribal Development Trust`,
        reply_to: adminEmail,
        date: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Send both emails in parallel
      await Promise.all([
        // Email to admin
        emailjs.send(
          serviceId,
          adminTemplateId,
          adminTemplateParams,
          publicKey
        ),
        // Auto-reply to user
        emailjs.send(serviceId, userTemplateId, userTemplateParams, publicKey),
      ]);

      setRegistrationSuccess(true);
      toast.success(
        "Registration successful! Check your email for confirmation."
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      // Close modal after 3 seconds
      setTimeout(() => {
        setShowRegisterModal(false);
        setRegistrationSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error sending registration:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  // In a real app, you would fetch event data based on the ID
  const event = eventData;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 sm:pb-4">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-primary hover:bg-primary/10 rounded-full px-4 py-2 transition-colors duration-200 inline-flex items-center text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5" />
            Back to Events
          </Button>
        </div>

        {/* Hero Section */}
        <section className="relative">
          <div className="h-56 sm:h-72 md:h-96 w-full overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charity-dark/90 via-charity-dark/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 md:pb-8 pt-4 sm:pt-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {event.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Event Content */}
        <section className="py-8 sm:py-10 md:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              <div className="lg:col-span-2">
                <div className="prose max-w-none">
                  <h2 className="text-xl sm:text-2xl font-bold text-charity-dark mb-4 sm:mb-6">
                    About This Event
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">
                    {event.about}
                  </p>

                  <h3 className="text-lg sm:text-xl font-semibold text-charity-dark mt-6 sm:mt-8 mb-3 sm:mb-4">
                    Event Highlights
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {event.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2 mt-1">•</span>
                        <span className="text-gray-700 text-sm sm:text-base">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg sm:text-xl font-semibold text-charity-dark mt-6 sm:mt-8 mb-3 sm:mb-4">
                    Detailed Description
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">
                    {event.description}
                  </p>

                  <div className="bg-charity-light/30 p-4 sm:p-6 rounded-xl border-l-4 border-primary mt-6 sm:mt-8">
                    <h3 className="text-lg sm:text-xl font-semibold text-charity-dark mb-2 sm:mb-3">
                      Additional Information
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
                      For more details about the event, please contact our event
                      coordinator:
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base">
                      Email: events@tribaltrust.org
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base">
                      Phone: +91 98765 43210
                    </p>
                  </div>
                </div>
              </div>

              {/* Registration Card */}
              <div className="lg:sticky lg:top-6 h-fit">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white text-center">
                    <h3 className="text-xl font-bold mb-2">Register Now</h3>
                    <p className="text-white/90 text-sm">
                      Secure your spot at this exciting event
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{event.time}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium text-right">
                          {event.location}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => setShowRegisterModal(true)}
                      className="w-full bg-charity-dark hover:bg-charity-dark/95 text-white font-medium font-sans py-3 sm:py-3.5 text-sm sm:text-[15px] hover:shadow-md hover:scale-[1.02] transition-all duration-200 tracking-wide rounded-xl"
                    >
                      Register
                    </Button>

                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-500">
                        Limited seats available. Register early to secure your
                        spot!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Link
                    to="/events"
                    className="inline-flex items-center text-charity-dark hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to All Events
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-charity-dark mb-6">
              Can't Make It to This Event?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Consider making a donation to support our ongoing efforts in
              tribal community development. Your contribution helps us organize
              more events and reach more communities in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center w-full px-4 sm:px-0">
              <Link
                to="/donate"
                className="flex items-center justify-center w-full max-w-[200px] sm:max-w-[220px] bg-charity-dark hover:bg-charity-dark/95 text-white font-medium font-sans px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-[15px] hover:shadow-md hover:scale-[1.02] transition-all duration-200 tracking-wide whitespace-nowrap"
              >
                Donate Now
              </Link>
              <Link
                to="/events"
                className="flex items-center justify-center w-full max-w-[200px] sm:max-w-[220px] bg-white border-2 border-charity-dark text-charity-dark hover:bg-charity-dark hover:text-white font-medium font-sans px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-[15px] hover:shadow-md hover:scale-[1.02] transition-all duration-200 tracking-wide whitespace-nowrap"
              >
                View Other Events
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            {!registrationSuccess ? (
              <form onSubmit={handleRegister}>
                <h3 className="text-xl font-bold mb-4">
                  Register for {event.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  You're about to register for{" "}
                  <span className="font-semibold">{event.title}</span> on{" "}
                  {formatDate(event.date)} at {event.time}.
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`pl-10 w-full px-4 py-2 border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`pl-10 w-full px-4 py-2 border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={`pl-10 w-full px-4 py-2 border ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                        placeholder="9876543210"
                        pattern="[0-9]{10}"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Any special requirements or questions?"
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowRegisterModal(false)}
                    disabled={isRegistering}
                    className="flex items-center"
                  >
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isRegistering}
                    className="bg-charity-dark hover:bg-charity-dark/90 flex items-center"
                  >
                    {isRegistering ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Registering...
                      </>
                    ) : (
                      "Confirm Registration"
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Registration Successful!
                </h3>
                <p className="text-gray-600 mb-4">
                  You've been registered for{" "}
                  <span className="font-medium">{event.title}</span>.
                </p>
                <p className="text-sm text-gray-500">
                  We've sent a confirmation email to{" "}
                  <span className="font-medium">{formData.email}</span> with all
                  the details.
                </p>
                <Button
                  onClick={() => setShowRegisterModal(false)}
                  className="mt-6 bg-charity-dark hover:bg-charity-dark/90"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
