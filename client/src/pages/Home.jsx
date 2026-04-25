import Companies from "../components/Companies";
import DreamJob from "../components/DreamJob";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JobCategory from "../components/JobCategory";
import Testimonials from "../components/Testimonials";
import Working from "../components/Working";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <DreamJob />
      <Companies />
      <JobCategory />
      <Working />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
