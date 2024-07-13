import "../css/slider.css";
import { NewsetApi } from "./apiFetch";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWineGlass,
  faStar,
  faClock,
  faCircleInfo,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import useEmblaCarousel from "embla-carousel-react";
import Skeleton from '@mui/material/Skeleton';
import { Link } from "react-router-dom";
const Slider = () => {
  const [result, setResult] = useState([]);
  const [emblaRef] = useEmblaCarousel();
  useEffect(() => {
    const Fetch = async () => {
      const data = await NewsetApi();
      if (data) {
        setResult(data);
      } else {
        console.log("error fetching");
      }
    };
    Fetch();
  }, []);

 

  return (
    <div className="SliderContainer">
    <div className="embla" ref={emblaRef}>
      {result && result.length > 0 ? (
        <div className="embla__container">
          {result.map((item, index) => (
            <div className="embla__slide" key={index}>
              <div className="gradient"></div>
              <img src={item.cover} alt="anime" className="SliderImage" />
              <div className="sliderInfo">
                <div className="rightBox">
                  <h1>{item.title.english}</h1>
                  <div className="iconsBox">
                    <div className="icon">
                      <FontAwesomeIcon
                        icon={faWineGlass}
                        className="iconStyle"
                      />
                      <p>{item.type}</p>
                    </div>
                    <div className="icon">
                      <FontAwesomeIcon
                        icon={faWineGlass}
                        className="iconStyle"
                      />
                      <p>{item.duration}</p>
                    </div>
                    <div className="icon">
                      <FontAwesomeIcon icon={faStar} className="iconStyle" />
                      <p>{item.rating / 10}</p>
                    </div>
                    <div className="icon">
                      <FontAwesomeIcon icon={faClock} className="iconStyle" />
                      <p>{item.duration} mins</p>
                    </div>
                  </div>
                  <div className="description">
                    <p>
                      {item.description.length > 200
                        ? item.description
                            .replace(/<\/?[^>]+(>|$)/g, "")
                            .substring(0, 200) + "..."
                        : item.description.replace(/<\/?[^>]+(>|$)/g, "")}
                    </p>
                  </div>
                </div>
                <div className="info">
                  <Link to={`/details/${item.id}`} className="btn">
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="iconStyles"
                    />
                    <p className="iconText">Details</p>
                  </Link>
                  <Link to={`/Streaming/${item.id}`} className="btn">
                    <FontAwesomeIcon
                      icon={faCirclePlay}
                      className="iconStyles"
                    />
                    <p className="iconText">Watch Now</p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Skeleton
          variant="rectangular"
          sx={{ bgcolor: "grey.900" }}
          animation="wave"
          className="Slider-Skeleton"
        />
      )}
    </div>
    </div>
  );
};

export default Slider;
