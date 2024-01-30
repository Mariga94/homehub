/**
 * Property page for properties to be sold
 */
import PropertyCard from "@/components/shared/PropertyCard";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "@/services/api";
import { PropertyInterface } from "types";

import { Button } from "@/components/ui/button";
const ForSale = () => {
  const [propertiesForSale, setPropertiesForSale] = useState<
    PropertyInterface[]
  >([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage: number = 6;
  const navigate = useNavigate();
  const location = useLocation();

  const currentUrl = location.pathname;
  const handleOnClick = (id: string) => {
    navigate(`${currentUrl}/${id}`);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const totalProducts: number = propertiesForSale?.length || 0;
  const totalPages: number = Math.ceil(totalProducts / productsPerPage);

  // Calculate the index range of products to display for the current page
  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
  const currentProperties: PropertyInterface[] | undefined =
    propertiesForSale?.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    const fetchPropertyForSale = async () => {
      try {
        const res = await fetchData("property/for-sale");
        setPropertiesForSale(res.properties);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPropertyForSale();
  }, []);

  return (
    <div className="flex flex-col w-full gap-6">
      {/* <SearchForm /> */}
      <section className="flex flex-col mx-auto gap-4 mt-10">
        <h2 className="">Properties For Sale In Kenya</h2>
        <section className="flex flex-row gap-6  flex-wrap ">
          {propertiesForSale.length ? (
            currentProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                handleOnClick={handleOnClick}
              />
            ))
          ) : (
            <>
              <p>
                {" "}
                No properties for sale. Create an account and add properties if
                your are agent/landlord
              </p>
            </>
          )}
        </section>
      </section>
      <section className=" ">
        <ul className="flex flex-row justify-center gap-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i + 1}
              className={`${
                currentPage === i + 1 ? "bg-primary text-white" : ""
              }`}
            >
              <Button variant="ghost" onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ForSale;
