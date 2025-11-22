"use client"

import { useState } from "react"

interface AvatarDisplayProps {
  avatarId: number
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  name?: string
  showBorder?: boolean
  clickable?: boolean
  onClick?: () => void
}

const AVATARS = [
  { id: 1, emoji: "🧑", name: "Default", bgColor: "from-blue-400 to-blue-600" },
  { id: 2, emoji: "👨‍🦰", name: "Red Hair", bgColor: "from-orange-400 to-red-600" },
  { id: 3, emoji: "👩", name: "Woman", bgColor: "from-pink-400 to-rose-600" },
  { id: 4, emoji: "👳", name: "Turban", bgColor: "from-amber-400 to-yellow-600" },
  { id: 5, emoji: "🧔", name: "Beard", bgColor: "from-slate-400 to-slate-600" },
  { id: 6, emoji: "👩‍🦱", name: "Curly", bgColor: "from-purple-400 to-purple-600" },
  { id: 7, emoji: "👨‍🦲", name: "Bald", bgColor: "from-emerald-400 to-emerald-600" },
  { id: 8, emoji: "🧕", name: "Hijab", bgColor: "from-cyan-400 to-blue-600" },
  { id: 9, emoji: "👨‍💼", name: "Professional", bgColor: "from-indigo-400 to-indigo-600" },
  { id: 10, emoji: "👩‍💻", name: "Developer", bgColor: "from-teal-400 to-teal-600" },
  { id: 11, emoji: "🧘", name: "Mindful", bgColor: "from-lime-400 to-green-600" },
  { id: 12, emoji: "👨‍⚕️", name: "Doctor", bgColor: "from-red-400 to-red-600" },
]

export function AvatarDisplay({
  avatarId,
  size = "md",
  name,
  showBorder = true,
  clickable = false,
  onClick,
}: AvatarDisplayProps) {
  const [isHovered, setIsHovered] = useState(false)
  const avatar = AVATARS.find((a) => a.id === avatarId) || AVATARS[0]

  const sizeClasses = {
    xs: "w-8 h-8 text-lg",
    sm: "w-10 h-10 text-xl",
    md: "w-14 h-14 text-3xl",
    lg: "w-20 h-20 text-5xl",
    xl: "w-28 h-28 text-7xl",
  }

  return (
    <div
      className="flex flex-col items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-gradient-to-br ${avatar.bgColor} shadow-lg transition-all duration-300 ${
          showBorder ? "ring-2 ring-offset-2 ring-white" : ""
        } ${clickable ? "cursor-pointer hover:scale-110" : ""} ${isHovered && clickable ? "scale-110 shadow-xl" : ""}`}
        onClick={onClick}
      >
        {avatar.emoji}
      </div>

      {/* Status indicator dot */}
      {showBorder && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
      )}

      {name && <p className="text-sm font-medium text-center">{name}</p>}
    </div>
  )
}
