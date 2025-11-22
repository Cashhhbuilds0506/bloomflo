"use client"

import { useState, useEffect, useRef } from "react"

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; radius: number; opacity: number; id: number }>>(
    [],
  )
  const animationRef = useRef<number>()
  const ripplesRef = useRef(ripples)

  useEffect(() => {
    ripplesRef.current = ripples
  }, [ripples])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        opacity: 1,
        id: Date.now(),
      }
      setRipples((prev) => [...prev, newRipple])
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 300)
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.05)")
      gradient.addColorStop(1, "rgba(139, 92, 246, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const currentRipples = ripplesRef.current
      const updatedRipples = currentRipples
        .map((ripple) => ({
          ...ripple,
          radius: ripple.radius + 3,
          opacity: ripple.opacity - 0.02,
        }))
        .filter((ripple) => ripple.opacity > 0)

      if (updatedRipples.length !== currentRipples.length) {
        setRipples(updatedRipples)
      }

      // Draw ripples using current ref value
      currentRipples.forEach((ripple) => {
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(139, 92, 246, ${ripple.opacity * 0.5})`
        ctx.lineWidth = 2
        ctx.stroke()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, []) // Removed mousePos and ripples from dependencies

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ mixBlendMode: "multiply" }} />
  )
}
