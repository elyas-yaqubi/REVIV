import { useState, useEffect } from 'react'
import { RegisterForm } from '../components/Auth/RegisterForm'

const HELVETICA = "'Helvetica Neue', Helvetica, Arial, sans-serif"

export default function RegisterPage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
  }, [])

  return (
    <div
      style={{ background: 'radial-gradient(ellipse at center, #2d2d2d 0%, #111111 100%)', minHeight: '100vh' }}
      className="relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_60%)] pointer-events-none" />

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(48px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}
        className="relative flex flex-col items-center px-4 pt-10 pb-10"
      >
        {/* Logo */}
        <div style={{
          width: 'clamp(240px, 36vw, 440px)',
          height: '26vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <img
            src="/REVIV_wo_slo.svg"
            alt="REVIV"
            className="drop-shadow-lg"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Card */}
        <div className="relative w-full max-w-sm bg-white/95 backdrop-blur-md shadow-2xl border border-white/20 rounded-2xl p-10" style={{ marginTop: '16px' }}>
          <h2
            className="text-center text-xl font-bold mb-6 text-gray-900"
            style={{ fontFamily: HELVETICA }}
          >
            Create Account
          </h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
