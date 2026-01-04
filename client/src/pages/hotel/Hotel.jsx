import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext"; // Import Search Context
import { AuthContext } from "../../context/AuthContext";     // Import Auth Context
import Reserve from "../../components/reserve/Reserve";      // Import Reserve Modal

const Hotel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. Get Hotel ID
  const id = location.pathname.split("/")[2];
  
  // 2. State for Modal
  const [openModal, setOpenModal] = useState(false);

  // 3. Fetch Data
  const { data, loading, error } = useFetch(`/api/hotels/${id}`);
  
  // 4. Get User and Search Data from Context
  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);

  // 5. Calculate Days Function
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  // 6. Calculate actual days (default to 0 if no dates selected)
  const days = (dates && dates.length > 0) 
    ? dayDifference(dates[0].endDate, dates[0].startDate)
    : 0;

  // 7. Handle Reserve Button Click
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading..."
      ) : (
        <div className="hotelContainer">
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance} from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img src={photo} alt="" className="hotelImg" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                {/* Dynamically show days and calculated price */}
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of {data.city}, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          {/* Render Modal if openModal is true */}
          {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
        </div>
      )}
    </div>
  );
};

export default Hotel;