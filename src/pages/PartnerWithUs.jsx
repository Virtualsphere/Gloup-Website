import React, { useState } from 'react';
import { CheckCircle, TrendingUp, Users, Calendar, Star, ArrowRight, Store, Scissors, Sparkles, Loader2 } from 'lucide-react';
import { useEnquiry } from '../hooks/useEnquiry';

const INDIAN_STATES = [
  'Andaman & Nicobar Islands','Andhra Pradesh','Arunachal Pradesh','Assam',
  'Bihar','Chandigarh','Chhattisgarh',
  'Dadra & Nagar Haveli and Daman & Diu','Delhi',
  'Goa','Gujarat','Haryana','Himachal Pradesh',
  'Jammu & Kashmir','Jharkhand','Karnataka','Kerala',
  'Ladakh','Lakshadweep',
  'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
  'Nagaland','Odisha','Puducherry','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
  'Uttar Pradesh','Uttarakhand','West Bengal',
];

/* ─── Data ─────────────────────────────────────────────────────────────── */
const benefits = [
  { icon: TrendingUp, title: 'Grow Your Revenue',         desc: 'Reach thousands of new customers actively looking for salons and spas in your area.' },
  { icon: Calendar,   title: 'Smart Booking Management',  desc: 'Manage all your appointments from one powerful dashboard. No more double bookings.' },
  { icon: Users,      title: 'Build a Loyal Clientele',   desc: 'Turn first-time visitors into regulars with reviews, loyalty perks, and follow-ups.' },
  { icon: Star,       title: 'Boost Your Reputation',     desc: 'Collect genuine reviews and showcase your work to stand out from the competition.' },
];

const steps = [
  { step: '01', title: 'Register Your Business', desc: 'Fill in the form below with your salon details and submit your application.' },
  { step: '02', title: 'Get Verified',            desc: 'Our team reviews your application and verifies your business within 24–48 hours.' },
  { step: '03', title: 'Go Live & Grow',          desc: 'Your salon goes live on Gloup. Start accepting bookings and growing your client base.' },
];

const partnerTypes = [
  { icon: Scissors, label: 'Salon' },
  { icon: Sparkles, label: 'Spa' },
  { icon: Store,    label: 'Grooming Studio' },
];

/* ─── Shared layout shell ───────────────────────────────────────────────── */
// All sections share this wrapper: full-width outer, capped inner
const Section = ({ children, className = '', innerClass = '' }) => (
  <section className={`w-full px-6 md:px-10 xl:px-16 ${className}`}>
    <div className={`max-w-7xl mx-auto ${innerClass}`}>
      {children}
    </div>
  </section>
);

