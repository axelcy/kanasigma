import '@styles/Streak.css'
import Lottie, { type LottieComponentProps } from 'lottie-react'
import fireAnimation from '@assets/fire.json'

type StreakProps = {
    currentStreak: number
    maxStreak: number
} & Partial<LottieComponentProps>

function Streak({ currentStreak, maxStreak, ...props }: StreakProps) {
    return (
        <div className='streak-container'>
            <div className='streak-inner-container'>
                <Lottie className='streak-animation' animationData={fireAnimation} {...props}
                    style={{ filter: `blur(0.5px) grayscale(${Math.max(0, 1 - currentStreak / maxStreak)})` }}
                />
                <span>{currentStreak}</span>
            </div>
        </div>
    )
}

export default Streak
