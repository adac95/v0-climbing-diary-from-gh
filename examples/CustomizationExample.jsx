"use client"

import { useState } from "react"
import { GradientSpinner, PremiumGradientToast } from "../components/GradientLoaders"

export default function CustomizationExample() {
  const [activeDemo, setActiveDemo] = useState(null)

  const demos = [
    {
      id: "loading",
      title: "Estado Loading",
      action: () => {
        setActiveDemo({ loading: true, success: false, error: false })
        setTimeout(() => setActiveDemo(null), 3000)
      },
    },
    {
      id: "success",
      title: "Estado Success",
      action: () => {
        setActiveDemo({ loading: false, success: true, error: false })
        setTimeout(() => setActiveDemo(null), 3000)
      },
    },
    {
      id: "error",
      title: "Estado Error",
      action: () => {
        setActiveDemo({ loading: false, success: false, error: true })
        setTimeout(() => setActiveDemo(null), 3000)
      },
    },
  ]

  const buttonStyle = {
    padding: "10px 20px",
    margin: "5px",
    border: "2px solid #3b82f6",
    borderRadius: "8px",
    background: "white",
    color: "#3b82f6",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🎨 Personalización y Ejemplos Avanzados</h1>

      {/* Toast personalizado */}
      {activeDemo && (
        <PremiumGradientToast
          isLoading={activeDemo.loading}
          isSuccess={activeDemo.success}
          isError={activeDemo.error}
          errorMessage="Este es un mensaje de error personalizado"
          loadingTitle="Procesando datos"
          loadingSubtitle="Esto puede tomar unos segundos..."
          successTitle="¡Operación completada!"
          successSubtitle="Los cambios se han guardado correctamente"
          errorTitle="Algo salió mal"
        />
      )}

      <div style={{ marginBottom: "40px" }}>
        <h2>🧪 Prueba los Estados</h2>
        <p>Haz clic en los botones para ver los diferentes estados del toast:</p>
        <div style={{ marginTop: "20px" }}>
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={demo.action}
              style={buttonStyle}
              onMouseEnter={(e) => {
                e.target.style.background = "#3b82f6"
                e.target.style.color = "white"
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "white"
                e.target.style.color = "#3b82f6"
              }}
            >
              {demo.title}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2>🎯 Diferentes Tamaños de Spinner</h2>
        <div style={{ display: "flex", gap: "30px", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: "10px" }}>Pequeño (16px)</p>
            <GradientSpinner size="sm" />
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: "10px" }}>Mediano (24px)</p>
            <GradientSpinner size="md" />
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: "10px" }}>Grande (32px)</p>
            <GradientSpinner size="lg" />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2>🎨 Personalización de Colores</h2>
        <div
          style={{
            background: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "14px",
          }}
        >
          <p>
            <strong>Para cambiar los colores del gradiente, edita en el CSS:</strong>
          </p>
          <br />
          <code style={{ background: "#e9ecef", padding: "2px 6px", borderRadius: "4px" }}>
            background: linear-gradient(45deg, #tu-color-1, #tu-color-2, #tu-color-3);
          </code>
          <br />
          <br />
          <p>
            <strong>Ejemplos de gradientes populares:</strong>
          </p>
          <ul style={{ marginTop: "10px" }}>
            <li>🔥 Fuego: #ff6b6b, #feca57, #ff9ff3</li>
            <li>🌊 Océano: #74b9ff, #0984e3, #6c5ce7</li>
            <li>🌅 Atardecer: #fd79a8, #fdcb6e, #e17055</li>
            <li>🌿 Naturaleza: #00b894, #00cec9, #6c5ce7</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2>⚡ Rendimiento</h2>
        <div
          style={{
            background: "#e8f5e8",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #28a745",
          }}
        >
          <h4>✅ Optimizaciones incluidas:</h4>
          <ul>
            <li>Animaciones CSS puras (60fps)</li>
            <li>Sin dependencias externas</li>
            <li>Lazy loading de efectos</li>
            <li>Soporte para prefers-reduced-motion</li>
            <li>Optimizado para móviles</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2>📱 Responsive Design</h2>
        <p>Los componentes se adaptan automáticamente a diferentes tamaños de pantalla:</p>
        <ul>
          <li>
            <strong>Mobile:</strong> Toasts de ancho completo, botones más grandes
          </li>
          <li>
            <strong>Tablet:</strong> Tamaños intermedios
          </li>
          <li>
            <strong>Desktop:</strong> Tamaños completos con efectos hover
          </li>
        </ul>
      </div>
    </div>
  )
}
