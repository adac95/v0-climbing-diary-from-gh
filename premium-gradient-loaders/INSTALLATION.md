# 🚀 Guía de Instalación Rápida

## Método 1: Copia Directa (Recomendado)

1. **Descarga los archivos**
   - Copia la carpeta `components/` a tu proyecto
   - Copia la carpeta `styles/` a tu proyecto

2. **Importa en tu componente**
   \`\`\`jsx
   import { 
     GradientSpinner, 
     GradientLoadingButton, 
     PremiumGradientToast 
   } from './components/GradientLoaders'
   \`\`\`

3. **¡Listo para usar!**

## Método 2: Como Paquete NPM Local

1. **Copia toda la carpeta a tu proyecto**
   \`\`\`
   your-project/
   ├── src/
   ├── premium-loaders/  ← Aquí
   └── package.json
   \`\`\`

2. **Instala como dependencia local**
   \`\`\`bash
   npm install ./premium-loaders
   \`\`\`

3. **Importa normalmente**
   \`\`\`jsx
   import { GradientSpinner } from 'premium-gradient-loaders'
   \`\`\`

## Configuración CSS Modules

Si tu proyecto no tiene CSS Modules configurado:

### Next.js
✅ Ya está configurado por defecto

### Create React App
✅ Ya está configurado por defecto

### Vite
Agrega a \`vite.config.js\`:
\`\`\`js
export default {
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
}
\`\`\`

### Webpack personalizado
\`\`\`js
{
  test: /\.module\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true
      }
    }
  ]
}
\`\`\`

## Verificación

Crea un componente de prueba:

\`\`\`jsx
import { GradientSpinner } from './components/GradientLoaders'

function Test() {
  return (
    <div>
      <h1>¡Funciona!</h1>
      <GradientSpinner size="md" />
    </div>
  )
}
\`\`\`

Si ves el spinner girando con gradiente, ¡todo está listo! 🎉
