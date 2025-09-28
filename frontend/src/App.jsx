import React, { useState } from 'react';
import MoodySongs from './components/Songs';
import FacialExpression from './components/FacialExpression';
import './index.css';

const App = () => {
  const [Songs, setSongs] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          Moody Music Player
        </h1>
        
        {/* Facial expression detector section */}
        <FacialExpression setSongs={setSongs} />

        {/* Songs list section */}
        <MoodySongs Songs={Songs} />
      </div>
    </div>
  );
};

export default App;
