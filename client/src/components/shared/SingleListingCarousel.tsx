// import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SingleImageCarousel = ({ imageUrls }: { imageUrls: string[] }) => {
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
const carouselSettings = {
    showStatus: true,
    stopOnHover:true,
    showArrows:true,
    autoPlay: false,
    showIndicators: true,
    infiniteLoop: true,
    showThumbs: false,
    thumbWidth: 100,
    thumbHeight: 20,
    thumbMargin: 10,
    selectedItem: 0,
  };

  return (
    <Carousel className="flex flex-col " {...carouselSettings}>
      {imageUrls.map((imageUrl: string, index: number) => (
        <div key={index} className="bg-red-100">
            <img
              src={imageUrl}
              alt={`Slide ${index + 1}`}
              className="rounded-md object-cover h-[500px]"
            />

        </div>
      ))}
    </Carousel>

  );
};

export default SingleImageCarousel;


