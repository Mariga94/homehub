"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
  fullname: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
  agreeToTerms: z.boolean().default(false).optional(),
});

const SignUpForm = () => {
const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      password: "",
      email: "",
      agreeToTerms: true,
    },
  });

  //   Submit handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    return navigate('/sign-in')
  };
  return (
    <div className="flex flex-row flex-1 h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-1 pt-20 space-y-6 items-center w-2/4"
        >
          <h2 className="text-center">HomeHub</h2>
          <p>Create your new account</p>
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className={cn(" w-1/2")}>
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
            name="email"
            render={({ field }) => (
              <FormItem className={cn(" w-1/2")}>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className={cn(" w-1/2")}>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className={cn("flex items-center w-1/2 gap-1")}>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className={cn(" pb-2")}>
                  I agree to the terms of serive
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className={cn("w-1/2")}>
            SignUp
          </Button>
          <div>
            <p>
              Already Have an account <Link to="/sign-in" className="hover:underline text-blue-700">Sign In</Link>
            </p>
          </div>
        </form>
      </Form>
      <div className="flex-1 relative overflow-hidden bg-no-repeat bg-custom-image bg-cover bg-center h-screen">
        <div className="absolute flex flex-col pt-48 px-10 text-center bg-fixed w-full bg-black bg-opacity-20 h-full text-white">
          <h1 className="text-2xl font-bold text-white ">
            Welcome to <span className="text-blue-700">HomeHub</span>
          </h1>
          <p className="text-white text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
            totam ratione aspernatur placeat nostrum minus autem quae accusamus
            iure. Quod totam quasi voluptatibus nemo? Quam molestiae provident
            dolor eligendi nulla!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;