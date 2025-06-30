"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { X, Plus } from "lucide-react"

export default function IntentoDetalladoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0])
  const [resultado, setResultado] = useState("")
  const [altura, setAltura] = useState("")
  const [energia, setEnergia] = useState([7])
  const [motivacion, setMotivacion] = useState([8])
  const [condiciones, setCondiciones] = useState("")
  const [temperatura, setTemperatura] = useState("")
  const [humedad, setHumedad] = useState("")
  const [viento, setViento] = useState("")
  const [calentamiento, setCalentamiento] = useState("")
  const [estrategia, setEstrategia] = useState("")
  const [ejecucion, setEjecucion] = useState("")
  const [fallos, setFallos] = useState("")
  const [aprendizajes, setAprendizajes] = useState("")
  const [proximosPasos, setProximosPasos] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí guardarías el intento detallado
    console.log({
      fecha,
      resultado,
      altura,
      energia: energia[0],
      motivacion: motivacion[0],
      condiciones,
      temperatura,
      humedad,
      viento,
      calentamiento,
      estrategia,
      ejecucion,
      fallos,
      aprendizajes,
      proximosPasos,
    })
    router.back()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-2xl my-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Intento Detallado
          </CardTitle>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información básica */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha</Label>
                <Input id="fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resultado">Resultado</Label>
                <Select value={resultado} onValueChange={setResultado} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Resultado del intento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="encadenada">Encadenada ✅</SelectItem>
                    <SelectItem value="caida-final">Caída en movimiento final</SelectItem>
                    <SelectItem value="caida-media">Caída a media altura</SelectItem>
                    <SelectItem value="caida-inicio">Caída al inicio</SelectItem>
                    <SelectItem value="no-intentada">No intentada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="altura">Altura máxima alcanzada</Label>
              <Input
                id="altura"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="Describe hasta dónde llegaste..."
              />
            </div>

            {/* Estado físico y mental */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label>Nivel de energía: {energia[0]}/10</Label>
                <Slider value={energia} onValueChange={setEnergia} max={10} min={1} step={1} className="w-full" />
              </div>
              <div className="space-y-3">
                <Label>Motivación: {motivacion[0]}/10</Label>
                <Slider value={motivacion} onValueChange={setMotivacion} max={10} min={1} step={1} className="w-full" />
              </div>
            </div>

            {/* Condiciones */}
            <div className="space-y-4">
              <h3 className="font-semibold">Condiciones</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temperatura">Temperatura</Label>
                  <Input
                    id="temperatura"
                    value={temperatura}
                    onChange={(e) => setTemperatura(e.target.value)}
                    placeholder="ej: 18°C"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="humedad">Humedad</Label>
                  <Select value={humedad} onValueChange={setHumedad}>
                    <SelectTrigger>
                      <SelectValue placeholder="Humedad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seco">Seco</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="humedo">Húmedo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="viento">Viento</Label>
                  <Select value={viento} onValueChange={setViento}>
                    <SelectTrigger>
                      <SelectValue placeholder="Viento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sin-viento">Sin viento</SelectItem>
                      <SelectItem value="brisa">Brisa ligera</SelectItem>
                      <SelectItem value="viento-fuerte">Viento fuerte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condiciones">Otras condiciones</Label>
                <Textarea
                  id="condiciones"
                  value={condiciones}
                  onChange={(e) => setCondiciones(e.target.value)}
                  placeholder="Sombra, sol, multitud, etc..."
                  className="min-h-[60px]"
                />
              </div>
            </div>

            {/* Preparación */}
            <div className="space-y-2">
              <Label htmlFor="calentamiento">Calentamiento</Label>
              <Textarea
                id="calentamiento"
                value={calentamiento}
                onChange={(e) => setCalentamiento(e.target.value)}
                placeholder="Describe tu rutina de calentamiento..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estrategia">Estrategia planificada</Label>
              <Textarea
                id="estrategia"
                value={estrategia}
                onChange={(e) => setEstrategia(e.target.value)}
                placeholder="¿Cuál era tu plan para este intento?"
                className="min-h-[80px]"
              />
            </div>

            {/* Ejecución */}
            <div className="space-y-2">
              <Label htmlFor="ejecucion">Ejecución del intento</Label>
              <Textarea
                id="ejecucion"
                value={ejecucion}
                onChange={(e) => setEjecucion(e.target.value)}
                placeholder="Describe cómo fue el intento, movimiento por movimiento..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fallos">Errores y dificultades</Label>
              <Textarea
                id="fallos"
                value={fallos}
                onChange={(e) => setFallos(e.target.value)}
                placeholder="¿Qué salió mal? ¿Dónde tuviste dificultades?"
                className="min-h-[80px]"
              />
            </div>

            {/* Análisis */}
            <div className="space-y-2">
              <Label htmlFor="aprendizajes">Aprendizajes</Label>
              <Textarea
                id="aprendizajes"
                value={aprendizajes}
                onChange={(e) => setAprendizajes(e.target.value)}
                placeholder="¿Qué aprendiste de este intento?"
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proximosPasos">Próximos pasos</Label>
              <Textarea
                id="proximosPasos"
                value={proximosPasos}
                onChange={(e) => setProximosPasos(e.target.value)}
                placeholder="¿En qué te vas a enfocar para el próximo intento?"
                className="min-h-[80px]"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Guardar Intento
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
