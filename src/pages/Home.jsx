import React, { useState, useEffect, useRef } from 'react'
import ShortProfile from '../componets/Home/ShortProfile'
import SearchBar from '../componets/Home/SearchBar'
import Filter from '../componets/Home/Filter'
import HeroSlider from '../componets/Home/HeroSlider'
import ServiceSlider from '../componets/Home/ServiceSlider'
import PopularServices from '../componets/Home/PopularServices'
import DeskHero from '../componets/Home/DeskHero'
import {useMediaQuery} from '../hooks/useMediaQuery'

const Home = () => {
  const isMobile = useMediaQuery(1024)
  const [isSearchSticky, setIsSearchSticky] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    if (!isMobile) return // skip scroll logic on desktop
    const handleScroll = () => {
      if (heroRef.current) {
        const { bottom } = heroRef.current.getBoundingClientRect()
        setIsSearchSticky(bottom <= 172)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <>
      {/* Mobile-only: location + profile */}
      {isMobile && <ShortProfile />}

      {/* Hero: mobile slider vs desktop full hero */}
      {isMobile ? (
        <div className="relative" ref={heroRef}>
          <HeroSlider />
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
      ) : (
        <DeskHero />
      )}

      {/* Categories — component handles mobile/desktop internally */}
      {isMobile ? (
        <div className="sticky top-[130px] py-2 z-30 bg-white">
          <ServiceSlider />
        </div>
      ) : (
        <ServiceSlider />
      )}

      {/* Filters — mobile only */}
      {isMobile && <Filter />}

      {/* Service cards — component handles mobile/desktop internally */}
      <PopularServices />
    </>
  )
}

export default Home