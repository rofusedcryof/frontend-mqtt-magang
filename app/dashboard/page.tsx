import React from 'react';
import { 
  Gauge, 
  Calendar, 
  CheckCircle, 
  Layers, 
  Frown, 
  ArrowRight 
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-6">
      {/* Judul*/}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Monitoring</h2>
      </div>

      {/* 5 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {/* Card 1 - Green */}
        <div className="bg-[#10B981] rounded-lg shadow-sm text-white overflow-hidden flex flex-col">
          <div className="p-4 flex justify-between items-start flex-1">
            <div>
              <h3 className="text-4xl font-bold">100</h3>
              <p className="text-xs font-medium mt-1 uppercase">Total Mesin Run</p>
            </div>
            <Gauge className="w-12 h-12 opacity-30" />
          </div>
          <div className="bg-[#059669] py-1.5 flex justify-center items-center text-xs hover:bg-[#047857] cursor-pointer transition-colors">
            More info <ArrowRight className="w-3 h-3 ml-1" />
          </div>
        </div>

        {/* Card 2 - Blue */}
        <div className="bg-[#38BDF8] rounded-lg shadow-sm text-white overflow-hidden flex flex-col">
          <div className="p-4 flex justify-between items-start flex-1">
            <div>
              <h3 className="text-4xl font-bold">500</h3>
              <p className="text-xs font-medium mt-1 uppercase">Target Produksi</p>
            </div>
            <Calendar className="w-12 h-12 opacity-30" />
          </div>
          <div className="bg-[#0284C7] py-1.5 flex justify-center items-center text-xs hover:bg-[#0369A1] cursor-pointer transition-colors">
            More info <ArrowRight className="w-3 h-3 ml-1" />
          </div>
        </div>

        {/* Card 3 - Purple */}
        <div className="bg-[#818CF8] rounded-lg shadow-sm text-white overflow-hidden flex flex-col">
          <div className="p-4 flex justify-between items-start flex-1">
            <div>
              <h3 className="text-4xl font-bold">300</h3>
              <p className="text-xs font-medium mt-1 uppercase">Selesai Produksi</p>
            </div>
            <CheckCircle className="w-12 h-12 opacity-30" />
          </div>
          <div className="bg-[#4F46E5] py-1.5 flex justify-center items-center text-xs hover:bg-[#4338CA] cursor-pointer transition-colors">
            More info <ArrowRight className="w-3 h-3 ml-1" />
          </div>
        </div>

        {/* Card 4 - Orange */}
        <div className="bg-[#F97316] rounded-lg shadow-sm text-white overflow-hidden flex flex-col">
          <div className="p-4 flex justify-between items-start flex-1">
            <div>
              <h3 className="text-4xl font-bold">20</h3>
              <p className="text-xs font-medium mt-1 uppercase">Total Gangguan</p>
            </div>
            <Layers className="w-12 h-12 opacity-30" />
          </div>
          <div className="bg-[#C2410C] py-1.5 flex justify-center items-center text-xs hover:bg-[#9A3412] cursor-pointer transition-colors">
            More info <ArrowRight className="w-3 h-3 ml-1" />
          </div>
        </div>

        {/* Card 5 - Red */}
        <div className="bg-[#EF4444] rounded-lg shadow-sm text-white overflow-hidden flex flex-col">
          <div className="p-4 flex justify-between items-start flex-1">
            <div>
              <h3 className="text-4xl font-bold">100</h3>
              <p className="text-xs font-medium mt-1 uppercase">Total Mesin Off</p>
            </div>
            <Frown className="w-12 h-12 opacity-30" />
          </div>
          <div className="bg-[#B91C1C] py-1.5 flex justify-center items-center text-xs hover:bg-[#991B1B] cursor-pointer transition-colors">
            More info <ArrowRight className="w-3 h-3 ml-1" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Chart 1: OEE Tahunan */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800 text-sm">OEE This year</h4>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">FBF 1-6</span>
          </div>
          <div className="relative w-48 h-24 mb-4">
            <div className="absolute w-48 h-48 rounded-full border-[24px] border-gray-100 border-t-emerald-500 border-l-emerald-500 transform rotate-45 top-0 left-0"></div>
            <div className="absolute bottom-0 w-full text-center">
              <span className="text-3xl font-bold text-gray-800">50%</span>
              <p className="text-xs text-gray-500">-16% (-24%)</p>
            </div>
          </div>
          <div className="flex justify-between w-full mt-auto px-4 text-center">
            <div>
              <div className="w-12 h-6 border-t-[6px] border-blue-500 rounded-t-full mx-auto mb-1"></div>
              <p className="text-[10px] text-gray-500 font-bold">AVAILABILITY</p>
              <p className="text-sm font-bold">55%</p>
            </div>
            <div>
              <div className="w-12 h-6 border-t-[6px] border-orange-500 rounded-t-full mx-auto mb-1"></div>
              <p className="text-[10px] text-gray-500 font-bold">PERFORMANCE</p>
              <p className="text-sm font-bold">93%</p>
            </div>
            <div>
              <div className="w-12 h-6 border-t-[6px] border-emerald-500 rounded-t-full mx-auto mb-1"></div>
              <p className="text-[10px] text-gray-500 font-bold">QUALITY</p>
              <p className="text-sm font-bold">99%</p>
            </div>
          </div>
        </div>

        {/* Chart 2: OEE Last 30 Days (Donut) */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800 text-sm">OEE Last 30 days</h4>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">FBF 1-6</span>
          </div>
          <div className="relative w-48 h-24 mb-4">
            <div className="absolute w-48 h-48 rounded-full border-[24px] border-gray-100 border-t-orange-500 border-l-orange-500 transform rotate-[60deg] top-0 left-0"></div>
            <div className="absolute bottom-0 w-full text-center">
              <span className="text-3xl font-bold text-gray-800">51%</span>
              <p className="text-xs text-gray-500">+2% (-3%)</p>
            </div>
          </div>
           <div className="flex justify-between w-full mt-auto px-4 text-center">
            <div>
              <div className="w-12 h-6 border-t-[6px] border-blue-500 rounded-t-full mx-auto mb-1"></div>
              <p className="text-[10px] text-gray-500 font-bold">AVAILABILITY</p>
              <p className="text-sm font-bold">56%</p>
            </div>
            <div>
              <div className="w-12 h-6 border-t-[6px] border-orange-500 rounded-t-full mx-auto mb-1"></div>
              <p className="text-[10px] text-gray-500 font-bold">PERFORMANCE</p>
              <p className="text-sm font-bold">93%</p>
            </div>
            <div>
              <div className="w-12 h-6 border-t-[6px] border-emerald-500 rounded-t-full mx-auto mb-1"></div>
              <p className="text-[10px] text-gray-500 font-bold">QUALITY</p>
              <p className="text-sm font-bold">99%</p>
            </div>
          </div>
        </div>

        {/* Chart 3: OEE Last 30 Days (Bar) */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="w-full flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-800 text-sm">OEE Last 30 days</h4>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">FBF 1-6</span>
          </div>
          <div className="flex-1 relative flex items-end gap-1 h-40 border-l border-b border-gray-200 pb-1 pl-1">
             {[...Array(15)].map((_, i) => (
                <div key={i} className="flex-1 bg-gray-300 rounded-t-sm" style={{ height: `${Math.random() * 40 + 40}%` }}></div>
             ))}
             <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-blue-500 transform -rotate-6"></div>
          </div>
        </div>

        {/* Chart 4: Downtime Last 7 days */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="w-full flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800 text-sm">Downtime Last 7 days</h4>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">FBF 1-6</span>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-4">
             <div className="flex h-6 w-full">
                <div className="w-2/12 bg-red-500"></div>
                <div className="w-3/12 bg-yellow-400"></div>
                <div className="w-2/12 bg-blue-500"></div>
                <div className="w-1/12 bg-emerald-500"></div>
                <div className="w-3/12 bg-lime-500"></div>
             </div>
             <div className="flex h-6 w-11/12">
                <div className="w-1/12 bg-red-500"></div>
                <div className="w-4/12 bg-yellow-400"></div>
                <div className="w-2/12 bg-emerald-500"></div>
                <div className="w-1/12 bg-lime-500"></div>
             </div>
             <div className="flex h-6 w-full">
                <div className="w-3/12 bg-red-500"></div>
                <div className="w-2/12 bg-yellow-400"></div>
                <div className="w-3/12 bg-blue-500"></div>
                <div className="w-4/12 bg-lime-500"></div>
             </div>
          </div>
        </div>

        {/* Chart 5: Downtime Last 30 days */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="w-full flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800 text-sm">Downtime Last 30 days</h4>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">FBF 1-6 + CMF 1-6</span>
          </div>
           <div className="flex-1 flex flex-col justify-center space-y-4">
             <div className="flex h-6 w-10/12">
                <div className="w-4/12 bg-yellow-400"></div>
                <div className="w-3/12 bg-gray-400"></div>
                <div className="w-2/12 bg-blue-500"></div>
                <div className="w-1/12 bg-emerald-500"></div>
             </div>
             <div className="flex h-6 w-11/12">
                <div className="w-2/12 bg-yellow-400"></div>
                <div className="w-5/12 bg-gray-400"></div>
                <div className="w-1/12 bg-emerald-500"></div>
                <div className="w-2/12 bg-blue-500"></div>
             </div>
             <div className="flex h-6 w-9/12">
                <div className="w-3/12 bg-yellow-400"></div>
                <div className="w-4/12 bg-gray-400"></div>
                <div className="w-3/12 bg-blue-500"></div>
                <div className="w-1/12 bg-emerald-500"></div>
             </div>
          </div>
        </div>

        {/* Chart 6: OEE Last 12 months */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="w-full flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-800 text-sm">OEE Last 12 months</h4>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">Batch process,...</span>
          </div>
          <div className="flex-1 relative flex items-end gap-2 h-40 border-l border-b border-gray-200 pb-1 pl-1 pr-1">
             {[...Array(12)].map((_, i) => (
                <div key={i} className="flex-1 bg-gray-300 rounded-t-sm" style={{ height: `${Math.random() * 30 + 50}%` }}></div>
             ))}
             <div className="absolute top-1/3 left-0 w-full border-t border-dashed border-red-500 transform -rotate-3"></div>
          </div>
        </div>

      </div>
    </div>
  );
}