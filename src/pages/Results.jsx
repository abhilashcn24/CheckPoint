import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Gradient from "../assets/CheckPoint/ResultPage.png";
import EiffelImage from "../assets/CheckPoint/image.png";

// Import social media icons
import LinkedinIcon from "../assets/CheckPoint/Social Media Icons & Logos (Community)/LinkedIn.png";
import FBIcon from "../assets/CheckPoint/Social Media Icons & Logos (Community)/FB.png";
import WhatsappIcon from "../assets/CheckPoint/Social Media Icons & Logos (Community)/Whatsapp.png";
import XIcon from "../assets/CheckPoint/Social Media Icons & Logos (Community)/X.png";
import TelegramIcon from "../assets/CheckPoint/Social Media Icons & Logos (Community)/Telegram.png";



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

// const loadingData = [
//   { name: "Authentic", value: 70 },
//   { name: "Manipulated", value: 30 }
// ];

// const LOADING_COLORS = ["#f97316", "#1E1E1E"];

// Social media icons array
const allSocialMediaIcons = [
  { icon: LinkedinIcon, name: "LinkedIn" },
  { icon: FBIcon, name: "Facebook" },
  { icon: WhatsappIcon, name: "WhatsApp" },
  { icon: XIcon, name: "X" },
  { icon: TelegramIcon, name: "Telegram" }
];

// Function to get loading message based on content type
const getLoadingMessage = (contentType) => {
  const messages = {
    text: "Analyzing Text Content...",
    image: "Detecting Image Authenticity...",
    video: "Verifying Video Content...",
    audio: "Analyzing Audio File...",
    pdf: "Scanning PDF Document...",
    doc: "Processing Document...",
    default: "Analyzing Content..."
  };
  return messages[contentType] || messages.default;
};

// Function to determine content type from file or alert
const determineContentType = (file, alertTitle) => {
  if (file) {
    const fileName = file.name.toLowerCase();
    if (fileName.match(/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/)) return 'image';
    if (fileName.match(/\.(mp4|avi|mov|wmv|flv|webm|mkv)$/)) return 'video';
    if (fileName.match(/\.(mp3|wav|ogg|m4a|flac|aac)$/)) return 'audio';
    if (fileName.match(/\.pdf$/)) return 'pdf';
    if (fileName.match(/\.(doc|docx|txt|rtf)$/)) return 'doc';
    if (fileName.match(/\.(txt|md|csv)$/)) return 'text';
  }
  
  // Fallback to alert title
  if (alertTitle) {
    if (alertTitle.toLowerCase().includes('image')) return 'image';
    if (alertTitle.toLowerCase().includes('video')) return 'video';
    if (alertTitle.toLowerCase().includes('audio')) return 'audio';
    if (alertTitle.toLowerCase().includes('text') || alertTitle.toLowerCase().includes('news')) return 'text';
    if (alertTitle.toLowerCase().includes('document')) return 'doc';
  }
  
  return 'default';
};

