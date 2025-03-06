"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";

const detail = [
  {
    title: "completed",
    cat: "images",
    detail: [
      {
        id: "game-001",
        img: "/assets/header-35-1068x604.jpg",
        title: "Renalith in Desire [v1.1] [Completed]",
        status: "completed",
        date: "2015-02-24",
      },
      {
        id: "game-002",
        img: "/assets/header-37-1068x377.jpg",
        title: "My New MILF Neighbour [v1.0] [Completed]",
        status: "completed",
        date: "2015-02-24",
      },
      {
        id: "game-003",
        img: "/assets/sakurai.jpg",
        title: "Sparkling Duplicity [Final]",
        status: "completed",
        date: "2015-02-24",
      },
      {
        id: "game-004",
        img: "/assets/header-19.jpg",
        title: "Turning the Page [v1.0.0] [Completed]",
        status: "Recommended",
        date: "2015-02-24",
      },
    ],
  },
  {
    title: "recommended",
    cat: "images",
    detail: [
      {
        id: "anim-001",
        img: "/assets/header-327.jpg",
        title: "Symphony of the Serpent [v23031]",
        status: "completed",
        date: "2015-02-24",
      },
      {
        id: "anim-002",
        img: "/assets/smphony.jpg",
        title: "SnowStorm [v0.9 DR]",
        status: "completed",
        date: "2015-02-24",
      },
      {
        id: "anim-003",
        img: "/assets/snowstorm.jpg",
        title: "Cybernetic Seduction [Ep.6 Part 1]",
        status: "completed",
        date: "2015-02-24",
      },
    ],
  },
  {
    title: "Games",
    cat: "dropdown",
    detail: [
      { title: "android" },
      { title: "MacOS" },
      { title: "Windows" },
      { title: "iOS" },
      { title: "Linux" },
      { title: "Switch" },
      { title: "Trending" },
      { title: "Ren'Y" },
      { title: "VN" },
      { title: "PC" },
      { title: "Mobile" },
      { title: "Steam" },
      { title: "Xbox" },
      { title: "PSN" },
    ],
  },
  {
    title: "Animation",
    cat: "dropdown",
    detail: [
      { title: "Popular Animation" },
      { title: "Collection" },
      { title: "New Releases" },
      { title: "Featured" },
      { title: "Popular" },
      { title: "Manga" },
      { title: "Anime" },
    ],
  },
  { title: "HENTAI" },
  { title: "AI Movie Generator" },
];

