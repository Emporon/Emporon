"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface ResultsGraphProps {
  data: {
    anxiety: number
    depression: number
    stress: number
    wellbeing: number
    resilience: number
  }
}

export default function ResultsGraph({ data }: ResultsGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas dimensions
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) * 0.8

    // Define data points and colors
    const dataPoints = [
      { label: "Anxiety", value: data.anxiety, color: "#e57373" }, // Light red
      { label: "Depression", value: data.depression, color: "#9575cd" }, // Light purple
      { label: "Stress", value: data.stress, color: "#ff8a65" }, // Light orange
      { label: "Wellbeing", value: data.wellbeing, color: "#4db6ac" }, // Teal
      { label: "Resilience", value: data.resilience, color: "#7cb342" }, // Light green
    ]

    const numPoints = dataPoints.length
    const angleStep = (Math.PI * 2) / numPoints

    // Draw radar background
    ctx.beginPath()
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2 // Start from top
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fillStyle = "rgba(178, 223, 219, 0.2)" // Very light teal
    ctx.fill()
    ctx.strokeStyle = "#b2dfdb" // Light teal
    ctx.stroke()

    // Draw radar grid lines
    const gridLevels = 5
    for (let level = 1; level <= gridLevels; level++) {
      const levelRadius = (radius * level) / gridLevels

      ctx.beginPath()
      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = centerX + levelRadius * Math.cos(angle)
        const y = centerY + levelRadius * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.strokeStyle = "rgba(178, 223, 219, 0.5)"
      ctx.stroke()
    }

    // Draw axes
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.strokeStyle = "rgba(128, 203, 196, 0.7)" // Medium teal
      ctx.stroke()

      // Draw axis labels
      const labelX = centerX + (radius + 20) * Math.cos(angle)
      const labelY = centerY + (radius + 20) * Math.sin(angle)

      ctx.fillStyle = "#2e7d32" // Dark green
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(dataPoints[i].label, labelX, labelY)
    }

    // Draw data points and connect them
    ctx.beginPath()
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = dataPoints[i].value / 100 // Normalize to 0-1
      const pointRadius = radius * value
      const x = centerX + pointRadius * Math.cos(angle)
      const y = centerY + pointRadius * Math.sin(angle)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fillStyle = "rgba(46, 125, 50, 0.3)" // Semi-transparent dark green
    ctx.fill()
    ctx.strokeStyle = "#2e7d32" // Dark green
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw data points
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = dataPoints[i].value / 100
      const pointRadius = radius * value
      const x = centerX + pointRadius * Math.cos(angle)
      const y = centerY + pointRadius * Math.sin(angle)

      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fillStyle = dataPoints[i].color
      ctx.fill()
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw value labels
      const valueX = centerX + (pointRadius - 15) * Math.cos(angle)
      const valueY = centerY + (pointRadius - 15) * Math.sin(angle)

      ctx.fillStyle = "#2e7d32"
      ctx.font = "bold 12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(dataPoints[i].value.toString(), valueX, valueY)
    }
  }, [data])

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <Card className="p-4 w-full max-w-2xl bg-white">
          <h3 className="text-center text-lg font-semibold text-forest-800 mb-4">Mental Wellness Profile</h3>
          <div className="relative aspect-square">
            <canvas ref={canvasRef} width={500} height={500} className="w-full h-full" />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-sm">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="bg-mint-50 p-2 rounded">
                <div className="font-medium text-forest-800 capitalize">{key}</div>
                <div className="text-forest-700">{value}/100</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

