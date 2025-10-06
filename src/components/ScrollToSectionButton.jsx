// src/components/ScrollToSectionButton.jsx
import { useNavigate, useLocation } from "react-router-dom"
import { useCallback } from "react"

export default function ScrollToSectionButton({ sectionId, children, className }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = useCallback(() => {
    const isHome = location.pathname === "/"
    const hash = `#${sectionId}`

    if (isHome) {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      navigate(`/${hash}`)
    }
  }, [navigate, location, sectionId])

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
