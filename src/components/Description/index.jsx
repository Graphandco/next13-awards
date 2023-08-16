import styles from "./style.module.scss";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { slideUp, opacity } from "./animation";
import Rounded from "../../common/RoundedButton";
export default function index() {
    const phrase =
        "Nous sommes spécialisés dans la réalisation de sites web. Moderne et intuitif, votre site sera un puissant levier pour accroitre la vitalité de votre entreprise.";
    const description = useRef(null);
    const isInView = useInView(description);
    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <p>
                    {phrase.split(" ").map((word, index) => {
                        return (
                            <span className={styles.mask} key={index}>
                                <motion.span
                                    variants={slideUp}
                                    custom={index}
                                    animate={isInView ? "open" : "closed"}
                                    key={index}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        );
                    })}
                </p>
                <motion.p
                    variants={opacity}
                    animate={isInView ? "open" : "closed"}
                >
                    The combination of my passion for design, code & interaction
                    positions me in a unique place in the web design world.
                </motion.p>
                <div data-scroll data-scroll-speed={0.1}>
                    <Rounded className={styles.button} backgroundColor="white">
                        <p>About me</p>
                    </Rounded>
                </div>
            </div>
        </div>
    );
}
