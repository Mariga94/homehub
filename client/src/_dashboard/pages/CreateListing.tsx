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
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChangeEvent, useState } from "react";
import { postData } from "@/services/api";

const types = [
  { label: "Apartment", value: "apartment" },
  { label: "Furnished Apartment", value: "furnished apartment" },
  { label: "Offices", value: "offices" },
  { label: "Bungalow", value: "bungalow" },
  { label: "Villa", value: "Villa" },
] as const;

const status = [
  { label: "Rent", value: "rent" },
  { label: "Sale", value: "sale" },
] as const;

const locationSchema = z.object({
  address: z.string(),
  city: z.string(),
  country: z.string(),
});

const featuresSchema = z.object({
  balcony: z.boolean().default(false).optional(),
  elevator: z.boolean().default(false).optional(),
  pool: z.boolean().default(false).optional(),
  petFriendly: z.boolean().default(false).optional(),
  gym: z.boolean().default(false).optional(),
  fireAlarm: z.boolean().default(false).optional(),
  garden: z.boolean().default(false).optional(),
  swimmingPool: z.boolean().default(false).optional(),
  exposedBrick: z.boolean().default(false).optional(),
  cityView: z.boolean().default(false).optional(),
  rooftopAccess: z.boolean().default(false).optional(),
  oceanView: z.boolean().default(false).optional(),
  scenicView: z.boolean().default(false).optional(),
  wraparoundDeck: z.boolean().default(false).optional(),
  fireplace: z.boolean().default(false).optional(),
  hikingTrails: z.boolean().default(false).optional(),
  highCeilings: z.boolean().default(false).optional(),
  backyard: z.boolean().default(false).optional(),
  spaciousKitchen: z.boolean().default(false).optional(),
  studyRoom: z.boolean().default(false).optional(),
  garage: z.boolean().default(false).optional(),
  parking: z.boolean().default(false).optional(),
  securitySystem: z.boolean().default(false).optional(),
});

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.string(),
  propertyStatus: z.string(),
  location: locationSchema,
  bedrooms: z.coerce.number(),
  bathrooms: z.coerce.number(),
  floors: z.coerce.number(),
  price: z.coerce.number(),
  area: z.string(),
  size: z.string(),
  videoUrl: z.string(),
  features: featuresSchema,
  gallery: z.array(z.any()),
});

const uploadImage = async (files: File[]) => {
  try {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "lvpprzgc");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dfqgrdik0/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Image upload failed");
      }
      const responseData = await response.json();
      return responseData.secure_url;
    });
    const uploadedUrls = await Promise.all(uploadPromises);
    // console.log(uploadedUrls);
    return [...uploadedUrls];
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

const CreateListing = () => {
  const { toast } = useToast();
  const [preview, setPreview] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      propertyStatus: "",
      location: {
        address: "",
        city: "",
        country: "",
      },
      bedrooms: 1,
      bathrooms: 1,
      floors: 1,
      area: "",
      size: "",
      price: 0,
      videoUrl: "",
      features: {
        balcony: false,
        elevator: false,
        pool: false,
        petFriendly: false,
        gym: false,
        fireAlarm: false,
      },
      gallery: [],
    },
  });

  // console.log(form.getValues())
  function getImageData(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();

    setPreview([]);
    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    );

    // const files = dataTransfer.files;
    const imagesArray = Array.from(dataTransfer.files);
    // const displayURL = URL.createObjectURL(event.target.files![0]);
    const displayURLsArray = Array.from(event.target.files!).map((image) =>
      URL.createObjectURL(image)
    );
    return { imagesArray, displayURLsArray };
  }
  // console.log(form.getValues());
  const updatePreview = (displayURL: Array<string>) => {
    setPreview(displayURL);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const uploadedImages = await uploadImage(values.gallery);
      const updatedValues = { ...values, gallery: uploadedImages };
      const res = await postData("property", "POST", { ...updatedValues });
      toast({
        variant: "success",
        description: `${res.message}`,
      });
      console.log(res);
      form.reset();
      setPreview([]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col lg:px-10 px-5 p-5 ">
      <h2 className="mb-5">Add New Property</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5 "
        >
          <div className="bg-white rounded-md py-10 px-5 flex flex-col gap-y-5">
            <h3>Property Description</h3>
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
            <div className="lg:grid md:grid lg:grid-cols-3 md:grid-cols-3 flex flex-col w-full gap-5">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className=" flex flex-col lg:w-[300px] md:w-[300px] w-full col-span-1">
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
                name="propertyStatus"
                render={({ field }) => (
                  <FormItem className=" flex flex-col lg:w-[300px] md:w-[300px] w-full col-span-1">
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
                              ? status.find(
                                  (item) => item.value === field.value
                                )?.label
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
                                  form.setValue("propertyStatus", type.value);
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
                  <FormItem className="flex flex-col lg:w-[300px] md:w-[300px] w-full col-span-1">
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Bedrooms"
                        type="number"
                        min={1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem className="flex flex-col lg:w-[300px] md:w-[300px] w-full col-span-1">
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Bathrooms"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="floors"
                render={({ field }) => (
                  <FormItem className="flex flex-col lg:w-[300px] md:w-[300px] w-full col-span-1">
                    <FormLabel>Floors</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Floors"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem className="flex flex-col lg:w-[300px] md:w-[300px] w-full col-span-1">
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
                  <FormItem className="flex flex-col lg:w-[300px] md:w-[300px] w-full col-span-1">
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
                  <FormItem className="flex flex-col lg:w-[300px] md:w-[300px] w-full col-span-1">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Rent / Sale Price"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-col lg:w-[300px] md:w-[300px] w-full col-span-1">
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Youtube,Vimeo..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-white p-5 rounded-lg">
            <h3>Property Features</h3>
            <div className="flex flex-col flex-wrap h-[480px] w-full gap-3">
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
              <FormField
                control={form.control}
                name="features.garden"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Garden</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.swimmingPool"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Swimming pool</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.exposedBrick"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Exposed Brick</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.cityView"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>City view</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.rooftopAccess"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Roof Top Access</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.oceanView"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Ocean View</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.scenicView"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Scenic View</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.wraparoundDeck"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Wrap Around Deck</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.fireplace"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Fire place</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.hikingTrails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Hiking Trails</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.highCeilings"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>High Ceilings</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.backyard"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Backyard</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.spaciousKitchen"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Spacious Kitchen</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.studyRoom"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Study Room</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.garage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Garage</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.parking"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Parking</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features.securitySystem"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Security System</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="bg-white rounded-md p-4">
            <h3>Property Gallery</h3>
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="gallery"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>All 3 Images</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...rest}
                        multiple
                        accept="image/*"
                        onChange={(event) => {
                          const { imagesArray, displayURLsArray } =
                            getImageData(event);
                          updatePreview(displayURLsArray);
                          onChange(imagesArray);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="lg:flex lg:flex-row mt-5">
                {preview.length
                  ? preview.map((image: string, index) => (
                      <img
                        key={index}
                        src={image}
                        alt=""
                        className="lg:h-80 lg:w-80 md:h-40 md:w-40 h-20 w-20 rounded-md"
                      />
                    ))
                  : ""}
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-sm">
            <h3>Property Location</h3>
            <div className="lg:grid md:grid  lg:grid-cols-3 md:grid-cols-3 flex flex-col w-full gap-5">
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
                name="location.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter City" {...field} />
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
                      <Input placeholder="Enter Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className={cn("w-[200px]")}>
            {loading ? "Submitting..." : "Submit Property"}
          </Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
};

export default CreateListing;
