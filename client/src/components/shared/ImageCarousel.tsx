import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const ImageCarousel = ({ imageUrls }:{imageUrls: string[]}) => {
    console.log(imageUrls)
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {imageUrls.map((imageUrl, index) => (
        <div key={index} className='w-1/2 h-1/2'>
          <img src={imageUrl} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
