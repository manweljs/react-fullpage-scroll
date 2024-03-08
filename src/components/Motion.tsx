import { motion } from 'framer-motion';

export function Motion() {
    return (
        <motion.div>Motion</motion.div>
    )
}

const animMotion = (variants: any) => {
    return {
        initial: 'hidden',
        animate: 'enter',
        exit: 'exit',
        variants: variants,

    }
}

export namespace Motion {
    export const anim = animMotion
}