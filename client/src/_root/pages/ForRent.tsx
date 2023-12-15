/**
 * Rent page for properties/listing to be rented
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
    imgUrls: [
      "/images/jumbotron.jpg",
      "/images/jumbotron.jpg",
      "/images/jumbotron.jpg",
      "/images/jumbotron.jpg",
    ],
    title: "3-Bedroom Furnished Duplex Apartment For Rent in Kilimani",
    price: 250000,
    rooms: 3,
    bathrooms: 2,
    status: "sale",
    location: {
      city: "Nairobi",
      state: "Nairobi",
      zipCode: "Dagoretti",
    },
    amenities: ["parking", "swimming", "garden"],
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, officiis nobis? Saepe sapiente eaque perspiciatis consequatur, laudantium ea totam voluptatem et aut expedita est necessitatibus iusto voluptas, quia optio illum.",
  },
  {
    id: "2",
    imgUrl: "/images/jumbotron.jpg",
    title: "3-Bedroom Furnished Duplex Apartment For Rent in Kilimani",
    price: 250000,
    rooms: 3,
    bathrooms: 2,
  },
  {
    id: "3",
    imgUrl: "/images/jumbotron.jpg",
    title: "3-Bedroom Furnished Duplex Apartment For Rent in Kilimani",
    price: 250000,
    rooms: 3,
    bathrooms: 2,
  },
] as const;

const ForRent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUrl = location.pathname;
  const handleOnClick = (id: string) => {
    navigate(`${currentUrl}/${id}`);
  };
  return (
    <div className="w-full text-gray-700">
      <TopBar textcolor="text-gray-700" />
      <SearchForm />
      <section className="flex flex-col gap-5 mx-20 mt-10 mb-24">
        <h2>Properties For Rent In Kenya</h2>
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

export default ForRent;
