import { Link } from 'react-router-dom';

export const EventCard = ({ event }) => {
  if (!event || !event.fields) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      {event.fields.image && (
        <img
          src={event.fields.image.fields.file.url}
          alt={event.fields.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {event.fields.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.fields.shortDescription}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{event.fields.date ? new Date(event.fields.date).toLocaleDateString() : 'Date TBD'}</span>
          <Link 
            to={`/events/${event.fields.slug}`}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  );
};
