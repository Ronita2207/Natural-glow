"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"

const questions = [
  {
    id: "skin-type",
    question: "How would you describe your skin most days?",
    options: [
      { value: "dry", label: "Dry, tight, sometimes flaky" },
      { value: "oily", label: "Oily, especially in the T-zone" },
      { value: "combination", label: "Combination - oily T-zone, normal/dry cheeks" },
      { value: "normal", label: "Balanced - neither too oily nor too dry" },
      { value: "sensitive", label: "Sensitive - easily irritated, redness" },
    ],
  },
  {
    id: "concerns",
    question: "What's your primary skin concern?",
    options: [
      { value: "acne", label: "Acne or breakouts" },
      { value: "aging", label: "Signs of aging (fine lines, wrinkles)" },
      { value: "dullness", label: "Dullness or uneven skin tone" },
      { value: "dryness", label: "Dryness or dehydration" },
      { value: "redness", label: "Redness or irritation" },
    ],
  },
  {
    id: "climate",
    question: "What climate do you live in?",
    options: [
      { value: "dry", label: "Dry climate" },
      { value: "humid", label: "Humid climate" },
      { value: "cold", label: "Cold climate" },
      { value: "hot", label: "Hot climate" },
      { value: "moderate", label: "Moderate climate" },
    ],
  },
  {
    id: "allergies",
    question: "Do you have any known allergies to natural ingredients?",
    options: [
      { value: "none", label: "No known allergies" },
      { value: "nuts", label: "Tree nuts or nut oils" },
      { value: "citrus", label: "Citrus fruits or oils" },
      { value: "flowers", label: "Floral extracts (lavender, rose, etc.)" },
      { value: "other", label: "Other natural ingredients" },
    ],
  },
]

export default function Assessment() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentAnswer, setCurrentAnswer] = useState<string>("")

  const handleNext = () => {
    if (currentAnswer) {
      const updatedAnswers = {
        ...answers,
        [questions[currentQuestion].id]: currentAnswer,
      }
      setAnswers(updatedAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setCurrentAnswer("")
      } else {
        // Navigate to results with the answers
        const queryParams = new URLSearchParams()
        Object.entries(updatedAnswers).forEach(([key, value]) => {
          queryParams.append(key, value)
        })
        router.push(`/results?${queryParams.toString()}`)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setCurrentAnswer(answers[questions[currentQuestion - 1].id] || "")
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-6 bg-gradient-to-b from-green-50 to-teal-50">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-6">
          <Button variant="ghost" className="text-green-700" onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-green-800">Skin Assessment</h2>
          <p className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <Progress value={progress} className="h-2 mt-2 bg-green-100" />
        </div>

        <Card className="border-green-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-green-800">{questions[currentQuestion].question}</CardTitle>
            <CardDescription>Select the option that best describes you</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer} className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 border rounded-md p-3 hover:bg-green-50 transition-colors"
                >
                  <RadioGroupItem value={option.value} id={option.value} className="text-green-600" />
                  <Label htmlFor={option.value} className="flex-grow cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border-green-200 text-green-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={handleNext} disabled={!currentAnswer} className="bg-green-600 hover:bg-green-700">
              {currentQuestion < questions.length - 1 ? "Next" : "See Results"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

