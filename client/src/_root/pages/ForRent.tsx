/**
 * Rent page for properties/listing to be rented
 */



import { useNavigate, useLocation } from "react-router-dom";
import PropertyCard from "@/components/shared/PropertyCard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { dummyData } from "../data";

import { PropertyInterface } from "types";

import { fetchData } from "@/services/api";
const ForRent = () => {
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
        const res = await fetchData('property/for-sale');
        setPropertiesForSale(res.properties)
        // setPropertiesForSale(dummyData);
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
        <h2 className="">Properties For Rent In Kenya</h2>
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
              <p> No properties for sale</p>
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
export default ForRent;
