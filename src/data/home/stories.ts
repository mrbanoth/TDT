export interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'text' | 'media';
  date: string;
  author: string;
  content?: string; // For text stories
  videoUrl?: string; // For media stories
  readTime?: string;
  tags?: string[];
}

export const textStories: Story[] = [
  {
    id: 'story-1',
    title: 'Transforming Lives Through Education',
    description: 'How our education program helped a young girl pursue her dreams',
    category: 'text',
    date: '2025-05-15',
    author: 'Priya Sharma',
    content: 'Full story content would go here...',
    readTime: '5 min read',
    image: '/images/stories/education-story.jpg',
    tags: ['education', 'success-story', 'impact']
  },
  // Add more text stories as needed
];

export const mediaStories: Story[] = [
  {
    id: 'media-1',
    title: 'Community Health Camp Success',
    description: 'Watch how our health camp provided care to 500+ people',
    category: 'media',
    date: '2025-06-01',
    author: 'Rahul Verma',
    videoUrl: 'https://www.youtube.com/embed/example123',
    image: '/images/stories/health-camp.jpg',
    tags: ['health', 'community', 'video']
  },
  // Add more media stories as needed
];

// Combine all stories
export const allStories = [...textStories, ...mediaStories];
