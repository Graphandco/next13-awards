import { useState } from "react";
import Head from "next/head";

export default function UploadImage({ setImageURL }) {
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();

    /**
     * handleOnChange
     * @description Triggers when the file input changes (ex: when a file is selected)
     */

    function handleOnChange(changeEvent) {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setUploadData(undefined);
        };

        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    /**
     * handleOnSubmit
     * @description Triggers when the main form is submitted
     */

    async function handleOnSubmitUpload(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const fileInput = Array.from(form.elements).find(
            ({ name }) => name === "file"
        );

        const formData = new FormData();

        for (const file of fileInput.files) {
            formData.append("file", file);
        }

        formData.append("upload_preset", "jaqkyp3x");

        const data = await fetch(
            "https://api.cloudinary.com/v1_1/dmqvhw2lu/upload",
            {
                method: "POST",
                body: formData,
            }
        ).then((r) => r.json());

        setImageSrc(data.secure_url);
        setUploadData(data);
        setImageURL(data.secure_url);
    }

    return (
        <div className="upload-form">
            <Head>
                <title>Image Uploader</title>
                <meta
                    name="description"
                    content="Upload your image to Cloudinary!"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <form
                className=""
                method="post"
                onChange={handleOnChange}
                onSubmit={handleOnSubmitUpload}
            >
                <p>
                    <input type="file" name="file" />
                </p>

                <img src={imageSrc} />

                {imageSrc && !uploadData && (
                    <p>
                        <input type="submit" value="Envoyer le formulaire" />
                        {/* <button >Envoyer</button> */}
                    </p>
                )}

                {/* {uploadData && (
                    <code>
                        <pre>{JSON.stringify(uploadData, null, 2)}</pre>
                    </code>
                )} */}
            </form>
        </div>
    );
}
