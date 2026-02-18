import React, { useState, useRef, useEffect } from 'react'
import Banner from '../componets/ShopDetails/Banner'
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

const ShopDetails = () => {
  const [headerHeight, setHeaderHeight] = useState(0)
  const shortDetailsRef = useRef(null)
  
  const [activeTab, setActiveTab] = useState('Services')
  const servicesRef = useRef(null)
  const aboutRef = useRef(null)
  const amenitiesRef = useRef(null)
  const teamRef = useRef(null)
  const reviewsRef = useRef(null)
  
  // Lifted state for Services
  const [addedServices, setAddedServices] = useState(new Set());

  const services = [
    {
      id: 1,
      name: "Men's Haircut",
      duration: 30,
      price: 149,
      originalPrice: 199,
      discount: 20,
      isPopular: true,
    },
    {
      id: 2,
      name: "Shave",
      duration: 30,
      price:200,
      originalPrice: null,
      discount: null,
      isPopular: false,
    },

    {
      id: 3,
      name: "Premium Haircolor",
      duration: 45,
      price: 1200,
      originalPrice: 1500,
      discount: 30,
      isPopular: true,
    },
  ];

  const toggleService = (id) => {
    const newAdded = new Set(addedServices);
    if (newAdded.has(id)) {
      newAdded.delete(id);
    } else {
      newAdded.add(id);
    }
    setAddedServices(newAdded);
  };

  // Map tab labels to refs
  const sectionRefs = {
    'Services': servicesRef,
    'About': aboutRef,
    'Amenities': amenitiesRef,
    'Team': teamRef,
    'Reviews': reviewsRef
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (shortDetailsRef.current) {
      setHeaderHeight(shortDetailsRef.current.offsetHeight)
    }
  }, [])

  // Scroll to section when tab is clicked
  const scrollToSection = (label) => {
    setActiveTab(label)
    const ref = sectionRefs[label]
    if (ref && ref.current) {
      // Calculate offset based on sticky headers
      // Banner is not sticky. ShortDetails is sticky top-20 (80px). SectionHeading is sticky below that.
      // We need to account for ShortDetails height + SectionHeading height + top offset (80px)
      const shortDetailsHeight = shortDetailsRef.current ? shortDetailsRef.current.offsetHeight : 0
      const stickyOffset = 80 + shortDetailsHeight + 60 // 60px approx for SectionHeading height
      
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - stickyOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Scroll Spy using scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // Calculate total sticky header height offset
      // top-20 (80px) + ShortDetails height + SectionHeading height (~60px)
      const shortDetailsHeight = shortDetailsRef.current ? shortDetailsRef.current.offsetHeight : 0;
      const stickyOffset = 80 + shortDetailsHeight + 60; 
      
      // Look for the section currently under the sticky header
      // We add a small buffer (e.g., 10px) to switch just as content arrives
      const checkPosition = window.scrollY + stickyOffset + 10;

      // Check sections in reverse order to find the first one that is "above" the check line
      const sections = ['Reviews', 'Team', 'Amenities', 'About', 'Services'];

      for (const section of sections) {
        const ref = sectionRefs[section];
        if (ref.current) {
          const elementTop = ref.current.offsetTop; // ShopDetails wrapper is relative
          // Or safer: absolute position
          const rect = ref.current.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;

          if (checkPosition >= absoluteTop) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])


  return (
    <>
      <div className='mb-20'>
        <Banner />
        
        {/* Sticky Short Details */}
        <div ref={shortDetailsRef} className="sticky top-20 z-20 bg-white">
          <ShortDetails />
        </div>

        {/* Sticky Section Heading */}
        <div 
          className="sticky z-10"
          style={{ top: `${headerHeight + 80}px` }}
        >
          <SectionHeading activeTab={activeTab} onTabClick={scrollToSection} />
        </div>

        <div ref={servicesRef}>
            <Services 
              services={services} 
              addedServices={addedServices} 
              toggleService={toggleService} 
            />
        </div>
        <div ref={aboutRef}>
            <About />
        </div>
        <div ref={amenitiesRef}>
            <Amenities />
        </div>
        <div ref={teamRef}>
            <Team />
        </div>
        <div ref={reviewsRef}>
            <Reviews />
        </div>
        
        <OpeningHours />
        <Location />
        
        {/* Price Section */}
        <PriceSection services={services} addedServices={addedServices} />
      </div>
    </>
  )
}

export default ShopDetails