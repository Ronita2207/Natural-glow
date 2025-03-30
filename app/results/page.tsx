"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Heart, Download, Share2 } from "lucide-react"

// Natural skincare ingredients database
const naturalIngredients = {
  cleansers: {
    dry: ["Honey", "Oatmeal", "Aloe Vera"],
    oily: ["Clay (Bentonite or Kaolin)", "Apple Cider Vinegar", "Tea Tree Oil"],
    combination: ["Honey", "Yogurt", "Green Tea"],
    normal: ["Oatmeal", "Honey", "Aloe Vera"],
    sensitive: ["Oatmeal", "Chamomile", "Aloe Vera"],
  },
  moisturizers: {
    dry: ["Shea Butter", "Avocado Oil", "Rosehip Oil"],
    oily: ["Aloe Vera", "Jojoba Oil", "Witch Hazel"],
    combination: ["Jojoba Oil", "Aloe Vera", "Rosehip Oil"],
    normal: ["Coconut Oil", "Aloe Vera", "Shea Butter"],
    sensitive: ["Aloe Vera", "Calendula Oil", "Chamomile Extract"],
  },
  treatments: {
    acne: ["Tea Tree Oil", "Witch Hazel", "Aloe Vera"],
    aging: ["Rosehip Oil", "Green Tea Extract", "Vitamin E Oil"],
    dullness: ["Papaya Enzyme", "Lemon Juice", "Turmeric"],
    dryness: ["Honey", "Avocado Oil", "Aloe Vera"],
    redness: ["Aloe Vera", "Chamomile", "Cucumber Extract"],
  },
  climate: {
    dry: ["Shea Butter", "Almond Oil", "Honey"],
    humid: ["Witch Hazel", "Aloe Vera", "Green Tea"],
    cold: ["Coconut Oil", "Shea Butter", "Avocado Oil"],
    hot: ["Aloe Vera", "Cucumber Extract", "Rose Water"],
    moderate: ["Jojoba Oil", "Aloe Vera", "Rosehip Oil"],
  },
}

