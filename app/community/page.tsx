"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageCircle, Calendar, Heart } from "lucide-react"
import { AnimatedLotusLogo } from "@/components/animated-lotus-logo"

export default function CommunityPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <header className="text-center mb-10">
        <AnimatedLotusLogo size="lg" className="mx-auto mb-3" />
        <h1 className="text-3xl font-bold text-foreground">Community</h1>
        <p className="text-muted-foreground">Connect, share, and grow with others on the ADHD journey.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <Users className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Support Groups</CardTitle>
            <CardDescription>Find peer-led spaces to share and learn.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/resources">
              <Button variant="outline" className="w-full bg-transparent">
                Browse Topics
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <MessageCircle className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Forums</CardTitle>
            <CardDescription>Ask questions and exchange tips.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/resources">
              <Button variant="outline" className="w-full bg-transparent">
                Visit Discussions
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <Calendar className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Events</CardTitle>
            <CardDescription>Workshops and meetups coming soon.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/support">
              <Button variant="outline" className="w-full bg-transparent">
                Get Notified
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Link href="/assessment">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Heart className="w-4 h-4 mr-2" />
            Start with AI Assessment
          </Button>
        </Link>
      </div>
    </main>
  )
}
