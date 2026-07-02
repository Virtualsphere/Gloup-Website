import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, Edit2, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useUserStore } from '../../store/userStore';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';

export default function ProfileDetails() {
  const navigate = useNavigate();

  const { isLoading: isFetching } = useUserProfile();
  const { user } = useUserStore();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    dob: '',
    phone: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  

  /* ===============================
     Populate Form When User Loads
  =============================== */

useEffect(() => {
  //("USER OBJECT:", user);
  if (!user) return;

  setFormData({
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    email: user.email || '',
    gender: user.gender || '',
    dob: user.dob || user.date_of_birth || '',
    phone: user.phone || '',
  });

  const baseUrl = import.meta.env.VITE_PROFILE_IMG_URL;

  setImagePreview(
    user.profilePic ? `${baseUrl}${user.profilePic}` : null
  );

}, [user]);

  /* ===============================
     Form Dirty Check
  =============================== */

  const isDirty = useMemo(() => {
    if (!user) return false;

    return (
      formData.firstname !== (user.firstname || '') ||
      formData.lastname !== (user.lastname || '') ||
      formData.email !== (user.email || '') ||
      formData.gender !== (user.gender || '') ||
      formData.dob !== (user.dob || user.date_of_birth || '') ||
      selectedImage !== null
    );
  }, [formData, user, selectedImage]);

  /* ===============================
     Required Fields Check
  =============================== */

  const isComplete = useMemo(() => {
    return (
      formData.firstname &&
      formData.lastname &&
      formData.email &&
      formData.gender &&
      formData.dob &&
      formData.phone
    );
  }, [formData]);

  /* ===============================
     Input Change Handler
  =============================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===============================
     Image Change Handler
  =============================== */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* ===============================
     Update Profile
  =============================== */

  const handleUpdate = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('firstname', formData.firstname);
    data.append('lastname', formData.lastname);
    data.append('email', formData.email);
    data.append('gender', formData.gender);
    data.append('dob', formData.dob);
    data.append('phone', formData.phone);

    if (selectedImage) {
      data.append('profilePic', selectedImage);
    }

    updateProfile(data);
  };

  return (
    <div className="bg-[#F2F2F2] flex flex-col relative">
      
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-[#F2F2F2]">
        <button
          onClick={() => navigate(-1)}
          className="p-1 -ml-1 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-black" strokeWidth={2.5} />
        </button>

        <h1 className="text-[19px] font-semibold text-gray-900">
          Your Profile
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 mt-2 relative">
        <div className="bg-white rounded-3xl p-5 shadow-sm relative pt-14">

          {/* Avatar */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <div className="relative">
              
              <div className="w-[84px] h-[84px] bg-[#EBE5E5] rounded-full flex items-center justify-center overflow-hidden border-4 border-[#F8F8F8]">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-white" />
                )}
              </div>

              <label
                htmlFor="profile-pic"
                className="absolute bottom-0 right-0 w-7 h-7 bg-black rounded-full flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:bg-gray-800 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5 text-white" />

                <input
                  type="file"
                  id="profile-pic"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

            </div>
          </div>

          <form className="space-y-4">

            {/* First Name */}
            <div>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border-none focus:ring-1 focus:ring-black outline-none placeholder:text-gray-400 text-[15px] font-medium text-gray-900"
              />
            </div>

            {/* Last Name */}
            <div>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border-none focus:ring-1 focus:ring-black outline-none placeholder:text-gray-400 text-[15px] font-medium text-gray-900"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email ID"
                className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border-none focus:ring-1 focus:ring-black outline-none placeholder:text-gray-400 text-[15px] font-medium text-gray-900"
              />
            </div>

            {/* Gender */}
            <div className="relative">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border border-[#E5E5E5] focus:ring-1 focus:ring-black outline-none appearance-none text-[15px] font-medium text-gray-900 cursor-pointer"
              >
                <option value="" disabled hidden>
                  Not Selected
                </option>

                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <ChevronDown className="w-5 h-5 text-black" strokeWidth={2} />
              </div>
            </div>

            {/* DOB */}
            <div>
              <input
                type="text"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="Date of Birth"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border-none focus:ring-1 focus:ring-black outline-none placeholder:text-gray-400 text-[15px] font-medium text-gray-900"
              />
            </div>

            {/* Phone */}
            <div className="flex gap-3">

              <div className="h-12 px-4 rounded-xl bg-[#F5F5F5] flex items-center justify-center gap-2 border-none shrink-0 cursor-default">
                <span className="text-xl leading-none">🇮🇳</span>
                <span className="text-[15px] font-medium text-gray-900">+91</span>
              </div>

              <div className="flex-1 relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  readOnly
                  className="w-full h-12 pl-4 pr-20 rounded-xl bg-[#F5F5F5] border-none outline-none text-[15px] font-medium text-gray-900"
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center text-[#DF5C3E] text-[13px] font-bold tracking-wide hover:text-[#c44e33] transition-colors"
                >
                  CHANGE
                </button>
              </div>

            </div>

          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 lg:static lg:p-0 lg:border-none lg:bg-transparent lg:mt-6 z-50">

        <button
          onClick={handleUpdate}
          disabled={!isComplete || !isDirty || isUpdating || isFetching}
          className={`w-full h-[52px] text-white text-[15px] font-bold rounded-2xl uppercase tracking-wide transition-all ${
            (!isComplete || !isDirty || isUpdating || isFetching)
              ? "bg-[#BDBDBD] cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>

      </div>
    </div>
  );
}