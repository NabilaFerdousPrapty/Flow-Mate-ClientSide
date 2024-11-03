import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="max-w-md text-center space-y-4">
          <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 inline-flex">
            <CheckIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Payment Successful
          </h1>
          <p className="text-gray-500 dark:text-gray-400 md:text-xl">
            Your subscription has been activated. You can now access all the
            features of our SaaS product.
          </p>
        </div>
        <Link
          href="#"
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Go to Dashboard
        </Link>
      </div>
    </React.Fragment>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
