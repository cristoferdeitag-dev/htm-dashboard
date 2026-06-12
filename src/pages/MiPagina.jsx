import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// Mi Página — generates and shows the user's REAL hosted site (/n/<slug>),
// with live visit + WhatsApp-click counters. The old mockup is gone.

export default function MiPagina() {
  const navigate = useNavigate()
  const email = sessionStorage.getItem('htm_email') || ''
  const form = (() => {
    try { return JSON.parse(sessionStorage.getItem('htm_form') || 'null') } catch { return null }
  })()

  const [site, setSite] = useState(null) // { slug, visits, wa_clicks }
  const [generating, setGenerating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const fullUrl = site ? `${window.location.origin}/n/${site.slug}` : ''

  const loadStats = useCallback(async () => {
    if (!email) { setLoading(false); return }
    try {
      const res = await fetch(`/api/site/stats?email=${encodeURIComponent(email)}`)
      const data = await res.json()
      if (data.exists) setSite(data)
    } catch { /* offline */ }
    setLoading(false)
  }, [email])

  useEffect(() => { loadStats() }, [loadStats])

  const generate = async () => {
    if (!form || !email) {
      alert('Primero completa el diagnóstico para que conozcamos tu negocio.')
      navigate('/onboarding')
      return
    }
    setGenerating(true)
    try {
      const res = await fetch('/api/site/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, email }),
      })
      const data = await res.json()
      if (!res.ok) { alert(data.error || 'No pudimos crear tu página.'); setGenerating(false); return }
      await loadStats()
    } catch {
      alert('Error de conexión. Intenta de nuevo.')
    }
    setGenerating(false)
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  if (loading) {
    return <div style={styles.container}><p style={{ textAlign: 'center', color: '#666' }}>Cargando…</p></div>
  }

  if (!site) {
    return (
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.genCard}>
            <span style={{ fontSize: 52 }}>🚀</span>
            <h2 style={styles.title}>Tu página web, lista en un minuto</h2>
            <p style={styles.sub}>
              Con lo que nos contaste de tu negocio, la IA escribe los textos y arma una página
              profesional con botón de WhatsApp — hospedada por nosotros, gratis.
            </p>
            <button style={styles.bigBtn} onClick={generate} disabled={generating}>
              {generating ? 'Creando tu página… (≈20 seg)' : 'Crear mi página ahora ✨'}
            </button>
            {!form && (
              <p style={{ fontSize: 13, color: '#888', marginTop: 12 }}>
                Tip: primero haz tu diagnóstico para que conozcamos tu negocio.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h2 style={styles.title}>Mi Página</h2>

        {/* URL bar */}
        <div style={styles.urlBar}>
          <span style={styles.urlText}>{fullUrl}</span>
          <button style={styles.smallBtn} onClick={copyUrl}>{copied ? '¡Copiada! ✅' : 'Copiar'}</button>
          <a style={{ ...styles.smallBtn, textDecoration: 'none' }} href={fullUrl} target="_blank" rel="noreferrer">Abrir ↗</a>
        </div>

        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <span style={styles.statNum}>{site.visits ?? 0}</span>
            <span style={styles.statLabel}>Visitas</span>
          </div>
          <div style={styles.statCard}>
            <span style={{ ...styles.statNum, color: '#25D366' }}>{site.wa_clicks ?? 0}</span>
            <span style={styles.statLabel}>Clics a WhatsApp</span>
          </div>
          <button style={{ ...styles.smallBtn, alignSelf: 'center' }} onClick={loadStats}>Actualizar ↻</button>
        </div>

        {/* Live preview */}
        <div style={styles.previewFrame}>
          <div style={styles.previewBar}>
            <span style={styles.dot} /><span style={styles.dot} /><span style={styles.dot} />
            <span style={{ fontSize: 12, color: '#888', marginLeft: 8 }}>{fullUrl}</span>
          </div>
          <iframe title="preview" src={`/n/${site.slug}`} style={styles.iframe} />
        </div>

        <p style={{ fontSize: 13, color: '#777', marginTop: 14, textAlign: 'center' }}>
          ¿Quieres cambiar textos, colores o tener tu propio dominio (tunegocio.com)?
          Eso viene con el programa de 9 meses. 😉
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', background: '#f8f9fb', padding: '32px 16px' },
  wrapper: { maxWidth: 920, margin: '0 auto' },
  title: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, color: '#1a1a1a', marginBottom: 16 },
  sub: { color: '#555', fontSize: 15, maxWidth: 480, margin: '10px auto 22px' },
  genCard: { background: '#fff', borderRadius: 18, padding: '48px 28px', textAlign: 'center', boxShadow: '0 2px 14px rgba(0,0,0,.06)', marginTop: 40 },
  bigBtn: { background: '#003d9b', color: '#fff', border: 'none', borderRadius: 999, padding: '15px 34px', fontSize: 16, fontWeight: 700, cursor: 'pointer' },
  urlBar: { display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 12, padding: '12px 16px', boxShadow: '0 2px 8px rgba(0,0,0,.05)', marginBottom: 16, flexWrap: 'wrap' },
  urlText: { flex: 1, fontWeight: 600, color: '#003d9b', fontSize: 14, wordBreak: 'break-all' },
  smallBtn: { background: '#eaf0fb', color: '#003d9b', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, fontSize: 13, cursor: 'pointer' },
  statsRow: { display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' },
  statCard: { background: '#fff', borderRadius: 12, padding: '14px 22px', boxShadow: '0 2px 8px rgba(0,0,0,.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 },
  statNum: { fontSize: 26, fontWeight: 800, color: '#003d9b' },
  statLabel: { fontSize: 12, color: '#777', fontWeight: 600 },
  previewFrame: { background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 18px rgba(0,0,0,.08)' },
  previewBar: { display: 'flex', alignItems: 'center', gap: 5, padding: '10px 14px', borderBottom: '1px solid #eee', background: '#fafafa' },
  dot: { width: 10, height: 10, borderRadius: '50%', background: '#ddd', display: 'inline-block' },
  iframe: { width: '100%', height: 560, border: 'none', display: 'block' },
}
