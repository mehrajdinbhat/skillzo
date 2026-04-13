import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";import { toast } from 'react-hot-toast'
import axios from 'axios'

function Buy() {
    const {courseId} = useParams()
    const [loading, setLoading] = useState(false)

   const storedUser = localStorage.getItem("user");
   const user = storedUser ? JSON.parse(storedUser) : null;
   const token = user?.token;
    const navigate = useNavigate();

    const handlePurchase = async () => {
        if (!token) {
            toast.error("Please log in to purchase the course.");
            return;
        }
        // Add purchase logic here
        try {
          setLoading(true)
          const response= await axios.post(`http://localhost:4001/api/v1/course/buy/${courseId}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true
          });
          toast.success(response.data.message || "Course purchased successfully!");
          navigate("/purchases");
          setLoading(false)

        } catch (error) {
          setLoading(false)
          if(error.response?.status === 401){
            toast.error("you have already purchased this course")
          }else{
            toast.error(error.response?.data.errors)
          }
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <button
        onClick={handlePurchase}
        disabled={loading}
        className={`px-6 py-2 rounded-lg text-white font-medium transition-all duration-300
      ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 active:scale-95 shadow-md"
      }
    `}
      >
        {loading ? "Processing..." : "Buy Course"}
      </button>
    </div>
  );
}

export default Buy