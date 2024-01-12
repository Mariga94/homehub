/**
 * Property page for properties to be sold
 */

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


import PropertyCard from "@/components/shared/PropertyCard";
import TopBar from "@/components/shared/TopBar";
import Footer from "@/components/shared/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "@/services/api";
import { PropertyInterface } from "@/_dashboard/_components/ListingTable";

const ForSale = () => {
  const [propertiesForSale, setPropertiesForSale] = useState<PropertyInterface[]>([])
  const navigate = useNavigate();
  const location = useLocation();

  const currentUrl = location.pathname;
  const handleOnClick = (id: string) => {
    navigate(`${currentUrl}/${id}`);
  };

  useEffect(() => {
    const fetchPropertyForSale =async () => {
      try {
        const res = await fetchData('property/for-sale');
        setPropertiesForSale(res.properties)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPropertyForSale()
  },[])

  return (
    <div className="w-full text-gray-700">
      <TopBar textcolor="text-gray-700" />
      {/* <SearchForm /> */}
      <section className="flex flex-col gap-4 mt-10">
        <h2 className="px-6">Properties For Sale In Kenya</h2>
        <section className="container mx-auto p-4 flex flex-wrap">
          {propertiesForSale.map((property) => (
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

export default ForSale;
