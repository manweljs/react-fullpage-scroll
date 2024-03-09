import style from "../styles/style.module.sass"

export interface SlideProps {
    children: React.ReactNode
    backgroundColor?: string
}
export const Slide = (props: SlideProps) => {
    const { children, backgroundColor = 'white' } = props
    const defaultStyle = {
        backgroundColor: backgroundColor
    }
    return (
        <div className={style.slide} style={defaultStyle}>
            {children}
        </div>
    )
}