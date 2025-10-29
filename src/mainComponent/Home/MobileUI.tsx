import { useState } from "react";
import {
  Phone,
  MessageCircle,
  Shield,
  Navigation,
  ArrowLeft,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileUI = () => {
  const [activeView, setActiveView] = useState("main");

  const vehicleData = {
    id: "SF-7428",
    plate: "MH12AB5678",
    variant: "Hyundai Creta SX Turbo",
    owner: "Registered Owner",
  };

  const handleCall = () => {
    console.log("Starting secure call");
  };

  const handleChat = () => {
    console.log("Opening chat interface");
  };

  const handleSOS = () => {
    setActiveView("emergency");
  };

  const callEmergency = (service: string) => {
    console.log(`Connecting to ${service}`);
  };

  if (activeView === "emergency") {
    return (
      <div className='w-80 mx-auto bg-gradient-to-br from-slate-900 to-slate-800 text-white'>
        {/* Status */}
        <div className='flex justify-between items-center p-4 text-sm'>
          <span>2:47 PM</span>
          <div className='flex gap-1'>
            <span>●●●○</span>
            <span>📶 🔋</span>
          </div>
        </div>

        {/* Header */}
        <div className='px-6 py-4 flex items-center gap-3'>
          <Button
            onClick={() => setActiveView("main")}
            variant='ghost'
            size='sm'
            className='text-white p-2'
          >
            <ArrowLeft size={18} />
          </Button>
          <h2 className='text-xl font-bold'>Emergency Services</h2>
        </div>

        {/* Services */}
        <div className='px-6 pb-8 space-y-3'>
          <div
            onClick={() => callEmergency("Police")}
            className='bg-blue-600 hover:bg-blue-700 p-4 rounded-xl flex items-center gap-4 cursor-pointer'
          >
            <div className='w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center'>
              <span className='font-bold'>100</span>
            </div>
            <div>
              <p className='font-semibold'>Police Helpline</p>
              <p className='text-sm text-blue-200'>Crime & safety assistance</p>
            </div>
          </div>

          <div
            onClick={() => callEmergency("Medical")}
            className='bg-red-600 hover:bg-red-700 p-4 rounded-xl flex items-center gap-4 cursor-pointer'
          >
            <div className='w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center'>
              <span className='font-bold'>108</span>
            </div>
            <div>
              <p className='font-semibold'>Medical Emergency</p>
              <p className='text-sm text-red-200'>
                Ambulance & health services
              </p>
            </div>
          </div>

          <div
            onClick={() => callEmergency("Roadside")}
            className='bg-amber-600 hover:bg-amber-700 p-4 rounded-xl flex items-center gap-4 cursor-pointer'
          >
            <div className='w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center'>
              <Zap size={20} className='text-white' />
            </div>
            <div>
              <p className='font-semibold'>Roadside Help</p>
              <p className='text-sm text-amber-200'>
                Breakdown & towing service
              </p>
            </div>
          </div>

          <div className='bg-emerald-900/50 border border-emerald-600 rounded-xl p-4 mt-6'>
            <div className='flex items-center gap-2'>
              <Navigation size={16} className='text-emerald-400' />
              <span className='text-sm font-medium text-emerald-300'>
                Location Tracking Active
              </span>
            </div>
            <p className='text-xs text-emerald-200 mt-1'>
              Emergency contacts notified via SMS with real-time GPS
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className='bg-white/1 backdrop-blur-xl border-t border-white/1 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-white'>
              Scan-to-Connect Experience
            </h2>
            <p className='text-white/70 text-lg max-w-2xl mx-auto'>
              See how ScanFleet's QR technology works in real-time. From vehicle
              identification to emergency response, experience the seamless
              connection between physical stickers and digital services.
            </p>
          </div>
        </div>

        <div className='w-80 mx-auto bg-white/5 text-white backdrop-blur-xl border-t border-white/10'>
          {/* Status Bar */}

          <div className='flex justify-between items-center p-4 text-sm'>
            <span>2:47 PM</span>
            <div className='flex gap-1'>
              <span>●●●○</span>
              <span>📶 🔋</span>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className='px-6 py-4'>
            <div className='flex items-center justify-between mb-3'>
              <h1 className='text-2xl font-bold'>
                ScanFleet<span className='text-cyan-400'>Connect</span>
              </h1>
              <div className='w-2 h-2 bg-green-400 rounded-full'></div>
            </div>

            <div className='bg-white/10 backdrop-blur rounded-xl p-4 space-y-2'>
              <p className='text-cyan-400 text-sm font-medium'>
                Vehicle ID: {vehicleData.id}
              </p>
              <p className='text-lg font-bold'>{vehicleData.plate}</p>
              <p className='text-sm text-gray-300'>{vehicleData.variant}</p>
              <p className='text-xs text-gray-400'>🔒 {vehicleData.owner}</p>
            </div>
          </div>

          {/* Actions */}
          <div className='px-6 pb-6'>
            <p className='text-gray-300 mb-6 text-sm'>Choose your action:</p>

            <div className='space-y-3 mb-6'>
              <button
                onClick={handleCall}
                className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-4 rounded-xl flex items-center gap-4'
              >
                <div className='w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center'>
                  <Phone size={20} />
                </div>
                <div className='text-left'>
                  <p className='font-semibold'>Secure Call</p>
                  <p className='text-sm text-blue-200'>
                    Direct contact with owner
                  </p>
                </div>
              </button>

              <button
                onClick={handleChat}
                className='w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 p-4 rounded-xl flex items-center gap-4'
              >
                <div className='w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center'>
                  <MessageCircle size={20} />
                </div>
                <div className='text-left'>
                  <p className='font-semibold'>Quick Message</p>
                  <p className='text-sm text-green-200'>
                    Send instant notification
                  </p>
                </div>
              </button>
            </div>

            <div className='border-t border-white/20 pt-4'>
              <p className='text-gray-400 text-xs mb-3'>
                Need emergency assistance or accident support?
              </p>
              <Button
                onClick={handleSOS}
                className='w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-3 rounded-xl font-semibold'
              >
                <Shield size={18} className='mr-2' />
                Emergency SOS
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MobileUI;
