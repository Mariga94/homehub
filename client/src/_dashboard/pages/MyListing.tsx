import ListingTable from "../_components/ListingTable";
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
    <div className="flex flex-col min-h-[93vh] w-full">
      <div className="flex flex-col px-5 gap-5">
        <h2>My Listings</h2>

        {error ? (
          <p>{error}</p>
        ) : (
          <div className="flex items-center justify-center">
            {loading ? (
              <RotateCw className="animate-spin mt-14" />
            ) : (
              <ListingTable
                data={myListing}
                handleDeleteProperty={handleDeleteProperty}
              />
            )}
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
};

export default MyListing;
