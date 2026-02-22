import { useEffect, useState } from "react"

export function useMediaQuery(px) {
  const query = `(max-width: ${px - 1}px)`

  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const media = window.matchMedia(query)

    const listener = (e) => {
      setMatches(e.matches)
    }

    media.addEventListener("change", listener)

    return () => {
      media.removeEventListener("change", listener)
    }
  }, [query])

  return matches
}