import { PropertyInterface } from "types";
import PropertyCard from "@/components/shared/PropertyCard";
import { fetchData } from "@/services/api";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OnRent = () => {
  const [latestPropertiesForRent, setLatestPropertiesForRent] = useState<
    PropertyInterface[]
  >([]);

  const navigate = useNavigate();

  const handleOnClick = (id: string) => {
    navigate(`listing/${id}`);
  };
  useEffect(() => {
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
    <section className="flex flex-col px-10 lg:px-20 py-10 lg:py-24 m-auto gap-10 items-center justify-center bg-slate-100">
      <h2>Latest House on Rent</h2>
      <p className="text-[#889099] text-center">
        Checkout latest houses, apartment and commercial properties on Rent.
      </p>
      {latestPropertiesForRent.length > 0 && (
        <section className="flex gap-4 container overflow-x-auto hide-scroll-bar ">
          {latestPropertiesForRent.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              handleOnClick={handleOnClick}
            />
          ))}
        </section>
      )}
    </section>
  );
};

export default OnRent;
