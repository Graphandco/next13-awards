import AddRealisation from "@/components/Realisations/AddRealisation";
import RealisationPage from "@/components/Realisations/RealisationPage";
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

const Realisation = async ({ params }) => {
    const realisations = await getData();
    const slug = params.slug;
    const reaToShow = realisations.filter((rea) => rea.slug === slug);
    return (
        <div>
            <h1>Réalisation</h1>
            {reaToShow.length ? (
                reaToShow.map((rea) => <RealisationPage rea={rea} />)
            ) : (
                <div>No content</div>
            )}
        </div>
    );
};

export default Realisation;
