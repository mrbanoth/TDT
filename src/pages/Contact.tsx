import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Mail, Phone, MapPin, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { contactInfo, mapLocation } from '@/data/contact/info';
import { toast } from 'sonner';

// Icon mapping
const iconComponents: { [key: string]: React.ElementType } = {
  Mail,
  Phone,
  MapPin,
  Clock,
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim() ? 'Full Name is required' : '',
      email: !formData.email.trim() ? 'Email is required' : 
             !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Please enter a valid email' : '',
      subject: !formData.subject.trim() ? 'Subject is required' : '',
      message: !formData.message.trim() ? 'Message is required' : ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Verify required environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const adminEmail = import.meta.env.VITE_EMAILJS_TO_EMAIL || 'tribaldevelopmenttrust77@gmail.com';

      if (!serviceId || !templateId || !autoReplyTemplateId || !publicKey) {
        throw new Error('Missing required EmailJS configuration. Please check your environment variables.');
      }

      // Prepare email parameters for admin
      const adminTemplateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: adminEmail,
        subject: `New Contact Form Submission: ${formData.subject}`,
        message: formData.message,
        date: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      // Send email to visitor (auto-reply)
      const visitorTemplateParams = {
        name: formData.name,
        email: formData.email,
        subject: 'Thank you for contacting Tribal Development Trust',
        message: `We've received your message regarding "${formData.subject}" and will get back to you soon.`,
        reply_to: adminEmail,
        date: new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      // Send both emails in parallel
      await Promise.all([
        // Email to admin
        emailjs.send(
          serviceId,
          templateId,
          adminTemplateParams,
          publicKey
        ),
        // Auto-reply to visitor
        emailjs.send(
          serviceId,
          autoReplyTemplateId,
          visitorTemplateParams,
          publicKey
        )
      ]);
      
      // Show success message with auto-dismiss
      toast.success('Thank you! Your message has been sent. We\'ll get back to you soon!', {
        duration: 5000,
        position: 'top-center',
      });
      
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setIsSubmitted(false);
        setIsSubmitting(false);
      }, 5000);
    } catch (error) {
      
      toast.error(`Failed to send message: ${error instanceof Error ? error.message : 'Please try again later.'}`, {
        duration: 10000,
        position: 'top-center',
      });
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1a1a1a] to-[#2c2c2c] text-white pt-24 pb-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')]"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-serif tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Get in <span className="text-[rgb(234,88,12)]">Touch</span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Have questions or want to get involved? We'd love to hear from you. 
              Reach out to us through any of the channels below.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charity-dark mb-6">Send Us a <span className="text-[rgb(234,88,12)]">Message</span></h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-serif">
                Have a question or want to collaborate? Fill out the form below and our team will get back to you as soon as possible.
              </p>
            </div>

            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <div>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[rgb(234,88,12)] focus:border-transparent transition-all`}
                      placeholder="Type your message here..."
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                  </div>
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`relative overflow-hidden ${
                      isSubmitted 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-[rgb(234,88,12)] hover:bg-[rgba(234,88,12,0.9)]'
                    } text-white px-8 py-3 rounded-lg font-normal font-serif text-base sm:text-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] tracking-normal`}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.span 
                          key="success"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex items-center justify-center"
                        >
                          <Check className="w-5 h-5 mr-2" />
                          Message Sent!
                        </motion.span>
                      ) : (
                        <motion.span 
                          key="submit"
                          className="flex items-center relative"
                        >
                          <motion.span
                            className="flex items-center"
                            initial={{ x: 0 }}
                            animate={{ 
                              x: isSubmitting ? -100 : 0,
                              opacity: isSubmitting ? 0 : 1,
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </motion.span>
                          
                          {isSubmitting && (
                            <motion.span
                              className="absolute left-0"
                              initial={{ x: 0, opacity: 1 }}
                              animate={{ 
                                x: 'calc(100% + 2rem)',
                                opacity: 0,
                                scale: 1.5
                              }}
                              transition={{ 
                                duration: 1,
                                ease: [0.4, 0, 0.2, 1]
                              }}
                            >
                              <Send className="w-5 h-5" />
                            </motion.span>
                          )}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charity-dark mb-6">Our Contact <span className="text-[rgb(234,88,12)]">Information</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-serif">
              Find us at our office or get in touch using the information below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {contactInfo.map((item, index) => {
              const IconComponent = iconComponents[item.icon] || null;
              return (
                <motion.div
                  key={item.id}
                  className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[rgb(234,88,12)]/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-[rgba(234,88,12,0.05)] flex items-center justify-center group-hover:bg-[rgba(234,88,12,0.1)] transition-colors duration-300">
                        {IconComponent && <IconComponent className="w-5 h-5 text-[rgb(234,88,12)]" />}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          className="text-gray-600 hover:text-[rgb(234,88,12)] whitespace-pre-line transition-colors duration-200"
                          style={{ textDecoration: 'none' }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.description}
                        </a>
                      ) : (
                        <p className="text-gray-600 whitespace-pre-line">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 w-full">
        <iframe
          src={mapLocation.url}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title={mapLocation.title}
        ></iframe>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
