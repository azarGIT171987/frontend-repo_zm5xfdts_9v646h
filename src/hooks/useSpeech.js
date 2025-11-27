import { useState, useEffect, useCallback } from 'react'

export const useSpeech = () => {
  const [voices, setVoices] = useState([])

  useEffect(() => {
    const loadVoices = () => {
      const vs = window.speechSynthesis.getVoices()
      setVoices(vs)
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  const speak = useCallback((item) => {
    if (!item) return

    // Cancel any current speech
    window.speechSynthesis.cancel()

    // 1. Try to find an Arabic voice
    // Prioritize "Male" if possible, though browser naming is inconsistent.
    // Common Arabic voice identifiers: 'ar', 'ar-SA', 'Maged', 'Tarik', etc.
    const arabicVoice = voices.find(v => 
      v.lang.startsWith('ar') && (v.name.includes('Male') || v.name.includes('Maged') || v.name.includes('Tarik') || true)
    )

    // 2. Create Utterance
    // If Arabic voice exists, read the Arabic script. Otherwise read English.
    const textToRead = arabicVoice ? item.arabic_name : item.english_name
    const utterance = new SpeechSynthesisUtterance(textToRead)

    if (arabicVoice) {
      utterance.voice = arabicVoice
      utterance.lang = arabicVoice.lang
      utterance.rate = 0.9 // Slightly slower for clarity
    } else {
      utterance.lang = 'en-US'
    }

    window.speechSynthesis.speak(utterance)
  }, [voices])

  return { speak }
}
