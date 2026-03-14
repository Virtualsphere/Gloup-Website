import React, { useState, useEffect, useRef } from 'react'
import ShortProfile from '../componets/Home/ShortProfile'
import SearchBar from '../componets/Home/SearchBar'
import Filter from '../componets/Home/Filter'
import HeroSlider from '../componets/Home/HeroSlider'
import ServiceSlider from '../componets/Home/ServiceSlider'
import PopularServices from '../componets/Home/PopularServices'
import TopSalons from '../componets/Home/TopSalons'
import DeskHero from '../componets/Home/DeskHero'
import RecommendedSalons from '../componets/Home/RecommendedSalons'
import { useMediaQuery } from '../hooks/useMediaQuery'

const Home = () => {
  const isMobile = useMediaQuery(1024)
  const [isFixed, setIsFixed] = useState(false)
  const heroRef = useRef(null)
  // Height of the SearchBar to use for placeholder
  const SEARCH_HEIGHT = 56
  // Offset from top of hero where SearchBar sits (below ShortProfile)
  const SEARCH_OFFSET = 90

  useEffect(() => {
    if (!isMobile) return
    const handleScroll = () => {
      if (!heroRef.current) return
      const heroTop = heroRef.current.getBoundingClientRect().top
      // Fix the bar when its natural position scrolls above the viewport top
      setIsFixed(heroTop < -SEARCH_OFFSET)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <>
      {/* Hero: mobile slider vs desktop full hero */}
      {isMobile ? (
        <>
          <div className="relative" ref={heroRef}>
            {/* Location / Profile overlay */}
            <div className="absolute top-0 left-0 right-0 z-10">
              <ShortProfile />
            </div>
            <HeroSlider />

            {/* SearchBar: initially absolute on the hero, below ShortProfile */}
            {!isFixed && (
              <div
                className="absolute left-0 right-0 z-40"
                style={{ top: `${SEARCH_OFFSET}px` }}
              >
                <SearchBar isSticky={false} />
              </div>
            )}
          </div>

        

          {/* SearchBar fixed to viewport top once scrolled */}
          {isFixed && (
            <div className="fixed top-0 left-0 right-0 z-50">
              <SearchBar isSticky={true} />
            </div>
          )}
        </>
      ) : (
        <DeskHero />
      )}

      {/* Categories */}
      <div className="sticky lg:static top-[52px] py-0 lg:py-0 z-30 lg:z-auto bg-white lg:bg-transparent">
        <ServiceSlider />
      </div>

      {/* Filters — mobile only */}
      {isMobile && <Filter />}

      {/* Service cards — component handles mobile/desktop internally */}
      <PopularServices />
      <TopSalons />
      <RecommendedSalons />
    </>
  )
}

export default Home