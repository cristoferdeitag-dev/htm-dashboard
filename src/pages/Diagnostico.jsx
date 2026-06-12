import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const statusColors = {
  bad: '#ba1a1a',
  warning: '#ff9800',
  good: '#00c853',
}

const ICONS = { web: '🌐', google: '🗺️', social: '📱', whatsapp: '💬' }

function enrich(result) {
  const categories = (result.categories || []).map((c) => {
    const ratio = c.score / (c.maxScore || 25)
    const status = ratio >= 0.7 ? 'good' : ratio >= 0.3 ? 'warning' : 'bad'
    const statusText = status === 'good' ? 'Vas muy bien aquí' : status === 'warning' ? 'Hay oportunidad de mejora' : 'Aquí está tu mayor hueco'
    return { ...c, icon: ICONS[c.key] || '📊', status, statusIcon: status === 'good' ? '✅' : status === 'warning' ? '⚠️' : '❌', statusText }
  })
  return {
    total: result.score || 0,
    message: result.headline || 'Esto encontramos sobre tu presencia digital.',
    categories,
    recommendations: result.topRecommendations || [],
  }
}

export default function Diagnostico() {
  const navigate = useNavigate()
  const stored = (() => {
    try { return JSON.parse(sessionStorage.getItem('htm_diag') || 'null') } catch { return null }
  })()
  const diagnosticData = stored ? enrich(stored) : { total: 0, message: '', categories: [], recommendations: [] }
  useEffect(() => { if (!stored) navigate('/onboarding') }, [])
  const [animatedScore, setAnimatedScore] = useState(0)
  const [showCards, setShowCards] = useState(false)

  useEffect(() => {
    // Animate score count-up
    const duration = 1500
    const target = diagnosticData.total
    const start = Date.now()

    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedScore(Math.round(eased * target))
      if (progress >= 1) clearInterval(timer)
    }, 16)

    setTimeout(() => setShowCards(true), 800)

    return () => clearInterval(timer)
  }, [])

  const scoreColor = animatedScore < 40 ? '#ba1a1a' : animatedScore < 70 ? '#ff9800' : '#00c853'

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Score Circle */}
        <div style={styles.scoreSection}>
          <div style={styles.scoreCircleOuter}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle
                cx="100" cy="100" r="85"
                fill="none"
                stroke="#edeef0"
                strokeWidth="12"
              />
              <circle
                cx="100" cy="100" r="85"
                fill="none"
                stroke={scoreColor}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(animatedScore / 100) * 534} 534`}
                transform="rotate(-90 100 100)"
                style={{ transition: 'stroke-dasharray 0.3s ease, stroke 0.3s ease' }}
              />
            </svg>
            <div style={styles.scoreText}>
              <span style={{ ...styles.scoreNumber, color: scoreColor }}>{animatedScore}</span>
              <span style={styles.scoreMax}>/100</span>
            </div>
          </div>
          <h2 style={styles.scoreTitle}>Tu Score Digital</h2>
          <p style={styles.scoreMessage}>{diagnosticData.message}</p>
        </div>

        {/* Breakdown Cards */}
        <div style={styles.cardsSection}>
          <h3 style={styles.sectionTitle}>Desglose del diagnostico</h3>
          {diagnosticData.categories.map((cat, idx) => (
            <div
              key={cat.label}
              style={{
                ...styles.card,
                borderLeftColor: statusColors[cat.status],
                opacity: showCards ? 1 : 0,
                transform: showCards ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.4s ease ${idx * 0.15}s`,
              }}
            >
              <div style={styles.cardHeader}>
                <div style={styles.cardLeft}>
                  <span style={styles.cardIcon}>{cat.icon}</span>
                  <div>
                    <div style={styles.cardLabel}>{cat.label}</div>
                    <div style={styles.cardStatus}>
                      <span>{cat.statusIcon}</span>
                      <span style={{ color: statusColors[cat.status] }}>{cat.statusText}</span>
                    </div>
                  </div>
                </div>
                <div style={styles.cardScore}>
                  <span style={{ ...styles.cardScoreNum, color: statusColors[cat.status] }}>
                    {cat.score}
                  </span>
                  <span style={styles.cardScoreMax}>/{cat.maxScore} pts</span>
                </div>
              </div>
              <div style={styles.cardBar}>
                <div style={{
                  ...styles.cardBarFill,
                  width: `${(cat.score / cat.maxScore) * 100}%`,
                  background: statusColors[cat.status],
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Top recommendations */}
        {diagnosticData.recommendations.length > 0 && (
          <div style={styles.cardsSection}>
            <h3 style={styles.sectionTitle}>Tus 3 movimientos con más impacto</h3>
            {diagnosticData.recommendations.map((r, i) => (
              <div key={i} style={{ ...styles.card, borderLeftColor: '#003d9b' }}>
                <div style={styles.cardHeader}>
                  <div style={styles.cardLeft}>
                    <span style={styles.cardIcon}>{['🥇', '🥈', '🥉'][i] || '⭐'}</span>
                    <div>
                      <div style={styles.cardLabel}>{r.title}</div>
                      <div style={{ fontSize: 13, color: '#555', marginTop: 4 }}>{r.why}</div>
                    </div>
                  </div>
                  <div style={styles.cardScore}>
                    <span style={{ ...styles.cardScoreNum, color: '#00c853', fontSize: 18 }}>{r.impact}</span>
                  </div>
                </div>
              </div>
            ))}
            <button
              style={{ ...styles.ctaButton, width: '100%', marginTop: 12, background: '#003d9b' }}
              onClick={async () => {
                try {
                  await fetch('/api/interested', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: sessionStorage.getItem('htm_email') || '' }),
                  })
                } catch (e) { /* best effort */ }
                alert('¡Listo! Te contactamos muy pronto para arrancar tu programa gratis. 🎉')
              }}
            >
              Quiero inscribirme gratis al programa →
            </button>
          </div>
        )}

        {/* CTA */}
        <div style={styles.ctaSection}>
          <div style={styles.ctaCard}>
            <span style={styles.ctaIcon}>🎉</span>
            <h3 style={styles.ctaTitle}>Buenas noticias!</h3>
            <p style={styles.ctaText}>
              Vamos a crear tu pagina web ahora mismo. En minutos tendras presencia en internet.
            </p>
            <button
              style={styles.ctaButton}
              onClick={() => navigate('/mi-pagina')}
            >
              Crear Mi Pagina Web →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f0f3ff 0%, #f8f9fb 40%)',
    padding: '40px 20px',
  },
  wrapper: {
    maxWidth: 600,
    margin: '0 auto',
  },
  scoreSection: {
    textAlign: 'center',
    marginBottom: 40,
    animation: 'fadeIn 0.6s ease-out',
  },
  scoreCircleOuter: {
    position: 'relative',
    width: 200,
    height: 200,
    margin: '0 auto 20px',
  },
  scoreText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  scoreNumber: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 56,
    fontWeight: 800,
    lineHeight: 1,
  },
  scoreMax: {
    display: 'block',
    fontSize: 18,
    color: '#434654',
    fontWeight: 600,
    marginTop: 2,
  },
  scoreTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 22,
    fontWeight: 700,
    color: '#191c1e',
    marginBottom: 8,
  },
  scoreMessage: {
    color: '#434654',
    fontSize: 15,
    maxWidth: 400,
    margin: '0 auto',
    lineHeight: 1.5,
  },
  cardsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    color: '#191c1e',
    marginBottom: 16,
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    padding: '18px 20px',
    marginBottom: 12,
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
    borderLeft: '4px solid',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 15,
    fontWeight: 700,
    color: '#191c1e',
  },
  cardStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 13,
    marginTop: 2,
  },
  cardScore: {
    textAlign: 'right',
  },
  cardScoreNum: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 24,
    fontWeight: 800,
  },
  cardScoreMax: {
    fontSize: 12,
    color: '#434654',
  },
  cardBar: {
    height: 6,
    background: '#edeef0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  cardBarFill: {
    height: '100%',
    borderRadius: 3,
    transition: 'width 0.8s ease',
  },
  ctaSection: {
    animation: 'slideUp 0.6s ease-out 0.8s both',
  },
  ctaCard: {
    background: 'linear-gradient(135deg, #003d9b, #0c56d0)',
    borderRadius: 20,
    padding: '32px 28px',
    textAlign: 'center',
    color: '#fff',
  },
  ctaIcon: {
    fontSize: 40,
    display: 'block',
    marginBottom: 12,
  },
  ctaTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 20,
    lineHeight: 1.5,
  },
  ctaButton: {
    padding: '14px 36px',
    borderRadius: 14,
    background: '#fff',
    color: '#003d9b',
    fontSize: 16,
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.2s ease',
  },
}
