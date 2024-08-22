import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null); // Set initial state to null
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        console.error("No token found in localStorage");
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:3000/api/user/profile",
        {},
        { headers }
      );
      setUser(response.data.data); // Adjust based on the API response structure
      setLoading(false);
    } catch (error) {
      console.error("Error during profile fetch:", error.response ? error.response.data : error.message);
      setError("An error occurred while fetching profile data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>; // Display loading state
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>; // Display error state
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        {user ? (
          <>
            <div className="font-bold text-xl mb-2">{user.name}</div>
            <p className="text-gray-700 text-base">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700 text-base">
              <strong>User ID:</strong> {user.id}
            </p>
          </>
        ) : (
          <p className="text-gray-700 text-base">No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
