import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NotFound() {
  const navigator = useNavigate();
  const location = useLocation();

  const goBack = () => {
    return navigator(-1);
  };

  return (
    <section className="flex items-center h-full p-16 bg-gray-100 text-gray-800">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.{" "}
            <span className="text-red-300">{location.pathname}</span>
          </p>
          <p className="mt-4 mb-8 text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <a
            rel="noopener noreferrer"
            href="#"
            onClick={goBack}
            className="px-8 py-3 font-semibold rounded bg-red-200 text-gray-900 mr-3"
          >
            Go Back
          </a>
          <a
            rel="noopener noreferrer"
            href="/"
            className="px-8 py-3 font-semibold rounded bg-red-200 text-gray-900"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