const Nav = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);
  const router = useRouter();
  const navigate = () => router.push("/");

  const handleMouseEnter = (title) => {
    setActiveDropdown(title);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileDropdown = (title) => {
    setMobileOpenDropdown(mobileOpenDropdown === title ? null : title);
  };

  return (
    <div className="w-full md:w-[80%] absolute top-0 left-0 bg-black md:bg-transparent z-[10000] md:relative mx-auto py-4 px-4 md:px-0">
      <div className="flex flex-col md:flex-row w-full justify-between items-center">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden w-full flex justify-between items-center mb-4">
          <div
            onClick={navigate}
            className="relative group"
            onMoush1eEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <h1
              className={`
                uppercase 
                font-semibold 
                cursor-pointer 
                text-2xl md:text-4xl 
                bg-gradient-to-r 
                from-[#883364] 
                to-white 
                bg-clip-text 
                text-transparent 
                relative
                z-10
                transition-all 
                duration-500 
                transform 
                ${
                  isHovered
                    ? "scale-105 rotate-1"
                    : "hover:scale-105 hover:rotate-1"
                }
              `}
            >
              Map-Nation
              <span
                className={`
                  absolute 
                  left-0 
                  right-0 
                  bottom-[-5px] 
                  h-1 
                  bg-gradient-to-r 
                  from-[#883364] 
                  to-red-700 
                  transform 
                  origin-left 
                  transition-all 
                  duration-700 
                  ease-in-out
                  ${isHovered ? "scale-x-100" : "scale-x-0"}
                `}
              />
            </h1>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <RxCross1 size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Items - Responsive */}
        <div
          className={`
          ${isMobileMenuOpen ? "flex" : "hidden"} 
          md:flex 
          flex-col 
          md:flex-row 
          w-full 
          md:justify-between 
          items-start 
          md:items-center 
          space-y-4 
          md:space-y-0
          relative
        `}
        >
          {/* Logo for Desktop */}
          <div className="hidden md:flex justify-between items-center">
            <div
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <h1
                className={`
                  uppercase 
                  font-semibold 
                  cursor-pointer 
                  text-4xl 
                  bg-gradient-to-r 
                  from-[#883364] 
                  to-white 
                  bg-clip-text 
                  text-transparent 
                  relative
                  z-10
                  transition-all 
                  duration-500 
                  transform 
                  ${
                    isHovered
                      ? "scale-105 rotate-1"
                      : "hover:scale-105 hover:rotate-1"
                  }
                `}
              >
                Map-Nation
                <span
                  className={`
                    absolute 
                    left-0 
                    right-0 
                    bottom-[-5px] 
                    h-1 
                    bg-gradient-to-r 
                    from-[#883364] 
                    to-red-700 
                    transform 
                    origin-left 
                    transition-all 
                    duration-700 
                    ease-in-out
                    ${isHovered ? "scale-x-100" : "scale-x-0"}
                  `}
                />
              </h1>

              <h1
                className={`
                  uppercase 
                  text-nowrap 
                  w-full 
                  text-center 
                  text-sm 
                  font-semibold 
                  cursor-pointer 
                  text-gray-600 
                  transition-all 
                  duration-500 
                  ${
                    isHovered
                      ? "opacity-100 translate-y-1 text-red-700"
                      : "opacity-70 hover:text-red-700"
                  }
                `}
              >
                One step to Map
              </h1>
            </div>
          </div>

          {/* Navigation Menu Items */}
          {detail.map((item, i) => (
            <div
              key={i}
              className="group"
              onMouseEnter={() => handleMouseEnter(item.title)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="flex items-center justify-between"
                onClick={() => item.cat && toggleMobileDropdown(item.title)}
              >
                <h1
                  className={`
                    uppercase 
                    font-semibold 
                    cursor-pointer 
                    ${"hover:text-yellow-600 transition-all duration-300"}
                    block
                    w-full
                    md:inline
                  `}
                >
                  {item.title}
                  {item.cat && <FaAngleDown className="inline ml-2" />}
                </h1>
              </div>

              {/* Images Horizontal Scrolling - Desktop */}
              {item.cat === "images" && activeDropdown === item.title && (
                <div
                  className="
                    hidden 
                    md:flex 
                    gap-4 
                    bg-gray-900 
                    p-4 
                    rounded-md 
                    absolute 
                    left-0 
                    top-full 
                    w-[80vw] 
                    overflow-x-scroll 
                    scrollbar-hide
                    z-50
                  "
                >
                  {item.detail.map((imgItem, index) => (
                    <div
                      key={index}
                      className="min-w-[150px] flex flex-col gap-2"
                    >
                      <Image
                        src={imgItem.img}
                        alt={imgItem.title}
                        width={300}
                        height={200}
                        className="w-96 h-40 object-cover rounded-md"
                        unoptimized
                      />
                      <h1 className="text-xl text-gray-300">{imgItem.title}</h1>
                      <div className="flex justify-between w-full">
                        <h1 className="text-[10px] bg-pink-600 rounded-xl uppercase p-1">
                          {imgItem.status}
                        </h1>
                        <h1 className="text-xs">{imgItem.date}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Mobile Dropdown for Images */}
              {item.cat === "images" && mobileOpenDropdown === item.title && (
                <div
                  className="
                    md:hidden 
                    flex 
                    flex-col 
                    gap-4 
                    bg-gray-900 
                    p-4 
                    rounded-md 
                    w-full
                    mt-2
                  "
                >
                  {item.detail.map((imgItem, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <Image
                        src={imgItem.img}
                        alt={imgItem.title}
                        width={300}
                        height={200}
                        className="w-full h-auto object-cover rounded-md"
                        unoptimized
                      />
                      <h1 className="text-xl text-gray-300">{imgItem.title}</h1>
                      <div className="flex justify-between w-full">
                        <h1 className="text-[10px] bg-pink-600 rounded-xl uppercase p-1">
                          {imgItem.status}
                        </h1>
                        <h1 className="text-xs">{imgItem.date}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Dropdown for Games - Desktop */}
              {item.cat === "dropdown" && activeDropdown === item.title && (
                <div
                  className="
                    hidden 
                    md:block 
                    bg-gray-900 
                    p-4 
                    rounded-md 
                    absolute 
                    top-full 
                    z-50
                    w-48
                  "
                >
                  {item.detail.map((dropItem, index) => (
                    <div
                      key={index}
                      className="flex capitalize flex-col py-1 hover:bg-gray-700 px-2 rounded"
                    >
                      <h1>{dropItem.title}</h1>
                    </div>
                  ))}
                </div>
              )}

              {/* Mobile Dropdown for Games */}
              {item.cat === "dropdown" && mobileOpenDropdown === item.title && (
                <div
                  className="
                    md:hidden 
                    bg-gray-900 
                    p-4 
                    rounded-md 
                    w-full
                    mt-2
                  "
                >
                  {item.detail.map((dropItem, index) => (
                    <div
                      key={index}
                      className="flex capitalize flex-col py-1 hover:bg-gray-700 px-2 rounded"
                    >
                      <h1>{dropItem.title}</h1>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <IoIosSearch size={20} color="yellow" className="hidden md:block" />
        </div>
      </div>
      <div className="bg-white w-[80%] h-[0.1px] opacity-25 mx-auto mt-4 hidden md:block" />
    </div>
  );
};

export default Nav;
