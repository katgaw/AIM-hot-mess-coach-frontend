"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface QuestionnaireProps {
  onComplete: (data: {
    familyMembers: number
    craziness: string
    drinksPer: number
    politicsLevel: string
    cookingSkill: string
  }) => void
}

export function ThanksgivingQuestionnaire({ onComplete }: QuestionnaireProps) {
  const [familyMembers, setFamilyMembers] = useState("")
  const [craziness, setCraziness] = useState("")
  const [drinksPer, setDrinksPer] = useState("")
  const [politicsLevel, setPoliticsLevel] = useState("")
  const [cookingSkill, setCookingSkill] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete({
      familyMembers: Number.parseInt(familyMembers),
      craziness,
      drinksPer: Number.parseInt(drinksPer),
      politicsLevel,
      cookingSkill,
    })
  }

  const isComplete = familyMembers && craziness && drinksPer && politicsLevel && cookingSkill

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#fbffb9" }}>
      <Card className="w-full max-w-2xl border-4" style={{ borderColor: "#ec7357" }}>
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img src="/mad-turkey.png" alt="Stressed Turkey" className="w-48 h-48 object-contain" />
          </div>
          <CardTitle className="text-4xl font-bold text-balance" style={{ color: "#754f44" }}>
            {"🦃 HotMessCoach at Thanksgiving 🔥"}
          </CardTitle>
          <CardDescription className="text-lg text-pretty" style={{ color: "#754f44" }}>
            {"Surviving family drama since... well, this Thursday. Let's assess the damage before it happens!"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="familyMembers" className="text-lg font-semibold" style={{ color: "#754f44" }}>
                {"How many family members are invading... I mean, joining you?"}
              </Label>
              <Select value={familyMembers} onValueChange={setFamilyMembers}>
                <SelectTrigger id="familyMembers" style={{ borderColor: "#ec7357" }}>
                  <SelectValue placeholder="Pick your doom level..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">{"1-5 (Rookie Numbers)"}</SelectItem>
                  <SelectItem value="6-10">{"6-10 (Getting Spicy)"}</SelectItem>
                  <SelectItem value="11-15">{"11-15 (Full Circus Mode)"}</SelectItem>
                  <SelectItem value="16-20">{"16-20 (Someone Call Security)"}</SelectItem>
                  <SelectItem value="20+">{"20+ (May God Have Mercy)"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="craziness" className="text-lg font-semibold" style={{ color: "#754f44" }}>
                {"What's the craziness vibe this year?"}
              </Label>
              <Select value={craziness} onValueChange={setCraziness}>
                <SelectTrigger id="craziness" style={{ borderColor: "#ec7357" }}>
                  <SelectValue placeholder="Rate the chaos..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zen">{"Zen Garden (Are you sure it's your family?)"}</SelectItem>
                  <SelectItem value="mild">{"Mild Salsa (Few eye rolls, no biggie)"}</SelectItem>
                  <SelectItem value="medium">{"Medium Drama (Someone will cry)"}</SelectItem>
                  <SelectItem value="spicy">{"Extra Spicy (Multiple people will storm out)"}</SelectItem>
                  <SelectItem value="nuclear">{"Nuclear Hot (Hide the car keys NOW)"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="drinksPer" className="text-lg font-semibold" style={{ color: "#754f44" }}>
                {"Average drinks per person? (Be honest, this is a judgement-free zone)"}
              </Label>
              <Select value={drinksPer} onValueChange={setDrinksPer}>
                <SelectTrigger id="drinksPer" style={{ borderColor: "#ec7357" }}>
                  <SelectValue placeholder="Liquid courage levels..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">{"0 (Mormon Thanksgiving or Kids Only)"}</SelectItem>
                  <SelectItem value="1-2">{"1-2 (Civilized Folk)"}</SelectItem>
                  <SelectItem value="3-4">{"3-4 (Getting Interesting)"}</SelectItem>
                  <SelectItem value="5-7">{"5-7 (Truth Serum Territory)"}</SelectItem>
                  <SelectItem value="8+">{"8+ (Brace for Impact)"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="politicsLevel" className="text-lg font-semibold" style={{ color: "#754f44" }}>
                {"Will politics be discussed?"}
              </Label>
              <Select value={politicsLevel} onValueChange={setPoliticsLevel}>
                <SelectTrigger id="politicsLevel" style={{ borderColor: "#ec7357" }}>
                  <SelectValue placeholder="The forbidden topic..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{"Absolutely Not (We banned it!)"}</SelectItem>
                  <SelectItem value="whispers">{"Whispered Mentions (Safe... for now)"}</SelectItem>
                  <SelectItem value="heated">{"Heated Debates (Buckle up)"}</SelectItem>
                  <SelectItem value="ww3">{"Full WW3 (Someone's getting unfriended)"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cookingSkill" className="text-lg font-semibold" style={{ color: "#754f44" }}>
                {"Your cooking skills are...?"}
              </Label>
              <Select value={cookingSkill} onValueChange={setCookingSkill}>
                <SelectTrigger id="cookingSkill" style={{ borderColor: "#ec7357" }}>
                  <SelectValue placeholder="Be real with yourself..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gordon">{"Gordon Ramsay Level (Flawless)"}</SelectItem>
                  <SelectItem value="decent">{"Pretty Decent (Few smoke alarms)"}</SelectItem>
                  <SelectItem value="average">{"Average Joe (Edible, mostly)"}</SelectItem>
                  <SelectItem value="disaster">{"Hot Mess (Pizza on speed dial)"}</SelectItem>
                  <SelectItem value="arson">{"Fire Hazard (Please order takeout)"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full text-lg py-6 font-bold"
              disabled={!isComplete}
              style={{
                backgroundColor: "#ec7357",
                color: "#fbffb9",
              }}
            >
              {"HELP ME SURVIVE THIS! 🆘"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
