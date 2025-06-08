'use client'

import { useTheme } from '../contexts/ThemeContext'
import { ClassicMode } from "../components/classic/ClassicMode"
import { TerminalMode } from "../components/terminal/TerminalMode"

export default function Home() {
  const { mode } = useTheme()

  return (
    <main className="min-h-screen">
      {mode === 'classic' ? (
        <ClassicMode />
      ) : (
        <>
          <TerminalMode />
          <div className="terminal-card mt-8 max-w-xl mx-auto text-center border-2 border-hack-green shadow-lg">
            <h2 className="text-hack-green text-2xl font-bold mb-2">Join the network</h2>
            <p className="mt-2 text-lg">Become a part of our community and access exclusive features, events, and resources. Click the button below to get started!</p>
            <a
              href="/onboard"
              className="inline-block mt-6 px-6 py-3 bg-hack-green text-terminal-bg rounded font-semibold text-lg hover:bg-hack-green/80 transition"
            >
              Join Now
            </a>
          </div>
        </>
      )}
    </main>
  )
}