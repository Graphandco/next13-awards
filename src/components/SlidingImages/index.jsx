import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";

const slider1 = [
    {
        color: "#32CB01",
        src: "cover-peche-exotique.jpg",
    },
    {
        color: "#8a8a8a",
        src: "cover-bomot.jpg",
    },
    {
        color: "#1D2D29",
        src: "cover-willow.jpg",
    },
    {
        color: "#2B4D28",
        src: "cover-hola-mate.jpg",
    },
];

const slider2 = [
    {
        color: "#171F2B",
        src: "cover-fylo.jpg",
    },
    {
        color: "#2A3B59",
        src: "cover-boatman.jpg",
    },
    {
        color: "#171a25",
        src: "cover-loide.jpg",
    },
    {
        color: "#181e1f",
        src: "cover-barber.jpg",
    },
];

export default function index() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"],
    });

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

    return (
        <section ref={container} className={styles.slidingImages}>
            <motion.div style={{ x: x1 }} className={styles.slider}>
                {slider1.map((project, index) => {
                    return (
                        <div
                            className={styles.project}
                            style={{ backgroundColor: project.color }}
                            key={index}
                        >
                            <div key={index} className={styles.imageContainer}>
                                <Image
                                    fill={true}
                                    alt={"image"}
                                    src={`/images/${project.src}`}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                    );
                })}
            </motion.div>
            <motion.div style={{ x: x2 }} className={styles.slider}>
                {slider2.map((project, index) => {
                    return (
                        <div
                            className={styles.project}
                            style={{ backgroundColor: project.color }}
                            key={index}
                        >
                            <div className={styles.imageContainer}>
                                <Image
                                    fill={true}
                                    alt={"image"}
                                    src={`/images/${project.src}`}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                    );
                })}
            </motion.div>
            <motion.div style={{ height }} className={styles.circleContainer}>
                <div className={styles.circle}></div>
            </motion.div>
        </section>
    );
}
