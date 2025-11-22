"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Settings } from "lucide-react"

interface TimerSettings {
  focusTime: number
  shortBreak: number
  longBreak: number
  longBreakInterval: number
}

type TimerMode = "focus" | "shortBreak" | "longBreak"

export default function FocusTimer() {
  const [settings, setSettings] = useState<TimerSettings>({
    focusTime: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
  })

  const [mode, setMode] = useState<TimerMode>("focus")
  const [timeLeft, setTimeLeft] = useState(settings.focusTime * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const getCurrentModeTime = () => {
    switch (mode) {
      case "focus":
        return settings.focusTime * 60
      case "shortBreak":
        return settings.shortBreak * 60
      case "longBreak":
        return settings.longBreak * 60
    }
  }

  const getModeTitle = () => {
    switch (mode) {
      case "focus":
        return "Focus Time"
      case "shortBreak":
        return "Short Break"
      case "longBreak":
        return "Long Break"
    }
  }

  const getModeColor = () => {
    switch (mode) {
      case "focus":
        return "from-purple-500 to-pink-500"
      case "shortBreak":
        return "from-green-500 to-teal-500"
      case "longBreak":
        return "from-blue-500 to-indigo-500"
    }
  }

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleTimerComplete()
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  const handleTimerComplete = () => {
    setIsRunning(false)

    // Play completion sound
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }

    if (mode === "focus") {
      const newCompletedSessions = completedSessions + 1
      setCompletedSessions(newCompletedSessions)

      // Determine next mode
      if (newCompletedSessions % settings.longBreakInterval === 0) {
        setMode("longBreak")
        setTimeLeft(settings.longBreak * 60)
      } else {
        setMode("shortBreak")
        setTimeLeft(settings.shortBreak * 60)
      }
    } else {
      setMode("focus")
      setTimeLeft(settings.focusTime * 60)
    }
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(getCurrentModeTime())
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((getCurrentModeTime() - timeLeft) / getCurrentModeTime()) * 100

  return (
    <div className="max-w-md mx-auto">
      <Card className="relative overflow-hidden border-0 shadow-2xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${getModeColor()} opacity-10`} />

        <CardHeader className="text-center relative z-10">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {getModeTitle()}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Session {completedSessions + 1} • {completedSessions} completed
          </p>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10">
          {/* Timer Display */}
          <div className="text-center">
            <div className="text-6xl font-bold font-mono bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {formatTime(timeLeft)}
            </div>
            <Progress value={progress} className="h-2 mb-4" />
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleTimer}
              size="lg"
              className={`bg-gradient-to-r ${getModeColor()} hover:opacity-90 text-white shadow-lg`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>

            <Button onClick={resetTimer} size="lg" variant="outline" className="shadow-lg bg-transparent">
              <RotateCcw className="w-5 h-5" />
            </Button>

            <Button onClick={() => setShowSettings(!showSettings)} size="lg" variant="outline" className="shadow-lg">
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* Mode Switcher */}
          <div className="flex gap-2">
            {(["focus", "shortBreak", "longBreak"] as TimerMode[]).map((timerMode) => (
              <Button
                key={timerMode}
                onClick={() => {
                  setMode(timerMode)
                  setTimeLeft(
                    timerMode === "focus"
                      ? settings.focusTime * 60
                      : timerMode === "shortBreak"
                        ? settings.shortBreak * 60
                        : settings.longBreak * 60,
                  )
                  setIsRunning(false)
                }}
                variant={mode === timerMode ? "default" : "outline"}
                size="sm"
                className="flex-1 text-xs"
              >
                {timerMode === "focus" ? "Focus" : timerMode === "shortBreak" ? "Short" : "Long"}
              </Button>
            ))}
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold">Timer Settings</h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Focus (min)</label>
                  <input
                    type="number"
                    value={settings.focusTime}
                    onChange={(e) => setSettings({ ...settings, focusTime: Number.parseInt(e.target.value) || 25 })}
                    className="w-full p-2 border rounded mt-1"
                    min="1"
                    max="60"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Short Break (min)</label>
                  <input
                    type="number"
                    value={settings.shortBreak}
                    onChange={(e) => setSettings({ ...settings, shortBreak: Number.parseInt(e.target.value) || 5 })}
                    className="w-full p-2 border rounded mt-1"
                    min="1"
                    max="30"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Long Break (min)</label>
                  <input
                    type="number"
                    value={settings.longBreak}
                    onChange={(e) => setSettings({ ...settings, longBreak: Number.parseInt(e.target.value) || 15 })}
                    className="w-full p-2 border rounded mt-1"
                    min="1"
                    max="60"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Long Break After</label>
                  <input
                    type="number"
                    value={settings.longBreakInterval}
                    onChange={(e) =>
                      setSettings({ ...settings, longBreakInterval: Number.parseInt(e.target.value) || 4 })
                    }
                    className="w-full p-2 border rounded mt-1"
                    min="2"
                    max="10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{completedSessions}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">
                {Math.floor((completedSessions * settings.focusTime) / 60)}h
              </div>
              <div className="text-xs text-muted-foreground">Focus Time</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">
                {Math.floor(completedSessions / settings.longBreakInterval)}
              </div>
              <div className="text-xs text-muted-foreground">Cycles</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hidden audio element for completion sound */}
      <audio ref={audioRef} preload="auto">
        <source
          src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
          type="audio/wav"
        />
      </audio>
    </div>
  )
}
