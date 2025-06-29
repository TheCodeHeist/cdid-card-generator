import type { FormsData } from "../../App";

interface CardBlurryI {
    formData: FormsData;
    top: number;
    left: number;
}

const CardBlurry = ({ formData, top, left }: CardBlurryI) => {
    return (
        <div
            style={{
                width: 1280,
                height: 795,
                backgroundImage: `url(${formData.image})`,
                backgroundSize: `${formData.bgSize}%`,
                backgroundPosition: `${formData.bgX}% ${formData.bgY}%`,
                position: "absolute",
                top: top,
                left: left,
                filter: "blur(var(--blur))",
                backgroundRepeat: "no-repeat"
            }}
        />
    )
}

export default CardBlurry;