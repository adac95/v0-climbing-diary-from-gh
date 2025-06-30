"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  GradientLoadingButton,
  PremiumGradientToast,
  GradientFieldOverlay,
} from "../../../components/ui/gradient-loader"
import styles from "./route-details.module.css"

// ICON COMPONENTS
function MapPinIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function StarIcon({ className, filled }) {
  return (
    <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
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

function Edit3Icon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  )
}

function PlusIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}

function ZapIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function CalendarIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )
}

// EDITABLE FIELD COMPONENT
function EditableField({ label, value, onSave, placeholder, type = "text", options, multiline = false }) {
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
      <div className={styles.fieldContainer}>
        <label className={styles.fieldLabel}>{label}</label>
        <div className={styles.formContainer}>
          {type === "select" && options ? (
            <div style={{ position: "relative" }}>
              <select
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                disabled={isLoading}
                className={styles.selectField}
              >
                <option value="">Selecciona una opción</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <GradientFieldOverlay isLoading={isLoading} isSuccess={isSuccess} />
            </div>
          ) : multiline ? (
            <div style={{ position: "relative" }}>
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={placeholder}
                className={styles.textareaField}
                autoFocus
                disabled={isLoading}
              />
              <GradientFieldOverlay isLoading={isLoading} isSuccess={isSuccess} />
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={placeholder}
                className={styles.inputField}
                autoFocus
                disabled={isLoading}
              />
              <GradientFieldOverlay isLoading={isLoading} isSuccess={isSuccess} />
            </div>
          )}

          <GradientLoadingButton
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            onSave={handleSave}
            onCancel={handleCancel}
            disabled={!editValue.trim()}
          />
        </div>
      </div>
    )
  }

  const renderParticles = () => {
    if (!isHovered) return null

    return (
      <div className={styles.fieldParticles}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={styles.fieldParticle}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: "2s",
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.fieldContainer}>
      <label className={styles.fieldLabel}>{label}</label>
      <div
        className={`${styles.fieldDisplay} ${hasContent ? styles.fieldWithContent : styles.fieldEmpty}`}
        onClick={() => setIsEditing(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {hasContent ? (
          <>
            <div className={styles.fieldContent}>{value}</div>
            <div className={styles.editIcon}>
              <div className={styles.editIconButton}>
                <Edit3Icon className={styles.editIconSvg} />
              </div>
            </div>
            <div className={styles.fieldShine} />
            {renderParticles()}
          </>
        ) : (
          <div className={styles.fieldPlaceholder}>
            <PlusIcon className={styles.plusIcon} />
            <span className={styles.fieldPlaceholderText}>{placeholder}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// UTILITY FUNCTIONS
function getTypeColor(type) {
  switch (type) {
    case "Completada":
      return styles.typeGreen
    case "Proyecto":
      return styles.typeYellow
    default:
      return styles.typeGreen
  }
}

function getGradeColor(grade) {
  if (grade.includes("9b") || grade.includes("9c")) {
    return styles.gradeRed
  } else if (grade.includes("9a")) {
    return styles.gradeOrange
  } else if (grade.includes("8c")) {
    return styles.gradeBlue
  }
  return styles.gradeBlue
}

// API SIMULATION
const simulateApiCall = (data) => {
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

// MAIN COMPONENT
export default function RouteDetails({ route }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("ruta")
  const [personalBeta, setPersonalBeta] = useState(route.personalBeta)
  const [gradeOpinion, setGradeOpinion] = useState(route.gradeOpinion)
  const [generalNotes, setGeneralNotes] = useState(route.generalNotes)

  const [globalLoading, setGlobalLoading] = useState(false)
  const [globalSuccess, setGlobalSuccess] = useState(false)
  const [globalError, setGlobalError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSavePersonalBeta = async (value) => {
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

  const handleSaveGradeOpinion = async (value) => {
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

  const handleSaveGeneralNotes = async (value) => {
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
      <PremiumGradientToast
        isLoading={globalLoading}
        isSuccess={globalSuccess}
        isError={globalError}
        errorMessage={errorMessage}
      />

      <div className={styles.modalOverlay}>
        <div className={styles.modalCard}>
          <div className={styles.cardHeader}>
            <div className={styles.headerContent}>
              <div className={styles.locationInfo}>
                <MapPinIcon className={styles.locationText} />
                <span className={styles.locationText}>{route.location}</span>
              </div>
              <h2 className={styles.routeTitle}>{route.name}</h2>
              <div className={styles.badgeContainer}>
                <div className={`${styles.badge} ${getGradeColor(route.grade)}`}>{route.grade}</div>
                <div className={styles.starContainer}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`${styles.star} ${i < route.rating ? styles.starFilled : styles.starEmpty}`}
                      filled={i < route.rating}
                    />
                  ))}
                </div>
                <div className={`${styles.badge} ${getTypeColor(route.type)}`}>{route.type}</div>
              </div>
            </div>
            <button className={styles.closeButton} onClick={() => router.back()}>
              <XIcon />
            </button>
          </div>

          <div className={styles.cardContent}>
            <div className={styles.tabsList}>
              <button
                className={`${styles.tabsTrigger} ${activeTab === "ruta" ? styles.tabsTriggerActive : ""}`}
                onClick={() => setActiveTab("ruta")}
              >
                Ruta
              </button>
              <button
                className={`${styles.tabsTrigger} ${activeTab === "sesiones" ? styles.tabsTriggerActive : ""}`}
                onClick={() => setActiveTab("sesiones")}
              >
                Sesiones
              </button>
            </div>

            {activeTab === "ruta" && (
              <div className={styles.tabsContent}>
                <div className={styles.statsSection}>
                  <div className={styles.statsDecoration1} />
                  <div className={styles.statsDecoration2} />

                  <h3 className={styles.statsTitle}>Pegues registrados</h3>
                  <div className={styles.statsContent}>
                    <div className={styles.statsLeft}>
                      <span className={styles.attemptsNumber}>{route.attempts}</span>
                      <span className={styles.attemptsLabel}>intentos</span>
                    </div>
                    <div className={styles.statsRight}>
                      <div className={styles.sessionsLabel}>registrados en</div>
                      <div className={styles.sessionsNumber}>{route.sessions} sesiones</div>
                    </div>
                  </div>
                </div>

                <EditableField
                  label="Beta personal"
                  value={personalBeta}
                  onSave={handleSavePersonalBeta}
                  placeholder="Haz click para agregar tu beta personal..."
                  multiline={true}
                />

                <EditableField
                  label="Opinión del grado"
                  value={gradeOpinion}
                  onSave={handleSaveGradeOpinion}
                  placeholder="Haz click para agregar tu opinión del grado..."
                  type="select"
                  options={["Fácil para el grado", "Correcto", "Duro para el grado"]}
                />

                <EditableField
                  label="Notas generales de la ruta"
                  value={generalNotes}
                  onSave={handleSaveGeneralNotes}
                  placeholder="Haz click para agregar notas generales..."
                  multiline={true}
                />

                <div className={styles.actionButtons}>
                  <Link href={`/topos/${route.id}/intento-rapido`}>
                    <button className={`${styles.actionButton} ${styles.quickButton}`}>
                      <ZapIcon className={`${styles.buttonIcon} ${styles.zapIcon}`} />
                      Intento rápido
                    </button>
                  </Link>
                  <Link href={`/topos/${route.id}/intento-detallado`}>
                    <button className={`${styles.actionButton} ${styles.detailedButton}`}>
                      <PlusIcon className={styles.buttonIcon} />
                      Intento detallado
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "sesiones" && (
              <div className={styles.sessionsEmpty}>
                <div className={styles.sessionsIcon}>
                  <CalendarIcon className={styles.sessionsIconSvg} />
                </div>
                <h3 className={styles.sessionsTitle}>Historial de sesiones</h3>
                <p className={styles.sessionsSubtitle}>Aquí aparecerán todas tus sesiones registradas</p>
                <button className={styles.sessionsButton}>Próximamente...</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
