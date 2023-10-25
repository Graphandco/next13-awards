"use client";
import React, { useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import UploadImage from "./UploadImage";

const AddRealisation = () => {
    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");

    const router = useRouter();

    function convertToSlugUsingRegex(title) {
        // Replace non-alphanumeric characters with dashes
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        // Remove leading and trailing dashes
        return slug.replace(/^-+|-+$/g, "");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const generatedSlug = convertToSlugUsingRegex(title);

        console.log(title, description, generatedSlug);
        axios
            .post("/api/realisations", {
                title,
                description,
                slug: generatedSlug,
                imageURL,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setTitle("");
                setDescription("");
                setOpenModal(false);
                router.refresh();
            });
    };
    // const handleChange = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setinputs((prevState) => ({ ...prevState, [name]: value }));
    // };
    return (
        <>
            <button onClick={() => setOpenModal(true)} className="modalButton">
                Ajouter une réalisation
            </button>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Ajouter une réalisation"
            >
                <div>
                    <div className="form-wrapper">
                        <input
                            type="text"
                            placeholder="Titre"
                            name="title"
                            value={title || ""}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {/* <input
                            type="text"
                            placeholder="Slug"
                            name="slug"
                            value={inputs.slug || ""}
                            onChange={handleChange}
                        /> */}
                        <input
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={description || ""}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <UploadImage setImageURL={setImageURL} />
                        <button onClick={handleSubmit} className="form-submit">
                            Ajouter
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default AddRealisation;
