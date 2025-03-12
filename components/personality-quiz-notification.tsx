"use client"

import { useState, useEffect } from "react"
import { Bell, X, ChevronRight, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface PersonalityQuizNotificationProps {
  userName?: string
}

// MBTI-inspired personality houses
const personalityHouses = [
  {
    id: "sage",
    name: "House of Sage",
    description:
      "Analytical thinkers who value knowledge and truth. They approach life with logic and reason, seeking to understand the world through careful observation and analysis.",
    traits: ["Analytical", "Logical", "Curious", "Strategic"],
    color: "bg-blue-500",
    icon: "🧠",
    mbtiTypes: "INTJ, INTP, ENTJ, ENTP",
  },
  {
    id: "guardian",
    name: "House of Guardian",
    description:
      "Reliable protectors who value tradition and security. They are practical, dependable, and organized, creating stability for themselves and others.",
    traits: ["Reliable", "Practical", "Organized", "Traditional"],
    color: "bg-forest-700",
    icon: "🛡️",
    mbtiTypes: "ISTJ, ISFJ, ESTJ, ESFJ",
  },
  {
    id: "empath",
    name: "House of Empath",
    description:
      "Compassionate healers who value harmony and connection. They are attuned to emotions and motivated by a desire to help others and create meaningful relationships.",
    traits: ["Empathetic", "Compassionate", "Supportive", "Idealistic"],
    color: "bg-rose-500",
    icon: "💖",
    mbtiTypes: "INFJ, INFP, ENFJ, ENFP",
  },
  {
    id: "explorer",
    name: "House of Explorer",
    description:
      "Adventurous spirits who value freedom and experience. They live in the moment, seeking new experiences and adapting quickly to changing circumstances.",
    traits: ["Adaptable", "Spontaneous", "Resourceful", "Action-oriented"],
    color: "bg-amber-500",
    icon: "🌟",
    mbtiTypes: "ISTP, ISFP, ESTP, ESFP",
  },
]

// Quiz questions based on MBTI dimensions
const quizQuestions = [
  {
    id: 1,
    question: "At a social gathering, you typically:",
    options: [
      { text: "Meet new people and initiate conversations", dimension: "E" },
      { text: "Spend time with a few close friends or observe", dimension: "I" },
    ],
  },
  {
    id: 2,
    question: "When making decisions, you tend to:",
    options: [
      { text: "Consider how others will feel about it", dimension: "F" },
      { text: "Analyze the logical consequences", dimension: "T" },
    ],
  },
  {
    id: 3,
    question: "You prefer environments that are:",
    options: [
      { text: "Structured and organized", dimension: "J" },
      { text: "Flexible and spontaneous", dimension: "P" },
    ],
  },
  {
    id: 4,
    question: "When learning something new, you prefer:",
    options: [
      { text: "Concrete, practical applications", dimension: "S" },
      { text: "Exploring theories and possibilities", dimension: "N" },
    ],
  },
  {
    id: 5,
    question: "When facing a challenge, you typically:",
    options: [
      { text: "Trust your experience and what's worked before", dimension: "S" },
      { text: "Look for new, innovative approaches", dimension: "N" },
    ],
  },
  {
    id: 6,
    question: "In conversations, you're more interested in:",
    options: [
      { text: "Facts and specific details", dimension: "S" },
      { text: "Concepts and the big picture", dimension: "N" },
    ],
  },
  {
    id: 7,
    question: "You find it easier to:",
    options: [
      { text: "Connect with others emotionally", dimension: "F" },
      { text: "Analyze situations objectively", dimension: "T" },
    ],
  },
  {
    id: 8,
    question: "Your daily schedule is usually:",
    options: [
      { text: "Planned and structured", dimension: "J" },
      { text: "Flexible and adaptable", dimension: "P" },
    ],
  },
]

export default function PersonalityQuizNotification({ userName = "there" }: PersonalityQuizNotificationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isNotifying, setIsNotifying] = useState(false)
  const [currentStep, setCurrentStep] = useState<"intro" | "quiz" | "result">("intro")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [personalityResult, setPersonalityResult] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  // Simulate notification after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNotifying(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    setIsNotifying(false)
  }

  const startQuiz = () => {
    setCurrentStep("quiz")
  }

  const handleAnswer = (dimension: string) => {
    const updatedAnswers = { ...answers }
    updatedAnswers[quizQuestions[currentQuestionIndex].id.toString()] = dimension
    setAnswers(updatedAnswers)

    const nextIndex = currentQuestionIndex + 1
    const newProgress = (nextIndex / quizQuestions.length) * 100
    setProgress(newProgress)

    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex)
    } else {
      // Calculate result
      calculatePersonalityHouse(updatedAnswers)
    }
  }

  const calculatePersonalityHouse = (userAnswers: Record<string, string>) => {
    // Count dimensions
    const dimensions: Record<string, number> = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    }

    Object.values(userAnswers).forEach((dimension) => {
      dimensions[dimension]++
    })

    // Determine type
    const type = [
      dimensions.E > dimensions.I ? "E" : "I",
      dimensions.S > dimensions.N ? "S" : "N",
      dimensions.T > dimensions.F ? "T" : "F",
      dimensions.J > dimensions.P ? "J" : "P",
    ].join("")

    // Map MBTI type to house
    let house
    if (["INTJ", "INTP", "ENTJ", "ENTP"].includes(type)) {
      house = "sage"
    } else if (["ISTJ", "ISFJ", "ESTJ", "ESFJ"].includes(type)) {
      house = "guardian"
    } else if (["INFJ", "INFP", "ENFJ", "ENFP"].includes(type)) {
      house = "empath"
    } else {
      house = "explorer"
    }

    setPersonalityResult(house)
    setCurrentStep("result")
  }

  const resetQuiz = () => {
    setCurrentStep("intro")
    setCurrentQuestionIndex(0)
    setAnswers({})
    setProgress(0)
    setPersonalityResult(null)
  }

  const getHouseDetails = () => {
    if (!personalityResult) return null
    return personalityHouses.find((house) => house.id === personalityResult)
  }

  const houseDetails = getHouseDetails()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Notification bell */}
      <button
        onClick={toggleOpen}
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all",
          isOpen ? "bg-mint-600" : "bg-mint-500 hover:bg-mint-600",
        )}
      >
        {isNotifying && !isOpen && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>}
        {isOpen ? <X className="text-white" /> : <Bell className="text-white" />}
      </button>

      {/* Notification panel */}
      {isOpen && (
        <Card className="mt-3 w-full max-w-md bg-white shadow-xl border border-mint-200 overflow-hidden">
          {currentStep === "intro" && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="bg-mint-100 text-forest-700 p-1 rounded-full mr-2">
                    <Award className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-forest-800">Discover Your Personality House</h3>
                </div>
                <button onClick={toggleOpen} className="text-forest-500 hover:text-forest-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BrightMind.jpg-gQQwiDF8DSLeGlei13nwTqP3Xl1H5y.jpeg"
                  alt="BrightMind Logo"
                  className="h-16 w-16 mx-auto rounded-lg mb-3"
                />
                <p className="text-forest-700 mb-3">
                  Hi {userName}! Take our quick personality quiz to discover which BrightMind Personality House you
                  belong to.
                </p>
                <p className="text-sm text-forest-600 mb-4">
                  Answer 8 simple questions to reveal your unique personality type.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {personalityHouses.map((house) => (
                  <div key={house.id} className="bg-mint-50 p-2 rounded-lg border border-mint-100 text-center">
                    <div className="text-2xl mb-1">{house.icon}</div>
                    <div className="font-medium text-forest-800 text-sm">{house.name}</div>
                  </div>
                ))}
              </div>

              <Button onClick={startQuiz} className="w-full bg-forest-700 hover:bg-forest-800 text-white">
                Start Quiz
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}

          {currentStep === "quiz" && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-forest-800">Personality Quiz</h3>
                <button onClick={toggleOpen} className="text-forest-500 hover:text-forest-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs text-forest-600 mb-1">
                  <span>
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="mb-4">
                <h4 className="text-forest-800 font-medium mb-3">{quizQuestions[currentQuestionIndex].question}</h4>

                <div className="space-y-2">
                  {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.dimension)}
                      className="w-full text-left p-3 rounded-lg border border-mint-200 hover:bg-mint-50 transition-colors"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === "result" && houseDetails && (
            <div>
              <div className={cn("p-4 text-white", houseDetails.color)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl">Your Result</h3>
                  <button onClick={toggleOpen} className="text-white opacity-80 hover:opacity-100">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="text-center my-4">
                  <div className="text-5xl mb-2">{houseDetails.icon}</div>
                  <h2 className="text-2xl font-bold mb-1">{houseDetails.name}</h2>
                  <p className="text-white text-opacity-90 text-sm">MBTI Types: {houseDetails.mbtiTypes}</p>
                </div>
              </div>

              <div className="p-4">
                <p className="text-forest-700 mb-4">{houseDetails.description}</p>

                <div className="mb-4">
                  <h4 className="text-forest-800 font-medium mb-2">Key Traits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {houseDetails.traits.map((trait, index) => (
                      <Badge key={index} variant="outline" className="bg-mint-50">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="strengths">Strengths</TabsTrigger>
                    <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="text-sm text-forest-700 mt-2">
                    <p>
                      {houseDetails.id === "sage" &&
                        "You are a natural problem-solver with a strategic mind. You value knowledge and intellectual growth."}
                      {houseDetails.id === "guardian" &&
                        "You are dependable and organized, creating stability wherever you go. You value tradition and security."}
                      {houseDetails.id === "empath" &&
                        "You have a natural ability to understand others' emotions and build meaningful connections."}
                      {houseDetails.id === "explorer" &&
                        "You are adaptable and live in the moment, seeking new experiences and adventures."}
                    </p>
                  </TabsContent>
                  <TabsContent value="strengths" className="text-sm text-forest-700 mt-2">
                    <ul className="list-disc pl-4 space-y-1">
                      {houseDetails.id === "sage" && (
                        <>
                          <li>Strategic thinking and problem-solving</li>
                          <li>Ability to see the big picture</li>
                          <li>Independent and self-motivated</li>
                        </>
                      )}
                      {houseDetails.id === "guardian" && (
                        <>
                          <li>Reliable and responsible</li>
                          <li>Excellent organizational skills</li>
                          <li>Practical and detail-oriented</li>
                        </>
                      )}
                      {houseDetails.id === "empath" && (
                        <>
                          <li>Deep emotional intelligence</li>
                          <li>Ability to inspire and motivate others</li>
                          <li>Creative and imaginative</li>
                        </>
                      )}
                      {houseDetails.id === "explorer" && (
                        <>
                          <li>Adaptable to changing situations</li>
                          <li>Practical problem-solving skills</li>
                          <li>Living fully in the present moment</li>
                        </>
                      )}
                    </ul>
                  </TabsContent>
                  <TabsContent value="challenges" className="text-sm text-forest-700 mt-2">
                    <ul className="list-disc pl-4 space-y-1">
                      {houseDetails.id === "sage" && (
                        <>
                          <li>May overlook emotional aspects</li>
                          <li>Can be perceived as aloof or detached</li>
                          <li>Perfectionism may lead to stress</li>
                        </>
                      )}
                      {houseDetails.id === "guardian" && (
                        <>
                          <li>May resist change or new ideas</li>
                          <li>Can be overly focused on rules</li>
                          <li>May take on too much responsibility</li>
                        </>
                      )}
                      {houseDetails.id === "empath" && (
                        <>
                          <li>May neglect own needs for others</li>
                          <li>Can be sensitive to criticism</li>
                          <li>May struggle with practical details</li>
                        </>
                      )}
                      {houseDetails.id === "explorer" && (
                        <>
                          <li>May avoid long-term planning</li>
                          <li>Can get bored with routine</li>
                          <li>May take unnecessary risks</li>
                        </>
                      )}
                    </ul>
                  </TabsContent>
                </Tabs>

                <div className="mt-4 flex justify-between">
                  <Button variant="outline" onClick={resetQuiz} className="border-forest-200 text-forest-700">
                    Retake Quiz
                  </Button>
                  <Button onClick={toggleOpen} className="bg-forest-700 hover:bg-forest-800 text-white">
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}

