import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import "./home.css"; // We will create this small CSS file below

const Home = () => {
  return (
    <div>
      <Navbar />
  
      <Header />
      <div className="homeContainer">
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
      </div>
    </div>
  );
};

export default Home;