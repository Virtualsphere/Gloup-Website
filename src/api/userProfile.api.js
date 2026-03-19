import axiosInstance from "./axiosInstance";

/**
 * Fetch user profile data from GET /user/app/v2/profile
 * @returns {Promise<{ success: boolean, data: { id: number, firstname: string, lastname: string, email: string, phone: number, profilePic: string, gender: string, age: number, date_of_birth: string, city: string, country: string } }>}
 */
export const getUserProfile = async () => {
  const response = await axiosInstance.get("/app/v2/profile");
  return response.data;
};

/**
 * Update user profile data via PATCH /app/v2/profile
 * @param {FormData} formData
 * @returns {Promise<{ success: boolean, message: string }>}
 */

export const updateUserProfile = async (formData) => {
  const response = await axiosInstance.patch("/app/v2/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
