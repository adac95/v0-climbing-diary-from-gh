"use client"

import { useState, useEffect } from "react"
import styles from "../styles/gradient-loader.module.css"

// ============================================================================
// ICON COMPONENTS
// ============================================================================

function CheckIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function XIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function AlertCircleIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

// ============================================================================
// GRADIENT SPINNER COMPONENT
// ============================================================================

/**
 * Premium gradient spinner with glow effects
 * @param {string} size - Size variant: 'sm', 'md', 'lg'
 */
export function GradientSpinner({ size = "md" }) {
  const sizeClass = styles[`gradientSpinner${size.charAt(0).toUpperCase() + size.slice(1)}`]

  return (
    <div className={`${styles.gradientSpinner} ${sizeClass}`}>
      <div className={styles.spinnerRing}>
        <div className={styles.spinnerInner} />
      </div>
      <div className={styles.spinnerGlow} />
      <div className={styles.spinnerPulse} />
    </div>
  )
}

// ============================================================================
// GRADIENT LOADING BUTTON
// ============================================================================

/**
 * Premium loading button with gradient effects and state management
 * @param {boolean} isLoading - Loading state
 * @param {boolean} isSuccess - Success state
 * @param {boolean} isError - Error state
 * @param {function} onSave - Save callback
 * @param {function} onCancel - Cancel callback
 * @param {boolean} disabled - Disabled state
 */
export function GradientLoadingButton({
  isLoading,
  isSuccess,
  isError,
  onSave,
  onCancel,
  disabled,
  saveText = "Guardar",
  cancelText = "Cancelar",
  loadingText = "Guardando...",
  successText = "¡Guardado!",
}) {
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true)
      const timer = setTimeout(() => setShowSuccess(false), 2500)
      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  const getButtonClass = () => {
    if (isLoading) return `${styles.loadingButton} ${styles.loadingButtonLoading}`
    if (showSuccess) return `${styles.loadingButton} ${styles.loadingButtonSuccess}`
    if (isError) return `${styles.loadingButton} ${styles.loadingButtonError}`
    return `${styles.loadingButton} ${styles.loadingButtonDefault}`
  }

  const renderParticles = () => {
    if (!showSuccess) return null

    return (
      <div className={styles.successParticles}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.loadingButtonContainer}>
      <button
        onClick={onSave}
        disabled={disabled || isLoading}
        className={`${getButtonClass()} ${disabled ? styles.loadingButtonDisabled : ""}`}
      >
        <div className={styles.buttonContent}>
          {isLoading ? (
            <>
              <GradientSpinner size="sm" />
              <span>{loadingText}</span>
            </>
          ) : showSuccess ? (
            <>
              <div className={styles.successIcon}>
                <CheckIcon className={styles.successIconInner} />
                <div className={styles.successGlow} />
                <div className={styles.successPulse} />
              </div>
              <span>{successText}</span>
            </>
          ) : isError ? (
            <>
              <AlertCircleIcon className={styles.successIconInner} />
              <span>Error</span>
            </>
          ) : (
            <>
              <CheckIcon className={styles.successIconInner} />
              <span>{saveText}</span>
            </>
          )}
        </div>

        {!isLoading && !showSuccess && !isError && <div className={styles.buttonShine} />}
        {renderParticles()}
      </button>

      <button
        onClick={onCancel}
        disabled={isLoading}
        className={`${styles.cancelButton} ${isLoading ? styles.loadingButtonDisabled : ""}`}
      >
        <div className={styles.cancelButtonContent}>
          <XIcon className={styles.successIconInner} />
          <span>{cancelText}</span>
        </div>
      </button>
    </div>
  )
}

// ============================================================================
// GRADIENT FIELD OVERLAY
// ============================================================================

/**
 * Overlay component for form fields with loading/success states
 * @param {boolean} isLoading - Loading state
 * @param {boolean} isSuccess - Success state
 */
