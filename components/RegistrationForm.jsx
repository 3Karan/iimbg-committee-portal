'use client';
import { useState } from 'react';
import eventsData from '@/data/events.json';

/**
 * RegistrationForm Component
 * 
 * Submits registration data to a Google Apps Script Web App endpoint,
 * which stores it in a Google Sheet. If no endpoint URL is configured,
 * the form will still validate but warn the user that backend isn't set up.
 * 
 * Required env var: NEXT_PUBLIC_APPS_SCRIPT_URL
 * See scripts/SETUP.md for setup instructions.
 */
export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event: '',
    comments: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  // --------------- Validation ---------------

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) error = 'Name is required';
      else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
    } else if (name === 'email') {
      if (!value.trim()) error = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address';
    } else if (name === 'phone') {
      if (!value.trim()) error = 'Phone number is required';
      else if (!/^\d{10}$/.test(value.replace(/\s/g, ''))) error = 'Phone must be exactly 10 digits';
    } else if (name === 'event') {
      if (!value) error = 'Please select an event';
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const validateAll = () => {
    const newErrors = {};
    let isValid = true;
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  };

  // --------------- Submission ---------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setStatus('loading');
    
    try {
      const url = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

      if (!url) {
        // No backend URL configured — show a clear error instead of faking success
        throw new Error(
          'Backend not configured. Set NEXT_PUBLIC_APPS_SCRIPT_URL in .env.local — see scripts/SETUP.md for instructions.'
        );
      }

      // Google Apps Script Web Apps require special handling:
      // - Use 'no-cors' mode because Apps Script doesn't set CORS headers for POST
      // - Send as URL-encoded form data (not JSON) for reliable parsing
      // - With 'no-cors', the response is opaque (status 0), so we assume success
      //   if the fetch itself doesn't throw a network error.
      //
      // The Apps Script doPost() function reads the data and appends it to Google Sheets.

      const formBody = new URLSearchParams();
      formBody.append('name', formData.name.trim());
      formBody.append('email', formData.email.trim());
      formBody.append('phone', formData.phone.trim());
      formBody.append('event', formData.event);
      formBody.append('comments', formData.comments.trim());

      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      // If we reach here, the network request succeeded.
      // With 'no-cors', we can't read the response body, but the data
      // has been sent to the Apps Script endpoint which stores it in Sheets.
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', event: '', comments: '' });
      setTouched({});

    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  // --------------- Success State ---------------

  if (status === 'success') {
    return (
      <div className="bg-white/[0.03] backdrop-blur-lg border border-white/10 p-8 rounded-3xl text-center flex flex-col items-center justify-center min-h-[400px] animate-fade-in-up">
        <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 border-2 border-green-500/50">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3>
        <p className="text-slate-300 mb-2">Thank you for registering. We look forward to seeing you.</p>
        <p className="text-slate-400 text-sm mb-8">Your registration has been saved to our records.</p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10"
        >
          Register for another event
        </button>
      </div>
    );
  }

  // --------------- Form ---------------

  return (
    <div className="bg-white/[0.03] backdrop-blur-lg border border-white/10 p-6 md:p-10 rounded-3xl w-full max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-2 border-b border-white/10 pb-4">
        Event Registration
      </h3>
      <p className="text-slate-400 text-sm mb-8">
        Fields marked with <span className="text-red-400">*</span> are required
      </p>
      
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
          <div className="flex justify-between items-start gap-4">
            <p>{errorMessage}</p>
            <button 
              onClick={() => setStatus('idle')} 
              className="whitespace-nowrap underline hover:text-red-300 font-medium"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name */}
        <div>
          <label htmlFor="reg-name" className="block text-sm font-medium text-slate-300 mb-2">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="reg-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full bg-[#0a1628]/50 border ${errors.name && touched.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-[#d4a853] transition-all`}
            placeholder="e.g. Arjun Mehta"
            autoComplete="name"
          />
          {errors.name && touched.name && <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">⚠ {errors.name}</p>}
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium text-slate-300 mb-2">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="reg-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-[#0a1628]/50 border ${errors.email && touched.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-[#d4a853] transition-all`}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && touched.email && <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">⚠ {errors.email}</p>}
          </div>
          <div>
            <label htmlFor="reg-phone" className="block text-sm font-medium text-slate-300 mb-2">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              id="reg-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-[#0a1628]/50 border ${errors.phone && touched.phone ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-[#d4a853] transition-all`}
              placeholder="9876543210"
              autoComplete="tel"
            />
            {errors.phone && touched.phone && <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">⚠ {errors.phone}</p>}
          </div>
        </div>

        {/* Event Selection */}
        <div>
          <label htmlFor="reg-event" className="block text-sm font-medium text-slate-300 mb-2">
            Select Event <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              id="reg-event"
              name="event"
              value={formData.event}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-[#0a1628]/50 border ${errors.event && touched.event ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-[#d4a853] transition-all appearance-none cursor-pointer`}
            >
              <option value="" disabled className="bg-[#111d35] text-slate-400">-- Choose an Event --</option>
              {eventsData.map(evt => (
                <option key={evt.id} value={evt.name} className="bg-[#111d35] text-white">
                  {evt.name} — {new Date(evt.date + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.event && touched.event && <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">⚠ {errors.event}</p>}
        </div>

        {/* Comments */}
        <div>
          <label htmlFor="reg-comments" className="block text-sm font-medium text-slate-300 mb-2">
            Comments <span className="text-slate-500">(Optional)</span>
          </label>
          <textarea
            id="reg-comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="4"
            className="w-full bg-[#0a1628]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-[#d4a853] transition-all resize-none"
            placeholder="Any questions or special requirements?"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-gradient-to-r from-[#d4a853] to-[#f0c75e] text-[#0a1628] font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,168,83,0.4)] hover:scale-[1.01] focus:outline-none disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-lg"
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin h-5 w-5 text-[#0a1628]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Submitting...</span>
            </>
          ) : (
            'Submit Registration'
          )}
        </button>

        {/* Data storage notice */}
        <p className="text-xs text-slate-500 text-center">
          Your data is securely stored in Google Sheets via Google Apps Script.
        </p>
      </form>
    </div>
  );
}
