import AddRealisation from "@/components/Realisations/AddRealisation";
import RealisationsList from "@/components/Realisations/RealisationsList";

async function getData() {
    const res = await fetch("http://localhost:3000/api/realisations", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Erreur lors de la récupération des réalisations");
    }
    return res.json();
}

const realisations = async () => {
    const realisations = await getData();

    return (
        <div>
            <h1>Réalisations</h1>
            <RealisationsList realisations={realisations} />
            <AddRealisation />
        </div>
    );
};

export default realisations;
