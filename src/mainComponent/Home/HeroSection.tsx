import { Button } from "@/components/ui/button";
import { Play, Sparkles, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className='relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center space-y-8'>
          {/* Enhanced Badge */}
          <div className='inline-block relative'>
            <div className='absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur opacity-30'></div>
            <span className='relative px-6 py-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white text-sm font-medium flex items-center gap-2'>
              <Sparkles size={16} className='text-cyan-400' />
              Revolutionize Dealership Communication
            </span>
          </div>

          {/* Enhanced Heading */}
          <div className='space-y-4'>
            <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight'>
              <span className='block text-white'>Scan-to-Call Tags for</span>
              <span className='block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                Modern Dealerships
              </span>
            </h1>
          </div>

          {/* Enhanced Subheading */}
          <p className='text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed'>
            Connect customers instantly with a simple QR scan. Powered by Twilio
            calls and Razorpay payments. Recharge tokens on demand.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center pt-8'>
            <Button className='relative group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200'>
              <span className='flex items-center gap-2'>
                Get Started
                <ArrowRight
                  size={20}
                  className='group-hover:translate-x-1 transition-transform duration-200'
                />
              </span>
            </Button>
            <Button
              variant='outline'
              className='border-white/20 text-white hover:bg-white/10 bg-transparent px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-xl'
            >
              <Play size={20} className='mr-2' />
              View Demo
            </Button>
          </div>

          {/* Enhanced Hero Demo */}
          <div className='mt-20 relative'>
            <div className='relative bg-white/1 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto'>
              {/* Glow Effect */}
              <div className='absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50'></div>

              <div className='relative aspect-video bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center'>
                <div className='text-center space-y-4'>
                  <div className='relative'>
                    <div className='w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg'>
                      <Play size={48} className='text-white fill-white ml-1' />
                    </div>
                    <div className='absolute -inset-2 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full blur opacity-30'></div>
                  </div>
                  <div>
                    <p className='text-white font-semibold text-lg mb-2'>
                      Interactive QR Tag Demo
                    </p>
                    <p className='text-white/60 text-sm'>
                      See how customers connect instantly
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className='absolute top-10 left-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-pulse'></div>
            <div className='absolute bottom-10 right-10 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000'></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
