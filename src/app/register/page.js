"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const registerUser = async (e) => {
        e.preventDefault();
        axios
            .post("/api/register", data)
            .then(() => {
                toast.success("Votre compte a bien été créé !");
                router.push("/login");
            })
            .catch(() => toast.error("Something went wrong!"));
    };
    const router = useRouter();

    return (
        <>
            <>
                <div className="user-form">
                    <h1>Créer un compte</h1>
                    <form onSubmit={registerUser} className="form-wrapper">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Nom"
                            required
                            value={data.name}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    name: e.target.value,
                                })
                            }
                        />

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            autoComplete="email"
                            required
                            value={data.email}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    email: e.target.value,
                                })
                            }
                        />

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Mot de passe"
                            autoComplete="current-password"
                            required
                            value={data.password}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    password: e.target.value,
                                })
                            }
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <button type="submit" className="form-submit">
                            Créer un compte
                        </button>
                    </form>
                    <div className="form-link">
                        <span>Déjà membre ? Cliquez</span>
                        <Link href="/register"> ici </Link>
                        <span>pour vous connecter</span>
                    </div>
                </div>
            </>
        </>
    );
}
