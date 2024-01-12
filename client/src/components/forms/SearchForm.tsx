import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ArrowUpDown } from "lucide-react";
// import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const locations = [
  { label: "Nairobi", value: "nairobi" },
  { label: "Kiambu", value: "kiambu" },
  { label: "Nanyuki", value: "nanyuki" },
] as const;

const rooms = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
] as const;

const propertyType = [
  { label: "Apartment", value: "Apartment" },
  { label: "House", value: "House" },
  { label: "Modern villa", value: "Modern Value" },
] as const;

const accountFormSchema = z.object({
  location: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  room: z.number().int().min(1, { message: "Enter Number of rooms" }),
  propertyType: z.string({
    required_error: "Please select property type",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // location:'location'
  // dob: new Date("2023-01-23"),
};

export function SearchForm() {
  const { toast } = useToast();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-1/2 px-3 flex lg:flex-row flex-col items-center justify-center gap-3
         py-6 text-[#2C3A61] rounded-md shadow-md bg-slate-100 bg-opacity-60"
      >
        {/**location formfield */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className={cn("flex flex-col gap-1 lg:w-1/2 ")}>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Location..."
                  {...field}
                  className={cn("lg:w-80 md:w-[500px] w-[300px] text-black")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* room formfield */}
        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-1">
              <FormLabel>Room</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[300px] md:w-[500px] justify-between text-black",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? rooms.find((room) => room.value === room.value)?.label
                        : "Select Room"}
                      <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Select Number of room..." />
                    <CommandEmpty>No Room Selected</CommandEmpty>
                    <CommandGroup>
                      {rooms.map((room) => (
                        <CommandItem
                          value={room.label}
                          key={room.value}
                          onSelect={() => {
                            form.setValue("room", room.value);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              room.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {room.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Property formfield */}
        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 md:flex-1">
              <FormLabel>Property Type</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[300px] md:w-[500px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? propertyType.find(
                            (property) => property.value === property.value
                          )?.label
                        : "Select Property Type"}
                      <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No property type</CommandEmpty>
                    <CommandGroup>
                      {propertyType.map((property) => (
                        <CommandItem
                          value={property.label}
                          key={property.value}
                          onSelect={() => {
                            form.setValue("propertyType", property.value);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              property.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {property.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-cente mt-5">
          <Button type="submit" className={cn("w-36")}>
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
}
