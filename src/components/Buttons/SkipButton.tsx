import '@styles/SkipButton.css'

// stroke: number, size: number, ...props: : React.ButtonHTMLAttributes<HTMLButtonElement>
type SkipButtonProps = {
    stroke?: number
    size?: number
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function SkipButton({ stroke = 2, size = 24, ...props }: SkipButtonProps) {
    return (
        <button className='skip-button' {...props}>
            <svg
                // xmlns="http://www.w3.org/2000/svg"
                // className="icon icon-tabler icons-tabler-outline icon-tabler-player-skip-forward"
                width={size} height={size} viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 5v14l12 -7z" />
                <path d="M20 5l0 14" />
            </svg>
        </button>
    )
}

export default SkipButton
