
import React, { useState, useEffect, useRef } from 'react';
import { LLSX_FACTORS, QHSX_FACTORS, REAL_FACTS } from './constants';
import { Factor, Category } from './types';
import { ScaleVisual } from './components/ScaleVisual';
import { Tooltip } from './components/Tooltip';

const App: React.FC = () => {
  const [placedLeft, setPlacedLeft] = useState<Factor[]>([]);
  const [placedRight, setPlacedRight] = useState<Factor[]>([]);
  const [showLLSXPopup, setShowLLSXPopup] = useState(false);
  const [showQHSXPopup, setShowQHSXPopup] = useState(false);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [conflictText, setConflictText] = useState<string[]>([]);
  const [timer, setTimer] = useState(20);
  
  // Use ReturnType<typeof setInterval> to avoid NodeJS namespace dependency in browser environments
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const leftWeight = placedLeft.reduce((sum, f) => sum + f.weight, 0);
  const rightWeight = placedRight.reduce((sum, f) => sum + f.weight, 0);

  const diff = leftWeight - rightWeight;
  const isLeftConflict = diff > 15;
  const isRightConflict = diff < -15;

  // Reset timer whenever an action occurs
  const resetInactivityTimer = () => {
    setTimer(20);
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setShowResultPopup(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isLeftConflict || isRightConflict) {
      const interval = setInterval(() => {
        const lPool = ["Chảy máu chất xám!", "Nhảy việc!", "Hệ thống lạc hậu!", "Bất mãn!"];
        const rPool = ["Lãng phí!", "Cồng kềnh!", "Ảo tưởng!", "Bệnh hình thức!"];
        const pool = isLeftConflict ? lPool : rPool;
        const random = pool[Math.floor(Math.random() * pool.length)];
        setConflictText(prev => [random, ...prev.slice(0, 3)]);
      }, 1500);
      return () => clearInterval(interval);
    } else {
      setConflictText([]);
    }
  }, [isLeftConflict, isRightConflict]);

  const handleDrop = (item: Factor, side: 'left' | 'right') => {
    resetInactivityTimer();
    if (side === 'left' && item.category !== Category.LLSX) return;
    if (side === 'right' && item.category !== Category.QHSX) return;

    if (side === 'left') {
      setPlacedLeft(prev => [...prev, { ...item, id: `${item.id}-${Date.now()}` }]);
    } else {
      setPlacedRight(prev => [...prev, { ...item, id: `${item.id}-${Date.now()}` }]);
    }
  };

  const handleDragStart = (e: React.DragEvent, item: Factor) => {
    e.dataTransfer.setData('factor', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const removeItem = (id: string, side: 'left' | 'right') => {
    resetInactivityTimer();
    if (side === 'left') setPlacedLeft(prev => prev.filter(i => i.id !== id));
    else setPlacedRight(prev => prev.filter(i => i.id !== id));
  };

  const getResultContent = () => {
    if (placedLeft.length === 0 && placedRight.length === 0) {
      return {
        title: "SỰ TRÌ TRỆ TUYỆT ĐỐI",
        desc: "Không có lực lượng sản xuất, không có quan hệ sản xuất. Xã hội (hoặc dự án của bạn) đang ở trạng thái đứng yên.",
        advice: "Hãy bắt đầu bằng việc nâng cấp kỹ năng (LLSX) hoặc xây dựng đội ngũ (QHSX)."
      };
    }
    if (Math.abs(diff) < 15) {
      return {
        title: "ĐIỂM CÂN BẰNG LÝ TƯỞNG",
        desc: "Lực lượng sản xuất và Quan hệ sản xuất đang 'đồng điệu'. Đây là trạng thái giúp năng suất lao động đạt mức cao nhất.",
        advice: "Duy trì sự phù hợp này, nhưng hãy nhớ LLSX luôn phát triển nhanh hơn. Đừng để hệ thống trở nên lỗi thời trong tương lai."
      };
    }
    if (diff > 15) {
      return {
        title: "MÂU THUẪN: QHSX LỖI THỜI",
        desc: "Năng lực con người (LLSX) đã vượt xa khả năng quản lý và đãi ngộ (QHSX). 'Chiếc áo' cơ chế hiện tại đã quá chật.",
        advice: "Cần một cuộc 'cách mạng' trong quản lý: Tăng lương, áp dụng Agile, hoặc thay đổi văn hóa để giữ chân nhân tài."
      };
    }
    return {
      title: "MÂU THUẪN: QHSX VƯỢT TRƯỚC HÌNH THỨC",
      desc: "Hệ thống quản lý, đãi ngộ quá hào nhoáng nhưng năng lực thực tế của nhân sự chưa tới. Dẫn đến lãng phí nguồn lực.",
      advice: "Tập trung vào đào tạo (LLSX) để đuổi kịp hệ thống, hoặc tinh gọn bộ máy quản lý để tránh bệnh hình thức."
    };
  };

  const resultContent = getResultContent();

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col p-4 md:p-8 font-sans">
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:30px_30px]"></div>

      {/* Header */}
      <header className="relative z-10 text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 mb-2 italic">
          TRIẾT HỌC <span className="text-orange-500">IT</span> LAB
        </h1>
        <div className="flex items-center justify-center gap-4">
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em]">Simulator: LLSX & QHSX Interaction</p>
          <div className={`px-2 py-0.5 rounded border ${timer < 5 ? 'border-red-500 text-red-500 animate-pulse' : 'border-slate-700 text-slate-500'} text-[10px] font-mono`}>
            AUTO-ANALYSIS: {timer}s
          </div>
        </div>
      </header>

      {/* Main Simulation Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full flex flex-col relative z-10">
        
        {/* Scale Section */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] relative">
          <ScaleVisual leftItems={placedLeft} rightItems={placedRight} onDrop={handleDrop} />
          
          {/* Conflict Floating Text */}
          <div className="absolute inset-0 pointer-events-none">
             {conflictText.map((text, i) => (
               <div 
                 key={`${i}-${text}`} 
                 className={`absolute font-black text-2xl animate-float-up ${isLeftConflict ? 'text-red-500' : 'text-yellow-500'}`}
                 style={{ left: `${30 + (i * 10)}%`, top: `${50 + (i * 5)}%`, animationDelay: `${i * 0.3}s` }}
               >
                 {text}
               </div>
             ))}
          </div>

          {/* Quick Remove Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-lg">
             {placedLeft.map(i => (
               <button key={i.id} onClick={() => removeItem(i.id, 'left')} className="bg-orange-500/20 border border-orange-500/30 text-orange-200 text-[9px] font-bold px-3 py-1 rounded-full flex items-center gap-1 hover:bg-red-500/20 transition-all">
                 {i.icon} {i.name} ×
               </button>
             ))}
             {placedRight.map(i => (
               <button key={i.id} onClick={() => removeItem(i.id, 'right')} className="bg-blue-500/20 border border-blue-500/30 text-blue-200 text-[9px] font-bold px-3 py-1 rounded-full flex items-center gap-1 hover:bg-red-500/20 transition-all">
                 {i.icon} {i.name} ×
               </button>
             ))}
          </div>
        </div>

        {/* Supply Pool Section */}
        <section className="mt-32 bg-slate-900/60 border border-slate-800 p-8 rounded-[3rem] backdrop-blur-xl shadow-2xl relative">
           <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-700 px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
             Supply Pool (Kéo các thành phần lên cân)
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-orange-500 font-black text-xs uppercase tracking-widest italic">Năng lực (LLSX)</h3>
                  <button onClick={() => { resetInactivityTimer(); setShowLLSXPopup(true); }} className="text-orange-500 hover:scale-110 transition-transform">ⓘ</button>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  {LLSX_FACTORS.map((f, idx) => (
                    <Tooltip key={f.id} text={f.tooltip}>
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, f)}
                        className="w-20 h-20 bg-slate-800 border-2 border-slate-700 rounded-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:border-orange-500 hover:bg-orange-500/10 transition-all group relative"
                        style={{ transform: `rotate(${(idx % 2 === 0 ? 5 : -5) * (idx % 3)}deg)` }}
                      >
                        <span className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-300">{f.icon}</span>
                        <span className="text-[7px] font-black uppercase text-slate-500 group-hover:text-orange-400 text-center px-1">{f.name}</span>
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-blue-500 font-black text-xs uppercase tracking-widest italic">Quan hệ (QHSX)</h3>
                  <button onClick={() => { resetInactivityTimer(); setShowQHSXPopup(true); }} className="text-blue-500 hover:scale-110 transition-transform">ⓘ</button>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  {QHSX_FACTORS.map((f, idx) => (
                    <Tooltip key={f.id} text={f.tooltip}>
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, f)}
                        className="w-20 h-20 bg-slate-800 border-2 border-slate-700 rounded-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:border-blue-500 hover:bg-blue-500/10 transition-all group relative"
                        style={{ transform: `rotate(${(idx % 2 === 0 ? -5 : 5) * (idx % 3)}deg)` }}
                      >
                        <span className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-300">{f.icon}</span>
                        <span className="text-[7px] font-black uppercase text-slate-500 group-hover:text-blue-400 text-center px-1">{f.name}</span>
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </div>
           </div>
        </section>
      </main>

      {/* Popups */}
      {showResultPopup && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in zoom-in duration-300">
          <div className="bg-[#0b1120] border-4 border-white/10 p-12 rounded-[3.5rem] max-w-2xl w-full relative shadow-[0_0_100px_rgba(255,255,255,0.05)]">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 border-2 border-slate-600 px-8 py-2 rounded-full text-xs font-black tracking-[0.3em] text-white">
              PHILOSOPHICAL SYNTHESIS
            </div>
            <button onClick={() => { setShowResultPopup(false); resetInactivityTimer(); }} className="absolute top-8 right-8 text-slate-500 hover:text-white text-4xl">×</button>
            
            <h2 className="text-4xl font-black text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-blue-500 uppercase italic">
              {resultContent.title}
            </h2>
            
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed text-center">
               <p className="font-light italic">"{resultContent.desc}"</p>
               <div className="h-[1px] w-1/3 bg-slate-800 mx-auto my-8"></div>
               <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Lời khuyên thực tiễn</span>
                  <p className="text-white font-bold">{resultContent.advice}</p>
               </div>
            </div>
            
            <button 
              onClick={() => { setShowResultPopup(false); resetInactivityTimer(); }} 
              className="mt-12 w-full py-5 bg-gradient-to-r from-orange-600 to-blue-600 text-white font-black rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest"
            >
              TIẾP TỤC THÍ NGHIỆM
            </button>
          </div>
        </div>
      )}

      {showLLSXPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in zoom-in duration-300">
          <div className="bg-[#0b1120] border-2 border-orange-500 p-10 rounded-[3rem] max-w-lg w-full relative">
            <button onClick={() => setShowLLSXPopup(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white text-3xl">×</button>
            <h2 className="text-3xl font-black text-orange-500 mb-6 italic uppercase tracking-tighter">Năng lực sản xuất</h2>
            <p className="text-slate-300 text-lg font-light leading-relaxed mb-8">
              LLSX bao gồm <span className="text-white font-bold underline italic decoration-orange-500">Con người</span> và <span className="text-white font-bold underline italic decoration-orange-500">Công cụ</span>. Trong IT, đó là trình độ Code, Algorithm, và hạ tầng Cloud của bạn.
            </p>
            <button onClick={() => setShowLLSXPopup(false)} className="w-full py-4 bg-orange-500 text-white font-black rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all">TÔI ĐÃ HIỂU</button>
          </div>
        </div>
      )}

      {showQHSXPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in zoom-in duration-300">
          <div className="bg-[#0b1120] border-2 border-blue-500 p-10 rounded-[3rem] max-w-lg w-full relative">
            <button onClick={() => setShowQHSXPopup(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white text-3xl">×</button>
            <h2 className="text-3xl font-black text-blue-500 mb-6 italic uppercase tracking-tighter">Quan hệ sản xuất</h2>
            <p className="text-slate-300 text-lg font-light leading-relaxed mb-8">
              QHSX là cách chúng ta <span className="text-white font-bold underline italic decoration-blue-500">làm việc chung</span> và <span className="text-white font-bold underline italic decoration-blue-500">chia sẻ lợi ích</span>. Bao gồm: Lương thưởng, Quy trình (Agile), và Văn hóa tổ chức.
            </p>
            <button onClick={() => setShowQHSXPopup(false)} className="w-full py-4 bg-blue-500 text-white font-black rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all">KHÁM PHÁ TIẾP</button>
          </div>
        </div>
      )}

      {/* Persistent Reset Control */}
      <div className="fixed bottom-8 right-8 z-[60]">
         <button 
           onClick={() => { setPlacedLeft([]); setPlacedRight([]); setConflictText([]); resetInactivityTimer(); }}
           className="w-14 h-14 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center hover:bg-red-500/20 hover:border-red-500 transition-all shadow-2xl group"
           title="Xóa tất cả"
         >
           <span className="text-2xl group-hover:rotate-180 transition-transform duration-500">🔄</span>
         </button>
      </div>
    </div>
  );
};

export default App;
