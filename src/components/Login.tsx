
import { useAppDispatch } from "@/src/redux/hooks";
import { setIsLogin, setProfileData } from "@/src/redux/reducers/userReducer";
import { LoginSchema } from "@/src/schema";
import AuthService from "@/src/service/Auth";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const initialValues: { email: string; password: string } = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: LoginSchema(),
      onSubmit: (values, action) => handleLogin(values, action),
    });

  const handleLogin = (values: any, action: any) => {
    AuthService.login(values)
      .then((res: any) => {
        dispatch(setIsLogin(true));
        dispatch(setProfileData(res.result));
        action.resetForm();
        setTimeout(() => {
          router.push("/movies");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <section className="h-[calc(100%-7rem)] ">
        <div className="container h-full px-6 py-24">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <Image
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                width="100"
                height="100"
                style={{ height: "auto", width: "auto" }}
                alt="Phone image"
                className="ml-28"
              />
            </div>

            <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center items-center">
                  <div className="my-3">
                    <input
                      type="text"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="input"
                      placeholder="Email Address"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div className="my-3">
                    <input
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      type="password"
                      className="input"
                      placeholder="Password"
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-600 mt-1">{errors.password}</p>
                    )}
                  </div>
                </div>
                <footer className="mt-6 p-4 flex items-center justify-center flex-col">
                  <button type="submit" className="btn1">
                    Login
                  </button>
                  <div className="span flex justify-end me-1 mt-4">
                    Don&apos;t have account? Sign Up &nbsp;{" "}
                    <Link
                      href="/signup"
                      className="hover:underline text-blue-500"
                    >
                      here
                    </Link>
                  </div>
                </footer>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
