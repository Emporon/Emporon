"use client"

import { useState } from "react"
import {
  Users,
  HeartHandshake,
  Brain,
  Clock,
  MessageSquareText,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function Lobby() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      id: "community",
      title: "Community",
      description: "Connect with others on similar wellness journeys",
      icon: <Users className="h-6 w-6" />,
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      notifications: 3,
    },
    {
      id: "therapy",
      title: "Therapy",
      description: "Schedule sessions with licensed therapists",
      icon: <HeartHandshake className="h-6 w-6" />,
      color: "from-purple-500 to-pink-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      notifications: 0,
    },
    {
      id: "eq-game",
      title: "EQ Game",
      description: "Fun activities to develop emotional intelligence",
      icon: <Brain className="h-6 w-6" />,
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-600",
      bgColor: "bg-amber-50",
      notifications: 1,
    },
    {
      id: "queue",
      title: "Queue Reserve",
      description: "Join the waiting list for a psychotherapist",
      icon: <Clock className="h-6 w-6" />,
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      notifications: 0,
    },
    {
      id: "chatbot",
      title: "Chatbot",
      description: "Get immediate support from our AI assistant",
      icon: <MessageSquareText className="h-6 w-6" />,
      color: "from-rose-500 to-red-600",
      textColor: "text-rose-600",
      bgColor: "bg-rose-50",
      notifications: 0,
      featured: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              AI
            </div>
            <h1 className="text-xl font-bold text-slate-800 hidden sm:block">MindfulAI</h1>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="text-slate-600">
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600">
              Resources
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600">
              Progress
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600">
              Support
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 py-2">
            <nav className="container mx-auto px-4 flex flex-col space-y-1">
              <Button variant="ghost" size="sm" className="justify-start">
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                Resources
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                Progress
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                Support
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome to MindfulAI</h1>
            <p className="text-indigo-100 mb-4 max-w-2xl">
              Your journey to better mental wellness starts here. Explore our features and connect with our community.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-white text-indigo-700 hover:bg-indigo-50">Take Assessment</Button>
              <Button variant="outline" className="text-white border-white hover:bg-indigo-700">
                Watch Tour
              </Button>
            </div>
          </div>
        </section>

        {/* Featured section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800">Start Here</h2>
            <Button variant="ghost" size="sm" className="text-indigo-600">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features
              .filter((f) => f.featured)
              .map((feature) => (
                <Card
                  key={feature.id}
                  className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-r ${feature.color} p-6 text-white`}>
                      <div className="flex justify-between items-start">
                        <div className="bg-white/20 p-2 rounded-lg">{feature.icon}</div>
                        {feature.notifications > 0 && (
                          <Badge variant="secondary" className="bg-white text-rose-600">
                            {feature.notifications} new
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
                      <p className="text-white/80 mt-1">{feature.description}</p>
                    </div>
                    <div className="p-4 bg-white">
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                        Get Started
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Daily Check-in</h3>
                  <p className="text-sm text-slate-300">Track your mood</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-slate-300 text-sm">How are you feeling today?</p>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    😔
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    😐
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    🙂
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    😊
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    🤩
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Upcoming Session</h3>
                  <p className="text-sm text-slate-600">Therapy appointment</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-amber-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-800">Dr. Sarah Johnson</span>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Tomorrow
                  </Badge>
                </div>
                <div className="text-sm text-slate-600">10:00 AM - 11:00 AM</div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="text-slate-600 border-slate-300 text-xs">
                    Reschedule
                  </Button>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-xs">
                    Join Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Explore Features</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className={cn(
                  "group cursor-pointer hover:shadow-md transition-all border-transparent",
                  feature.bgColor,
                )}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn("p-2 rounded-lg", feature.bgColor)}>
                      <div className={feature.textColor}>{feature.icon}</div>
                    </div>
                    {feature.notifications > 0 && (
                      <Badge className="bg-white border-slate-200">{feature.notifications}</Badge>
                    )}
                  </div>
                  <h3 className={cn("font-semibold group-hover:text-slate-900", feature.textColor)}>{feature.title}</h3>
                  <p className="text-slate-600 text-sm mt-1">{feature.description}</p>
                  <div className="mt-4">
                    <Button
                      variant="ghost"
                      className={cn("p-0 h-auto text-sm font-medium group-hover:underline", feature.textColor)}
                    >
                      Explore →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

