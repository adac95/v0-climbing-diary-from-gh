"use client"

import { useState } from "react"
import { GradientLoadingButton, PremiumGradientToast, GradientFieldOverlay } from "../components/GradientLoaders"

export default function FormExample() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [fieldStates, setFieldStates] = useState({
    name: { loading: false, success: false },
    email: { loading: false, success: false },
    message: { loading: false, success: false },
  })

  const [globalState, setGlobalState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: "",
  })

  // Simular guardado de campo individual
  const saveField = async (fieldName, value) => {
    setFieldStates((prev) => ({
      ...prev,
      [fieldName]: { loading: true, success: false },
    }))

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setFieldStates((prev) => ({
        ...prev,
        [fieldName]: { loading: false, success: true },
      }))

      setTimeout(() => {
        setFieldStates((prev) => ({
          ...prev,
          [fieldName]: { loading: false, success: false },
        }))
      }, 2000)
    } catch (error) {
      setFieldStates((prev) => ({
        ...prev,
        [fieldName]: { loading: false, success: false },
      }))
    }
  }

  // Simular envío de formulario completo
  const handleSubmit = async () => {
    setGlobalState({
      loading: true,
      success: false,
      error: false,
      errorMessage: "",
    })

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.3) {
            resolve()
          } else {
            reject(new Error("Error al enviar el formulario"))
          }
        }, 3000)
      })

      setGlobalState({
        loading: false,
        success: true,
        error: false,
        errorMessage: "",
      })

      setTimeout(() => {
        setGlobalState((prev) => ({ ...prev, success: false }))
      }, 4000)
    } catch (error) {
      setGlobalState({
        loading: false,
        success: false,
        error: true,
        errorMessage: error.message,
      })

      setTimeout(() => {
        setGlobalState({
          loading: false,
          success: false,
          error: false,
          errorMessage: "",
        })
      }, 5000)
    }
  }

  const handleCancel = () => {
    setFormData({ name: "", email: "", message: "" })
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "all 0.3s ease",
  }

  const fieldContainerStyle = {
    position: "relative",
    marginBottom: "20px",
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>📝 Formulario con Loaders Premium</h1>

      {/* Toast Global */}
      <PremiumGradientToast
        isLoading={globalState.loading}
        isSuccess={globalState.success}
        isError={globalState.error}
        errorMessage={globalState.errorMessage}
        loadingTitle="Enviando formulario"
        loadingSubtitle="Procesando información..."
        successTitle="¡Formulario enviado!"
        successSubtitle="Recibirás una respuesta pronto"
      />

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Campo Nombre */}
        <div style={fieldContainerStyle}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Nombre</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            onBlur={() => formData.name && saveField("name", formData.name)}
            style={inputStyle}
            placeholder="Tu nombre completo"
          />
          <GradientFieldOverlay isLoading={fieldStates.name.loading} isSuccess={fieldStates.name.success} />
        </div>

        {/* Campo Email */}
        <div style={fieldContainerStyle}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            onBlur={() => formData.email && saveField("email", formData.email)}
            style={inputStyle}
            placeholder="tu@email.com"
          />
          <GradientFieldOverlay isLoading={fieldStates.email.loading} isSuccess={fieldStates.email.success} />
        </div>

        {/* Campo Mensaje */}
        <div style={fieldContainerStyle}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Mensaje</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            onBlur={() => formData.message && saveField("message", formData.message)}
            style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
            placeholder="Escribe tu mensaje aquí..."
          />
          <GradientFieldOverlay isLoading={fieldStates.message.loading} isSuccess={fieldStates.message.success} />
        </div>

        {/* Botones */}
        <div style={{ marginTop: "30px" }}>
          <GradientLoadingButton
            isLoading={globalState.loading}
            isSuccess={globalState.success}
            isError={globalState.error}
            onSave={handleSubmit}
            onCancel={handleCancel}
            disabled={!formData.name || !formData.email || !formData.message}
            saveText="Enviar Formulario"
            loadingText="Enviando..."
            successText="¡Enviado!"
          />
        </div>
      </form>

      <div style={{ marginTop: "40px", padding: "20px", background: "#f8f9fa", borderRadius: "8px" }}>
        <h3>💡 Características de este ejemplo:</h3>
        <ul>
          <li>✅ Guardado automático por campo (onBlur)</li>
          <li>✅ Overlay visual en cada campo</li>
          <li>✅ Toast global para el formulario completo</li>
          <li>✅ Estados independientes por campo</li>
          <li>✅ Validación básica</li>
          <li>✅ Manejo de errores</li>
        </ul>
      </div>
    </div>
  )
}
