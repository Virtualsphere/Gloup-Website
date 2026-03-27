import React, { useState } from 'react'
import { MapPin, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLocationStore } from '../../store/locationStore'
import LocationSearchModal from '../shared/ui/LocationSearchModal'

const ShortProfile = () => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const locationData = useLocationStore((state) => state.location);
  
  // Try to split address into locality + city, else defaults
  const addressParts = locationData?.address ? locationData.address.split(',') : [];
  const mainLocation = addressParts[0] || 'Allow Location';
  const subLocation = addressParts[1]?.trim() || '';
  return (
    <>
      <div className="lg:hidden rounded-3xl mt-2 pt-2 px-3 pb-2 flex items-center justify-between">
      {/* Location Info */}
      <button 
        onClick={() => setIsLocationModalOpen(true)}
        className="flex items-center gap-1 focus:outline-none text-left"
      >
        {/* Location Icon */}
        <MapPin size={25} className="text-white" strokeWidth={2} />
        
        {/* Location Text */}
        <div className="flex flex-col max-w-[180px]">
          <h2 className="text-lg font-normal text-white truncate">{mainLocation}</h2>
          {subLocation && <p className="text-xs text-gray-200 truncate">{subLocation}</p>}
        </div>
      </button>

      {/* Profile Image / Icon */}
      <div className="flex-shrink-0">
        <Link to="/profile" className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white transition-colors">
          <User size={24} />
        </Link>
      </div>
      </div>

      <LocationSearchModal 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)} 
      />
    </>
  )
}

export default ShortProfile
