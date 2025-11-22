"use client"

import { useState } from "react"
import { AvatarDisplay } from "@/components/avatar-display"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Edit2, Share2 } from "lucide-react"

interface UserProfileCardProps {
  name: string
  email: string
  avatarId: number
  country: string
  state: string
  onEdit?: () => void
}

export function UserProfileCard({ name, email, avatarId, country, state, onEdit }: UserProfileCardProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  return (
    <Card className="border-2 border-primary/30 shadow-xl overflow-hidden bg-gradient-to-br from-primary/5 to-purple-50">
      <div className="h-20 bg-gradient-to-r from-primary to-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
        </div>
      </div>

      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-4">
          <div className={`${isAnimating ? "animate-bounce" : ""}`}>
            <AvatarDisplay
              avatarId={avatarId}
              size="lg"
              showBorder
              clickable
              onClick={() => setIsAnimating(!isAnimating)}
            />
          </div>
        </div>

        <CardTitle className="text-2xl font-bold text-foreground">{name}</CardTitle>
        <p className="text-sm text-primary font-medium">{email}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span className="text-lg">📍</span>
            <span className="text-sm">
              {state}, {country}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-green-600 font-medium">Online</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex flex-col items-center gap-1 h-auto py-2 bg-transparent hover:bg-primary/10"
          >
            <Edit2 className="h-4 w-4" />
            <span className="text-xs">Edit</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 bg-transparent hover:bg-primary/10"
          >
            <Share2 className="h-4 w-4" />
            <span className="text-xs">Share</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 bg-transparent hover:bg-primary/10"
          >
            <Settings className="h-4 w-4" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
