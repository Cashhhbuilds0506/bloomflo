"use client"

import Link from "next/link"
import { AvatarSelector } from "@/components/avatar-selector"
import { AvatarDisplay } from "@/components/avatar-display"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedLotusLogo } from "@/components/animated-lotus-logo"
import { Badge } from "@/components/ui/badge"

const AVATARS = [
  { id: 1, emoji: "🧑", name: "Default" },
  { id: 2, emoji: "👨‍🦰", name: "Red Hair" },
  { id: 3, emoji: "👩", name: "Woman" },
  { id: 4, emoji: "👳", name: "Turban" },
  { id: 5, emoji: "🧔", name: "Beard" },
  { id: 6, emoji: "👩‍🦱", name: "Curly" },
  { id: 7, emoji: "👨‍🦲", name: "Bald" },
  { id: 8, emoji: "🧕", name: "Hijab" },
  { id: 9, emoji: "👨‍💼", name: "Professional" },
  { id: 10, emoji: "👩‍💻", name: "Developer" },
  { id: 11, emoji: "🧘", name: "Mindful" },
  { id: 12, emoji: "👨‍⚕️", name: "Doctor" },
]

export default function ProfileSetupPage() {
  const [selectedAvatar, setSelectedAvatar] = useState(1)
  const [displayName, setDisplayName] = useState("")
  const [bio, setBio] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [step, setStep] = useState(1)
  const router = useRouter()

  const handleSelectAvatar = (id: number) => {
    setSelectedAvatar(id)
  }

  const handleAddInterest = (interest: string) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest])
    }
  }

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest))
  }

  const handleComplete = async () => {
    try {
      const response = await fetch("/api/profile/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatarId: selectedAvatar,
          displayName,
          bio,
          interests,
        }),
      })

      if (response.ok) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Profile setup error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="flex items-center gap-3 justify-center mb-4">
            <AnimatedLotusLogo size="md" />
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">Step {step} of 3</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-12 justify-center">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-16 rounded-full transition-all duration-300 ${s <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        {/* Step 1: Avatar Selection */}
        {step === 1 && (
          <div className="space-y-8">
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle>Choose Your Avatar</CardTitle>
                <CardDescription>Pick an avatar that represents you</CardDescription>
              </CardHeader>
              <CardContent>
                <AvatarSelector onSelect={handleSelectAvatar} selectedId={selectedAvatar} />

                <div className="text-center mt-12">
                  <div className="inline-block">
                    <AvatarDisplay
                      avatarId={selectedAvatar}
                      size="xl"
                      showBorder
                      name={AVATARS.find((a) => a.id === selectedAvatar)?.name}
                    />
                  </div>
                </div>

                <Button onClick={() => setStep(2)} className="w-full mt-8 bg-primary hover:bg-primary/90" size="lg">
                  Continue
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Basic Info */}
        {step === 2 && (
          <div className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Tell Us About Yourself</CardTitle>
                <CardDescription>Help others get to know you better</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How should we call you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tell us a bit about yourself (optional)"
                    rows={4}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} className="flex-1 bg-primary hover:bg-primary/90">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Interests */}
        {step === 3 && (
          <div className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>What Interests You?</CardTitle>
                <CardDescription>Select topics you're interested in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "ADHD Support",
                    "Productivity",
                    "Mental Health",
                    "Meditation",
                    "Exercise",
                    "Nutrition",
                    "Sleep Hygiene",
                    "Work-Life Balance",
                    "Relationships",
                    "Career",
                    "Education",
                    "Creative Arts",
                  ].map((interest) => (
                    <button
                      key={interest}
                      onClick={() =>
                        interests.includes(interest) ? handleRemoveInterest(interest) : handleAddInterest(interest)
                      }
                      className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                        interests.includes(interest)
                          ? "bg-primary text-white"
                          : "bg-card border-2 border-muted hover:border-primary"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Selected ({interests.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge
                        key={interest}
                        className="bg-primary text-white cursor-pointer hover:bg-primary/90"
                        onClick={() => handleRemoveInterest(interest)}
                      >
                        {interest} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleComplete} className="flex-1 bg-primary hover:bg-primary/90">
                    Complete Setup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
