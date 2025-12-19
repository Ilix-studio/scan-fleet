import { Button } from "@/components/ui/button";
import { Play, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
              Safety + Simplicity
            </span>
          </div>

          {/* Enhanced Heading */}
          <div className='space-y-4'>
            <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight'>
              <span className='block text-white'> When Every Second</span>
              <span className='block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                Counts, Just Scan
              </span>
            </h1>
          </div>

          {/* Enhanced Subheading */}
          <p className='text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed'>
            {/* From road emergencies to customer support, ScanFleet QR stickers
            make it easy to reach the right person instantly. Share live GPS via
            WhatsApp, call the dealership, or alert nearby police/towing-truck —
            all with one scan. */}
            {/* Emergency-response connectivity platform : At Scan-Fleet, we connect
            vehicles, people, and emergency responders through smart
            scan-to-call technology — ensuring that help is never more than a
            scan away.  */}
            Emergencies don’t wait. Neither should help. Scan-Fleet enables
            instant scan-to-call access to vehicle owners or responders—cutting
            chaos, confusion, and response time when it matters most.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center pt-8'>
            <Link to='/login'>
              <Button className='relative group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200'>
                <span className='flex items-center gap-2'>
                  Log-In
                  <ArrowRight
                    size={20}
                    className='group-hover:translate-x-1 transition-transform duration-200'
                  />
                </span>
              </Button>
            </Link>
            <Button
              variant='outline'
              className='border-white/20 text-white hover:bg-white/10 bg-transparent px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-xl'
            >
              <Play size={20} className='mr-2' />
              View Demo
            </Button>
          </div>

          {/* Enhanced Hero Demo */}
          {/* Smart QR Code Card */}
          <div className='mt-20 relative'>
            <div className='relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto overflow-hidden'>
              {/* Glow Effect */}
              <div className='absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50'></div>

              <div className='relative grid md:grid-cols-2 gap-8 items-center'>
                {/* QR Sticker Visual */}
                <div className='relative'>
                  <div className='aspect-square max-w-xs mx-auto bg-black rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300'>
                    {/* QR Code Pattern */}
                    <div className='w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 relative'>
                      {/* Scanfleet Branding */}
                      <div className='absolute top-3 left-3 right-3 flex items-center justify-between'>
                        <span className='text-cyan-400 text-xs font-bold tracking-wider'>
                          SCANFLEET
                        </span>
                        <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                      </div>

                      {/* QR Code Placeholder */}
                      <div className='mt-6 aspect-square bg-white rounded-lg p-2'>
                        <div className='w-full h-full grid grid-cols-7 gap-0.5'>
                          {Array.from({ length: 49 }).map((_, i) => (
                            <div
                              key={i}
                              className={`aspect-square rounded-sm ${
                                [
                                  0, 1, 2, 6, 7, 8, 14, 21, 28, 35, 36, 37, 38,
                                  42, 43, 44, 48, 12, 13, 20, 27, 34, 40, 41,
                                  46, 47, 4, 10, 11, 17, 18, 24, 25, 31, 32,
                                ].includes(i)
                                  ? "bg-slate-900"
                                  : "bg-white"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Vehicle Info */}
                      <div className='mt-3 text-center'>
                        <p className='text-white/60 text-[10px] uppercase tracking-wider'>
                          Scan for Emergency
                        </p>
                        <p className='text-cyan-400 text-xs font-mono mt-1'>
                          AS-01-XX-0000
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Scan Animation Ring */}
                  <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                    <div className='w-64 h-64 border-2 border-cyan-400/30 rounded-full animate-ping'></div>
                  </div>
                </div>

                {/* Info Section */}
                <div className='space-y-6 text-center md:text-left'>
                  <div>
                    <span className='inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-medium mb-4'>
                      Smart QR Technology
                    </span>
                    <h3 className='text-2xl sm:text-3xl font-bold text-white mb-3'>
                      One Scan. Instant Connection.
                    </h3>
                    <p className='text-white/60 text-sm sm:text-base'>
                      Premium QR stickers that connect vehicles to emergency
                      services, dealerships, and family members in under 3
                      minutes.
                    </p>
                  </div>

                  {/* Features List */}
                  <div className='space-y-3'>
                    {[
                      { icon: "🚨", text: "Emergency contact in < 3 min" },
                      { icon: "🔒", text: "Masked calling for privacy" },
                      { icon: "📍", text: "Real-time location sharing" },
                      { icon: "🏪", text: "Direct dealership connection" },
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className='flex items-center gap-3 justify-center md:justify-start'
                      >
                        <span className='text-lg'>{feature.icon}</span>
                        <span className='text-white/80 text-sm'>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className='pt-4'>
                    <button className='px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/25'>
                      Get Your QR Sticker
                    </button>
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
