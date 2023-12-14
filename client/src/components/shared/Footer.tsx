import HomeHubLogo from "./Logo";
import { Facebook, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex flex-row px-20 py-24 gap-48">
      <section className="flex flex-col gap-6">
        <div color="text-[#4A60A1]">
          <HomeHubLogo />
        </div>

        <div className="flex flex-col gap-4">
          <h2>Contact Us</h2>
          <p>Call: 123 300 500</p>
          <p>Nairobi, Kenya</p>
          <p>Email: homehub@email.com</p>
          <div className="flex flex-row gap-3 text-gray-600">
            <Facebook />
            <Linkedin />
            <Instagram />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <h2>Features</h2>
        <ul className="flex flex-col gap-4 text-gray-600">
          <li>Home</li>
          <li>Rent</li>
          <li>Sale</li>
          <li>Blog</li>

        </ul>
      </section>
      <section className="flex flex-col gap-6">
        <h2>Company</h2>
        <ul className="flex flex-col gap-4 text-gray-600">
          <li>About Us</li>
          <li>Careers</li>
          <li>Contact</li>
          <li>Blog</li>

        </ul>
      </section>
      <section className="flex flex-col gap-6">
        <h2>Terms and policies</h2>
        <ul className="flex flex-col gap-4 text-gray-600">
          <li>Terms of service</li>
          <li>Privacy policy</li>
          <li>Security</li>
          

        </ul>
      </section>
    </footer>
  );
};

export default Footer;
