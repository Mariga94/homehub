import { Avatar, AvatarImage } from "@/components/ui/avatar";
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

export function ProfileAvatar() {
  const handleLogout = async () => {
    try {
      const res = await postData("auth/sign-out", {});
      res && localStorage.removeItem("user");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          {/* <AvatarFallback>CN</AvatarFallback> */}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" mx-8 md:mx-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/dashboard/my-profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/dashboard/my-listing">Listing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/dashboard/create-listing">Create Listing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLogout()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