export default function Results() {
  // const [loading, setLoading] = useState(true);
  const [selectedIcons, setSelectedIcons] = useState([]);
  // const [loadingMessage, setLoadingMessage] = useState("Analyzing Content...");
  const navigate = useNavigate();
  const location = useLocation();
  const [contentType, setContentType] = useState("default");
  const [alertTitle, setAlertTitle] = useState("");

  const analysisResult = location.state?.analysisResult || {
  "verdict": "AI GENERATED",
  "confidence_score": 92,
  "reasons": [
    "The writing style exhibits consistent sentence structure and formal tone typical of large language models.",
    "Repetitive phrasing and lack of personal anecdotes suggest non-human authorship.",
    "Metadata analysis shows generation patterns aligning with AI-generated content (e.g., low lexical diversity)."
  ],
  "what_would_change": "Confidence would decrease if evidence showed the text was sourced from multiple unique human authors or included verifiable firsthand experiences.",
  "lineage_graph": {
    "claim": "This article was likely written by an AI system.",
    "connections": [
      {
        "source": "AI Text Classifier",
        "url": "https://example.com/ai-detector-report",
        "title": "AI Text Detector Report: 92% Probability",
        "image": "https://example.com/images/ai-detector.png",
        "link_type": "Supports"
      },
      {
        "source": "Stylometric Analysis",
        "url": "https://example.com/stylometry-study",
        "title": "Stylometric Similarity to GPT Model Outputs",
        "image": "https://example.com/images/style-analysis.png",
        "link_type": "Supports"
      },
      {
        "source": "Human Reviewer",
        "url": "https://example.com/human-review",
        "title": "Human Reviewer Assessment",
        "image": "https://example.com/images/review.png",
        "link_type": "Contradict"
      }
    ]
  },
  "confidence_score_calculation": "Confidence score (92/100) derived from ensemble results of AI detectors (weighted 60%), linguistic feature analysis (25%), and human review comparison (15%)."
}
  
  const type = location.state?.type || "Analyzing Content..."

  const originalityData = [
  { name: "Original", value: parseInt(analysisResult.confidence_score) },
  { name: "Doctored", value: 100 - parseInt(analysisResult.confidence_score) }
];

const confidenceData = [
  { name: "Not Original", value: 100 - parseInt(analysisResult.confidence_score) },
  { name: "Original", value: parseInt(analysisResult.confidence_score) }
];


  useEffect(() => {
  const file = location.state?.file;
  const alertTitle = location.state?.alertTitle;
  const pastedContent = location.state?.pastedContent;
  const manualType = location.state?.contentType;

  setAlertTitle(alertTitle || "Analysis Result");

  const type = manualType || determineContentType(file, alertTitle);
  setContentType(type);

  console.log("📂 Received file:", file);
  console.log("📰 Alert title:", alertTitle);
  console.log("📊 Detected content type:", type);
}, [location]);



  useEffect(() => {
    // Randomly select 4 icons from the available icons
    const shuffled = [...allSocialMediaIcons].sort(() => 0.5 - Math.random());
    setSelectedIcons(shuffled.slice(0, 4));
  }, []);

  // Animation variants
  const fadeInUp = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1 } } };
  const fadeInDown = { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1 } } };
  const fadeInLeft = { hidden: { x: -50, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 1 } } };
  const fadeInRight = { hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 1 } } };
  const rotateInfinite = { rotate: [0, 360], transition: { repeat: Infinity, duration: 2, ease: "linear" } };

  // console.log(analysisResult);
  

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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">{alertTitle}</h1>
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
                  endAngle={-360 - 100 - parseInt(analysisResult.confidence_score)}
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

          {/* Virality Chart
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="border-2 border-orange-500/40 rounded-2xl p-6 bg-gradient-to-br from-orange-900/50 to-yellow-700/30 backdrop-blur-md shadow-xl shadow-orange-500/20 transform transition-transform hover:scale-105 hover:shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-center text-orange-100">Virality Chart</h2>
            <LineChart width={240} height={180} data={viralityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
              <XAxis dataKey="x" stroke="#FFE4B5" tick={{fill: '#FFE4B5'}} axisLine={{stroke: '#FFE4B5'}} />
              <YAxis stroke="#FFE4B5" tick={{fill: '#FFE4B5'}} axisLine={{stroke: '#FFE4B5'}} />
              <Line type="monotone" dataKey="y" stroke="#FFD700" strokeWidth={3} dot={{ fill: '#FF6347', r: 5, strokeWidth: 2, stroke: '#FFD700' }} activeDot={{ r: 7, fill: '#FF4500' }} />
            </LineChart>
          </motion.div> */}

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
              <div className="absolute text-5xl font-bold text-orange-300" style={{textShadow: '0 0 20px rgba(255, 87, 34, 0.8)'}}>{analysisResult.confidence_score}</div>
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

  <p className="text-sm leading-relaxed text-gray-300">
    This is <span className="font-bold text-red-600" style={{ textShadow: '0 0 10px rgba(220, 38, 38, 0.8)' }}>
      {analysisResult.verdict}
    </span> content.
  </p>

  {analysisResult.reasons?.length > 0 && (
    <ul className="list-disc list-inside mt-4 space-y-1 text-gray-300">
      {analysisResult.reasons.map((reason, index) => (
        <li key={index}>{reason}</li>
      ))}

      <h1>
        Reasons:
      </h1>
      <p>
        {analysisResult.confidence_score_calculation}
      </p>
    </ul>
  )}
