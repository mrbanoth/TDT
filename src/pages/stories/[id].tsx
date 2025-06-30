import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { allStories } from '@/data/home/stories';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

interface StoryPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const story = allStories.find(s => s.id === params.id);
  
  if (!story) {
    return {
      title: 'Story Not Found',
    };
  }

  return {
    title: `${story.title} | Stories of Impact`,
    description: story.description,
    openGraph: {
      images: [story.image],
    },
  };
}

export default function StoryPage({ params }: StoryPageProps) {
  const story = allStories.find(s => s.id === params.id);

  if (!story) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <Button asChild variant="ghost" className="mb-6 -ml-2">
        <Link href="/stories">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Stories
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{story.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(story.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div className="flex items-center">
            <span>By {story.author}</span>
          </div>
          {story.readTime && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {story.readTime}
            </div>
          )}
        </div>

        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {story.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden mb-8 bg-gray-100">
        <Image
          src={story.image}
          alt={story.title}
          fill
          className="object-cover"
          priority
        />
        {story.category === 'media' && story.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <a 
              href={story.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <PlayCircle className="h-12 w-12" />
              <span className="sr-only">Play Video</span>
            </a>
          </div>
        )}
      </div>

      <div className="prose max-w-none">
        {story.content ? (
          <div dangerouslySetInnerHTML={{ __html: story.content }} />
        ) : (
          <p className="text-gray-600">No content available for this story.</p>
        )}
      </div>
    </article>
  );
}

// Generate static paths for all stories
export async function generateStaticParams() {
  return allStories.map((story) => ({
    id: story.id,
  }));
}
