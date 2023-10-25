"use client";

import { useSession, signOut } from "next-auth/react";
import Rounded from "@/common/RoundedButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
    const router = useRouter();
    useEffect(() => {
        if (!session?.status === "authenticated") {
            router.push("/login");
        }
    });
    const { data: session } = useSession();

    return (
        <div className="connected">
            <h1>Tableau de bord</h1>
            <div>
                Connecté sous <strong>{session?.user?.name}</strong>
            </div>
            <div>
                Adresse email : <strong>{session?.user?.email}</strong>
            </div>
            <div className="logout">
                <Rounded onClick={() => signOut({ callbackUrl: "/" })}>
                    <span>Se déconnecter</span>
                </Rounded>
            </div>
        </div>
    );
};

export default Dashboard;
