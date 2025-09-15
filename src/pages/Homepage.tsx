import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PlansSection from "@/components/sections/PlansSection";
import ContactSection from "@/components/sections/ContactSection";
import WhatsAppButton from "@/components/WhatsappBtn";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <PlansSection />
        <ContactSection />
        <WhatsAppButton/>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;