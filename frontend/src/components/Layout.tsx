import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Ticket, LogOut, Settings, LogIn, UserPlus } from 'lucide-react';

const Layout = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {!isAuthPage && (
        <nav className="glass-nav fixed w-full top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20">
              <div className="flex items-center">
                <Link to="/" className="flex items-center text-primary font-black text-2xl tracking-tighter gap-2 hover:scale-105 transition-transform">
                  <Ticket className="w-8 h-8 stroke-[2.5]" />
                  <span>Lumina<span className="text-dark">Events</span></span>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                {token ? (
                  <>
                    <Link to="/services" className="text-slate-600 hover:text-primary px-4 py-2 rounded-full font-semibold transition-colors flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Manage Events
                    </Link>
                    <Link to="/bookings" className="text-slate-600 hover:text-primary px-4 py-2 rounded-full font-semibold transition-colors flex items-center gap-2">
                      <Ticket className="w-4 h-4" /> My Tickets
                    </Link>
                    <button onClick={handleLogout} className="text-slate-600 hover:text-rose-500 px-4 py-2 rounded-full font-semibold transition-colors flex items-center gap-2">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-slate-600 hover:text-primary px-4 py-2 rounded-full font-semibold transition-colors flex items-center gap-2">
                      <LogIn className="w-4 h-4" /> Sign In
                    </Link>
                    <Link to="/register" className="btn btn-primary ml-2 gap-2">
                      <UserPlus className="w-4 h-4" /> Join Now
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className={`flex-1 flex flex-col ${!isAuthPage ? 'pt-20' : ''}`}>
        <Outlet />
      </main>
      
      {!isAuthPage && (
        <footer className="bg-white border-t border-slate-200 mt-auto py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} Lumina Events. Experience the unforgettable.
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
