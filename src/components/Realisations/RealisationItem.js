import Link from "next/link";

const RealisationItem = ({ realisation }) => {
    const { title, slug, description, imageURL } = realisation;
    return (
        <Link href={`/realisations/${slug}`}>
            <div className="rea-card">
                <div className="rea-title">{title}</div>
                <div className="rea-desc">{description}</div>
                {/* {imageURL && <img src={imageURL} alt={title} />} */}
            </div>
        </Link>
    );
};

export default RealisationItem;
