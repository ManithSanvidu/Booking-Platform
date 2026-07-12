import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { Ticket, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.access_token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-[480px] xl:w-[560px] mx-auto animate-fade-in-up">
        <div className="w-full max-w-sm mx-auto lg:w-96">
          <Link to="/" className="flex items-center text-primary font-black text-2xl tracking-tighter gap-2 mb-12 hover:opacity-80">
            <Ticket className="w-8 h-8 stroke-[2.5]" />
            <span>Lumina<span className="text-dark">Events</span></span>
          </Link>
          
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">Sign in to book and manage your unforgettable experiences.</p>

          <div className="mt-8">
            {error && <div className="bg-rose-50 text-rose-600 p-4 rounded-xl mb-6 text-sm font-semibold">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email address</label>
                <input type="email" className="input-field" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                <input type="password" className="input-field" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary w-full py-3 mt-4 flex items-center justify-center gap-2 group">
                {loading ? 'Signing in...' : (
                  <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>
          </div>
          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            Don't have an account? <Link to="/register" className="font-bold text-primary hover:text-primary-hover">Join Now</Link>
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden md:block relative w-full flex-1">
        <img className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1500" alt="Concert crowd" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent mix-blend-multiply" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h3 className="text-4xl font-bold mb-4">Feel the Energy.</h3>
          <p className="text-lg font-medium text-white/80">Get exclusive access to the world's most anticipated events and festivals.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
