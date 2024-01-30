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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { addCommasToNumbers } from "@/services/addCommasToNumbers";
import { Badge } from "../ui/badge";
import { PropertyInterface } from "types";

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
      className={cn("lg:w-96 w-full md:w-auto flex-shrink-0 ")}
      id={property._id}
      onClick={() => handleOnClick(property._id)}
    >
      <CardHeader className={cn(" py-2 px-2")}>
        <CardTitle className="">
          <div className="card-zoom">
            <img
              src={property.gallery[0]}
              alt=""
              className="rounded-md h-56 md:h-56 flex-shrink-0 w-full card-zoom-image "
            />
            <div className="absolute top-2 left-2 flex flex-row gap-2 z-20">
              <Badge className="rounded-md px-3 bg-[#3E4C66]">Featured</Badge>
              <Badge className="rounded-md px-3">
                {property.propertyStatus}
              </Badge>
            </div>
            <h3 className="font-bold absolute bottom-4 left-4 text-white z-40">
              Kes {addCommasToNumbers(property.price)}
            </h3>
          </div>
        </CardTitle>
        <CardDescription>
          <p className="text-primary text-[0.875rem]">{property.type}</p>
          <h4 className="">{property.title}</h4>
        </CardDescription>
      </CardHeader>
      <CardContent className=" px-2 py-2 flex flex-col gap-2">
        <p>
          {property.location.address} {property.location.city},{" "}
          {property.location.state} {property.location.country}
        </p>
        <div className="flex flex-row gap-5 text-gray-500">
          <div className="flex flex-row gap-1 items-center justify-center ">
            <Bed />
            <span>{property.bedrooms}</span> beds
          </div>
          <div className="flex flex-row gap-1 items-center justify-center">
            <Bath />
            <span>{property.bathrooms}</span> baths
          </div>
          <p>SqFt: {property.size}</p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-row items-center gap-2 px-2 py-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>Peter Ceasar</p>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
