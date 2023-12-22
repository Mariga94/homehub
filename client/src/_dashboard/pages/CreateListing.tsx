import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import "leaflet/dist/leaflet.css";

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
import { CheckIcon } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

const types = [
  { label: "Apartment", value: "Apartment" },
  { label: "Furnished Apartment", value: "Furnished Apartment" },
  { label: "Offices", value: "Offices" },
  { label: "Bungalow", value: "Bungalow" },
] as const;

const status = [
  { label: "Rent", value: "Rent" },
  { label: "Sale", value: "Sale" },
] as const;

const locationSchema = z.object({
  address: z.string(),
  city: z.string(),
  country: z.string(),
  zipCode: z.string(),
  latLn: z.array(z.number()).length(2),
  zoom: z.number(),
});

const featuresSchema = z.object({
  balcony: z.boolean().default(false).optional(),
  elevator: z.boolean().default(false).optional(),
  pool: z.boolean().default(false).optional(),
  petFriendly: z.boolean().default(false).optional(),
  gym: z.boolean().default(false).optional(),
  fireAlarm: z.boolean().default(false).optional(),
});

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.string(),
  status: z.string(),
  location: locationSchema,
  bedrooms: z.number(),
  bathrooms: z.number(),
  floors: z.number(),
  area: z.string(),
  size: z.string(),
  price: z.number(),
  videoURL: z.string(),
  amenities: z.array(z.string()),
  features: featuresSchema,
  imgUrls: z.array(z.string()),
});

const CreateListing = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      status: "",
      location: {
        city: "",
        state: "",
        zipCode: "",
        latLn: [],
        zoom: 0,
      },
      bedrooms: undefined,
      bathrooms: undefined,
      floors: undefined,
      area: "",
      size: "",
      price: 0,
      videoURL: "",
      amenities: [],
      features: {
        balcony: false,
        elevator: false,
        pool: false,
        petFriendly: false,
        gym: false,
        fireAlarm: false,
      },
      imgUrls: [],
    },
  });
  const [preview, setPreview] = useState([]);
  console.log(preview);
  function getImageData(event: React.ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();

    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="px-10 py-10">
      <h2>Property Description</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter property description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 w-full gap-5">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className=" flex flex-col w-[300px] col-span-1">
                  <FormLabel>Type</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn("w-[200px justify-between")}
                        >
                          {field.value
                            ? types.find((type) => type.value === field.value)
                                ?.label
                            : "Select type"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[100%] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search type of property..."
                          className="h-9"
                        />
                        <CommandEmpty>No Property type found.</CommandEmpty>
                        <CommandGroup>
                          {types.map((type) => (
                            <CommandItem
                              value={type.label}
                              key={type.value}
                              onSelect={() => {
                                form.setValue("type", type.value);
                              }}
                            >
                              {type.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  type.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className=" flex flex-col w-[300px] col-span-1">
                  <FormLabel>Status</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn("w-[200px justify-between")}
                        >
                          {field.value
                            ? status.find((item) => item.value === field.value)
                                ?.label
                            : "Select status"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[100%] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search status of property..."
                          className="h-9"
                        />
                        <CommandEmpty>No Property status found.</CommandEmpty>
                        <CommandGroup>
                          {status.map((type) => (
                            <CommandItem
                              value={type.label}
                              key={type.value}
                              onSelect={() => {
                                form.setValue("status", type.value);
                              }}
                            >
                              {type.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  type.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[300px] col-span-1">
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Bedrooms" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[300px] col-span-1">
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Bathrooms" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="floors"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[300px] col-span-1">
                  <FormLabel>Floors</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Floors" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[300px] col-span-1">
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <Input placeholder="sq ft" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[300px] col-span-1">
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input placeholder="sq ft" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[300px] col-span-1">
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Rent / Sale Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoURL"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[300px] col-span-1">
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Youtube,Vimeo..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <h2>Property Features</h2>
            <div className="grid grid-cols-3 w-full gap-5">
              <FormField
                control={form.control}
                name="features.balcony"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Balcony</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.elevator"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Elevator</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.pool"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Pool</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.petFriendly"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Pet Friendly</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.gym"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Gym</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.fireAlarm"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Fire Alarm</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <h2>Property Gallery</h2>
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="imgUrls"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Property Gallery</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          {...rest}
                          onChange={(event) => {
                            const { files, displayUrl } = getImageData(event);
                            setPreview(displayUrl);
                            onChange(files);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {preview[0]}
              </div>
            </div>
            <div>
              <h2>Property Location</h2>
              <div className="grid grid-cols-3 w-full gap-5">
                <FormField
                  control={form.control}
                  name="location.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Select Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Button type="submit" className={cn("w-[200px]")}>Add Property</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateListing;
