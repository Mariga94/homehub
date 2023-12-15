import TopBar from "@/components/shared/TopBar";
import Footer from "@/components/shared/Footer";
import { BathIcon, BedIcon, MapPinIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import LeafletMap from "@/components/shared/LeafletMap";
// import YouTube from "react-youtube";
import SingleImageCarousel from "@/components/shared/SingleListingCarousel";
import { cn } from "@/lib/utils";

// import { useParams } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PropertyInterface {
  id: string;
  imgUrl: string;
  imgUrls: string[];
  title: string;
  price: number;
  rooms: number;
  bathrooms: number;
  status: string;
  location: {
    city: string;
    state: string;
    zipCode: string;
    latiLon: number[];
    zoom: number;
  };
  amenities: string[];
  description: string[];
}

const property = {
  id: "1",
  imgUrl: "/images/jumbotron.jpg",
  imgUrls: [
    "/images/jumbotron.jpg",
    "/images/jumbotron.jpg",
    "/images/jumbotron.jpg",
    "/images/jumbotron.jpg",
    "/images/jumbotron.jpg",
    "/images/jumbotron.jpg",
    "/images/jumbotron.jpg",
    "/images/jumbotron.jpg",
  ],
  title: "3-Bedroom Furnished Duplex Apartment For Rent in Kilimani",
  price: 250000,
  rooms: 3,
  bathrooms: 2,
  type: "Apartment",
  status: "sale",
  location: {
    city: "Nairobi",
    state: "Nairobi",
    zipCode: "Dagoretti",
    latiLon: [51.505, -0.09],
    zoom: 2,
  },
  videoUrl: "https://www.youtube.com/embed/2yJgwwDcgV8?si=76NKEVzKRG-YM4fP",
  amenities: [
    "Parking",
    "Swimming",
    "Garden",
    "Security",
    "Gym",
    "Sports Arena",
  ],
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, officiis nobis? Saepe sapiente eaque perspiciatis consequatur, laudantium ea totam voluptatem et aut expedita est necessitatibus iusto voluptas, quia optio illum.",
};

const SingleListingPage = () => {
  // const { id } = useParams();
  return (
    <div className="w-full">
      <TopBar textcolor="text-gray-700" />

      <section className="flex flex-col mt-10 mb-24 mx-20 gap-4">
        <div className="relative">
          <div className="absolute z-50 top-2 left-2 flex flex-row gap-4">
            <Badge variant="default" className={cn("rounded-md px-5 py-1")}>
              {property.status}
            </Badge>
            <Badge variant="default" className={cn("rounded-md px-5 py-1")}>
              {property.type}
            </Badge>
          </div>
          <SingleImageCarousel imageUrls={property.imgUrls} />
        </div>

        <section className="flex flex-col gap-4 mt-10">
          {/* Short Description */}
          <div className="rounded-md border-2 px-2 py-4">
            <div className="flex flex-row justify-between">
              <h2>{property.title}</h2>
              <h2 className="text-blue-600">Kes {property.price} /month</h2>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-2">
                <BedIcon className="text-gray-600" />
                <p>{property.rooms} Bedrooms</p>
              </div>
              <div className="flex flex-row gap-2">
                <BathIcon className="text-gray-600" />
                <p>{property.bathrooms} Bathrooms</p>
              </div>
              <div className="flex flex-row gap-2">
                <MapPinIcon className="text-gray-600" />
                <p>
                  {property.location.city}, {property.location.zipCode}
                </p>
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
              {property.amenities.map((amenity, index) => (
                <p key={index}>{amenity}</p>
              ))}
            </div>
          </div>
        </section>
        {/*  */}
        <section>
          <iframe
            className="w-full"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/2yJgwwDcgV8?si=76NKEVzKRG-YM4fP"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </section>
        <section className="">
          Map
          <LeafletMap
            location={[51.505, -0.09]}
            zoom={property.location.zoom}
          />
       
        </section>
      </section>

      <Footer />
    </div>
  );
};

export default SingleListingPage;
