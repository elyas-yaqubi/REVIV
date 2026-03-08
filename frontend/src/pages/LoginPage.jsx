import { useState, useCallback, useEffect } from 'react'
import { SplashScreen } from '../components/Auth/SplashScreen'
import { LoginForm } from '../components/Auth/LoginForm'

const HELVETICA = "'Helvetica Neue', Helvetica, Arial, sans-serif"

export default function LoginPage() {
  const alreadySeen = !!sessionStorage.getItem('splashShown')
  const [splashDone, setSplashDone] = useState(alreadySeen)
  const [contentVisible, setContentVisible] = useState(false)

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('splashShown', '1')
    setSplashDone(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setContentVisible(true))
    })
  }, [])

  // Skip splash on return visits — slide in from left
  useEffect(() => {
    if (alreadySeen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setContentVisible(true))
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{ background: 'radial-gradient(ellipse at center, #2d2d2d 0%, #111111 100%)', minHeight: '100vh' }}
      className="relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_60%)] pointer-events-none" />

      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}

      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateX(0)' : alreadySeen ? 'translateX(-48px)' : 'translateX(0)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}
        className="relative flex flex-col items-center px-4 pt-6 pb-10"
      >
        {/* Logo — cropped container hides SVG whitespace */}
        <div style={{
          width: 'clamp(320px, 48vw, 580px)',
          height: '36vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <img
            src="/REVIV.svg"
            alt="REVIV"
            className="drop-shadow-lg"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Card */}
        <div className="w-full max-w-sm bg-white/95 backdrop-blur-md shadow-2xl border border-white/20 rounded-2xl p-10" style={{ marginTop: '20px' }}>
          <h2
            className="text-center text-xl font-bold mb-6 text-gray-900"
            style={{ fontFamily: HELVETICA }}
          >
            Sign in
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
