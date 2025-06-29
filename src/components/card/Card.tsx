import { CARD_HEIGHT, CARD_WIDTH, type FormsData } from "../../App";
import CardContent from "./CardContent";
import CardTop from "./CardTop";
import "./Card.css";

interface CardI {
    formData: FormsData;
    cardRef?: React.MutableRefObject<HTMLDivElement | null>;
    scale: number;
    exporting?: boolean;
}

const Card = ({ formData, cardRef, scale, exporting }: CardI) => {
    const scaledWidth = CARD_WIDTH * scale;
    const scaledHeight = CARD_HEIGHT * scale;

    return (
        <div className="card-container" ref={cardRef} style={{ width: scaledWidth, height: scaledHeight, transform: `scale(${scale})` }}>
            <div
                className="card"
                style={{
                    width: CARD_WIDTH,
					height: CARD_HEIGHT,
                    backgroundImage: formData.image ? `url(${formData.image})` : undefined,
                    backgroundColor: formData.image ? undefined : "white",
                    backgroundSize: `${formData.bgSize}%`,
					backgroundPosition: `${formData.bgX}% ${formData.bgY}%`
                }}
            >
				<CardTop formData={formData} exporting={Boolean(exporting)} />
				<CardContent formData={formData} exporting={Boolean(exporting)} />
			</div>
        </div>
    )
}
export default Card;