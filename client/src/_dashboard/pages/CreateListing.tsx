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
  propertyStatus: z.string(),
  location: locationSchema,
  bedrooms: z.coerce.number(),
  bathrooms: z.coerce.number(),
  floors: z.coerce.number(),
  price: z.coerce.number(),
  area: z.string(),
  size: z.string(),
  videoURL: z.string(),
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
      videoURL: "",
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
      form.reset();
      setPreview([]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:px-10 px-5 py-5 lg:py-10">
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
              name="videoURL"
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
          <div>
            <h2>Property Features</h2>
            <div className="lg:grid md:grid lg:grid-cols-3 md:grid-cols-3 flex flex-col w-full gap-5">
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
                  name="gallery"
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          {...rest}
                          // {...field}
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

                <div className="lg:flex lg:flex-row">
                  {preview.length
                    ? preview.map((image: string, index) => (
                        <img
                          key={index}
                          src={image}
                          alt=""
                          className="lg:h-80 lg:w-80 md:h-40 md:w-40 h-20 w-20"
                        />
                      ))
                    : ""}
                </div>
              </div>
            </div>
            <div>
              <h2>Property Location</h2>
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
