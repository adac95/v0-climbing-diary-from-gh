"use client"

import { useState, useEffect } from "react"
import styles from "./gradient-loader.module.css"

// GRADIENT SPINNER COMPONENT
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

// CHECK ICON COMPONENT
function CheckIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

// X ICON COMPONENT
function XIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

// ALERT CIRCLE ICON COMPONENT
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

// GRADIENT LOADING BUTTON
export function GradientLoadingButton({ isLoading, isSuccess, isError, onSave, onCancel, disabled }) {
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
              <span>Guardando...</span>
            </>
          ) : showSuccess ? (
            <>
              <div className={styles.successIcon}>
                <CheckIcon className={styles.successIconInner} />
                <div className={styles.successGlow} />
                <div className={styles.successPulse} />
              </div>
              <span>¡Guardado!</span>
            </>
          ) : isError ? (
            <>
              <AlertCircleIcon className={styles.successIconInner} />
              <span>Error</span>
            </>
          ) : (
            <>
              <CheckIcon className={styles.successIconInner} />
              <span>Guardar</span>
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
          <span>Cancelar</span>
        </div>
      </button>
    </div>
  )
}

// GRADIENT FIELD OVERLAY
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

// PREMIUM GRADIENT TOAST
export function PremiumGradientToast({ isLoading, isSuccess, isError, errorMessage }) {
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
                <div className={styles.toastTitle}>Guardando cambios</div>
                <div className={styles.toastSubtitle}>Por favor espera...</div>
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
                <div className={styles.toastTitle}>¡Cambios guardados!</div>
                <div className={styles.toastSubtitle}>Todo listo</div>
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
                <div className={styles.toastTitle}>Error al guardar</div>
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
