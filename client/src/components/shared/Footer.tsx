import HomeHubLogo from "./Logo";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="container flex flex-col space-y-6 pb-20 lg:flex-row lg:items-start lg:px-28 md:space-x-6 justify-between md:flex-row  text-gray-500 py-6">
      <section className="flex flex-col gap-3">
        <div color="#000">
          <HomeHubLogo />
        </div>
        <p className="lg:w-[25rem] md:w-[16rem] text-justify">
          Take advantage of our platform to find your desired home to buy or
          rent.
        </p>
        <div className="flex flex-row gap-3">
          <Facebook fill="#1877F2" className="border-0" />
          <Linkedin fill="#0A66C2" />
          <Instagram fill="#E4405F" />
        </div>
        <div> © {new Date().getFullYear()} All rights reserved.</div>
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
      <section className="flex flex-col gap-6">
        <h3>Subscribe</h3>
        <p>Subsribe to get latest property, blog, news from us</p>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit">Subscribe</Button>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
