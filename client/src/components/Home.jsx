import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import CategoryCrousel from "./CategoryCrousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetALLjobs from "../hooks/useGetALLjobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate=useNavigate();
  useGetALLjobs();
  useEffect(() => {
    if (user?.role == "RECRUITER") {
      navigate('/admin/company')
    }
  },[]);
  return (
    <div>
      <HeroSection />
      <CategoryCrousel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
