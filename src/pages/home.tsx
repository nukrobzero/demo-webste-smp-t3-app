import { NextPage } from "next";
import Hero from "~/components/homepage/hero";
import ServiceHero from "~/components/homepage/services";

const homePage: NextPage = () => {
  return (
    <div>
      <Hero />
      <ServiceHero />
    </div>
  );
};

export default homePage;
