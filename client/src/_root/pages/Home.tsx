import TopBar from "@/components/shared/TopBar";
import Footer from "@/components/shared/Footer";
import { SearchForm } from "@/components/forms/SearchForm";
import { Bed, Bath } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
const Home = () => {
  return (
    <div className="w-full">
      <header className=" relative  overflow-hidden bg-no-repeat bg-custom-image bg-cover bg-center h-screen">
        <div className="absolute bg-fixed w-full bg-black bg-opacity-60 h-full text-white">
          <TopBar />
          <div className="flex flex-col items-center mt-40">
            <h1 className="text-[#EDEFF6]">Find Your Dream Home</h1>
            <p className="text-[#EDEFF6] mt-6 w-[43rem] text-center">
              Discover comfort, joy, and a life well-lived. Welcome home to the
              dreams that await you.
            </p>
          </div>
          <div className="mt-32 flex items-center justify-center">
            <SearchForm />
          </div>
        </div>
      </header>
      {/* Why Choose us section */}
      <section className="flex flex-col px-20 py-24 gap-10 items-center justify-center bg-slate-100">
        {/* <h3 className="text-blue-600">Our Expertise</h3> */}
        <h2 className="">Why Choose Us</h2>
        <section className="flex flex-wrap gap-10 justify-center items-center">
          <Card className="w-1/5">
            <CardHeader>
              <CardTitle>Apartments</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus modi id quam illo voluptates quisquam fuga, laboriosam
                cupiditate nam dolorum eius, atque itaque dicta mollitia ratione
                tempora, necessitatibus aspernatur quod?
              </p>
            </CardContent>
          </Card>
          <Card className="w-1/5">
            <CardHeader>
              <CardTitle>Family Homes</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus modi id quam illo voluptates quisquam fuga, laboriosam
                cupiditate nam dolorum eius, atque itaque dicta mollitia ratione
                tempora, necessitatibus aspernatur quod?
              </p>
            </CardContent>
          </Card>
          <Card className="w-1/5">
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus modi id quam illo voluptates quisquam fuga, laboriosam
                cupiditate nam dolorum eius, atque itaque dicta mollitia ratione
                tempora, necessitatibus aspernatur quod?
              </p>
            </CardContent>
          </Card>
          <Card className="w-1/5">
            <CardHeader>
              <CardTitle>Commercial</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus modi id quam illo voluptates quisquam fuga, laboriosam
                cupiditate nam dolorum eius, atque itaque dicta mollitia ratione
                tempora, necessitatibus aspernatur quod?
              </p>
            </CardContent>
          </Card>
        </section>
      </section>

      <section
        className="flex flex-col px-20 py-24 gap-10 items-center justify-center overflow-x-auto
      "
      >
        <h2>Latest House on Rent</h2>
        <p className="text-[#889099]">
          These are the latest houses, apartment and commercial properties on
          rent.
        </p>

        <section className="flex gap-4 snap-mandatory snap-x">
          <Card className={cn("w-[350px] snap-center flex-shrink-0")}>
            <CardHeader>
              <CardTitle>
                <img src="/public/images/jumbotron.jpg" alt="" />
              </CardTitle>
              <CardDescription>
                <h3 className="text-blue-600 text-2xl">
                  3-Bedroom Furnished Duplex Apartment For Rent in Kilimani
                </h3>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="font-semibold">Kes 250,000 / month</span>
              <div className="flex flex-row gap-5 text-[#889099]">
                <div className="flex flex-row gap-1 items-center justify-center ">
                  <Bed />
                  <span>3</span> beds
                </div>
                <div className="flex flex-row gap-1 items-center justify-center">
                  <Bath />
                  <span>2</span> baths
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p>Kilimani, Nairobi, Kenya</p>
            </CardFooter>
          </Card>
          <Card className={cn("w-[350px] snap-center flex-shrink-0")}>
            <CardHeader>
              <CardTitle>
                <img src="/public/images/jumbotron.jpg" alt="" />
              </CardTitle>
              <CardDescription>
                <h3 className="text-blue-600 text-2xl">
                  3-Bedroom Furnished Duplex Apartment For Rent in Kilimani
                </h3>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="font-semibold">Kes 250,000 / month</span>
              <div className="flex flex-row gap-5 text-[#889099]">
                <div className="flex flex-row gap-1 items-center justify-center ">
                  <Bed />
                  <span>3</span> beds
                </div>
                <div className="flex flex-row gap-1 items-center justify-center">
                  <Bath />
                  <span>2</span> baths
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p>Kilimani, Nairobi, Kenya</p>
            </CardFooter>
          </Card>
          <Card className={cn("w-[350px] snap-center flex-shrink-0")}>
            <CardHeader>
              <CardTitle>
                <img src="/public/images/jumbotron.jpg" alt="" />
              </CardTitle>
              <CardDescription>
                <h3 className="text-blue-600 text-2xl">
                  3-Bedroom Furnished Duplex Apartment For Rent in Kilimani
                </h3>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="font-semibold">Kes 250,000 / month</span>
              <div className="flex flex-row gap-5 text-[#889099]">
                <div className="flex flex-row gap-1 items-center justify-center ">
                  <Bed />
                  <span>3</span> beds
                </div>
                <div className="flex flex-row gap-1 items-center justify-center">
                  <Bath />
                  <span>2</span> baths
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p>Kilimani, Nairobi, Kenya</p>
            </CardFooter>
          </Card>
        </section>
      </section>

      <section className="flex flex-col px-20 py-24 m-auto gap-10 items-center justify-center bg-slate-100">
        <h2>Latest House on Sale</h2>
        <p className="text-[#889099]">
          Checkout latest houses, apartment and commercial properties on sale.
        </p>
        <section className="flex gap-4 container overflow-x-auto hide-scroll-bar ">
          <Card className={cn("w-[350px] snap-center flex-shrink-0")}>
            <CardHeader>
              <CardTitle>
                <img src="/public/images/jumbotron.jpg" alt="" />
              </CardTitle>
              <CardDescription>
                <h3 className="text-blue-600 leading-6">
                  3-Bedroom Furnished Duplex Apartment For Rent in Kilimani
                </h3>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="font-semibold">Kes 250,000 / month</span>
              <div className="flex flex-row gap-5 text-[#889099]">
                <div className="flex flex-row gap-1 items-center justify-center ">
                  <Bed />
                  <span>3</span> beds
                </div>
                <div className="flex flex-row gap-1 items-center justify-center">
                  <Bath />
                  <span>2</span> baths
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p>Kilimani, Nairobi, Kenya</p>
            </CardFooter>
          </Card>
          <Card className={cn("w-[350px] snap-center flex-shrink-0")}>
            <CardHeader>
              <CardTitle>
                <img src="/public/images/jumbotron.jpg" alt="" />
              </CardTitle>
              <CardDescription>
                <h3 className="text-blue-600 text-2xl">
                  3-Bedroom Furnished Duplex Apartment For Rent in Kilimani
                </h3>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="font-semibold">Kes 250,000 / month</span>
              <div className="flex flex-row gap-5 text-[#889099]">
                <div className="flex flex-row gap-1 items-center justify-center ">
                  <Bed />
                  <span>3</span> beds
                </div>
                <div className="flex flex-row gap-1 items-center justify-center">
                  <Bath />
                  <span>2</span> baths
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p>Kilimani, Nairobi, Kenya</p>
            </CardFooter>
          </Card>
          
        </section>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
