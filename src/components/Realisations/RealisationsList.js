import React from "react";
import RealisationItem from "./RealisationItem";

const RealisationsList = ({ realisations }) => {
    return (
        <div>
            <h2>Liste des réalisations</h2>
            <div className="realisations-wrapper">
                {realisations.map((rea) => (
                    <RealisationItem key={rea.id} realisation={rea} />
                ))}
            </div>
        </div>
    );
};

export default RealisationsList;
