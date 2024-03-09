import React, { ReactNode, useEffect, useState } from "react"
import style from "../styles/style.module.sass"
import { motion, useAnimationControls } from "framer-motion"

export interface FullpageProps {
    children: ReactNode
    scrollDuration?: number
}

export function Fullpage(props: FullpageProps) {
    const { children, scrollDuration = .6 } = props

    const containerRef = React.useRef<HTMLDivElement>(null);

    const [isScrollingAllowed, setIsScrollingAllowed] = useState(true);
    const [childCount, setChildCount] = useState(React.Children.count(children));
    const [activeChild, setActiveChild] = useState(0);

    const controls = useAnimationControls();



    console.log('activeChild', activeChild)
    console.log('childCount', childCount)

    const handleActiveChild = (index: number, childCount: number) => {
        console.log('childCount di handle active child saat di scrol : ', childCount)
        setActiveChild(prev => {
            let nextIndex = prev + index;
            if (nextIndex >= childCount) {
                nextIndex = childCount - 1; // Jika melebihi jumlah child, set ke child terakhir
            } else if (nextIndex < 0) {
                nextIndex = 0; // Jika kurang dari 0, set ke child pertama
            }
            return nextIndex;
        });
    }



    const animateScroll = (newIndex: number) => {
        // const vh = Math.max(document.documentElement.clientHeight, window.innerHeight);
        const targetY = window.innerHeight * newIndex; // Ini harus positif karena itu adalah posisi Y target
        smoothScrollTo(targetY, scrollDuration * 1000);
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll ke bagian atas halaman
    }, []);

    useEffect(() => {
        console.log('animate scrol ke ', activeChild)
        if (activeChild < 0 || activeChild >= childCount) return;
        animateScroll(activeChild);
    }, [activeChild]);

    const handleScroll = (e: WheelEvent) => {
        e.preventDefault();
        if (!isScrollingAllowed) return;

        setIsScrollingAllowed(false); // Mencegah scrolling selanjutnya

        const direction = e.deltaY > 0 ? 1 : -1;
        console.log('activeChild', activeChild)
        console.log('direction', direction)
        handleActiveChild(direction, childCount);

        setTimeout(() => {
            setIsScrollingAllowed(true);
        }, 400); // Sesuaikan dengan durasi animasi scroll
    };

    console.log('activeChild ------>>>> ', activeChild)

    useEffect(() => {
        // Add event listener with the correct event type
        const listener = (e: Event) => handleScroll(e as WheelEvent);
        window.addEventListener('wheel', listener, { passive: false });

        return () => {
            window.removeEventListener('wheel', listener);
        };
    }, [isScrollingAllowed]);

    useEffect(() => {
        setChildCount(React.Children.count(children));
    }, [children]);

    return (
        <>
            <motion.div
                ref={containerRef}
                animate={controls}
                className={style.fullpage}>
                {children}

            </motion.div>
            <Dots
                childCount={childCount}
                activeChild={activeChild}
                setActiveChild={setActiveChild}
            />
        </>
    )
}

const Dots = (props: {
    childCount: number,
    activeChild: number,
    setActiveChild: (index: number) => void
}) => {
    const { childCount, activeChild, setActiveChild } = props;

    return (
        <ul className={style.dots}>
            {Array.from({ length: childCount }, (_, i) => (
                <motion.li
                    key={i}
                    animate={activeChild === i ? { scale: 1 } : { scale: .5 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className={style.dot}
                    onClick={() => setActiveChild(i)}
                />
            ))}
        </ul>
    )
}


const smoothScrollTo = (endY: number, duration: number) => {
    const startY = window.scrollY;
    const distance = endY - startY;
    const startTime = new Date().getTime();

    const easeInOutQuad = (time: number, start: number, change: number, duration: number) => {
        time /= duration / 2;
        if (time < 1) return (change / 2) * time * time + start;
        time--;
        return (-change / 2) * (time * (time - 2) - 1) + start;
    };

    const animationLoop = () => {
        const currentTime = new Date().getTime() - startTime;
        const newY = easeInOutQuad(currentTime, startY, distance, duration);
        window.scrollTo(0, newY);
        if (currentTime < duration) {
            requestAnimationFrame(animationLoop);
        }
    };

    requestAnimationFrame(animationLoop);
};