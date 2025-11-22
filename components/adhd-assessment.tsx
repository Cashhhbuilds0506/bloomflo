"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AnimatedLotusLogo } from "@/components/animated-lotus-logo"
import { ParticleSystem } from "@/components/particle-system"
import {
  Brain,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Target,
  TrendingUp,
  Lightbulb,
  Sparkles,
  BarChart3,
} from "lucide-react"

interface Question {
  id: number
  text: string
  category: "attention" | "hyperactivity" | "impulsivity" | "executive"
  options: { value: number; label: string }[]
}

interface AssessmentResult {
  overallScore: number
  categoryScores: {
    attention: number
    hyperactivity: number
    impulsivity: number
    executive: number
  }
  recommendations: string[]
  strengths: string[]
}

const questions: Question[] = [
  {
    id: 1,
    text: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
    category: "attention",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" },
    ],
  },
  {
    id: 2,
    text: "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
    category: "executive",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" },
    ],
  },
  {
    id: 3,
    text: "How often do you have problems remembering appointments or obligations?",
    category: "attention",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" },
    ],
  },
  {
    id: 4,
    text: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
    category: "hyperactivity",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" },
    ],
  },
  {
    id: 5,
    text: "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
    category: "hyperactivity",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" },
    ],
  },
  {
    id: 6,
    text: "How often do you make careless mistakes when you have to work on a boring or difficult project?",
    category: "attention",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" },
    ],
  },
  {
    id: 7,
    text: "How often do you interrupt others when they are talking?",
    category: "impulsivity",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" },
    ],
  },
  {
    id: 8,
    text: "How often do you have difficulty waiting your turn in situations when turn-taking is required?",
    category: "impulsivity",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" },
    ],
  },
  {
    id: 9,
    text: "How often do you have trouble sustaining your attention in tasks or fun activities?",
    category: "attention",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" },
    ],
  },
  {
    id: 10,
    text: "How often do you postpone or avoid tasks that require a lot of mental effort?",
    category: "executive",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" },
    ],
  },
]

