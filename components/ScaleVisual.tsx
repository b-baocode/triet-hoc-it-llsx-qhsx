
import React from 'react';
import { Factor } from '../types';

interface ScaleVisualProps {
  leftItems: Factor[];
  rightItems: Factor[];
  onDrop: (item: Factor, side: 'left' | 'right') => void;
}

export const ScaleVisual: React.FC<ScaleVisualProps> = ({ leftItems, rightItems, onDrop }) => {
  const leftWeight = Math.max(0, leftItems.reduce((s, i) => s + i.weight, 0));
  const rightWeight = Math.max(0, rightItems.reduce((s, i) => s + i.weight, 0));
  
  const diff = leftWeight - rightWeight;
  // diff > 0: trái nặng hơn -> xoay âm -> trái xuống
  // diff < 0: phải nặng hơn -> xoay dương -> phải xuống  
  const rotation = Math.max(-25, Math.min(25, diff * 0.4));

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent, side: 'left' | 'right') => {
    e.preventDefault();
    const data = e.dataTransfer.getData('factor');
    if (data) {
      const item = JSON.parse(data) as Factor;
      onDrop(item, side);
    }
  };

  const getStatus = () => {
    if (Math.abs(diff) < 15) return { label: 'CÂN BẰNG TỐI ƯU', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500', desc: 'Hệ thống vận hành trơn tru.' };
    if (diff > 15) return { label: 'QHSX LẠC HẬU', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500', desc: 'Hệ thống kìm hãm năng lực.' };
    return { label: 'QHSX HÌNH THỨC', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500', desc: 'Hệ thống quá cồng kềnh so với năng lực.' };
  };

  const status = getStatus();

  return (
    <div className="relative w-full h-[500px] flex flex-col items-center justify-end select-none perspective-1000">
      {/* Dynamic Glow Background */}
      <div className={`absolute inset-0 transition-all duration-1000 blur-[100px] opacity-20 ${
        diff > 15 ? 'bg-red-600' : diff < -15 ? 'bg-yellow-600' : 'bg-green-600'
      }`}></div>

      {/* Main Support Structure */}
      <div className="absolute bottom-0 w-20 h-64 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700 rounded-t-full border-x-4 border-t-4 border-slate-600 shadow-2xl"></div>
      
      {/* The Beam */}
      <div 
        className="relative w-[90%] h-6 bg-slate-700 rounded-full transition-transform duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1) border-4 border-slate-600 shadow-xl z-10"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Pivot Point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-800 border-4 border-slate-500"></div>

        {/* Left Pan (LLSX) */}
        <div 
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'left')}
          className="absolute -left-16 -bottom-32 w-48 h-48 flex flex-col items-center transition-transform duration-1000"
          style={{ transform: `rotate(${-rotation}deg) translateY(${-rotation * 2}px)` }}
        >
           <div className="w-1 bg-slate-500 h-16 shadow-lg"></div>
           <div className={`w-full h-24 bg-orange-950/20 border-b-8 border-x-4 border-orange-500 rounded-b-[4rem] flex flex-wrap gap-1.5 p-3 items-end justify-center relative transition-all ${leftItems.length > 0 ? 'shadow-[0_20px_40px_rgba(249,115,22,0.3)]' : 'border-dashed border-orange-500/30'}`}>
              <div className="absolute -top-6 text-[10px] font-black text-orange-500 uppercase tracking-widest">Năng lực (LLSX)</div>
              {leftItems.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="bg-orange-500 text-white text-lg p-1.5 rounded-lg shadow-md animate-bounce" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {item.icon}
                </div>
              ))}
              {leftItems.length === 0 && <div className="text-[10px] text-orange-500/20 font-bold mb-4">THẢ VÀO ĐÂY</div>}
           </div>
           <div className="mt-2 text-xs font-black text-orange-500">{leftWeight} PTS</div>
        </div>

        {/* Right Pan (QHSX) */}
        <div 
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'right')}
          className="absolute -right-16 -bottom-32 w-48 h-48 flex flex-col items-center transition-transform duration-1000"
          style={{ transform: `rotate(${-rotation}deg) translateY(${rotation * 2}px)` }}
        >
           <div className="w-1 bg-slate-500 h-16 shadow-lg"></div>
           <div className={`w-full h-24 bg-blue-950/20 border-b-8 border-x-4 border-blue-500 rounded-b-[4rem] flex flex-wrap gap-1.5 p-3 items-end justify-center relative transition-all ${rightItems.length > 0 ? 'shadow-[0_20px_40px_rgba(59,130,246,0.3)]' : 'border-dashed border-blue-500/30'}`}>
              <div className="absolute -top-6 text-[10px] font-black text-blue-500 uppercase tracking-widest">Quan hệ (QHSX)</div>
              {rightItems.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="bg-blue-500 text-white text-lg p-1.5 rounded-lg shadow-md animate-bounce" style={{ animationDelay: `${idx * 0.15}s` }}>
                  {item.icon}
                </div>
              ))}
              {rightItems.length === 0 && <div className="text-[10px] text-blue-500/20 font-bold mb-4">THẢ VÀO ĐÂY</div>}
           </div>
           <div className="mt-2 text-xs font-black text-blue-500">{rightWeight} PTS</div>
        </div>
      </div>

      {/* Status Gauge */}
      <div className="absolute top-0 flex flex-col items-center w-full z-20">
        <div className={`text-lg font-black italic tracking-widest px-8 py-2 rounded-xl border-2 transition-all duration-700 shadow-2xl ${status.bg} ${status.border} ${status.color}`}>
          {status.label}
        </div>
        <p className="mt-2 text-[10px] text-slate-500 font-mono uppercase tracking-widest">{status.desc}</p>
      </div>
    </div>
  );
};
