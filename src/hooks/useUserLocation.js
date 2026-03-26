import { useLocationStore } from "../store/locationStore";

export const useUserLocation = () => {
  const { location, setLocation, setLocationError } = useLocationStore();

  /**
   * Reverse-geocode coordinates and persist to the store.
   */
  const resolveAndSave = (lat, lng) => {
    if (window.google && window.google.maps && window.google.maps.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        let addressText = "Chennai";
        if (status === "OK" && results[0]) {
          const cityResult =
            results.find((r) => r.types.includes("locality")) || results[0];
          addressText = cityResult.formatted_address;
        }
        setLocation({ address: addressText, lat, lng });
        setLocationError(false);
      });
    } else {
      // Google Maps not loaded yet — save coords with Chennai as fallback label
      setLocation({ address: "Chennai", lat, lng });
      setLocationError(false);
    }
  };

  /**
   * Request the user's location.
   *  - If permission is already "granted"  → fetch silently.
   *  - If permission is "prompt"           → browser shows its native dialog.
   *  - If permission is "denied"           → mark locationError, do NOT fall back.
   *
   * @param {boolean} force  – when true, re-fetch even if a location is already stored.
   */
  const getLocation = async (force = false) => {
    // Skip only if we have a real geocoded address (not the old "Current Location" placeholder)
    if (!force && location && location.lat && location.address !== "Current Location") return;

    if (!navigator.geolocation) {
      setLocationError(true);
      return;
    }

    // Check current permission state before prompting
    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "denied") {
        // User has explicitly denied — respect that decision, don't fallback
        setLocationError(true);
        return;
      }

      // "granted" or "prompt" — both trigger getCurrentPosition
      // (for "prompt" the browser will show its native permission dialog)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolveAndSave(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Denied at the native dialog level
          setLocationError(true);
        },
        { timeout: 10000 }
      );
    } catch {
      // permissions API not supported — fall through to direct call
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolveAndSave(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setLocationError(true);
        },
        { timeout: 10000 }
      );
    }
  };

  return { getLocation };
};