export function ADHDAssessment() {
  const [currentStep, setCurrentStep] = useState<"intro" | "questions" | "results">("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [results, setResults] = useState<AssessmentResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const calculateResults = (): AssessmentResult => {
    const categoryTotals = {
      attention: 0,
      hyperactivity: 0,
      impulsivity: 0,
      executive: 0,
    }

    const categoryCounts = {
      attention: 0,
      hyperactivity: 0,
      impulsivity: 0,
      executive: 0,
    }

    questions.forEach((question) => {
      const answer = answers[question.id] || 0
      categoryTotals[question.category] += answer
      categoryCounts[question.category]++
    })

    const categoryScores = {
      attention: Math.round((categoryTotals.attention / (categoryCounts.attention * 4)) * 100),
      hyperactivity: Math.round((categoryTotals.hyperactivity / (categoryCounts.hyperactivity * 4)) * 100),
      impulsivity: Math.round((categoryTotals.impulsivity / (categoryCounts.impulsivity * 4)) * 100),
      executive: Math.round((categoryTotals.executive / (categoryCounts.executive * 4)) * 100),
    }

    const overallScore = Math.round(
      (categoryScores.attention +
        categoryScores.hyperactivity +
        categoryScores.impulsivity +
        categoryScores.executive) /
        4,
    )

    const recommendations = []
    const strengths = []

    if (categoryScores.attention > 60) {
      recommendations.push("Consider attention-focusing techniques like the Pomodoro method")
      recommendations.push("Break large tasks into smaller, manageable chunks")
    } else {
      strengths.push("Good sustained attention abilities")
    }

    if (categoryScores.hyperactivity > 60) {
      recommendations.push("Incorporate regular movement breaks into your routine")
      recommendations.push("Try fidget tools or standing desks for better focus")
    } else {
      strengths.push("Good self-regulation of physical activity")
    }

    if (categoryScores.impulsivity > 60) {
      recommendations.push("Practice mindfulness and pause-before-action techniques")
      recommendations.push("Use timers and reminders for important decisions")
    } else {
      strengths.push("Good impulse control and decision-making")
    }

    if (categoryScores.executive > 60) {
      recommendations.push("Use digital tools for organization and planning")
      recommendations.push("Create structured routines and checklists")
    } else {
      strengths.push("Strong organizational and planning skills")
    }

    if (overallScore < 30) {
      strengths.push("Overall strong self-management abilities")
      recommendations.push("Continue maintaining your current strategies")
    }

    return {
      overallScore,
      categoryScores,
      recommendations,
      strengths,
    }
  }

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setIsAnalyzing(true)
      setTimeout(() => {
        const result = calculateResults()
        setResults(result)
        setCurrentStep("results")
        setIsAnalyzing(false)
      }, 2000)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const startAssessment = () => {
    setCurrentStep("questions")
  }

  const restartAssessment = () => {
    setCurrentStep("intro")
    setCurrentQuestion(0)
    setAnswers({})
    setResults(null)
  }

  if (currentStep === "intro") {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <AnimatedLotusLogo size="lg" className="mx-auto" />
            <CardTitle className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ADHD Self-Assessment
            </CardTitle>
            <CardDescription className="text-lg">
              This scientifically-based assessment will help you understand your ADHD-related traits and provide
              personalized recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5">
                <Brain className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-semibold">Evidence-Based</div>
                  <div className="text-sm text-muted-foreground">Based on clinical research</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/5">
                <Target className="h-8 w-8 text-accent" />
                <div>
                  <div className="font-semibold">Personalized</div>
                  <div className="text-sm text-muted-foreground">Tailored recommendations</div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                This assessment takes about 5 minutes and covers four key areas: attention, hyperactivity, impulsivity,
                and executive function.
              </p>
              <Button
                size="lg"
                onClick={startAssessment}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-3 text-lg group"
              >
                <Brain className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "questions") {
    const question = questions[currentQuestion]
    const currentAnswer = answers[question.id]

    if (isAnalyzing) {
      return (
        <div className="max-w-2xl mx-auto p-6">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0">
              <ParticleSystem particleCount={20} />
            </div>
            <CardContent className="p-12 text-center space-y-6 relative z-10">
              <AnimatedLotusLogo size="lg" className="mx-auto" />
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Analyzing Your Responses</h3>
                <p className="text-muted-foreground">
                  Our AI is processing your answers to provide personalized insights...
                </p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="bg-primary/10">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
              <Badge variant="outline" className="bg-accent/10 capitalize">
                {question.category}
              </Badge>
            </div>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="text-xl leading-relaxed">{question.text}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={currentAnswer?.toString()}
              onValueChange={(value) => handleAnswer(Number.parseInt(value))}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                  <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer text-base">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={nextQuestion}
                disabled={currentAnswer === undefined}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "results" && results) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <AnimatedLotusLogo size="lg" className="mx-auto mb-4" />
            <CardTitle className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Your Assessment Results
            </CardTitle>
            <CardDescription className="text-lg">
              Based on your responses, here are your personalized insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{results.overallScore}%</div>
              <div className="text-lg text-muted-foreground">Overall ADHD Trait Score</div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Category Breakdown
                </h3>
                <div className="space-y-4">
                  {Object.entries(results.categoryScores).map(([category, score]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="capitalize font-medium">{category}</span>
                        <span className="text-primary font-semibold">{score}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Your Strengths
                </h3>
                <ul className="space-y-2">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Personalized Recommendations
              </h3>
              <ul className="space-y-3">
                {results.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                    <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Remember: This assessment is for informational purposes only and is not a diagnostic tool. For
                professional evaluation, please consult with a qualified healthcare provider.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={restartAssessment} variant="outline" size="lg">
                  Take Assessment Again
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  Explore Resources
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
