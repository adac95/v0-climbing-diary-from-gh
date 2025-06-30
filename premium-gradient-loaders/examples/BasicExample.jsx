import {
  GradientSpinner,
  GradientLoadingButton,
  PremiumGradientToast,
  useAsyncState,
} from "../components/GradientLoaders"

// Simular una API call
const simulateApiCall = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve({ success: true })
      } else {
        reject(new Error("Error de conexión"))
      }
    }, 2000)
  })
}

export default function BasicExample() {
  // Usando el hook personalizado
  const { isLoading, isSuccess, isError, errorMessage, execute } = useAsyncState(simulateApiCall)

  const handleSave = async () => {
    try {
      await execute()
      console.log("¡Guardado exitosamente!")
    } catch (error) {
      console.error("Error al guardar:", error)
    }
  }

  const handleCancel = () => {
    console.log("Operación cancelada")
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>🎨 Premium Gradient Loaders - Ejemplo Básico</h1>

      {/* Toast Global */}
      <PremiumGradientToast isLoading={isLoading} isSuccess={isSuccess} isError={isError} errorMessage={errorMessage} />

      <div style={{ marginBottom: "40px" }}>
        <h2>Spinners</h2>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div>
            <p>Pequeño:</p>
            <GradientSpinner size="sm" />
          </div>
          <div>
            <p>Mediano:</p>
            <GradientSpinner size="md" />
          </div>
          <div>
            <p>Grande:</p>
            <GradientSpinner size="lg" />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2>Botón con Estados</h2>
        <GradientLoadingButton
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          onSave={handleSave}
          onCancel={handleCancel}
          disabled={false}
        />

        {isError && <p style={{ color: "red", marginTop: "10px" }}>Error: {errorMessage}</p>}
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2>Estados Actuales</h2>
        <ul>
          <li>Loading: {isLoading ? "✅" : "❌"}</li>
          <li>Success: {isSuccess ? "✅" : "❌"}</li>
          <li>Error: {isError ? "✅" : "❌"}</li>
        </ul>
      </div>
    </div>
  )
}
