import { QrCode, Phone, Zap } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      icon: QrCode,
      title: "Dealership Buys Tags",
      description:
        "Purchase Scan-to-Call QR tags and cards. Display them on your vehicles or in your showroom.",
      details: "Simple ordering process with flexible quantities",
      gradient: "from-cyan-500 to-blue-600",
      bgGlow: "bg-cyan-500/20",
    },
    {
      number: 2,
      icon: Phone,
      title: "Customer Scans & Calls",
      description:
        "Customer scans the QR code with their phone. Instantly connected via Twilio call to your dealership.",
      details: "Direct connection, no intermediaries",
      gradient: "from-purple-500 to-pink-600",
      bgGlow: "bg-purple-500/20",
    },
    {
      number: 3,
      icon: Zap,
      title: "Recharge Tokens",
      description:
        "Each call uses one token. Recharge anytime using Razorpay. Pay only for what you use.",
      details: "Transparent, token-based pricing model",
      gradient: "from-orange-500 to-red-600",
      bgGlow: "bg-orange-500/20",
    },
  ];
  return (
    <section
      id='how-it-works'
      className='bg-white/1 backdrop-blur-xl border-t border-white/10 py-12'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-white'>
            How It Works
          </h2>
          <p className='text-white/90 text-lg max-w-2xl mx-auto'>
            Three simple steps to revolutionize your dealership communication
          </p>
        </div>

        {/* Steps Grid */}
        <div className='grid md:grid-cols-3 gap-8 mb-12'>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className='relative group'>
                {/* Glow Effect */}
                <div
                  className={`absolute -inset-1 ${step.bgGlow} rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                ></div>

                {/* Main Card */}
                <div className='relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2'>
                  {/* Step Number Badge */}
                  <div
                    className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                  >
                    {step.number}
                  </div>

                  {/* Icon Container */}
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={40} className='text-white' />
                  </div>

                  {/* Content */}
                  <h3 className='text-2xl font-bold mb-4 text-white'>
                    {step.title}
                  </h3>
                  <p className='text-white/90 mb-4 leading-relaxed'>
                    {step.description}
                  </p>
                  <div
                    className={`inline-block px-4 py-2 bg-gradient-to-r ${step.gradient} rounded-full text-white text-sm font-medium`}
                  >
                    {step.details}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Visualization */}
        <div className='relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-12'>
          {/* Background Glow */}
          <div className='absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-30'></div>

          <div className='relative'>
            <h3 className='text-3xl font-bold mb-12 text-center text-white'>
              The Complete Flow
            </h3>

            <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
              {/* Step 1 */}
              <div className='flex flex-col items-center group'>
                <div className='w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                  <QrCode size={40} className='text-white' />
                </div>
                <p className='text-lg font-semibold text-center text-white'>
                  Customer Scans QR
                </p>
              </div>

              {/* Arrow 1 */}
              <div className='hidden md:block w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full relative'>
                <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-purple-500 border-t-2 border-b-2 border-t-transparent border-b-transparent'></div>
              </div>

              {/* Step 2 */}
              <div className='flex flex-col items-center group'>
                <div className='w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                  <Phone size={40} className='text-white' />
                </div>
                <p className='text-lg font-semibold text-center text-white'>
                  Twilio Call Initiated
                </p>
              </div>

              {/* Arrow 2 */}
              <div className='hidden md:block w-16 h-1 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full relative'>
                <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-orange-500 border-t-2 border-b-2 border-t-transparent border-b-transparent'></div>
              </div>

              {/* Step 3 */}
              <div className='flex flex-col items-center group'>
                <div className='w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                  <Zap size={40} className='text-white' />
                </div>
                <p className='text-lg font-semibold text-center text-white'>
                  Token Deducted
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
