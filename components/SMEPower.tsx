
import React, { useState } from 'react';
// Replaced UserGroup with Users
import { ArrowLeft, ShoppingCart, Users, TrendingDown, CheckCircle, Package, ArrowRight, Star } from 'lucide-react';

interface Deal {
  id: string;
  name: string;
  originalPrice: number;
  groupPrice: number;
  currentParticipants: number;
  targetParticipants: number;
  image: string;
  category: string;
}

const DEALS: Deal[] = [
  {
    id: '1',
    name: 'ปุ๋ยเคมีสูตร 16-16-16 (เกรดพรีเมียม)',
    originalPrice: 1200,
    groupPrice: 850,
    currentParticipants: 85,
    targetParticipants: 100,
    image: 'https://picsum.photos/seed/fertilizer/400/300',
    category: 'เกษตรกรรม'
  },
  {
    id: '2',
    name: 'เมล็ดพันธุ์ข้าวหอมมะลิ 105',
    originalPrice: 500,
    groupPrice: 380,
    currentParticipants: 45,
    targetParticipants: 60,
    image: 'https://picsum.photos/seed/rice/400/300',
    category: 'เกษตรกรรม'
  },
  {
    id: '3',
    name: 'บรรจุภัณฑ์กล่องลูกฟูก (1000 ใบ)',
    originalPrice: 8500,
    groupPrice: 6200,
    currentParticipants: 12,
    targetParticipants: 20,
    image: 'https://picsum.photos/seed/box/400/300',
    category: 'บรรจุภัณฑ์'
  }
];

interface SMEPowerProps {
  onBack: () => void;
}

