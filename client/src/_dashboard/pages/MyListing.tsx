import { Button } from "@/components/ui/button";
import ListingTable from "../_components/ListingTable";
import { Link } from "react-router-dom";

const properties = [
  {
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
  },
  {
    id: "2",
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
  },
  {
    id: "3",
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
  },
] as const;
const MyListing = () => {
  return (
    <div className="flex flex-col gap-10 px-5 h-screen py-10">
      <div className="flex justify-between">
        <h2>My Listings</h2>
        <Button asChild>
          <Link to="/dashboard/create-listing">Create Listing</Link>
        </Button>
      </div>
      <ListingTable data={properties} />
    </div>
  );
};

export default MyListing;
