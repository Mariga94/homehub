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
import { useNavigate } from "react-router-dom";
import { PropertyInterface } from "types";
type handleDeletePropertyfunction = (id: string) => void;

const ListingTable = ({
  data,
  handleDeleteProperty,
}: {
  data: PropertyInterface[];
  handleDeleteProperty: handleDeletePropertyfunction;
}) => {
  const navigate = useNavigate();
  function handleTableRowClick(id: string | undefined): void {
    navigate(`${id}`);
  }
  return (
    <Table className="bg-white rounded-lg">
      <TableCaption>A list of your listings.</TableCaption>
      <TableHeader className="bg-primary text-white">
        <TableRow className="text-white">
          <TableHead className="font-semibold text-gray-100">Title</TableHead>
          <TableHead className="font-semibold text-gray-100"></TableHead>
          <TableHead className="font-semibold text-gray-100">Status</TableHead>
          <TableHead className="font-semibold text-gray-100">Type</TableHead>
          <TableHead className="font-semibold text-gray-100">
            Location
          </TableHead>
          <TableHead className="font-semibold text-gray-100">Price</TableHead>
          <TableHead className="font-semibold text-gray-100"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((property) => {
          return (
            <TableRow
              key={property._id}
              onClick={() => handleTableRowClick(property._id)}
            >
              <TableCell>
                <img
                  src={property.gallery[0]}
                  alt=""
                  className="h-20 w-30 rounded-sm"
                />
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
