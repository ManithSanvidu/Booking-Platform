import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface EventData {
  id: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  isActive: boolean;
}

const Home = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/services');
        setEvents(response.data.filter((s: EventData) => s.isActive));
      } catch (error) {
        console.error('Failed to fetch events', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=2000" alt="Event Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            Discover Unforgettable <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Experiences</span>
          </h1>
          <p className="text-xl text-slate-200 font-medium mb-10 max-w-2xl mx-auto">
            Book your tickets for the most anticipated concerts, workshops, and exclusive events happening right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#events" className="btn btn-primary text-lg px-8 py-4">Explore Events</a>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Trending Events</h2>
            <p className="text-slate-500 mt-2 text-lg">Secure your spot before they sell out.</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="card h-96 animate-pulse bg-slate-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Check back soon!</h3>
                <p className="text-slate-500">We are currently preparing an amazing lineup of events.</p>
              </div>
            ) : (
              events.map(event => {
                let imgSrc = `https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&random=${event.id}`;
                if (event.title.includes('Neon Nights')) imgSrc = 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=800';
                if (event.title.includes('Tech Innovation')) imgSrc = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800';
                if (event.title.includes('Global Food')) imgSrc = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800';
                
                return (
                  <div key={event.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-indigo-100">
                      <img 
                        src={imgSrc} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-900 shadow-sm">
                        ${event.price}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{event.title}</h3>
                      <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-1">{event.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm font-medium text-slate-600 mb-6 bg-slate-50 p-3 rounded-xl">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{event.duration} mins</span>
                        </div>
                        <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>Available Now</span>
                        </div>
                      </div>
                      
                      <Link to={`/book/${event.id}`} className="btn bg-slate-900 text-white hover:bg-slate-800 w-full group/btn">
                        Book Tickets <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
