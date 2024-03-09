import { useEffect } from "react"
import s from "../styles/style.module.sass"
import { motion, useAnimationControls } from "framer-motion"
import { SlideType } from "../types"


export interface SlideProps {
    children: React.ReactNode
    backgroundColor?: string
    sticky?: boolean
    style?: React.CSSProperties
    active?: boolean
    duration?: number
    index?: number
    activeSlide?: number
    type?: SlideType
}



export const Slide = (props: SlideProps) => {
    const { children, sticky = false, style, index = 0, activeSlide = 0, type = "card" } = props

    const defaultStyle: React.CSSProperties = {
        position: sticky ? 'sticky' : undefined,
        top: sticky ? 0 : undefined,
        zIndex: sticky ? -1 : undefined,
        ...style
    }

    const controls = useAnimationControls();
    const controlsOverlay = useAnimationControls();

    useEffect(() => {
        if (index === activeSlide) {
            controls.start('animate')
            controlsOverlay.start('animate')
        } else if (index < activeSlide) {
            controls.start('exit')
            controlsOverlay.start('exit')
        } else if (index === 0) {
            controls.start('animate')
            controlsOverlay.start('animate')
        }

    }, [index, activeSlide]);


    const overlay = {
        initial: {
            opacity: .5,
        },
        animate: {
            opacity: 1,
        },
        exit: {
            opacity: .5,
        }
    }

    return (
        <motion.div
            className={s.slide}
            style={defaultStyle}
            animate={controls}
            initial="initial"
            variants={slideType[type as keyof typeof slideType]}
        >
            <motion.div
                animate={controlsOverlay}
                variants={overlay}
                initial="initial"

            >
                {children}
                <SlideBackground {...props} />
            </motion.div>
        </motion.div>
    )
}

const SlideBackground = (props: SlideProps) => {

    const { backgroundColor = 'white', active } = props
    const backgroundStyle: React.CSSProperties = {
        backgroundColor: backgroundColor,
    }

    const controls = useAnimationControls();

    useEffect(() => {
        if (active) {
            controls.start('animate');
        } else {
            controls.start('exit');
        }
    }, [active]);

    const variants = {
        initial: {
            opacity: 1,
        },
        animate: {
            opacity: 1,
        },
        exit: {
            opacity: 1,
        }
    }

    return (
        <motion.div
            className={s.background}
            style={backgroundStyle}
            animate={controls}
            variants={variants}
            initial="initial"
        />
    )
}

const exitScale = .9

const cardVariants = {
    initial: {
        scale: exitScale,
        borderRadius: "50px",
    },
    animate: {
        scale: 1,
        borderRadius: 0,
        transition: {
            type: "tween",
            duration: .4,
            delay: .1,
            ease: [0.76, 0, 0.24, 1]

        }
    },
    exit: {
        scale: exitScale,
        borderRadius: "50px",
        transition: {
            type: "tween",
            duration: .5,
            delay: .1,
            ease: [0.76, 0, 0.24, 1]
        }
    }
}


const slideType = {
    card: cardVariants,
    slide: cardVariants,
    fade: cardVariants
}