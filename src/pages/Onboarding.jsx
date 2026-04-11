import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const businessTypes = [
  'Restaurante', 'Barberia', 'Clinica', 'Tienda',
  'Taller', 'Servicios Profesionales', 'Otro'
]

const goals = [
  'Mas clientes',
  'Aparecer en Google',
  'Vender por internet',
  'Mejorar redes sociales',
  'Crear mi pagina web',
  'No se por donde empezar'
]

const timeOptions = ['15 min/dia', '30 min/dia', '1 hora/dia', 'Los fines de semana']

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    city: '',
    description: '',
    hasWebsite: false,
    websiteUrl: '',
    instagram: '',
    facebook: '',
    hasGoogleMaps: false,
    whatsapp: '',
    selectedGoals: [],
    timeAvailable: '',
  })

  const update = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleGoal = (goal) => {
    setFormData(prev => ({
      ...prev,
      selectedGoals: prev.selectedGoals.includes(goal)
        ? prev.selectedGoals.filter(g => g !== goal)
        : [...prev.selectedGoals, goal]
    }))
  }

  const handleFinish = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      navigate('/diagnostico')
    }, 3000)
  }

  if (isAnalyzing) {
    return (
      <div style={styles.analyzingContainer}>
        <div style={styles.analyzingContent}>
          <div style={styles.spinner} />
          <h2 style={styles.analyzingTitle}>Analizando tu presencia digital...</h2>
          <p style={styles.analyzingText}>
            Estamos revisando tus redes sociales, Google y mas para darte un diagnostico personalizado.
          </p>
          <div style={styles.analyzingDots}>
            <span style={{ ...styles.dot, animationDelay: '0s' }}>.</span>
            <span style={{ ...styles.dot, animationDelay: '0.2s' }}>.</span>
            <span style={{ ...styles.dot, animationDelay: '0.4s' }}>.</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.headerIcon}>🚀</span>
          <h1 style={styles.title}>Haz Tu Marketing</h1>
          <p style={styles.subtitle}>
            Vamos a conocer tu negocio para crear tu plan de marketing digital personalizado
          </p>
        </div>

        {/* Progress */}
        <div style={styles.progress}>
          {[1, 2, 3].map(i => (
            <div key={i} style={styles.progressStep}>
              <div style={{
                ...styles.progressDot,
                ...(i <= step ? styles.progressDotActive : {}),
                ...(i < step ? styles.progressDotComplete : {}),
              }}>
                {i < step ? '✓' : i}
              </div>
              <span style={{
                ...styles.progressLabel,
                ...(i <= step ? { color: '#003d9b', fontWeight: 600 } : {}),
              }}>
                {i === 1 ? 'Tu Negocio' : i === 2 ? 'Presencia Online' : 'Tus Metas'}
              </span>
            </div>
          ))}
          <div style={styles.progressLine}>
            <div style={{ ...styles.progressLineFill, width: `${((step - 1) / 2) * 100}%` }} />
          </div>
        </div>

        {/* Step Content */}
        <div style={styles.card} key={step}>
          {step === 1 && (
            <div style={styles.stepContent} className="fade-in">
              <h2 style={styles.stepTitle}>Cuentanos sobre tu negocio</h2>
              <p style={styles.stepSubtitle}>Esta informacion nos ayuda a personalizar tu experiencia</p>

              <div style={styles.field}>
                <label style={styles.label}>Nombre del negocio</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Ej: Tacos El Patron"
                  value={formData.businessName}
                  onChange={e => update('businessName', e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Tipo de negocio</label>
                <select
                  style={styles.select}
                  value={formData.businessType}
                  onChange={e => update('businessType', e.target.value)}
                >
                  <option value="">Selecciona una opcion</option>
                  {businessTypes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Ciudad</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Ej: Guadalajara, Jalisco"
                  value={formData.city}
                  onChange={e => update('city', e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Descripcion corta</label>
                <textarea
                  style={styles.textarea}
                  placeholder="Que ofreces a tus clientes?"
                  value={formData.description}
                  onChange={e => update('description', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={styles.stepContent} className="fade-in">
              <h2 style={styles.stepTitle}>Tu presencia online actual</h2>
              <p style={styles.stepSubtitle}>Dinos que herramientas digitales ya usas</p>

              <div style={styles.field}>
                <label style={styles.label}>Tienes pagina web?</label>
                <div style={styles.toggleRow}>
                  <button
                    style={{
                      ...styles.toggleBtn,
                      ...(formData.hasWebsite ? styles.toggleBtnActive : {}),
                    }}
                    onClick={() => update('hasWebsite', true)}
                  >Si</button>
                  <button
                    style={{
                      ...styles.toggleBtn,
                      ...(!formData.hasWebsite ? styles.toggleBtnActive : {}),
                    }}
                    onClick={() => update('hasWebsite', false)}
                  >No</button>
                </div>
                {formData.hasWebsite && (
                  <input
                    style={{ ...styles.input, marginTop: 8 }}
                    type="url"
                    placeholder="https://tupagina.com"
                    value={formData.websiteUrl}
                    onChange={e => update('websiteUrl', e.target.value)}
                  />
                )}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Instagram</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="@tunegocio"
                  value={formData.instagram}
                  onChange={e => update('instagram', e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Facebook</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="URL o nombre de pagina"
                  value={formData.facebook}
                  onChange={e => update('facebook', e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Google Maps / Google My Business</label>
                <div style={styles.toggleRow}>
                  <button
                    style={{
                      ...styles.toggleBtn,
                      ...(formData.hasGoogleMaps ? styles.toggleBtnActive : {}),
                    }}
                    onClick={() => update('hasGoogleMaps', true)}
                  >Si, lo tengo</button>
                  <button
                    style={{
                      ...styles.toggleBtn,
                      ...(!formData.hasGoogleMaps ? styles.toggleBtnActive : {}),
                    }}
                    onClick={() => update('hasGoogleMaps', false)}
                  >No / No se</button>
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>WhatsApp de negocio</label>
                <input
                  style={styles.input}
                  type="tel"
                  placeholder="+52 33 1234 5678"
                  value={formData.whatsapp}
                  onChange={e => update('whatsapp', e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={styles.stepContent} className="fade-in">
              <h2 style={styles.stepTitle}>Que quieres lograr?</h2>
              <p style={styles.stepSubtitle}>Selecciona todo lo que aplique</p>

              <div style={styles.field}>
                <label style={styles.label}>Tus metas de marketing digital</label>
                <div style={styles.checkboxGrid}>
                  {goals.map(goal => (
                    <button
                      key={goal}
                      style={{
                        ...styles.checkboxBtn,
                        ...(formData.selectedGoals.includes(goal) ? styles.checkboxBtnActive : {}),
                      }}
                      onClick={() => toggleGoal(goal)}
                    >
                      <span style={styles.checkboxIcon}>
                        {formData.selectedGoals.includes(goal) ? '✅' : '⬜'}
                      </span>
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Cuanto tiempo puedes dedicar al marketing?</label>
                <div style={styles.pillsRow}>
                  {timeOptions.map(opt => (
                    <button
                      key={opt}
                      style={{
                        ...styles.pill,
                        ...(formData.timeAvailable === opt ? styles.pillActive : {}),
                      }}
                      onClick={() => update('timeAvailable', opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div style={styles.navButtons}>
          {step > 1 && (
            <button style={styles.backBtn} onClick={() => setStep(s => s - 1)}>
              ← Atras
            </button>
          )}
          <div style={{ flex: 1 }} />
          {step < 3 ? (
            <button style={styles.nextBtn} onClick={() => setStep(s => s + 1)}>
              Siguiente →
            </button>
          ) : (
            <button style={styles.nextBtn} onClick={handleFinish}>
              Analizar mi negocio 🔍
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8f9fb 0%, #e8edf5 100%)',
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  wrapper: {
    width: '100%',
    maxWidth: 640,
  },
  header: {
    textAlign: 'center',
    marginBottom: 32,
  },
  headerIcon: {
    fontSize: 48,
    display: 'block',
    marginBottom: 12,
  },
  title: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 28,
    fontWeight: 800,
    color: '#003d9b',
    marginBottom: 8,
  },
  subtitle: {
    color: '#434654',
    fontSize: 15,
    maxWidth: 400,
    margin: '0 auto',
  },
  progress: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
    position: 'relative',
    padding: '0 20px',
  },
  progressStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    zIndex: 2,
  },
  progressDot: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: '#edeef0',
    color: '#434654',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 14,
    transition: 'all 0.3s ease',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  progressDotActive: {
    background: '#003d9b',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(0, 61, 155, 0.3)',
  },
  progressDotComplete: {
    background: '#00c853',
    color: '#fff',
  },
  progressLabel: {
    fontSize: 11,
    color: '#434654',
    fontWeight: 500,
    textAlign: 'center',
  },
  progressLine: {
    position: 'absolute',
    top: 18,
    left: 50,
    right: 50,
    height: 3,
    background: '#edeef0',
    borderRadius: 2,
    zIndex: 1,
  },
  progressLineFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #00c853, #003d9b)',
    borderRadius: 2,
    transition: 'width 0.4s ease',
  },
  card: {
    background: '#fff',
    borderRadius: 20,
    padding: '32px 28px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
    marginBottom: 20,
  },
  stepContent: {},
  stepTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 22,
    fontWeight: 700,
    color: '#191c1e',
    marginBottom: 4,
  },
  stepSubtitle: {
    color: '#434654',
    fontSize: 14,
    marginBottom: 24,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#191c1e',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    border: '2px solid #edeef0',
    fontSize: 14,
    color: '#191c1e',
    background: '#f8f9fb',
    transition: 'border-color 0.2s ease',
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    border: '2px solid #edeef0',
    fontSize: 14,
    color: '#191c1e',
    background: '#f8f9fb',
    appearance: 'none',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    border: '2px solid #edeef0',
    fontSize: 14,
    color: '#191c1e',
    background: '#f8f9fb',
    resize: 'vertical',
    minHeight: 80,
  },
  toggleRow: {
    display: 'flex',
    gap: 8,
  },
  toggleBtn: {
    flex: 1,
    padding: '10px 16px',
    borderRadius: 12,
    border: '2px solid #edeef0',
    background: '#f8f9fb',
    fontSize: 14,
    fontWeight: 500,
    color: '#434654',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  toggleBtnActive: {
    background: '#003d9b',
    color: '#fff',
    borderColor: '#003d9b',
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 8,
  },
  checkboxBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 14px',
    borderRadius: 12,
    border: '2px solid #edeef0',
    background: '#f8f9fb',
    fontSize: 13,
    fontWeight: 500,
    color: '#434654',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
  },
  checkboxBtnActive: {
    background: '#e8eeff',
    borderColor: '#003d9b',
    color: '#003d9b',
  },
  checkboxIcon: {
    fontSize: 16,
  },
  pillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    padding: '10px 18px',
    borderRadius: 50,
    border: '2px solid #edeef0',
    background: '#f8f9fb',
    fontSize: 13,
    fontWeight: 500,
    color: '#434654',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  pillActive: {
    background: '#003d9b',
    color: '#fff',
    borderColor: '#003d9b',
  },
  navButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    padding: '12px 24px',
    borderRadius: 12,
    background: '#fff',
    color: '#434654',
    fontSize: 14,
    fontWeight: 600,
    border: '2px solid #edeef0',
    transition: 'all 0.2s ease',
  },
  nextBtn: {
    padding: '14px 32px',
    borderRadius: 14,
    background: 'linear-gradient(135deg, #003d9b, #0c56d0)',
    color: '#fff',
    fontSize: 15,
    fontWeight: 700,
    border: 'none',
    boxShadow: '0 4px 16px rgba(0, 61, 155, 0.3)',
    transition: 'all 0.2s ease',
  },
  analyzingContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #003d9b, #0c56d0)',
    padding: 20,
  },
  analyzingContent: {
    textAlign: 'center',
    color: '#fff',
  },
  spinner: {
    width: 64,
    height: 64,
    border: '4px solid rgba(255,255,255,0.2)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 24px',
  },
  analyzingTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 12,
  },
  analyzingText: {
    fontSize: 15,
    opacity: 0.85,
    maxWidth: 400,
    margin: '0 auto',
  },
  analyzingDots: {
    fontSize: 32,
    marginTop: 16,
  },
  dot: {
    display: 'inline-block',
    animation: 'pulse 1.4s ease-in-out infinite',
  },
}
