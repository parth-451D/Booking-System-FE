import Image from "next/image";
import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div>
      <section className="h-[calc(100%-7rem)] ">
        <div className="container h-full px-6 py-24">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <form>
                <div className="flex flex-col justify-center items-center">
                  <div className="my-3">
                    <input
                      type="text"
                      className="input"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="password"
                      className="input"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <footer className="mt-6 p-4 flex items-center justify-center flex-col">
                  <button className="btn1">Sign Up</button>
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

export default index;
