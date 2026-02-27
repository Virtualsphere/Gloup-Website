import { useLocationStore } from "../store/locationStore";

export const useUserLocation = () => {
  const { setLocation, setLocationError } = useLocationStore();

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        setLocationError(false);
      },
      (error) => {
        if (error.code === 1) {
          setLocationError(true);

          // 🔥 Optional fallback to Chennai
          setLocation({
            lat: 13.0827,
            lng: 80.2707,
          });
        }
      }
    );
  };

  return { getLocation };
};