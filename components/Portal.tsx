
import React from 'react';
import { ShieldCheck, ShoppingBag, Users, ChevronRight } from 'lucide-react';

interface PortalProps {
  onSelectClear: () => void;
  onSelectSME: () => void;
}

const Portal: React.FC<PortalProps> = ({ onSelectClear, onSelectSME }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-[#6a0dad] mb-6">
          เทคโนโลยีเพื่อ "คนตัวเล็ก"
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          พรรคไทยสร้างไทย มุ่งมั่นใช้เทคโนโลยีดิจิทัลเพื่อสร้างความโปร่งใส 
          และขยายโอกาสทางเศรษฐกิจให้กับพี่น้องประชาชนทุกคน
        </p>
      </div>

      {/* App Selection Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Card 1: Thai Sang Clear */}
        <div 
          onClick={onSelectClear}
          className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-t-8 border-[#6a0dad]"
        >
          <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ShieldCheck className="text-[#6a0dad]" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">ล้างโกง (Thai Sang Clear)</h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            ระบบตรวจสอบงบประมาณและแจ้งเบาะแสการทุจริตอย่างปลอดภัย 
            ร่วมเป็นหูเป็นตาเพื่อปกป้องภาษีของพวกเราทุกคน
          </p>
          <button className="flex items-center text-[#6a0dad] font-bold text-lg">
            เริ่มใช้งานระบบ <ChevronRight className="ml-2" />
          </button>
        </div>

        {/* Card 2: SME Power */}
        <div 
          onClick={onSelectSME}
          className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-t-8 border-orange-500"
        >
          <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ShoppingBag className="text-orange-500" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">รวมพลังคนตัวเล็ก (SME Power)</h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            แพลตฟอร์มรวมกลุ่มซื้อปัจจัยการผลิต ลดต้นทุน และเชื่อมโยง 
            SME/เกษตรกร สู่ผู้บริโภคโดยตรงโดยไม่ผ่านคนกลาง
          </p>
          <button className="flex items-center text-orange-500 font-bold text-lg">
            เข้าสู่ตลาดชุมชน <ChevronRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Mission Footer */}
      <div className="mt-20 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-1 bg-gray-300"></div>
          <span className="text-gray-400 font-medium uppercase tracking-widest">Our Mission</span>
          <div className="w-12 h-1 bg-gray-300"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-12 opacity-70">
          <div className="flex items-center gap-2">
            <Users className="text-[#6a0dad]" />
            <span className="font-semibold text-gray-700">สร้างโอกาส</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-[#6a0dad]" />
            <span className="font-semibold text-gray-700">ความโปร่งใส</span>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-[#6a0dad]" />
            <span className="font-semibold text-gray-700">ปลดล็อคเศรษฐกิจ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;
