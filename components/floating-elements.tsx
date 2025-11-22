"use client"

import { useState, useEffect, useRef } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  emoji: string
  label: string
  speed: number
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    const floatingItems = [
      { emoji: "🧠", label: "[NEURAL_VFX]" },
      { emoji: "⚡", label: "[ENERGY_FX]" },
      { emoji: "🌟", label: "[STAR_VFX]" },
      { emoji: "💫", label: "[COSMIC_FX]" },
      { emoji: "🔮", label: "[MAGIC_VFX]" },
      { emoji: "✨", label: "[SPARKLE_FX]" },
      { emoji: "🌸", label: "[BLOOM_FX]" },
      { emoji: "🦋", label: "[FLUTTER_FX]" },
    ]

    const newElements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      emoji: floatingItems[i].emoji,
      label: floatingItems[i].label,
      speed: Math.random() * 0.5 + 0.2,
    }))

    setElements(newElements)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (currentTime - lastTimeRef.current >= 50) {
        // 50ms throttle
        setElements((prev) =>
          prev.map((element) => ({
            ...element,
            x: Math.max(5, Math.min(95, element.x + Math.sin(currentTime * 0.001 + element.id) * element.speed)),
            y: Math.max(5, Math.min(95, element.y + Math.cos(currentTime * 0.001 + element.id) * element.speed)),
            rotation: element.rotation + element.speed * 10,
          })),
        )
        lastTimeRef.current = currentTime
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute group transition-all duration-300 hover:scale-125"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            transform: `translate(-50%, -50%) rotate(${element.rotation}deg) scale(${element.scale})`,
            filter: "drop-shadow(0 0 10px rgba(var(--primary), 0.3))",
          }}
        >
          <div className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
            {element.emoji}
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-primary/60 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {element.label}
          </div>
        </div>
      ))}
    </div>
  )
}