const SMEPower: React.FC<SMEPowerProps> = ({ onBack }) => {
  const [view, setView] = useState<'hub' | 'detail' | 'success'>('hub');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const handleJoin = (deal: Deal) => {
    setSelectedDeal(deal);
    setView('detail');
  };

  const confirmJoin = () => {
    setView('success');
  };

  const renderHub = () => (
    <div className="space-y-12 animate-fadeIn">
      {/* Promo Section */}
      <div className="relative overflow-hidden bg-orange-500 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-8 shadow-xl">
        <div className="relative z-10 flex-1">
          <h2 className="text-4xl font-extrabold mb-4">รวมพลังซื้อ เพื่อลดต้นทุน!</h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            ยิ่งรวมตัวกันเยอะ ราคายิ่งถูกลง 
            แพลตฟอร์ม "รวมพลังคนตัวเล็ก" ช่วยให้ SME และเกษตรกรซื้อปัจจัยการผลิตในราคาส่ง 
            โดยไม่ต้องผ่านพ่อค้าคนกลาง
          </p>
          <div className="flex gap-4">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="block text-2xl font-bold">15,000+</span>
              <span className="text-sm">ผู้เข้าร่วม</span>
            </div>
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="block text-2xl font-bold">฿4.2M</span>
              <span className="text-sm">ประหยัดต้นทุนรวม</span>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex-shrink-0">
          <TrendingDown size={200} className="text-white/20" />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {['ทั้งหมด', 'เกษตรกรรม', 'บรรจุภัณฑ์', 'ขนส่ง', 'พลังงาน'].map((cat, i) => (
          <button 
            key={i}
            className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
              i === 0 ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-orange-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {DEALS.map(deal => (
          <div key={deal.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100">
            <div className="h-48 relative overflow-hidden">
              <img src={deal.image} alt={deal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                ลด {Math.round((1 - deal.groupPrice/deal.originalPrice) * 100)}%
              </div>
            </div>
            <div className="p-6">
              <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">{deal.category}</span>
              <h3 className="text-xl font-bold text-gray-800 my-2 line-clamp-2">{deal.name}</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl font-black text-[#6a0dad]">฿{deal.groupPrice.toLocaleString()}</span>
                <span className="text-gray-400 line-through text-sm">฿{deal.originalPrice.toLocaleString()}</span>
              </div>
              
              <div className="mb-6 space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-500">จองแล้ว {deal.currentParticipants} ราย</span>
                  <span className="text-orange-500">เป้าหมาย {deal.targetParticipants}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${(deal.currentParticipants / deal.targetParticipants) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button 
                onClick={() => handleJoin(deal)}
                className="w-full py-3 bg-white border-2 border-orange-500 text-orange-500 font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                ร่วมกลุ่มซื้อ <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDetail = () => selectedDeal && (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
      <div className="md:flex">
        <div className="md:w-1/2">
          <img src={selectedDeal.image} alt={selectedDeal.name} className="w-full h-full object-cover" />
        </div>
        <div className="md:w-1/2 p-8 space-y-6">
          <button onClick={() => setView('hub')} className="text-gray-400 hover:text-gray-600 mb-4 flex items-center">
            <ArrowLeft size={16} className="mr-1" /> ย้อนกลับ
          </button>
          <h2 className="text-3xl font-bold text-gray-800 leading-tight">{selectedDeal.name}</h2>
          
          <div className="bg-orange-50 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">ราคาพิเศษ (เมื่อครบกลุ่ม)</span>
              <span className="text-3xl font-black text-orange-600">฿{selectedDeal.groupPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-orange-100 pt-4">
              <span className="text-gray-500">ประหยัดทันที</span>
              <span className="font-bold text-green-600">฿{(selectedDeal.originalPrice - selectedDeal.groupPrice).toLocaleString()} บาท / หน่วย</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              {/* Changed UserGroup to Users */}
              <Users size={20} className="text-orange-500" />
              อีก {selectedDeal.targetParticipants - selectedDeal.currentParticipants} ท่านจะได้รับราคานี้
            </div>
            <p className="text-gray-600 leading-relaxed">
              การรวมกลุ่มสั่งซื้อนี้ดำเนินการผ่านสหกรณ์ส่วนกลาง มั่นใจได้ในคุณภาพสินค้า 
              และระบบการจัดส่งที่โปร่งใส หากครบจำนวนระบบจะทำการชำระเงินโดยอัตโนมัติ
            </p>
          </div>

          <button 
            onClick={confirmJoin}
            className="w-full py-4 bg-orange-500 text-white font-black text-lg rounded-2xl shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all"
          >
            ยืนยันเข้าร่วมกลุ่ม
          </button>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="max-w-md mx-auto text-center py-12 bg-white rounded-3xl shadow-xl px-10 animate-bounceIn">
      <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="text-orange-600" size={48} />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">เข้าร่วมกลุ่มสำเร็จ!</h2>
      <p className="text-gray-600 mb-8">เราได้บันทึกความต้องการของคุณแล้ว ระบบจะแจ้งเตือนทันทีเมื่อจำนวนสมาชิกครบกำหนดเพื่อทำการสั่งซื้อในราคาส่ง</p>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between text-sm p-4 bg-gray-50 rounded-xl">
          <span className="text-gray-500">ประเภทบริการ</span>
          <span className="font-bold">Group Buy</span>
        </div>
        <div className="flex items-center justify-between text-sm p-4 bg-gray-50 rounded-xl">
          <span className="text-gray-500">สถานะกลุ่ม</span>
          <span className="text-orange-600 font-bold flex items-center">
            <Star size={14} className="mr-1 fill-orange-600" /> รอสมาชิกล่าสุด
          </span>
        </div>
      </div>

      <button 
        onClick={() => setView('hub')}
        className="w-full bg-orange-500 text-white font-bold py-4 rounded-2xl hover:bg-orange-600 transition-colors"
      >
        กลับไปดูดีลอื่นๆ
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fff7ed]">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center text-gray-600 hover:text-orange-500 font-medium">
            <ArrowLeft className="mr-2" size={20} /> กลับหน้าหลัก
          </button>
          <div className="flex items-center text-orange-500 font-bold text-xl">
             <Package className="mr-2" /> รวมพลังคนตัวเล็ก (SME Power)
          </div>
          <div className="hidden md:flex gap-6">
             <span className="text-gray-400 hover:text-gray-600 cursor-pointer">ความช่วยเหลือ</span>
             <span className="text-gray-400 hover:text-gray-600 cursor-pointer">พรีเมียม</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {view === 'hub' && renderHub()}
        {view === 'detail' && renderDetail()}
        {view === 'success' && renderSuccess()}
      </main>
    </div>
  );
};

export default SMEPower;
