import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MainScreenBg from '../assets/CheckPoint/MainScreenBg.png';
import { 
  FaPaperPlane, FaFileAlt, FaImage, FaVideo, FaVolumeUp, 
  FaBars, FaTimes, FaKey, FaUser 
} from "react-icons/fa";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";

export default function MainScreen() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const alerts = [
    { title: "Breaking: Fake News Alert", time: "2m ago", icon: <FaFileAlt /> },
    { title: "Doctored Image Detected", time: "5m ago", icon: <FaImage /> },
    { title: "Misleading Video Content", time: "12m ago", icon: <FaVideo /> },
    { title: "False Health Claims", time: "18m ago", icon: <FaFileAlt /> },
    { title: "Manipulated Statistics", time: "25m ago", icon: <FaFileAlt /> },
    { title: "AI Generated Content Found", time: "30m ago", icon: <FaFileAlt /> },
    { title: "Deepfake Video Detected", time: "35m ago", icon: <FaVideo /> },
    { title: "Modified Audio Content", time: "42m ago", icon: <FaVolumeUp /> },
    { title: "Suspicious Account Activity", time: "48m ago", icon: <FaFileAlt /> },
    { title: "Misinformation Campaign Alert", time: "55m ago", icon: <FaFileAlt /> },
    { title: "Coordinated Inauthentic Behavior", time: "1h ago", icon: <FaFileAlt /> },
    { title: "False Attribution Detected", time: "1h 15m ago", icon: <FaFileAlt /> }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const triggerFileUpload = () => fileInputRef.current.click();
  const handleUploadClick = () => navigate("/results");

  return (
    <div className="relative min-h-screen flex flex-col font-piazzolla">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${MainScreenBg})` }}
      />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        className="hidden"
        accept="image/*,video/*,audio/*,.pdf,.txt,.doc,.docx"
      />

      {/* Content */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center gap-10">

        {/* Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-6 left-6 z-30 text-black text-2xl bg-white/20 backdrop-blur-sm p-3 rounded-lg hover:bg-white/30 transition shadow-lg"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Left Menu */}
<div className={`absolute top-6 left-16 w-64 bg-white/10 backdrop-blur-sm border border-white/20 shadow-md rounded-3xl z-30 transition-transform duration-300 ease-in-out max-h-[90vh] overflow-y-auto transform origin-top-left ${menuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
  <div className="p-6 pt-4 flex flex-col gap-4">
    
    {/* API Production Button */}
    <button
      onClick={() => navigate("/production")}
      className="flex items-center gap-3 text-black font-semibold px-4 py-3 bg-orange-300 rounded-3xl hover:bg-orange-200 hover:scale-105 transition-all duration-200 w-full shadow-md"
    >
      <FaKey className="text-xl" />
      <span>API Production</span>
    </button>

    {/* Login Button */}
    <button className="flex items-center gap-3 text-black font-semibold px-4 py-3 bg-white/10 rounded-3xl hover:bg-white/20 hover:scale-105 transition-all duration-200 w-full shadow-md">
      <FaUser className="text-xl" />
      <span>Login</span>
    </button>
  </div>
</div>


        {/* Upload Card */}
        <div
          onClick={triggerFileUpload}
          className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-lg p-12 text-center cursor-pointer hover:scale-105 hover:bg-white/30 transition-all duration-300 flex flex-col items-center justify-center"
        >
          {/* Upload Icon */}
          <div className="bg-white/20 backdrop-blur-lg rounded-full p-6 mb-6 shadow-inner hover:scale-110 transition-all duration-300">
            <FaPaperPlane className="text-6xl text-orange-400" />
          </div>

          <h1 className="text-3xl font-bold mb-3 text-black text-center">Upload Content for Authentication</h1>
          <p className="text-black mb-8 text-sm leading-relaxed text-center">
            Drop your images, text, or video content here to verify its authenticity and detect potential misinformation.
          </p>

          {/* Content Type Options */}
          <div className="flex justify-center gap-6 mb-6 text-sm pointer-events-none text-black">
            <div className="flex items-center gap-2 font-medium"><FaFileAlt className="text-lg" /> Text</div>
            <div className="flex items-center gap-2 font-medium"><FaImage className="text-lg" /> Images</div>
            <div className="flex items-center gap-2 font-medium"><FaVideo className="text-lg" /> Videos</div>
            <div className="flex items-center gap-2 font-medium"><FaVolumeUp className="text-lg" /> Audio</div>
          </div>

          {/* Upload Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (selectedFile) handleUploadClick();
            }}
            disabled={!selectedFile}
            className={`flex items-center justify-center bg-white/25 backdrop-blur-lg border border-white/30 text-black font-bold p-6 rounded-3xl shadow-lg text-3xl 
              transition-all duration-300
              ${selectedFile ? 'hover:scale-110 hover:bg-white/40 hover:shadow-xl cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
          >
            <FaPaperPlane />
          </button>

          {selectedFile && (
            <p className="mt-4 text-sm text-green-700 font-medium">
              ✓ Selected: {selectedFile.name}
            </p>
          )}
        </div>

        {/* Right Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-orange-300/80 backdrop-blur-sm rounded-l-xl px-3 py-8 cursor-pointer hover:bg-orange-200/80 transition shadow-lg text-black text-2xl font-bold"
        >
          {sidebarOpen ? <BsCaretRight /> : <BsCaretLeft />}
        </button>

        {/* Right Sidebar with Alerts */}
        <div className={`absolute top-1/2 right-4 -translate-y-1/2 w-80 bg-white/10 backdrop-blur-sm border border-white/20 shadow-md rounded-3xl z-20 transition-transform duration-300 ease-in-out max-h-[90vh] overflow-y-auto ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-orange-200">
            <h2 className="text-white text-xl font-bold mb-6 mt-4 sticky top-0 py-2 z-10">Recent Alerts</h2>
            <div className="flex flex-col gap-4 pb-6">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 shadow-md hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer border border-white/20"
                >
                  <div className="flex items-start justify-between text-white">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-2">{alert.title}</h3>
                      <p className="text-xs opacity-75">{alert.time}</p>
                    </div>
                    <div className="text-3xl ml-3">{alert.icon}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-md text-black py-6 px-8 mt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-1">CheckPoint</h3>
            <p className="text-sm">Verifying truth in the digital world, providing transparency and reliability.</p>
          </div>
          <div className="text-center md:text-right text-xs opacity-70">
            &copy; 2025 CheckPoint. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
