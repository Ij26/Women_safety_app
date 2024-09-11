import React from "react";
import ReactPlayer from "react-player";

function SelfDefence() {
  const videos = [
    "https://www.youtube.com/watch?v=7JidWSyLX-c",
    "https://www.youtube.com/watch?v=WLIE1GKfluk",
    "https://www.youtube.com/watch?v=yyV1OuJyT4I",
    "https://www.youtube.com/watch?v=fr2dahob6g0",
    "https://www.youtube.com/watch?v=M4_8PoRQP8w",
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-200">
      <div className="bg-white rounded-tl-3xl rounded-br-3xl shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Self Defence Videos</h2>
        <div className="space-y-6">
          {videos.map((videoUrl, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-4 transition transform hover:scale-105"
            >
              <ReactPlayer url={videoUrl} width="100%" controls={true} className="rounded-lg" />
            </div>
          ))}
        </div>
        <button
          onClick={() => window.history.back()}
          className="mt-6 bg-blue-500 text-white text-lg py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition"
        >
          BACK
        </button>
      </div>
    </div>
  );
}

export default SelfDefence;
