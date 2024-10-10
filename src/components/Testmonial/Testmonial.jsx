import { useEffect, useState } from "react";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { Star } from "lucide-react";

const Testmonial = () => {
  const axiosCommon = UseAxiosCommon();

  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    axiosCommon
      .get("feedbacks")
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [axiosCommon]);

  return (
    <div>

      <Container className=" bg-gradient-to-b from-[#1e3a8a] to-[#299edd] text-white ">
        <div className=" lg:px-20 px-5 py-5 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="my-auto space-y-2 lg:space-y-4 flex-1 lg:text-start text-center">
              <h1 className="text-xl font-bold">Clients Feedback</h1>
              <h2 className="lg:text-3xl text-sm lg:font-bold">
                What Our Happy <br />
                Customers Are Saying
              </h2>
              <p className="text-sm">
                Here are the thoughts from our team on how collaboration helps
                us achieve success together. And review from our talented users
                who are using this extra-ordinary team collaboration tool.
              </p>
            </div>

            {/* Swiper Implementation for Sliding Cards */}
            <div className="bg-white p-5 lg:p-14 rounded-2xl flex-1 lg:w-[600px]">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                className="swiper-container"
                onSwiper={(swiper) => (swiperRef.current = swiper)}
              >
                {feedbacks.map((feedback, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white rounded-xl shadow-sm flex flex-col sm:flex-row h-auto sm:h-60 ">
                      <div className="shrink-0 sm:w-60 relative rounded-xl overflow-hidden sm:pt-[40%]">
                        <img
                          className="size-full absolute top-0 start-0 object-cover w-full h-full sm:h-auto"
                          src={feedback.image}
                          alt={feedback.name}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-wrap w-full sm:w-auto">
                        <div className="px-4 py-2 sm:px-8 sm:py-2 flex flex-col justify-between h-full">
                          <h3 className="text-lg font-bold text-gray-800 py-2 sm:py-3 text-center sm:text-start">
                            {feedback.name}
                          </h3>
                          <div className="flex justify-center sm:justify-start">
                            {Array.from({ length: feedback.rating }, (_, i) => (
                              <Star key={i} className="text-yellow-400" />
                            ))}
                          </div>
                          <p className="mt-2 text-gray-500 text-center sm:text-start">
                            {feedback.feedback}
                          </p>
                          <div className="mt-5 sm:mt-auto flex justify-center sm:justify-start gap-3">
                            <button
                              className="bg-black p-3 rounded-full text-yellow-600"
                              onClick={handleSlideLeft}
                            >
                              <FaChevronLeft />
                            </button>
                            <button
                              className="bg-black p-3 rounded-full text-yellow-600"
                              onClick={handleSlideRight}
                            >
                              <FaChevronRight />
                            </button>
                          </div>
                        </div>

      <section className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
            What our <span className="text-blue-500">team</span> says
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-center text-gray-500">
            Here are the thoughts from our team on how collaboration helps us
            achieve success together.
          </p>

          <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {feedbacks
              .slice(Math.max(feedbacks.length - 6, 0))
              .map((feedback) => (
                <div
                  key={feedback._id}
                  className="p-8 border rounded-lg hover:bg-blue-500 bg-white hover:text-white transition-all duration-300 ease-in-out animate-fadeIn"
                >
                  <p className="leading-loose">{feedback.feedback}</p>

                  <div className="flex items-center mt-8 -mx-2">
                    <img
                      className="object-cover mx-2 rounded-full w-14 h-14 ring-4 ring-blue-300"
                      src={feedback.image}
                      alt={feedback.name}
                    />
                    <div className="mx-2">
                      <h1 className="font-semibold">{feedback.name}</h1>
                      <div className="flex">
                        {Array.from({ length: feedback.rating }).map((_, i) => (
                          <Star key={i} className="text-yellow-500"></Star>
                        ))}

                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </section>
        </div>
      </section>
    </div>
  );
};

export default Testmonial;
