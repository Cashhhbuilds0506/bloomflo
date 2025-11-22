"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, Calendar, Heart, Settings, Home, LogOut, Bell, Search, Video } from "lucide-react"
import { AvatarDisplay } from "@/components/avatar-display"
import { UserProfileCard } from "@/components/user-profile-card"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
  const user = {
    name: "John Doe",
    avatarId: 1,
    email: "john@example.com",
    country: "India",
    state: "Mumbai",
  }

  // Mock connections
  const connections = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      role: "Clinical Psychologist",
      avatar: 3,
      status: "accepted",
      lastMessage: "Let's discuss your assessment results...",
      lastMessageTime: "2 hours ago",
      unread: 3,
    },
    {
      id: 2,
      name: "Ms. Neha Gupta",
      role: "ADHD Coach",
      avatar: 6,
      status: "accepted",
      lastMessage: "Great progress this week!",
      lastMessageTime: "Yesterday",
      unread: 0,
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      professionalName: "Dr. Priya Sharma",
      date: "2024-12-20",
      time: "10:00 AM",
      duration: 60,
      type: "Video Call",
    },
    {
      id: 2,
      professionalName: "Ms. Neha Gupta",
      date: "2024-12-22",
      time: "02:00 PM",
      duration: 45,
      type: "Audio Call",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🪷</div>
            <h1 className="text-2xl font-bold text-foreground">neru</h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/professionals" className="hover:text-primary">
              Find Professional
            </Link>
            <Link href="/resources" className="hover:text-primary">
              Resources
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <AvatarDisplay avatarId={user.avatarId} size="sm" showBorder={false} />
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg text-red-500">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <UserProfileCard
              name={user.name}
              email={user.email}
              avatarId={user.avatarId}
              country={user.country}
              state={user.state}
              onEdit={() => console.log("Edit profile")}
            />

            {/* Navigation Menu */}
            <Card className="border-2 mt-6">
              <CardContent className="p-0">
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`w-full text-left px-6 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                      activeTab === "overview" ? "bg-primary/10 border-l-4 border-primary" : ""
                    }`}
                  >
                    <Home className="h-5 w-5" />
                    <span>Overview</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("messages")}
                    className={`w-full text-left px-6 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                      activeTab === "messages" ? "bg-primary/10 border-l-4 border-primary" : ""
                    }`}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Messages</span>
                    {connections.some((c) => c.unread > 0) && (
                      <Badge className="ml-auto bg-red-500 text-white">
                        {connections.reduce((sum, c) => sum + c.unread, 0)}
                      </Badge>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("connections")}
                    className={`w-full text-left px-6 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                      activeTab === "connections" ? "bg-primary/10 border-l-4 border-primary" : ""
                    }`}
                  >
                    <Users className="h-5 w-5" />
                    <span>Connections</span>
                    <Badge className="ml-auto bg-primary text-white">{connections.length}</Badge>
                  </button>
                  <button
                    onClick={() => setActiveTab("sessions")}
                    className={`w-full text-left px-6 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                      activeTab === "sessions" ? "bg-primary/10 border-l-4 border-primary" : ""
                    }`}
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Sessions</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Connections</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{connections.length}</div>
                      <p className="text-xs text-muted-foreground mt-1">Active professionals</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{upcomingSessions.length}</div>
                      <p className="text-xs text-muted-foreground mt-1">Upcoming sessions</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{connections.reduce((sum, c) => sum + c.unread, 0)}</div>
                      <p className="text-xs text-muted-foreground mt-1">Unread messages</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Link href="/professionals">
                      <Button className="bg-primary hover:bg-primary/90">Find New Professional</Button>
                    </Link>
                    <Link href="/resources">
                      <Button variant="outline">Browse Resources</Button>
                    </Link>
                    <Link href="/assessment">
                      <Button variant="outline">Take Assessment</Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Upcoming Sessions */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Upcoming Sessions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{session.professionalName}</p>
                            <p className="text-sm text-muted-foreground">{session.type}</p>
                          </div>
                          <Badge variant="outline">{session.duration} min</Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-sm">
                          <span>{session.date}</span>
                          <span>{session.time}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <div className="grid md:grid-cols-3 gap-6">
                {/* Conversations List */}
                <div className="md:col-span-1">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>Conversations</CardTitle>
                      <div className="relative mt-3">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full pl-9 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-1">
                        {connections.map((conn) => (
                          <button
                            key={conn.id}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 border-l-4 border-transparent hover:border-primary transition-all"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-semibold text-sm">{conn.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{conn.lastMessage}</p>
                              </div>
                              {conn.unread > 0 && <Badge className="bg-red-500 text-white">{conn.unread}</Badge>}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{conn.lastMessageTime}</p>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Message Window */}
                <div className="md:col-span-2">
                  <Card className="border-2 h-full flex flex-col">
                    <CardHeader className="border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{connections[0]?.name}</CardTitle>
                          <CardDescription>{connections[0]?.role}</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <Video className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                      <div className="flex gap-3">
                        <div className="text-2xl">👨</div>
                        <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                          <p className="text-sm">Hi! How are you doing today?</p>
                          <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <div className="bg-primary text-white rounded-lg p-3 max-w-xs">
                          <p className="text-sm">I'm doing well, thanks for asking!</p>
                          <p className="text-xs opacity-80 mt-1">10:35 AM</p>
                        </div>
                      </div>
                    </CardContent>
                    <div className="border-t p-4 flex gap-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                      <Button className="bg-primary hover:bg-primary/90">Send</Button>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Connections Tab */}
            {activeTab === "connections" && (
              <div className="grid gap-4">
                {connections.map((conn) => (
                  <Card key={conn.id} className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <AvatarDisplay avatarId={conn.avatar} size="md" showBorder />
                          <div>
                            <p className="font-semibold">{conn.name}</p>
                            <p className="text-sm text-muted-foreground">{conn.role}</p>
                            <Badge className="mt-2 bg-green-100 text-green-800">Connected</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button className="bg-primary hover:bg-primary/90" size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Sessions Tab */}
            {activeTab === "sessions" && (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{session.professionalName}</p>
                          <p className="text-sm text-muted-foreground">{session.type}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span>📅 {session.date}</span>
                            <span>🕐 {session.time}</span>
                            <span>⏱️ {session.duration} minutes</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button className="bg-primary hover:bg-primary/90" size="sm">
                            Join Session
                          </Button>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
