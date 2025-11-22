"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Plus, Check, X, Calendar, Target, TrendingUp, Award, Flame, Star, Trash2 } from "lucide-react"

interface Habit {
  id: string
  name: string
  description: string
  color: string
  streak: number
  completedDates: string[]
  target: number
  category: "health" | "productivity" | "mindfulness" | "social" | "learning"
}

const categoryColors = {
  health: "from-green-500 to-emerald-500",
  productivity: "from-blue-500 to-cyan-500",
  mindfulness: "from-purple-500 to-violet-500",
  social: "from-pink-500 to-rose-500",
  learning: "from-orange-500 to-amber-500",
}

const categoryIcons = {
  health: "💪",
  productivity: "⚡",
  mindfulness: "🧘",
  social: "👥",
  learning: "📚",
}

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Morning Meditation",
      description: "10 minutes of mindfulness",
      color: "purple",
      streak: 5,
      completedDates: ["2024-01-20", "2024-01-21", "2024-01-22", "2024-01-23", "2024-01-24"],
      target: 7,
      category: "mindfulness",
    },
    {
      id: "2",
      name: "Exercise",
      description: "30 minutes of physical activity",
      color: "green",
      streak: 3,
      completedDates: ["2024-01-22", "2024-01-23", "2024-01-24"],
      target: 5,
      category: "health",
    },
    {
      id: "3",
      name: "Focus Work",
      description: "Deep work session",
      color: "blue",
      streak: 7,
      completedDates: [
        "2024-01-18",
        "2024-01-19",
        "2024-01-20",
        "2024-01-21",
        "2024-01-22",
        "2024-01-23",
        "2024-01-24",
      ],
      target: 5,
      category: "productivity",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    category: "productivity" as Habit["category"],
    target: 7,
  })

  const today = new Date().toISOString().split("T")[0]
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getWeekDates = () => {
    const dates = []
    const today = new Date()
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date.toISOString().split("T")[0])
    }
    return dates
  }

  const weekDates = getWeekDates()

  const toggleHabit = (habitId: string, date: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === habitId) {
          const isCompleted = habit.completedDates.includes(date)
          const newCompletedDates = isCompleted
            ? habit.completedDates.filter((d) => d !== date)
            : [...habit.completedDates, date].sort()

          // Calculate new streak
          let newStreak = 0
          const sortedDates = newCompletedDates.sort().reverse()
          const today = new Date().toISOString().split("T")[0]

          for (let i = 0; i < sortedDates.length; i++) {
            const checkDate = new Date()
            checkDate.setDate(checkDate.getDate() - i)
            const expectedDate = checkDate.toISOString().split("T")[0]

            if (sortedDates.includes(expectedDate)) {
              newStreak++
            } else {
              break
            }
          }

          return {
            ...habit,
            completedDates: newCompletedDates,
            streak: newStreak,
          }
        }
        return habit
      }),
    )
  }

  const addHabit = () => {
    if (newHabit.name.trim()) {
      const habit: Habit = {
        id: Date.now().toString(),
        name: newHabit.name,
        description: newHabit.description,
        color: newHabit.category,
        streak: 0,
        completedDates: [],
        target: newHabit.target,
        category: newHabit.category,
      }
      setHabits((prev) => [...prev, habit])
      setNewHabit({ name: "", description: "", category: "productivity", target: 7 })
      setShowAddForm(false)
    }
  }

  const deleteHabit = (habitId: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId))
  }

  const getCompletionRate = (habit: Habit) => {
    const thisWeekCompleted = weekDates.filter((date) => habit.completedDates.includes(date)).length
    return (thisWeekCompleted / 7) * 100
  }

  const getTotalStats = () => {
    const totalHabits = habits.length
    const totalStreaks = habits.reduce((sum, habit) => sum + habit.streak, 0)
    const avgCompletion =
      habits.length > 0 ? habits.reduce((sum, habit) => sum + getCompletionRate(habit), 0) / habits.length : 0

    return { totalHabits, totalStreaks, avgCompletion }
  }

  const stats = getTotalStats()

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-purple-200">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">{stats.totalHabits}</div>
            <div className="text-sm text-purple-600">Active Habits</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-200">
          <CardContent className="p-4 text-center">
            <Flame className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">{stats.totalStreaks}</div>
            <div className="text-sm text-orange-600">Total Streaks</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{Math.round(stats.avgCompletion)}%</div>
            <div className="text-sm text-green-600">Avg Completion</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border-pink-200">
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-pink-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-pink-700">{habits.filter((h) => h.streak >= h.target).length}</div>
            <div className="text-sm text-pink-600">Goals Reached</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Habit Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">My Habits</h2>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Habit
        </Button>
      </div>

      {/* Add Habit Form */}
      {showAddForm && (
        <Card className="border-2 border-purple-200 bg-purple-50/50">
          <CardHeader>
            <CardTitle>Create New Habit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Habit Name</label>
                <input
                  type="text"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="e.g., Morning Walk"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  value={newHabit.category}
                  onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value as Habit["category"] })}
                  className="w-full p-2 border rounded mt-1"
                >
                  <option value="productivity">⚡ Productivity</option>
                  <option value="health">💪 Health</option>
                  <option value="mindfulness">🧘 Mindfulness</option>
                  <option value="social">👥 Social</option>
                  <option value="learning">📚 Learning</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <input
                type="text"
                value={newHabit.description}
                onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Brief description of the habit"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addHabit} className="bg-green-600 hover:bg-green-700">
                <Check className="h-4 w-4 mr-2" />
                Create Habit
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Habits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {habits.map((habit) => (
          <Card key={habit.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${categoryColors[habit.category]} flex items-center justify-center text-white text-xl`}
                  >
                    {categoryIcons[habit.category]}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{habit.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{habit.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    {habit.streak}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteHabit(habit.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Week View */}
              <div className="grid grid-cols-7 gap-2">
                {weekDates.map((date, index) => {
                  const isCompleted = habit.completedDates.includes(date)
                  const isToday = date === today
                  return (
                    <div key={date} className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">{weekDays[index]}</div>
                      <button
                        onClick={() => toggleHabit(habit.id, date)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                          isCompleted
                            ? `bg-gradient-to-r ${categoryColors[habit.category]} border-transparent text-white`
                            : isToday
                              ? "border-purple-400 bg-purple-50 hover:bg-purple-100"
                              : "border-gray-300 hover:border-purple-300 hover:bg-purple-50"
                        }`}
                      >
                        {isCompleted && <Check className="h-4 w-4 mx-auto" />}
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>This Week</span>
                  <span>{Math.round(getCompletionRate(habit))}%</span>
                </div>
                <Progress value={getCompletionRate(habit)} className="h-2" />
              </div>

              {/* Stats */}
              <div className="flex justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {weekDates.filter((date) => habit.completedDates.includes(date)).length}/7 this week
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {habit.streak >= habit.target ? "Goal Reached!" : `${habit.target - habit.streak} to goal`}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {habits.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No habits yet</h3>
            <p className="text-muted-foreground mb-4">Start building positive habits to support your ADHD journey</p>
            <Button onClick={() => setShowAddForm(true)} className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Habit
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
