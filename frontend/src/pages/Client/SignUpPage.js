import React, { useContext, useState, Suspense } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { createClientAsync } from "../../Redux/UserSlices/UserAuth";
import { useDispatch } from "react-redux";
import { AppContext } from "../../context/AppContext";

const Header = React.lazy(() => import("../../components/Client/Header"));
const Footer = React.lazy(() => import("../../components/Client/Footer"));

const SignUpPage = () => {
  const [SignUpErrors, setSignUpErrors] = useState({ email: "" });
  const { setisLoadingTopProgress } = useContext(AppContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("*Required"),

    fullName: Yup.string()
      .min(4, "Too Short!")
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
            <h3 className="authPage__header__title">Register</h3>
            <p className="authPage__header__subTitle">
              Please fill in the fields below
            </p>
          </div>
          <Formik
            initialValues={{
              email: "",
              fullName: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // console.log("values - ", values);
                setisLoadingTopProgress(20);
                const actionResult = await dispatch(
                  createClientAsync({
                    fullName: values.fullName,
                    email: values.email,
                    password: values.password,
                  })
                );

                if (actionResult.payload.msg === "Sign Up Successful") {
                  toast.success(actionResult.payload.msg);
                  setisLoadingTopProgress(100);
                  setSubmitting(false);
                  navigate("/signin");
                }

                if (actionResult.payload.msg === "Email Already Exist") {
                  values.email = "";
                  setSubmitting(false);
                  setisLoadingTopProgress(100);
                  // toast.error(actionResult.payload.msg);
                  setSignUpErrors({ email: actionResult.payload.msg });
                }

                // console.log("actionResult - ", actionResult);
              } catch (error) {
                console.log("Error client SignUp ", error.message);
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
                    <label htmlFor="fullName">Full Name</label>
                    <p className="authPage__inputFieldError px-3">
                      {errors.fullName && touched.fullName && errors.fullName}
                    </p>
                  </div>

                  <div className="authPage__inputContainer">
                    <div className="authPage__inputContainer__icon">
                      <FaUser />
                    </div>

                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullName}
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <div className="d-flex align-items-baseline">
                    <label htmlFor="email">Email address</label>
                    <p className="authPage__inputFieldError px-3">
                      {errors.email && touched.email && errors.email}
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
                      id="email"
                      name="email"
                      onClick={() => setSignUpErrors({ email: "" })}
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
                      id="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="authPage__submitBtn mt-3"
                  disabled={isSubmitting}
                >
                  SIGN UP
                </button>
              </form>
            )}
          </Formik>

          <div className="authPage__footer">
            <p>
              {" "}
              Already have an account? <Link to="/signin"> Login </Link>{" "}
            </p>
          </div>
        </div>
      </div>
      <Footer />
      {/* </Suspense> */}
    </>
  );
};

export default SignUpPage;
