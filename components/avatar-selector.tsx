"use client"

import { useState } from "react"
import { AVATARS_CONFIG } from "@/lib/avatar-config"

interface AvatarSelectorProps {
  onSelect: (avatarId: number) => void
  selectedId: number
}

export function AvatarSelector({ onSelect, selectedId }: AvatarSelectorProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {AVATARS_CONFIG.map((avatar) => (
        <button
          key={avatar.id}
          onClick={() => onSelect(avatar.id)}
          onMouseEnter={() => setHoveredId(avatar.id)}
          onMouseLeave={() => setHoveredId(null)}
          className={`group relative p-4 rounded-2xl transition-all duration-300 ${
            selectedId === avatar.id
              ? `bg-gradient-to-br ${avatar.bgColor} text-white scale-110 shadow-xl`
              : `bg-white border-2 border-gray-200 hover:border-primary hover:scale-105 shadow-md`
          }`}
          title={avatar.name}
        >
          <div className="text-4xl mb-2">{avatar.emoji}</div>
          <p
            className={`text-xs font-medium ${
              selectedId === avatar.id ? "text-white" : "text-gray-600"
            } opacity-0 group-hover:opacity-100 transition-opacity`}
          >
            {avatar.name}
          </p>
        </button>
      ))}
    </div>
  )
}
