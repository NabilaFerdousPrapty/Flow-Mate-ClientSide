import Container from "@/components/Container";
import { Command, Layout, ListFilter, TextQuote, Users } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Timeline from "../../../../public/images/features/timeline.svg";
import Board from "../../../../public/images/features/board.svg";
import List from "../../../../public/images/features/list.svg";

import "../style.css";

import { Autoplay } from "swiper/modules";

const features = [
  {
    id: 1,
    title: "Board",
    description:
      "Manage your issues in a real-time automated kanban board with a drag and drop interface.",
    icon: <Layout />,
    image: Board,
  },
  {
    id: 2,
    title: "List",
    description:
      "Browse your issues and group them by labels, assignees, milestones, and more.",
    icon: <TextQuote />,
    image: List,
  },
  {
    id: 3,
    title: "Timeline",
    description:
      "With features like real-time collaboration and a chat system, you can work with your team seamlessly.",
    icon: <Users />,
    image: Timeline,
  },
];

const Features = () => {
  return (
    <Container className="my-24 md:my-32">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold pb-5">
          Breeze through issues at lighting speed
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-3xl mx-auto">
          Having trouble keeping track of your issues and their corresponding
          status as well as your team progress? Volta introduces the ultimate
          solution to manage your GitHub issues.
        </p>
      </div>

      <div className="mt-10">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <div className="w-2/3 mx-auto ">
            {features.map(({ id, title, description, icon, image }) => (
              <SwiperSlide key={id}>
                <div className="relative">
                  <img
                    className="bg-gray-900  rounded-2xl"
                    src={image}
                    alt=""
                  />
                  <div className=" h-1/2 w-1/2 md:h-1/4 md:w-1/3 absolute  bottom-2 left-2 md:bottom-8 md:left-8   rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border p-4">
                    <div className="flex text-slate-300 justify-start items-center">
                      <div className=" space-x-2">{icon}</div>
                      <h1 className=" text-lg md:text-2xl font-bold">
                        {title}
                      </h1>
                    </div>

                    <p className=" leading-none text-white text-justify py-2 text-[12px] md:text-sm">
                      {description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>

      {/* Bento Grid */}

      <div className="grid sm:grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 my-10 md:my-16 ">
        <div className="col-span-2 bg-slate-900 text-white rounded-xl p-5 ">
          <ListFilter className="w-10 h-10 border rounded-xl p-2 border-slate-500" />

          <h1 className="text-2xl font-bold text-slate-100 py-2">
            Advance Filters
          </h1>
          <p className="text-zinc-400">
            Filter your notifications ans issue by any property with logical
            operators
          </p>
          <img
            className="pt-4"
            src="../../../../public/images/features/filters.svg"
            alt=""
          />
        </div>
        <div className="col-span-2 col-start-1 row-start-2 bg-slate-900 text-white rounded-xl pt-5 pl-5">
          <div className="flex justify-between">
            <div>
              <Command className="w-10 h-10 border rounded-xl p-2 border-slate-500" />

              <h1 className="text-2xl font-bold text-slate-100 py-2">
                Keyboard-first Design
              </h1>
              <p className="text-zinc-400">
                Optimize for efficient keyboard navigation and shortcut for
                everything
              </p>
            </div>
            <img
              className="pt-4"
              src="../../../../public/images/features/shortcuts.svg"
              alt=""
            />
          </div>
        </div>
        <div className="row-span-2 col-start-3 row-start-1  bg-slate-900 text-white rounded-xl pl-5 pt-5 ">
          <ListFilter className="w-10 h-10 border rounded-xl p-2 border-slate-500" />

          <h1 className="text-2xl font-bold text-slate-100 py-2">
            Realtime Notification
          </h1>
          <p className="text-zinc-400">
            Get notified of new issues, comments, and updates in real-time.
          </p>
          <img
            className="pt-4 pl-20"
            src="../../../../public/images/features/editor.svg"
            alt=""
          />
        </div>
      </div>
    </Container>
  );
};

export default Features;
