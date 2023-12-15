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

//   const handleThumbnailClick = (index:number) => {
//     setSelectedImageIndex(index);
//   };

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
    // <div className="flex">
    //   <div className="w-2/3">
    //     <Carousel showThumbs={false} selectedItem={selectedImageIndex}>
    //       {imageUrls.map((imageUrl, index) => (
    //         <div key={index}>
    //           <img src={imageUrl} alt={`Slide ${index + 1}`} className="rounded-md object-cover" />
    //         </div>
    //       ))}
    //     </Carousel>
    //   </div>
    //   <div className="w-1/3 p-4">
    //     {/* Thumbnails go here */}
    //     {imageUrls.map((imageUrl, index) => (
    //       <img
    //         key={index}
    //         src={imageUrl}
    //         alt={`Thumbnail ${index + 1}`}
    //         className={`w-1/2 h-auto flex flex-col cursor-pointer ${
    //           selectedImageIndex === index ? "border-2 border-blue-500" : ""
    //         }`}
    //         onClick={() => handleThumbnailClick(index)}
    //       />
    //     ))}
    //   </div>
    // </div>
  );
};

export default SingleImageCarousel;


