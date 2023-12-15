/**
 * Property page for properties to be sold
 */

import { SearchForm } from "@/components/forms/SearchForm";
import PropertyCard from "@/components/shared/PropertyCard";
import TopBar from "@/components/shared/TopBar";
import Footer from "@/components/shared/Footer";
import { useNavigate, useLocation } from "react-router-dom";

const properties = [
  {
    id: "1",
    imgUrl: "/images/jumbotron.jpg",
    title: "3-Bedroom Furnished Duplex Apartment For Rent in Kilimani",
    price: 250000,
    rooms: 3,
    bathrooms: 2,
    propertyType: 'sale',
  },
  {
    id: "2",
    imgUrl: "/images/jumbotron.jpg",
    title: "3-Bedroom Furnished Duplex Apartment For Rent in Kilimani",
    price: 250000,
    rooms: 3,
    bathrooms: 2,
    propertyType: 'sale',
  },
  {
    id: "3",
    imgUrl: "/images/jumbotron.jpg",
    title: "3-Bedroom Furnished Duplex Apartment For Rent in Kilimani",
    price: 250000,
    rooms: 3,
    bathrooms: 2,
    propertyType: 'sale',
  },
] as const;
const ForSale = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUrl = location.pathname;
  const handleOnClick = (id: string) => {
    navigate(`${currentUrl}/${id}`)
  };

  return (
    <div className="w-full text-gray-700">
      <TopBar textcolor="text-gray-700" />
      <SearchForm />
      <section className="flex flex-col gap-5 mx-20 mt-10 mb-24">
        <h2>Properties For Sale In Kenya</h2>
        <section className="lg:flex flex flex-row flex-wrap items-start gap-0">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
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

export default ForSale;
