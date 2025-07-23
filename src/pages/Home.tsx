import { getRandomKanaPair, allPairs } from '@/libs/kanaUtils'
import type { KanaPair } from '@/types/kana'
import '@styles/Home.css'
import { useEffect, useRef, useState } from 'react'
import Streak from '@/components/Streak'

function Home() {
    const [availablePairs, setAvailablePairs] = useState<KanaPair[]>(allPairs)
    const [currentPair, setCurrentPair] = useState<KanaPair>(getRandomKanaPair(availablePairs))
    const [inputValue, setInputValue] = useState('')
    const [streak, setStreak] = useState(0)
    const [showHint, setShowHint] = useState(false)

    const mainInputRef = useRef<HTMLInputElement>(null)

    const resetStreak = (animation: string = 'flash-red-border 1s ease') => {
        setStreak(0)
        if (!mainInputRef.current) return
        mainInputRef.current.style.animation = 'none'
        void mainInputRef.current.offsetWidth
        mainInputRef.current.style.animation = animation
    }

    const changeCurrentPair = () => {
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
                <h1 className='kana'>{currentPair?.kana}</h1>
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
                    {showHint && <span className='hint'>{currentPair.romaji}</span>}
                </div>
            </div>
        </main>
    )
}

export default Home
