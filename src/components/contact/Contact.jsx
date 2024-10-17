// import { IoMdMail } from "react-icons/io";
// import {
//   FaFacebook,
//   FaInstagram,
//   FaPhoneAlt,
//   FaTwitterSquare,
// } from "react-icons/fa";
import emailjs from "emailjs-com";
// import { FaLocationDot } from "react-icons/fa6";
import Swal from "sweetalert2";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { MessageSquareCode, PhoneIcon } from "lucide-react";
import Container from "../Container";

const Contact = () => {
  const axiosCommon = UseAxiosCommon();
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICEID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATEID;
  const userID = import.meta.env.VITE_EMAILJS_USERID;

  console.log(serviceID, templateID, userID);

  const sendEmail = async (e) => {
    e.preventDefault();
    const form = e.target;

    Swal.fire({
      title: "Do you want to send the message?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Send",
      denyButtonText: `Don't send`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send email using emailjs
          await emailjs.sendForm(serviceID, templateID, form, userID);

          // Send contact data to your API
          const response = await axiosCommon.post("/contacts/create", {
            name: form.user_name.value,
            email: form.user_email.value,
            message: form.message.value,
          });

          console.log(response.data);
          Swal.fire(
            "Sent!",
            "Your message has been sent successfully.",
            "success"
          );
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error",
            "An error occurred while sending your message. Please try again.",
            "error"
          );
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not sent", "", "info");
      }
    });
  };

  return (
    <>
      <Container>
        <div>
          <div className="relative bg-white">
            <div className="absolute inset-0">
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
            </div>
            <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
              <div className="bg-gray-50 px-6 py-16 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
                <div className="mx-auto max-w-lg">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Get in touch
                  </h2>
                  <p className="mt-3 text-lg leading-6 text-gray-500">
                    Nullam risus blandit ac aliquam justo ipsum. Quam mauris
                    volutpat massa dictumst amet. Sapien tortor lacus arcu.
                  </p>
                  <dl className="mt-8 text-base text-gray-500">
                    <div>
                      <dt className="sr-only">Postal address</dt>
                      <dd>
                        <p>742 Evergreen Terrace</p>
                        <p>Springfield, OR 12345</p>
                      </dd>
                    </div>
                    <div className="mt-6">
                      <dt className="sr-only">Phone number</dt>
                      <dd className="flex">
                        <PhoneIcon
                          aria-hidden="true"
                          className="h-6 w-6 flex-shrink-0 text-gray-400"
                        />
                        <span className="ml-3">+1 (555) 123-4567</span>
                      </dd>
                    </div>
                    <div className="mt-3">
                      <dt className="sr-only">Email</dt>
                      <dd className="flex">
                        <MessageSquareCode
                          aria-hidden="true"
                          className="h-6 w-6 flex-shrink-0 text-gray-400"
                        />
                        <span className="ml-3">support@example.com</span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="bg-white px-6 py-16 lg:col-span-3 lg:px-8 lg:py-24 xl:pl-12">
                <div className="mx-auto max-w-lg lg:max-w-none">
                  <form
                    onSubmit={sendEmail}
                    className="grid grid-cols-1 gap-y-6"
                  >
                    <div>
                      <label htmlFor="full-name" className="sr-only">
                        Full name
                      </label>
                      <input
                        id="user_name"
                        name="user_name"
                        type="text"
                        placeholder="Full name"
                        autoComplete="name"
                        className="block w-full rounded-md border-gray-300 px-4 py-3 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        id="user_email"
                        name="user_email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        className="block w-full rounded-md border-gray-300 px-4 py-3 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="sr-only">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Message"
                        className="block w-full rounded-md border-zinc-800 px-4 py-3 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue={""}
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;

{
  /* <div className="bg-gray-100 my-20 py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white rounded-lg shadow-lg">
          <div className="md:w-2/3 w-full md:pr-8 md:py-12 md:px-16 py-7 px-4">
            <h2 className="text-2xl font-semibold pt-1 mb-6">
              Send us a Message
            </h2>
            <form
              onSubmit={sendEmail}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="col-span-2 lg:col-span-1">
                <label className="block text-sm mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="user_name"
                  name="user_name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <label className="block text-sm mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  id="user_email"
                  name="user_email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="message"
                  name="message" 
                  rows="4"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Send <span className="ml-2">✈️</span>
                </button>
              </div>
            </form>
          </div>

          <div className="md:w-1/3 w-full bg-blue-900 text-white p-6 rounded-lg md:mt-0 mt-8 ">
            <h3 className="text-xl font-semibold mt-10 mb-4">
              Contact Information
            </h3>
            <ul className="space-y-4">
              <li>
                <div className="flex items-center">
                  <span className="mr-2">
                    <FaLocationDot />
                  </span>
                  <p className="ml-5">123 Main Street, Anytown, USA</p>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mr-2">
                    <FaPhoneAlt />
                  </span>
                  <p className="ml-5">+1 555-555-5555</p>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mr-2">
                    <IoMdMail />
                  </span>
                  <p className="ml-5">info@example.com</p>
                </div>
              </li>
            </ul>

            <div className="mt-10 flex space-x-4">
              <a
                href="#"
                className="hover:text-blue-300 flex items-center space-x-2"
              >
                <FaTwitterSquare />
                <span>Twitter</span>
              </a>
              <a
                href="#"
                className="hover:text-blue-300 flex items-center space-x-2"
              >
                <FaFacebook />
                <span>Facebook</span>
              </a>
              <a
                href="#"
                className="hover:text-blue-300 flex items-center space-x-2"
              >
                <FaInstagram />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div> */
}
