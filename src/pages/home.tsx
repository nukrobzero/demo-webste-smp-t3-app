import { NextPage } from "next";
import Hero from "~/components/homepage/hero";
import ServiceHero from "~/components/homepage/services";
import Layout from "~/components/layout/layout";

const homePage: NextPage = () => {
  return (
    <Layout>
      <div>
        <Hero />
        <ServiceHero />
      </div>
    </Layout>
  );
};

export default homePage;
