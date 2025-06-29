import { Button, Select, SimpleGrid, Stack } from "@mantine/core";
import { toJpeg, toPng } from "html-to-image";
import { useEffect, useRef, useState } from "react";
import Card from "./card/Card";
import type { FormsData } from "../App";

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

	useEffect(() => {
		const handleExport = async () => {
			if (ref.current == null) {
				if (times == 3) {
					console.error("Failed to export: tried too many times")
					alert("Error exporting image");
					setTimes(0);
					return;
				}
				setTimes((prev) => prev+1);
				setTimeout(() => { handleExport() }, 2000);
				return;
			}

			try {
				const dataUrl = imageType == "png" ? await toPng(ref.current) : await toJpeg(ref.current, { quality: 90 });
				const link = document.createElement("a");
				link.download = `custom-card.${imageType}`;
				link.href = dataUrl;
				link.click();
				setExporting(false);
				setTimes(0);
			}
			catch (err) {
				console.error("Failed to export:", err);
				alert("Error exporting image");
				setExporting(false);
				setTimes(0);
			}
		};
		if (exporting)
			handleExport();

	}, [exporting, times])

	const startExport = () => {
		setExporting(true);
	}

	return (
		<>
        <Stack mt="md">
			<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
			<Select
				label="Resolution"
				value={scaleMultiplier}
				onChange={(val) => setScaleMultiplier(val ?? "1")}
				data={resolutionOptions}
			/>
			<Select
				label="Image Type"
				value={imageType}
				onChange={(val) => setImageType(val ?? "png")}
				data={imageTypeOptions}
			/>
			</SimpleGrid>
			<Button onClick={startExport}>
				Export as {imageType.toUpperCase()}
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