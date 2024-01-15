import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { postData } from "@/services/api";
import { Link } from "react-router-dom";
import { fetchUserFromLocalStorage } from "@/services/fetchUserLocalStorage";
import { useEffect, useState } from "react";
import { IUser } from "../../../types";
export function ProfileAvatar() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    setUser(fetchUserFromLocalStorage());
  }, []);
  const handleLogout = async () => {
    try {
      const res = await postData("auth/sign-out", "POST", "");
      res && localStorage.removeItem("user");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-row gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>{user?.fullName}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" mx-3 mt-3 md:mx-4">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/dashboard/my-profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/dashboard/my-listing">Listing</Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
          <Link to="/dashboard">Dashboard</Link>
        </DropdownMenuItem> */}
          <DropdownMenuItem>
            <Link to="/dashboard/create-listing">Create Listing</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLogout()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
