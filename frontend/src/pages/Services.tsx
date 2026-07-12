import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  isActive: boolean;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({});
  const [isEditing, setIsEditing] = useState(false);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/services/${formData.id}`, formData);
      } else {
        await api.post('/services', formData);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
      console.error('Failed to save service', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await api.delete(`/services/${id}`);
        fetchServices();
      } catch (error) {
        console.error('Failed to delete service', error);
      }
    }
  };

  const openModal = (service?: Service) => {
    if (service) {
      setFormData(service);
      setIsEditing(true);
    } else {
      setFormData({ title: '', description: '', duration: 30, price: 0, isActive: true });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark">Manage Services</h1>
        <button onClick={() => openModal()} className="btn btn-primary flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">Title</th>
              <th className="px-6 py-3 font-medium text-gray-500">Price</th>
              <th className="px-6 py-3 font-medium text-gray-500">Duration</th>
              <th className="px-6 py-3 font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{service.title}</td>
                <td className="px-6 py-4">${service.price}</td>
                <td className="px-6 py-4">{service.duration} mins</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => openModal(service)} className="text-blue-600 hover:text-blue-800"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{isEditing ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" className="input-field" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="input-field" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} required />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input type="number" className="input-field" value={formData.price || 0} onChange={e => setFormData({...formData, price: Number(e.target.value)})} required min="0" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (mins)</label>
                  <input type="number" className="input-field" value={formData.duration || 0} onChange={e => setFormData({...formData, duration: Number(e.target.value)})} required min="1" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" checked={formData.isActive || false} onChange={e => setFormData({...formData, isActive: e.target.checked})} />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Service is active</label>
              </div>
              <button type="submit" className="btn btn-primary w-full">{isEditing ? 'Save Changes' : 'Create Service'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
