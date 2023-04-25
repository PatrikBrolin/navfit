import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Faqs from "@/components/Faqs/Faqs";
import Contact from "@/components/Contact/Contact";
import Reviews from "@/components/Index/Reviews/Reviews";

const filter = (module, key, component) => {

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
    default:
      break;
  }
};

export default filter;
