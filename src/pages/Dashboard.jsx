import { useNavigate } from 'react-router-dom'

const tasks = [
  {
    id: 1,
    icon: '📸',
    title: 'Sube 3 fotos reales de tu negocio',
    description: 'Las fotos reales generan mas confianza que las fotos de stock.',
    status: 'pendiente',
  },
  {
    id: 2,
    icon: '✏️',
    title: 'Personaliza el texto de tu pagina',
    description: 'Ajusta la descripcion para que refleje lo que te hace unico.',
    status: 'pendiente',
  },
  {
    id: 3,
    icon: '📍',
    title: 'Registra tu negocio en Google Maps',
    description: 'Aparece cuando alguien busque negocios como el tuyo cerca.',
    status: 'bloqueada',
    blockedBy: 'Completa la tarea 1 primero',
  },
]

const phases = [
  { num: 1, label: 'Presencia', icon: '🌐' },
  { num: 2, label: 'Visibilidad', icon: '👀' },
  { num: 3, label: 'Clientes', icon: '🤝' },
  { num: 4, label: 'Crecimiento', icon: '🚀' },
]

const statusStyles = {
  pendiente: { bg: '#fff3e0', color: '#e65100', label: 'Pendiente' },
  completada: { bg: '#e8f5e9', color: '#2e7d32', label: 'Completada' },
  bloqueada: { bg: '#fce4ec', color: '#c62828', label: 'Bloqueada' },
}

