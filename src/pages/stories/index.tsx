import { Metadata } from 'next';
import { StoriesOfImpact } from '@/components/StoriesOfImpact';

export const metadata: Metadata = {
  title: 'Stories of Impact',
  description: 'Read inspiring stories of how our programs are making a difference in people\'s lives.',
};

export default function StoriesPage() {
  return (
    <main>
      <StoriesOfImpact 
        title="All Impact Stories"
        description="Explore the full collection of stories showcasing the real impact of our work"
        maxItems={0} // Show all stories
        showViewAll={false}
      />
    </main>
  );
}
