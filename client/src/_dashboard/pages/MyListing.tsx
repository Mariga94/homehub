import { Button } from "@/components/ui/button";
import ListingTable from "../_components/ListingTable";
import { Link } from "react-router-dom";
import { fetchData } from "@/services/api";
import { useEffect, useState } from "react";
import { RotateCw } from "lucide-react";
import { postData } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
const MyListing = () => {
  const { toast } = useToast();
  const [myListing, setMyListing] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteProperty = async (id: string) => {
    try {
      const res = await postData(`property/${id}`, "DELETE", "");
      toast({
        variant: "destructive",
        description: `${res.message}`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchMyListing = async () => {
      try {
        setLoading(true);
        const response = await fetchData("property/user");
        setMyListing(response.properties);
        
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error!.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchMyListing();
  }, []);


  return (
    <div className="flex flex-col gap-10 px-5 h-screen py-10">
      <div className="flex justify-between">
        <h2>My Listings</h2>
        <Button asChild>
          <Link to="/dashboard/create-listing">Create Listing</Link>
        </Button>
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="flex items-center justify-center">
          {loading ? (
            <RotateCw className="animate-spin mt-14" />
          ) : (
            <ListingTable data={myListing} handleDeleteProperty={handleDeleteProperty}/>
          )}
        </div>
      )}
      <Toaster/>
    </div>
  );
};

export default MyListing;
