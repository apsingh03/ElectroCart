import React, { useContext, useState, Suspense } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
// import { FaUser, FaMobile } from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useDispatch } from "react-redux";
import { loginClientAsync } from "../../Redux/UserSlices/UserAuth";

const Header = React.lazy(() => import("../../components/Client/Header"));
const Footer = React.lazy(() => import("../../components/Client/Footer"));

const LogInPage = () => {
  const [logInEmailError, setlogInEmailError] = useState("");
  const [logInPasswordError, setlogInPasswordError] = useState("");
  const { isLoadingTopProgress, setisLoadingTopProgress } =
    useContext(AppContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("*Required"),

    email: Yup.string().email("Invalid email").required("*Required"),
  });

  return (
    <>
      {/* <Suspense
        fallback={
          <div
            className="spinner-border spinner-border-sm text-center"
            role="status"
          ></div>
        }
      > */}
      <Header />
      <div className="d-flex flex-row justify-content-center align-items-center">
        <div className="authPage">
          <div className="authPage__header">
            <h3 className="authPage__header__title">Login</h3>
            <p className="authPage__header__subTitle">
              Please enter your e-mail and password
            </p>
          </div>
          <Formik
            initialValues={{
              email: "user@gmail.com",
              password: "user",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // console.log("values - ", values);
                setisLoadingTopProgress(20);
                const actionResult = await dispatch(
                  loginClientAsync({
                    email: values.email,
                    password: values.password,
                  })
                );

                if (actionResult.payload.msg === "Incorrect Email") {
                  // toast.error(actionResult.payload.msg);
                  setlogInEmailError(actionResult.payload.msg);
                  values.email = "";
                }

                if (actionResult.payload.msg === "Password Wrong") {
                  // toast.error(actionResult.payload.msg);
                  setlogInPasswordError(actionResult.payload.msg);
                  values.password = "";
                }

                if (actionResult.payload.msg === "Logged In Successfull") {
                  values.email = "";
                  values.password = "";
                  toast.success(actionResult.payload.msg);
                  localStorage.setItem(
                    "clientLoggedToken",
                    actionResult.payload.token
                  );
                  window.location.replace("/account");
                }

                setisLoadingTopProgress(100);
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
                    <label htmlFor="email">Email address</label>

                    <p className="authPage__inputFieldError px-3">
                      {errors.email && touched.email && errors.email}
                      {logInEmailError && logInEmailError}
                    </p>
                  </div>

                  <div className="authPage__inputContainer">
                    <div className="authPage__inputContainer__icon">
                      <MdEmail />
                    </div>

                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="user@gmail.com"
                      onClick={() => setlogInEmailError("")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>
                </div>

               
                <div className="form-group mb-3">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <div className="d-flex align-items-baseline">
                      <label htmlFor="password">Password</label>
                      <p className="authPage__inputFieldError px-3">
                        {errors.password && touched.password && errors.password}
                        {logInPasswordError && logInPasswordError}
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
                      id="password"
                      name="password"
                      placeholder="user"
                      onClick={() => setlogInPasswordError("")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </div>
                </div>
                {/*  dsafsad   */}
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

          <div className="authPage__footer">
            <p>
              {" "}
              New customer? <Link to="/signup"> Create an account </Link>{" "}
            </p>
          </div>
        </div>
      </div>
      <Footer />
      {/* </Suspense> */}
    </>
  );
};

export default LogInPage;
