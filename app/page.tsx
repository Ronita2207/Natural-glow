import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Droplets, Sun, Shield, ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-6 bg-gradient-to-b from-green-50 to-teal-50">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8 mt-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-green-800">Natural Glow</h1>
          <p className="text-gray-600 mt-2">Your AI Skincare Advisor</p>
        </div>

        <Card className="mb-6 border-green-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-green-800">Discover Your Perfect Routine</CardTitle>
            <CardDescription>Get personalized skincare recommendations using only natural ingredients</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <img
              src="/placeholder.svg?height=180&width=300"
              alt="Natural skincare illustration"
              className="rounded-lg h-[180px] object-cover"
            />
          </CardContent>
          <CardFooter>
            <Link href="/assessment" className="w-full">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Start Skin Assessment
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="border-green-100 shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium text-green-800 flex items-center">
                <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                Hydration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-xs text-gray-600">Natural ways to keep your skin hydrated</p>
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium text-green-800 flex items-center">
                <Sun className="h-4 w-4 mr-2 text-amber-500" />
                Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-xs text-gray-600">Natural sun protection alternatives</p>
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium text-green-800 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-purple-500" />
                Anti-aging
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-xs text-gray-600">Natural ingredients that fight aging</p>
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium text-green-800 flex items-center">
                <Leaf className="h-4 w-4 mr-2 text-green-500" />
                Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-xs text-gray-600">Learn about natural skincare ingredients</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-gray-500 text-xs mb-8">
          <p>All recommendations are based on natural ingredients only.</p>
          <p>This app does not replace professional dermatological advice.</p>
        </div>
      </div>
    </main>
  )
}

