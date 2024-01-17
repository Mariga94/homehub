import PropertyCard from "@/components/shared/PropertyCard";
import { dummyData } from "../data";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropertyInterface } from "types";

const FeaturedProperty = () => {
  const [featuredProperties, setFeaturedProperties] = useState<
    PropertyInterface[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFeaturedProperties(dummyData);
  }, []);

  const handleOnClick = (id: string) => {
    navigate(`listing/${id}`);
  };
  return (
    <section className="flex flex-col items-center ">
      <h2 className="mb-2 text-[1.875rem]">Featured Properties</h2>
      <p className="mb-12">Handpicked properties by our team</p>
      <div className="flex flex-row gap-6 overflow-x-scroll overscroll-contain w-full hide-scroll-bar">
        {featuredProperties.map((property) => (
          <PropertyCard property={property} handleOnClick={handleOnClick} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperty;
