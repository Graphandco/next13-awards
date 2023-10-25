"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaTimes } from "react-icons/fa";

export default function index() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);
    const [firstLetterUser, setFirstLetterUser] = useState("");
    const [avatarLink, setAvatarLink] = useState("/login");

    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            const userLetter = Array.from(session?.user?.name)[0];
            setFirstLetterUser(userLetter);
            setAvatarLink("/dashboard");
        } else {
            setFirstLetterUser("G");
        }
    }, [session]);

    const navItems = [
        {
            label: "Accueil",
            href: "/",
        },
        {
            label: "Prestations",
            href: "/prestations",
        },
        {
            label: "Réalisations",
            href: "/realisations",
        },
        {
            label: "Contact",
            href: "/contact",
        },
    ];

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
            <div ref={header} className="header">
                {/* <div className="header-topbar">
                    {topbarWords.map((word, index) => (
                        <span
                            key={index}
                            className="text-accent uppercase whitespace-nowrap"
                        >
                            {word}
                        </span>
                    ))}
                </div> */}
                <div className="header-wrapper">
                    <div>
                        <Image
                            src="/images/logo.svg"
                            width="50"
                            height="50"
                            alt="Graph and Co"
                            className="site-logo"
                        />
                        <div className="header-brand">
                            <p className="header-copyright">©</p>
                            <div className="header-name">
                                <p className="code-by">Made by</p>
                                <p className="dennis">Graph & Co</p>
                                <p className="snellenberg">Web Agency</p>
                            </div>
                        </div>
                    </div>
                    <nav>
                        {navItems.map((link, index) => (
                            <Magnetic key={index}>
                                <div
                                    className={
                                        pathname === `${link.href}`
                                            ? "el active"
                                            : "el"
                                    }
                                >
                                    <Link href={link.href}>{link.label}</Link>
                                    <div className="indicator"></div>
                                </div>
                            </Magnetic>
                        ))}
                        <Magnetic>
                            <div className="header-user">
                                <div className="el avatar">
                                    <Link href={avatarLink}>
                                        {firstLetterUser}
                                    </Link>
                                </div>
                            </div>
                        </Magnetic>

                        {/* <Magnetic>
                            <div className="el">
                                <a>Prestations</a>
                                <div className="indicator"></div>
                            </div>
                        </Magnetic>
                        <Magnetic>
                            <div className="el">
                                <a>Réalisations</a>
                                <div className="indicator"></div>
                            </div>
                        </Magnetic>
                        <Magnetic>
                            <div className="el">
                                <a>Contact</a>
                                <div className="indicator"></div>
                            </div>
                        </Magnetic> */}
                    </nav>
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
