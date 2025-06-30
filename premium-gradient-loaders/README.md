# 🎨 Premium Gradient Loaders & Toasts

Una colección de loaders y toasts premium con gradientes y animaciones suaves, construidos con **CSS puro** y **JavaScript vanilla**. Sin dependencias externas.

## ✨ Características

- 🎯 **Sin dependencias** - Solo CSS puro y React
- 🌈 **Gradientes premium** - Efectos visuales modernos
- ⚡ **Animaciones suaves** - 60fps garantizados
- 📱 **Responsive** - Se adapta a cualquier pantalla
- 🎨 **Personalizable** - Fácil de modificar colores y estilos
- 🚀 **Ligero** - Menos de 15KB total

## 🚀 Instalación Rápida

1. **Copia la carpeta `components` y `styles` a tu proyecto**
2. **Importa los componentes que necesites**
3. **¡Listo para usar!**

## 📦 Componentes Incluidos

### 1. GradientSpinner
Spinner con gradiente rotativo y efectos de glow.

### 2. GradientLoadingButton  
Botón con estados de loading, success y error.

### 3. PremiumGradientToast
Toast notifications con efectos glassmorphism.

### 4. GradientFieldOverlay
Overlay para campos de formulario con feedback visual.

## 🎯 Uso Básico

### Importar componentes:
\`\`\`jsx
import { 
  GradientSpinner, 
  GradientLoadingButton, 
  PremiumGradientToast 
} from './components/GradientLoaders'
\`\`\`

### Spinner simple:
\`\`\`jsx
<GradientSpinner size="md" />
\`\`\`

### Botón con loading:
\`\`\`jsx
<GradientLoadingButton
  isLoading={loading}
  isSuccess={success}
  isError={error}
  onSave={handleSave}
  onCancel={handleCancel}
/>
\`\`\`

### Toast notification:
\`\`\`jsx
<PremiumGradientToast
  isLoading={loading}
  isSuccess={success}
  isError={error}
  errorMessage="Error personalizado"
/>
\`\`\`

## 🎨 Personalización

### Cambiar colores del gradiente:
Edita las variables CSS en \`styles/gradient-loader.module.css\`:

\`\`\`css
/* Cambia estos valores por tus colores */
background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
\`\`\`

### Ajustar velocidad de animaciones:
\`\`\`css
/* Spinner más rápido */
animation: spin 0.5s linear infinite;

/* Toast más lento */
transition: all 1s ease-out;
\`\`\`

## 📱 Responsive

Todos los componentes son completamente responsive:
- **Mobile**: Tamaños optimizados para touch
- **Tablet**: Escalado intermedio
- **Desktop**: Tamaños completos con efectos hover

## 🔧 Configuración Avanzada

### Tamaños disponibles para GradientSpinner:
- \`sm\` - 16px
- \`md\` - 24px (default)
- \`lg\` - 32px

### Estados del LoadingButton:
- \`isLoading\` - Muestra spinner
- \`isSuccess\` - Muestra checkmark con animación
- \`isError\` - Muestra error con shake
- \`disabled\` - Estado deshabilitado

## 🎭 Ejemplos Completos

Ver la carpeta \`examples/\` para implementaciones completas.

## 🐛 Troubleshooting

### El CSS no se aplica:
- Asegúrate de importar el archivo CSS
- Verifica que CSS Modules esté configurado

### Animaciones no funcionan:
- Revisa que no haya conflictos con otros CSS
- Asegúrate de que \`transform\` no esté siendo sobrescrito

### Toast no aparece:
- Verifica el z-index (debe ser alto, ej: 9999)
- Asegúrate de que el estado cambie correctamente

## 📄 Licencia

MIT - Úsalo libremente en proyectos personales y comerciales.

## 🤝 Contribuir

¿Encontraste un bug o tienes una mejora? ¡Abre un issue!

---

**¡Hecho con ❤️ para la comunidad de desarrolladores!**
