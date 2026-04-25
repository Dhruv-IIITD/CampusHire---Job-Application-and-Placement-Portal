import Footer from "../components/Footer";
import Header from "../components/Header";
import PostedJobs from "../components/PostedJobs";

const PostedJobsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <PostedJobs />
      <Footer />
    </div>
  );
};

export default PostedJobsPage;
