import { useEffect, useState } from "react";
import type { FormsData } from "../../App";
import { getBlurredImageDataUrl } from "../../utils/utils";

interface CardBlurryI {
    formData: FormsData;
    top: number;
    left: number;
}

const BLUR = 60;

const CardBlurry = ({ formData, top, left }: CardBlurryI) => {
    const [blurredBg, setBlurredBg] = useState<string | null>(null);

    // dom-to-image-more doesn't support css blur, so create blurred image
    useEffect(() => {
        if (formData.image)
            getBlurredImageDataUrl(formData.image, BLUR)
            .then(setBlurredBg)
            .catch(console.error);
    }, [formData.image]);

    if (!blurredBg) return null;

    return (
        <div
            style={{
                width: 1280,
                height: 795,
                backgroundImage: `url(${blurredBg})`,
                backgroundSize: `${formData.bgSize}%`,
                backgroundPosition: `${formData.bgX}% ${formData.bgY}%`,
                position: "absolute",
                top: top,
                left: left,
                backgroundRepeat: "no-repeat"
            }}
        />
    )
}

export default CardBlurry;