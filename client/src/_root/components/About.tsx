import villa from "../../../public/images/villa-house.jpg";
import award from "../../../public/images/award_9356278.png";
import shield from "../../../public/images/shield_558300.png";
import mortgage from "../../../public/images/mortgage_9167838.png";
const About = () => {
  return (
    <div className="container flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row md:flex-row lg:gap-10 md:gap-x-20 gap-y-5 items-center">
        <div className="flex-1 ">
          <img src={villa} alt="" className="rounded-lg " />
        </div>

        <div className="flex flex-col flex-1 lg:gap-6 md:gap-6 gap-5">
          <h2 className="text-[1.875rem] text-center lg:text-left md:text-left">
            We make it easy for buyers, sellers and renters
          </h2>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            perspiciatis enim illo repudiandae repellendus, similique magni
            error, possimus asperiores praesentium earum. Voluptatibus cum illo
            aliquid rerum labore numquam, reprehenderit dolor.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5">
        <h2>Why Choose Us.</h2>
        <div className="flex lg:flex-row md:flex-row flex-col items-center gap-5">
          <div className="about-card">
            <img src={award} alt="" className="h-24 w-24" />
            <h3>Trusted By Thousands</h3>
            <p className="text-justify">
              Our user-friendly web application makes the entire real estate
              journey seamless. Easily navigate through property listings,
              schedule viewings, and manage transactions, all from the comfort
              of your own home.
            </p>
          </div>
          <div className="about-card">
            <img src={mortgage} alt="" className="h-24 w-24" />
            <h3 className="text-center">Extensive Range Of Properties</h3>
            <p className="text-start">
              Whether you're in the market for a dream home, a rental property,
              or selling your current residence, we offer a diverse range of
              properties to meet your unique needs. Explore a variety of
              listings to find the perfect match.
            </p>
          </div>
          <div className="about-card">
            <img src={shield} alt="" className="h-24 w-24" />
            <h3>Safety is our Priority</h3>
            <p className="text-start">
              We prioritize transparency in every step of the process. From
              property listings to transactions, you can count on clear and
              honest communication. No hidden fees, no surprises – just
              straightforward and trustworthy dealings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
