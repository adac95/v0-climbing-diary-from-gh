"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, X, Zap, Plus, Edit3, Calendar } from "lucide-react"
import { ModernLoadingButton, UltraModernToast, SkeletonLoader } from "@/components/ui/modern-loaders"
import Link from "next/link"

interface Route {
  id: string
  name: string
  grade: string
  rating: number
  location: string
  type: string
  attempts: number
  sessions: number
  description: string
  firstAscent: string
  personalBeta: string
  gradeOpinion: string
  generalNotes: string
}

interface RouteDetailsProps {
  route: Route
}

interface UltraEditableFieldProps {
  label: string
  value: string
  onSave: (value: string) => Promise<void>
  placeholder: string
  type?: "text" | "select"
  options?: string[]
  multiline?: boolean
  loaderType?: "morphing" | "gradient" | "wave" | "particle" | "breathing"
}

function UltraEditableField({
  label,
  value,
  onSave,
  placeholder,
  type = "text",
  options,
  multiline = false,
  loaderType = "gradient",
}: UltraEditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    setIsError(false)

    try {
      await onSave(editValue)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setIsEditing(false)
      }, 2000)
    } catch (error) {
      setIsError(true)
      setTimeout(() => setIsError(false), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
    setIsError(false)
  }

  const hasContent = value && value.trim().length > 0

  if (isEditing) {
    return (
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-800">{label}</label>
        <div className="space-y-4 relative">
          {isLoading ? (
            <div className="space-y-3">
              <SkeletonLoader lines={multiline ? 3 : 1} />
            </div>
          ) : (
            <>
              {type === "select" && options ? (
                <Select value={editValue} onValueChange={setEditValue} disabled={isLoading}>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : multiline ? (
                <Textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder={placeholder}
                  className="min-h-[100px] border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300 resize-none"
                  autoFocus
                  disabled={isLoading}
                />
              ) : (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 border-2 border-gray-200 focus:border-blue-500 rounded-xl focus:outline-none transition-all duration-300"
                  autoFocus
                  disabled={isLoading}
                />
              )}
            </>
          )}

          <ModernLoadingButton
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            onSave={handleSave}
            onCancel={handleCancel}
            disabled={!editValue.trim()}
            loaderType={loaderType}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-800">{label}</label>
      <div
        className={`relative group cursor-pointer transition-all duration-500 transform ${
          hasContent
            ? `bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 border-2 border-blue-200 rounded-2xl p-6 ${
                isHovered
                  ? "from-blue-100 via-blue-200 to-indigo-200 border-blue-300 shadow-2xl scale-[1.02] rotate-1"
                  : "hover:shadow-xl"
              }`
            : `bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-2xl p-6 ${
                isHovered ? "from-gray-100 via-gray-200 to-gray-300 border-gray-400 shadow-xl scale-[1.01]" : ""
              }`
        }`}
        onClick={() => setIsEditing(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {hasContent ? (
          <>
            <div className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed font-medium">{value}</div>
            <div
              className={`absolute top-4 right-4 transition-all duration-500 ${
                isHovered ? "opacity-100 scale-110 rotate-12" : "opacity-0 scale-90"
              }`}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl border-2 border-white/50">
                <Edit3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>

            {/* Efecto de partículas al hacer hover */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: "2s",
                    }}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center text-gray-500 text-sm py-4">
            <Plus className={`w-5 h-5 mr-3 transition-all duration-300 ${isHovered ? "scale-125 rotate-90" : ""}`} />
            <span className="font-semibold">{placeholder}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Simulación de API call
const simulateApiCall = (data: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        if (Math.random() > 0.1) {
          resolve()
        } else {
          reject(new Error("Error de conexión"))
        }
      },
      2000 + Math.random() * 1000,
    )
  })
}

function getTypeColor(type: string) {
  switch (type) {
    case "Completada":
      return "bg-green-100 text-green-800 border-green-200"
    case "Proyecto":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getGradeColor(grade: string) {
  if (grade.includes("9b") || grade.includes("9c")) {
    return "bg-red-100 text-red-800 border-red-200"
  } else if (grade.includes("9a")) {
    return "bg-orange-100 text-orange-800 border-orange-200"
  } else if (grade.includes("8c")) {
    return "bg-blue-100 text-blue-800 border-blue-200"
  }
  return "bg-gray-100 text-gray-800 border-gray-200"
}

export default function RouteDetailsUltra({ route }: RouteDetailsProps) {
  const router = useRouter()
  const [personalBeta, setPersonalBeta] = useState(route.personalBeta)
  const [gradeOpinion, setGradeOpinion] = useState(route.gradeOpinion)
  const [generalNotes, setGeneralNotes] = useState(route.generalNotes)

  const [globalLoading, setGlobalLoading] = useState(false)
  const [globalSuccess, setGlobalSuccess] = useState(false)
  const [globalError, setGlobalError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSavePersonalBeta = async (value: string) => {
    setGlobalLoading(true)
    try {
      await simulateApiCall({ personalBeta: value })
      setPersonalBeta(value)
      setGlobalSuccess(true)
      setTimeout(() => setGlobalSuccess(false), 4000)
    } catch (error) {
      setGlobalError(true)
      setErrorMessage("No se pudo guardar la beta personal")
      setTimeout(() => {
        setGlobalError(false)
        setErrorMessage("")
      }, 5000)
      throw error
    } finally {
      setGlobalLoading(false)
    }
  }

  const handleSaveGradeOpinion = async (value: string) => {
    setGlobalLoading(true)
    try {
      await simulateApiCall({ gradeOpinion: value })
      setGradeOpinion(value)
      setGlobalSuccess(true)
      setTimeout(() => setGlobalSuccess(false), 4000)
    } catch (error) {
      setGlobalError(true)
      setErrorMessage("No se pudo guardar la opinión del grado")
      setTimeout(() => {
        setGlobalError(false)
        setErrorMessage("")
      }, 5000)
      throw error
    } finally {
      setGlobalLoading(false)
    }
  }

  const handleSaveGeneralNotes = async (value: string) => {
    setGlobalLoading(true)
    try {
      await simulateApiCall({ generalNotes: value })
      setGeneralNotes(value)
      setGlobalSuccess(true)
      setTimeout(() => setGlobalSuccess(false), 4000)
    } catch (error) {
      setGlobalError(true)
      setErrorMessage("No se pudieron guardar las notas generales")
      setTimeout(() => {
        setGlobalError(false)
        setErrorMessage("")
      }, 5000)
      throw error
    } finally {
      setGlobalLoading(false)
    }
  }

  return (
    <>
      <UltraModernToast
        isLoading={globalLoading}
        isSuccess={globalSuccess}
        isError={globalError}
        errorMessage={errorMessage}
      />

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-medium">{route.location}</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {route.name}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className={getGradeColor(route.grade)}>
                  {route.grade}
                </Badge>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 transition-all duration-200 ${i < route.rating ? "fill-yellow-400 text-yellow-400 scale-110" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <Badge variant="outline" className={getTypeColor(route.type)}>
                  {route.type}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-red-100 hover:text-red-600 transition-all duration-300 hover:scale-110"
              onClick={() => router.back()}
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
            <Tabs defaultValue="ruta" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1">
                <TabsTrigger value="ruta" className="rounded-lg transition-all duration-300">
                  Ruta
                </TabsTrigger>
                <TabsTrigger value="sesiones" className="rounded-lg transition-all duration-300">
                  Sesiones
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ruta" className="space-y-8 mt-6">
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-20 translate-x-20" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-200/30 to-blue-200/30 rounded-full translate-y-16 -translate-x-16" />

                  <h3 className="font-bold mb-6 text-blue-900 text-lg relative z-10">Pegues registrados</h3>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-black text-blue-900">{route.attempts}</span>
                      <span className="text-sm text-blue-700 font-semibold">intentos</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-blue-700 font-medium">registrados en</div>
                      <div className="text-2xl font-bold text-blue-900">{route.sessions} sesiones</div>
                    </div>
                  </div>
                </div>

                <UltraEditableField
                  label="Beta personal"
                  value={personalBeta}
                  onSave={handleSavePersonalBeta}
                  placeholder="Haz click para agregar tu beta personal..."
                  multiline={true}
                  loaderType="gradient"
                />

                <UltraEditableField
                  label="Opinión del grado"
                  value={gradeOpinion}
                  onSave={handleSaveGradeOpinion}
                  placeholder="Haz click para agregar tu opinión del grado..."
                  type="select"
                  options={["Fácil para el grado", "Correcto", "Duro para el grado"]}
                  loaderType="wave"
                />

                <UltraEditableField
                  label="Notas generales de la ruta"
                  value={generalNotes}
                  onSave={handleSaveGeneralNotes}
                  placeholder="Haz click para agregar notas generales..."
                  multiline={true}
                  loaderType="breathing"
                />

                <div className="flex flex-col gap-4 pt-6">
                  <Link href={`/topos/${route.id}/intento-rapido`}>
                    <Button
                      variant="outline"
                      className="w-full bg-white text-black border-2 border-black hover:bg-gray-50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] rounded-xl py-4 text-lg font-semibold"
                    >
                      <Zap className="w-5 h-5 mr-3 text-yellow-500" />
                      Intento rápido
                    </Button>
                  </Link>
                  <Link href={`/topos/${route.id}/intento-detallado`}>
                    <Button className="w-full bg-gradient-to-r from-black to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] rounded-xl py-4 text-lg font-semibold">
                      <Plus className="w-5 h-5 mr-3" />
                      Intento detallado
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="sesiones" className="mt-6">
                <div className="text-center py-16">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Calendar className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Historial de sesiones</h3>
                  <p className="text-gray-500 mb-6 text-lg">Aquí aparecerán todas tus sesiones registradas</p>
                  <Button
                    variant="outline"
                    className="text-base hover:scale-105 transition-all duration-300 bg-transparent rounded-xl px-8 py-3"
                  >
                    Próximamente...
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
