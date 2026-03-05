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

import { useParams } from 'react-router-dom'
import { useGetSalonDetails } from '../hooks/services/useSalonDetails'






// ─── Component ────────────────────────────────────────────────────────────────
const ShopDetails = () => {
  const isMobile = useMediaQuery(1024)

  const {id} = useParams()
  const {data, isLoading, isError} = useGetSalonDetails(id)
  
  const apiData = data?.data || {}
  const apiServices = apiData?.services || []

  console.log(apiData)

  console.log(apiServices)

  // Sticky header height tracking
  const shortDetailsRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  // Section nav refs
  const servicesRef  = useRef(null)
  const aboutRef     = useRef(null)
  const amenitiesRef = useRef(null)
  const teamRef      = useRef(null)
  const reviewsRef   = useRef(null)
  const [activeTab, setActiveTab] = useState('Services')

  const sectionRefs = {
    Services:  servicesRef,
    About:     aboutRef,
    Amenities: amenitiesRef,
    Team:      teamRef,
    Reviews:   reviewsRef,
  }

  // Services cart state
  const [addedServices, setAddedServices] = useState(new Set())

  const toggleService = (id) => {
    setAddedServices(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // On mount: scroll to top + measure sticky header
  useEffect(() => {
    window.scrollTo(0, 0)
    if (shortDetailsRef.current) {
      setHeaderHeight(shortDetailsRef.current.offsetHeight)
    }
  }, [])

  // Scroll to section on tab click
  const scrollToSection = (label) => {
    setActiveTab(label)
    const ref = sectionRefs[label]
    if (!ref?.current) return
    const shortDetailsHeight = shortDetailsRef.current?.offsetHeight ?? 0
    const offset = 80 + shortDetailsHeight + 60 // navbar + shortDetails + sectionHeading
    const top = ref.current.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  // Scroll spy
  useEffect(() => {
    const sections = ['Reviews', 'Team', 'Amenities', 'About', 'Services']

    const handleScroll = () => {
      const shortDetailsHeight = shortDetailsRef.current?.offsetHeight ?? 0
      const checkPosition = window.scrollY + 80 + shortDetailsHeight + 60 + 10

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
  }, [])

  return (
    <div className="mb-20">
      {/* Banner */}
      {isMobile ? <Banner images={apiData?.images} /> : <DeskBanner images={apiData?.images} />}

      <div className="lg:px-10 xl:px-32">
        {/* Sticky: Shop Info */}
        <div ref={shortDetailsRef} className="sticky top-16 z-20">
          <ShortDetails shopData={apiData} />
        </div>

        {/* Sticky: Section Tabs (mobile only) */}
        <div className="sticky z-10" style={{ top: `${headerHeight + 60}px` }}>
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
                toggleService={toggleService}
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
        <PriceSection services={apiServices} addedServices={addedServices} />
      </div>
    </div>
  )
}

export default ShopDetails