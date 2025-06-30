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
import { X, Zap } from "lucide-react"

export default function IntentoRapidoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [resultado, setResultado] = useState("")
  const [altura, setAltura] = useState("")
  const [notas, setNotas] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí guardarías el intento rápido
    console.log({ resultado, altura, notas })
    router.back()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Intento Rápido
          </CardTitle>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resultado">Resultado</Label>
              <Select value={resultado} onValueChange={setResultado} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el resultado" />
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

            <div className="space-y-2">
              <Label htmlFor="altura">Altura máxima alcanzada</Label>
              <Input
                id="altura"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="ej: 15m, chapa 8, crux..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notas">Notas rápidas</Label>
              <Textarea
                id="notas"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Observaciones rápidas del intento..."
                className="min-h-[80px]"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Guardar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
