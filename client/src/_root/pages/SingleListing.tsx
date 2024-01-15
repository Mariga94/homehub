import TopBar from "@/components/shared/TopBar";
import Footer from "@/components/shared/Footer";
import { BathIcon, BedIcon, MapPinIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
// import LeafletMap from "@/components/shared/LeafletMap";
// import YouTube from "react-youtube";
import SingleImageCarousel from "@/components/shared/SingleListingCarousel";
import { cn } from "@/lib/utils";
import { PropertyInterface } from "@/_dashboard/_components/ListingTable";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "@/services/api";

const getDefaultProperty = (): PropertyInterface => {
  return {
    _id: "",
    title: "",
    description: "",
    type: "",
    propertyStatus: "",
    location: {
      address: "",
      city: "",
      country: "",
    },
    bedrooms: 1,
    bathrooms: 0,
    floors: 0,
    price: 0,
    area: "",
    size: "",
    videoUrl: "",
    features: {
      balcony: false,
      elevator: false,
      pool: false,
      petFriendly: false,
      gym: false,
      fireAlarm: false,
    },
    gallery: [],
  };
};
const SingleListingPage = () => {
  const [property, setProperty] =
    useState<PropertyInterface>(getDefaultProperty);
  const { id } = useParams();

  useEffect(() => {
    const fetchProperty = async (propertyId: string | undefined) => {
      try {
        const res = await fetchData(`property/${propertyId}`);
        console.log(res);
        setProperty(res.property);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperty(id);
  }, [id]);

  console.log(property);
  return (
    <div className="w-full">
      <TopBar textcolor="text-gray-700" />
      <section className="flex flex-col mt-10 lg:mb-24 mb-10 lg:mx-20 mx-4 gap-4">
        <div>
          <h2>{property?.title}</h2>
          <div className="flex flex-row gap-2">
            <MapPinIcon className="text-gray-600" />
            <p>
              {property?.location.address}, {property?.location.city}
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute z-50 top-2 left-2 flex flex-row gap-4">
            <Badge variant="default" className={cn("rounded-md px-5 py-1")}>
              {property?.propertyStatus}
            </Badge>
            <Badge variant="default" className={cn("rounded-md px-5 py-1")}>
              {property?.type}
            </Badge>
          </div>
          <SingleImageCarousel imageUrls={property?.gallery} />
        </div>

        <section className="flex flex-col gap-4 mt-10">
          {/* Short Description */}
          <div className="rounded-md border-2 px-2 py-4">
            <div className="flex flex-row flex-wrap gap-4">
              <div className="flex flex-row gap-2">
                <BedIcon className="text-gray-600" />
                <p>{property?.bedrooms} Bedrooms</p>
              </div>
              <div className="flex flex-row gap-2">
                <BathIcon className="text-gray-600" />
                <p>{property?.bathrooms} Bathrooms</p>
              </div>
            </div>
          </div>
          {/* long description */}
          <div>
            <h2>Description</h2>
            <p>{property.description}</p>
          </div>
          {/* features */}
          <div>
            <h2>Features</h2>
            <div className="flex flex-col gap-4">
              {Object.keys(property.features).map((val) => (
                <p>{val}</p>
              ))}
            </div>
          </div>
        </section>

        {property.videoUrl && (
          <section>
            <iframe
              className="w-full"
              width="560"
              height="315"
              src={property.videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </section>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default SingleListingPage;
