import { PropertyInterface } from "types";
import PropertyCard from "@/components/shared/PropertyCard";
import { fetchData } from "@/services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OnSale = () => {
  const [latestPropertiesForSale, setLatestPropertiesForSale] = useState<
    PropertyInterface[]
  >([]);
  const navigate = useNavigate();

  const handleOnClick = (id: string) => {
    navigate(`listing/${id}`);
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
  }, []);
  return (
    <section className="flex flex-col px-10 lg:px-20 py-10 lg:py-0 m-auto gap-4 items-center bg-slate-100">
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
  );
};

export default OnSale;