export default function Results() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [routine, setRoutine] = useState<any>(null)

  useEffect(() => {
    if (searchParams && !routine) {
      const skinType = searchParams.get("skin-type") || "normal"
      const concern = searchParams.get("concerns") || "dullness"
      const climate = searchParams.get("climate") || "moderate"
      const allergies = searchParams.get("allergies") || "none"

      // Generate personalized routine based on answers
      const generatedRoutine = {
        skinType,
        concern,
        climate,
        allergies,
        morning: {
          cleanser: getRandomIngredient(
            naturalIngredients.cleansers[skinType as keyof typeof naturalIngredients.cleansers],
            allergies,
          ),
          moisturizer: getRandomIngredient(
            naturalIngredients.moisturizers[skinType as keyof typeof naturalIngredients.moisturizers],
            allergies,
          ),
          treatment: getRandomIngredient(
            naturalIngredients.treatments[concern as keyof typeof naturalIngredients.treatments],
            allergies,
          ),
        },
        evening: {
          cleanser: getRandomIngredient(
            naturalIngredients.cleansers[skinType as keyof typeof naturalIngredients.cleansers],
            allergies,
          ),
          moisturizer: getRandomIngredient(
            naturalIngredients.moisturizers[skinType as keyof typeof naturalIngredients.moisturizers],
            allergies,
          ),
          treatment: getRandomIngredient(
            naturalIngredients.climate[climate as keyof typeof naturalIngredients.climate],
            allergies,
          ),
        },
      }

      setRoutine(generatedRoutine)
    }
  }, [searchParams, routine])

  // Helper function to get a random ingredient that's not in the allergies
  function getRandomIngredient(ingredients: string[], allergies: string) {
    const filteredIngredients = ingredients.filter((ingredient) => {
      if (allergies === "none") return true
      if (allergies === "nuts" && (ingredient.includes("Almond") || ingredient.includes("Shea"))) return false
      if (allergies === "citrus" && (ingredient.includes("Lemon") || ingredient.includes("Orange"))) return false
      if (
        allergies === "flowers" &&
        (ingredient.includes("Chamomile") || ingredient.includes("Lavender") || ingredient.includes("Rose"))
      )
        return false
      return true
    })

    // Use a more stable approach to select an ingredient
    // This ensures we don't get different results on each render
    const seed = filteredIngredients.join("").length + allergies.length
    const index = seed % filteredIngredients.length

    return filteredIngredients[index] || ingredients[0] // Fallback to first ingredient if filtered list is empty
  }

  if (!routine) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-6 bg-gradient-to-b from-green-50 to-teal-50">
        <p>Generating your personalized natural skincare routine...</p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-6 bg-gradient-to-b from-green-50 to-teal-50">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-6">
          <Button variant="ghost" className="text-green-700" onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <Card className="border-green-100 shadow-sm mb-6">
          <CardHeader className="bg-green-50 rounded-t-lg">
            <CardTitle className="text-green-800">Your Natural Skincare Routine</CardTitle>
            <CardDescription>
              Personalized for {routine.skinType} skin with {routine.concern} concerns
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="morning">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="morning">Morning Routine</TabsTrigger>
                <TabsTrigger value="evening">Evening Routine</TabsTrigger>
              </TabsList>

              <TabsContent value="morning" className="space-y-4">
                <div className="border rounded-lg p-4 bg-green-50/50">
                  <h3 className="font-medium text-green-800 mb-2">1. Cleanse</h3>
                  <p className="text-sm">{routine.morning.cleanser} Cleanser</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Gently cleanse your face with {routine.morning.cleanser.toLowerCase()} to remove impurities without
                    stripping natural oils.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-green-50/50">
                  <h3 className="font-medium text-green-800 mb-2">2. Treat</h3>
                  <p className="text-sm">{routine.morning.treatment} Treatment</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Apply {routine.morning.treatment.toLowerCase()} to target your specific skin concerns.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-green-50/50">
                  <h3 className="font-medium text-green-800 mb-2">3. Moisturize</h3>
                  <p className="text-sm">{routine.morning.moisturizer} Moisturizer</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Hydrate your skin with {routine.morning.moisturizer.toLowerCase()} to lock in moisture throughout
                    the day.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="evening" className="space-y-4">
                <div className="border rounded-lg p-4 bg-green-50/50">
                  <h3 className="font-medium text-green-800 mb-2">1. Cleanse</h3>
                  <p className="text-sm">{routine.evening.cleanser} Cleanser</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Thoroughly cleanse your face with {routine.evening.cleanser.toLowerCase()} to remove makeup, dirt,
                    and pollutants from the day.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-green-50/50">
                  <h3 className="font-medium text-green-800 mb-2">2. Treat</h3>
                  <p className="text-sm">{routine.evening.treatment} Treatment</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Apply {routine.evening.treatment.toLowerCase()} to repair and rejuvenate your skin overnight.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-green-50/50">
                  <h3 className="font-medium text-green-800 mb-2">3. Moisturize</h3>
                  <p className="text-sm">{routine.evening.moisturizer} Moisturizer</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Apply a generous amount of {routine.evening.moisturizer.toLowerCase()} to nourish your skin while
                    you sleep.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" className="border-green-200 text-green-700">
              <Heart className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" className="border-green-200 text-green-700">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" className="border-green-200 text-green-700">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-green-100 shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-green-800 text-lg">Natural Ingredients Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h3 className="font-medium text-green-800">{routine.morning.cleanser}</h3>
              <p className="text-xs text-gray-600">
                Natural cleanser that gently removes impurities without harsh chemicals.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-green-800">{routine.morning.treatment}</h3>
              <p className="text-xs text-gray-600">Helps with {routine.concern} using purely natural properties.</p>
            </div>
            <div>
              <h3 className="font-medium text-green-800">{routine.morning.moisturizer}</h3>
              <p className="text-xs text-gray-600">Natural moisturizer that hydrates without synthetic ingredients.</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-gray-500 text-xs mb-8">
          <p>All recommendations use 100% natural ingredients.</p>
          <p>Results may vary. Patch test recommended before full application.</p>
        </div>
      </div>
    </main>
  )
}

