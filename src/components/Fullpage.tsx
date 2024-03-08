import React, { ReactNode, useEffect, useState } from "react"
import style from "../styles/style.module.sass"
import { motion } from "framer-motion"

export function Fullpage(props: {
    children: ReactNode
}) {
    const { children } = props

    const [isScrollingAllowed, setIsScrollingAllowed] = useState(true);
    const [childCount, setChildCount] = useState(0);
    const [activeChild, setActiveChild] = useState(0);

    useEffect(() => {
        setChildCount(React.Children.count(children));
    }, []);

    console.log('childCount', childCount)

    const handleActiveChild = (index: number) => {
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

    useEffect(() => {
        window.scrollTo({
            top: window.innerHeight * activeChild,
            behavior: 'smooth'
        });
    }, [activeChild]);

    const handleScroll = (e: WheelEvent) => {
        e.preventDefault();
        if (!isScrollingAllowed) return;

        setIsScrollingAllowed(false); // Mencegah scrolling selanjutnya

        const direction = e.deltaY > 0 ? 1 : -1;
        handleActiveChild(direction);

        setTimeout(() => {
            setIsScrollingAllowed(true);
        }, 600); // Sesuaikan dengan durasi animasi scroll
    };

    console.log('activeChild', activeChild)

    useEffect(() => {
        // Add event listener with the correct event type
        const listener = (e: Event) => handleScroll(e as WheelEvent);
        window.addEventListener('wheel', listener);

        return () => {
            window.removeEventListener('wheel', listener);
        };
    }, [isScrollingAllowed]);

    return (
        <div className={style.fullpage}>
            {children}
            <Dots
                childCount={childCount}
                activeChild={activeChild}
                setActiveChild={setActiveChild}
            />
        </div>
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

