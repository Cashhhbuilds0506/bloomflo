"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, LifeBuoy, FileText } from "lucide-react"
import Link from "next/link"
import { AnimatedLotusLogo } from "@/components/animated-lotus-logo"

export default function SupportPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <header className="text-center mb-10">
        <AnimatedLotusLogo size="lg" className="mx-auto mb-3" />
        <h1 className="text-3xl font-bold text-foreground">Support</h1>
        <p className="text-muted-foreground">Find help, contact us, and read our policies.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <LifeBuoy className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Help Center</CardTitle>
            <CardDescription>Common questions and guidance.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/resources">
              <Button variant="outline" className="w-full bg-transparent">
                View Guides
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <Mail className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>We’ll get back within 1–2 business days.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="mailto:support@neru.ai">
              <Button className="w-full">Email Support</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <FileText className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Policies</CardTitle>
            <CardDescription>Privacy and Terms of Service.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Link href="/support">
              <Button variant="outline" className="flex-1 bg-transparent">
                Privacy Policy
              </Button>
            </Link>
            <Link href="/support">
              <Button variant="outline" className="flex-1 bg-transparent">
                Terms
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
