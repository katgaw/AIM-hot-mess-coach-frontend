"use client"

import { useState } from "react"
import { ThanksgivingQuestionnaire } from "@/components/thanksgiving-questionnaire"
import { ThanksgivingChat } from "@/components/thanksgiving-chat"

export default function Home() {
  const [showChat, setShowChat] = useState(false)
  const [userInfo, setUserInfo] = useState({
    familyMembers: 0,
    craziness: "",
    drinksPer: 0,
    politicsLevel: "",
    cookingSkill: "",
  })

  const handleStartChat = (info: typeof userInfo) => {
    setUserInfo(info)
    setShowChat(true)
  }

  const handleReset = () => {
    setShowChat(false)
    setUserInfo({
      familyMembers: 0,
      craziness: "",
      drinksPer: 0,
      politicsLevel: "",
      cookingSkill: "",
    })
  }

  return (
    <main className="min-h-screen">
      {!showChat ? (
        <ThanksgivingQuestionnaire onComplete={handleStartChat} />
      ) : (
        <ThanksgivingChat userInfo={userInfo} onReset={handleReset} />
      )}
    </main>
  )
}
