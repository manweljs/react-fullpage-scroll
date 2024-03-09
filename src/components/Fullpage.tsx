import React, { ReactNode, useEffect, useState } from "react"
import s from "../styles/style.module.sass"
import { AnimatePresence, motion, useAnimationControls } from "framer-motion"
import { Dots } from "./Dots"
import { Slide } from "./Slide"
import { SlideType } from "../types"

const timeBeforeNextScroll = 500; // Durasi sebelum scroll selanjutnya diizinkan



export interface FullPageProps {
    children: ReactNode
    scrollDuration?: number
    type?: SlideType
}

export function FullPage(props: FullPageProps) {
    const { children, scrollDuration = .6, type = "slide" } = props

    const containerRef = React.useRef<HTMLDivElement>(null);
    const childCount = React.Children.count(children)

    const [isScrollingAllowed, setIsScrollingAllowed] = useState(true);
    const [activeChild, setActiveChild] = useState(0);
    const [slides, setSlides] = useState<any[]>([]);

    useEffect(() => {
        setSlides(React.Children.toArray(children));
    }, [children]);

    const controls = useAnimationControls();

    const handleActiveChild = (index: number, childCount: number) => {
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
        const vh = Math.max(document.documentElement.clientHeight, window.innerHeight);
        const targetY = vh * newIndex;
        smoothScrollTo(targetY, scrollDuration * 1000);
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll ke bagian atas halaman
    }, []);

    useEffect(() => {
        if (activeChild < 0 || activeChild >= childCount) return;
        animateScroll(activeChild);
    }, [activeChild]);

    const handleScroll = (e: WheelEvent) => {
        console.log('isScrollingAllowed', isScrollingAllowed)
        e.preventDefault();
        if (!isScrollingAllowed) return;

        setIsScrollingAllowed(false); // Mencegah scrolling selanjutnya

        const direction = e.deltaY > 0 ? 1 : -1;

        handleActiveChild(direction, childCount);

        setTimeout(() => {
            setIsScrollingAllowed(true);
        }, timeBeforeNextScroll); // Sesuaikan dengan durasi animasi scroll
    };


    useEffect(() => {
        // Add event listener with the correct event type
        const listener = (e: Event) => handleScroll(e as WheelEvent);
        window.addEventListener('wheel', listener, { passive: false });

        return () => {
            window.removeEventListener('wheel', listener);
        };
    }, [isScrollingAllowed]);

    return (
        <AnimatePresence >
            <motion.div
                ref={containerRef}
                animate={controls}
                className={s.fullpage}
                key="fullpage"
            >
                {slides.map((slide, index) => (
                    <Slide
                        sticky={type === "card" ? true : false}
                        key={index}
                        index={index}
                        {...slide.props}
                        duration={scrollDuration}
                        active={index === activeChild}
                        activeSlide={activeChild}
                    >
                        {slide.props.children}
                    </Slide>

                ))}
            </motion.div>
            <Dots
                childCount={childCount}
                activeChild={activeChild}
                setActiveChild={setActiveChild}
            />
        </AnimatePresence>
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

        if (currentTime < duration) {
            window.scrollTo(0, newY);
            requestAnimationFrame(animationLoop);
        } else {
            // Saat animasi selesai, paksa scroll ke posisi target pastikan ini kelipatan vh * activeChild.
            window.scrollTo(0, endY);
        }
    };

    requestAnimationFrame(animationLoop);
};


