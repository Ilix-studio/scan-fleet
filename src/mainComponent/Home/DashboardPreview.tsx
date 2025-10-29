import {
  BarChart3,
  Phone,
  Zap,
  TrendingUp,
  Shield,
  MessageCircle,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardPreview = () => {
  return (
    <section id='dashboard' className='py-20 sm:py-32'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-white'>
            ScanFleet Dealer Dashboard
          </h2>
          <p className='text-white/70 text-lg max-w-2xl mx-auto'>
            Manage smart stickers, track emergency calls, monitor GPS shares,
            and analyze usage from one powerful dashboard
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden mb-12'>
          {/* Dashboard Header */}
          <div className='bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-white/10 p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-xl font-bold text-white'>
                  ScanFleet Dashboard
                </h3>
                <p className='text-sm text-white/60'>
                  Welcome back, Auto Dealer Pro
                </p>
              </div>
              <div className='text-right'>
                <p className='text-sm text-white/60'>Last updated</p>
                <p className='text-sm font-medium text-white'>2 minutes ago</p>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className='p-8'>
            {/* Stats Grid */}
            <div className='grid md:grid-cols-4 gap-6 mb-8'>
              {/* Token Balance */}
              <div className='bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10'>
                <div className='flex items-center justify-between mb-2'>
                  <p className='text-sm text-white/70'>Token Balance</p>
                  <Zap size={20} className='text-yellow-400' />
                </div>
                <p className='text-3xl font-bold text-white'>2,450</p>
                <p className='text-xs text-white/60 mt-2'>Tokens available</p>
              </div>

              {/* Smart Stickers */}
              <div className='bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10'>
                <div className='flex items-center justify-between mb-2'>
                  <p className='text-sm text-white/70'>Smart Stickers</p>
                  <BarChart3 size={20} className='text-cyan-400' />
                </div>
                <p className='text-3xl font-bold text-white'>156</p>
                <p className='text-xs text-white/60 mt-2'>
                  Active across fleet
                </p>
              </div>

              {/* Emergency Calls */}
              <div className='bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10'>
                <div className='flex items-center justify-between mb-2'>
                  <p className='text-sm text-white/70'>Emergency Calls</p>
                  <Shield size={20} className='text-red-400' />
                </div>
                <p className='text-3xl font-bold text-white'>23</p>
                <p className='text-xs text-white/60 mt-2'>This month</p>
              </div>

              {/* GPS Shares */}
              <div className='bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10'>
                <div className='flex items-center justify-between mb-2'>
                  <p className='text-sm text-white/70'>GPS Shares</p>
                  <MessageCircle size={20} className='text-green-400' />
                </div>
                <p className='text-3xl font-bold text-white'>189</p>
                <p className='text-xs text-white/60 mt-2'>
                  WhatsApp alerts sent
                </p>
              </div>
            </div>

            {/* Activity Breakdown */}
            <div className='grid md:grid-cols-3 gap-6 mb-8'>
              <div className='bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10'>
                <h4 className='font-semibold text-white mb-4 flex items-center gap-2'>
                  <Phone size={16} className='text-blue-400' />
                  Dealer Calls
                </h4>
                <p className='text-2xl font-bold text-white mb-2'>1,234</p>
                <p className='text-xs text-white/60'>
                  Sales & Service inquiries
                </p>
              </div>

              <div className='bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10'>
                <h4 className='font-semibold text-white mb-4 flex items-center gap-2'>
                  <AlertTriangle size={16} className='text-red-400' />
                  Emergency Services
                </h4>
                <p className='text-2xl font-bold text-white mb-2'>23</p>
                <p className='text-xs text-white/60'>Police, Ambulance, Fire</p>
              </div>

              <div className='bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10'>
                <h4 className='font-semibold text-white mb-4 flex items-center gap-2'>
                  <MapPin size={16} className='text-green-400' />
                  Family Alerts
                </h4>
                <p className='text-2xl font-bold text-white mb-2'>189</p>
                <p className='text-xs text-white/60'>GPS location shared</p>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className='border border-white/10 rounded-lg overflow-hidden'>
              <div className='bg-white/5 px-6 py-4 border-b border-white/10'>
                <h4 className='font-semibold text-white'>Recent Activity</h4>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead className='bg-white/5 border-b border-white/10'>
                    <tr>
                      <th className='px-6 py-3 text-left font-medium text-white/70'>
                        Time
                      </th>
                      <th className='px-6 py-3 text-left font-medium text-white/70'>
                        Sticker ID
                      </th>
                      <th className='px-6 py-3 text-left font-medium text-white/70'>
                        Action Type
                      </th>
                      <th className='px-6 py-3 text-left font-medium text-white/70'>
                        Duration/Status
                      </th>
                      <th className='px-6 py-3 text-left font-medium text-white/70'>
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        time: "2:45 PM",
                        sticker: "SF-001",
                        type: "Emergency Call",
                        status: "Police: 3m 24s",
                        location: "MG Road, Bangalore",
                        color: "text-red-400",
                      },
                      {
                        time: "1:30 PM",
                        sticker: "SF-015",
                        type: "GPS Share",
                        status: "WhatsApp Sent",
                        location: "Electronic City",
                        color: "text-green-400",
                      },
                      {
                        time: "12:15 PM",
                        sticker: "SF-008",
                        type: "Dealer Call",
                        status: "Sales: 5m 12s",
                        location: "Koramangala",
                        color: "text-blue-400",
                      },
                      {
                        time: "11:20 AM",
                        sticker: "SF-023",
                        type: "Emergency Call",
                        status: "Ambulance: 2m 08s",
                        location: "HSR Layout",
                        color: "text-red-400",
                      },
                    ].map((log, index) => (
                      <tr
                        key={index}
                        className='border-b border-white/10 hover:bg-white/5 transition-colors'
                      >
                        <td className='px-6 py-4 text-white/80'>{log.time}</td>
                        <td className='px-6 py-4 font-medium text-white'>
                          {log.sticker}
                        </td>
                        <td className='px-6 py-4'>
                          <span className={`${log.color} font-medium`}>
                            {log.type}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-white/80'>
                          {log.status}
                        </td>
                        <td className='px-6 py-4 text-white/60 text-xs'>
                          {log.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Analytics Card */}
        <div className='grid md:grid-cols-2 gap-8 mb-12'>
          <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8'>
            <h3 className='text-xl font-bold text-white mb-6 flex items-center gap-3'>
              <Shield size={24} className='text-red-400' />
              Emergency Response Analytics
            </h3>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-white/70'>Police Calls (100)</span>
                <span className='text-white font-semibold'>15</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-white/70'>Ambulance Calls (108)</span>
                <span className='text-white font-semibold'>8</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-white/70'>Average Response Time</span>
                <span className='text-green-400 font-semibold'>3m 24s</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-white/70'>Family Notifications</span>
                <span className='text-white font-semibold'>189</span>
              </div>
            </div>
          </div>

          <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8'>
            <h3 className='text-xl font-bold text-white mb-6 flex items-center gap-3'>
              <TrendingUp size={24} className='text-cyan-400' />
              Usage Insights
            </h3>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-white/70'>Most Active Sticker</span>
                <span className='text-cyan-400 font-semibold'>SF-008</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-white/70'>Peak Usage Time</span>
                <span className='text-white font-semibold'>2-4 PM</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-white/70'>Monthly Growth</span>
                <span className='text-green-400 font-semibold'>+23%</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-white/70'>Token Efficiency</span>
                <span className='text-white font-semibold'>92.5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-2xl text-center'>
          <h3 className='text-2xl font-bold mb-4 text-white'>
            Ready to Enhance Vehicle Safety?
          </h3>
          <p className='text-white/70 mb-6 max-w-2xl mx-auto'>
            Access your ScanFleet dealer portal, manage smart stickers, track
            emergency responses, and monitor GPS sharing in real-time.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button className='bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 px-8 py-3 rounded-xl'>
              Access Dashboard
            </Button>
            <Button
              variant='outline'
              className='border-white/20 text-white hover:bg-white/10 bg-transparent px-8 py-3 rounded-xl'
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
