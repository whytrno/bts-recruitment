const Button = ({onClick, color, title}) => {
    return (
        <button onClick={onClick}
                className={`py-1 px-4 bg-${color}-500 rounded-4 text-white`}>{title}
        </button>
    )
}

export default Button