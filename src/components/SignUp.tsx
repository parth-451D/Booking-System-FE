import { RegisterSchema } from "@/src/schema";
import AuthService from "@/src/service/Auth";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const initialValues: { fullName: string; email: string; password: string } = {
  fullName: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const router = useRouter();
  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: RegisterSchema(),
      onSubmit: (values, action) => handleSignup(values, action),
    });

  const handleSignup = (values: any, action: any) => {
    AuthService.register(values)
      .then((res: any) => {
        router.push("/login");
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section className="h-[calc(100%-7rem)] ">
        <div className="container h-full px-6 py-24">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center items-center">
                  <div className="my-3">
                    <input
                      type="text"
                      name="fullName"
                      onChange={handleChange}
                      value={values.fullName}
                      onBlur={handleBlur}
                      className="input"
                      placeholder="Full Name"
                    />
                    {errors.fullName && touched.fullName && (
                      <p className="text-red-600 mt-1">{errors.fullName}</p>
                    )}
                  </div>
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
                      type="password"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      className="input"
                      placeholder="Password"
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-600 mt-1">{errors.password}</p>
                    )}
                  </div>
                </div>
                <footer className="mt-6 p-4 flex items-center justify-center flex-col">
                  <button className="btn1" type="submit">
                    Sign Up
                  </button>
                  <div className="span flex justify-end me-1 mt-4">
                    Back to &nbsp;
                    <Link
                      href="/login"
                      className="hover:underline text-blue-500"
                    >
                      Login
                    </Link>
                  </div>
                </footer>
              </form>
            </div>

            <div className="md:w-8/12 lg:ml-6 lg:w-5/12 ml-28">
              <Image
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                width="100"
                height="100"
                style={{ height: "auto", width: "auto" }}
                alt="Phone image"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
