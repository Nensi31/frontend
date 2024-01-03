import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center gap-[20px] flex-col">
      <h1 className="text-4xl ">Dashboard</h1>
      <Button variant="contained" onClick={() => navigate("/signup")}>
        Signup
      </Button>
      <Button variant="contained" onClick={() => navigate("/login")}>
        Login
      </Button>
      <Button variant="contained" onClick={() => navigate("/createdepartment")}>
        Create Department
      </Button>
    </div>
  );
}