/* ─── Component ─────────────────────────────────────────────────────────── */
const PartnerWithUs = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', state: '', type: '' });
  const [submitted, setSubmitted] = useState(false);

  const { mutate: submitEnquiry, isPending } = useEnquiry({
    onSuccess: () => setSubmitted(true),
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitEnquiry({
      name: form.name,
      email: form.email,
      phone: form.phone,
      state: form.state,
    });
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-100 w-full">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 xl:px-16 py-24 md:py-36 xl:py-44 text-center">
          <span className="inline-block text-xs xl:text-sm font-semibold tracking-[0.2em] uppercase border border-black px-4 py-1.5 rounded-full mb-8">
            Partner Programme
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight tracking-tight mb-6">
            Grow Your Business with{' '}
            <span className="underline decoration-4 underline-offset-4">Gloup</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl xl:text-2xl max-w-2xl xl:max-w-3xl mx-auto mb-10 leading-relaxed">
            Expand your reach, boost your bookings, and join a trusted network of salons, spas and grooming studios ready to grow together.
          </p>
          <a
            href="#partner-form"
            className="inline-flex items-center gap-2 bg-black text-white font-semibold px-8 xl:px-10 py-4 xl:py-5 rounded-full text-sm xl:text-base hover:bg-gray-900 transition-all duration-200 group"
          >
            Become a Partner
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* ── Partner Types ────────────────────────────────────────────────── */}
      <Section innerClass="py-16 xl:py-20 grid grid-cols-3 gap-6 xl:gap-10 text-center">
        {partnerTypes.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="border border-gray-100 rounded-2xl xl:rounded-3xl py-10 xl:py-14 px-4 flex flex-col items-center gap-3 hover:border-black transition-colors duration-200"
          >
            <Icon size={32} strokeWidth={1.5} className="xl:w-10 xl:h-10" />
            <span className="font-semibold text-sm xl:text-base tracking-wide">{label}</span>
          </div>
        ))}
      </Section>

      {/* ── Benefits ─────────────────────────────────────────────────────── */}
      <section className="bg-black text-white w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-16 py-20 xl:py-28">
          <p className="text-xs xl:text-sm font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3">Why Gloup</p>
          <h2 className="text-3xl md:text-5xl xl:text-6xl font-extrabold mb-14 xl:mb-20 leading-tight">
            Everything you need to thrive
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border border-white/10 rounded-2xl xl:rounded-3xl p-8 xl:p-10 hover:border-white/30 transition-colors duration-200">
                <div className="w-11 h-11 xl:w-14 xl:h-14 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-white xl:w-6 xl:h-6" />
                </div>
                <h3 className="font-bold text-lg xl:text-xl mb-2">{title}</h3>
                <p className="text-gray-400 text-sm xl:text-base leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <Section className="border-b border-gray-100" innerClass="py-20 xl:py-28">
        <p className="text-xs xl:text-sm font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3 text-center">The Process</p>
        <h2 className="text-3xl md:text-5xl xl:text-6xl font-extrabold mb-14 xl:mb-20 text-center">How it works</h2>
        <div className="relative flex flex-col md:flex-row gap-8 xl:gap-10">
          {steps.map(({ step, title, desc }, i) => (
            <div key={step} className="flex-1 relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-px bg-gray-200 -translate-x-4 z-0" />
              )}
              <div className="relative border border-gray-100 rounded-2xl xl:rounded-3xl p-8 xl:p-10 hover:border-black transition-colors duration-200">
                <span className="text-4xl xl:text-6xl font-black text-gray-100">{step}</span>
                <h3 className="font-bold text-base xl:text-lg mt-3 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm xl:text-base leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Partner App Section ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black text-white w-full">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 xl:px-16 py-20 xl:py-28 flex flex-col md:flex-row items-center gap-16 xl:gap-24">

          {/* Left */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block text-[10px] xl:text-xs font-bold tracking-[0.25em] uppercase bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6">
              Partner App
            </span>
            <h2 className="text-3xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-5">
              Manage your salon<br />
              <span className="text-gray-400">from anywhere.</span>
            </h2>
            <p className="text-gray-400 text-base xl:text-lg leading-relaxed max-w-md xl:max-w-lg mb-10">
              Download the Gloup Partner app and take full control — track bookings, respond to reviews, and monitor earnings right from your phone.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {/* App Store */}
              <a href="https://apps.apple.com/sg/app/gloup-partner/id6752799057" target='_blank' className="flex items-center gap-3 bg-white text-black px-6 xl:px-7 py-3.5 xl:py-4 rounded-2xl hover:bg-gray-100 transition-all duration-200 shadow-lg shadow-white/10">
                <svg viewBox="0 0 24 24" className="w-6 h-6 xl:w-7 xl:h-7 fill-black shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="flex flex-col leading-tight text-left">
                  <span className="text-[10px] xl:text-xs text-gray-500">Download on the</span>
                  <span className="text-sm xl:text-base font-bold">App Store</span>
                </div>
              </a>

              {/* Google Play */}
              <a href="https://play.google.com/store/apps/details?id=com.gloup.partnerapp" target="_blank" className="flex items-center gap-3 bg-white text-black px-6 xl:px-7 py-3.5 xl:py-4 rounded-2xl hover:bg-gray-100 transition-all duration-200 shadow-lg shadow-white/10">
                <svg viewBox="0 0 24 24" className="w-6 h-6 xl:w-7 xl:h-7 shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.18 23.76c.3.17.65.19.98.07l12.65-7.32-2.7-2.7z" fill="#EA4335"/>
                  <path d="M22.14 10.31 19.5 8.82l-3.03 3.03 3.03 3.03 2.67-1.54a1.52 1.52 0 0 0 0-3.03z" fill="#FBBC05"/>
                  <path d="m3.18.24 12.64 7.32-2.7 2.7L.98.31A1.2 1.2 0 0 1 3.18.24z" fill="#4285F4"/>
                  <path d="M3.18 23.76.98 22.7A1.2 1.2 0 0 1 .18 21.6V2.4c0-.48.3-.9.8-1.1l12.64 11.55z" fill="#34A853"/>
                </svg>
                <div className="flex flex-col leading-tight text-left">
                  <span className="text-[10px] xl:text-xs text-gray-500">GET IT ON</span>
                  <span className="text-sm xl:text-base font-bold">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right: mock phone */}
          <div className="relative flex-shrink-0 flex items-center justify-center w-64 xl:w-80">
            <div className="absolute w-56 h-56 xl:w-72 xl:h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="relative w-52 xl:w-64 bg-white/5 border border-white/15 rounded-[2.5rem] p-4 xl:p-5 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] xl:text-xs font-bold tracking-wide">Gloup Partner</span>
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_2px_rgba(74,222,128,0.5)]" />
              </div>
              {[
                { label: "Today's Bookings", value: '12',      delta: '+3'   },
                { label: 'Monthly Earnings', value: '₹48,200', delta: '+12%' },
                { label: 'Avg. Rating',      value: '4.8 ★',   delta: ''     },
              ].map(({ label, value, delta }) => (
                <div key={label} className="mb-3 bg-white/8 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-[10px] xl:text-[11px] text-gray-500 mb-0.5">{label}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm xl:text-base font-bold">{value}</span>
                    {delta && <span className="text-[10px] xl:text-xs text-green-400 font-semibold">{delta}</span>}
                  </div>
                </div>
              ))}
              <div className="mt-4 flex justify-around pt-3 border-t border-white/10 text-[10px] xl:text-xs text-gray-500">
                <span>Home</span><span>Bookings</span><span>Insights</span><span>Profile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Form ─────────────────────────────────────────────────────── */}
      <Section innerClass="py-20 xl:py-28">
        <div className="max-w-2xl xl:max-w-3xl mx-auto">
          <p className="text-xs xl:text-sm font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3 text-center" id="partner-form">Get Started</p>
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-extrabold mb-2 text-center">Apply to become a partner</h2>
          <p className="text-gray-500 text-sm xl:text-base text-center mb-10">Our team will reach out within 24–48 hours.</p>

          {submitted ? (
            <div className="border border-black rounded-2xl xl:rounded-3xl p-12 xl:p-16 text-center flex flex-col items-center gap-4">
              <CheckCircle size={48} strokeWidth={1.5} />
              <h3 className="text-xl xl:text-2xl font-bold">Application Received!</h3>
              <p className="text-gray-500 text-sm xl:text-base max-w-xs">
                Thank you for your interest. Our team will get in touch with you within 24–48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-gray-100 rounded-2xl xl:rounded-3xl p-8 md:p-10 xl:p-12 flex flex-col gap-5 xl:gap-6">
              <div>
                <label className="block text-xs xl:text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2">Business Type</label>
                <div className="flex gap-3 flex-wrap">
                  {partnerTypes.map(({ label }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setForm({ ...form, type: label })}
                      className={`px-4 py-2 xl:px-5 xl:py-2.5 rounded-full text-sm xl:text-base border font-medium transition-all duration-150 ${
                        form.type === label
                          ? 'bg-black text-white border-black'
                          : 'border-gray-200 text-gray-600 hover:border-black'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 xl:gap-6">
                <Field label="Your Name"    name="name"  placeholder="John Doe"          value={form.name}  onChange={handleChange} required />
                <Field label="Email"        name="email" placeholder="hello@example.com"  value={form.email} onChange={handleChange} required type="email" />
                <Field label="Phone Number" name="phone" placeholder="+91 98765 43210"    value={form.phone} onChange={handleChange} required type="tel" />
                <StateField value={form.state} onChange={handleChange} />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="mt-2 w-full bg-black text-white font-semibold py-4 xl:py-5 rounded-full hover:bg-gray-900 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 group text-sm xl:text-base"
              >
                {isPending ? (
                  <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </Section>

      {/* ── Bottom Banner ────────────────────────────────────────────────── */}
      <section className="bg-black text-white w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-16 py-16 xl:py-24 text-center">
          <h2 className="text-2xl md:text-3xl xl:text-5xl font-extrabold mb-3">Already trusted by 500+ businesses</h2>
          <p className="text-gray-400 text-sm xl:text-base max-w-md xl:max-w-xl mx-auto">
            Join the fastest-growing beauty & grooming platform in India and take your business to the next level.
          </p>
        </div>
      </section>

    </div>
  );
};

/* ─── Reusable Field ─────────────────────────────────────────────────────── */
const Field = ({ label, name, placeholder, value, onChange, required, type = 'text' }) => (
  <div>
    <label className="block text-xs xl:text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-200 rounded-xl xl:rounded-2xl px-4 py-3 xl:py-4 text-sm xl:text-base outline-none focus:border-black transition-colors duration-150 placeholder:text-gray-300"
    />
  </div>
);

/* ─── State Select ───────────────────────────────────────────────────────── */
const StateField = ({ value, onChange }) => (
  <div>
    <label className="block text-xs xl:text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2">State</label>
    <select
      name="state"
      value={value}
      onChange={onChange}
      required
      className="w-full border border-gray-200 rounded-xl xl:rounded-2xl px-4 py-3 xl:py-4 text-sm xl:text-base outline-none focus:border-black transition-colors duration-150 bg-white text-gray-700 cursor-pointer"
    >
      <option value="" disabled>Select your state</option>
      {INDIAN_STATES.map(s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  </div>
);

export default PartnerWithUs;
