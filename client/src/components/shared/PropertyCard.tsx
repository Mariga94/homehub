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

interface PropertyInterface {
  id: string;
  imgUrl: string;
  title: string;
  price: number;
  rooms: number;
  bathrooms: number;
}

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
      className={cn("lg:w-1/3 md:w-1/2 flex-shrink-0 cursor-pointer")}
      id={property.id}
      onClick={() => handleOnClick(property.id)}
    >
      <CardHeader className={cn("px-4")}>
        <CardTitle>
          <img
            src={property.imgUrl}
            alt=""
            className="rounded-md object-cover"
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
          Kes <span className="font-semibold">{property.price}</span>
        </p>
        <div className="flex flex-row gap-5 text-[#889099]">
          <div className="flex flex-row gap-1 items-center justify-center ">
            <Bed />
            <span>{property.rooms}</span> beds
          </div>
          <div className="flex flex-row gap-1 items-center justify-center">
            <Bath />
            <span>{property.bathrooms}</span> baths
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p>Kilimani, Nairobi, Kenya</p>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
