"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { gameData } from "./LeftMain";
import { useParams } from "next/navigation";

export default function SingleGame() {
  const { id } = useParams();

  const [detail, setDetail] = useState({});
  console.log(id);

  useEffect(() => {
    const newData = gameData
      .flatMap((data) => data.detail) // Flatten all `detail` arrays into one array
      .find((det) => det.id === id); // Find the object with the matching `id`

    setDetail(newData);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Head>
        <title>A Family Venture Download</title>
        <meta name="description" content="Download A Family Venture game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 max-w-6xl">
        {/* Main game image and controls */}
        <div className="relative mt-4">
          <div className="w-full">
            {detail.img && (
              <Image
                src={detail.img}
                alt="A Family Venture Game Screenshot"
                width={800}
                height={400}
                className="w-full"
                unoptimized
              />
            )}
          </div>
          <div className="absolute bottom-0 flex space-x-2 p-2 bg-black bg-opacity-50">
            <button className="p-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 5v10l7-5-7-5z"></path>
              </svg>
            </button>
            <button className="p-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
            </button>
            <button className="p-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {/* More control buttons */}
          </div>
        </div>

        {/* Date and categories */}
        <div className="flex flex-col mt-4">
          <div className="flex items-center text-xs text-gray-400">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              ></path>
            </svg>
            March 5, 2025
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 bg-gray-800 text-white">
              GAMES
            </span>
            <span className="text-xs px-2 py-1 bg-gray-800 text-white">
              ANIMATION
            </span>
            <span className="text-xs px-2 py-1 bg-gray-800 text-white">
              MATCH
            </span>
            <span className="text-xs px-2 py-1 bg-gray-800 text-white">
              ON-GOING
            </span>
            <span className="text-xs px-2 py-1 bg-gray-800 text-white">
              RECOMMENDED
            </span>
            <span className="text-xs px-2 py-1 bg-gray-800 text-white">
              ADULT
            </span>
            <span className="text-xs px-2 py-1 bg-gray-800 text-white">
              WINDOWS
            </span>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="my-6 bg-green-500 p-4 text-center">
          <div className="text-black font-bold text-lg">BC.GAME</div>
          <div className="text-black font-bold text-xl mb-2">CRYPTO BOOST</div>
          <button className="bg-green-700 text-white px-4 py-1 text-sm">
            PLAY NOW
          </button>
        </div>

        {/* Download Button */}
        <div className="text-center my-6">
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded">
            Download Now
          </button>
        </div>

        {/* Ratings */}
        <div className="flex justify-center my-2">
          <div className="flex text-yellow-400">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <span className="text-sm text-gray-400 ml-2">(4,291)</span>
        </div>

        {/* Game Title and Description */}
        <h1 className="text-2xl font-bold mt-6">
          {detail?.title} Free Download Latest Version
        </h1>

        <p className="text-sm text-gray-300 mt-2">
          A Family Venture Download Walkthrough Free PC game. This Adult Sex RPG
          PC Game tells the story of a father who owes a huge amount of money to
          the Mafia, but when he ends up in prison...
        </p>

        {/* Game Info Table */}
        <div className="mt-4 text-sm">
          <div className="flex border-b border-gray-800 py-1">
            <div className="w-28 text-gray-400">Developer:</div>
            <div>With Your Subscribtion</div>
          </div>
          <div className="flex border-b border-gray-800 py-1">
            <div className="w-28 text-gray-400">Created by:</div>
            <div>Sigmund</div>
          </div>
          <div className="flex border-b border-gray-800 py-1">
            <div className="w-28 text-gray-400">Version:</div>
            <div>0.2 Beta</div>
          </div>
          <div className="flex border-b border-gray-800 py-1">
            <div className="w-28 text-gray-400">OS:</div>
            <div>Windows, Mac, Linux, Android</div>
          </div>
          <div className="flex border-b border-gray-800 py-1">
            <div className="w-28 text-gray-400">Language:</div>
            <div>English, Spanish</div>
          </div>
          <div className="flex border-b border-gray-800 py-1">
            <div className="w-28 text-gray-400">Genre:</div>
            <div>
              3DCG, Incest, Male Protagonist, Dad sex, Masturbation, Voyeurism,
              Corruption, Groping, Male domination, MILF, NTR(Avoidable), Sleep
              sex, Stripping, Vaginal sex, Virgin, Futa and Dick, Trainer
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mt-8 border-b border-gray-800">
          <button className="px-4 py-2 text-yellow-400 border-b-2 border-yellow-400">
            DESCRIPTION
          </button>
          <button className="px-4 py-2 text-gray-400">SCREENSHOTS</button>
          <button className="px-4 py-2 text-gray-400">CHANGELOG</button>
          <button className="px-4 py-2 text-gray-400">INSTALLATION</button>
          <button className="px-4 py-2 text-gray-400">DOWNLOAD</button>
        </div>

        {/* Overview */}
        <div className="mt-8">
          <h2 className="text-xl text-center mb-4">Overview</h2>
          <p className="text-sm text-gray-300">
            Tom owes a huge amount of money to the Mafia, but when he ends up in
            prison, the responsibility of the debt falls to his wife Ann. He
            finds Help Ross rescuing his relationship with his brother and two
            sisters. After losing the house game, there is nothing stopping the
            development of this strange complex. Niki Mark's tom needs to
            provide some solid evidence, because if they don&apos;t resolve
            their money, they will not take what they are used to take away...
          </p>

          {/* Rating Section */}
          <div className="mt-8 text-center">
            <div className="text-gray-400 text-sm">RATE THIS</div>
            <div className="flex justify-center text-yellow-400 my-2">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <div className="text-sm text-gray-400">
              Rating: 4.5 / 5 (User: 35)
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center my-6">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded">
              Download Now
            </button>
          </div>

          {/* Tags */}
          <div className="mt-4">
            <div className="text-sm text-gray-400 mb-2">TAGS:</div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                3DCG
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                Corruption
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                Groping
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                Incest
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                Male protagonist
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                Male protagonist
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                Masturbation
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                MILF
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                NTR
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                Futa and dick
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                Sleep sex
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                Stripping
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                Trainer
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                Vaginal
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                Virgin
              </span>
              <span className="text-xs px-2 py-1 bg-red-800 text-white">
                Voyeurism
              </span>
            </div>
          </div>
        </div>

        {/* Other Games */}
        <div className="mt-12">
          <div className="grid grid-cols-3 gap-4">
            {gameData.length > 0 &&
              gameData
                .flatMap((det) => det.detail)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3) // Get only 3 random items
                .map((item, i) => (
                  <div key={i}>
                    {" "}
                    {/* Single parent div for each grid item */}
                    <div className="relative">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={300}
                        height={200}
                        className="w-96 h-40"
                        unoptimized
                      />
                      <div className="absolute bottom-0 left-0 bg-red-600 text-white text-xs px-2 py-1">
                        RECOMMENDED
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm mt-1">{item.title}</h3>
                      <div className="text-xs text-gray-400">{item.date}</div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Comments */}
        <div className="mt-12">
          <h3 className="text-lg">5 Comments</h3>

          <div className="mt-4">
            {[1, 2, 3, 4, 5].map((comment) => (
              <div key={comment} className="border-b border-gray-800 py-4">
                <div className="flex">
                  <div className="w-10 h-10 bg-purple-600 flex items-center justify-center rounded">
                    <span className="text-white">MC</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm">
                      Anonymous • February 28, 2025 at 10:24 pm
                    </div>
                    <div className="mt-2 text-sm">
                      {comment === 1 && "Mega link for Mac is broken."}
                      {comment === 2 && "Good new update."}
                      {comment === 3 &&
                        "Hello, bad game with poor renders and sandbox good from last, dont bullshit."}
                      {comment === 4 &&
                        "Do you have saved game file that is caught up to best update or near it??"}
                      {comment === 5 &&
                        "How do I change game resolution since I have a small screen?"}
                    </div>
                    <div className="mt-1">
                      <button className="text-gray-400 text-sm">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave a reply */}
        <div className="mt-8">
          <h3 className="text-lg mb-4">Leave a reply</h3>
          <textarea
            className="w-full bg-gray-900 border border-gray-700 p-4 text-white"
            rows={5}
            placeholder="Your comment
            (max. 2000 characters)"
          />
          <textarea
            className="w-full bg-gray-900 border border-gray-700 p-4 text-white"
            rows={5}
            placeholder="Write your comment here..."
          ></textarea>

          <input
            type="text"
            className="w-full bg-gray-900 border border-gray-700 p-2 mt-4 text-white"
            placeholder="Name"
          />

          <div className="mt-4 flex items-center">
            <input type="checkbox" id="save-info" className="mr-2" />
            <label htmlFor="save-info" className="text-sm text-gray-400">
              Save my name, email, and website in this browser for the next time
              I comment.
            </label>
          </div>

          <button className="mt-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 text-sm">
            Post comment
          </button>
        </div>
      </main>
    </div>
  );
}
