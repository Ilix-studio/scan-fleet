import { QrCode, Phone, MessageCircle } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      icon: QrCode,
      title: "Generate Smart Stickers",
      description:
        "Dealers create QR stickers with vehicle info, emergency contacts, and owner details through the ScanFleet dashboard.",
      details: "B2B token-based generation",
      gradient: "from-cyan-500 to-blue-600",
      bgGlow: "bg-cyan-500/20",
    },
    {
      number: 2,
      icon: Phone,
      title: "Multi-Purpose Scanning",
      description:
        "Users scan QR code and choose: Call dealer, Emergency services like Private Ambulance/Notifiy Police, Share GPS location or Call Nearby Towing Car",
      details: "Twilio-powered instant calls",
      gradient: "from-purple-500 to-pink-600",
      bgGlow: "bg-purple-500/20",
    },
    {
      number: 3,
      icon: MessageCircle,
      title: "WhatsApp GPS Sharing",
      description:
        "Emergency mode auto-sends live location to family members via WhatsApp Business API for real-time safety.",
      details: "Family safety notifications",
      gradient: "from-green-500 to-emerald-600",
      bgGlow: "bg-green-500/20",
    },
  ];

  return (
    <section
      id='how-it-works'
      className='bg-white/1 backdrop-blur-xl border-t border-white/10 py-22'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-white'>
            How ScanFleet Works
          </h2>
          <p className='text-white/70 text-lg max-w-2xl mx-auto'>
            Four simple steps from dealer setup to emergency response
          </p>
        </div>

        {/* Steps Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className='relative group'>
                {/* Glow Effect */}
                <div
                  className={`absolute -inset-1 ${step.bgGlow} rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                ></div>

                {/* Main Card */}
                <div className='relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2'>
                  {/* Step Number Badge */}
                  <div
                    className={`absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                  >
                    {step.number}
                  </div>

                  {/* Icon Container */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={32} className='text-white' />
                  </div>

                  {/* Content */}
                  <h3 className='text-lg font-bold mb-3 text-white'>
                    {step.title}
                  </h3>
                  <p className='text-white/80 mb-3 text-sm leading-relaxed'>
                    {step.description}
                  </p>
                  <div
                    className={`inline-block px-3 py-1 bg-gradient-to-r ${step.gradient} rounded-full text-white text-xs font-medium`}
                  >
                    {step.details}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Complete Workflow Visualization */}
        <div className='relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-12'>
          {/* Background Glow */}
          <div className='absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-green-500/20 rounded-2xl blur-xl opacity-30'></div>

          <div className='relative'>
            <h3 className='text-3xl font-bold mb-12 text-center text-white'>
              Complete ScanFleet Workflow
            </h3>

            <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
              {/* Step 1: Scan */}
              <div className='flex flex-col items-center group'>
                <div className='w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                  <QrCode size={40} className='text-white' />
                </div>
                <p className='text-lg font-semibold text-center text-white'>
                  Scan QR Code
                </p>
                <p className='text-sm text-white/60 text-center'>
                  Vehicle/Emergency
                </p>
              </div>

              {/* Arrow 1 */}
              <div className='hidden md:block w-12 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full relative'>
                <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-3 border-l-purple-500 border-t-2 border-b-2 border-t-transparent border-b-transparent'></div>
              </div>

              {/* Step 2: Choose Action */}
              <div className='flex flex-col items-center group'>
                <div className='w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                  <Phone size={40} className='text-white' />
                </div>
                <p className='text-lg font-semibold text-center text-white'>
                  Choose Action
                </p>
                <p className='text-sm text-white/60 text-center'>
                  Call/Emergency/GPS
                </p>
              </div>

              {/* Arrow 2 */}
              <div className='hidden md:block w-12 h-1 bg-gradient-to-r from-purple-500 to-green-500 rounded-full relative'>
                <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-3 border-l-green-500 border-t-2 border-b-2 border-t-transparent border-b-transparent'></div>
              </div>

              {/* Step 3: Connect */}
              <div className='flex flex-col items-center group'>
                <div className='w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                  <MessageCircle size={40} className='text-white' />
                </div>
                <p className='text-lg font-semibold text-center text-white'>
                  WhatsApp GPS
                </p>
                <p className='text-sm text-white/60 text-center'>
                  Family Safety Alert
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
