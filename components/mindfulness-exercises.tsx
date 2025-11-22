"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Volume2, VolumeX, Heart, Wind, Leaf } from "lucide-react"

interface Exercise {
  id: string
  name: string
  description: string
  duration: number
  type: "breathing" | "meditation" | "grounding"
  instructions: string[]
  breathPattern?: {
    inhale: number
    hold: number
    exhale: number
    pause: number
  }
}

const exercises: Exercise[] = [
  {
    id: "1",
    name: "4-7-8 Breathing",
    description: "Calming breath technique for anxiety and focus",
    duration: 240,
    type: "breathing",
    instructions: [
      "Sit comfortably with your back straight",
      "Place tongue tip behind upper front teeth",
      "Exhale completely through your mouth",
      "Inhale through nose for 4 counts",
      "Hold breath for 7 counts",
      "Exhale through mouth for 8 counts",
    ],
    breathPattern: { inhale: 4, hold: 7, exhale: 8, pause: 1 },
  },
  {
    id: "2",
    name: "Box Breathing",
    description: "Equal-count breathing for stress relief",
    duration: 300,
    type: "breathing",
    instructions: [
      "Sit in a comfortable position",
      "Breathe out slowly through your mouth",
      "Inhale through nose for 4 counts",
      "Hold breath for 4 counts",
      "Exhale through mouth for 4 counts",
      "Hold empty for 4 counts",
    ],
    breathPattern: { inhale: 4, hold: 4, exhale: 4, pause: 4 },
  },
  {
    id: "3",
    name: "Body Scan Meditation",
    description: "Progressive relaxation and awareness",
    duration: 600,
    type: "meditation",
    instructions: [
      "Lie down or sit comfortably",
      "Close your eyes and breathe naturally",
      "Start with your toes, notice any sensations",
      "Slowly move attention up through your body",
      "Notice without judgment, just observe",
      "End at the top of your head",
    ],
  },
  {
    id: "4",
    name: "5-4-3-2-1 Grounding",
    description: "Sensory grounding for overwhelming moments",
    duration: 180,
    type: "grounding",
    instructions: [
      "Name 5 things you can see",
      "Name 4 things you can touch",
      "Name 3 things you can hear",
      "Name 2 things you can smell",
      "Name 1 thing you can taste",
      "Take three deep breaths",
    ],
  },
]

const typeColors = {
  breathing: "from-blue-500 to-cyan-500",
  meditation: "from-purple-500 to-violet-500",
  grounding: "from-green-500 to-emerald-500",
}

const typeIcons = {
  breathing: Wind,
  meditation: Heart,
  grounding: Leaf,
}

