import { Phone, Zap, CreditCard } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Recharge Tokens",
      description:
        "Buy tokens once, use them for multiple calls. Simple and transparent pricing model.",
      gradient: "from-yellow-400 to-orange-500",
      bgGlow: "bg-yellow-500/20",
    },
    {
      icon: Phone,
      title: "Secure Twilio Calls",
      description:
        "Direct, secure phone connections powered by Twilio. No intermediaries, just instant calls.",
      gradient: "from-green-400 to-emerald-500",
      bgGlow: "bg-green-500/20",
    },
    {
      icon: CreditCard,
      title: "Razorpay Integration",
      description:
        "Seamless payment processing with Razorpay. Recharge anytime, anywhere.",
      gradient: "from-blue-400 to-indigo-500",
      bgGlow: "bg-blue-500/20",
    },
  ];

  return (
    <section className='bg-white/1 backdrop-blur-xl border-t border-white/10 py-22'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-white'>
            Key Features
          </h2>
          <p className='text-white/70 text-lg max-w-2xl mx-auto'>
            Everything you need to revolutionize your dealership communication
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className='relative group'>
                {/* Glow Effect */}
                <div
                  className={`absolute -inset-1 ${feature.bgGlow} rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                ></div>

                {/* Card */}
                <div className='relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2'>
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={32} className='text-white' />
                  </div>

                  {/* Content */}
                  <h3 className='text-xl font-bold mb-3 text-white'>
                    {feature.title}
                  </h3>
                  <p className='text-white/70 leading-relaxed'>
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
