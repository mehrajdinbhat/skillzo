import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.webp";
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setIsLoggedin(true);
    }else {
      setIsLoggedin(false);
    }
  }, []);


  const handlelogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/api/v1/user/logout",
        { withCredentials: true },
      );

      // ✅ clear frontend auth
      localStorage.removeItem("user");

      setIsLoggedin(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error while logging out");
    }
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/v1/course/courses",
          {
            withCredentials: true
          }
        );
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log(error);
      }
    };
     fetchCourses();

  }, []);
  return (
    <div className="bg-gradient-to-r from-black to-blue-950 ">
      <div className="h-[1250px] md:h-[1050px] text-white container mx-auto">
        {/* header */}
        <header className="flex items-center justify-between p-6 ">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt=""
              className="w-7 h-7 md:w-10 md:h-10 rounded-full"
            />{" "}
            <h1 className="md:text-2xl text-orange-500 font-bold">SkillZo</h1>
          </div>
          <div className="space-x-4">
            {isLoggedin ? (
              <button
                onClick={handlelogout}
                className="bg-green-500 text-white p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-transparent text-white py-2 px-4 border border-white rounded"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-transparent text-white py-2 px-4 border border-white rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>
        {/* main section */}
        <section className="text-center py-20">
          <h1 className="text-4xl font-semibold text-orange-500">SkillZo</h1>

          <br />
          <p className="text-gray-500">
            Sharpen your skills with courses crafted by experts.
          </p>
          <div className="space-x-4 mt-8">
            <Link
              to={"/courses"}
              className="bg-green-500 text-white p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black"
            >
              Explore courses
            </Link>
            <Link
              to={"/"}
              className="bg-white text-black  p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-green-500 duration-300 hover:text-white"
            >
              Courses videos
            </Link>
          </div>
        </section>{" "}
        {/*section 2*/}
        {/* <section className="p-10">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {courses.map((course) => (
              <SwiperSlide key={course._id}>
                <div className="bg-gray-800 rounded-xl p-4 shadow-lg hover:scale-105 duration-300">
                  <img
                    className="h-40 w-full object-cover rounded-lg"
                    src={course.imageUrl?.url}
                    alt={course.title}
                  />

                  <div className="mt-4 text-center">
                    <h2 className="text-lg font-semibold text-white">
                      {course.title}
                    </h2>

                    <button className="mt-3 bg-green-500 px-4 py-2 rounded hover:bg-green-600 duration-300">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section> */}
        <section className="p-10">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            breakpoints={{
              1024: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              640: { slidesPerView: 1 },
            }}
          >
            {courses.map((course) => (
              <SwiperSlide key={course._id}>
                <div className="p-3">
                  <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
                    {/* Image */}
                    <img
                      className="h-40 w-full object-cover"
                      src={course.imageUrl?.url}
                      alt={course.title}
                    />

                    {/* Content */}
                    <div className="p-5 text-center">
                      <h2 className="text-lg font-semibold text-white">
                        {course.title}
                      </h2>

                      <Link
                        to={`/buy/${course._id}`}
                        className="inline-block mt-4 bg-orange-500 text-white py-2 px-5 rounded-full hover:bg-blue-500 duration-300"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <hr />
        {/* footer */}
        <footer className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl text-orange-500 font-bold">SkillZo</h1>
              </div>
              <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2">Follow us</p>
                <div className="flex space-x-4">
                  <a href="">
                    <FaFacebook className="text-2xl hover:text-blue-400 duration-300" />
                  </a>
                  <a href="">
                    <FaInstagram className="text-2xl hover:text-pink-600 duration-300" />
                  </a>
                  <a href="">
                    <FaTwitter className="text-2xl hover:text-blue-600 duration-300" />
                  </a>
                </div>
              </div>
            </div>

            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg font-semibold md:mb-4">connects</h3>
              <ul className=" space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">
                  youtube- Mehraj Din Bhat
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  telegram- Mehraj Din Bhat
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Github- Mehraj Din Bhat
                </li>
              </ul>
            </div>
            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg font-semibold mb-4">
                copyrights &#169; 2026
              </h3>
              <ul className=" space-y-2 text-center text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">
                  Terms & Conditions
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Refund & Cancellation
                </li>
              </ul>
            </div>
          </div>
        </footer>{" "}
      </div>
    </div>
  );
}

export default Home;
