"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";
import Image from "next/image";

export default function index() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);

    useEffect(() => {
        if (isActive) setIsActive(false);
    }, [pathname]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                onLeave: () => {
                    gsap.to(button.current, {
                        scale: 1,
                        duration: 0.25,
                        ease: "power1.out",
                    });
                },
                onEnterBack: () => {
                    gsap.to(button.current, {
                        scale: 0,
                        duration: 0.25,
                        ease: "power1.out",
                    });
                },
            },
        });
    }, []);

    const topbarWords = [
        "Création de sites web",
        "Identité visuelle",
        "Sites sur-mesure",
        "Branding",
        "Création de sites web",
        "Identité visuelle",
        "Sites sur-mesure",
        "Branding",
        "Création de sites web",
        "Identité visuelle",
        "Sites sur-mesure",
        "Branding",
    ];

    return (
        <header>
            <div ref={header} className={styles.header}>
                {/* <div className={styles.headerTopbar}>
                    {topbarWords.map((word, index) => (
                        <span
                            key={index}
                            className="text-accent uppercase whitespace-nowrap"
                        >
                            {word}
                        </span>
                    ))}
                </div> */}
                <div className={styles.headerWrapper}>
                    <div>
                        <Image
                            src="/images/logo-black.svg"
                            width="50"
                            height="50"
                            alt="Graph and Co"
                            className="site-logo"
                        />
                        <div className={styles.logo}>
                            <p className={styles.copyright}>©</p>
                            <div className={styles.name}>
                                <p className={styles.codeBy}>Made by</p>
                                <p className={styles.dennis}>Graph & Co</p>
                                <p className={styles.snellenberg}>Web Agency</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.nav}>
                        <Magnetic>
                            <div className={styles.el}>
                                <a>Work</a>
                                <div className={styles.indicator}></div>
                            </div>
                        </Magnetic>
                        <Magnetic>
                            <div className={styles.el}>
                                <a>About</a>
                                <div className={styles.indicator}></div>
                            </div>
                        </Magnetic>
                        <Magnetic>
                            <div className={styles.el}>
                                <a>Contact</a>
                                <div className={styles.indicator}></div>
                            </div>
                        </Magnetic>
                    </div>
                </div>
            </div>
            <div ref={button} className="headerButtonContainer">
                <Rounded
                    onClick={() => {
                        setIsActive(!isActive);
                    }}
                    className="button"
                    backgroundColor="white"
                >
                    <div
                        className={`burger ${isActive ? "burgerActive" : ""}`}
                    ></div>
                </Rounded>
            </div>
            <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
        </header>
    );
}
