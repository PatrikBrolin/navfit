import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Faqs from "@/components/Faqs/Faqs";
import Contact from "@/components/Contact/Contact";
import Reviews from "@/components/Index/Reviews/Reviews";
import ShortIntroduction from "@/components/Index/About/About";
import Booking from "@/components/Booking/Booking";
import Price from "@/components/Booking/Price/Price";

// This function matches a property in the modules object and returning a component if the property matches the case.
const filter = (module, key) => {
  switch (module.items[0].modulTyp) {
    case "Hero":
      return <Hero key={key} data={module} />;
    case "About":
      return <About key={key} data={module} />;
    case "Faq":
      return <Faqs key={key} data={module} />;
    case "Contact":
      return <Contact key={key} data={module} />;
    case "Recension":
      return <Reviews key={key} data={module} />;
    case "Short-introduction":
      return <ShortIntroduction key={key} data={module} />;
    case "Hur-det-går-till":
      return <Booking key={key} data={module} />;
    case "Priser":
      return <Price key={key} data={module} />;
    default:
      break;
  }
};

export default filter;