</div>

          {/* News Article Preview
          <div className="border-2 border-red-600/60 rounded-2xl overflow-hidden bg-gradient-to-br from-black/70 to-red-950/30 backdrop-blur-md shadow-xl shadow-red-500/20 transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="bg-gradient-to-br from-orange-700/50 to-red-700/50 p-4 flex flex-col gap-2">
              <div className="bg-blue-600 text-xs font-bold px-2 py-1 rounded inline-block">
                METRO.CO.UK
              </div>
              <h3 className="text-xl font-bold">collapses</h3>
              <h2 className="text-2xl font-bold">unexpected earthquake</h2>
              <p className="text-xs">Dramatic Photos Emerge from Paris</p>
               */}
              {/* Responsive Image */}
              {/* <div className="w-full aspect-[16/9] rounded overflow-hidden border-2 border-red-500/30">
                <img 
                  src={EiffelImage} 
                  alt="Eiffel Tower"
                  className="w-full h-full object-contain"
                />
              </div>
              
              <p className="text-xs mt-2 text-gray-300">Source: Twitter/Chansaid (Altered)</p>
            </div>
            <div className="bg-gradient-to-r from-red-700 to-red-600 text-center py-2 text-xs font-bold shadow-inner" style={{textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}>
              Red highlights indicate manipulated or fabricated content
            </div>
          </div> */}

          <div className="border-2 border-red-600/60 rounded-2xl overflow-hidden bg-gradient-to-br from-black/70 to-red-950/30 backdrop-blur-md shadow-xl shadow-red-500/20 transform transition-transform hover:scale-105 hover:shadow-2xl max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-600/40 scrollbar-track-transparent">
  <div className="p-4 flex flex-col gap-4">
    {analysisResult.lineage_graph.connections && analysisResult.lineage_graph.connections.length > 0 ? (
      analysisResult.lineage_graph.connections.map((conn, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-orange-700/50 to-red-700/50 p-4 rounded-xl flex flex-col gap-2 border border-red-500/30"
        >
          {/* Source Tag */}
          <div className="bg-blue-600 text-xs font-bold px-2 py-1 rounded inline-block w-fit">
            {conn.source || "Unknown Source"}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white">
            {conn.title || "Untitled Report"}
          </h3>

          {/* Image */}
          {conn.image && (
            <div className="w-full aspect-[16/9] rounded overflow-hidden border border-red-500/30">
              <img
                src={conn.image}
                alt={conn.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Type Label */}
          <div
            className={`text-xs font-semibold px-2 py-1 rounded w-fit ${
              conn.link_type?.toLowerCase() === "supports"
                ? "bg-green-700/60 text-green-200"
                : "bg-red-700/60 text-red-200"
            }`}
          >
            {conn.link_type || "Unknown"}
          </div>

          {/* External Link */}
          <a
            href={conn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline"
          >
            View Full Report →
          </a>
        </div>
      ))
    ) : (
      <p className="text-sm text-gray-400 text-center">
        No related connections found.
      </p>
    )}
  </div>

  {/* Footer Note */}
  <div
    className="bg-gradient-to-r from-red-700 to-red-600 text-center py-2 text-xs font-bold shadow-inner"
    style={{ textShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}
  >
    Red highlights indicate manipulated or fabricated content
  </div>
</div>
        </motion.div>

        {/* Social Media Icons */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="max-w-6xl mx-auto mt-8 flex justify-end gap-6 pr-6">
          {selectedIcons.map((social, index) => (
            <div 
              key={index}
              className="w-10 h-10 border-2 border-orange-500/50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-orange-500/20 hover:border-orange-400 transition-all bg-black/40 backdrop-blur-sm overflow-hidden"
            >
              <img 
                src={social.icon} 
                alt={social.name}
                className="w-6 h-6 object-contain"
              />
            </div>
          ))}
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