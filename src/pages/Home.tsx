import { getRandomKanaPair, allPairs } from '@/libs/kanaUtils'
import type { KanaPair } from '@/types/kana'
import '@styles/Home.css'
import { useEffect, useRef, useState } from 'react'
import Streak from '@/components/Streak'
import SwitchButton from '@/components/Buttons/SwitchButton'
import SkipButton from '@/components/Buttons/SkipButton'
import HintButton from '@/components/Buttons/HintButton'

function Home() {
    const [, setAvailablePairs] = useState<KanaPair[]>(allPairs)
    const [currentPair, setCurrentPair] = useState<KanaPair>(getRandomKanaPair())
    const [inputValue, setInputValue] = useState('')
    const [streak, setStreak] = useState(0)
    const [showHint, setShowHint] = useState(false)
    const [romanjiMode, setRomajiMode] = useState(false)

    const mainInputRef = useRef<HTMLInputElement>(null)

    const resetStreak = (animation: string = 'flash-red-border 1s ease') => {
        setStreak(0)
        if (!mainInputRef.current) return
        mainInputRef.current.style.animation = 'none'
        void mainInputRef.current.offsetWidth
        mainInputRef.current.style.animation = animation
    }

    function changeCurrentPair() {
        setShowHint(false)
        setAvailablePairs(prevAvailablePairs => {
            let pairs = prevAvailablePairs.length === 0 ? allPairs : prevAvailablePairs
            const randomPair = getRandomKanaPair(pairs)
            setCurrentPair(randomPair)
            return pairs.filter(pair => pair !== randomPair)
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.endsWith(' ')) return handleSpacebar(e)
        setInputValue(e.target.value)
    }

    const handleSpacebar = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!mainInputRef.current) return
        mainInputRef.current.style.borderColor = 'red'
        resetStreak('flash-red-border-only 1s ease')
        setShowHint(true)
    }

    useEffect(() => {
        // al iniciar, eliminar el primer par de la lista de disponibles
        setAvailablePairs(allPairs.filter(pair => pair !== currentPair))
    }, [])

    useEffect(() => {
        if (inputValue === currentPair.romaji) {
            if (mainInputRef.current) mainInputRef.current.style.borderColor = 'var(--color-3)'
            setStreak(streak => streak += 1)
            changeCurrentPair()
            setInputValue('')
            setShowHint(false)
        }
        else if (currentPair.romaji.length !== 1) {
            // si la palabra es de 2 o mas caracteres y están mal escritos
            if (inputValue.length === currentPair.romaji.length) resetStreak()
        }
        // si la palabra es de 1 caracter (a i u e o n) e ingresaste 2 caracteres
        else if (inputValue.length === 2) resetStreak()
    }, [inputValue])

    return (
        <main className='Home'>
            <div className='home-container'>
                <Streak currentStreak={streak} maxStreak={10} />
                <SwitchButton size={32} stroke={2} onClick={() => setRomajiMode(prev => !prev)} />
                <h1 className='kana'>{romanjiMode ? currentPair.romaji : currentPair.kana}</h1>
                <div className='input-container'>
                    <input ref={mainInputRef} id='main-input' type="text" maxLength={3} value={inputValue} 
                        placeholder="Type the romaji..."
                        onChange={handleChange}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.code === 'Space' || e.key === ' ') handleSpacebar(e)
                        }}
                        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.code === 'Space' || e.key === ' ') handleSpacebar(e)
                        }}
                    />
                    <SkipButton onClick={() => {
                        resetStreak()
                        changeCurrentPair()
                    }} />
                    <HintButton onClick={handleSpacebar} />
                    {showHint && <span className='hint'>{romanjiMode ? currentPair.kana : currentPair.romaji}</span>}
                </div>
            </div>
        </main>
    )
}

export default Home
