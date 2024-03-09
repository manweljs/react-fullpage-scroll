import s from '../styles/style.module.sass'
import { motion } from 'framer-motion'

export const Dots = (props: {
    childCount: number,
    activeChild: number,
    setActiveChild: (index: number) => void
}) => {
    const { childCount, activeChild, setActiveChild } = props;

    return (
        <ul className={s.dots}>
            {Array.from({ length: childCount }, (_, i) => (
                <motion.li
                    whileHover={{ scale: 1 }}
                    key={i}
                    animate={activeChild === i ? { scale: 1 } : { scale: .5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 6 }}
                    className={s.dot}
                    onClick={() => setActiveChild(i)}
                />
            ))}
        </ul>
    )
}