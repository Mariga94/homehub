import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";


import { fetchData, postData } from "@/services/api";
import { useEffect, useState } from "react";

const formSchema = z.object({
  fullName: z.string().min(2).max(50).optional(),
  title: z.string().max(50).optional(),
  phoneNumber: z.string().max(13).optional(),
  personalInfo: z.string().max(100).optional(),
});

interface ILocalStorageUser {
  fullName: string;
  _id: string;
  email: string;
}
interface IUserProfile {
  _id: string;
  fullName?: string;
  title?: string;
  phoneNumber?: string;
  personalInfo?: string;
}
const currentUser: string | null = localStorage.getItem("user");
const objectifyUser: ILocalStorageUser = JSON.parse(currentUser!);
const userId: string = objectifyUser?._id;

const Profile = () => {
  const [profile, setProfile] = useState<IUserProfile | undefined>(undefined);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      title: "",
      phoneNumber: "",
      personalInfo: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetchData(`user/${userId}`);
        setProfile(response.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfileData();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await postData("user/update-profile", "PUT", { ...values });
      form.reset()
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex lg:flex-row flex-col min-h-[93vh] items-start pt-5 px-5 lg:px-5  w-full lg:space-x-6 space-y-6 ">
      <div className="lg:w-1/4 w-full">
        <h2>Personal Information</h2>
        <p>Update your personal information</p>
      </div>
      <div className="lg:w-3/4 w-full ">
        {/* <div className="flex flex-col lg:px-20 gap-4 mb-5">
          <Avatar className={cn("w-[5rem] h-[5rem]")}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="">
            <Input id="picture" type="file" />
            <Button
              type="submit"
              className="cursor-not-allowed pointer-events-none mt-4"
            >
              Upload Photo
            </Button>
          </div>
        </div> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col lg:space-y-6 space-y-2 md:space-y-6 w-full lg:px-20 lg:pb-20"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className={cn(" ")}>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder={profile?.fullName} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className={cn(" ")}>
                  <FormLabel>Your Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        profile?.title
                          ? profile?.title
                          : "Choose among Agent, Owner"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className={cn("")}>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        profile?.phoneNumber
                          ? profile?.phoneNumber
                          : "Enter valid phone number"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalInfo"
              render={({ field }) => (
                <FormItem className={cn("")}>
                  <FormLabel>Personal Info</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        profile?.personalInfo
                          ? profile?.personalInfo
                          : "Add info"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className={cn("w-1/2")}>
              {isSubmitting ? "Saving changes..." : "Save changes"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
