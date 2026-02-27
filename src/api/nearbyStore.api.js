import axiosInstance from "./axiosInstance";


// Get Nearby salons

export const getNearbySalons = async ({lat, lng}) => {
    console.log("Sending:", { lat, lng });
    const response = await axiosInstance.post("/store/nearby/", {
        lat,
        lng
    });

    return response.data;
};


