import { useState } from "react";
import "./App.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { validate } from "./tils";

function SignupForm() {
  const navigate = useNavigate();

  const [person, setPerson] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    department: "",
  });
  const [validationErrors, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = () => {
    const errors = {};
    const payload = {
      name: person?.name,
      email: person?.email,
      role: person.role,
      department: person.department,
      password: person.password,
    };
    Object.keys(payload).forEach((key) => {
      const isErrors = validate(key, payload[key]);
      if (isErrors?.length) {
        errors[key] = isErrors;
      }
    });
    if (Object.keys(errors)?.length) {
      setValidationError(errors);
    } else {
      const UserData = {
        name: person?.name,
        email: person?.email,
        role: person.role,
        department: person.department,
        password: person.password,
      };
      setValidationError({});

      axios
        .post("http://localhost:8080/create", UserData)
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res?.data?.token));

          toast("User created successfully");
          navigate("/login");
        })
        .catch((e) => {
          toast(e?.response?.data);
        });
    }
  };

  return (
    <div className="p-[20px] flex justify-center items-center">
      <div className="p-[20px]  bg-[#dfebfb] w-[700px] shadow-2xl flex !items-center shadow-black flex-col gap-[20px] rounded-4xl">
        <div>
          <h1 className="text-center text-4xl !text-[#2a4f96] font-bold">
            Signup
          </h1>
        </div>
        <div className="w-[70%]">
          <TextField
            className="inputfield text-white w-full"
            onChange={(e) => handleChange(e)}
            value={person.name}
            name="name"
            required
            label="Employee name"
          />
          <div className="text-red-700">
            {validationErrors ? validationErrors?.name : ""}
          </div>
        </div>
        <div className="w-[70%]">
          <TextField
            className="inputfield text-white w-full"
            onChange={(e) => handleChange(e)}
            value={person.password}
            name="password"
            required
            label="password"
          />
          <div className="text-red-700">
            {validationErrors ? validationErrors?.password : ""}
          </div>
        </div>{" "}
        <div className="w-[70%]">
          <TextField
            sx={{ color: "white" }}
            className="inputfield !text-white w-full"
            onChange={(e) => handleChange(e)}
            value={person.email}
            name="email"
            required
            label="email"
          />
          <div className="text-red-700">
            {validationErrors ? validationErrors?.email : ""}
          </div>
        </div>
        <FormControl className="inputfield text-white w-[70%] m-auto">
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            label="Department"
            name="department"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value="frontend development">
              Frontend Development
            </MenuItem>
            <MenuItem value="backend development">Backend Development</MenuItem>
            <MenuItem value="full-stack development">
              Full-stack Development
            </MenuItem>
            <MenuItem value="UI-UX designing">UI-UX designing</MenuItem>
            <MenuItem value="full-stack development">
              Full stack Development
            </MenuItem>
          </Select>

          <div className="text-red-700">
            {validationErrors ? validationErrors?.department : ""}
          </div>
        </FormControl>
        <FormControl
          className="inputfield w-[70%] m-auto"
          sx={{ color: "white" }}
        >
          <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
          <Select
            label=" Select Role"
            name="role"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
          </Select>
        </FormControl>
        <div className="text-red-700">
          {validationErrors ? validationErrors?.role : ""}
        </div>
        <div className="w-[70%]">
          <Button
            variant="outlined"
            className="button-85 !bg-[#2a4f96] !text-white !font-bold !w-full !rounded-20px]"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
export default SignupForm;
