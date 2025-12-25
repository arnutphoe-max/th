
import React, { useState } from 'react';
// Added ShieldCheck to the imports
import { ArrowLeft, ShieldAlert, CheckCircle2, FileText, Map, AlertCircle, Lock, ShieldCheck } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

const BUDGET_DATA = [
  { name: 'ก่อสร้างถนน', value: 450, color: '#6a0dad' },
  { name: 'สาธารณสุข', value: 300, color: '#8e44ad' },
  { name: 'การศึกษา', value: 200, color: '#a29bfe' },
  { name: 'สิ่งแวดล้อม', value: 150, color: '#dcdde1' },
];

const REPORTS = [
  { id: '1', title: 'พบพิรุธการจัดจ้างถนนซอย 5', status: 'In Review', date: '2 ชั่วโมงที่แล้ว' },
  { id: '2', title: 'วัสดุสร้างอาคารไม่ตรงสเปก', status: 'Validated', date: '1 วันที่แล้ว' },
  { id: '3', title: 'งบประมาณตกหล่นในหมู่บ้าน', status: 'Solved', date: '3 วันที่แล้ว' },
];

interface ThaiSangClearProps {
  onBack: () => void;
}

const ThaiSangClear: React.FC<ThaiSangClearProps> = ({ onBack }) => {
  const [step, setStep] = useState<'dashboard' | 'report' | 'success'>('dashboard');
  const [reportForm, setReportForm] = useState({ title: '', desc: '', location: '' });

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Info */}
      <div className="bg-[#6a0dad] text-white p-8 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold mb-2">ล้างโกง: ระบบเฝ้าระวังงบประมาณ</h2>
        <p className="opacity-90">ตรวจสอบการใช้งบประมาณในพื้นที่ของคุณแบบ Real-time</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Stats Column */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Map className="mr-2 text-[#6a0dad]" /> สัดส่วนงบประมาณปี 2567
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BUDGET_DATA}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6a0dad" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Column */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <AlertCircle className="mr-2 text-red-500" /> แจ้งเบาะแสใหม่
          </h3>
          <p className="text-gray-600 mb-8">พบพิรุธในการใช้งบประมาณ? แจ้งได้ทันที ข้อมูลของคุณจะถูกปิดเป็นความลับสูงสุด</p>
          <button 
            onClick={() => setStep('report')}
            className="mt-auto w-full bg-[#6a0dad] text-white font-bold py-4 rounded-2xl hover:bg-[#5a0b93] transition-colors flex items-center justify-center text-lg"
          >
            <ShieldAlert className="mr-2" /> รายงานทุจริต
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">ความคืบหน้าการตรวจสอบล่าสุด</h3>
        <div className="space-y-4">
          {REPORTS.map(r => (
            <div key={r.id} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-50 p-3 rounded-lg text-[#6a0dad]">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{r.title}</h4>
                  <p className="text-sm text-gray-500">{r.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                r.status === 'Validated' ? 'bg-blue-100 text-blue-600' :
                r.status === 'Solved' ? 'bg-green-100 text-green-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-xl animate-slideUp">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">รายงานเบาะแส</h2>
        <div className="flex items-center text-green-600 text-sm font-bold bg-green-50 px-3 py-1 rounded-full">
          <Lock size={14} className="mr-1" /> เข้ารหัสความลับขั้นสูงสุด
        </div>
      </div>
      <form onSubmit={handleReport} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">หัวข้อเรื่องที่พบพิรุธ</label>
          <input 
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6a0dad] focus:ring-2 focus:ring-[#6a0dad]/20 transition-all outline-none"
            placeholder="เช่น โครงการก่อสร้างถนนไม่คืบหน้า..."
            value={reportForm.title}
            onChange={(e) => setReportForm({...reportForm, title: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">สถานที่เกิดเหตุ</label>
          <input 
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6a0dad] focus:ring-2 focus:ring-[#6a0dad]/20 transition-all outline-none"
            placeholder="ชื่อเขต แขวง หรือหมู่บ้าน"
            value={reportForm.location}
            onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">รายละเอียดเหตุการณ์</label>
          <textarea 
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6a0dad] focus:ring-2 focus:ring-[#6a0dad]/20 transition-all outline-none"
            placeholder="บรรยายข้อเท็จจริงที่พบ..."
            value={reportForm.desc}
            onChange={(e) => setReportForm({...reportForm, desc: e.target.value})}
          ></textarea>
        </div>
        <div className="p-4 bg-yellow-50 rounded-xl flex items-start space-x-3 border border-yellow-100">
          <ShieldAlert className="text-yellow-600 shrink-0 mt-1" size={20} />
          <p className="text-sm text-yellow-700">
            ระบบจะไม่บันทึก IP Address หรือข้อมูลส่วนตัวของคุณ การรายงานเป็นแบบนิรนาม 100% 
            กรุณามั่นใจในการให้ข้อมูลที่เป็นความจริง
          </p>
        </div>
        <div className="flex gap-4 pt-4">
          <button 
            type="button"
            onClick={() => setStep('dashboard')}
            className="flex-1 py-4 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-colors"
          >
            ยกเลิก
          </button>
          <button 
            type="submit"
            className="flex-[2] bg-red-600 text-white font-bold py-4 rounded-2xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
          >
            ส่งข้อมูลรายงาน
          </button>
        </div>
      </form>
    </div>
  );

  const renderSuccess = () => (
    <div className="max-w-md mx-auto text-center py-12 bg-white rounded-3xl shadow-xl px-10 animate-bounceIn">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="text-green-600" size={48} />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">ส่งรายงานสำเร็จ!</h2>
      <p className="text-gray-600 mb-8">ขอบคุณที่เป็นส่วนหนึ่งในการปกป้องเงินภาษีของชาติ เรากำลังตรวจสอบข้อมูลของคุณทันที</p>
      <div className="bg-gray-50 p-4 rounded-2xl mb-8 border border-dashed border-gray-300">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">เลขรหัสติดตามผล (Safe-Track)</p>
        <p className="text-xl font-mono font-bold text-[#6a0dad]">TSC-8821-X99</p>
      </div>
      <button 
        onClick={() => setStep('dashboard')}
        className="w-full bg-[#6a0dad] text-white font-bold py-4 rounded-2xl hover:bg-[#5a0b93] transition-colors"
      >
        กลับสู่แดชบอร์ด
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center text-gray-600 hover:text-[#6a0dad] font-medium">
            <ArrowLeft className="mr-2" size={20} /> กลับหน้าหลัก
          </button>
          <div className="flex items-center text-[#6a0dad] font-bold text-xl">
             <ShieldCheck className="mr-2" /> ล้างโกง (Clear)
          </div>
          <div className="w-24"></div> {/* Spacer */}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {step === 'dashboard' && renderDashboard()}
        {step === 'report' && renderForm()}
        {step === 'success' && renderSuccess()}
      </main>
    </div>
  );
};

export default ThaiSangClear;
