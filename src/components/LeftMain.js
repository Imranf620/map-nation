"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
import Link from "next/link";

const paragraphs = [
  "Such a Sharp Pain [V0.11.6R] ",
  "College Daze [v0.517a]",
  "Milftoon Drama [v0.35]",
  "Rogue-Love Evolution 2 [v0.1]",
  "A Family Venture [v0.09 v2 Alpha]",
  "A House In The Rift [v0.7.17]",
  "Helping the Hotties [v1.0.4.10.5] [Completed]",
  "Photo Hunt [v0.18.1 Extra]",
  "A Wife And Mother [v0.220]",
  "MILFs of Sunville [S2 v9]",
];

export const gameData = [
  {
    title: "Latest Games",
    detail: [
      {
        id: "game-001",
        img: "/assets/header-35-1068x604.jpg",
        title: "My New Daughters Lover Reboot [v0.82]",
        date: "March 6, 2025",
        status: "ON-GOING",
        type: "image",
      },
      {
        id: "game-002",
        img: "/assets/header-37-1068x377.jpg",
        title: "My Femboy Roommate [v1.1 Final]",
        date: "March 6, 2025",
        status: "ON-GOING",
        type: "video",
        videoUrl: "https://example.com/video1.mp4",
      },
      {
        id: "game-003",
        img: "/assets/sakurai.jpg",
        title: "Sluttown USA: Hometown Corruption [v0.45]",
        date: "March 6, 2025",
        status: "GAMES",
        type: "image",
      },
      {
        id: "game-004",
        img: "/assets/header-19.jpg",
        title: "The Caretaker [S2 v0.36 Public]",
        date: "March 6, 2025",
        status: "ON-GOING",
        type: "image",
      },
      {
        id: "game-005",
        img: "/assets/header-327.jpg",
        title: "My Femboy Roommate [v1.1 Final]",
        date: "March 5, 2025",
        status: "RECOMMENDED",
        type: "video",
        videoUrl: "https://example.com/video2.mp4",
      },
    ],
  },
  {
    title: "Animation",
    detail: [
      {
        id: "anim-001",
        img: "/assets/smphony.jpg",
        title: "My New Daughters Lover Reboot [v0.82]",
        date: "March 6, 2025",
        status: "ON-GOING",
        type: "image",
      },
      {
        id: "anim-002",
        img: "/assets/snowstorm.jpg",
        title: "My Femboy Roommate [v1.1 Final]",
        date: "March 6, 2025",
        status: "ON-GOING",
        type: "video",
        videoUrl: "https://example.com/video3.mp4",
      },
      {
        id: "anim-003",
        img: "/assets/seduction.jpg",
        title: "Sluttown USA: Hometown Corruption [v0.45]",
        date: "March 6, 2025",
        status: "GAMES",
        type: "image",
      },
      {
        id: "anim-004",
        img: "/assets/three.jpg",
        title: "The Caretaker [S2 v0.36 Public]",
        date: "March 6, 2025",
        status: "ON-GOING",
        type: "video",
        videoUrl: "https://example.com/video4.mp4",
      },
      {
        id: "anim-005",
        img: "/assets/nyuex.jpg",
        title: "A Family Venture [v0.09 v2 Beta]",
        date: "March 5, 2025",
        status: "RECOMMENDED",
        type: "image",
      },
    ],
  },
];

const GamesWebsite = () => {
  const [index, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 229;

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % paragraphs.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + paragraphs.length) % paragraphs.length);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Function to render media based on type
  const renderMedia = (item) => {
    if (item.type === "video") {
      return (
        <div className="relative w-full h-[200px] group">
          <Image
            src={item.img}
            alt={item.title}
            width={400}
            height={200}
            className="w-full h-full object-cover rounded-t-md"
            unoptimized
          />
          <div className="absolute inset-0 flex items-center justify-center  bg-opacity-40  opacity-100 transition-opacity duration-300">
            <FaPlay size={30} className="text-white" />
          </div>
          <div className="absolute bottom-0 left-0">
            <span className="inline-block py-1 px-2 text-xs font-bold text-white bg-red-600">
              {item.status}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative w-full h-[200px]">
          <Image
            src={item.img}
            alt={item.title}
            width={400}
            height={200}
            className="w-full h-full object-cover rounded-t-md"
            unoptimized
          />
          <div className="absolute bottom-0 left-0">
            <span className="inline-block py-1 px-2 text-xs font-bold text-white bg-red-600">
              {item.status}
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-4">
      {/* Trending bar */}
      <div className="overflow-hidden pt-12 w-full flex flex-col sm:flex-row justify-between px-2 sm:px-4 items-center mb-6">
        <div className="flex items-center gap-2 mb-4 sm:mb-0 w-full sm:w-auto">
          <button className="bg-red-500 p-2 text-[12px] font-bold whitespace-nowrap">
            TRENDING NOW
          </button>
          <div className="relative w-full sm:w-[350px] overflow-hidden">
            <div
              key={index}
              className="transition-all duration-700 ease-in-out transform opacity-100 translate-x-0"
            >
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                {paragraphs[index]}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="flex border-2 border-white p-1 items-center gap-2 text-[12px] font-bold"
          >
            <FaChevronLeft size={10} />
          </button>
          <button
            onClick={nextSlide}
            className="flex border-2 border-white p-1 items-center gap-2 text-[12px] font-bold"
          >
            <FaChevronRight size={10} />
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="flex justify-center items-center pt-2 sm:pt-4 mb-6 sm:mb-8">
        <div className="w-full max-w-[300px] h-[100px]  flex items-center justify-center">
          <Image
            width={300}
            height={100}
            src="/assets/tantaly.gif"
            alt="Advertisement"
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Game Sections */}
      {gameData.map((section, sectionIdx) => (
        <div key={sectionIdx} className="mb-10">
          <h1 className="text-2xl font-bold mb-4 border-l-4 border-red-500 pl-3">
            {section.title}
          </h1>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {section.detail.map((item, index) => (
              <Link
                href={`/game/${item.id}`}
                key={index}
                className="flex flex-col w-[300px]  rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {renderMedia(item)}
                <div className="p-3">
                  <h2 className="text-sm font-medium hover:text-red-500 transition-colors duration-300 line-clamp-2 h-10 mb-1">
                    {item.title}
                  </h2>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pb-8 gap-4">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            className="w-10 h-10 flex items-center justify-center bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            className={`w-10 h-10 flex items-center justify-center ${
              currentPage === 1
                ? "bg-orange-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            }`}
            onClick={() => goToPage(1)}
          >
            1
          </button>
          <button
            className={`w-10 h-10 flex items-center justify-center ${
              currentPage === 2
                ? "bg-orange-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            }`}
            onClick={() => goToPage(2)}
          >
            2
          </button>
          <button
            className={`w-10 h-10 flex items-center justify-center ${
              currentPage === 3
                ? "bg-orange-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            }`}
            onClick={() => goToPage(3)}
          >
            3
          </button>
          <span className="w-10 h-10 flex items-center justify-center text-gray-400">
            ...
          </span>
          <button
            className={`w-10 h-10 flex items-center justify-center ${
              currentPage === 229
                ? "bg-orange-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            }`}
            onClick={() => goToPage(229)}
          >
            229
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight size={14} />
          </button>
        </div>
        <div className="text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default GamesWebsite;