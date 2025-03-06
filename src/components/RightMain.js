import React from "react";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

const detail = [
  {
    title: "Popular Games",
    arr: [
      {
        id: "game-001",
        img: "/assets/six.jpg",
        title: "Such a Sharp Pain [V0.11.6R]",
        date: "March 3, 2025",
        type: "video"
      },
      {
        id: "game-002",
        img: "/assets/singleagain.jpg",
        title: "Single again [V1.11.6R]",
        date: "July 1, 2024",
        type: "image"
      },
    ],
  },
  {
    title: "Hot Games",
    arr: [
      {
        id: "game-003",
        img: "/assets/couple.jpg",
        title: "Fashion Business [Ep. 4 v10.00 Extra]",
        date: "January 17, 2025",
        type: "video"
      },
    ],
  },
];

const RightMain = () => {
  // Function to render media based on type
  const renderMedia = (game) => {
    if (game.type === "video") {
      return (
        <div className="relative">
          <img
            src={game.img}
            alt={game.title}
            className="rounded-md h-40 w-80 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center  bg-opacity-40">
            <FaPlay size={30} className="text-white" />
          </div>
          <div className="absolute bottom-0 left-0">
            <span className="inline-block py-1 px-2 text-xs font-bold text-white bg-red-600">
              {game.type.toUpperCase()}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative">
          <img
            src={game.img}
            alt={game.title}
            className="rounded-md h-40 w-80 object-cover"
          />
          <div className="absolute bottom-0 left-0">
            <span className="inline-block py-1 px-2 text-xs font-bold text-white bg-red-600">
              {game.type.toUpperCase()}
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col justify-start gap-6">
      {detail.map((item, i) => (
        <div key={i}>
          <h1 className="text-xl uppercase font-semibold text-red-700 mb-4">
            {item.title}
          </h1>
          {item.arr.map((game, index) => (
            <Link href={`/game/${game.id}`} key={index}>
              <div className="flex flex-col items-start gap-2 mb-4 cursor-pointer">
                {renderMedia(game)}
                <div>
                  <h1 className="text-sm font-semibold hover:text-red-500 transition-colors duration-300">{game.title}</h1>
                  <h1 className="text-xs text-gray-200">{game.date}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RightMain;