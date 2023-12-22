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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  fullname: z.string().min(2).max(50),
  title: z.string().max(50),
  phoneNumber: z.string().min(9).max(13),
  personalInfo: z.string().max(100),
});

const Profile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      title: "",
      phoneNumber: "",
      personalInfo: "",
    },
  });

  //   Submit handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="flex flex-row pt-10 px-5 w-full space-x-6">
      <div className="w-1/4">
        <h2>Personal Information</h2>
        <p>Update your personal information</p>
      </div>
      <div className="w-3/4 ">
        <div className="flex flex-col px-20 gap-4 mb-5">
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
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 space-y-6 w-full px-20 pb-20"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className={cn(" ")}>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
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
                    <Input placeholder="" {...field} />
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
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className={cn("")}>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
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
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className={cn("w-1/2")}>
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
