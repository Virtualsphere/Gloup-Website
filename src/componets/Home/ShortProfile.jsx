import React from 'react'
import { MapPin } from 'lucide-react'
import profile from '../../assets/images/author-1.jpg'

const ShortProfile = () => {
  return (
    <div className="md:hidden rounded-3xl mt-2 pt-2 px-3 pb-2 flex items-center justify-between">
      {/* Location Info */}
      <div className="flex items-start gap-3">
        {/* Location Icon */}
        <MapPin size={32} className="text-black mt-1" strokeWidth={2} />
        
        {/* Location Text */}
        <div className="flex flex-col">
          <h2 className="text-xl font-normal text-black">Bagalur</h2>
          <p className="text-xs text-gray-600">Bengaluru</p>
        </div>
      </div>

      {/* Profile Image */}
      <div className="flex-shrink-0">
        <img 
          src={profile} 
          alt="Profile" 
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
    </div>
  )
}

export default ShortProfile
