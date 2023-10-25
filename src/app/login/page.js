"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const session = useSession();
    const router = useRouter();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.push("/dashboard");
        }
    });

    const loginUser = async (e) => {
        e.preventDefault();
        signIn("credentials", { ...data, redirect: false }).then((callback) => {
            if (callback?.error) {
                toast.error(callback.error);
            }

            if (callback?.ok && !callback?.error) {
                toast.success("Vous êtes maintenant connecté !");
            }
        });
    };

    return (
        <>
            <div className="user-form">
                <h1>S'identifier</h1>
                <form onSubmit={loginUser} className="form-wrapper">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) =>
                            setData({
                                ...data,
                                email: e.target.value,
                            })
                        }
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={data.password}
                        onChange={(e) =>
                            setData({
                                ...data,
                                password: e.target.value,
                            })
                        }
                        placeholder="Mot de passe"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button type="submit" className="form-submit">
                        S'identifier
                    </button>
                </form>
                <div className="form-link">
                    <span>Pas encore de compte ? Cliquez</span>
                    <Link href="/register"> ici </Link>
                    <span>pour un créer un</span>
                </div>
            </div>
        </>
    );
}
