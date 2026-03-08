import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const HELVETICA = "'Helvetica Neue', Helvetica, Arial, sans-serif"

function useRevealOnScroll(threshold = 0.15) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return ref
}

function RevealSection({ children, delay = 0, className = '' }) {
  const ref = useRevealOnScroll()
  return (
    <div
      ref={ref}
      className={`reveal-section ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function StatCard({ value, label }) {
  const ref = useRevealOnScroll()
  return (
    <div ref={ref} className="reveal-section text-center">
      <div
        className="text-4xl font-black mb-1"
        style={{
          fontFamily: "'Orbitron', monospace",
          background: 'linear-gradient(135deg, #0effbe, #52b788)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {value}
      </div>
      <div className="text-sm text-gray-400 tracking-wide uppercase" style={{ fontFamily: HELVETICA }}>
        {label}
      </div>
    </div>
  )
}

function Pill({ children }) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border"
      style={{
        color: '#0effbe',
        borderColor: 'rgba(14,255,190,0.3)',
        background: 'rgba(14,255,190,0.07)',
        fontFamily: HELVETICA,
      }}
    >
      {children}
    </span>
  )
}

const PILLARS = [
  {
    icon: '📍',
    title: 'See the Problem',
    body: 'Real-time reports pinpoint litter, illegal dumps, and neglected areas on a living 3D globe — making invisible issues impossible to ignore.',
  },
  {
    icon: '🤝',
    title: 'Organize Action',
    body: 'Create or join a cleanup event in seconds. Invite neighbors, set a time, and coordinate who brings what.',
  },
  {
    icon: '✅',
    title: 'Confirm the Win',
    body: 'Attendees mark the area clean. The report resolves. The marker changes. Progress is real, visible, and permanent.',
  },
]

export default function MissionPage() {
  return (
    <div
      style={{
        background: 'radial-gradient(ellipse at top, #1a2e1a 0%, #111111 55%, #0a0a0a 100%)',
        minHeight: '100vh',
        fontFamily: HELVETICA,
        overflowX: 'hidden',
      }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 15%, rgba(14,255,190,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 85%, rgba(82,183,136,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Nav bar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <Link to="/login" className="flex items-center gap-2 group">
          <img src="/REVIV_wo_slo.svg" alt="REVIV" style={{ height: 28 }} className="opacity-90 group-hover:opacity-100 transition-opacity" />
        </Link>
        <Link
          to="/login"
          className="text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200"
          style={{
            color: '#0effbe',
            border: '1px solid rgba(14,255,190,0.35)',
            background: 'rgba(14,255,190,0.05)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(14,255,190,0.12)'
            e.currentTarget.style.boxShadow = '0 0 20px rgba(14,255,190,0.2)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(14,255,190,0.05)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Launch App →
        </Link>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-20">
        <RevealSection delay={0}>
          <Pill>Our Mission</Pill>
        </RevealSection>

        <RevealSection delay={80}>
          <h1
            className="mt-6 text-5xl sm:text-7xl font-black leading-none tracking-tight"
            style={{
              fontFamily: "'Orbitron', monospace",
              background: 'linear-gradient(160deg, #ffffff 30%, #52b788 80%, #0effbe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 40px rgba(14,255,190,0.18))',
            }}
          >
            REVIV
          </h1>
        </RevealSection>

        <RevealSection delay={160}>
          <p
            className="mt-4 text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed"
            style={{ letterSpacing: '0.01em' }}
          >
            Real-Time Environmental Visualization &amp; Impact Volunteering
          </p>
        </RevealSection>

        <RevealSection delay={240}>
          <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed font-light">
            A community-driven platform that helps people{' '}
            <span style={{ color: '#0effbe' }}>discover</span>,{' '}
            <span style={{ color: '#52b788' }}>organize</span>, and{' '}
            <span style={{ color: '#457b9d' }}>complete</span> environmental cleanup efforts
            through an interactive 3D map of the Earth.
          </p>
        </RevealSection>

        {/* Decorative line */}
        <RevealSection delay={320}>
          <div
            className="mt-16 w-px"
            style={{
              height: 64,
              background: 'linear-gradient(to bottom, transparent, rgba(14,255,190,0.5), transparent)',
            }}
          />
        </RevealSection>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative z-10 px-6 pb-20">
        <div
          className="max-w-3xl mx-auto grid grid-cols-3 gap-6 py-10 px-10 rounded-2xl border border-white/5"
          style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)' }}
        >
          <StatCard value="3D" label="Globe Interface" />
          <StatCard value="∞" label="Community-Powered" />
          <StatCard value="1 Earth" label="Worth Protecting" />
        </div>
      </section>

      {/* ─── WHAT REVIV IS ─── */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <Pill>What REVIV Is</Pill>
          </RevealSection>

          <RevealSection delay={80}>
            <h2
              className="mt-4 text-3xl sm:text-4xl font-bold text-white leading-snug"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              Awareness into Action
            </h2>
          </RevealSection>

          <RevealSection delay={140}>
            <p className="mt-5 text-gray-300 text-base sm:text-lg leading-relaxed">
              REVIV visualizes real locations affected by litter and environmental neglect, connecting
              individuals who want to help with the exact places that need attention. Our platform
              turns concern into coordination — report a problem, organize a cleanup, restore your
              neighborhood.
            </p>
          </RevealSection>

          {/* Three pillars */}
          <div className="mt-12 grid sm:grid-cols-3 gap-5">
            {PILLARS.map((p, i) => (
              <RevealSection key={p.title} delay={i * 80}>
                <div
                  className="rounded-xl p-6 h-full flex flex-col gap-3 border border-white/5 hover:border-white/10 transition-all duration-300 group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(14,255,190,0.04)'
                    e.currentTarget.style.boxShadow = '0 0 32px rgba(14,255,190,0.07)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div className="text-3xl">{p.icon}</div>
                  <div className="text-white font-bold text-base">{p.title}</div>
                  <div className="text-gray-400 text-sm leading-relaxed">{p.body}</div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR GOAL ─── */}
      <section className="relative z-10 px-6 pb-28">
        <div className="max-w-3xl mx-auto">
          {/* Horizontal rule with glow */}
          <div
            className="mb-12 h-px w-full"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(14,255,190,0.3), transparent)',
            }}
          />

          <RevealSection>
            <Pill>Our Goal</Pill>
          </RevealSection>

          <RevealSection delay={80}>
            <h2
              className="mt-4 text-3xl sm:text-4xl font-bold text-white leading-snug"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              Local Action.{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #52b788, #0effbe)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Global Impact.
              </span>
            </h2>
          </RevealSection>

          <RevealSection delay={140}>
            <p className="mt-5 text-gray-300 text-base sm:text-lg leading-relaxed">
              Environmental problems like litter and illegal dumping are often invisible — or feel
              disconnected from the people who want to solve them. REVIV makes these issues visible
              on a global scale while empowering communities to take action locally.
            </p>
          </RevealSection>

          <RevealSection delay={200}>
            <p className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed">
              By lowering the barrier to organizing and participating in cleanup efforts, REVIV helps
              individuals turn small actions into meaningful environmental change.
            </p>
          </RevealSection>

          {/* Pull-quote */}
          <RevealSection delay={280}>
            <blockquote
              className="mt-12 relative pl-6 py-2"
              style={{ borderLeft: '3px solid #0effbe' }}
            >
              <p
                className="text-xl sm:text-2xl font-semibold text-white leading-snug"
                style={{ fontStyle: 'italic' }}
              >
                "At its core, REVIV is about community."
              </p>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                Real environmental change happens when people rely on one another, organize together,
                and take responsibility for the places they live. Our goal is to build a platform
                where neighbors, volunteers, and local communities can connect, collaborate, and
                restore their environments collectively.
              </p>
            </blockquote>
          </RevealSection>

          <RevealSection delay={360}>
            <p
              className="mt-10 text-base sm:text-lg font-semibold text-center"
              style={{
                background: 'linear-gradient(90deg, #52b788, #0effbe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Because protecting the planet starts with restoring the corner of Earth closest to you.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ─── CREATED BY ─── */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="h-px w-full mb-12"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
            }}
          />

          <RevealSection>
            <p className="text-xs uppercase tracking-widest text-gray-600 mb-6" style={{ fontFamily: "'Orbitron', monospace" }}>
              Created By
            </p>
          </RevealSection>

          <RevealSection delay={80}>
            <div className="flex justify-center gap-6 flex-wrap">
              {['Guillermo R.', 'Elyas Y.', 'Maxwell L.'].map((name) => (
                <div
                  key={name}
                  className="px-5 py-2 rounded-full border border-white/10 text-sm text-gray-300 font-medium"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  {name}
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={160}>
            <p
              className="mt-5 text-xs text-gray-600 tracking-widest uppercase"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              DonsHack '26
            </p>
          </RevealSection>

          {/* CTA */}
          <RevealSection delay={240}>
            <div className="mt-14">
              <Link
                to="/login"
                className="inline-block px-10 py-4 rounded-full text-sm font-bold tracking-wide transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #52b788, #0effbe)',
                  color: '#0a1a0a',
                  boxShadow: '0 0 32px rgba(14,255,190,0.25), 0 4px 16px rgba(0,0,0,0.4)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 0 48px rgba(14,255,190,0.4), 0 4px 20px rgba(0,0,0,0.5)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 0 32px rgba(14,255,190,0.25), 0 4px 16px rgba(0,0,0,0.4)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Join the Movement →
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 text-center py-8 border-t border-white/5">
        <p className="text-xs text-gray-700 tracking-wider" style={{ fontFamily: "'Orbitron', monospace" }}>
          REVIV · DonsHack '26 · Built for the planet
        </p>
      </footer>

      {/* Reveal animation styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

        .reveal-section {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .reveal-section.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}
