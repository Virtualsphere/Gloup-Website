import { useLocationStore } from "../store/locationStore";

export const useUserLocation = () => {
  const { location, setLocation, setLocationError } = useLocationStore();

  const getLocation = (force = false) => {
    // If location already exists and we are not forcing an update, do nothing (prevents overwrite on reload)
    if (!force && location && location.lat) {
      return;
    }

    if (!navigator.geolocation) {
      setLocationError(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (window.google && window.google.maps && window.google.maps.Geocoder) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            let addressText = "Current Location";
            if (status === "OK" && results[0]) {
              const cityResult = results.find(r => r.types.includes('locality')) || results[0];
              addressText = cityResult.formatted_address;
            }
            setLocation({
              address: addressText,
              lat,
              lng,
            });
            setLocationError(false);
          });
        } else {
          // Fallback if Google Maps API isn't loaded
          setLocation({
            address: "Current Location",
            lat,
            lng,
          });
          setLocationError(false);
        }
      },
      (error) => {
        if (error.code === 1) {
          setLocationError(true);

          // 🔥 Optional fallback to Chennai
          setLocation({
            address: "Chennai",
            lat: 13.0827,
            lng: 80.2707,
          });
        }
      }
    );
  };

  return { getLocation };
};