export function GradientFieldOverlay({ isLoading, isSuccess }) {
  if (!isLoading && !isSuccess) return null

  return (
    <div className={styles.fieldOverlay}>
      {isLoading ? (
        <div className={`${styles.overlayContent} ${styles.overlayLoading}`}>
          <GradientSpinner size="md" />
          <span>Guardando...</span>
        </div>
      ) : (
        <div className={`${styles.overlayContent} ${styles.overlaySuccess}`}>
          <div className={styles.successIcon}>
            <CheckIcon className={styles.successIconInner} />
            <div className={styles.successGlow} />
            <div className={styles.successPulse} />
          </div>
          <span>¡Guardado!</span>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// PREMIUM GRADIENT TOAST
// ============================================================================

/**
 * Premium toast notification with glassmorphism effects
 * @param {boolean} isLoading - Loading state
 * @param {boolean} isSuccess - Success state
 * @param {boolean} isError - Error state
 * @param {string} errorMessage - Custom error message
 * @param {string} loadingTitle - Custom loading title
 * @param {string} loadingSubtitle - Custom loading subtitle
 * @param {string} successTitle - Custom success title
 * @param {string} successSubtitle - Custom success subtitle
 * @param {string} errorTitle - Custom error title
 */
export function PremiumGradientToast({
  isLoading,
  isSuccess,
  isError,
  errorMessage,
  loadingTitle = "Guardando cambios",
  loadingSubtitle = "Por favor espera...",
  successTitle = "¡Cambios guardados!",
  successSubtitle = "Todo listo",
  errorTitle = "Error al guardar",
}) {
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

  const getToastClass = () => {
    if (isLoading) return `${styles.toast} ${styles.toastLoading}`
    if (isSuccess) return `${styles.toast} ${styles.toastSuccess}`
    return `${styles.toast} ${styles.toastError}`
  }

  const renderFloatingParticles = () => {
    if (!isLoading) return null

    return (
      <div className={styles.floatingParticles}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={styles.floatingParticle}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={`${styles.toastContainer} ${showToast ? styles.toastVisible : styles.toastHidden}`}>
      <div className={getToastClass()}>
        <div className={styles.toastGlow} />
        {renderFloatingParticles()}

        <div className={styles.toastContent}>
          {isLoading && (
            <>
              <div className={styles.toastIcon}>
                <GradientSpinner size="md" />
              </div>
              <div className={styles.toastText}>
                <div className={styles.toastTitle}>{loadingTitle}</div>
                <div className={styles.toastSubtitle}>{loadingSubtitle}</div>
              </div>
            </>
          )}

          {isSuccess && (
            <>
              <div className={styles.toastIcon}>
                <CheckIcon className={styles.successIconInner} />
                <div className={`${styles.toastIconGlow} ${styles.toastIconGlowWhite}`} />
                <div className={`${styles.toastIconGlow} ${styles.toastIconGlowGreen}`} />
              </div>
              <div className={styles.toastText}>
                <div className={styles.toastTitle}>{successTitle}</div>
                <div className={styles.toastSubtitle}>{successSubtitle}</div>
              </div>
            </>
          )}

          {isError && (
            <>
              <div className={styles.toastIcon}>
                <AlertCircleIcon className={styles.successIconInner} />
                <div className={`${styles.toastIconGlow} ${styles.toastIconGlowWhite}`} />
              </div>
              <div className={styles.toastText}>
                <div className={styles.toastTitle}>{errorTitle}</div>
                <div className={styles.toastSubtitle}>{errorMessage || "Inténtalo de nuevo"}</div>
              </div>
            </>
          )}
        </div>

        {isLoading && (
          <div className={styles.toastProgress}>
            <div className={styles.progressBar} />
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// UTILITY HOOK FOR EASY STATE MANAGEMENT
// ============================================================================

/**
 * Custom hook for managing loading states
 * @param {function} asyncFunction - Async function to execute
 * @returns {object} State and execute function
 */
export function useAsyncState(asyncFunction) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const execute = async (...args) => {
    setIsLoading(true)
    setIsError(false)
    setErrorMessage("")

    try {
      const result = await asyncFunction(...args)
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 3000)
      return result
    } catch (error) {
      setIsError(true)
      setErrorMessage(error.message || "Ha ocurrido un error")
      setTimeout(() => {
        setIsError(false)
        setErrorMessage("")
      }, 5000)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    isSuccess,
    isError,
    errorMessage,
    execute,
  }
}
