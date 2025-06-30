import Link from "next/link"
import styles from "./page.module.css"

// ICON COMPONENTS
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

function TrendingUpIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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
  },
  {
    id: "perfecto-mundo",
    name: "Perfecto Mundo",
    grade: "9b+",
    rating: 4,
    location: "Margalef",
    type: "Proyecto",
    attempts: 2,
    sessions: 1,
    description: "Una de las rutas más difíciles del mundo, requiere fuerza y técnica excepcionales.",
    firstAscent: "Chris Sharma, 2007",
  },
  {
    id: "era-vella",
    name: "Era Vella",
    grade: "8c+",
    rating: 5,
    location: "Margalef",
    type: "Completada",
    attempts: 8,
    sessions: 4,
    description: "Ruta técnica con movimientos de dedos y buenos reposos.",
    firstAscent: "Chris Sharma, 2003",
  },
  {
    id: "chilam-balam",
    name: "Chilam Balam",
    grade: "9b",
    rating: 4,
    location: "Villanueva del Rosario",
    type: "Proyecto",
    attempts: 1,
    sessions: 1,
    description: "Ruta de resistencia pura con movimientos explosivos.",
    firstAscent: "Bernabé Fernández, 2003",
  },
]

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

export default function ToposPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mis Topos</h1>
        <p className={styles.subtitle}>Registro de rutas de escalada y progreso personal</p>
      </div>

      <div className={styles.routesGrid}>
        {routes.map((route) => (
          <div key={route.id} className={styles.routeCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderTop}>
                <div className={styles.cardHeaderLeft}>
                  <h3 className={styles.routeName}>{route.name}</h3>
                  <div className={styles.badgeContainer}>
                    <div className={`${styles.badge} ${getGradeColor(route.grade)}`}>{route.grade}</div>
                    <div className={`${styles.badge} ${getTypeColor(route.type)}`}>{route.type}</div>
                  </div>
                </div>
                <div className={styles.starContainer}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`${styles.star} ${i < route.rating ? styles.starFilled : styles.starEmpty}`}
                      filled={i < route.rating}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.locationInfo}>
                <MapPinIcon className={styles.locationIcon} />
                {route.location}
              </div>

              <p className={styles.description}>{route.description}</p>

              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <TrendingUpIcon className={`${styles.statIcon} ${styles.attemptsIcon}`} />
                  <span>{route.attempts} intentos</span>
                </div>
                <div className={styles.statItem}>
                  <CalendarIcon className={`${styles.statIcon} ${styles.sessionsIcon}`} />
                  <span>{route.sessions} sesiones</span>
                </div>
              </div>

              <Link href={`/topos/${route.id}`} className={styles.actionButton}>
                Abrir Diario
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
