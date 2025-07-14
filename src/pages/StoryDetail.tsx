import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Quote, Star, MessageSquare, Share2, Calendar, User, Facebook, Twitter, Linkedin, Link as LinkIcon, MessageCircle, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

// Import testimonials from data file
import { testimonials } from '@/data/testimonials';

// Transform testimonials to match the expected story format
const stories = testimonials.map(testimonial => ({
  id: testimonial.id,
  name: testimonial.name,
  role: testimonial.role,
  date: testimonial.date,
  image: testimonial.image,
  content: `<p>${testimonial.fullContent.replace(/\n\n/g, '</p><p>')}</p>`,
  fullQuote: testimonial.content,
  rating: testimonial.rating,
  category: testimonial.category
}));

const StoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const story = stories.find(s => s.id === id);

  // State for comment form and sharing
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState<Array<{name: string; text: string; date: string}>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // Set share URL on component mount
  useState(() => {
    setShareUrl(window.location.href);
  });

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !name.trim()) return;
    
    setIsSubmitting(true);
    
    // In a real app, you would send this to your backend
    setTimeout(() => {
      setComments(prev => [
        ...prev,
        {
          name,
          text: comment,
          date: new Date().toLocaleDateString()
        }
      ]);
      setComment('');
      setName('');
      setEmail('');
      setIsSubmitting(false);
    }, 500);
  };

  // Handle social sharing
  const handleShare = (platform: string) => {
    const text = `Check out this inspiring story: ${story?.name} - ${story?.role}`;
    const url = encodeURIComponent(shareUrl);
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`${text}\n\nRead more: ${url}`)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        // You might want to show a toast notification here
        alert('Link copied to clipboard!');
        break;
    }
  };

  // Ensure instant scroll to top when component mounts or ID changes
  useEffect(() => {
    // Force instant scroll to top without any animation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });
    
    // Prevent any potential scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, [id]);

  if (!story) {
    return (
      <div className="min-h-screen bg-charity-light">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-charity-dark mb-6">Story Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">The story you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="inline-block">
            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charity-light">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back to Stories</span>
            </Link>
            
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-charity-light text-charity-dark text-xs font-medium rounded-full">
                  {story.category}
                </span>
                <span className="text-sm text-gray-500">•</span>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {story.date}
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-charity-dark mb-6 leading-tight">
                {story.fullQuote}
              </h1>
              
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{story.name}</h3>
                  <p className="text-sm text-gray-600">{story.role}</p>
                </div>
                <div className="ml-auto flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < story.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="prose max-w-none text-gray-700 mb-8" dangerouslySetInnerHTML={{ __html: story.content }} />
              
              <div className="pt-6 border-t border-gray-100">
                {/* Comment Form - Initially hidden, shows when clicking "Share your thoughts" */}
                <div className={`mb-8 transition-all duration-300 ${isCommentFormVisible ? 'block' : 'hidden'}`}>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Share your thoughts</h3>
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comment *</label>
                      <Textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        rows={4}
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsCommentFormVisible(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting || !comment.trim() || !name.trim()}
                      >
                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Comments Section */}
                {comments.length > 0 && (
                  <div className="mt-8 space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                    </h3>
                    {comments.map((item, index) => (
                      <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start">
                          <div className="bg-primary/10 text-primary h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                            <User className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <span className="text-xs text-gray-400">{item.date}</span>
                            </div>
                            <p className="mt-1 text-gray-600">{item.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setIsCommentFormVisible(!isCommentFormVisible)}
                      className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      <span>{isCommentFormVisible ? 'Hide comment form' : 'Share your thoughts'}</span>
                    </button>
                    
                    {/* Share Dropdown */}
                    <div className="relative group">
                      <button className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                        <Share2 className="w-5 h-5 mr-2" />
                        <span>Share story</span>
                      </button>
                      <div className="absolute left-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <button 
                          onClick={() => handleShare('facebook')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                          Share on Facebook
                        </button>
                        <button 
                          onClick={() => handleShare('twitter')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                          Share on Twitter
                        </button>
                        <button 
                          onClick={() => handleShare('linkedin')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                          Share on LinkedIn
                        </button>
                        <button 
                          onClick={() => handleShare('email')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <Mail className="w-4 h-4 mr-2 text-gray-500" />
                          Share via Email
                        </button>
                        <button 
                          onClick={() => handleShare('copy')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <LinkIcon className="w-4 h-4 mr-2 text-gray-500" />
                          Copy Link
                        </button>
                      </div>
                    </div>
                  </div>
                  <Link to="/stories" className="text-primary hover:text-primary/80 font-medium">
                    View all stories 
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Related Stories */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-charity-dark mb-8">More Inspiring Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories
                  .filter(s => s.id !== id)
                  .slice(0, 3)
                  .map(story => (
                    <Link 
                      key={story.id} 
                      to={`/stories/${story.id}`}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={story.image} 
                          alt={story.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          {story.date}
                        </div>
                        <h3 className="text-lg font-semibold text-charity-dark mb-2 line-clamp-2">
                          {story.fullQuote}
                        </h3>
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">{story.name}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StoryDetail;
