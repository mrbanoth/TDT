import React from 'react';
import { Story } from '@/data/home/stories';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import Image from 'next/image';

interface StoriesOfImpactProps {
  title?: string;
  description?: string;
  maxItems?: number;
  showViewAll?: boolean;
}

export function StoriesOfImpact({
  title = "Stories of Impact",
  description = "Discover the real-life impact of our programs through these inspiring stories",
  maxItems = 4,
  showViewAll = true,
}: StoriesOfImpactProps) {
  // Import stories directly (in a real app, you might want to fetch this data)
  const { allStories } = require('@/data/home/stories');
  const displayedStories = maxItems ? allStories.slice(0, maxItems) : allStories;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedStories.map((story: Story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-200">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
                {story.category === 'media' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <PlayCircle className="h-12 w-12 text-white" />
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{story.date}</span>
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {story.category === 'media' ? 'Video' : 'Article'}
                  </span>
                </div>
                <CardTitle className="text-xl">{story.title}</CardTitle>
                <CardDescription>{story.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="link" className="p-0 h-auto">
                  Read more
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {showViewAll && allStories.length > maxItems && (
          <div className="text-center mt-10">
            <Button variant="outline" size="lg">
              View All Stories
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default StoriesOfImpact;
