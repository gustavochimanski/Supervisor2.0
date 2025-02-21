"use client";

import ProtectedRoute from "@/components/security/ProtectedRoute";


const Home = () => {

  return(
    <ProtectedRoute>
      <div>
        <h1>Home</h1>
      </div>
    </ProtectedRoute>
  )
}

export default Home;