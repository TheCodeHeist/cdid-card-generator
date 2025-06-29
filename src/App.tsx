import { useEffect, useRef, useState } from "react";
import Card from "./components/card/Card";
import Export from "./components/Export";
import { Anchor, Box, Group, Stack, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import FormContent from "./components/FormContent";
import { IconBrandGithub } from '@tabler/icons-react';

import "./App.css";

export const CARD_WIDTH = 1280;
export const CARD_HEIGHT = 795;

export type FormsData = {
	image: string | null;
	imageFile: File | null;
	logo: string | null;
	logoFile: File | null;
	bgSize: number;
	bgX: number;
	bgY: number;
	manufacturer: string;
	model: string;
	year: number | string;
	country: string;
	topSpeed: number | string;
	zeroToSixty: number | string;
	handling: number | string;
	drivetrain: string;
	rq: number | string;
	tyres: string;
	fuses: string;
};

const defaultFormData: FormsData = {
	image: null,
	imageFile: null,
	logo: null,
	logoFile: null,
	bgSize: 100,
	bgX: 50,
	bgY: 50,
	manufacturer: "",
	model: "",
	year: "2010",
	country: "GB",
	topSpeed: "99",
	zeroToSixty: "1.5",
	handling: "99",
	drivetrain: "RWD",
	rq: "99",
	tyres: "Performance",
	fuses: "0",
};

const App = () => {
	const [formData, setFormData] = useState<FormsData>(defaultFormData);
	const [scale, setScale] = useState(1);
	const [exporting, setExporting] = useState(false);

	const cardRef = useRef<HTMLDivElement | null>(null);
	const formRef = useRef<HTMLDivElement | null>(null);
	const isLargeScreen = useMediaQuery("(min-width: 1300px)");

	useEffect(() => {
		const updateScale = () => {
			const widthScale = (window.innerWidth - 48) / CARD_WIDTH;
			const heightScale = formRef.current
				? formRef.current.offsetHeight / CARD_HEIGHT
				: 1;
			const scale = isLargeScreen
				? Math.min(0.6, heightScale)
				: Math.min(0.4, widthScale);
			setScale(scale);
		}

		updateScale();
		window.addEventListener("resize", updateScale);
		return () => window.removeEventListener("resize", updateScale);
	}, [isLargeScreen]);

	const updateField = <K extends keyof FormsData>(key: K, value: FormsData[K]) => {
		if (exporting) return;
		setFormData(prev => ({ ...prev, [key]: value }));
	}

	const handleImageChange = (file: File | null) => {
		if (exporting) return;
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				updateField('image', reader.result as string);
				updateField('imageFile', file);
			}
			reader.readAsDataURL(file)
		}
		else {
			updateField('image', null);
			updateField('imageFile', null);
		}
	}

	const handleLogoChange = (file: File | null) => {
		if (exporting) return;
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = () => {
				updateField('logo', reader.result as string);
				updateField('logoFile', file);
			};
			reader.readAsDataURL(file);
		} else {
			updateField('logo', null);
			updateField('logoFile', null);
		}
	}

	return (
		<Stack align="center" gap="md" className="content">
			<Title
			order={1}
			ta="center"
			>
				Top Drives Card Generator
			</Title>
			<Group align="center">
                <Anchor
                    href="https://github.com/Jokairo/top-drives-card-generator"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                >
                    <IconBrandGithub size={18} color="white" />
                </Anchor>
            </Group>
			<Group
				align={isLargeScreen ? "center" : undefined}
				justify={"center"}
				wrap={isLargeScreen ? "nowrap" : undefined}
				p={isLargeScreen ? "md" : "sm"}
			>
				<Card formData={formData} cardRef={cardRef} scale={scale} />
				<Box ref={formRef}>
					<FormContent
						formData={formData}
						handleImageChange={handleImageChange}
						handleLogoChange={handleLogoChange}
						updateField={updateField}
						exporting={exporting}
					/>
				</Box>
			</Group>
			<Export exporting={exporting} setExporting={setExporting} formData={formData} />
		</Stack>
	)
}

export default App;
