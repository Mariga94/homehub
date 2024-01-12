import { cn } from "@/lib/utils";
import { Bed, Bath } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { PropertyInterface } from "@/_dashboard/_components/ListingTable";
import { addCommasToNumbers } from "@/services/addCommasToNumbers";

type HandleOnClick = (id: string) => void;

const PropertyCard = ({
  property,
  handleOnClick,
}: {
  property: PropertyInterface;
  handleOnClick: HandleOnClick;
}) => {
  return (
    <Card
      className={cn("w-full md:w-1/2 lg:w-1/3 mb-4 cursor-pointer")}
      id={property._id}
      onClick={() => handleOnClick(property._id)}
    >
      <CardHeader className={cn("px-4")}>
        <CardTitle>
          <img
            src={property.gallery[0]}
            alt=""
            className="rounded-md object-cover max-h-48 w-full "
          />
        </CardTitle>
        <CardDescription>
          <span className="text-blue-600 leading-6 text-2xl font-semibold">
            {property.title}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Kes <span className="font-semibold">{addCommasToNumbers(property.price)}</span>
        </p>
        <div className="flex flex-row gap-5 text-[#889099]">
          <div className="flex flex-row gap-1 items-center justify-center ">
            <Bed />
            <span>{property.bedrooms}</span> beds
          </div>
          <div className="flex flex-row gap-1 items-center justify-center">
            <Bath />
            <span>{property.bathrooms}</span> baths
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p>{property.location.address} {property.location.city}</p>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
