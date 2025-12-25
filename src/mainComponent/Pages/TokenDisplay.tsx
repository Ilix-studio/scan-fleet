import type React from "react";

import { useState } from "react";
import { Wallet, Zap, Gift, Copy, Check, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TokenDisplay() {
  const [referenceCode, setReferenceCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyToken = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReferenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (referenceCode.trim()) {
      console.log("Reference code submitted:", referenceCode);
      setReferenceCode("");
    }
  };

  return (
    <div className='min-h-screen w-full relative bg-black py-12 px-4'>
      {/* Aurora Background */}
      <div
        className='absolute inset-0 z-0'
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255, 20, 147, 0.15), transparent 50%),
            radial-gradient(ellipse 160% 130% at 10% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
            radial-gradient(ellipse 160% 130% at 90% 90%, rgba(138, 43, 226, 0.18), transparent 65%),
            radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
            #000000
          `,
        }}
      />

      {/* Content */}
      <div className='relative z-10 max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
            ScanFleet Tokens
          </h1>
          <p className='text-white/70 text-lg max-w-2xl mx-auto'>
            Your digital currency for smart sticker management
          </p>
        </div>

        {/* Main Grid */}
        <div className='grid lg:grid-cols-3 gap-8 mb-12'>
          {/* Token Explanation */}
          <div className='lg:col-span-1'>
            <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full'>
              <div className='flex items-center gap-3 mb-6'>
                <Zap className='text-cyan-400' size={28} />
                <h2 className='text-2xl font-bold text-white'>
                  What are Tokens?
                </h2>
              </div>

              <div className='space-y-4 text-sm'>
                <div className='bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4'>
                  <p className='text-cyan-400 font-semibold mb-2'>
                    Token Value
                  </p>
                  <p className='text-white'>1 Token = ₹300</p>
                </div>

                <div className='bg-purple-500/10 border border-purple-500/20 rounded-lg p-4'>
                  <p className='text-purple-400 font-semibold mb-2'>
                    Smart Stickers Included
                  </p>
                  <p className='text-white'>
                    6 Stickers per plan with lifetime validity
                  </p>
                </div>

                <div className='bg-white/5 border border-white/10 rounded-lg p-4'>
                  <p className='font-semibold mb-2 text-white'>How It Works</p>
                  <ul className='space-y-2 text-white/70'>
                    <li>• Use tokens to fill customer details</li>
                    <li>• Each form submission = 1 token</li>
                    <li>• Never expires</li>
                    <li>• Recharge anytime</li>
                  </ul>
                </div>

                <div className='bg-cyan-500/5 border border-cyan-500/30 rounded-lg p-4'>
                  <p className='font-semibold text-cyan-400 mb-2'>
                    Recommend to your friend
                  </p>
                  <p className='text-white/80 text-xs'>
                    Get 100 rupees worth of redeem on your next purchase
                  </p>
                  <br />
                  {/* Info Box with Share */}
                  <div className='bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm text-white/70'>
                        <span className='font-semibold text-cyan-400'>
                          💡 Tip:
                        </span>{" "}
                        Share your referral link to earn bonus tokens!
                      </p>
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          const referralLink = `${
                            window.location.origin
                          }/signup?ref=${encodeURIComponent("USER_REF_CODE")}`;
                          navigator.clipboard.writeText(referralLink);
                          // Optionally show toast notification
                        }}
                        className='border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent ml-4 shrink-0'
                      >
                        <Copy size={14} className='mr-1' />
                        Copy Link
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Card & Token Display */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Wallet Card */}
            <div className='relative'>
              <div className='absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50' />
              <div className='relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8'>
                <div className='flex items-center justify-between mb-8'>
                  <div className='flex items-center gap-3'>
                    <Wallet className='text-cyan-400' size={32} />
                    <div>
                      <p className='text-sm text-white/60'>Your Token Wallet</p>
                      <h3 className='text-2xl font-bold text-white'>
                        ScanFleet Balance
                      </h3>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm text-white/60'>Available Tokens</p>
                    <p className='text-3xl font-bold text-cyan-400'>150</p>
                  </div>
                </div>

                {/* Token Value Breakdown */}
                <div className='grid grid-cols-3 gap-4 mb-8'>
                  <div className='bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 text-center'>
                    <p className='text-sm text-white/60 mb-1'>Token Value</p>
                    <p className='text-xl font-bold text-cyan-400'>₹300</p>
                  </div>
                  <div className='bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center'>
                    <p className='text-sm text-white/60 mb-1'>Wallet Worth</p>
                    <p className='text-xl font-bold text-purple-400'>₹45,000</p>
                  </div>
                  <div className='bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center'>
                    <p className='text-sm text-white/60 mb-1'>Smart Stickers</p>
                    <p className='text-xl font-bold text-green-400'>6</p>
                  </div>
                </div>

                {/* Wallet Details */}
                <div className='border-t border-white/10 pt-6'>
                  <div className='space-y-3 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-white/60'>Used Tokens</span>
                      <span className='font-semibold text-white'>50</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-white/60'>Remaining</span>
                      <span className='font-semibold text-cyan-400'>150</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-white/60'>Sticker Validity</span>
                      <span className='font-semibold text-green-400'>
                        Lifetime
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className='mt-4'>
                    <div className='flex justify-between mb-2'>
                      <span className='text-xs text-white/60'>Token Usage</span>
                      <span className='text-xs font-semibold text-white'>
                        25%
                      </span>
                    </div>
                    <div className='w-full h-2 bg-white/10 rounded-full overflow-hidden'>
                      <div className='h-full w-1/4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full' />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='grid grid-cols-2 gap-4 mt-8'>
                  <Button
                    onClick={handleCopyToken}
                    variant='outline'
                    className='border-white/20 text-white hover:bg-white/10 bg-transparent flex items-center justify-center gap-2'
                  >
                    {copied ? (
                      <>
                        <Check size={18} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        Copy Details
                      </>
                    )}
                  </Button>
                  <Button className='bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0'>
                    Recharge Tokens
                  </Button>
                </div>
              </div>
            </div>

            {/* Reference Code Input */}
            <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8'>
              <div className='flex items-center gap-3 mb-6'>
                <QrCode className='text-pink-400' size={28} />
                <h3 className='text-2xl font-bold text-white'>
                  Paste Reference Code
                </h3>
              </div>

              <form onSubmit={handleReferenceSubmit} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium mb-3 text-white'>
                    Enter your reference code to edit stickers
                  </label>
                  <div className='flex gap-3'>
                    <input
                      type='text'
                      value={referenceCode}
                      onChange={(e) =>
                        setReferenceCode(e.target.value.toUpperCase())
                      }
                      placeholder='e.g., REF2024ABC123'
                      className='flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent'
                    />
                    <Button
                      type='submit'
                      disabled={!referenceCode.trim()}
                      className='bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 px-8 disabled:opacity-50'
                    >
                      Enter Code
                    </Button>
                  </div>
                </div>

                {/* Info Box */}
              </form>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-3 gap-6'>
          <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors'>
            <Zap className='text-cyan-400 mx-auto mb-3' size={24} />
            <h4 className='font-bold mb-2 text-white'>Fast & Instant</h4>
            <p className='text-sm text-white/60'>
              Tokens apply instantly to your forms
            </p>
          </div>
          <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors'>
            <Wallet className='text-purple-400 mx-auto mb-3' size={24} />
            <h4 className='font-bold mb-2 text-white'>Always Available</h4>
            <p className='text-sm text-white/60'>
              Never expire, use anytime you need
            </p>
          </div>
          <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors'>
            <Gift className='text-green-400 mx-auto mb-3' size={24} />
            <h4 className='font-bold mb-2 text-white'>Lifetime Validity</h4>
            <p className='text-sm text-white/60'>6 stickers valid forever</p>
          </div>
        </div>
      </div>
    </div>
  );
}
