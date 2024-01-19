import { SearchPropertyForm } from "@/components/shared/SearchProperty";
const Jumbotron = () => {
  return (
    <header className="">

      <section className="relative overflow-hidden bg-no-repeat bg-custom-image bg-cover bg-center h-[40rem] rounded-lg md:p-20 pt-10">
        <section className="flex lg:block flex-col gap-7 absolute md:w-full md:left-0 md:right-0 md:items-center md:px-10">
          <h1 className="text-4xl lg:text-[3.5rem] lg:leading-[4rem] md:text-[3.0rem] lg:w-[40rem] font-semibold lg:text-left 
          text-center md:text-left ">
            Buy, rent, or sell your property easily
          </h1>
          <p className="lg:w-[30rem] text-[#585981] text-[1.375rem] font-normal text-center lg:text-left md:text-left">
            We provide a complete service for the sale, purchase or rental of
            real estate.
          </p>
          <div className="mt-10">
            <SearchPropertyForm />
          </div>
        </section>
      </section>
    </header>
  );
};

export default Jumbotron;
