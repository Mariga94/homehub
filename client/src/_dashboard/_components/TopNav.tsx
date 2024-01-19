import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ProfileAvatar } from "@/components/shared/ProfileAvatar";

const DashBoardTopNavigation = ({
  isToggled,
  toggleLeftBarNavigation,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
{
  isToggled: boolean;
  toggleLeftBarNavigation: React.MouseEventHandler<SVGSVGElement>;
}) => {
  return (
    <div
      className={`sticky top-0 w-full h-16 border-b-2 flex flex-row items-center justify-between 
    lg:justify-between md:justify-between py-9 px-5 space-x-8 bg-white flex-shrink-0 min-h-0`}
    >
      {isToggled ? (
        <X onClick={toggleLeftBarNavigation} />
      ) : (
        <Menu className="" onClick={toggleLeftBarNavigation} />
      )}

      <div className="flex gap-4">
        <ProfileAvatar/>

        <Button asChild variant="default">
          <Link to="dashboard/create-listing">Create Listing +</Link>
        </Button>
      </div>
    </div>
  );
};

export default DashBoardTopNavigation;
