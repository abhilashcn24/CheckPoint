import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Gradient from "../assets/CheckPoint/ResultPage.png";
import EiffelImage from "../assets/CheckPoint/image.png"; // Eiffel Tower image

const originalityData = [
  { name: "Original", value: 26 },
  { name: "Doctored", value: 74 }
];

const confidenceData = [
  { name: "Not Original", value: 74 },
  { name: "Original", value: 26 }
];

const viralityData = [
  { x: 0, y: 2 },
  { x: 1, y: 3.5 },
  { x: 2, y: 2.8 },
  { x: 3, y: 4 },
  { x: 4, y: 3.2 },
  { x: 5, y: 3.8 },
  { x: 6, y: 3 },
  { x: 7, y: 2.5 },
  { x: 8, y: 1.8 }
];

const ORIGINALITY_COLORS = ["#FFE4B5", "#4A4A4A"];
const CONFIDENCE_COLORS = ["#FFE4B5", "#C84B31"];

const loadingData = [
  { name: "Authentic", value: 70 },
  { name: "Manipulated", value: 30 }
];

const LOADING_COLORS = ["#f97316", "#1E1E1E"];

export default function Results() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const fadeInUp = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1 } } };
  const fadeInDown = { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1 } } };
  const fadeInLeft = { hidden: { x: -50, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 1 } } };
  const fadeInRight = { hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 1 } } };
  const rotateInfinite = { rotate: [0, 360], transition: { repeat: Infinity, duration: 2, ease: "linear" } };

  if (loading) {
    return (
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center">
        <motion.h1
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Detected Image: Verified
        </motion.h1>
        <motion.div animate={rotateInfinite}>
          <PieChart width={300} height={300}>
            <Pie data={loadingData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
              {loadingData.map((_, i) => <Cell key={i} fill={LOADING_COLORS[i]} />)}
            </Pie>
          </PieChart>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{
          backgroundImage: `url(${Gradient})`,
          backgroundSize: "cover"
        }}
      />

      {/* Home Button (ProductionPage style) */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-30 text-white text-xl bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition shadow-lg"
      >
        <Home />
      </button>

      {/* Main Content */}
      <div className="relative z-10 px-8 py-12 flex-1">
        {/* Header */}
        <motion.div variants={fadeInDown} initial="hidden" animate="visible" className="max-w-6xl mx-auto mb-8">
          <div className="border-2 border-orange-500/50 rounded-2xl p-6 text-center bg-gradient-to-r from-black/60 to-orange-900/30 backdrop-blur-sm shadow-2xl shadow-orange-500/20">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Doctored Image Detected</h1>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Originality Chart */}
          <motion.div variants={fadeInLeft} initial="hidden" animate="visible" className="border-2 border-orange-500/40 rounded-2xl p-6 bg-gradient-to-br from-black/70 to-orange-950/30 backdrop-blur-md shadow-xl shadow-orange-500/10 transform transition-transform hover:scale-105 hover:shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-center text-orange-200">Originality Chart</h2>
            <div className="flex justify-center">
              <PieChart width={220} height={220}>
                <Pie
                  data={originalityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="rgba(255, 87, 34, 0.5)"
                  strokeWidth={2}
                >
                  {originalityData.map((_, i) => <Cell key={i} fill={ORIGINALITY_COLORS[i]} />)}
                </Pie>
              </PieChart>
            </div>
            <div className="mt-4 flex justify-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: ORIGINALITY_COLORS[0]}}></div>
                <span>Original</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: ORIGINALITY_COLORS[1]}}></div>
                <span>Doctored</span>
              </div>
            </div>
          </motion.div>

          {/* Virality Chart */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="border-2 border-orange-500/40 rounded-2xl p-6 bg-gradient-to-br from-orange-900/50 to-yellow-700/30 backdrop-blur-md shadow-xl shadow-orange-500/20 transform transition-transform hover:scale-105 hover:shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-center text-orange-100">Virality Chart</h2>
            <LineChart width={240} height={180} data={viralityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
              <XAxis dataKey="x" stroke="#FFE4B5" tick={{fill: '#FFE4B5'}} axisLine={{stroke: '#FFE4B5'}} />
              <YAxis stroke="#FFE4B5" tick={{fill: '#FFE4B5'}} axisLine={{stroke: '#FFE4B5'}} />
              <Line type="monotone" dataKey="y" stroke="#FFD700" strokeWidth={3} dot={{ fill: '#FF6347', r: 5, strokeWidth: 2, stroke: '#FFD700' }} activeDot={{ r: 7, fill: '#FF4500' }} />
            </LineChart>
          </motion.div>

          {/* Confidence Score */}
          <motion.div variants={fadeInRight} initial="hidden" animate="visible" className="border-2 border-orange-500/40 rounded-2xl p-6 bg-gradient-to-br from-orange-950/60 to-red-950/40 backdrop-blur-md shadow-xl shadow-red-500/20 transform transition-transform hover:scale-105 hover:shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-center text-orange-200">Confidence Score</h2>
            <div className="flex justify-center items-center relative">
              <PieChart width={220} height={220}>
                <Pie
                  data={confidenceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={55}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="rgba(255, 87, 34, 0.5)"
                  strokeWidth={2}
                >
                  {confidenceData.map((_, i) => <Cell key={i} fill={CONFIDENCE_COLORS[i]} />)}
                </Pie>
              </PieChart>
              <div className="absolute text-5xl font-bold text-orange-300" style={{textShadow: '0 0 20px rgba(255, 87, 34, 0.8)'}}>74</div>
            </div>
            <div className="flex justify-end items-center gap-2 mt-4 text-sm">
              <div className="w-3 h-3 rounded-full" style={{backgroundColor: CONFIDENCE_COLORS[0]}}></div>
              <span className="text-orange-200">Not Original</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Related Content */}
          <div className="border-2 border-orange-500/40 rounded-2xl p-6 bg-gradient-to-br from-black/70 to-orange-950/20 backdrop-blur-md shadow-xl shadow-orange-500/10 transform transition-transform hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-orange-300">Related Content</h2>
            <p className="text-sm leading-relaxed mb-3">
              This image has been detected as <span className="font-bold text-red-600" style={{textShadow: '0 0 10px rgba(220, 38, 38, 0.8)'}}>doctored</span> and contains <span className="font-bold text-red-600" style={{textShadow: '0 0 10px rgba(220, 38, 38, 0.8)'}}>fake information</span>. 
              It's a <span className="font-bold text-red-600" style={{textShadow: '0 0 10px rgba(220, 38, 38, 0.8)'}}>manipulated piece of media</span> designed to deceive viewers and spread misinformation.
            </p>
            <p className="text-sm leading-relaxed text-gray-300">
              Always verify the source of an image and be wary of content that seems too sensational. Spreading such 
              content can have <span className="font-bold text-red-600" style={{textShadow: '0 0 10px rgba(220, 38, 38, 0.8)'}}>negative consequences</span>. <span className="font-bold text-red-600" style={{textShadow: '0 0 10px rgba(220, 38, 38, 0.8)'}}>Critical thinking and digital literacy are essential in our media landscape.</span>
            </p>
          </div>

          {/* News Article Preview */}
          <div className="border-2 border-red-600/60 rounded-2xl overflow-hidden bg-gradient-to-br from-black/70 to-red-950/30 backdrop-blur-md shadow-xl shadow-red-500/20 transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="bg-gradient-to-br from-orange-700/50 to-red-700/50 p-4 flex flex-col gap-2">
              <div className="bg-blue-600 text-xs font-bold px-2 py-1 rounded inline-block">
                METRO.CO.UK
              </div>
              <h3 className="text-xl font-bold">collapses</h3>
              <h2 className="text-2xl font-bold">unexpected earthquake</h2>
              <p className="text-xs">Dramatic Photos Emerge from Paris</p>
              
              {/* Responsive Image */}
              <div className="w-full aspect-[16/9] rounded overflow-hidden border-2 border-red-500/30">
                <img 
                  src={EiffelImage} 
                  alt="Eiffel Tower"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <p className="text-xs mt-2 text-gray-300">Source: Twitter/Chansaid (Altered)</p>
            </div>
            <div className="bg-gradient-to-r from-red-700 to-red-600 text-center py-2 text-xs font-bold shadow-inner" style={{textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}>
              Red highlights indicate manipulated or fabricated content
            </div>
          </div>
        </motion.div>

        {/* Social Media Icons */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="max-w-6xl mx-auto mt-8 flex justify-end gap-6 pr-6">
          <div className="w-10 h-10 border-2 border-orange-500/50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-orange-500/20 hover:border-orange-400 transition-all bg-black/40 backdrop-blur-sm">
            <span className="text-xl">📷</span>
          </div>
          <div className="w-10 h-10 border-2 border-orange-500/50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-orange-500/20 hover:border-orange-400 transition-all bg-black/40 backdrop-blur-sm">
            <span className="text-xl">in</span>
          </div>
          <div className="w-10 h-10 border-2 border-orange-500/50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-orange-500/20 hover:border-orange-400 transition-all bg-black/40 backdrop-blur-sm">
            <span className="text-xl">⊗</span>
          </div>
          <div className="w-10 h-10 border-2 border-orange-500/50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-orange-500/20 hover:border-orange-400 transition-all bg-black/40 backdrop-blur-sm">
            <span className="text-xl">𝕏</span>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer variants={fadeInUp} initial="hidden" animate="visible" className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-t-3xl shadow-md text-white py-6 px-8 mt-auto w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-1">CheckPoint</h3>
            <p className="text-sm opacity-80">
              Verifying truth in the digital world, providing transparency and reliability.
            </p>
          </div>
          <div className="text-center md:text-right text-xs opacity-70">
            &copy; 2025 CheckPoint. All rights reserved.
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
