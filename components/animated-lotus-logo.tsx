"use client"

import { useState, useEffect } from "react"

interface AnimatedLotusLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AnimatedLotusLogo({ size = "md", className = "" }: AnimatedLotusLogoProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isBloom, setIsBloom] = useState(false)

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setIsBloom((prev) => !prev)
      setTimeout(() => setIsAnimating(false), 2000)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`${sizeClasses[size]} ${className} relative cursor-pointer group`}>
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full transition-all duration-2000 ${isAnimating ? "scale-110" : ""} group-hover:scale-110`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer petal layer */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (360 / 8) * i
          return (
            <g key={`outer-${i}`} transform={`rotate(${angle} 50 50)`}>
              <path
                d="M50 15 C45 20, 40 35, 45 45 C50 40, 55 40, 55 45 C60 35, 55 20, 50 15 Z"
                fill="url(#outerPetalGradient)"
                className={`transition-all duration-2000 ${isBloom ? "scale-110" : "scale-95"}`}
                style={{
                  transformOrigin: "50px 50px",
                  animationDelay: `${i * 150}ms`,
                }}
              />
            </g>
          )
        })}

        {/* Middle petal layer */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (360 / 8) * i + 22.5 // Offset by half to create layered effect
          return (
            <g key={`middle-${i}`} transform={`rotate(${angle} 50 50)`}>
              <path
                d="M50 20 C46 25, 42 35, 46 42 C50 38, 54 38, 54 42 C58 35, 54 25, 50 20 Z"
                fill="url(#middlePetalGradient)"
                className={`transition-all duration-2000 ${isBloom ? "scale-105" : "scale-90"}`}
                style={{
                  transformOrigin: "50px 50px",
                  animationDelay: `${i * 100}ms`,
                }}
              />
            </g>
          )
        })}

        {/* Inner petal layer */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (360 / 6) * i
          return (
            <g key={`inner-${i}`} transform={`rotate(${angle} 50 50)`}>
              <path
                d="M50 25 C47 28, 45 35, 48 40 C50 37, 52 37, 52 40 C55 35, 53 28, 50 25 Z"
                fill="url(#innerPetalGradient)"
                className={`transition-all duration-2000 ${isBloom ? "scale-100" : "scale-85"}`}
                style={{
                  transformOrigin: "50px 50px",
                  animationDelay: `${i * 200}ms`,
                }}
              />
            </g>
          )
        })}

        <circle
          cx="50"
          cy="50"
          r="6"
          fill="url(#centerGradient)"
          className={`transition-all duration-1000 ${isAnimating ? "animate-pulse" : ""}`}
        />

        {/* Stamens */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (360 / 12) * i
          const x = 50 + Math.cos((angle * Math.PI) / 180) * 3
          const y = 50 + Math.sin((angle * Math.PI) / 180) * 3
          return (
            <circle
              key={`stamen-${i}`}
              cx={x}
              cy={y}
              r="0.8"
              fill="url(#stamenGradient)"
              className="animate-pulse"
              style={{ animationDelay: `${i * 50}ms` }}
            />
          )
        })}

        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#rippleGradient)"
          strokeWidth="0.5"
          opacity="0.3"
          className={`transition-all duration-3000 ${isAnimating ? "scale-110" : "scale-100"}`}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="url(#rippleGradient)"
          strokeWidth="0.3"
          opacity="0.2"
          className={`transition-all duration-3000 ${isAnimating ? "scale-105" : "scale-95"}`}
          style={{ animationDelay: "0.5s" }}
        />

        <defs>
          <linearGradient id="outerPetalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E879F9" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#C084FC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="middlePetalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0ABFC" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#DDD6FE" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="innerPetalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="50%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
          <radialGradient id="stamenGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </radialGradient>
          <linearGradient id="rippleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E879F9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      <div
        className={`absolute inset-0 rounded-full bg-purple-400/20 blur-lg transition-all duration-2000 ${isAnimating ? "scale-150 opacity-60" : "scale-100 opacity-0"} group-hover:opacity-40 group-hover:scale-130`}
      />
    </div>
  )
}
