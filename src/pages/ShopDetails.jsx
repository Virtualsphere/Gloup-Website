import React, { useState, useRef, useEffect } from 'react'
import Banner from '../componets/ShopDetails/Banner'
import DeskBanner from '../componets/ShopDetails/DeskBanner'
import ShortDetails from '../componets/ShopDetails/ShortDetails'
import SectionHeading from '../componets/ShopDetails/SectionHeading'
import Services from '../componets/ShopDetails/Services'
import About from '../componets/ShopDetails/About'
import Amenities from '../componets/ShopDetails/Amenities'
import Team from '../componets/ShopDetails/Team'
import Reviews from '../componets/ShopDetails/Reviews'
import OpeningHours from '../componets/ShopDetails/OpeningHours'
import Location from '../componets/ShopDetails/Location'
import PriceSection from '../componets/ShopDetails/PriceSection'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSalonDetails } from '../hooks/services/useSalonDetails'
import { useBookingStore } from '../store/bookingStore'
import { useAuthStore } from '../store/authStore'






// ─── Component ────────────────────────────────────────────────────────────────
const ShopDetails = () => {
  const isMobile = useMediaQuery(1024)

  const { id } = useParams()
  const { data, isLoading, isError } = useGetSalonDetails(id)

  console.log(data, "shop-details")

  const apiData = data?.data || {}
  const apiServices = apiData?.services || []

  console.log(apiServices);
  console.log(apiData)

  // ─── Booking Store ──────────────────────────────────────────────────────
  const setSalon = useBookingStore((s) => s.setSalon)
  const resetBooking = useBookingStore((s) => s.resetBooking)
  const currentSalonId = useBookingStore((s) => s.salon.id)
  const toggleService = useBookingStore((s) => s.toggleService)
  const storedServices = useBookingStore((s) => s.selectedServices)
  // Derive a Set of selected IDs directly — no extra function call, stays reactive
  const addedServices = new Set(storedServices.map((s) => s.id))

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const navigate = useNavigate()

  // Push salon info into the store — reset first if it's a different salon
  useEffect(() => {
    const incomingId = apiData?.id ?? apiData?._id
    if (!incomingId) return
    // If the user opened a different shop, wipe the previous booking data
    if (currentSalonId && currentSalonId !== incomingId) {
      resetBooking()
    }
    setSalon(apiData)
  }, [apiData?.id, apiData?._id])

  // Sticky header height tracking
  const shortDetailsRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  // Section nav refs
  const servicesRef = useRef(null)
  const aboutRef = useRef(null)
  const amenitiesRef = useRef(null)
  const teamRef = useRef(null)
  const reviewsRef = useRef(null)
  const [activeTab, setActiveTab] = useState('Services')

  const sectionRefs = {
    Services: servicesRef,
    About: aboutRef,
    Amenities: amenitiesRef,
    Team: teamRef,
    Reviews: reviewsRef,
  }

  /**
   * toggleService from the store expects the full service object so it can
   * store price/discount info for billing. Map the id to the full object here.
   */
  const handleToggleService = (serviceId) => {
    // Require login before adding any service
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    const service = apiServices.find((s) => s.id === serviceId || s._id === serviceId)
    if (service) {
      toggleService({
        id: service.id ?? service._id,
        name: service.name,
        duration: service.duration,
        price: service.price,
        originalPrice: service.originalPrice ?? null,
        discountPercentage: service.discountPercentage ?? null,
        discount: service.discount ?? null,
        isPopular: service.isPopular ?? false,
      })
    }
  }

  // On mount: scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Dynamically track sticky header height
  useEffect(() => {
    const el = shortDetailsRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // offsetHeight includes padding + borders (which is what we want for spacing)
        setHeaderHeight(el.offsetHeight);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [apiData]);

  // Scroll to section on tab click
  const scrollToSection = (label) => {
    setActiveTab(label)
    const ref = sectionRefs[label]
    if (!ref?.current) return
    const shortDetailsHeight = shortDetailsRef.current?.offsetHeight ?? 0
    // 64 navbar + shortDetails + 60 sectionHeading
    const offset = 64 + shortDetailsHeight + 60
    const top = ref.current.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  // Scroll spy
  useEffect(() => {
    const sections = ['Reviews', 'Team', 'Amenities', 'About', 'Services']

    const handleScroll = () => {
      const shortDetailsHeight = shortDetailsRef.current?.offsetHeight ?? 0
      // navbar (only on lg: 80px), shortDetails + buffer
      const navOffset = isMobile ? 0 : 80;
      const checkPosition = window.scrollY + navOffset + shortDetailsHeight + 10;

      for (const section of sections) {
        const el = sectionRefs[section]?.current
        if (!el) continue
        const absoluteTop = el.getBoundingClientRect().top + window.scrollY
        if (checkPosition >= absoluteTop) {
          setActiveTab(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <div className="mb-20">
      {/* Banner */}
      {isMobile ? <Banner images={apiData?.images} isLoading={isLoading} salonId={apiData?.id ?? apiData?._id} /> : <DeskBanner images={apiData?.images} isLoading={isLoading} salonId={apiData?.id ?? apiData?._id} />}

      <div className="lg:px-10 xl:px-32">
        {/* Sticky: Shop Info */}
        <div ref={shortDetailsRef} className="sticky top-0 lg:top-[80px] z-20 bg-white shadow-sm lg:shadow-none">
          <ShortDetails shopData={apiData} />
        </div>

        {/* Sticky: Section Tabs (mobile only) */}
        <div className="sticky z-10 bg-white shadow-sm lg:hidden" style={{ top: `${headerHeight}px` }}>
          <SectionHeading activeTab={activeTab} onTabClick={scrollToSection} />
        </div>

        {/* Main 2-column grid on desktop */}
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8">

          {/* Left: Content Sections */}
          <div>
            <div ref={servicesRef}>
              <Services
                services={apiServices}
                addedServices={addedServices}
                toggleService={handleToggleService}
              />
            </div>
            <div ref={aboutRef}><About aboutText={apiData?.about} /></div>
            <div ref={amenitiesRef}><Amenities amenities={apiData?.ambients} /></div>
            <div ref={teamRef}><Team teamMembers={apiData?.teamMembers} /></div>
            <div ref={reviewsRef}><Reviews reviews={apiData?.reviews} /></div>
            <OpeningHours openingHours={apiData?.openingHours} />
            <Location locationData={apiData?.location} shopName={apiData?.name} />
          </div>

          {/* Right: Booking Sidebar (desktop only) */}
          <div className="hidden lg:block">
            <PriceSection services={apiServices} addedServices={addedServices} id={apiData?.id} />
          </div>

        </div>
      </div>

      {/* Mobile: Fixed bottom price bar */}
      <div className="lg:hidden">
        <PriceSection services={apiServices} addedServices={addedServices} id={apiData?.id} />
      </div>
    </div>
  )
}

export default ShopDetails