import { useState } from 'react'

export default function MiPagina() {
  const [copied, setCopied] = useState(false)
  const url = 'minegocio.haztumarketing.com'

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Tu Pagina Web</h1>
          <p style={styles.subtitle}>Administra y personaliza tu sitio web de negocio</p>
        </div>

        {/* URL Bar */}
        <div style={styles.urlBar}>
          <div style={styles.urlLeft}>
            <span style={styles.urlIcon}>🔗</span>
            <span style={styles.urlText}>{url}</span>
          </div>
          <button style={styles.copyBtn} onClick={copyUrl}>
            {copied ? '✅ Copiado!' : '📋 Copiar'}
          </button>
        </div>

        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>👁️</span>
            <span style={styles.statNum}>0</span>
            <span style={styles.statLabel}>Visitas</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>💬</span>
            <span style={styles.statNum}>0</span>
            <span style={styles.statLabel}>Clics en WhatsApp</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>📅</span>
            <span style={styles.statNum}>Hoy</span>
            <span style={styles.statLabel}>Desde</span>
          </div>
        </div>

        {/* Preview */}
        <div style={styles.previewSection}>
          <h2 style={styles.sectionTitle}>Vista previa</h2>
          <div style={styles.previewFrame}>
            <div style={styles.browserBar}>
              <div style={styles.browserDots}>
                <span style={{ ...styles.dot, background: '#ff5f57' }} />
                <span style={{ ...styles.dot, background: '#febc2e' }} />
                <span style={{ ...styles.dot, background: '#28c840' }} />
              </div>
              <div style={styles.browserUrlBar}>
                <span style={styles.browserLock}>🔒</span>
                {url}
              </div>
            </div>
            <div style={styles.previewContent}>
              <div style={styles.loadingContainer}>
                <div style={styles.generatingSpinner}>
                  <div style={styles.spinnerRing} />
                </div>
                <h3 style={styles.loadingTitle}>Tu pagina esta siendo generada...</h3>
                <p style={styles.loadingText}>
                  Estamos creando un sitio web profesional basado en la informacion de tu negocio.
                </p>
                <div style={styles.loadingSteps}>
                  <div style={styles.loadingStep}>
                    <span style={styles.stepCheck}>✅</span>
                    <span>Estructura del sitio</span>
                  </div>
                  <div style={styles.loadingStep}>
                    <span style={styles.stepCheck}>✅</span>
                    <span>Textos optimizados para SEO</span>
                  </div>
                  <div style={{ ...styles.loadingStep, ...styles.loadingStepActive }}>
                    <span style={styles.stepSpinner}>⏳</span>
                    <span>Diseño visual y colores</span>
                  </div>
                  <div style={{ ...styles.loadingStep, opacity: 0.4 }}>
                    <span>⬜</span>
                    <span>Boton de WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <button style={styles.editBtn}>
            ✏️ Editar Pagina
          </button>
          <button style={styles.publishBtn} disabled>
            🚀 Publicar Cambios
          </button>
        </div>

        {/* Tips */}
        <div style={styles.tipsCard}>
          <span style={styles.tipsIcon}>💡</span>
          <div>
            <h3 style={styles.tipsTitle}>Consejo</h3>
            <p style={styles.tipsText}>
              Una pagina web con fotos reales de tu negocio genera 3 veces mas confianza que una con fotos de stock. Sube tus propias fotos cuando tu pagina este lista!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '32px 28px',
    maxWidth: 800,
    margin: '0 auto',
  },
  wrapper: {},
  header: {
    marginBottom: 24,
  },
  title: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 28,
    fontWeight: 800,
    color: '#191c1e',
    marginBottom: 4,
  },
  subtitle: {
    color: '#434654',
    fontSize: 15,
  },
  urlBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#fff',
    borderRadius: 14,
    padding: '12px 16px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
    marginBottom: 20,
  },
  urlLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  urlIcon: {
    fontSize: 18,
  },
  urlText: {
    fontSize: 14,
    fontWeight: 600,
    color: '#0c56d0',
  },
  copyBtn: {
    padding: '8px 16px',
    borderRadius: 10,
    background: '#f0f3ff',
    color: '#003d9b',
    fontSize: 13,
    fontWeight: 600,
    border: 'none',
    transition: 'all 0.2s ease',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12,
    marginBottom: 28,
  },
  statCard: {
    background: '#fff',
    borderRadius: 16,
    padding: '18px 16px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 22,
  },
  statNum: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 22,
    fontWeight: 800,
    color: '#191c1e',
  },
  statLabel: {
    fontSize: 11,
    color: '#434654',
    fontWeight: 500,
  },
  previewSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 18,
    fontWeight: 700,
    color: '#191c1e',
    marginBottom: 14,
  },
  previewFrame: {
    borderRadius: 16,
    overflow: 'hidden',
    border: '1px solid #edeef0',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
  },
  browserBar: {
    background: '#f8f9fb',
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    borderBottom: '1px solid #edeef0',
  },
  browserDots: {
    display: 'flex',
    gap: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    display: 'inline-block',
  },
  browserUrlBar: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#434654',
    background: '#fff',
    padding: '5px 12px',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  browserLock: {
    fontSize: 10,
  },
  previewContent: {
    background: '#fff',
    padding: '48px 24px',
    minHeight: 320,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    textAlign: 'center',
    maxWidth: 360,
  },
  generatingSpinner: {
    width: 56,
    height: 56,
    margin: '0 auto 20px',
    position: 'relative',
  },
  spinnerRing: {
    width: 56,
    height: 56,
    border: '4px solid #edeef0',
    borderTopColor: '#003d9b',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 18,
    fontWeight: 700,
    color: '#191c1e',
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 13,
    color: '#434654',
    marginBottom: 24,
    lineHeight: 1.5,
  },
  loadingSteps: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  loadingStep: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 13,
    color: '#434654',
  },
  loadingStepActive: {
    color: '#003d9b',
    fontWeight: 600,
  },
  stepCheck: {
    fontSize: 14,
  },
  stepSpinner: {
    fontSize: 14,
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  actions: {
    display: 'flex',
    gap: 12,
    marginBottom: 24,
  },
  editBtn: {
    flex: 1,
    padding: '14px 20px',
    borderRadius: 14,
    background: '#003d9b',
    color: '#fff',
    fontSize: 15,
    fontWeight: 700,
    border: 'none',
    transition: 'all 0.2s ease',
  },
  publishBtn: {
    flex: 1,
    padding: '14px 20px',
    borderRadius: 14,
    background: '#edeef0',
    color: '#9e9e9e',
    fontSize: 15,
    fontWeight: 700,
    border: 'none',
    cursor: 'not-allowed',
    opacity: 0.7,
  },
  tipsCard: {
    display: 'flex',
    gap: 14,
    background: '#fffde7',
    borderRadius: 16,
    padding: '18px 20px',
    border: '1px solid #fff9c4',
  },
  tipsIcon: {
    fontSize: 24,
    flexShrink: 0,
  },
  tipsTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: '#191c1e',
    marginBottom: 4,
  },
  tipsText: {
    fontSize: 13,
    color: '#434654',
    lineHeight: 1.5,
  },
}
