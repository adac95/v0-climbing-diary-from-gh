"use client"

import { Check, X, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

// 1. LOADER CON MORPHING DOTS (Muy popular en 2024)
export function MorphingDotsLoader() {
  return (
    <div className="flex items-center gap-1">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animation: `morphDot 1.4s ease-in-out infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes morphDot {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

// 2. LOADER CON GRADIENT SPINNER (Muy estético)
export function GradientSpinner() {
  return (
    <div className="relative w-6 h-6">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin">
        <div className="absolute inset-1 rounded-full bg-white" />
      </div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin opacity-20 blur-sm scale-110" />
    </div>
  )
}

// 3. LOADER CON WAVE EFFECT (Muy suave y moderno)
export function WaveLoader() {
  return (
    <div className="flex items-center space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-1 bg-gradient-to-t from-blue-400 to-blue-600 rounded-full animate-pulse"
          style={{
            height: "16px",
            animationDelay: `${i * 0.1}s`,
            animation: `wave 1.2s ease-in-out infinite ${i * 0.1}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave {
          0%, 60%, 100% {
            transform: scaleY(0.4);
          }
          30% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  )
}

// 4. LOADER CON PARTICLES (Muy llamativo)
export function ParticleLoader() {
  return (
    <div className="relative w-8 h-8">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-500 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: `rotate(${i * 45}deg) translateY(-12px)`,
            animation: `particle 1.2s linear infinite ${i * 0.15}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes particle {
          0%, 100% {
            opacity: 0;
            transform: rotate(${0}deg) translateY(-12px) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: rotate(${0}deg) translateY(-12px) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

// 5. LOADER CON BREATHING EFFECT (Muy orgánico)
export function BreathingLoader() {
  return (
    <div className="relative">
      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-40"
          style={{
            animation: "breathe 2s ease-in-out infinite",
          }}
        />
      </div>
      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  )
}

// 6. SKELETON LOADER (Muy profesional)
export function SkeletonLoader({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"
          style={{
            width: `${Math.random() * 40 + 60}%`,
            animation: `shimmer 2s ease-in-out infinite ${i * 0.2}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
      `}</style>
    </div>
  )
}

// COMPONENTE PRINCIPAL CON TODOS LOS LOADERS MODERNOS
interface ModernLoadingButtonProps {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  onSave: () => void
  onCancel: () => void
  disabled?: boolean
  loaderType?: "morphing" | "gradient" | "wave" | "particle" | "breathing"
}

export function ModernLoadingButton({
  isLoading,
  isSuccess,
  isError,
  onSave,
  onCancel,
  disabled,
  loaderType = "gradient",
}: ModernLoadingButtonProps) {
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true)
      const timer = setTimeout(() => setShowSuccess(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  const renderLoader = () => {
    switch (loaderType) {
      case "morphing":
        return <MorphingDotsLoader />
      case "gradient":
        return <GradientSpinner />
      case "wave":
        return <WaveLoader />
      case "particle":
        return <ParticleLoader />
      case "breathing":
        return <BreathingLoader />
      default:
        return <GradientSpinner />
    }
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={onSave}
        disabled={disabled || isLoading}
        className={`
          relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-500 transform
          ${
            isLoading
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white cursor-not-allowed shadow-lg"
              : showSuccess
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white scale-105 shadow-xl"
                : isError
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <div className="flex items-center justify-center gap-3">
          {isLoading ? (
            <>
              {renderLoader()}
              <span>Guardando...</span>
            </>
          ) : showSuccess ? (
            <>
              <div className="relative">
                <Check className="w-5 h-5" />
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30" />
              </div>
              <span>¡Guardado!</span>
            </>
          ) : isError ? (
            <>
              <AlertCircle className="w-5 h-5 animate-bounce" />
              <span>Error</span>
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              <span>Guardar</span>
            </>
          )}
        </div>

        {/* Efecto de ondas al hacer click */}
        <div className="absolute inset-0 bg-white opacity-0 rounded-xl transition-opacity duration-300 hover:opacity-10" />

        {/* Efecto de brillo */}
        {!isLoading && !showSuccess && !isError && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-all duration-1000"
            style={{
              transform: "translateX(-100%)",
              animation: "shine 2s ease-in-out infinite",
            }}
          />
        )}
      </button>

      <button
        onClick={onCancel}
        disabled={isLoading}
        className="px-6 py-3 rounded-xl font-semibold text-sm border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      >
        <div className="flex items-center gap-2">
          <X className="w-5 h-5" />
          <span>Cancelar</span>
        </div>
      </button>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}

// TOAST NOTIFICATION ULTRA MODERNO
interface UltraModernToastProps {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  errorMessage?: string
}

export function UltraModernToast({ isLoading, isSuccess, isError, errorMessage }: UltraModernToastProps) {
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (isLoading || isSuccess || isError) {
      setShowToast(true)
    }

    if (isSuccess) {
      const timer = setTimeout(() => setShowToast(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [isLoading, isSuccess, isError])

  if (!showToast) return null

  return (
    <div
      className={`
        fixed top-6 right-6 z-[9999] transform transition-all duration-700 ease-out
        ${showToast ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"}
      `}
    >
      <div
        className={`
          relative flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20
          ${
            isLoading
              ? "bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white"
              : isSuccess
                ? "bg-gradient-to-r from-green-500/90 to-green-600/90 text-white"
                : "bg-gradient-to-r from-red-500/90 to-red-600/90 text-white"
          }
        `}
      >
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl animate-pulse" />

        <div className="relative z-10 flex items-center gap-4">
          {isLoading && (
            <>
              <div className="relative">
                <GradientSpinner />
              </div>
              <div>
                <div className="font-semibold">Guardando cambios</div>
                <div className="text-sm opacity-90">Por favor espera...</div>
              </div>
            </>
          )}

          {isSuccess && (
            <>
              <div className="relative">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
              </div>
              <div>
                <div className="font-semibold">¡Cambios guardados!</div>
                <div className="text-sm opacity-90">Todo listo</div>
              </div>
            </>
          )}

          {isError && (
            <>
              <div className="relative">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="font-semibold">Error al guardar</div>
                <div className="text-sm opacity-90">{errorMessage || "Inténtalo de nuevo"}</div>
              </div>
            </>
          )}
        </div>

        {/* Barra de progreso para loading */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-2xl overflow-hidden">
            <div
              className="h-full bg-white/40 rounded-b-2xl"
              style={{
                animation: "progress 2s ease-in-out infinite",
              }}
            />
          </div>
        )}

        <style jsx>{`
          @keyframes progress {
            0% {
              width: 0%;
              transform: translateX(-100%);
            }
            50% {
              width: 100%;
              transform: translateX(0%);
            }
            100% {
              width: 100%;
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    </div>
  )
}
