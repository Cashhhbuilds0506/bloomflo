"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedLotusLogo } from "@/components/animated-lotus-logo"
import { ParticleSystem } from "@/components/particle-system"
import { FloatingElements } from "@/components/floating-elements"
import { InteractiveBackground } from "@/components/interactive-background"
import {
  Heart,
  Users,
  BookOpen,
  MessageCircle,
  Calendar,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Brain,
  Lightbulb,
  Timer,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function ADHDWebsite() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [animatedElements, setAnimatedElements] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    setAnimatedElements(true)
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <InteractiveBackground />
      <FloatingElements />

      <div className="fixed inset-0 pointer-events-none z-5">
        <ParticleSystem particleCount={25} />
      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-l from-accent/5 to-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" aria-label="Go to homepage" className="flex items-center gap-3 group cursor-pointer">
              <AnimatedLotusLogo size="md" />
              <h1 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">neru</h1>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/resources"
                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
              >
                Resources
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/community"
                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
              >
                Community
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/tools"
                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
              >
                Tools
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/habits"
                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
              >
                Habits
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/focus-timer"
                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
              >
                Focus Timer
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/mindfulness"
                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
              >
                Mindfulness
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/assessment"
                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
              >
                Assessment
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/support"
                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
              >
                Support
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/support">
                <Button variant="outline" className="hover:scale-105 transition-transform duration-200 bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link href="/assessment">
                <Button className="hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 group">
            <div className="text-6xl opacity-20 animate-pulse hover:opacity-40 transition-opacity cursor-pointer">
              🌸
            </div>
            <div className="text-xs text-primary/60 font-mono absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 px-2 py-1 rounded backdrop-blur-sm">
              [BLOOM_FX]
            </div>
          </div>
          <div className="absolute top-40 right-20 group" style={{ animationDelay: "1s" }}>
            <div className="text-4xl opacity-20 animate-bounce hover:opacity-40 transition-opacity cursor-pointer">
              ✨
            </div>
            <div className="text-xs text-primary/60 font-mono absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 px-2 py-1 rounded backdrop-blur-sm">
              [SPARKLE_VFX]
            </div>
          </div>
          <div className="absolute bottom-20 left-1/4 group" style={{ animationDelay: "2s" }}>
            <div className="text-5xl opacity-20 animate-pulse hover:opacity-40 transition-opacity cursor-pointer">
              🌿
            </div>
            <div className="text-xs text-primary/60 font-mono absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 px-2 py-1 rounded backdrop-blur-sm">
              [GROWTH_FX]
            </div>
          </div>
          <div className="absolute top-60 right-1/3 group" style={{ animationDelay: "0.5s" }}>
            <div className="text-3xl opacity-20 animate-pulse hover:opacity-40 transition-opacity cursor-pointer">
              💫
            </div>
            <div className="text-xs text-primary/60 font-mono absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 px-2 py-1 rounded backdrop-blur-sm">
              [MAGIC_VFX]
            </div>
          </div>
          <div className="absolute top-32 left-1/2 group" style={{ animationDelay: "1.5s" }}>
            <div className="text-3xl opacity-15 animate-pulse hover:opacity-35 transition-opacity cursor-pointer">
              🧠
            </div>
            <div className="text-xs text-accent/60 font-mono absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 px-2 py-1 rounded backdrop-blur-sm">
              [NEURAL_VFX]
            </div>
          </div>
          <div className="absolute bottom-32 right-10 group" style={{ animationDelay: "0.8s" }}>
            <div className="text-4xl opacity-15 animate-bounce hover:opacity-35 transition-opacity cursor-pointer">
              ⚡
            </div>
            <div className="text-xs text-accent/60 font-mono absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 px-2 py-1 rounded backdrop-blur-sm">
              [ENERGY_VFX]
            </div>
          </div>
        </div>

        <div
          className={`container mx-auto text-center max-w-4xl relative z-10 transition-all duration-1000 ${animatedElements ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <Badge className="mb-4 bg-accent text-accent-foreground hover:scale-105 transition-transform duration-200 cursor-pointer">
            <Sparkles className="w-3 h-3 mr-1" />
            Supporting ADHD Community
          </Badge>
          <h2 className="text-5xl font-bold mb-6 text-foreground leading-tight">
            Navigate Life with ADHD
            <span className="text-primary block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              With Confidence & AI Support
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover AI-powered resources, connect with others, and find personalized tools designed specifically for
            the ADHD mind. Your journey to thriving starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/community">
              <Button
                size="lg"
                className="text-lg px-8 hover:scale-105 transition-all duration-200 bg-purple-600 hover:bg-purple-700 text-white group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Heart className="mr-2 h-5 w-5 group-hover:animate-pulse relative z-10" />
                Join Our Community
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </Button>
            </Link>
            <Link href="/assessment">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:scale-105 transition-all duration-200 group relative overflow-hidden"
              >
                <Brain className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform relative z-10" />
                Take AI Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="assessment" className="py-16 px-4 bg-gradient-to-r from-accent/10 to-primary/10 relative">
        <div className="absolute inset-0 pointer-events-none">
          <ParticleSystem particleCount={15} />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <AnimatedLotusLogo size="lg" className="mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4 text-foreground">AI-Powered ADHD Assessment</h3>
            <p className="text-lg text-muted-foreground">Personalized insights powered by advanced AI</p>
          </div>

          <Card className="hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center items-center gap-4 mb-4">
                <Brain className="h-12 w-12 text-primary animate-pulse" />
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <Lightbulb className="h-12 w-12 text-accent animate-bounce" />
              </div>
              <CardTitle className="text-2xl">Comprehensive ADHD Screening</CardTitle>
              <CardDescription className="text-base">
                Our AI analyzes your responses to provide personalized insights and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
                  <Timer className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold">5 Minutes</div>
                  <div className="text-sm text-muted-foreground">Quick Assessment</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer group">
                  <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold">AI Analysis</div>
                  <div className="text-sm text-muted-foreground">Personalized Results</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold">Action Plan</div>
                  <div className="text-sm text-muted-foreground">Custom Recommendations</div>
                </div>
              </div>

              <div className="text-center">
                <Link href="/assessment">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-3 text-lg group"
                  >
                    <Brain className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                    Start AI Assessment
                    <Sparkles className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section id="resources" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Everything You Need in One Place</h3>
            <p className="text-lg text-muted-foreground">Comprehensive support tailored for ADHD minds</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/resources" className="block">
              <Card
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border-2 hover:border-primary/20 relative overflow-hidden"
                onMouseEnter={() => setHoveredCard(0)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {hoveredCard === 0 && (
                  <div className="absolute inset-0 pointer-events-none">
                    <ParticleSystem particleCount={8} />
                  </div>
                )}
                <CardHeader>
                  <BookOpen
                    className={`h-10 w-10 text-primary mb-2 transition-all duration-300 ${hoveredCard === 0 ? "scale-110 rotate-12" : ""}`}
                  />
                  <CardTitle className="group-hover:text-primary transition-colors">Educational Resources</CardTitle>
                  <CardDescription>Evidence-based articles, guides, and research about ADHD</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Understanding ADHD symptoms
                    </li>
                    <li
                      className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
                      style={{ transitionDelay: "50ms" }}
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Coping strategies & techniques
                    </li>
                    <li
                      className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
                      style={{ transitionDelay: "100ms" }}
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Latest research findings
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link href="/community" className="block">
              <Card
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border-2 hover:border-primary/20"
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader>
                  <Users
                    className={`h-10 w-10 text-primary mb-2 transition-all duration-300 ${hoveredCard === 1 ? "scale-110 rotate-12" : ""}`}
                  />
                  <CardTitle className="group-hover:text-primary transition-colors">Support Community</CardTitle>
                  <CardDescription>Connect with others who understand your journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Peer support groups
                    </li>
                    <li
                      className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
                      style={{ transitionDelay: "50ms" }}
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Share experiences safely
                    </li>
                    <li
                      className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
                      style={{ transitionDelay: "100ms" }}
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Expert-moderated forums
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tools" className="block">
              <Card
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border-2 hover:border-primary/20"
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader>
                  <Calendar
                    className={`h-10 w-10 text-primary mb-2 transition-all duration-300 ${hoveredCard === 2 ? "scale-110 rotate-12" : ""}`}
                  />
                  <CardTitle className="group-hover:text-primary transition-colors">Productivity Tools</CardTitle>
                  <CardDescription>ADHD-friendly tools to help you stay organized</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Task management systems
                    </li>
                    <li
                      className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
                      style={{ transitionDelay: "50ms" }}
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Focus timers & reminders
                    </li>
                    <li
                      className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
                      style={{ transitionDelay: "100ms" }}
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Habit tracking tools
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link href="/support" className="block">
              <Card
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border-2 hover:border-primary/20"
                onMouseEnter={() => setHoveredCard(3)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader>
                  <MessageCircle
                    className={`h-10 w-10 text-primary mb-2 transition-all duration-300 ${hoveredCard === 3 ? "scale-110 rotate-12" : ""}`}
                  />
                  <CardTitle className="group-hover:text-primary transition-colors">Professional Support</CardTitle>
                  <CardDescription>Connect with ADHD specialists and therapists</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Find qualified professionals
                    </li>
                    <li
                      className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
                      style={{ transitionDelay: "50ms" }}
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Therapy resources
                    </li>
                    <li
                      className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
                      style={{ transitionDelay: "100ms" }}
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Medication guidance
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link href="/assessment" className="block">
              <Card
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border-2 hover:border-primary/20"
                onMouseEnter={() => setHoveredCard(4)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader>
                  <span
                    className={`text-4xl mb-2 inline-block transition-all duration-300 ${hoveredCard === 4 ? "scale-110 rotate-12" : ""}`}
                  >
                    🪷
                  </span>
                  <CardTitle className="group-hover:text-primary transition-colors">Self-Assessment</CardTitle>
                  <CardDescription>Interactive tools to better understand yourself</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      ADHD screening tools
                    </li>
                    <li
                      className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
                      style={{ transitionDelay: "50ms" }}
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Strength assessments
                    </li>
                    <li
                      className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
                      style={{ transitionDelay: "100ms" }}
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Progress tracking
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link href="/community" className="block">
              <Card
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border-2 hover:border-primary/20"
                onMouseEnter={() => setHoveredCard(5)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader>
                  <Star
                    className={`h-10 w-10 text-primary mb-2 transition-all duration-300 ${hoveredCard === 5 ? "scale-110 rotate-12" : ""}`}
                  />
                  <CardTitle className="group-hover:text-primary transition-colors">Success Stories</CardTitle>
                  <CardDescription>Inspiring stories from the ADHD community</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Real-life experiences
                    </li>
                    <li
                      className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
                      style={{ transitionDelay: "50ms" }}
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Overcoming challenges
                    </li>
                    <li
                      className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
                      style={{ transitionDelay: "100ms" }}
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Celebrating achievements
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group cursor-pointer">
              <div className="bg-card rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Target className="h-12 w-12 text-primary mx-auto mb-4 group-hover:rotate-12 transition-transform" />
                <div className="text-3xl font-bold text-foreground mb-2">10,000+</div>
                <div className="text-muted-foreground">Community Members</div>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-card rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4 group-hover:rotate-12 transition-transform" />
                <div className="text-3xl font-bold text-foreground mb-2">500+</div>
                <div className="text-muted-foreground">Resources Available</div>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-card rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4 group-hover:rotate-12 transition-transform" />
                <div className="text-3xl font-bold text-foreground mb-2">95%</div>
                <div className="text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 text-4xl opacity-20 animate-bounce" style={{ animationDelay: "0s" }}>
            🌟
          </div>
          <div
            className="absolute bottom-20 left-20 text-5xl opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            💝
          </div>
        </div>

        <div className="container mx-auto text-center max-w-3xl relative z-10">
          <h3 className="text-4xl font-bold mb-6 text-foreground">Ready to Start Your Journey?</h3>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Join thousands of others who have found support, understanding, and practical tools to thrive with ADHD.
            Your journey to better self-understanding starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/community">
              <Button
                size="lg"
                className="text-lg px-8 hover:scale-105 transition-all duration-200 bg-purple-600 hover:bg-purple-700 text-white group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Heart className="mr-2 h-5 w-5 group-hover:animate-pulse relative z-10" />
                Join Our Community
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </Button>
            </Link>
            <Link href="/resources">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:scale-105 transition-all duration-200 group relative overflow-hidden"
              >
                <BookOpen className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform relative z-10" />
                Browse Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <AnimatedLotusLogo size="sm" />
                <span className="font-bold text-foreground">neru</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering individuals with ADHD through AI-powered community, resources, and understanding.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/resources/getting-started" className="hover:text-primary transition-colors">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link href="/resources/adhd-basics" className="hover:text-primary transition-colors">
                    ADHD Basics
                  </Link>
                </li>
                <li>
                  <Link href="/resources/coping-strategies" className="hover:text-primary transition-colors">
                    Coping Strategies
                  </Link>
                </li>
                <li>
                  <Link href="/resources/research" className="hover:text-primary transition-colors">
                    Research
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/community/support-groups" className="hover:text-primary transition-colors">
                    Support Groups
                  </Link>
                </li>
                <li>
                  <Link href="/community/forums" className="hover:text-primary transition-colors">
                    Forums
                  </Link>
                </li>
                <li>
                  <Link href="/community/success-stories" className="hover:text-primary transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="/community/events" className="hover:text-primary transition-colors">
                    Events
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/support" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 neru. Made with care for the ADHD community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
