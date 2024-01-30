import { Badge } from "@/components/ui/badge";
import SingleImageCarousel from "@/components/shared/SingleListingCarousel";
import { cn } from "@/lib/utils";

import { useParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { fetchData } from "@/services/api";
import { PropertyInterface } from "types";
// import { dummyData } from "../data";
import { Heart, Printer, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import LeafletMap from "@/components/shared/LeafletMap";
import { ContactForm } from "../components/contactForm";
import ReviewForm from "../components/reviewForm";
import ReadMore from "../components/readMore";
import { addCommasToNumbers } from "@/services/addCommasToNumbers";

const getDefaultProperty = (): PropertyInterface => {
  return {
    _id: "",
    title: "",
    description: "",
    type: "",
    propertyStatus: "",
    location: {
      address: "",
      state: "",
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
    owner: {
      _id: "",
      fullName: "",
      email: "",
    },
  };
};
const SingleListingPage = () => {
  const [property, setProperty] =
    useState<PropertyInterface>(getDefaultProperty);

  const { id } = useParams();

  // const fetchPropertyLocale = (idNum: number) => {
  //   const id = idNum.toString();
  //   const props = dummyData.find((data) => data._id === id);
  //   setProperty(props);
  // };

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
    // fetchPropertyLocale(id);
  }, [id]);

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-2 lg:flex-row md:flex-row md:items-center lg:items-center justify-between mt-10">
        <div className="flex flex-col justify-center items-start">
          <h2>{property.title}</h2>
          <p>{`${property.location.address} ${property.location.country} ${property.location.country}`}</p>
        </div>
        <div className="flex  items-center gap-6">
          <h2>{addCommasToNumbers(property.price)}</h2>
          <div className="flex gap-6  md:relative lg:relative  text-gray-500 z-50 absolute lg:top-auto lg:left-auto lg:transform-none lg:-translate-x-0 lg:-translate-y-0 md:top-auto md:left-auto md:transform-none md:-translate-x-0 md:-translate-y-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Heart
              className="bg-slate-50 p-1 rounded-sm lg:hover:text-gray-100 hover:bg-primary"
              size={30}
            />
            <Share2
              className="bg-slate-50 p-1 lg:hover:text-gray-100 rounded-sm hover:bg-primary"
              size={30}
            />
            <Printer
              className="bg-slate-50 p-1 lg:hover:text-gray-100  rounded-sm hover:bg-primary"
              size={30}
            />
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="absolute z-20 top-2 left-2 flex flex-row gap-4">
          <Badge variant="default" className={cn("rounded-md px-5 py-1")}>
            {property?.propertyStatus}
          </Badge>
          <Badge variant="default" className={cn("rounded-md px-5 py-1")}>
            {property?.type}
          </Badge>
        </div>
        <SingleImageCarousel imageUrls={property?.gallery} />
      </section>

      <section className="flex flex-col lg:flex-row bg-gray-100 gap-5">
        <div className="left lg:w-3/4 md:w-full w-full">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col bg-white p-5 rounded-lg gap-5">
              <div className="flex gap-3 bg-white">
                <Badge
                  className={cn(
                    "text-gray-500 bg-gray-200 p-2 rounded-sm hover:text-primary hover:bg-gray-200"
                  )}
                >
                  Apartment
                </Badge>
                <Badge
                  className={cn(
                    "rounded-sm bg-gray-200 text-gray-500 hover:text-primary hover:bg-gray-200 ease-in-out"
                  )}
                >
                  Bed: {property.bedrooms}
                </Badge>
                <Badge
                  className={cn(
                    "rounded-sm bg-gray-200 text-gray-500 hover:text-primary hover:bg-gray-200"
                  )}
                >
                  Bath: {property.bathrooms}
                </Badge>
                <Badge
                  className={cn(
                    "rounded-sm text-gray-500 bg-gray-200 hover:text-primary hover:bg-gray-200"
                  )}
                >
                  Sq Ft: {property.size}
                </Badge>
              </div>
              <h3>Description</h3>

              <ReadMore
                text={property.description}
                maxLength={property.description.length / 2}
              />
              <Separator />
              <div className="flex flex-col gap-2 bg-white">
                <h3>Property Details</h3>

                <ul className="flex flex-col flex-wrap gap-5 h-">
                  <li>
                    <p>Property Id: 222</p>
                  </li>
                  <li>
                    <p>
                      Price $ <strong>{property.price}</strong>
                    </p>
                  </li>
                  <li>
                    <p>
                      Property Size: <strong>{property.size} Sq Ft</strong>
                    </p>
                  </li>
                  <li>
                    <p>
                      Bedrooms: <strong>{property.bedrooms}</strong>
                    </p>
                  </li>
                  <li>
                    <p>
                      Bathrooms: <strong>{property.bathrooms}</strong>
                    </p>
                  </li>
                  <li>
                    <p>
                      Property Type: <strong>{property.type}</strong>
                    </p>
                  </li>
                  <li>
                    <p>
                      Property Status:{" "}
                      <strong>{property.propertyStatus}</strong>
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-white p-5 rounded-lg">
              <h3>Features</h3>
              <ul className="flex flex-col flex-wrap h-28 gap-5">
                {Object.entries(property.features).map(([feature, value]) => {
                  if (value === "true") {
                    return (
                      <li>
                        <p>
                          <span className="text-primary">✔</span> {feature}
                        </p>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="bg-white flex flex-col gap-3 p-5 rounded-lg">
              <h3>Property Video</h3>
              <hr />
              <div>
                <iframe
                  className="w-full"
                  width="560"
                  height="315"
                  src={property.videoUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
            <div className="flex flex-col gap-3 bg-white p-5 rounded-lg">
              <div className="flex flex-col gap-2 lg:flex-row justify-between">
                <h3>Location</h3>
                <p>{`${property.location.address} ${property.location.country} ${property.location.country}`}</p>
              </div>
              <LeafletMap location={[10.0236, -37.9062]} zoom={13} />
            </div>
            <div className="bg-white p-4">
              <h3>Write a review</h3>
              <ReviewForm />
            </div>
          </div>
        </div>
        <div className="right lg:w-1/4 w-full bg-white rounded-lg h-full p-5">
          <h3>Listed By Agent</h3>
          <div className="flex flex-row gap-5 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h4>{property.owner.fullName}</h4>

              <p>{property.owner.email}</p>
              <p>
                <Link
                  to="/"
                  className="text-primary hover:bg-primary hover:text-gray-100 p-1 rounded-sm"
                >
                  View my Listing
                </Link>
              </p>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleListingPage;
