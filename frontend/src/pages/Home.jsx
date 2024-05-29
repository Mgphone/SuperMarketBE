import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";
import Notfound from "../components/NotFound/Notfound.jsx";
import "../styles/Chart.css";
function Home() {
  const [loginError, setLoginError] = useState(false);
  const { logIn } = useAuth();
  const navigate = useNavigate();
  // const url = import.meta.env.VITE_BACK_URL;
  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Invalid Email address")
      .required("Please fill out this field"),
    password: Yup.string().required("Please fill out this field"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const handleSubmit = async (values) => {
    try {
      // console.log("This is my URL" + url);
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log("this is responise" + JSON.stringify(response));
      if (response.ok) {
        const token = response.headers.get("Authorization");
        if (token) {
          logIn(token);
          const decode = jwtDecode(token);
          console.log(JSON.stringify(decode));
          if (decode.role == "super_user") {
            navigate("/homesuper");
          } else if (decode.role == "branch_seller") {
            navigate("/homenormal");
          } else if (decode.role == "branch_manager") {
            navigate("/homebranch");
          } else {
            <Notfound />;
          }
        } else if (!token) {
          setLoginError(true);
        }
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  // console.log("This is my main testing url" + url);
  return (
    <div>
      <form className="loginform" onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <div
          className={`input-container ${
            formik.touched.username && formik.errors.username ? "error" : ""
          }`}
        >
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder="Username *"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="errors">{formik.errors.username}</div>
          ) : null}
        </div>
        <div
          className={`input-container ${
            formik.touched.password && formik.errors.password ? "error" : ""
          }`}
        >
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="password *"
            autoComplete="off"
          />
          {loginError && (
            <div className="errors">Please Check your username password</div>
          )}
          {formik.touched.password && formik.errors.password ? (
            <div className="errors">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit">Login</button>
        <div className="forgotgroup">
          <Link to="/forgotpassword">
            <button>Forgot Password</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Home;