export default function Dashboard() {
  const navigate = useNavigate()
  const businessName = 'Mi Negocio'
  const score = 42
  const currentPhase = 1

  return (
    <div style={styles.container}>
      {/* Welcome */}
      <div style={styles.welcome} className="fade-in">
        <h1 style={styles.welcomeTitle}>Hola, {businessName}! 👋</h1>
        <p style={styles.welcomeSubtitle}>
          Tu dashboard de marketing digital. Completa tareas para subir tu score.
        </p>
      </div>

      {/* Score + Website row */}
      <div style={styles.topRow}>
        {/* Score Card */}
        <div style={styles.scoreCard}>
          <div style={styles.scoreHeader}>
            <span style={styles.scoreLabel}>Tu Score Digital</span>
            <span style={styles.scoreBadge}>Fase 1</span>
          </div>
          <div style={styles.scoreBody}>
            <div style={styles.scoreCircle}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#edeef0" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="50"
                  fill="none"
                  stroke="#ff9800"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(score / 100) * 314} 314`}
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div style={styles.scoreNum}>
                <span style={styles.scoreBig}>{score}</span>
                <span style={styles.scoreSmall}>/100</span>
              </div>
            </div>
            <p style={styles.scoreHint}>Sube tu score completando tareas</p>
          </div>
        </div>

        {/* Website Card */}
        <div style={styles.websiteCard}>
          <div style={styles.websiteHeader}>
            <span style={styles.websiteIcon}>🌐</span>
            <span style={styles.websiteLabel}>Tu Pagina Web</span>
          </div>
          <div style={styles.websitePreview}>
            <div style={styles.previewMockup}>
              <div style={styles.previewBrowser}>
                <div style={styles.browserDots}>
                  <span style={{ ...styles.browserDot, background: '#ff5f57' }} />
                  <span style={{ ...styles.browserDot, background: '#febc2e' }} />
                  <span style={{ ...styles.browserDot, background: '#28c840' }} />
                </div>
                <div style={styles.browserUrl}>minegocio.haztumarketing.com</div>
              </div>
              <div style={styles.previewContent}>
                <div style={styles.previewHero}>
                  <div style={styles.previewLogoPlaceholder}>M</div>
                  <div style={styles.previewTextLine} />
                  <div style={{ ...styles.previewTextLine, width: '60%' }} />
                </div>
              </div>
            </div>
          </div>
          <div style={styles.websiteUrl}>
            <span style={styles.urlText}>minegocio.haztumarketing.com</span>
          </div>
          <div style={styles.websiteActions}>
            <button
              style={styles.websiteBtnPrimary}
              onClick={() => navigate('/mi-pagina')}
            >
              Ver pagina
            </button>
            <button
              style={styles.websiteBtnSecondary}
              onClick={() => navigate('/mi-pagina')}
            >
              Editar
            </button>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Tareas Pendientes</h2>
          <span style={styles.taskCount}>0/3 completadas</span>
        </div>
        <div style={styles.tasksList}>
          {tasks.map((task, idx) => {
            const status = statusStyles[task.status]
            return (
              <div
                key={task.id}
                style={{
                  ...styles.taskCard,
                  opacity: task.status === 'bloqueada' ? 0.6 : 1,
                  animation: `fadeIn 0.4s ease-out ${idx * 0.1}s both`,
                }}
              >
                <span style={styles.taskIcon}>{task.icon}</span>
                <div style={styles.taskContent}>
                  <div style={styles.taskTitle}>{task.title}</div>
                  <div style={styles.taskDesc}>{task.description}</div>
                  {task.blockedBy && (
                    <div style={styles.taskBlocked}>🔒 {task.blockedBy}</div>
                  )}
                </div>
                <div style={styles.taskRight}>
                  <span style={{
                    ...styles.statusBadge,
                    background: status.bg,
                    color: status.color,
                  }}>
                    {status.label}
                  </span>
                  {task.status !== 'bloqueada' && (
                    <button style={styles.taskBtn}>Hacer</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Progress */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Tu Progreso</h2>
        <div style={styles.phasesContainer}>
          <div style={styles.phasesLine}>
            <div style={{
              ...styles.phasesLineFill,
              width: `${((currentPhase - 1) / (phases.length - 1)) * 100}%`,
            }} />
          </div>
          <div style={styles.phases}>
            {phases.map(phase => (
              <div key={phase.num} style={styles.phase}>
                <div style={{
                  ...styles.phaseCircle,
                  ...(phase.num <= currentPhase ? styles.phaseCircleActive : {}),
                  ...(phase.num < currentPhase ? styles.phaseCircleComplete : {}),
                }}>
                  <span style={{ fontSize: 20 }}>{phase.icon}</span>
                </div>
                <div style={{
                  ...styles.phaseLabel,
                  ...(phase.num === currentPhase ? styles.phaseLabelActive : {}),
                }}>
                  Fase {phase.num}
                </div>
                <div style={styles.phaseName}>{phase.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '32px 28px',
    maxWidth: 900,
    margin: '0 auto',
  },
  welcome: {
    marginBottom: 28,
  },
  welcomeTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 28,
    fontWeight: 800,
    color: '#191c1e',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    color: '#434654',
    fontSize: 15,
  },
  topRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 20,
    marginBottom: 32,
  },
  scoreCard: {
    background: '#fff',
    borderRadius: 20,
    padding: '24px',
    boxShadow: '0 2px 16px rgba(0, 0, 0, 0.05)',
  },
  scoreHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    color: '#191c1e',
  },
  scoreBadge: {
    padding: '4px 12px',
    borderRadius: 20,
    background: '#fff3e0',
    color: '#e65100',
    fontSize: 12,
    fontWeight: 600,
  },
  scoreBody: {
    textAlign: 'center',
  },
  scoreCircle: {
    position: 'relative',
    width: 120,
    height: 120,
    margin: '0 auto 12px',
  },
  scoreNum: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  scoreBig: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 36,
    fontWeight: 800,
    color: '#ff9800',
  },
  scoreSmall: {
    fontSize: 14,
    color: '#434654',
    fontWeight: 600,
  },
  scoreHint: {
    fontSize: 13,
    color: '#434654',
  },
  websiteCard: {
    background: '#fff',
    borderRadius: 20,
    padding: '24px',
    boxShadow: '0 2px 16px rgba(0, 0, 0, 0.05)',
  },
  websiteHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  websiteIcon: {
    fontSize: 20,
  },
  websiteLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    color: '#191c1e',
  },
  websitePreview: {
    marginBottom: 12,
  },
  previewMockup: {
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid #edeef0',
  },
  previewBrowser: {
    background: '#f8f9fb',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    borderBottom: '1px solid #edeef0',
  },
  browserDots: {
    display: 'flex',
    gap: 4,
  },
  browserDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    display: 'inline-block',
  },
  browserUrl: {
    fontSize: 11,
    color: '#434654',
    background: '#fff',
    padding: '3px 10px',
    borderRadius: 6,
    flex: 1,
    textAlign: 'center',
  },
  previewContent: {
    padding: 20,
    background: '#fafbfc',
    minHeight: 80,
  },
  previewHero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  previewLogoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #003d9b, #0c56d0)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: 18,
  },
  previewTextLine: {
    height: 8,
    background: '#edeef0',
    borderRadius: 4,
    width: '80%',
  },
  websiteUrl: {
    textAlign: 'center',
    marginBottom: 12,
  },
  urlText: {
    fontSize: 13,
    color: '#0c56d0',
    fontWeight: 600,
  },
  websiteActions: {
    display: 'flex',
    gap: 8,
  },
  websiteBtnPrimary: {
    flex: 1,
    padding: '10px 16px',
    borderRadius: 12,
    background: '#003d9b',
    color: '#fff',
    fontSize: 13,
    fontWeight: 600,
    border: 'none',
  },
  websiteBtnSecondary: {
    flex: 1,
    padding: '10px 16px',
    borderRadius: 12,
    background: '#f0f3ff',
    color: '#003d9b',
    fontSize: 13,
    fontWeight: 600,
    border: 'none',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 18,
    fontWeight: 700,
    color: '#191c1e',
  },
  taskCount: {
    fontSize: 13,
    color: '#434654',
    fontWeight: 500,
  },
  tasksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  taskCard: {
    background: '#fff',
    borderRadius: 16,
    padding: '18px 20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  taskIcon: {
    fontSize: 28,
    flexShrink: 0,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: '#191c1e',
    marginBottom: 2,
  },
  taskDesc: {
    fontSize: 12,
    color: '#434654',
    lineHeight: 1.4,
  },
  taskBlocked: {
    fontSize: 11,
    color: '#c62828',
    marginTop: 4,
    fontWeight: 500,
  },
  taskRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 8,
    flexShrink: 0,
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  taskBtn: {
    padding: '6px 16px',
    borderRadius: 8,
    background: '#0c56d0',
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
    border: 'none',
  },
  phasesContainer: {
    background: '#fff',
    borderRadius: 20,
    padding: '28px 24px',
    boxShadow: '0 2px 16px rgba(0, 0, 0, 0.05)',
    position: 'relative',
  },
  phases: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 2,
  },
  phasesLine: {
    position: 'absolute',
    top: 52,
    left: 60,
    right: 60,
    height: 4,
    background: '#edeef0',
    borderRadius: 2,
    zIndex: 1,
  },
  phasesLineFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #00c853, #003d9b)',
    borderRadius: 2,
    transition: 'width 0.6s ease',
  },
  phase: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  phaseCircle: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: '#edeef0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  phaseCircleActive: {
    background: '#003d9b',
    boxShadow: '0 4px 16px rgba(0, 61, 155, 0.3)',
  },
  phaseCircleComplete: {
    background: '#00c853',
  },
  phaseLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#434654',
  },
  phaseLabelActive: {
    color: '#003d9b',
  },
  phaseName: {
    fontSize: 12,
    fontWeight: 700,
    color: '#191c1e',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
}
