import { getRandomKanaPair } from '@/libs/kanaUtils'
import type { KanaPair } from '@/types/kana'
import '@styles/Home.css'
import { useEffect, useState } from 'react'
import Streak from '@/components/Streak'

function Home() {
    const [currentPair, setCurrentPair] = useState<KanaPair>(getRandomKanaPair())
    const [inputValue, setInputValue] = useState('')
    const [streak, setStreak] = useState(0)

    useEffect(() => {
        if (inputValue === currentPair.romaji) {
            setStreak(streak => streak += 1)
            setCurrentPair(getRandomKanaPair())
            setInputValue('')
        }
        else if (currentPair.romaji.length !== 1) {
            if (inputValue.length === currentPair.romaji.length) setStreak(0)  
        }
        // si la palabra es de 1 caracter (a i u e o n) e ingresaste 2
        else if (inputValue.length === 2) setStreak(0)
    }, [inputValue])

    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleInputValue', e.target.value)
        setInputValue(e.target.value)
    }

    return (
        <main className='Home'>
            <div className='home-container'>
                <h1 className='kana'>{ currentPair?.kana }</h1>
                <div className='input-container'>
                    <Streak currentStreak={streak} maxStreak={10} />
                    <input id='main-input' type="text" maxLength={3} value={inputValue} 
                        // placeholder="Type the romaji..."
                        placeholder={`Romanji: ${currentPair.romaji}`}
                        onChange={handleInputValue}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.code === 'Space' || e.key === ' ') {
                                e.preventDefault()
                                setCurrentPair(getRandomKanaPair())
                                setStreak(0)
                            }
                        }}
                    />
                </div>
            </div>
        </main>
    )
}

export default Home
