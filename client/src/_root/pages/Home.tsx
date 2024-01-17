import Jumbotron from "../components/Jumbotron"
import About from "../components/About";
import FeaturedProperty from "../components/FeaturedProperty";
const Home = () => {
  return (
    <div className="w-full flex flex-col lg:gap-10 gap-10 sm:px-5">
      <Jumbotron />
      <About />
      <FeaturedProperty />
    </div>
  );
};

export default Home;
