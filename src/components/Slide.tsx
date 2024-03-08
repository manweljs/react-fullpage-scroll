import style from "../styles/style.module.sass"

export const Slide = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={style.slide}>
            {children}
        </div>
    )
}