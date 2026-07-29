import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import ImageGallery from "@/components/sections/ImageGallery";
import ProductDetails from "@/components/sections/ProductDetails";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductDetails />
        <WhyChooseUs />
        <ImageGallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
