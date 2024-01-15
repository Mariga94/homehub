import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { addCommasToNumbers } from "@/services/addCommasToNumbers";

interface featuresInterface {
  balcony: boolean;
  elevator: boolean;
  pool: boolean;
  petFriendly: boolean;
  gym: boolean;
  fireAlarm: boolean;
}

interface locationInterface {
  address: string;
  city: string;
  country: string;
}

export interface PropertyInterface {
  _id: string;
  title: string;
  description: string;
  type: string;
  propertyStatus: string;
  location: locationInterface;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  price: number;
  area: string;
  size: string;
  videoUrl: string;
  features: featuresInterface;
  gallery: string[];
}
type handleDeletePropertyfunction = (id: string) => void;
const ListingTable = ({
  data,
  handleDeleteProperty,
}: {
  data: PropertyInterface[];
  handleDeleteProperty: handleDeletePropertyfunction;
}) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=""></TableHead>
          <TableHead className="font-semibold">Title</TableHead>
          <TableHead className="font-semibold">Status</TableHead>
          <TableHead className="font-semibold">Type</TableHead>
          <TableHead className="font-semibold">Location</TableHead>
          <TableHead className="font-semibold">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((property) => {
          return (
            <TableRow key={property._id}>
              <TableCell>
                <img src={property.gallery[0]} alt="" className="h-20 w-26" />
              </TableCell>
              <TableCell className="">{property.title}</TableCell>
              <TableCell>{property.propertyStatus}</TableCell>
              <TableCell>{property.type}</TableCell>
              <TableCell>{property.location.address}</TableCell>
              <TableCell>{addCommasToNumbers(property.price)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteProperty(property._id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ListingTable;
