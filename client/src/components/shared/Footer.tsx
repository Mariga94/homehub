import HomeHubLogo from "./Logo";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
const Footer = () => {
  return (
    <footer className="flex flex-col pb-5 rounded-lg mb-9">
      <Separator />
      <div className=" flex flex-col space-y-6  lg:flex-row lg:items-start lg:px-0 md:space-x-6 justify-between md:flex-row   py-6">
        <section className="flex flex-col gap-3 lg:pt-5">
          <div color="#000">
            <HomeHubLogo />
          </div>
          <p className="lg:w-[25rem] md:w-[16rem] text-justify">
            Take advantage of our platform to find your desired home to buy or
            rent.
          </p>
        </section>
        <section className="flex flex-col gap-6">
          <h3>Features</h3>
          <ul className="flex flex-col gap-3">
            <li>Home</li>
            <li>Rent</li>
            <li>Sale</li>
            <li>Blog</li>
          </ul>
        </section>
        <section className="flex flex-col gap-6">
          <h3>Company</h3>
          <ul className="flex flex-col gap-3">
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact</li>
            <li>Blog</li>
          </ul>
        </section>
        <section className="flex flex-col gap-6 ">
          <h3>Subscribe</h3>
          <p>Subsribe to get latest property, blog, news from us</p>
          <div className="flex w-full max-w-sm items-center space-x-2 md:flex-col md:items-end md:gap-3">
            <Input type="email" placeholder="Email" />
            <Button type="submit">Subscribe</Button>
          </div>
        </section>
      </div>
      <Separator />
      <div className="flex justify-between items-center py-1">
        <div> © {new Date().getFullYear()} All rights reserved.</div>
        <div className="flex flex-row gap-3">
          <Facebook />
          <Linkedin />
          <Instagram />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
