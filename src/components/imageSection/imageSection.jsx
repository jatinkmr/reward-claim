import { baseUrl } from "../../services";

const ImageSectionComponent = ({ imageUrl, headingText }) => {
    return (
        <div className="reward-section">
            <h1 className="congrats-text">{headingText}</h1>
            <img
                src={imageUrl?.includes('media.strapiapp.com') ? imageUrl : `${baseUrl}${imageUrl}`}
                alt="reward-image"
                className="reward-image"
            />
        </div>
    )
}

export default ImageSectionComponent;
