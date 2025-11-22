"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Briefcase, Clock, Award, Search, Filter, Heart } from "lucide-react"
import { AvatarDisplay } from "@/components/avatar-display"

// Mock professionals data - replace with API call
const PROFESSIONALS = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    avatar: 3,
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
    availableSlots: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
  },
  {
    id: 2,
    name: "Dr. Rajesh Patel",
    avatar: 9,
    title: "Neuropsychiatrist",
    specialization: "ADHD & Depression",
    country: "India",
    state: "Bangalore",
    rating: 4.8,
    reviews: 64,
    hourlyRate: 60,
    experience: 15,
    languages: ["English", "Kannada"],
    verified: true,
    bio: "Medical specialist with expertise in ADHD medication management.",
    availableSlots: 3,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
  },
  {
    id: 3,
    name: "Ms. Neha Gupta",
    avatar: 6,
    title: "ADHD Coach",
    specialization: "Productivity & Life Coaching",
    country: "India",
    state: "Delhi",
    rating: 4.7,
    reviews: 112,
    hourlyRate: 35,
    experience: 8,
    languages: ["English", "Hindi", "Punjabi"],
    verified: true,
    bio: "ADHD-certified coach helping people build better systems and habits.",
    availableSlots: 8,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha",
  },
  {
    id: 4,
    name: "Dr. Ahmed Hassan",
    avatar: 4,
    title: "Clinical Therapist",
    specialization: "CBT & ADHD",
    country: "Pakistan",
    state: "Karachi",
    rating: 4.6,
    reviews: 45,
    hourlyRate: 45,
    experience: 10,
    languages: ["English", "Urdu"],
    verified: true,
    bio: "Using evidence-based CBT techniques for ADHD management.",
    availableSlots: 6,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
  },
  {
    id: 5,
    name: "Dr. Anjali Verma",
    avatar: 6,
    title: "Counselor",
    specialization: "ADHD Support & Counseling",
    country: "India",
    state: "Hyderabad",
    rating: 4.9,
    reviews: 98,
    hourlyRate: 40,
    experience: 9,
    languages: ["English", "Telugu", "Hindi"],
    verified: true,
    bio: "Compassionate counselor dedicated to helping ADHD individuals thrive.",
    availableSlots: 4,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
  },
  {
    id: 6,
    name: "Mr. Vikram Singh",
    avatar: 2,
    title: "ADHD Specialist",
    specialization: "Executive Function",
    country: "India",
    state: "Pune",
    rating: 4.8,
    reviews: 76,
    hourlyRate: 55,
    experience: 11,
    languages: ["English", "Hindi", "Marathi"],
    verified: true,
    bio: "Expert in executive function coaching and organizational systems.",
    availableSlots: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
  },
]

const SPECIALIZATIONS = ["All", "ADHD Specialist", "Psychologist", "Psychiatrist", "Coach", "Therapist"]
const COUNTRIES = ["All", "India", "Pakistan", "Bangladesh", "Sri Lanka", "Nepal"]

export default function ProfessionalsPage() {
  const [selectedCountry, setSelectedCountry] = useState("All")
  const [selectedSpecialization, setSelectedSpecialization] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [minRating, setMinRating] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])

  const filtered = PROFESSIONALS.filter((prof) => {
    const matchCountry = selectedCountry === "All" || prof.country === selectedCountry
    const matchSpec = selectedSpecialization === "All" || prof.specialization.includes(selectedSpecialization)
    const matchSearch =
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchPrice = prof.hourlyRate >= priceRange[0] && prof.hourlyRate <= priceRange[1]
    const matchRating = prof.rating >= minRating
    return matchCountry && matchSpec && matchSearch && matchPrice && matchRating
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Find Your ADHD Professional</h1>
          <p className="text-xl text-muted-foreground">
            Connect with verified specialists from India and the Indian subcontinent
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-2 sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Name, specialization..."
                      className="w-full pl-9 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>

                {/* Country Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <div className="space-y-2">
                    {COUNTRIES.map((country) => (
                      <button
                        key={country}
                        onClick={() => setSelectedCountry(country)}
                        className={`w-full text-left px-3 py-2 rounded transition-all text-sm ${
                          selectedCountry === country ? "bg-primary text-white" : "bg-card border hover:border-primary"
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specialization Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Specialization</label>
                  <div className="space-y-2">
                    {SPECIALIZATIONS.map((spec) => (
                      <button
                        key={spec}
                        onClick={() => setSelectedSpecialization(spec)}
                        className={`w-full text-left px-3 py-2 rounded transition-all text-sm ${
                          selectedSpecialization === spec
                            ? "bg-primary text-white"
                            : "bg-card border hover:border-primary"
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Hourly Rate: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="150"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                  <div className="space-y-2">
                    {[0, 3, 3.5, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`w-full text-left px-3 py-2 rounded transition-all text-sm flex items-center gap-2 ${
                          minRating === rating ? "bg-primary text-white" : "bg-card border hover:border-primary"
                        }`}
                      >
                        {rating === 0 ? "All" : `${rating}+ Stars`}
                        {rating > 0 && <Star className="h-3 w-3 fill-current" />}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full bg-primary"
                  onClick={() => {
                    setSelectedCountry("All")
                    setSelectedSpecialization("All")
                    setSearchQuery("")
                    setPriceRange([0, 100])
                    setMinRating(0)
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Professionals Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filtered.length} of {PROFESSIONALS.length} professionals
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filtered.map((prof) => (
                <Card
                  key={prof.id}
                  className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group overflow-hidden"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <AvatarDisplay avatarId={prof.avatar} size="lg" showBorder />
                        <div>
                          <CardTitle className="group-hover:text-primary transition-colors">{prof.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Briefcase className="h-3 w-3" />
                            {prof.title}
                          </CardDescription>
                        </div>
                      </div>
                      <button onClick={() => toggleFavorite(prof.id)} className="transition-all">
                        <Heart
                          className={`h-6 w-6 transition-all ${
                            favorites.includes(prof.id)
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground hover:text-red-500"
                          }`}
                        />
                      </button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {prof.verified && (
                      <div>
                        <Badge className="bg-green-100 text-green-800">
                          <Award className="h-3 w-3 mr-1" />
                          Verified Professional
                        </Badge>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground">{prof.bio}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>
                          {prof.state}, {prof.country}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <span>{prof.experience} years experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>${prof.hourlyRate}/hour</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{prof.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({prof.reviews} reviews)</span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                      {prof.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/professionals/${prof.id}`} className="block">
                      <Button className="w-full bg-primary hover:bg-primary/90 group-hover:scale-105 transition-transform">
                        View Profile & Book
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <Card className="border-2 text-center py-12">
                <p className="text-muted-foreground">No professionals match your filters. Try adjusting your search.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
