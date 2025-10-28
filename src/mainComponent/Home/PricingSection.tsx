import { Button } from "@/components/ui/button";
import { Check, Package, Infinity, Home } from "lucide-react";

const PricingSection = () => {
  const features = [
    {
      icon: Package,
      title: "6 Sticker Tags",
      description: "Each token generates 6 high-quality QR sticker tags",
    },
    {
      icon: Infinity,
      title: "Unlimited Validity",
      description: "No expiration date. Use your tags forever",
    },
    {
      icon: Home,
      title: "Home Delivery",
      description: "Direct delivery to your doorstep within 5-7 days",
    },
  ];

  return (
    <section
      id='pricing'
      className='bg-white/1 backdrop-blur-xl border-t border-white/10 py-22'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-white'>
            Simple Token Pricing
          </h2>
          <p className='text-white/90 text-lg max-w-2xl mx-auto'>
            One token, six tags, unlimited validity. Get started instantly.
          </p>
        </div>

        {/* Main Pricing Card */}
        <div className='max-w-2xl mx-auto mb-16'>
          <div className='relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12'>
            {/* Glow Effect */}
            <div className='absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50'></div>

            <div className='relative text-center'>
              {/* Price */}
              <div className='mb-8'>
                <span className='text-6xl sm:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                  ₹354
                </span>
                <p className='text-white/90 text-xl mt-2'>per token</p>
                <p className='text-white/80 text-sm'>(₹300 + 18% GST)</p>
              </div>

              {/* Key Benefit */}
              <div className='bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 mb-8'>
                <p className='text-white font-semibold text-lg'>
                  1 Token = 6 QR Sticker Tags
                </p>
                <p className='text-white/60 text-sm mt-1'>
                  Unlimited validity • Home delivery included
                </p>
              </div>

              {/* CTA Button */}
              <Button className='bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200'>
                Order Now
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg'>
                  <Icon size={32} className='text-white' />
                </div>
                <h3 className='text-xl font-bold mb-2 text-white'>
                  {feature.title}
                </h3>
                <p className='text-white/90'>{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* How It Works */}
        <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-12'>
          <h3 className='text-2xl font-bold mb-8 text-center text-white'>
            How It Works
          </h3>
          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <h4 className='font-semibold mb-4 text-cyan-400'>
                Order Process
              </h4>
              <ul className='space-y-3 text-white/70'>
                <li className='flex items-start gap-3'>
                  <Check
                    size={20}
                    className='text-cyan-400 flex-shrink-0 mt-0.5'
                  />
                  <span>Purchase tokens online</span>
                </li>
                <li className='flex items-start gap-3'>
                  <Check
                    size={20}
                    className='text-cyan-400 flex-shrink-0 mt-0.5'
                  />
                  <span>Receive 6 QR sticker tags per token</span>
                </li>
                <li className='flex items-start gap-3'>
                  <Check
                    size={20}
                    className='text-cyan-400 flex-shrink-0 mt-0.5'
                  />
                  <span>Home delivery within 5-7 days</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4 text-purple-400'>Features</h4>
              <ul className='space-y-3 text-white/70'>
                <li className='flex items-start gap-3'>
                  <Check
                    size={20}
                    className='text-purple-400 flex-shrink-0 mt-0.5'
                  />
                  <span>High-quality waterproof stickers</span>
                </li>
                <li className='flex items-start gap-3'>
                  <Check
                    size={20}
                    className='text-purple-400 flex-shrink-0 mt-0.5'
                  />
                  <span>Unique QR codes for each tag</span>
                </li>
                <li className='flex items-start gap-3'>
                  <Check
                    size={20}
                    className='text-purple-400 flex-shrink-0 mt-0.5'
                  />
                  <span>No monthly fees or hidden charges</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
