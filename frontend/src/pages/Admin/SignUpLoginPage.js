import React, { useContext, useState } from "react";
import Header from "../../components/Client/Header";
import Footer from "../../components/Client/Footer";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaUser, FaMobile } from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useSelector, useDispatch } from "react-redux";
import {
  createAdminAsync,
  loginAdminAsync,
} from "../../Redux/AdminSlices/adminAuth";
const SignUpLoginPage = () => {
  const dispatch = useDispatch();

  const { isLoadingTopProgress, setisLoadingTopProgress } =
    useContext(AppContext);

  const [SignUpErrors, setSignUpErrors] = useState({ email: "" });
  const [LoginErrors, setLoginErrors] = useState({ email: "", password: "" });

  const SigninSchema = Yup.object().shape({
    loginPassword: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("*Required"),

    loginEmail: Yup.string().email("Invalid email").required("*Required"),
  });

  const SignupSchema = Yup.object().shape({
    signUpPassword: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("*Required"),

    signUpFullName: Yup.string()
      .min(4, "Too Short!")
      .max(20, "Too Long!")
      .required("*Required"),

    signUpEmail: Yup.string().email("Invalid email").required("*Required"),
  });

  return (
    <>
      <Header />

      <div className="col-12 row">
        <div className="col-12 col-md-6">
          <div className="authPage" style={{ width: "100%" }}>
            <div className="authPage__header">
              <h3 className="authPage__header__title">Admin Login</h3>
            </div>
            <Formik
              initialValues={{
                loginEmail: "admin@gmail.com",
                loginPassword: "admin",
              }}
              validationSchema={SigninSchema}
              onSubmit={async (values, { setSubmitting }) => {
                // console.log(values);

                try {
                  // console.log("values - ", values);
                  setisLoadingTopProgress(20);
                  const actionResult = await dispatch(
                    loginAdminAsync({
                      email: values.loginEmail,
                      password: values.loginPassword,
                    })
                  );

                  if (actionResult.payload.msg === "Incorrect Email") {
                    // toast.error(actionResult.payload.msg);
                    setLoginErrors({ email: actionResult.payload.msg });
                    values.loginEmail = "";
                  }

                  if (actionResult.payload.msg === "Password Wrong") {
                    // toast.error(actionResult.payload.msg);
                    setLoginErrors({ password: actionResult.payload.msg });
                    values.loginPassword = "";
                  }

                  if (actionResult.payload.msg === "Logged In Successfull") {
                    values.loginEmail = "";
                    values.loginPassword = "";
                    toast.success(actionResult.payload.msg);
                    localStorage.setItem(
                      "adminLoggedToken",
                      actionResult.payload.token
                    );
                    window.location.replace("/admin/");
                  }

                  setisLoadingTopProgress(100);
                  setSubmitting(false);
                  // console.log("actionResult - ", actionResult);
                } catch (error) {
                  console.log("Error client login ", error.message);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <div className="d-flex align-items-baseline">
                      <label htmlFor="loginEmail">Email address</label>
                      <p className="authPage__inputFieldError px-3">
                        {errors.loginEmail &&
                          touched.loginEmail &&
                          errors.loginEmail}
                        {LoginErrors.email && LoginErrors.email}
                      </p>
                    </div>

                    <div className="authPage__inputContainer">
                      <div className="authPage__inputContainer__icon">
                        <MdEmail />
                      </div>

                      <input
                        type="email"
                        className="form-control"
                        id="loginEmail"
                        name="loginEmail"
                        placeholder="admin@gmail.com"
                        onClick={() => setLoginErrors({ email: "" })}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.loginEmail}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <div className="d-flex align-items-baseline justify-content-between">
                      <div className="d-flex align-items-baseline">
                        <label htmlFor="loginPassword">Password</label>
                        <p className="authPage__inputFieldError px-3">
                          {errors.loginPassword &&
                            touched.loginPassword &&
                            errors.loginPassword}
                          {LoginErrors.password && LoginErrors.password}
                        </p>
                      </div>

                      <div>
                        <Link
                          to="/forgotPassword"
                          style={{ color: "#131212", fontSize: "16px" }}
                        >
                          {" "}
                          Forgot Password{" "}
                        </Link>
                      </div>
                    </div>

                    <div className="authPage__inputContainer">
                      <div className="authPage__inputContainer__icon">
                        <MdPassword />
                      </div>

                      <input
                        type="password"
                        className="form-control"
                        id="loginPassword"
                        name="loginPassword"
                        placeholder="admin"
                        onClick={() => setLoginErrors({ password: "" })}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.loginPassword}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="authPage__submitBtn mt-3"
                    disabled={isSubmitting}
                  >
                    LOGIN
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="authPage" style={{ width: "100%" }}>
            <div className="authPage__header">
              <h3 className="authPage__header__title">Admin Register</h3>
            </div>
            <Formik
              initialValues={{
                signUpEmail: "",
                signUpFullName: "",
                signUpPassword: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  // console.log("values - ", values);
                  setisLoadingTopProgress(20);
                  const actionResult = await dispatch(
                    createAdminAsync({
                      fullName: values.signUpFullName,
                      email: values.signUpEmail,
                      password: values.signUpPassword,
                    })
                  );

                  if (actionResult.payload.msg === "Sign Up Successful") {
                    toast.success(actionResult.payload.msg);

                    values.signUpFullName = "";
                    values.signUpEmail = "";
                    values.signUpPassword = "";
                  }

                  if (actionResult.payload.msg === "Email Already Exist") {
                    values.signUpEmail = "";
                    setSignUpErrors({ email: actionResult.payload.msg });
                  }

                  setSubmitting(false);
                  setisLoadingTopProgress(100);

                  // console.log("actionResult - ", actionResult);
                } catch (error) {
                  setisLoadingTopProgress(100);
                  console.log("Error Admin SignUp ", error.message);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <div className="d-flex align-items-baseline">
                      <label htmlFor="signUpFullName">Full Name</label>
                      <p className="authPage__inputFieldError px-3">
                        {errors.signUpFullName &&
                          touched.signUpFullName &&
                          errors.signUpFullName}
                      </p>
                    </div>

                    <div className="authPage__inputContainer">
                      <div className="authPage__inputContainer__icon">
                        <FaUser />
                      </div>

                      <input
                        type="text"
                        className="form-control"
                        id="signUpFullName"
                        name="signUpFullName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.signUpFullName}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <div className="d-flex align-items-baseline">
                      <label htmlFor="signUpEmail">Email address</label>
                      <p className="authPage__inputFieldError px-3">
                        {errors.signUpEmail &&
                          touched.signUpEmail &&
                          errors.signUpEmail}
                        {SignUpErrors.email && SignUpErrors.email}
                      </p>
                    </div>

                    <div className="authPage__inputContainer">
                      <div className="authPage__inputContainer__icon">
                        <MdEmail />
                      </div>

                      <input
                        type="email"
                        className="form-control"
                        id="signUpEmail"
                        name="signUpEmail"
                        onClick={() => setSignUpErrors({ email: "" })}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.signUpEmail}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <div className="d-flex align-items-baseline justify-content-between">
                      <div className="d-flex align-items-baseline">
                        <label htmlFor="signUpPassword">Password</label>
                        <p className="authPage__inputFieldError px-3">
                          {errors.signUpPassword &&
                            touched.signUpPassword &&
                            errors.signUpPassword}
                        </p>
                      </div>
                    </div>

                    <div className="authPage__inputContainer">
                      <div className="authPage__inputContainer__icon">
                        <MdPassword />
                      </div>

                      <input
                        type="password"
                        className="form-control"
                        id="signUpPassword"
                        name="signUpPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.signUpPassword}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="authPage__submitBtn mt-3"
                    disabled={isSubmitting}
                  >
                    Register As Admin
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignUpLoginPage;
