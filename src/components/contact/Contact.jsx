import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { MessageSquareCode, PhoneIcon } from "lucide-react";
import Container from "../Container";

const Contact = () => {
  const axiosCommon = UseAxiosCommon();
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICEID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATEID;
  const userID = import.meta.env.VITE_EMAILJS_USERID;

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
          await emailjs.sendForm(serviceID, templateID, form, userID);
          await axiosCommon.post("/contacts/create", {
            name: form.user_name.value,
            email: form.user_email.value,
            message: form.message.value,
          });

          Swal.fire("Sent!", "Your message has been sent successfully.", "success");
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "An error occurred while sending your message. Please try again.", "error");
        } finally {
          form.reset();
        }
      } else if (result.isDenied) {
        Swal.fire("Your message was not sent", "", "info");
      }
    });
  };

  return (
    <Container>
      <div className="relative my-2"> 
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-blue-50 rounded-xl"  />
        </div>
        <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
          <div className="bg-blue-50 px-6 py-16 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
            <div className="mx-auto max-w-lg">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Get in Touch
              </h2>
              <p className="mt-3 text-lg leading-6 text-gray-500">
                We’d love to hear from you! If you have any questions or comments, please feel free to reach out.
              </p>
              <dl className="mt-8 text-base text-gray-500">
                <div>
                  <dt className="sr-only">Postal Address</dt>
                  <dd>
                    <p>123 FlowMate Lane</p>
                    <p>Dhaka, Bangladesh 1212</p>
                  </dd>
                </div>
                <div className="mt-6">
                  <dt className="sr-only">Phone Number</dt>
                  <dd className="flex">
                    <PhoneIcon aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-400" />
                    <span className="ml-3">+880 1XXXXXXXXX</span>
                  </dd>
                </div>
                <div className="mt-3">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex">
                    <MessageSquareCode aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-400" />
                    <span className="ml-3">support@flowmate.com</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-white px-6 py-16 lg:col-span-3 lg:px-8 lg:py-24 xl:pl-12">
            <div className="mx-auto max-w-lg lg:max-w-none">
              <form onSubmit={sendEmail} className="grid grid-cols-1 gap-y-6">
                <div>
                  <label htmlFor="user_name" className="sr-only">Full Name</label>
                  <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    placeholder="Full Name"
                    autoComplete="name"
                    className="block w-full rounded-md border-gray-300 px-4 py-3 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="user_email" className="sr-only">Email</label>
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
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Your Message"
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
    </Container>
  );
};

export default Contact;
