import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import ImageGallery from "@/components/sections/ImageGallery";
import LostToFoundBanner from "@/components/sections/LostToFoundBanner";
import FeatureShowcase from "@/components/sections/Showcase";
import UseCases from "@/components/sections/Usecases";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>

        <Hero />
        <LostToFoundBanner />
        <UseCases />
        <FeatureShowcase />
        {/* <ProductDetails /> */}
        <WhyChooseUs />
        <ImageGallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
