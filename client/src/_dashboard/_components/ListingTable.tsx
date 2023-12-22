import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PropertyInterface {
  id: string;
  imgUrl: string;
  imgUrls: string[];
  title: string;
  price: number;
  rooms: number;
  bathrooms: number;
  type: string;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ListingTable = ({ data }: { data: any[] }) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((property) => {
          return (
            <TableRow key={property.id}>
              <TableCell className="w-1/2">{property.title}</TableCell>
              <TableCell>{property.status}</TableCell>
              <TableCell>{property.type}</TableCell>
              <TableCell>
                {property.location.city} {property.location.zipCode}
              </TableCell>
              <TableCell>{property.price}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ListingTable;
