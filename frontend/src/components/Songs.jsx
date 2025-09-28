import React, { useRef } from "react";

const MoodySongs = ({ Songs }) => {
  const audioRefs = useRef([]);

  const playAudio = (index) => {
    audioRefs.current[index]?.play();
  };

  const pauseAudio = (index) => {
    audioRefs.current[index]?.pause();
  };

  return (
    <div className="bg-gray-50 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">
        Recommended Songs
      </h2>
      <div className="space-y-6">
        {Songs.map((song, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{song.title}</h3>
              <p className="text-gray-500">{song.artist}</p>
            </div>

           
            <div className="flex items-center space-x-4">
              <audio
        ref={(el) => (audioRefs.current[index] = el)}
       src={song.audio}
       type="audio/mpeg"
         preload="none"
        className="hidden"
          />

              <button
                onClick={() => playAudio(index)}
                className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow"
              >
                <i className="ri-play-fill text-xl"></i>
              </button>
              <button
                onClick={() => pauseAudio(index)}
                className="p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors shadow"
              >
                <i className="ri-pause-fill text-xl"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodySongs;
