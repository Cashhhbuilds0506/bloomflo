import HabitTracker from "@/components/habit-tracker"
import { AnimatedLotusLogo } from "@/components/animated-lotus-logo"
import { ParticleSystem } from "@/components/particle-system"
import { FloatingElements } from "@/components/floating-elements"

export default function HabitsPage() {
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
            Habit Tracker - Build positive routines that support your ADHD journey
          </p>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <HabitTracker />
        </main>
      </div>
    </div>
  )
}
