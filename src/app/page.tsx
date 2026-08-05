import FadeIn from "@/components/animations/FadeIn";
import FadeUp from "@/components/animations/FadeUp";
import ZoomIn from "@/components/animations/ZoomIn";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import LostToFoundBanner from "@/components/sections/LostToFoundBanner";
import FeatureShowcase from "@/components/sections/Showcase";
import UseCases from "@/components/sections/Usecases";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import WhyMiliTag from "@/components/sections/WhyMiliTag";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <FadeUp>
          <Hero />
        </FadeUp>
        <ZoomIn>
          <LostToFoundBanner />
        </ZoomIn>
        <FadeIn>
          <UseCases />
        </FadeIn>
        <FadeUp>
          <FeatureShowcase />
        </FadeUp>
        {/* <ProductDetails /> */}

        {/* <FadeIn>
          <ImageGallery />
        </FadeIn> */}
        <FadeIn>
          <WhyMiliTag />
        </FadeIn>


        <FadeUp>
          <FAQ />
        </FadeUp>
        <FadeUp>
          <WhyChooseUs />
        </FadeUp>
        <FadeUp>
          <Contact />
        </FadeUp>
      </main>
      <Footer />
    </>
  );
}
