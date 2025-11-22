"use client"

import { useState, useEffect, useRef } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

interface ParticleSystemProps {
  particleCount?: number
  className?: string
}

export function ParticleSystem({ particleCount = 20, className = "" }: ParticleSystemProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const colors = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--primary)/0.6)", "hsl(var(--accent)/0.6)"]

    const createParticle = (id: number): Particle => ({
      id,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 200 + 100,
    })

    const initialParticles = Array.from({ length: particleCount }, (_, i) => createParticle(i))
    setParticles(initialParticles)

    const animate = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          const newParticle = {
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life + 1,
            opacity: particle.opacity * (1 - particle.life / particle.maxLife),
          }

          // Reset particle if it's dead or out of bounds
          if (
            newParticle.life >= newParticle.maxLife ||
            newParticle.x < -5 ||
            newParticle.x > 105 ||
            newParticle.y < -5 ||
            newParticle.y > 105
          ) {
            return createParticle(particle.id)
          }

          return newParticle
        }),
      )
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particleCount])

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full transition-all duration-100"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: "translate(-50%, -50%)",
            filter: "blur(0.5px)",
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  )
}
