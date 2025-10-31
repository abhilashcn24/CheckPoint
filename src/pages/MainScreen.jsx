import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainScreenBg from "../assets/CheckPoint/MainScreenBg.png";
import {
  FaPaperPlane,
  FaFileAlt,
  FaImage,
  FaVideo,
  FaVolumeUp,
  FaBars,
  FaTimes,
  FaKey,
  FaUser,
  FaFileUpload,
  FaPaste,
  FaLink,
} from "react-icons/fa";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

export default function MainScreen() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pastedContent, setPastedContent] = useState("");
  const [contentType, setContentType] = useState("text"); // 'text' or 'link'
  const [inputMode, setInputMode] = useState("upload"); // 'upload', 'text', or 'link'
  
  // Load login state from localStorage on component mount
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('checkpointLoggedIn');
    return saved === 'true';
  });
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const fileInputRef = useRef(null);

  // Save login state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('checkpointLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const alerts = [
    { title: "Breaking: Fake News Alert", time: "2m ago", icon: <FaFileAlt /> },
    { title: "Doctored Image Detected", time: "5m ago", icon: <FaImage /> },
    { title: "Misleading Video Content", time: "12m ago", icon: <FaVideo /> },
    { title: "False Health Claims", time: "18m ago", icon: <FaFileAlt /> },
    { title: "Manipulated Statistics", time: "25m ago", icon: <FaFileAlt /> },
    { title: "Breaking: Fake News Alert", time: "2m ago", icon: <FaFileAlt /> },
    { title: "Doctored Image Detected", time: "5m ago", icon: <FaImage /> },
    { title: "Misleading Video Content", time: "12m ago", icon: <FaVideo /> },
    { title: "False Health Claims", time: "18m ago", icon: <FaFileAlt /> },
    { title: "Manipulated Statistics", time: "25m ago", icon: <FaFileAlt /> },
    { title: "Breaking: Fake News Alert", time: "2m ago", icon: <FaFileAlt /> },
    { title: "Doctored Image Detected", time: "5m ago", icon: <FaImage /> },
    { title: "Misleading Video Content", time: "12m ago", icon: <FaVideo /> },
    { title: "False Health Claims", time: "18m ago", icon: <FaFileAlt /> },
    { title: "Manipulated Statistics", time: "25m ago", icon: <FaFileAlt /> },
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const triggerFileUpload = () => fileInputRef.current.click();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowLoginPrompt(false);
  };

  const handleAPIClick = () => {
    if (isLoggedIn) {
      navigate("/production");
    } else {
      setShowLoginPrompt(true);
    }
  };

  const handleLoginNowClick = () => {
    setShowLoginPrompt(false);
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handlePastedContentSubmit = () => {
    if (pastedContent.trim()) {
      navigate("/results", { 
        state: { 
          pastedContent: pastedContent,
          contentType: inputMode 
        } 
      });
    }
  };

  const handleSubmit = () => {
    if (inputMode === "upload" && selectedFile) {
      navigate("/results", { state: { file: selectedFile } });
    } else if ((inputMode === "text" || inputMode === "link") && pastedContent.trim()) {
      navigate("/results", { 
        state: { 
          pastedContent: pastedContent,
          contentType: inputMode 
        } 
      });
    }
  };

  const isValidContent = (inputMode === "upload" && selectedFile) || 
                        ((inputMode === "text" || inputMode === "link") && pastedContent.trim().length > 0);

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

      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center gap-10">
        {/* Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-6 left-6 z-30 text-black text-2xl bg-white/20 backdrop-blur-sm p-3 rounded-lg hover:bg-white/30 transition shadow-lg"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Left Menu */}
        <div
          className={`absolute top-6 left-16 w-64 bg-white/10 backdrop-blur-sm border border-white/20 shadow-md rounded-3xl z-30 transition-transform duration-300 ease-in-out max-h-[90vh] overflow-y-auto transform origin-top-left ${
            menuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <div className="p-6 pt-4 flex flex-col gap-4">
            <button
              onClick={handleAPIClick}
              className={`flex items-center gap-3 font-semibold px-4 py-3 rounded-3xl w-full shadow-md transition-all duration-200 ${
                isLoggedIn
                  ? "bg-orange-300 text-black hover:bg-orange-200 hover:scale-105"
                  : "bg-orange-200/60 text-black hover:bg-orange-300/70"
              }`}
            >
              <FaKey className="text-xl" />
              <span>API Production</span>
            </button>

            <button
              onClick={() => isLoggedIn ? handleLogout() : setShowLoginModal(true)}
              className={`flex items-center gap-3 font-semibold px-4 py-3 rounded-3xl w-full shadow-md transition-all duration-200 ${
                isLoggedIn
                  ? "bg-red-300 text-black hover:bg-red-200 hover:scale-105"
                  : "text-black bg-white/10 hover:bg-white/20 hover:scale-105"
              }`}
            >
              <FaUser className="text-xl" />
              <span>{isLoggedIn ? "Logout" : "Login"}</span>
            </button>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="flex flex-col items-center justify-center gap-8 px-4">
          {/* Unified Upload/Paste Card */}
          <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-lg p-12 text-center transition-all duration-300 flex flex-col items-center justify-center w-full max-w-2xl">
            {/* Mode Toggle Buttons */}
            <div className="flex justify-center gap-3 mb-8">
              <button
                onClick={() => {
                  setInputMode("upload");
                  setPastedContent("");
                }}
                className={`flex items-center gap-2 font-medium px-5 py-2.5 rounded-xl transition-all duration-200 ${
                  inputMode === "upload"
                    ? "bg-orange-300 text-black shadow-md scale-105"
                    : "bg-white/20 text-black hover:bg-white/30"
                }`}
              >
                <FaFileUpload className="text-lg" /> Upload File
              </button>
              <button
                onClick={() => {
                  setInputMode("text");
                  setSelectedFile(null);
                }}
                className={`flex items-center gap-2 font-medium px-5 py-2.5 rounded-xl transition-all duration-200 ${
                  inputMode === "text"
                    ? "bg-orange-300 text-black shadow-md scale-105"
                    : "bg-white/20 text-black hover:bg-white/30"
                }`}
              >
                <FaPaste className="text-lg" /> Paste Text
              </button>
              <button
                onClick={() => {
                  setInputMode("link");
                  setSelectedFile(null);
                }}
                className={`flex items-center gap-2 font-medium px-5 py-2.5 rounded-xl transition-all duration-200 ${
                  inputMode === "link"
                    ? "bg-orange-300 text-black shadow-md scale-105"
                    : "bg-white/20 text-black hover:bg-white/30"
                }`}
              >
                <FaLink className="text-lg" /> Paste Link
              </button>
            </div>

            {/* Conditional Content Based on Mode */}
            {inputMode === "upload" ? (
              <>
                {/* Top Upload Icon */}
                <div 
                  onClick={triggerFileUpload}
                  className="bg-white/20 backdrop-blur-lg rounded-full p-6 mb-6 shadow-inner hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  <FaFileUpload className="text-6xl text-black" />
                </div>

                <h1 className="text-3xl font-bold mb-3 text-black text-center">
                  Upload Content for Authentication
                </h1>
                <p className="text-black mb-6 text-sm leading-relaxed text-center">
                  Click to select your images, text, or video content to verify its authenticity.
                </p>

                {/* Content Type Icons */}
                <div className="flex justify-center gap-6 mb-6 text-sm text-black">
                  <div className="flex items-center gap-2 font-medium">
                    <FaFileAlt className="text-lg" /> Text
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <FaImage className="text-lg" /> Images
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <FaVideo className="text-lg" /> Videos
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <FaVolumeUp className="text-lg" /> Audio
                  </div>
                </div>

                {selectedFile && (
                  <p className="mb-6 text-sm text-green-700 font-medium">
                    ✓ Selected: {selectedFile.name}
                  </p>
                )}
              </>
            ) : (
              <>
                {/* Top Paste Icon */}
                <div className="bg-white/20 backdrop-blur-lg rounded-full p-6 mb-6 shadow-inner">
                  <FaPaste className="text-6xl text-black" />
                </div>

                <h1 className="text-3xl font-bold mb-3 text-black text-center">
                  {inputMode === "text" ? "Paste Text Content" : "Paste Link"}
                </h1>
                <p className="text-black mb-6 text-sm leading-relaxed text-center">
                  {inputMode === "text" 
                    ? "Paste your text content to verify its authenticity."
                    : "Paste a URL to verify the content's authenticity."}
                </p>

                {/* Input Area */}
                {inputMode === "text" ? (
                  <textarea
                    value={pastedContent}
                    onChange={(e) => setPastedContent(e.target.value)}
                    placeholder="Paste your text content here..."
                    className="bg-white/30 border border-white/20 rounded-xl px-4 py-3 w-full text-black placeholder-black/70 resize-none h-40 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                ) : (
                  <input
                    type="text"
                    value={pastedContent}
                    onChange={(e) => setPastedContent(e.target.value)}
                    placeholder="Paste URL here (e.g., https://example.com/article)"
                    className="bg-white/30 border border-white/20 rounded-xl px-4 py-3 w-full text-black placeholder-black/70 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                )}

                {pastedContent.trim() && (
                  <p className="mb-6 text-sm text-green-700 font-medium">
                    ✓ Ready to analyze {inputMode}
                  </p>
                )}
              </>
            )}

            {/* Unified Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isValidContent}
              className={`flex items-center justify-center bg-white/25 backdrop-blur-lg border border-white/30 text-black font-bold p-6 rounded-3xl shadow-lg text-3xl 
                transition-all duration-300
                ${
                  isValidContent
                    ? "hover:scale-110 hover:bg-white/40 hover:shadow-xl cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }`}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* Right Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-orange-300/80 backdrop-blur-sm rounded-l-xl px-3 py-8 cursor-pointer hover:bg-orange-200/80 transition shadow-lg text-black text-2xl font-bold"
        >
          {sidebarOpen ? <BsCaretRight /> : <BsCaretLeft />}
        </button>

        {/* Right Sidebar */}
        <div
          className={`absolute top-1/2 right-4 -translate-y-1/2 w-80 bg-white/10 backdrop-blur-sm border border-white/20 shadow-md rounded-3xl z-20 transition-transform duration-300 ease-in-out max-h-[90vh] ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 h-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-orange-200">
            <h2 className="text-white text-xl font-bold mb-6 mt-4 sticky top-0 py-2 z-10">
              Recent Alerts
            </h2>
            <div className="flex flex-col gap-4 pb-6">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  onClick={() => navigate("/results", { state: { alertTitle: alert.title } })}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 shadow-md hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer border border-white/20"
                >
                  <div className="flex items-start justify-between text-white">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-2">
                        {alert.title}
                      </h3>
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
            <p className="text-sm">Verifying truth in the digital world.</p>
          </div>
          <div className="text-center md:text-right text-xs opacity-70">
            &copy; 2025 CheckPoint. All rights reserved.
          </div>
        </div>
      </footer>

      {/* === LOGIN MODAL === */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10 w-[400px] text-center text-black"
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                {isSignUp ? "Sign Up" : "Login"}
              </h2>
              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-4 items-center"
              >
                {isSignUp && (
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    className="bg-white/30 border border-white/20 rounded-lg px-4 py-2 w-full text-black placeholder-black/70"
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="bg-white/30 border border-white/20 rounded-lg px-4 py-2 w-full text-black placeholder-black/70"
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="bg-white/30 border border-white/20 rounded-lg px-4 py-2 w-full text-black placeholder-black/70"
                />
                <button
                  type="submit"
                  className="bg-orange-400 hover:bg-orange-300 text-white font-semibold px-8 py-2 rounded-xl transition-all"
                >
                  {isSignUp ? "Create Account" : "Login"}
                </button>
              </form>
              <p
                className="mt-4 text-sm text-black cursor-pointer hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp
                  ? "Already have an account? Login"
                  : "New user? Sign Up"}
              </p>
              <button
                onClick={() => setShowLoginModal(false)}
                className="mt-6 text-xs text-black/70 hover:underline"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === LOGIN PROMPT POPUP === */}
      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-8 w-[350px] text-center text-black"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">Login Required</h2>
              <p className="text-sm mb-6">
                You need to be logged in to access API Production.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleLoginNowClick}
                  className="bg-orange-400 hover:bg-orange-300 text-white px-6 py-2 rounded-xl font-semibold"
                >
                  Login Now
                </button>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="bg-white/30 hover:bg-white/40 text-black px-6 py-2 rounded-xl font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}