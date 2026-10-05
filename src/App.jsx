import React, { useState } from 'react';
import ScrollProgressBar from './components/ScrollProgressBar';
import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import Toast from './components/Toast';
import HeroSection from './sections/HeroSection';
import FleetSection from './sections/FleetSection';
import ServicesSection from './sections/ServicesSection';
import StatsSection from './sections/StatsSection';
import ExperienceSection from './sections/ExperienceSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const handleOpenBooking = (vehicle = null) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  const handleShowToast = (msg) => {
    setToastMessage(msg);
  };

  return (
    <div className="relative min-h-screen bg-[#07080b] text-slate-100 selection:bg-amber-500 selection:text-black font-sans">
      {/* 1. Scroll Progress Bar fixed to top */}
      <ScrollProgressBar />

      {/* 2. Interactive Morphing Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* 3. Main Sections */}
      <main id="main-content">
        {/* Hero Section with Parallax & Visual Scaling */}
        <HeroSection onOpenBooking={handleOpenBooking} />

        {/* Fleet Showroom with Category Filters & Staggered Cards */}
        <FleetSection onOpenBooking={handleOpenBooking} />

        {/* Bespoke Services Grid with Staggered Cascading Entrance */}
        <ServicesSection onOpenBooking={handleOpenBooking} />

        {/* Interactive Numbers & Social Proof with Ticking Counters */}
        <StatsSection />

        {/* The Royal Experience & Client Journey */}
        <ExperienceSection onOpenBooking={handleOpenBooking} />

        {/* Verified Elite Testimonials */}
        <TestimonialsSection />

        {/* Contact & VIP Lead Capture Form */}
        <ContactSection onShowToast={handleShowToast} />
      </main>

      {/* 4. Minimalist Luxury Footer */}
      <Footer />

      {/* 5. Interactive VIP Booking & Inquiry Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseBooking}
        selectedCar={selectedVehicle}
        onShowToast={handleShowToast}
      />

      {/* 6. Dynamic Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
