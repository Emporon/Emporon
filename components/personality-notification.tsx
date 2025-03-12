"use client"

import { useState, useEffect } from "react"
import { Bell, ChevronRight, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// House and MBTI type definitions
const houses = [
  {
    name: "Gryffindor",
    color: "bg-red-600",
    textColor: "text-red-600",
    borderColor: "border-red-600",
    description: "Brave, courageous, and determined",
    icon: "🦁",
  },
  {
    name: "Hufflepuff",
    color: "bg-yellow-500",
    textColor: "text-yellow-600",
    borderColor: "border-yellow-500",
    description: "Loyal, patient, and fair",
    icon: "🦡",
  },
  {
    name: "Ravenclaw",
    color: "bg-blue-600",
    textColor: "text-blue-600",
    borderColor: "border-blue-600",
    description: "Intelligent, creative, and wise",
    icon: "🦅",
  },
  {
    name: "Slytherin",
    color: "bg-green-600",
    textColor: "text-green-600",
    borderColor: "border-green-600",
    description: "Ambitious, cunning, and resourceful",
    icon: "🐍",
  },
]

const mbtiDimensions = [
  {
    name: "Extraversion (E) vs. Introversion (I)",
    options: ["E", "I"],
  },
  {
    name: "Sensing (S) vs. Intuition (N)",
    options: ["S", "N"],
  },
  {
    name: "Thinking (T) vs. Feeling (F)",
    options: ["T", "F"],
  },
  {
    name: "Judging (J) vs. Perceiving (P)",
    options: ["J", "P"],
  },
]

// Questions that assess both HP house traits and MBTI dimensions
const questions = [
  {
    id: 1,
    text: "When faced with a challenge, I prefer to:",
    options: [
      { text: "Jump in and take immediate action", house: "Gryffindor", mbti: "E" },
      { text: "Think carefully before making a decision", house: "Ravenclaw", mbti: "I" },
      { text: "Consult with friends to get their input", house: "Hufflepuff", mbti: "F" },
      { text: "Find the most strategic approach to succeed", house: "Slytherin", mbti: "T" },
    ],
  },
  {
    id: 2,
    text: "I value most in myself and others:",
    options: [
      { text: "Loyalty and fairness", house: "Hufflepuff", mbti: "F" },
      { text: "Intelligence and creativity", house: "Ravenclaw", mbti: "N" },
      { text: "Courage and determination", house: "Gryffindor", mbti: "J" },
      { text: "Ambition and resourcefulness", house: "Slytherin", mbti: "T" },
    ],
  },
  {
    id: 3,
    text: "In group projects, I typically:",
    options: [
      { text: "Take charge and lead the team", house: "Gryffindor", mbti: "E" },
      { text: "Ensure everyone's voice is heard and valued", house: "Hufflepuff", mbti: "F" },
      { text: "Contribute innovative ideas and solutions", house: "Ravenclaw", mbti: "N" },
      { text: "Focus on achieving the best possible outcome", house: "Slytherin", mbti: "J" },
    ],
  },
  {
    id: 4,
    text: "When making important decisions, I rely most on:",
    options: [
      { text: "Concrete facts and past experiences", house: "Hufflepuff", mbti: "S" },
      { text: "Logical analysis and objective reasoning", house: "Ravenclaw", mbti: "T" },
      { text: "My gut feeling and instincts", house: "Gryffindor", mbti: "N" },
      { text: "Considering how it affects people involved", house: "Slytherin", mbti: "F" },
    ],
  },
  {
    id: 5,
    text: "My ideal weekend would involve:",
    options: [
      { text: "An exciting adventure or physical activity", house: "Gryffindor", mbti: "E" },
      { text: "Reading, learning, or working on creative projects", house: "Ravenclaw", mbti: "I" },
      { text: "Spending quality time with close friends", house: "Hufflepuff", mbti: "F" },
      { text: "Working toward personal goals and achievements", house: "Slytherin", mbti: "J" },
    ],
  },
  {
    id: 6,
    text: "When plans change unexpectedly, I typically:",
    options: [
      { text: "Adapt quickly and find new opportunities", house: "Slytherin", mbti: "P" },
      { text: "Feel frustrated if it disrupts my schedule", house: "Ravenclaw", mbti: "J" },
      { text: "Go with the flow and make the best of it", house: "Hufflepuff", mbti: "P" },
      { text: "Take charge to create a new plan", house: "Gryffindor", mbti: "J" },
    ],
  },
  {
    id: 7,
    text: "In conversations, I tend to focus on:",
    options: [
      { text: "The big picture and future possibilities", house: "Ravenclaw", mbti: "N" },
      { text: "Practical details and specific experiences", house: "Hufflepuff", mbti: "S" },
      { text: "The impact on people and relationships", house: "Gryffindor", mbti: "F" },
      { text: "Analyzing problems and finding solutions", house: "Slytherin", mbti: "T" },
    ],
  },
  {
    id: 8,
    text: "I'm most motivated by:",
    options: [
      { text: "Making a positive difference for others", house: "Hufflepuff", mbti: "F" },
      { text: "Intellectual challenges and discovery", house: "Ravenclaw", mbti: "N" },
      { text: "Standing up for what's right", house: "Gryffindor", mbti: "J" },
      { text: "Achieving success and recognition", house: "Slytherin", mbti: "T" },
    ],
  },
]

export default function PersonalityNotification() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasNotification, setHasNotification] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Array<string | null>>(Array(questions.length).fill(null))
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{
    house: string
    mbti: string
    description: string
    houseDetails: (typeof houses)[0]
  } | null>(null)

  // Show notification after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasNotification(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleOpen = () => {
    setIsOpen(true)
    setHasNotification(false)
  }

  const handleNext = () => {
    if (currentAnswer === null) return

    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = currentAnswer
    setAnswers(newAnswers)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setCurrentAnswer(null)
    } else {
      calculateResults(newAnswers)
      setShowResults(true)
    }
  }

  const calculateResults = (finalAnswers: Array<string | null>) => {
    // Count house votes
    const houseCounts: Record<string, number> = {
      Gryffindor: 0,
      Hufflepuff: 0,
      Ravenclaw: 0,
      Slytherin: 0,
    }

    // Count MBTI dimension votes
    const mbtiCounts: Record<string, number> = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    }

    // Process each answer
    finalAnswers.forEach((answer, index) => {
      if (answer !== null) {
        const questionIndex = index
        const optionIndex = Number.parseInt(answer)
        const selectedOption = questions[questionIndex].options[optionIndex]

        houseCounts[selectedOption.house]++
        mbtiCounts[selectedOption.mbti]++
      }
    })

    // Determine house
    let topHouse = "Gryffindor"
    let maxHouseCount = 0

    for (const [house, count] of Object.entries(houseCounts)) {
      if (count > maxHouseCount) {
        maxHouseCount = count
        topHouse = house
      }
    }

    // Determine MBTI
    const mbti = [
      mbtiCounts["E"] >= mbtiCounts["I"] ? "E" : "I",
      mbtiCounts["S"] >= mbtiCounts["N"] ? "S" : "N",
      mbtiCounts["T"] >= mbtiCounts["F"] ? "T" : "F",
      mbtiCounts["J"] >= mbtiCounts["P"] ? "J" : "P",
    ].join("")

    // Get house details
    const houseDetails = houses.find((h) => h.name === topHouse)!

    // Generate description
    const mbtiDescriptions: Record<string, string> = {
      INTJ: "strategic planner with a vision",
      INTP: "logical thinker and problem solver",
      ENTJ: "decisive leader with a drive for achievement",
      ENTP: "innovative challenger of ideas",
      INFJ: "insightful idealist with deep convictions",
      INFP: "thoughtful idealist with strong values",
      ENFJ: "charismatic mentor who inspires others",
      ENFP: "enthusiastic creative spirit",
      ISTJ: "practical, detail-oriented organizer",
      ISFJ: "dedicated protector with a strong sense of duty",
      ESTJ: "efficient administrator who values tradition",
      ESFJ: "warm-hearted harmonizer and caretaker",
      ISTP: "versatile analyzer with mechanical skills",
      ISFP: "sensitive artist with aesthetic appreciation",
      ESTP: "energetic problem solver who lives in the moment",
      ESFP: "enthusiastic performer who enjoys life",
    }

    const description = `You embody the ${houseDetails.name} qualities of ${houseDetails.description.toLowerCase()}, combined with the ${mbtiDescriptions[mbti]} traits of an ${mbti} personality type.`

    setResults({
      house: topHouse,
      mbti,
      description,
      houseDetails,
    })
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setAnswers(Array(questions.length).fill(null))
    setCurrentAnswer(null)
    setShowResults(false)
    setResults(null)
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <>
      {/* Floating notification button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={handleOpen} className="h-14 w-14 rounded-full shadow-lg relative">
          <Bell className="h-6 w-6" />
          {hasNotification && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 animate-pulse"></span>
          )}
        </Button>
      </div>

      {/* Notification sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="sm:max-w-md w-full overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-2">
              {showResults ? (
                <span className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Your Personality Results
                </span>
              ) : (
                <span>Personality Questionnaire</span>
              )}
            </SheetTitle>
            <SheetDescription>
              {showResults
                ? "Discover your combined Harry Potter house and MBTI personality type"
                : "Answer a few questions to find your magical personality type"}
            </SheetDescription>
          </SheetHeader>

          {!showResults ? (
            <div className="space-y-6">
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Current question */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{questions[currentQuestionIndex].text}</h3>

                <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer} className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} className="border-2" />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer py-2">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-end">
                <Button onClick={handleNext} disabled={currentAnswer === null} className="flex items-center">
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Next <ChevronRight className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    "See Results"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {results && (
                <>
                  {/* Results header */}
                  <div
                    className={cn(
                      "rounded-lg p-6 text-center relative overflow-hidden",
                      results.houseDetails.color.replace("bg-", "bg-opacity-20 bg-"),
                    )}
                  >
                    <div className="absolute inset-0 opacity-10 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat"></div>
                    <div className="relative z-10">
                      <div className="text-5xl mb-2">{results.houseDetails.icon}</div>
                      <h3 className={cn("text-2xl font-bold mb-1", results.houseDetails.textColor)}>
                        {results.house} {results.mbti}
                      </h3>
                      <div
                        className={cn(
                          "inline-block px-3 py-1 rounded-full text-sm font-medium mb-2",
                          results.houseDetails.color,
                          "text-white",
                        )}
                      >
                        {results.house} House
                      </div>
                    </div>
                  </div>

                  {/* Results description */}
                  <div className="space-y-4">
                    <p className="text-lg">{results.description}</p>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className={cn("border-2 rounded-lg p-4 text-center", results.houseDetails.borderColor)}>
                        <h4 className="font-semibold mb-1">House Traits</h4>
                        <p className="text-sm">{results.houseDetails.description}</p>
                      </div>

                      <div className="border-2 border-gray-300 rounded-lg p-4 text-center">
                        <h4 className="font-semibold mb-1">MBTI Type</h4>
                        <p className="text-sm">
                          {results.mbti.split("").map((letter, i) => (
                            <span key={i} className="mx-0.5">
                              {letter}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold mb-2">What This Means For You</h4>
                      <p className="text-sm">
                        Your {results.house} traits show that you value {results.houseDetails.description.toLowerCase()}
                        , while your {results.mbti} personality indicates you approach the world as a
                        {results.mbti[0] === "E" ? "n extrovert" : "n introvert"} who processes information through{" "}
                        {results.mbti[1] === "S" ? "concrete details" : "patterns and possibilities"}, makes decisions
                        based on {results.mbti[2] === "T" ? "logical analysis" : "personal values"}, and prefers{" "}
                        {results.mbti[3] === "J" ? "structure and planning" : "flexibility and spontaneity"}.
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={resetQuiz}>
                      Take Again
                    </Button>
                    <SheetClose asChild>
                      <Button>Close</Button>
                    </SheetClose>
                  </div>
                </>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}

