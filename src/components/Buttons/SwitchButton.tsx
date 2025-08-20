import '@styles/SwitchButton.css'

// stroke: number, size: number, ...props: : React.ButtonHTMLAttributes<HTMLButtonElement>
type SwitchButtonProps = {
    stroke?: number
    size?: number
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function SwitchButton({ stroke = 2, size = 24, ...props }: SwitchButtonProps) {
    return (
        <button className='switch-button' {...props}>
            <svg 
                // xmlns="http://www.w3.org/2000/svg"
                // className="icon icon-tabler icons-tabler-outline icon-tabler-repeat"
                width={size} height={size} viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" />
                <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" />
            </svg>
        </button>
    )
}

export default SwitchButton
