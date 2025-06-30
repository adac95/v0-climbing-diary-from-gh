import { notFound } from "next/navigation"
import RouteDetails from "./route-details"

const routes = [
  {
    id: "biographie",
    name: "Biographie",
    grade: "9a+",
    rating: 5,
    location: "Ceüse",
    type: "Proyecto",
    attempts: 4,
    sessions: 2,
    description: "Ruta icónica con sección técnica de placa seguida por desplome atlético.",
    firstAscent: "Chris Sharma, 2001",
    personalBeta: "Apretar fuerte en el bidedo, chapar desde el talón derecho. Usar drop knee en el desplome.",
    gradeOpinion: "Correcto",
    generalNotes:
      "La ruta comienza con una sección técnica de placa, seguida por un desplome atlético con buen canto. Hay sombra hasta las 11am y suele estar seca incluso después de lluvia. Lo ideal es llevar 14 cintas y casco por caída de piedras.",
  },
  {
    id: "la-rambla",
    name: "La Rambla",
    grade: "9a+",
    rating: 5,
    location: "Siurana",
    type: "Completada",
    attempts: 12,
    sessions: 6,
    description: "Clásica ruta de resistencia con movimientos continuos y técnicos.",
    firstAscent: "Alexander Huber, 1994",
    personalBeta: "Mantener ritmo constante, usar reposos largos en los buenos agarres.",
    gradeOpinion: "Duro para el grado",
    generalNotes: "Ruta de resistencia pura. Importante calentar bien y mantener un ritmo sostenido.",
  },
]

export default function RoutePage({ params }) {
  const route = routes.find((r) => r.id === params.id)

  if (!route) {
    notFound()
  }

  return <RouteDetails route={route} />
}
