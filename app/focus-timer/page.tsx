import FocusTimer from "@/components/focus-timer"
import { AnimatedLotusLogo } from "@/components/animated-lotus-logo"
import { ParticleSystem } from "@/components/particle-system"
import { FloatingElements } from "@/components/floating-elements"

export default function FocusTimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
      <ParticleSystem />
      <FloatingElements />

      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AnimatedLotusLogo size={40} />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              neru
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Focus Timer - Boost your productivity with the Pomodoro Technique
          </p>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Timer Section */}
            <div className="mb-12">
              <FocusTimer />
            </div>

            {/* Information Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100">
                <h3 className="text-xl font-semibold mb-4 text-purple-700">How It Works</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    Work for 25 minutes with complete focus
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    Take a 5-minute break to recharge
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    After 4 cycles, enjoy a 15-30 minute long break
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-pink-100">
                <h3 className="text-xl font-semibold mb-4 text-pink-700">ADHD Benefits</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    Breaks tasks into manageable chunks
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    Provides structure and routine
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                    Reduces overwhelm and procrastination
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
