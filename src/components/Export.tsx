import { Button, Select, SimpleGrid, Stack } from "@mantine/core";
// @ts-ignore
import { toJpeg, toPng } from "dom-to-image-more";
import { useRef, useState } from "react";
import Card from "./card/Card";
import { CARD_HEIGHT, CARD_WIDTH, type FormsData } from "../App";

const resolutionOptions = [
	{ value: "0.5", label: "640 × 398" },
	{ value: "1", label: "1280 × 795" },
	{ value: "2", label: "2560 × 1590" },
	{ value: "3", label: "3840 × 2385" },
	{ value: "4", label: "5120 × 3180" },
];

const imageTypeOptions = [
	{ value: "png", label: "PNG" },
	{ value: "jpg", label: "JPG" },
];

interface ExportI {
	exporting: boolean;
    setExporting: React.Dispatch<React.SetStateAction<boolean>>;
	formData: FormsData;
}

const Export = ({ exporting, setExporting, formData }: ExportI) => {
	const [scaleMultiplier, setScaleMultiplier] = useState("1");
	const [imageType, setImageType] = useState("png");
	const [times, setTimes] = useState(0);
	const ref = useRef(null);

	const startExport = async () => {
		if (exporting) return;

		setExporting(true);

		if (ref.current == null) {
			if (times == 3) {
				setTimes(0);
				setExporting(false);
				console.error("Failed to download: tried too many times")
				alert("Error downloading image. Please try again with a smaller image resolution, or switch to Chrome or Firefox.");
				return;
			}
			setTimes((prev) => prev+1);
			setTimeout(() => { startExport() }, 2000);
			return;
		}

		try {
			const scale = Number(scaleMultiplier);
			const width = CARD_WIDTH * scale;
			const height = CARD_HEIGHT * scale;

			const dataUrl = imageType == "png" ? await toPng(ref.current, { width: width, height: height }) : await toJpeg(ref.current, { width: width, height: height, quality: 90 });
			const link = document.createElement("a");
			link.download = `custom-card.${imageType}`;
			link.href = dataUrl;
			link.click();
			setExporting(false);
			setTimes(0);
		}
		catch (err: any) {
			setExporting(false);
			setTimes(0);
			console.error("Failed to download:", err);
			alert(`Error downloading image. Please try again with a smaller image resolution, or switch to Chrome or Firefox.\n\nError message:\n${err.message}\n\nStack trace:\n${err.stack}`);
		}
	}

	const buttonText = exporting ? "Please wait..." : `Download as ${imageType.toUpperCase()}`

	return (
		<>
        <Stack mt="md">
			<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
			<Select
				label="Resolution"
				value={scaleMultiplier}
				onChange={(val) => setScaleMultiplier(val ?? "1")}
				data={resolutionOptions}
				disabled={exporting}
			/>
			<Select
				label="Image Type"
				value={imageType}
				onChange={(val) => setImageType(val ?? "png")}
				data={imageTypeOptions}
				disabled={exporting}
			/>
			</SimpleGrid>
			<Button onClick={startExport} disabled={exporting}>
				{buttonText}
			</Button>
		</Stack>
		<div
			style={{
				height:0,
				overflow:"hidden"
			}}
		>
			{ exporting && (
				<Card formData={formData} cardRef={ref} scale={Number(scaleMultiplier)} exporting={true} />
			)}
		</div>
		</>
	)
}
export default Export;