import Footer from "./Footer";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import PricingSection from "./PricingSection";
import ContactSection from "./ContactSection";
import DashboardPreview from "./DashboardPreview";
import MobileUI from "./MobileUI";

const Home = () => {
  return (
    <>
      <div className='min-h-screen w-full relative bg-black'>
        <div
          className='absolute inset-0 z-0'
          style={{
            background: `
radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255, 20, 147, 0.15), transparent 50%),
radial-gradient(ellipse 160% 130% at 10% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
radial-gradient(ellipse 160% 130% at 90% 90%, rgba(138, 43, 226, 0.18), transparent 65%),
radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
#000000
`,
          }}
        />
        <Navigation />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <DashboardPreview />
        <MobileUI />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default Home;
