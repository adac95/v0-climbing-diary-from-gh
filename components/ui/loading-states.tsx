"use client"

import { Check, X, Loader2, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface LoadingButtonProps {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  onSave: () => void
  onCancel: () => void
  disabled?: boolean
}

export function LoadingButton({ isLoading, isSuccess, isError, onSave, onCancel, disabled }: LoadingButtonProps) {
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true)
      const timer = setTimeout(() => setShowSuccess(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  return (
    <div className="flex gap-2">
      <button
        onClick={onSave}
        disabled={disabled || isLoading}
        className={`
          relative overflow-hidden px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform
          ${
            isLoading
              ? "bg-blue-400 text-white cursor-not-allowed"
              : showSuccess
                ? "bg-green-500 text-white scale-105"
                : isError
                  ? "bg-red-500 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 active:scale-95"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <div className="flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Guardando...</span>
            </>
          ) : showSuccess ? (
            <>
              <Check className="w-4 h-4 animate-bounce" />
              <span>¡Guardado!</span>
            </>
          ) : isError ? (
            <>
              <AlertCircle className="w-4 h-4" />
              <span>Error</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Guardar</span>
            </>
          )}
        </div>

        {/* Efecto de onda al hacer click */}
        <div className="absolute inset-0 bg-white opacity-0 rounded-lg transition-opacity duration-300 hover:opacity-10" />
      </button>

      <button
        onClick={onCancel}
        disabled={isLoading}
        className="px-4 py-2 rounded-lg font-medium text-sm border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center gap-2">
          <X className="w-4 h-4" />
          <span>Cancelar</span>
        </div>
      </button>
    </div>
  )
}

interface SaveIndicatorProps {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  errorMessage?: string
}

export function SaveIndicator({ isLoading, isSuccess, isError, errorMessage }: SaveIndicatorProps) {
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    if (isLoading || isSuccess || isError) {
      setShowIndicator(true)
    }

    if (isSuccess) {
      const timer = setTimeout(() => setShowIndicator(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isLoading, isSuccess, isError])

  if (!showIndicator) return null

  return (
    <div
      className={`
      fixed top-4 right-4 z-[9999] transform transition-all duration-500 ease-out
      ${showIndicator ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
    `}
    >
      <div
        className={`
        flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-sm border
        ${
          isLoading
            ? "bg-blue-50/90 border-blue-200 text-blue-800"
            : isSuccess
              ? "bg-green-50/90 border-green-200 text-green-800"
              : "bg-red-50/90 border-red-200 text-red-800"
        }
      `}
      >
        {isLoading && (
          <>
            <div className="relative">
              <Loader2 className="w-5 h-5 animate-spin" />
              <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-pulse" />
            </div>
            <span className="font-medium">Guardando cambios...</span>
          </>
        )}

        {isSuccess && (
          <>
            <div className="relative">
              <Check className="w-5 h-5 animate-bounce" />
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" />
            </div>
            <span className="font-medium">¡Cambios guardados!</span>
          </>
        )}

        {isError && (
          <>
            <div className="relative">
              <AlertCircle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="font-medium">Error al guardar</div>
              {errorMessage && <div className="text-xs opacity-80">{errorMessage}</div>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

interface FieldLoadingOverlayProps {
  isLoading: boolean
  isSuccess: boolean
}

export function FieldLoadingOverlay({ isLoading, isSuccess }: FieldLoadingOverlayProps) {
  if (!isLoading && !isSuccess) return null

  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] rounded-lg flex items-center justify-center z-10">
      {isLoading ? (
        <div className="flex items-center gap-2 text-blue-600">
          <div className="relative">
            <Loader2 className="w-5 h-5 animate-spin" />
            <div className="absolute inset-0 border-2 border-blue-200 rounded-full animate-pulse" />
          </div>
          <span className="text-sm font-medium">Guardando...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-green-600 animate-bounce">
          <div className="relative">
            <Check className="w-5 h-5" />
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-30" />
          </div>
          <span className="text-sm font-medium">¡Guardado!</span>
        </div>
      )}
    </div>
  )
}
