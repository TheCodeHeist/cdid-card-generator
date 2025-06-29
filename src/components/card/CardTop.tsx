import type { FormsData } from "../../App";
import { valueToNumber } from "../../utils/utils";
import CardBlurry from "./CardBlurry";
import "./CardTop.css";

interface CardTopI {
    formData: FormsData;
    exporting: boolean;
}

const CardTop = ({ formData, exporting }: CardTopI) => {
    const manufacturer = formData.manufacturer;
    const model = formData.model;
    const year = valueToNumber(formData.year);
    const country = formData.country;
    const logo = formData.logo;

    return (
        <div className={exporting ? "card-top render" : "card-top"}>
            { exporting && <CardBlurry formData={formData} top={0} left={0} /> }
            <div className="left">
                { logo && <img src={logo} width="80px" /> }
            </div>
            <div className="middle">
                <span className="manufacturer">
                    {manufacturer}
                </span>
                <span className="model">
                    {model}
                </span>
            </div>
            <div className="right">
                <div className="year-bg" />
                <div className="country-bg" />
                <div className="year-text">
                    {year}
                </div>
                <div className="country-text">
                    {country}
                </div>
            </div>
        </div>
    )
}
export default CardTop;