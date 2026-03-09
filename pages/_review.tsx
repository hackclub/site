import { useState } from 'react'
import Head from 'next/head'

const PAGES = [
  // High traffic / main pages
  { url: '/', label: 'Home' },
  { url: '/slack', label: 'Slack' },
  { url: '/clubs', label: 'Clubs' },
  { url: '/ship', label: 'Ship' },
  { url: '/philosophy', label: 'Philosophy' },
  { url: '/team', label: 'Team' },
  { url: '/events', label: 'Events' },
  { url: '/night', label: 'Night' },
  { url: '/minecraft', label: 'Minecraft' },
  { url: '/brand', label: 'Brand' },
  { url: '/press', label: 'Press' },
  { url: '/stickers', label: 'Stickers' },
  { url: '/opensource', label: 'Open Source' },
  { url: '/404', label: '404' },
  // Hackathons
  { url: '/hackathons', label: 'Hackathons' },
  { url: '/hackathons/grant', label: 'Hackathons / Grant' },
  // Fiscal sponsorship
  { url: '/fiscal-sponsorship', label: 'Fiscal Sponsorship' },
  { url: '/fiscal-sponsorship/about', label: 'Fiscal Sponsorship / About' },
  { url: '/fiscal-sponsorship/first', label: 'Fiscal Sponsorship / First' },
  { url: '/fiscal-sponsorship/open-source', label: 'Fiscal Sponsorship / Open Source' },
  { url: '/fiscal-sponsorship/mobile', label: 'Fiscal Sponsorship / Mobile' },
  { url: '/fiscal-sponsorship/climate', label: 'Fiscal Sponsorship / Climate' },
  { url: '/fiscal-sponsorship/directory', label: 'Fiscal Sponsorship / Directory' },
  // Jobs
  { url: '/jobs', label: 'Jobs' },
  // Onboard
  { url: '/onboard', label: 'Onboard' },
  { url: '/onboard/first', label: 'Onboard / First' },
  { url: '/onboard/gallery', label: 'Onboard / Gallery' },
  // Philanthropy
  { url: '/philanthropy', label: 'Philanthropy' },
  { url: '/philanthropy/supporters', label: 'Philanthropy / Supporters' },
  // AMAs
  { url: '/amas', label: 'AMAs' },
  { url: '/amas/vitalik', label: 'AMAs / Vitalik' },
  { url: '/amas/sal', label: 'AMAs / Sal' },
  { url: '/amas/geohot', label: 'AMAs / Geohot' },
  // Misc
  { url: '/arcade', label: 'Arcade' },
  { url: '/sharkbank', label: 'Sharkbank' },
  { url: '/pizza', label: 'Pizza' },
  { url: '/santa', label: 'Santa' },
  { url: '/winter', label: 'Winter' },
  { url: '/elon', label: 'Elon' },
  { url: '/relon', label: 'Relon' },
  { url: '/replit', label: 'Replit' },
  { url: '/steve', label: 'Steve' },
  { url: '/acknowledged', label: 'Acknowledged' },
  { url: '/preston-werner', label: 'Preston Werner' },
  { url: '/preston-werner-2022', label: 'Preston Werner 2022' },
  // Bin (internal/unlisted)
  { url: '/bin/gallery', label: '[bin] Gallery' },
  { url: '/bin/prelaunch', label: '[bin] Prelaunch' },
]

export default function ReviewPage() {
  const saved = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('_review_checked') || '{}')
    : {}
  const [checked, setChecked] = useState<Record<string, boolean>>(saved)

  const toggle = (url: string) => {
    setChecked(prev => {
      const next = { ...prev, [url]: !prev[url] }
      localStorage.setItem('_review_checked', JSON.stringify(next))
      return next
    })
  }

  const done = Object.values(checked).filter(Boolean).length
  const total = PAGES.length

  return (
    <>
      <Head><title>Page Review Checklist</title></Head>
      <div style={{ fontFamily: 'monospace', padding: '2rem', maxWidth: 700, margin: '0 auto' }}>
        <h1 style={{ fontSize: 24, marginBottom: 4 }}>Page Review Checklist</h1>
        <p style={{ color: '#666', marginBottom: 24 }}>
          {done}/{total} checked &nbsp;·&nbsp;
          <button
            onClick={() => {
              setChecked({})
              localStorage.removeItem('_review_checked')
            }}
            style={{ background: 'none', border: 'none', color: '#c00', cursor: 'pointer', fontFamily: 'monospace' }}
          >
            reset
          </button>
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {PAGES.map(({ url, label }) => (
            <div key={url} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input
                type="checkbox"
                checked={!!checked[url]}
                onChange={() => toggle(url)}
                style={{ width: 16, height: 16, cursor: 'pointer', flexShrink: 0 }}
              />
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: checked[url] ? '#999' : '#0070f3',
                  textDecoration: checked[url] ? 'line-through' : 'underline',
                  fontFamily: 'monospace',
                  fontSize: 14
                }}
              >
                {label}
              </a>
              <span style={{ color: '#aaa', fontSize: 12 }}>{url}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
