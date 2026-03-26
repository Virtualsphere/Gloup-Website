import React from 'react'

const P = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse ${className}`} />
)

/**
 * Matches the real Account/Profile layout:
 * Mobile (/profile root): Full-page sidebar menu with avatar + name + nav items
 * Desktop: Card with 320px sidebar (avatar + nav) | content area (form fields)
 */
const AccountSkeleton = () => (
  <div className="min-h-screen bg-gray-100">

    {/* ── Mobile: Sidebar menu ── */}
    <div className="lg:hidden">
      {/* Profile header */}
      <div className="bg-white px-4 py-6 flex items-center gap-4 border-b border-gray-100">
        <P className="w-16 h-16 rounded-full flex-shrink-0" />
        <div className="flex flex-col gap-2">
          <P className="h-5 w-32 rounded-full" />
          <P className="h-3 w-24 rounded-full" />
        </div>
      </div>
      {/* Nav items */}
      <div className="flex flex-col divide-y divide-gray-100">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-4 bg-white">
            <div className="flex items-center gap-3">
              <P className="w-9 h-9 rounded-xl" />
              <P className="h-4 w-28 rounded-full" />
            </div>
            <P className="w-5 h-5 rounded-full" />
          </div>
        ))}
      </div>
    </div>

    {/* ── Desktop: 2-col card ── */}
    <div className="hidden lg:flex my-5 shadow-2xl rounded-3xl container mx-auto overflow-hidden border border-gray-200 h-[800px]">
      {/* Left sidebar */}
      <div className="w-[320px] border-r border-gray-100 bg-gray-50 flex flex-col">
        {/* Avatar + name */}
        <div className="px-6 py-6 flex items-center gap-3 border-b border-gray-100">
          <P className="w-14 h-14 rounded-full flex-shrink-0" />
          <div className="flex flex-col gap-2">
            <P className="h-5 w-28 rounded-full" />
            <P className="h-3 w-20 rounded-full" />
          </div>
        </div>
        {/* Nav items */}
        <div className="flex flex-col gap-1 p-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-3 rounded-xl">
              <P className="w-8 h-8 rounded-lg" />
              <P className="h-4 w-24 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Right content area */}
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <P className="h-6 w-40 rounded-full mb-6" />
        <div className="flex flex-col gap-5">
          {/* Two-col form row */}
          <div className="grid grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <P className="h-3 w-20 rounded-full" />
                <P className="h-11 w-full rounded-xl" />
              </div>
            ))}
          </div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <P className="h-3 w-20 rounded-full" />
              <P className="h-11 w-full rounded-xl" />
            </div>
          ))}
          {/* Save button */}
          <P className="h-11 w-36 rounded-2xl mt-2" />
        </div>
      </div>
    </div>

  </div>
)

export default AccountSkeleton
