import { createClient, EntryCollection } from 'contentful';

// Contentful client configuration

// Create Contentful client
export const contentfulClient = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || '',
  environment: 'master'
});

// Helper function to get events
// Interface for Past Event
export interface PastEvent {
  id: string;
  title: string;
  eventDate: string;
  eventType: string;
  location: string;
  featuredImage: string;
  gallery?: string[];
  shortDescription: string;
  fullDescription: any; // Rich text content
  keyAchievements: any;  // Rich text content
  participantCount?: number;
  impactMetrics?: any;   // Rich text content
  slug: string;
}

export async function getPastEvents(): Promise<PastEvent[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'pastEvent',
      'fields.status': 'Published',
      order: ['-fields.eventDate']
    });
    
    if (!response.items || response.items.length === 0) {
      return [];
    }
    
    return response.items.map((item: any) => {
      const fields = item.fields || {};
      const featuredImage = fields.featuredImage?.fields?.file?.url 
        ? `https:${fields.featuredImage.fields.file.url}`
        : '/placeholder-event.jpg';
      
      const gallery = fields.gallery?.map((img: any) => 
        img?.fields?.file?.url ? `https:${img.fields.file.url}` : ''
      ).filter(Boolean) || [];
      
      return {
        id: item.sys.id,
        title: fields.title || '',
        eventDate: fields.eventDate || '',
        eventType: fields.eventType || '',
        location: fields.location || '',
        featuredImage,
        gallery,
        shortDescription: fields.shortDescription || '',
        fullDescription: fields.fullDescription || {},
        keyAchievements: fields.keyAchievements || {},
        participantCount: fields.participantCount || 0,
        impactMetrics: fields.impactMetrics || {},
        slug: fields.slug || ''
      };
    });
  } catch (error) {
    console.error('Error fetching past events:', error);
    return [];
  }
}

export async function getEvents() {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'event',
      'fields.status': 'Published',
      order: ['-fields.date']
    });
    
    if (!response.items || response.items.length === 0) {
      return [];
    }
    
    // Transform Contentful data to match your existing Event interface
    const events = response.items.map((item: any) => {
      try {
        const fields = item.fields || {};
        const imageUrl = fields.image?.fields?.file?.url 
          ? `https:${fields.image.fields.file.url}` 
          : '/placeholder-event.jpg';
        
        let details: string[] = [];
        if (fields.details?.content?.[0]?.content) {
          details = fields.details.content[0].content
            .filter((c: any) => c.nodeType === 'text')
            .map((c: any) => c.value);
        }
        
        const eventData = {
          id: item.sys?.id || '',
          title: fields.title || '',
          type: fields.type || '',
          date: fields.date ? new Date(fields.date).toLocaleDateString() : '',
          time: fields.time || '',
          location: fields.location || '',
          participants: fields.participants || '',
          image: imageUrl,
          description: fields.description || '',
          details: details
        };
        
        return eventData;
      } catch (error) {
        console.error('Error processing event:', error);
        console.error('Problematic event data:', item);
        return null;
      }
    }).filter(Boolean); // Remove any null entries from failed processing
    
    return events;
  } catch (error: any) {
    console.error('Error fetching events from Contentful:', {
      message: error.message,
      code: error.code,
      status: error.status,
      statusText: error.statusText,
      details: error.details
    });
    
    // Check for common issues
    if (error.message.includes('No space ID specified')) {
      console.error('⚠️ Contentful Space ID is missing. Check your .env file.');
    }
    
    if (error.message.includes('No access token specified')) {
      console.error('⚠️ Contentful Access Token is missing. Check your .env file.');
    }
    
    if (error.status === 401) {
      console.error('⚠️ Contentful authentication failed. Check your access token.');
    }
    
    if (error.status === 404) {
      console.error('⚠️ Contentful space not found. Check your space ID.');
    }
    
    return [];
  }
}
