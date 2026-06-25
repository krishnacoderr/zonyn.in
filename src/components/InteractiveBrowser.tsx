import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { 
  Laptop, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  CheckCircle,
  Eye,
  MousePointer,
  Cpu,
  Zap,
  Globe,
  RefreshCw,
  Sun,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  Monitor,
  Smartphone,
  ShoppingBag
} from "lucide-react";

export default function InteractiveBrowser() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"saas" | "portfolio" | "ecom">("saas");
  const [screenBrightness, setScreenBrightness] = useState<number>(100);
  const [visitorCount, setVisitorCount] = useState<number>(1420);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  // Custom states for demo actions inside the laptop
  const [cartCount, setCartCount] = useState<number>(0);
  const [customLoadTime, setCustomLoadTime] = useState<string>("0.32s");
  
  // Motion values for fluid 3D magnetic tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 95, mass: 1.1 };
  const animatedRotateX = useSpring(rotateX, springConfig);
  const animatedRotateY = useSpring(rotateY, springConfig);

  // Dynamic live-simulated metrics inside showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => 
        Math.max(1100, Math.min(1900, prev + Math.floor(Math.random() * 19) - 9))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized coordinates (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;

    // Refined tilt limits (7 to -7 degrees)
    rotateX.set(-y * 12);
    rotateY.set(x * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Dynamic random fast latency score generator on website reload
    const speeds = ["0.28s", "0.31s", "0.33s", "0.29s", "0.35s"];
    setTimeout(() => {
      setCustomLoadTime(speeds[Math.floor(Math.random() * speeds.length)]);
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="relative w-full py-8 md:py-12 flex flex-col items-center justify-center select-none"
      style={{ perspective: 1500 }}
    >
      
      {/* 1. TOP INTERACTIVE SCREEN TABS SELECTOR */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-[#0a0a0a]/80 border border-white/5 p-1.5 rounded-2xl relative z-30 backdrop-blur-md">
        <button
          onClick={() => { setActiveTab("saas"); handleRefresh(); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono transition-all uppercase tracking-wider ${
            activeTab === "saas"
              ? "bg-[#FF9A00] text-black font-extrabold shadow-[0_4px_16px_rgba(255,154,0,0.35)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          SaaS Engine
        </button>
        <button
          onClick={() => { setActiveTab("portfolio"); handleRefresh(); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono transition-all uppercase tracking-wider ${
            activeTab === "portfolio"
              ? "bg-[#FF9A00] text-black font-extrabold shadow-[0_4px_16px_rgba(255,154,0,0.35)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Refined Work
        </button>
        <button
          onClick={() => { setActiveTab("ecom"); handleRefresh(); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono transition-all uppercase tracking-wider ${
            activeTab === "ecom"
              ? "bg-[#FF9A00] text-black font-extrabold shadow-[0_4px_16px_rgba(255,154,0,0.35)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          Lux Brands
        </button>
      </div>

      {/* 2. DYNAMIC 3D LAPTOP HARDWARE UNIT */}
      <motion.div
        id="3d-laptop-assembly"
        style={{
          rotateX: animatedRotateX,
          rotateY: animatedRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[580px] flex flex-col items-center transition-shadow duration-300 pointer-events-auto"
      >
        <div 
          className="relative w-full aspect-[16/10] rounded-2xl bg-[#080808] border-2 border-white/10 p-1.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
          style={{ 
            transform: "translateZ(10px)",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="w-full h-full bg-[#030712] rounded-xl flex overflow-hidden relative border border-white/5 font-sans">
            {/* Sidebar Mock */}
            <div className="w-16 bg-[#090d16] border-r border-white/5 flex flex-col items-center py-4 gap-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF9A00] to-[#FF5500] flex items-center justify-center text-white font-bold text-xs shadow-[0_0_10px_rgba(255,154,0,0.3)]">
                L
              </div>
              <div className="flex-1 flex flex-col gap-4 mt-2">
                <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                </div>
                <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center text-white/30 hover:text-white transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                </div>
                <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center text-white/30 hover:text-white transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/10" />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col p-4 bg-gradient-to-b from-[#060a13] to-[#030712] overflow-hidden text-left">
              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <div>
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider">Conversion Engine</h4>
                  <h3 className="text-sm font-semibold text-white">Live Performance Hub</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FF9A00]/10 text-[#FF9A00] border border-[#FF9A00]/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9A00] animate-pulse" />
                  Active Node
                </span>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-3 gap-3 mt-3">
                {/* Metric 1 */}
                <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5">
                  <p className="text-[10px] text-gray-400">Page Load Speed</p>
                  <p className="text-lg font-bold text-white flex items-baseline gap-1">
                    0.28s <span className="text-[10px] text-emerald-400 font-normal">-72%</span>
                  </p>
                </div>
                {/* Metric 2 */}
                <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5">
                  <p className="text-[10px] text-gray-400">Conversion Rate</p>
                  <p className="text-lg font-bold text-[#FF9A00] flex items-baseline gap-1">
                    4.82% <span className="text-[10px] text-[#FF9A00] font-normal">+140%</span>
                  </p>
                </div>
                {/* Metric 3 */}
                <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5">
                  <p className="text-[10px] text-gray-400">SEO / Core Vitals</p>
                  <p className="text-lg font-bold text-emerald-400 flex items-baseline gap-1">
                    100 <span className="text-[10px] text-emerald-400 font-normal">Score</span>
                  </p>
                </div>
              </div>

              {/* Live Graph Visual Mock */}
              <div className="flex-1 mt-3 bg-white/[0.01] border border-white/5 rounded-lg p-3 flex flex-col justify-between relative overflow-hidden">
                <div className="flex justify-between items-center text-[10px] text-gray-500">
                  <span>Weekly Conversion Growth</span>
                  <span className="text-emerald-400 font-medium">Outperforming Industry Avg by 2.4x</span>
                </div>
                {/* Render fake SVG Chart */}
                <div className="w-full h-16 flex items-end gap-1 mt-2">
                  <div className="w-full bg-[#FF9A00]/20 hover:bg-[#FF9A00]/40 transition-colors h-[25%] rounded-t-sm" />
                  <div className="w-full bg-[#FF9A00]/20 hover:bg-[#FF9A00]/40 transition-colors h-[40%] rounded-t-sm" />
                  <div className="w-full bg-[#FF9A00]/30 hover:bg-[#FF9A00]/45 transition-colors h-[30%] rounded-t-sm" />
                  <div className="w-full bg-[#FF9A00]/40 hover:bg-[#FF9A00]/50 transition-colors h-[60%] rounded-t-sm" />
                  <div className="w-full bg-[#FF9A00]/35 hover:bg-[#FF9A00]/45 transition-colors h-[45%] rounded-t-sm" />
                  <div className="w-full bg-[#FF9A00]/50 hover:bg-[#FF9A00]/70 transition-colors h-[85%] rounded-t-sm" />
                  <div className="w-full bg-gradient-to-t from-[#FF9A00] to-[#FF5500] h-[100%] rounded-t-sm shadow-[0_0_15px_rgba(255,154,0,0.3)]" />
                </div>
              </div>
            </div>
          </div>
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-xl" />
        </div>
        
        {/* REFINED PHYSICAL GROUND REFLECTION BACKPLATE SHADOW */}
        <div className="absolute -bottom-4 w-full h-[12px] bg-gradient-to-r from-[#FF9A00]/25 via-[#FF9A00]/30 to-[#FF9A00]/25 blur-lg rounded-full opacity-60 z-0 pointer-events-none" />

      </motion.div>

      {/* 3. HARDWARE CONTROL PANEL & METRICS PANEL */}
      <div className="w-full max-w-[500px] mt-6 grid grid-cols-2 gap-4 bg-[#0a0a0a]/50 border border-white/5 rounded-2xl p-4 backdrop-blur-sm relative z-30">
        
        {/* Brightness / Display Light Controller */}
        <div className="space-y-2 text-left">
          <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-gray-400 font-bold uppercase">
            <span className="flex items-center gap-1.5 text-gray-300">
              <Sun className="w-3.5 h-3.5 text-[#FF9A00]" />
              IPS Panel Backlight
            </span>
            <span className="text-[#FF9A00]">{screenBrightness}%</span>
          </div>
          <input
            type="range"
            min="60"
            max="130"
            value={screenBrightness}
            onChange={(e) => setScreenBrightness(parseInt(e.target.value))}
            className="w-full h-1 bg-[#151515] rounded-lg appearance-none cursor-pointer accent-[#FF9A00] outline-none"
          />
        </div>

        {/* Load speed performance badge */}
        <div className="flex items-center justify-between bg-white/3 border border-white/5 rounded-xl px-3 py-2 text-left">
          <div className="space-y-0.5">
            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block">Speed Latency</span>
            <span className="text-xs font-bold text-white font-mono flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              {customLoadTime}
            </span>
          </div>
          <button 
            onClick={handleRefresh}
            className="p-1.5 rounded-lg bg-[#FF9A00]/20 hover:bg-[#FF9A00] text-[#FF9A00] hover:text-black transition-all cursor-pointer font-bold text-[8px] font-mono uppercase tracking-wider"
          >
            PING
          </button>
        </div>

      </div>

      {/* FLOATING PERFORMANCE PERSPECTIVE CHIPS */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden hidden sm:block">
        
        {/* Hover Hint cursor simulation */}
        <motion.div
          className="absolute -top-[5%] right-[5%] flex items-center gap-2 bg-[#020617]/90 border border-[#FF9A00]/30 p-2.5 rounded-xl shadow-[0_10px_25px_rgba(255,154,0,0.05)] backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="p-1 rounded bg-[#FF9A00]/10 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9A00] animate-pulse" />
          </div>
          <p className="text-[10px] font-mono text-gray-300">Hover panel to tilt laptop in 3D space</p>
        </motion.div>

      </div>

    </div>
  );
}
