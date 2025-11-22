"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUpIcon, RotateCcwIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ChatProps {
  userInfo: {
    familyMembers: number
    craziness: string
    drinksPer: number
    politicsLevel: string
    cookingSkill: string
  }
  onReset: () => void
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export function ThanksgivingChat({ userInfo, onReset }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `🦃 ALRIGHT, LET'S DO THIS! 🦃\n\nI've reviewed your situation and... *deep breath* ...we've got our work cut out for us. But hey, at least YOU'RE not the turkey, right?\n\nSo what's your biggest concern? Family drama? Kitchen disasters? Uncle Bob's political rants? I'm here to help you navigate this beautiful trainwreck! 💪`,
      },
    ])
  }, [])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)
    setError("")

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://backend-rust-seven-88.vercel.app"

      const contextualMessage = `User's Thanksgiving situation:
- Family Members: ${userInfo.familyMembers}
- Chaos Level: ${userInfo.craziness}
- Drinks Per Person: ${userInfo.drinksPer}
- Politics Situation: ${userInfo.politicsLevel}
- Host's Cooking Skills: ${userInfo.cookingSkill}

User's question: ${currentInput}

Please respond as the HotMessCoach - be funny, sarcastic, but genuinely helpful. Use turkey and food emojis. Keep it concise and entertaining!`

      const response = await fetch(`${backendUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: contextualMessage,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from coach")
      }

      const data = await response.json()
      const coachResponse = data.reply || "🦃 The coach is speechless... try again!"

      const assistantMessage: Message = {
        role: "assistant",
        content: coachResponse,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError("Oops! The coach got overwhelmed. Try again?")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#fbffb9" }}>
      <div className="max-w-4xl mx-auto h-screen flex flex-col pb-4">
        <div className="flex items-center justify-between mb-4 pt-4">
          <div className="flex items-center gap-4">
            <img
              src="/mad-turkey.png"
              alt="Stressed Turkey"
              className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#754f44" }}>
                {"HotMessCoach"}
              </h1>
              <p className="text-sm" style={{ color: "#754f44" }}>
                {"Your Thanksgiving survival expert"}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onReset}
            aria-label="Start Over"
            style={{ borderColor: "#ec7357", color: "#ec7357" }}
          >
            <RotateCcwIcon />
          </Button>
        </div>

        <Card className="flex-1 flex flex-col border-4" style={{ borderColor: "#ec7357" }}>
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user" ? "rounded-br-none" : "rounded-bl-none"
                    }`}
                    style={{
                      backgroundColor: message.role === "user" ? "#fdd692" : "#e1ce7a",
                      color: "#754f44",
                    }}
                  >
                    <p className="whitespace-pre-wrap text-pretty">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="max-w-[80%] rounded-lg rounded-bl-none p-4"
                    style={{ backgroundColor: "#e1ce7a", color: "#754f44" }}
                  >
                    <p>{"🦃 Thinking... (the turkey wishes he had this much time)"}</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t-4" style={{ borderColor: "#ec7357" }}>
            {error && (
              <Alert className="mb-4" style={{ borderColor: "#ec7357", backgroundColor: "#fdd692" }}>
                <AlertDescription style={{ color: "#754f44" }}>{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                placeholder="Ask for help... quickly, before someone asks about your love life!"
                disabled={isLoading}
                style={{ borderColor: "#ec7357" }}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                aria-label="Send"
                style={{ borderColor: "#ec7357", color: "#ec7357" }}
              >
                <ArrowUpIcon />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
