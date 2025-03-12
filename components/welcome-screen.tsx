"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BrightMind.jpg-gQQwiDF8DSLeGlei13nwTqP3Xl1H5y.jpeg"
              alt="BrightMind Logo"
              className="h-32 w-32 rounded-2xl shadow-lg"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-forest-900 mb-3">Welcome to BrightMind</h1>
          <p className="text-forest-700 text-lg max-w-2xl mx-auto">
            Your friendly mental wellness assessment companion
          </p>
        </div>

        <Card className="bg-white shadow-xl border-mint-200">
          <CardHeader className="bg-mint-100 rounded-t-lg">
            <CardTitle className="text-forest-800">Mental Wellness Assessment</CardTitle>
            <CardDescription className="text-forest-600">
              A friendly chat to understand your current mental state
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-4 px-6">
            <div className="space-y-4 text-forest-700">
              <p>
                Our AI companion will have a conversation with you to understand how you're feeling. Based on your
                responses, we'll generate a visual representation of your current mental state.
              </p>

              <div className="bg-mint-50 p-4 rounded-lg">
                <h3 className="font-medium text-forest-800 mb-2">What to expect:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-mint-200 text-forest-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                      1
                    </span>
                    <span>A friendly conversation with our AI companion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-mint-200 text-forest-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                      2
                    </span>
                    <span>Questions about your feelings, thoughts, and experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-mint-200 text-forest-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                      3
                    </span>
                    <span>A visual assessment of your mental wellness</span>
                  </li>
                </ul>
              </div>

              <p className="text-sm text-forest-600 italic">
                Note: This is a simulation for demonstration purposes only and not a clinical tool. No data is stored or
                shared.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button onClick={onStart} className="bg-forest-700 hover:bg-forest-800 text-white px-8 py-6" size="lg">
              Start Assessment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

