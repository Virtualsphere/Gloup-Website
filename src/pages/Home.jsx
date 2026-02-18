import React, { useState, useEffect, useRef } from 'react'
import ShortProfile from '../componets/Home/ShortProfile'
import SearchBar from '../componets/Home/SearchBar'
import Filter from '../componets/Home/Filter'
import HeroSlider from '../componets/Home/HeroSlider'
import ServiceSlider from '../componets/Home/ServiceSlider'
import PopularServices from '../componets/Home/PopularServices'

const Home = () => {
  const [isSearchSticky, setIsSearchSticky] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const { bottom } = heroRef.current.getBoundingClientRect()
        // SearchBar is approx 72px height + 20px bottom offset = ~92px from bottom
        // We want it to stick when its top hits 80px (Navbar)
        // So when bottom - 92 <= 80 => bottom <= 172
        setIsSearchSticky(bottom <= 172)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <ShortProfile />
      
      {/* Hero Wrapper with Ref for scrolling calculation */}
      <div className="relative" ref={heroRef}>
        <HeroSlider />
        
        {/* Search Bar: Absolute initially, hidden when Sticky (placeholder logic or purely fixed switch) */}
        {/* We use a conditional render or class switch. 
            Since 'fixed' takes it out of context, we can just switch classes. 
            However, to prevent content jump if it was relative, we used absolute. 
            Absolute also takes out of flow, so no jump. */}
        <div 
          className={`z-40 transition-all duration-0 ${
            isSearchSticky 
              ? 'fixed top-[80px] left-0 right-0 animate-in fade-in slide-in-from-top-5' 
              : 'absolute bottom-[60px] left-0 right-0'
          }`}
        >
          <SearchBar isSticky={isSearchSticky} />
        </div>
      </div>

      <div className="sticky top-[130px] py-2 z-30 bg-white">
        <ServiceSlider />
      </div>

      <Filter />
      <PopularServices />
      <PopularServices />
    </>
  )
}

export default Home