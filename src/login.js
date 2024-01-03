import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validate } from "./tils";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import login from "./5191079.jpg";

function LoginForm() {
  const navigate = useNavigate();
  const [validationErrors, setValidationError] = useState({});
  const [person, setPerson] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const handleSubmit = () => {
    const errors = {};
    const payload = {
      email: person?.email,

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
      setValidationError({});
      axios
        .post("http://localhost:8080/login", {
          email: person?.email,
          password: person.password,
        })
        .then((res) => {
          localStorage.setItem("loginuser", JSON.stringify(res.data));

          axios
            .post("http://localhost:8080/welcome", {
              token: res?.data?.token,
            })
            .then((res) => {
              if (res?.data === "Welcome") {
                toast(res?.data);
                navigate("/data");
              }
            });
        })
        .catch((e) => toast(e?.response?.data));
    }
  };
  return (
    <div className="flex justify-around items-center  max-[900px]:flex-col max-[900px]:!w-[100%] max-[900px]:justify-center">
      <div className="test w-[45%] max-[900px]:hidden">
        <img src={login} height="100%" width="100%" alt="imagesssx" />
      </div>
      <div className="formm w-[45%] max-[900px]:!w-[80%] rounded-4xl bg-[#dfebfb] shadow-2xl shadow-black flex-col flex justify-center items-center gap-[20px] p-[20px]">
        <div className="text-white">
          <h1
            style={{ textAlign: "center" }}
            className="text-center text-[#2a4f96]"
          >
            Login Form
          </h1>
        </div>
        <div className="!w-[70%]">
          <TextField
            className="inputfield !w-full"
            onChange={(e) => handleChange(e)}
            value={person.password}
            name="password"
            required
            label="password"
          />
          <div className="text-red-700">
            {validationErrors ? validationErrors?.name : ""}
          </div>
        </div>{" "}
        <div className="!w-[70%]">
          <TextField
            className="inputfield !w-full"
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
        <div className="w-[70%]">
          <Button
            variant="outlined"
            className="button-85 !bg-[#2a4f96] !text-white !font-bold !w-full !rounded-20px]"
            onClick={handleSubmit}
          >
            submit
          </Button>
          <Button
            className="!mt-[30px]"
            variant="outline"
            onClick={() => navigate("/signup")}
          >
            Dont have an account ? sign-up
          </Button>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