export default function MindfulnessExercises() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentPhase, setCurrentPhase] = useState<"inhale" | "hold" | "exhale" | "pause">("inhale")
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(0)
  const [currentInstruction, setCurrentInstruction] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [completedSessions, setCompletedSessions] = useState(0)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const phaseIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setTimeLeft(exercise.duration)
    setCurrentInstruction(0)
    setIsActive(true)

    if (exercise.breathPattern) {
      setCurrentPhase("inhale")
      setPhaseTimeLeft(exercise.breathPattern.inhale)
    }
  }

  const toggleExercise = () => {
    setIsActive(!isActive)
  }

  const resetExercise = () => {
    setIsActive(false)
    if (selectedExercise) {
      setTimeLeft(selectedExercise.duration)
      setCurrentInstruction(0)
      if (selectedExercise.breathPattern) {
        setCurrentPhase("inhale")
        setPhaseTimeLeft(selectedExercise.breathPattern.inhale)
      }
    }
  }

  const stopExercise = () => {
    setIsActive(false)
    setSelectedExercise(null)
    setTimeLeft(0)
    setCurrentInstruction(0)
  }

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false)
            setCompletedSessions((prev) => prev + 1)
            if (soundEnabled && audioRef.current) {
              audioRef.current.play().catch(() => {})
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
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
  }, [isActive, timeLeft, soundEnabled])

  useEffect(() => {
    if (isActive && selectedExercise?.breathPattern && phaseTimeLeft > 0) {
      phaseIntervalRef.current = setInterval(() => {
        setPhaseTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            const pattern = selectedExercise.breathPattern!
            switch (currentPhase) {
              case "inhale":
                setCurrentPhase("hold")
                return pattern.hold
              case "hold":
                setCurrentPhase("exhale")
                return pattern.exhale
              case "exhale":
                setCurrentPhase("pause")
                return pattern.pause
              case "pause":
                setCurrentPhase("inhale")
                return pattern.inhale
            }
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (phaseIntervalRef.current) {
        clearInterval(phaseIntervalRef.current)
      }
    }

    return () => {
      if (phaseIntervalRef.current) {
        clearInterval(phaseIntervalRef.current)
      }
    }
  }, [isActive, selectedExercise, currentPhase, phaseTimeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case "inhale":
        return "Breathe In"
      case "hold":
        return "Hold"
      case "exhale":
        return "Breathe Out"
      case "pause":
        return "Pause"
    }
  }

  const getBreathingCircleScale = () => {
    if (!selectedExercise?.breathPattern) return 1

    const pattern = selectedExercise.breathPattern
    const totalPhaseTime = pattern[currentPhase]
    const progress = (totalPhaseTime - phaseTimeLeft) / totalPhaseTime

    switch (currentPhase) {
      case "inhale":
        return 1 + progress * 0.5
      case "hold":
        return 1.5
      case "exhale":
        return 1.5 - progress * 0.5
      case "pause":
        return 1
      default:
        return 1
    }
  }

  if (selectedExercise) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="relative overflow-hidden border-0 shadow-2xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${typeColors[selectedExercise.type]} opacity-10`} />

          <CardHeader className="text-center relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Button onClick={stopExercise} variant="ghost" size="sm">
                ← Back
              </Button>
              <Button onClick={() => setSoundEnabled(!soundEnabled)} variant="ghost" size="sm">
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {selectedExercise.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{formatTime(timeLeft)} remaining</p>
          </CardHeader>

          <CardContent className="space-y-6 relative z-10">
            {/* Breathing Circle */}
            {selectedExercise.breathPattern && (
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${typeColors[selectedExercise.type]} opacity-20 transition-transform duration-1000 ease-in-out`}
                    style={{ transform: `scale(${getBreathingCircleScale()})` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground mb-2">{getPhaseInstruction()}</div>
                      <div className="text-lg text-muted-foreground">{phaseTimeLeft}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(((selectedExercise.duration - timeLeft) / selectedExercise.duration) * 100)}%</span>
              </div>
              <Progress
                value={((selectedExercise.duration - timeLeft) / selectedExercise.duration) * 100}
                className="h-2"
              />
            </div>

            {/* Instructions */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Instructions</h4>
              <div className="space-y-2">
                {selectedExercise.instructions.map((instruction, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-2 rounded transition-colors ${
                      index === currentInstruction ? "bg-primary/10 border-l-2 border-primary" : ""
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === currentInstruction ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <p className="text-sm">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={toggleExercise}
                size="lg"
                className={`bg-gradient-to-r ${typeColors[selectedExercise.type]} hover:opacity-90 text-white shadow-lg`}
              >
                {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              <Button onClick={resetExercise} size="lg" variant="outline" className="shadow-lg bg-transparent">
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hidden audio element */}
        <audio ref={audioRef} preload="auto">
          <source
            src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
            type="audio/wav"
          />
        </audio>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-200">
          <CardContent className="p-4 text-center">
            <Wind className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">
              {exercises.filter((e) => e.type === "breathing").length}
            </div>
            <div className="text-sm text-blue-600">Breathing Exercises</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-purple-200">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">
              {exercises.filter((e) => e.type === "meditation").length}
            </div>
            <div className="text-sm text-purple-600">Meditations</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-200">
          <CardContent className="p-4 text-center">
            <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{completedSessions}</div>
            <div className="text-sm text-green-600">Sessions Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Exercise Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {exercises.map((exercise) => {
          const IconComponent = typeIcons[exercise.type]
          return (
            <Card
              key={exercise.id}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-purple-200"
              onClick={() => startExercise(exercise)}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${typeColors[exercise.type]} flex items-center justify-center text-white`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {Math.floor(exercise.duration / 60)}min
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {exercise.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{exercise.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">What you'll do:</h4>
                  <ul className="space-y-1">
                    {exercise.instructions.slice(0, 3).map((instruction, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        {instruction}
                      </li>
                    ))}
                    {exercise.instructions.length > 3 && (
                      <li className="text-xs text-muted-foreground">
                        +{exercise.instructions.length - 3} more steps...
                      </li>
                    )}
                  </ul>
                </div>
                <Button
                  className={`w-full mt-4 bg-gradient-to-r ${typeColors[exercise.type]} hover:opacity-90 text-white`}
                  onClick={(e) => {
                    e.stopPropagation()
                    startExercise(exercise)
                  }}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Exercise
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Benefits Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-center">Benefits for ADHD</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wind className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Improved Focus</h4>
              <p className="text-sm text-muted-foreground">
                Breathing exercises help regulate attention and reduce distractibility
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Emotional Regulation</h4>
              <p className="text-sm text-muted-foreground">
                Mindfulness practices help manage emotional intensity and reactivity
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Stress Reduction</h4>
              <p className="text-sm text-muted-foreground">
                Grounding techniques provide immediate relief from overwhelming situations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
