"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Award, Calendar, MessageCircle, Heart } from "lucide-react"
import { useState } from "react"
import { AvatarDisplay } from "@/components/avatar-display"

export default function ProfessionalDetailPage({ params }: { params: { id: string } }) {
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock data - replace with API call
  const professional = {
    id: 1,
    avatarId: 3,
    name: "Dr. Priya Sharma",
    title: "Clinical Psychologist",
    specialization: "ADHD & Anxiety",
    country: "India",
    state: "Mumbai",
    rating: 4.9,
    reviews: 87,
    hourlyRate: 50,
    experience: 12,
    languages: ["English", "Hindi", "Marathi"],
    verified: true,
    bio: "Specializing in ADHD diagnosis and treatment for adults and adolescents.",
    certifications: ["Ph.D. Clinical Psychology", "ADHD Certification", "CBT Specialist"],
    availableSlots: 5,
    aboutMe:
      "With over 12 years of experience, I have helped hundreds of individuals understand and manage their ADHD. My approach combines evidence-based therapy with personalized strategies tailored to each client's unique needs.",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/professionals" className="mb-6 inline-flex items-center gap-2 text-primary hover:underline">
          ← Back to Professionals
        </Link>

        {/* Header */}
        <Card className="border-2 mb-6">
          <CardHeader>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-6">
                <AvatarDisplay avatarId={professional.avatarId} size="xl" showBorder />
                <div>
                  <CardTitle className="text-3xl mb-2">{professional.name}</CardTitle>
                  <p className="text-lg text-muted-foreground">{professional.title}</p>
                  <p className="text-muted-foreground">{professional.specialization}</p>
                </div>
              </div>
              <button onClick={() => setIsFavorite(!isFavorite)} className="transition-all">
                <Heart
                  className={`h-8 w-8 transition-all ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500"
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {professional.verified && (
                <Badge className="bg-green-100 text-green-800">
                  <Award className="h-3 w-3 mr-1" />
                  Verified Professional
                </Badge>
              )}
              <Badge variant="outline">{professional.experience} Years Experience</Badge>
              <Badge variant="outline">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                {professional.rating} ({professional.reviews} reviews)
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{professional.aboutMe}</p>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Certifications & Qualifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {professional.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {professional.languages.map((lang) => (
                  <Badge key={lang} className="bg-primary text-white">
                    {lang}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <Card className="border-2 sticky top-4">
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">
                      {professional.state}, {professional.country}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Hourly Rate</p>
                  <p className="text-2xl font-bold text-primary">${professional.hourlyRate}</p>
                  <p className="text-xs text-muted-foreground">per session</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Available Slots</p>
                  <p className="text-lg font-semibold">{professional.availableSlots} slots</p>
                </div>

                <div className="pt-4 space-y-3 border-t">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <Calendar className="h-4 w-4" />
                    Book Session
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 bg-transparent"
                    size="lg"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Preview */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{professional.rating}/5</span>
                    <span className="text-muted-foreground">({professional.reviews} reviews)</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm font-medium">Excellent Service</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Dr. Sharma has been incredibly helpful in understanding my ADHD."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
