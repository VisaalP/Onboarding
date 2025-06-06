"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, User, Briefcase, Settings, Upload, ArrowLeft, ArrowRight } from "lucide-react"

interface OnboardingData {
  // Personal Info
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string

  // Professional Info
  jobTitle: string
  company: string
  experience: string
  skills: string[]

  // Preferences
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  interests: string[]
  goals: string
}

const STEPS = [
  { id: 1, title: "Personal Info", icon: User, description: "Tell us about yourself" },
  { id: 2, title: "Professional", icon: Briefcase, description: "Your work experience" },
  { id: 3, title: "Preferences", icon: Settings, description: "Customize your experience" },
]

const SKILLS_OPTIONS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Design",
  "Marketing",
  "Sales",
  "Management",
  "Data Analysis",
  "AI/ML",
]

const INTERESTS_OPTIONS = [
  "Technology",
  "Design",
  "Business",
  "Marketing",
  "Finance",
  "Health",
  "Education",
  "Travel",
  "Sports",
  "Music",
  "Art",
  "Gaming",
]

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    company: "",
    experience: "",
    skills: [],
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    interests: [],
    goals: "",
  })

  const progress = (currentStep / STEPS.length) * 100

  const updateData = (field: string, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const updateNestedData = (parent: string, field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent as keyof OnboardingData], [field]: value },
    }))
  }

  const toggleArrayItem = (field: string, item: string) => {
    setData((prev) => ({
      ...prev,
      [field]: prev[field as keyof OnboardingData].includes(item)
        ? prev[field as keyof OnboardingData].filter((i: string) => i !== item)
        : [...prev[field as keyof OnboardingData], item],
    }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    console.log("Onboarding completed:", data)
    // Here you would typically send the data to your backend
    alert("Welcome! Your account has been set up successfully.")
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return data.firstName && data.lastName && data.email
      case 2:
        return data.jobTitle && data.company && data.skills.length > 0
      case 3:
        return data.interests.length > 0
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={data.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {data.firstName?.[0]}
                    {data.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 rounded-full p-2">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={data.firstName}
                  onChange={(e) => updateData("firstName", e.target.value)}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={data.lastName}
                  onChange={(e) => updateData("lastName", e.target.value)}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => updateData("email", e.target.value)}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => updateData("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={data.jobTitle}
                onChange={(e) => updateData("jobTitle", e.target.value)}
                placeholder="Software Engineer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={data.company}
                onChange={(e) => updateData("company", e.target.value)}
                placeholder="Acme Corp"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Select value={data.experience} onValueChange={(value) => updateData("experience", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                  <SelectItem value="lead">Lead/Principal (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Skills & Expertise</Label>
              <p className="text-sm text-muted-foreground">Select all that apply</p>
              <div className="grid grid-cols-2 gap-2">
                {SKILLS_OPTIONS.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={data.skills.includes(skill)}
                      onCheckedChange={() => toggleArrayItem("skills", skill)}
                    />
                    <Label htmlFor={skill} className="text-sm font-normal">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
              {data.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {data.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Notification Preferences</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email-notifications"
                    checked={data.notifications.email}
                    onCheckedChange={(checked) => updateNestedData("notifications", "email", checked)}
                  />
                  <Label htmlFor="email-notifications">Email notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="push-notifications"
                    checked={data.notifications.push}
                    onCheckedChange={(checked) => updateNestedData("notifications", "push", checked)}
                  />
                  <Label htmlFor="push-notifications">Push notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sms-notifications"
                    checked={data.notifications.sms}
                    onCheckedChange={(checked) => updateNestedData("notifications", "sms", checked)}
                  />
                  <Label htmlFor="sms-notifications">SMS notifications</Label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Interests</Label>
              <p className="text-sm text-muted-foreground">Help us personalize your experience</p>
              <div className="grid grid-cols-2 gap-2">
                {INTERESTS_OPTIONS.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={data.interests.includes(interest)}
                      onCheckedChange={() => toggleArrayItem("interests", interest)}
                    />
                    <Label htmlFor={interest} className="text-sm font-normal">
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
              {data.interests.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {data.interests.map((interest) => (
                    <Badge key={interest} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">What are your main goals? (Optional)</Label>
              <Textarea
                id="goals"
                value={data.goals}
                onChange={(e) => updateData("goals", e.target.value)}
                placeholder="Tell us what you hope to achieve..."
                rows={3}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center space-x-4">
            {STEPS.map((step) => {
              const Icon = step.icon
              const isCompleted = currentStep > step.id
              const isCurrent = currentStep === step.id

              return (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div
                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors
                    ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isCurrent
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-gray-100 border-gray-300 text-gray-400"
                    }
                  `}
                  >
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${isCurrent ? "text-blue-600" : "text-gray-500"}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {STEPS.length}
            </p>
          </div>

          <div>
            <CardTitle className="text-2xl">Welcome to Our Platform!</CardTitle>
            <CardDescription>Let's get you set up with a personalized experience</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {renderStepContent()}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            {currentStep === STEPS.length ? (
              <Button onClick={handleComplete} disabled={!isStepValid()} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Complete Setup</span>
              </Button>
            ) : (
              <Button onClick={nextStep} disabled={!isStepValid()} className="flex items-center space-x-2">
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
