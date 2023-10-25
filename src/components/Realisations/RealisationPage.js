"use client";
import { useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import { useRouter } from "next/navigation";

const RealisationPage = ({ rea }) => {
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const { id, title, description } = rea;
    const router = useRouter();

    const handleDelete = (id) => {
        axios
            .delete(`/api/realisations/${id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setOpenModalDelete(false);
                router.refresh();
                router.push("/realisations");
            });
    };
    return (
        <section className="realisation">
            <h1>{title}</h1>
            <p>{description}</p>
            <button onClick={() => setOpenModalDelete(true)}>Supprimer</button>
            <Modal
                open={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
                title={`Voulez-vous vraiment supprimer la réalisation ${title} ?`}
            >
                <button
                    className="form-submit"
                    onClick={() => handleDelete(rea.id)}
                >
                    Supprimer
                </button>
            </Modal>
        </section>
    );
};

export default RealisationPage;
