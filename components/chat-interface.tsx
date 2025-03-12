"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

interface ChatInterfaceProps {
  onComplete: (messages: Array<{ text: string; isUser: boolean }>) => void
}

export default function ChatInterface({ onComplete }: ChatInterfaceProps) {
  // Array of interview questions
  const interviewQuestions = [
    "Hi there! I'm your BrightMind companion. To start, could you tell me your name?",
    "Nice to meet you! How are you feeling today on a scale from 1-10?",
    "Could you share a bit more about why you're feeling that way?",
    "What's been on your mind lately that's causing you stress or worry?",
    "How have you been sleeping recently?",
    "When you feel overwhelmed, what strategies do you use to cope?",
    "Do you have people in your life you can talk to when you're feeling down?",
    "What activities bring you joy or help you relax?",
    "On a scale of 1-10, how would you rate your ability to handle stress?",
    "Is there anything specific you'd like to improve about your mental wellbeing?",
  ]

  // State for managing the conversation
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [input, setInput] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [userName, setUserName] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Initialize with the first question
  useEffect(() => {
    if (messages.length === 0) {
      setIsTyping(true)
      // Simulate typing delay
      setTimeout(() => {
        setMessages([{ text: interviewQuestions[0], isUser: false }])
        setIsTyping(false)
      }, 1000)
    }
  }, [])

  // Update progress when question index changes
  useEffect(() => {
    const newProgress = (currentQuestionIndex / interviewQuestions.length) * 100
    setProgress(newProgress)
  }, [currentQuestionIndex])

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (input.trim() === "") return

    // Save user's name from first response
    if (currentQuestionIndex === 0 && !userName) {
      setUserName(input)
    }

    // Add user message
    const updatedMessages = [...messages, { text: input, isUser: true }]
    setMessages(updatedMessages)
    setInput("")

    // Move to next question
    const nextQuestionIndex = currentQuestionIndex + 1

    // Check if there are more questions
    if (nextQuestionIndex < interviewQuestions.length) {
      setIsTyping(true)

      // Simulate AI thinking/typing
      setTimeout(() => {
        // Format question with name if available
        let nextQuestion = interviewQuestions[nextQuestionIndex]
        if (userName && nextQuestionIndex === 1) {
          nextQuestion = nextQuestion.replace("Nice to meet you!", `Nice to meet you, ${userName}!`)
        }

        setMessages([...updatedMessages, { text: nextQuestion, isUser: false }])
        setCurrentQuestionIndex(nextQuestionIndex)
        setIsTyping(false)
      }, 1500)
    } else {
      // Interview complete
      setIsTyping(true)

      // Final message
      setTimeout(() => {
        const finalMessages = [
          ...updatedMessages,
          {
            text: userName
              ? `Thank you for sharing, ${userName}! I've gathered enough information to generate your mental wellness assessment.`
              : "Thank you for sharing! I've gathered enough information to generate your mental wellness assessment.",
            isUser: false,
          },
        ]

        setMessages(finalMessages)
        setIsTyping(false)

        // Give user time to read final message before showing results
        setTimeout(() => {
          onComplete(finalMessages)
        }, 2000)
      }, 1500)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-mint-200 flex-1 flex flex-col">
        <div className="bg-mint-100 p-4 border-b border-mint-200">
          <h2 className="text-xl font-semibold text-forest-800">Mental Wellness Assessment</h2>
          <div className="flex items-center mt-2">
            <Progress value={progress} className="h-2 flex-1" />
            <span className="ml-3 text-sm text-forest-700">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Chat container */}
        <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto bg-mint-50" style={{ minHeight: "400px" }}>
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 max-w-[85%] ${message.isUser ? "ml-auto" : "mr-auto"}`}>
              <div
                className={`p-3 rounded-lg ${
                  message.isUser
                    ? "bg-forest-700 text-white rounded-br-none"
                    : "bg-mint-200 text-forest-800 rounded-bl-none"
                }`}
              >
                {message.text}
              </div>
              <div className="text-xs text-forest-600 mt-1 px-1">{message.isUser ? "You" : "BrightMind AI"}</div>
            </div>
          ))}

          {isTyping && (
            <div className="mb-4 max-w-[85%] mr-auto">
              <div className="bg-mint-200 text-forest-800 p-3 rounded-lg rounded-bl-none flex items-center">
                <span className="typing-indicator">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </div>
              <div className="text-xs text-forest-600 mt-1 px-1">BrightMind AI</div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-mint-200 bg-white">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your response..."
              disabled={isTyping}
              className="flex-1 border-mint-300 focus-visible:ring-forest-500"
            />
            <Button
              onClick={handleSendMessage}
              disabled={input.trim() === "" || isTyping}
              className="bg-forest-700 hover:bg-forest-800 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

