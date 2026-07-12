import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Calendar, Clock, CreditCard, ChevronLeft, Ticket } from 'lucide-react';

interface EventData {
  id: string;
  title: string;
  price: number;
  duration: number;
  description: string;
}

const PublicBooking = () => {
  const { serviceId } = useParams<{ serviceId: string }>();

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    bookingDate: '',
    bookingTime: '',
    notes: ''
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/services/${serviceId}`);
        setEvent(response.data);
      } catch (error) {
        setError('Event not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) fetchEvent();
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setIsSubmitting(true);

    try {
      await api.post('/bookings', {
        ...formData,
        serviceId
      });

      setSuccess(true);

    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        'Failed to complete booking. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse flex items-center gap-2">
          <Ticket className="w-6 h-6 text-primary animate-spin" />
          Loading event details...
        </div>
      </div>
    );
  }


  if (!event) {
    return (
      <div className="text-center py-20 text-rose-500 font-medium">
        {error}
      </div>
    );
  }


  if (success) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl text-center space-y-6 animate-fade-in-up">

        <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Ticket className="w-10 h-10" />
        </div>

        <h2 className="text-3xl font-black text-slate-900">
          Tickets Secured!
        </h2>

        <p className="text-slate-600 font-medium leading-relaxed">
          Your booking for{" "}
          <span className="text-slate-900 font-bold">
            {event.title}
          </span>{" "}
          has been confirmed. We've sent the details to{" "}
          {formData.customerEmail}.
        </p>

        <Link
          to="/"
          className="btn btn-primary w-full mt-4"
        >
          Return to Events
        </Link>

      </div>
    );
  }


  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 animate-fade-in-up">

      <Link
        to="/"
        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Events
      </Link>


      <div className="flex flex-col lg:flex-row gap-8">


        <div className="flex-1">

          <div className="card">

            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Guest Details
            </h2>


            {error && (
              <div className="bg-rose-50 text-rose-600 p-4 rounded-xl mb-6 text-sm font-semibold">
                {error}
              </div>
            )}


            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  className="input-field bg-slate-50"
                  placeholder="Alex Taylor"
                  value={formData.customerName}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      customerName:e.target.value
                    })
                  }
                  required
                />

              </div>


              <div className="flex flex-col sm:flex-row gap-5">


                <div className="flex-1">

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="input-field bg-slate-50"
                    placeholder="alex@example.com"
                    value={formData.customerEmail}
                    onChange={(e)=>
                      setFormData({
                        ...formData,
                        customerEmail:e.target.value
                      })
                    }
                    required
                  />

                </div>



                <div className="flex-1">

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    className="input-field bg-slate-50"
                    placeholder="+1 (555) 000-0000"
                    value={formData.customerPhone}
                    onChange={(e)=>
                      setFormData({
                        ...formData,
                        customerPhone:e.target.value
                      })
                    }
                    required
                  />

                </div>


              </div>


              <div className="border-t border-slate-100 my-6 pt-6" />


              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Event Schedule
              </h2>



              <div className="flex flex-col sm:flex-row gap-5">

                <div className="flex-1">

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Select Date
                  </label>

                  <input
                    type="date"
                    className="input-field bg-slate-50"
                    value={formData.bookingDate}
                    onChange={(e)=>
                      setFormData({
                        ...formData,
                        bookingDate:e.target.value
                      })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />

                </div>


                <div className="flex-1">

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Select Time
                  </label>


                  <input
                    type="time"
                    className="input-field bg-slate-50"
                    value={formData.bookingTime}
                    onChange={(e)=>
                      setFormData({
                        ...formData,
                        bookingTime:e.target.value
                      })
                    }
                    required
                  />

                </div>

              </div>



              <div>

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Special Requests (Optional)
                </label>

                <textarea
                  className="input-field bg-slate-50 resize-none"
                  placeholder="Any accessibility needs or special requirements?"
                  value={formData.notes}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      notes:e.target.value
                    })
                  }
                  rows={3}
                />

              </div>



              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full py-4 text-lg mt-8"
              >
                {
                  isSubmitting
                  ? "Processing..."
                  : `Confirm & Pay $${event.price}`
                }
              </button>


            </form>

          </div>

        </div>



        <div className="lg:w-[380px]">

          <div className="bg-slate-900 rounded-3xl p-8 text-white sticky top-28 shadow-2xl">


            <h3 className="text-lg font-bold text-slate-400 mb-6 uppercase tracking-wider">
              Order Summary
            </h3>


            <h4 className="text-2xl font-black mb-2">
              {event.title}
            </h4>


            <p className="text-slate-400 text-sm mb-8 line-clamp-3 leading-relaxed">
              {event.description}
            </p>



            <div className="space-y-4 mb-8">


              <div className="flex items-center justify-between text-sm font-medium">

                <span className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4"/>
                  Date
                </span>

                <span>
                  {formData.bookingDate || "Select a date"}
                </span>

              </div>



              <div className="flex items-center justify-between text-sm font-medium">

                <span className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4"/>
                  Duration
                </span>

                <span>
                  {event.duration} mins
                </span>

              </div>



              <div className="flex items-center justify-between text-sm font-medium">

                <span className="flex items-center gap-2 text-slate-300">
                  <Ticket className="w-4 h-4"/>
                  Tickets
                </span>

                <span>
                  1 x General Admission
                </span>

              </div>


            </div>


            <div className="border-t border-slate-700 pt-6 mb-6">

              <div className="flex justify-between text-sm text-slate-300 mb-2">
                <span>Subtotal</span>
                <span>${event.price}</span>
              </div>


              <div className="flex justify-between text-sm text-slate-300 mb-4">
                <span>Taxes & Fees</span>
                <span>Included</span>
              </div>


              <div className="flex justify-between text-2xl font-black">
                <span>Total</span>
                <span>${event.price}</span>
              </div>


            </div>



            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 bg-slate-800 py-3 rounded-xl">

              <CreditCard className="w-4 h-4"/>
              Secure Checkout

            </div>


          </div>

        </div>


      </div>

    </div>
  );
};


export default PublicBooking;
