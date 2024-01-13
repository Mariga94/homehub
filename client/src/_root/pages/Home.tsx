import TopBar from "@/components/shared/TopBar";
import Footer from "@/components/shared/Footer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { fetchData } from "@/services/api";
import PropertyCard from "@/components/shared/PropertyCard";
import { PropertyInterface } from "@/_dashboard/_components/ListingTable";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Home = () => {
  const [latestPropertiesForSale, setLatestPropertiesForSale] = useState<
    PropertyInterface[]
  >([]);
  const [latestPropertiesForRent, setLatestPropertiesForRent] = useState<
    PropertyInterface[]
  >([]);

  const navigate = useNavigate();
  const location = useLocation();

  const currentUrl = location.pathname;
  const handleOnClick = (id: string) => {
    navigate(`${currentUrl}/${id}`);
  };
  useEffect(() => {
    const fetchLatestPropertiesForSale = async () => {
      try {
        const res = await fetchData("property/latest/for-sale");
        setLatestPropertiesForSale(res.properties);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLatestPropertiesForSale();
    const fetchLatestPropertiesForRent = async () => {
      try {
        const res = await fetchData("property/latest/for-rent");
        setLatestPropertiesForRent(res.properties);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLatestPropertiesForRent();
  }, []);
  return (
    <div className="w-full">
      <header className=" relative overflow-hidden bg-no-repeat bg-custom-image bg-cover bg-center h-screen">
        <div className="absolute bg-fixed w-full bg-black bg-opacity-60 h-full text-white">
          <TopBar />
          <div className="flex  flex-col items-center mt-20 lg:mt-40 ">
            <h1 className="text-[#EDEFF6] w-full text-center">
              Buy, rent or sell your property easily.
            </h1>
            <p className="text-[#EDEFF6] mt-6 lg:w-[43rem] text-center">
              Discover comfort, joy, and a life well-lived. Welcome home to the
              dreams that await you.
            </p>
            <p className="text-[#EDEFF6] mt-4 lg:w-[43rem] text-center">
              We give a great platform to buy, sell or even rent your properties
              without any commissions.
            </p>
          </div>
          <div className="lg:hidden md:hidden flex flex-col gap-5 mt-14 items-center justify-center">
        
            <div className="gap-5 flex flex-row">
              <Button
                variant="outline"
                asChild
                className={cn("text-sm ", "text-gray-500", "w-40")}
              >
                <Link to="/listing/for-sale">Sale</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className={cn("text-gray-500 w-40")}
              >
                <Link to="/listing/for-rent">Rent</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Why Choose us section */}
      <section className="flex flex-col px-10 lg:px-20 py-10 lg:py-24 gap-10 items-center justify-center bg-slate-100">
        <h2 className="">Why Choose Us</h2>
        <section className="flex flex-wrap gap-10 justify-center items-center">
          <Card className="lg:w-1/5">
            <CardHeader>
              <CardTitle>Apartments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-justify">
                Our mission is to simplify the apartment hunting process and
                empower you to find the perfect living space that suits your
                needs and lifestyle. We understand that finding the right
                apartment can be a challenging task, and we're here to make the
                process smooth, enjoyable, and efficient.
              </p>
            </CardContent>
          </Card>
          <Card className="lg:w-1/5">
            <CardHeader>
              <CardTitle>Homes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-justify">
                We are committed to simplifying the journey of finding your
                dream home. We understand that a home is more than just a place;
                it's where memories are created and stories unfold. Our mission
                is to guide you through this significant life decision with
                expertise and care. Key Features
              </p>
            </CardContent>
          </Card>
          <Card className="lg:w-1/5 w-full">
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-justify">
                Transparency is our priority. We believe in providing a clear
                and fair pricing structure to ensure that you have all the
                information you need to make informed decisions. we are
                committed to offering pricing that is competitive,
                straightforward, and aligned with the value we provide to our
                users. Whether you are a homebuyer, seller, or real estate
                professional, our pricing model is designed to meet your needs.
              </p>
            </CardContent>
          </Card>
          <Card className="lg:w-1/5">
            <CardHeader>
              <CardTitle>Commercial</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-justify">
                Our vision is to revolutionize the way businesses find and
                secure commercial spaces. We understand the unique requirements
                of commercial real estate, and our platform is tailored to
                simplify the process of acquiring the perfect space for your
                business needs.
              </p>
            </CardContent>
          </Card>
        </section>
      </section>

      <section className="flex flex-col px-10 lg:px-20 py-10 lg:py-24 m-auto gap-10 items-center justify-center bg-slate-100">
        <h2>Latest House on Sale</h2>
        <p className="text-[#889099] text-center">
          Checkout latest houses, apartment and commercial properties on sale.
        </p>
        <section className="flex gap-4 container overflow-x-auto hide-scroll-bar ">
          {latestPropertiesForSale.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              handleOnClick={handleOnClick}
            />
          ))}
        </section>
      </section>

      <section className="flex flex-col px-10 lg:px-20 py-10 lg:py-24 m-auto gap-10 items-center justify-center bg-slate-100">
        <h2>Latest House on Rent</h2>
        <p className="text-[#889099] text-center">
          Checkout latest houses, apartment and commercial properties on Rent.
        </p>
        <section className="flex gap-4 container overflow-x-auto hide-scroll-bar ">
          {latestPropertiesForRent.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              handleOnClick={handleOnClick}
            />
          ))}
        </section>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
