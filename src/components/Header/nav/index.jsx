import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { menuSlide } from "../animation";
import Link from "./Link";
import Curve from "./Curve";

const navItems = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Prestations",
        href: "/prestations",
    },
    {
        title: "About",
        href: "/about",
    },
    {
        title: "Contact",
        href: "/contact",
    },
];

export default function index() {
    const pathname = usePathname();
    const [selectedIndicator, setSelectedIndicator] = useState(pathname);

    return (
        <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="burger-menu-wrapper"
        >
            <div className="burger-menu-content">
                <div
                    onMouseLeave={() => {
                        setSelectedIndicator(pathname);
                    }}
                    className="burger-menu-nav"
                >
                    <div className="burger-menu-header">
                        <p>Un métier, une passion</p>
                    </div>
                    {navItems.map((data, index) => {
                        return (
                            <Link
                                key={index}
                                data={{ ...data, index }}
                                isActive={selectedIndicator == data.href}
                                setSelectedIndicator={setSelectedIndicator}
                            ></Link>
                        );
                    })}
                </div>
                {/* <div className="menu-footer">
                    <a>Awwwards</a>
                    <a>Instagram</a>
                    <a>Dribble</a>
                    <a>LinkedIn</a>
                </div> */}
            </div>
            <Curve />
        </motion.div>
    );
}
