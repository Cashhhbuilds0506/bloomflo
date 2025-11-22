"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Video, FileText, Headphones, ExternalLink, Clock, User, Star, Filter } from "lucide-react"

interface Resource {
  id: string
  title: string
  description: string
  category: "basics" | "strategies" | "research" | "tools" | "support" | "workplace"
  type: "article" | "video" | "podcast" | "guide" | "tool"
  duration: string
  author: string
  rating: number
  tags: string[]
  url: string
  featured: boolean
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Understanding ADHD: A Complete Guide",
    description: "Comprehensive overview of ADHD symptoms, diagnosis, and treatment options for adults and children.",
    category: "basics",
    type: "guide",
    duration: "15 min read",
    author: "Dr. Sarah Johnson",
    rating: 4.8,
    tags: ["diagnosis", "symptoms", "treatment"],
    url: "#",
    featured: true,
  },
  {
    id: "2",
    title: "Time Management Strategies for ADHD",
    description: "Practical techniques for managing time, prioritizing tasks, and staying organized with ADHD.",
    category: "strategies",
    type: "article",
    duration: "8 min read",
    author: "ADHD Coach Maria",
    rating: 4.6,
    tags: ["time-management", "organization", "productivity"],
    url: "#",
    featured: true,
  },
  {
    id: "3",
    title: "ADHD in the Workplace: Success Strategies",
    description: "How to thrive professionally with ADHD, including accommodation requests and career tips.",
    category: "workplace",
    type: "video",
    duration: "22 min",
    author: "Career Coach Alex",
    rating: 4.7,
    tags: ["career", "accommodations", "professional"],
    url: "#",
    featured: false,
  },
  {
    id: "4",
    title: "Latest ADHD Research Findings 2024",
    description: "Recent scientific discoveries about ADHD brain function and new treatment approaches.",
    category: "research",
    type: "article",
    duration: "12 min read",
    author: "Research Team",
    rating: 4.5,
    tags: ["neuroscience", "treatment", "brain-function"],
    url: "#",
    featured: false,
  },
  {
    id: "5",
    title: "Mindfulness for ADHD Podcast",
    description: "Weekly podcast exploring mindfulness techniques specifically adapted for ADHD minds.",
    category: "strategies",
    type: "podcast",
    duration: "30 min episodes",
    author: "Mindful ADHD Team",
    rating: 4.9,
    tags: ["mindfulness", "meditation", "emotional-regulation"],
    url: "#",
    featured: true,
  },
  {
    id: "6",
    title: "ADHD Medication Guide",
    description: "Comprehensive guide to ADHD medications, side effects, and working with healthcare providers.",
    category: "basics",
    type: "guide",
    duration: "20 min read",
    author: "Dr. Michael Chen",
    rating: 4.4,
    tags: ["medication", "treatment", "healthcare"],
    url: "#",
    featured: false,
  },
  {
    id: "7",
    title: "Building Support Networks",
    description: "How to find and maintain supportive relationships when living with ADHD.",
    category: "support",
    type: "article",
    duration: "10 min read",
    author: "Community Manager",
    rating: 4.6,
    tags: ["relationships", "community", "support"],
    url: "#",
    featured: false,
  },
  {
    id: "8",
    title: "ADHD-Friendly Apps and Tools",
    description: "Curated list of digital tools and apps designed to help with ADHD management.",
    category: "tools",
    type: "tool",
    duration: "5 min read",
    author: "Tech Team",
    rating: 4.3,
    tags: ["apps", "technology", "productivity"],
    url: "#",
    featured: false,
  },
]

const categories = [
  { id: "all", name: "All Resources", color: "from-purple-500 to-pink-500" },
  { id: "basics", name: "ADHD Basics", color: "from-blue-500 to-cyan-500" },
  { id: "strategies", name: "Coping Strategies", color: "from-green-500 to-emerald-500" },
  { id: "research", name: "Research & Science", color: "from-orange-500 to-amber-500" },
  { id: "tools", name: "Tools & Apps", color: "from-indigo-500 to-purple-500" },
  { id: "support", name: "Support & Community", color: "from-pink-500 to-rose-500" },
  { id: "workplace", name: "Workplace Success", color: "from-teal-500 to-cyan-500" },
]

const typeIcons = {
  article: FileText,
  video: Video,
  podcast: Headphones,
  guide: BookOpen,
  tool: Filter,
}

export default function ResourceLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
      const matchesSearch =
        searchQuery === "" ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesType = selectedType === "all" || resource.type === selectedType

      return matchesCategory && matchesSearch && matchesType
    })
  }, [selectedCategory, searchQuery, selectedType])

  const featuredResources = resources.filter((resource) => resource.featured)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category?.color || "from-gray-500 to-gray-600"
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          ADHD Resource Library
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Curated collection of evidence-based resources, tools, and guides to support your ADHD journey
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className={
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} hover:opacity-90 text-white`
                  : "hover:scale-105 transition-transform"
              }
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Type Filters */}
        <div className="flex justify-center gap-2">
          {["all", "article", "video", "podcast", "guide", "tool"].map((type) => (
            <Button
              key={type}
              onClick={() => setSelectedType(type)}
              variant={selectedType === type ? "default" : "ghost"}
              size="sm"
              className="capitalize"
            >
              {type === "all" ? "All Types" : type}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Resources */}
      {selectedCategory === "all" && searchQuery === "" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Featured Resources</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredResources.map((resource) => {
              const IconComponent = typeIcons[resource.type]
              return (
                <Card
                  key={resource.id}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge className="bg-yellow-500 text-white mb-2">Featured</Badge>
                      <div className="flex items-center gap-1">
                        {renderStars(resource.rating)}
                        <span className="text-xs text-muted-foreground ml-1">{resource.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">{resource.description}</p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <IconComponent className="h-3 w-3" />
                      <span className="capitalize">{resource.type}</span>
                      <Clock className="h-3 w-3 ml-2" />
                      <span>{resource.duration}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{resource.author}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      View Resource
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {selectedCategory === "all" ? "All Resources" : categories.find((cat) => cat.id === selectedCategory)?.name}
          </h3>
          <span className="text-sm text-muted-foreground">
            {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""} found
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const IconComponent = typeIcons[resource.type]
            return (
              <Card
                key={resource.id}
                className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge className={`bg-gradient-to-r ${getCategoryColor(resource.category)} text-white mb-2`}>
                      {categories.find((cat) => cat.id === resource.category)?.name}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {renderStars(resource.rating)}
                      <span className="text-xs text-muted-foreground ml-1">{resource.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">{resource.description}</p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <IconComponent className="h-3 w-3" />
                    <span className="capitalize">{resource.type}</span>
                    <Clock className="h-3 w-3 ml-2" />
                    <span>{resource.duration}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{resource.author}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{resource.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Button
                    className={`w-full bg-gradient-to-r ${getCategoryColor(resource.category)} hover:opacity-90 text-white group-hover:scale-105 transition-transform`}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    View Resource
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSelectedType("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Resource Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{resources.length}</div>
          <div className="text-sm text-muted-foreground">Total Resources</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{categories.length - 1}</div>
          <div className="text-sm text-muted-foreground">Categories</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{featuredResources.length}</div>
          <div className="text-sm text-muted-foreground">Featured</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {(resources.reduce((sum, r) => sum + r.rating, 0) / resources.length).toFixed(1)}
          </div>
          <div className="text-sm text-muted-foreground">Avg Rating</div>
        </div>
      </div>
    </div>
  )
}
