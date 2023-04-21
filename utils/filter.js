import Hero from "@/components/Hero/Hero";

const filter = (module, key, component) => {
  switch (module.modulTyp) {
    case "Hero":
      return <Hero key={key} data={module} />;
    default:
      break;
  }
};

export default filter;
