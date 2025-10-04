import { FaWhatsapp } from "react-icons/fa"

interface WhatsAppButtonProps {
  phone: string
  message?: string
}

export default function WhatsAppButton() {

  let message = "Olá! Gostaria de mais informações.";
  let phone = "5521920070815";
  const encodedMessage = message ? encodeURIComponent(message) : ""
  const url = `https://wa.me/${phone}${encodedMessage ? `?text=${encodedMessage}` : ""}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 z-50"
      aria-label="Fale conosco no WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  )
}
