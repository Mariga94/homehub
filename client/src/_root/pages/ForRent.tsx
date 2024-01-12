/**
 * Rent page for properties/listing to be rented
 */

import PropertyCard from "@/components/shared/PropertyCard";
import TopBar from "@/components/shared/TopBar";
import Footer from "@/components/shared/Footer";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchData } from "@/services/api";
import { useEffect, useState } from "react";
import { PropertyInterface } from "@/_dashboard/_components/ListingTable";

const ForRent = () => {
  const [propertiesForRent, setPropertiesForRent] = useState<
    PropertyInterface[]
  >([]);
  const navigate = useNavigate();
  const location = useLocation();

  const currentUrl = location.pathname;
  const handleOnClick = (id: string) => {
    navigate(`${currentUrl}/${id}`);
  };

  useEffect(() => {
    const fetchPropertyForRent = async () => {
      try {
        const res = await fetchData("property/for-rent");
        setPropertiesForRent(res.properties);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPropertyForRent();
  }, []);

  return (
    <div className="w-full text-gray-700">
      <TopBar textcolor="text-gray-700" />
      <section className="flex flex-col gap-4 mt-10">
        <h2>Properties For Rent In Kenya</h2>
        <section className="container mx-auto p-4 flex flex-wrap ">
          {propertiesForRent.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              handleOnClick={handleOnClick}
            />
          ))}
        </section>
        <Pagination className="mb-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
      <Footer />
    </div>
  );
};

export default ForRent;
