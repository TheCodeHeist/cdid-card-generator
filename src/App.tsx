import { useEffect, useRef, useState } from "react";
import Card from "./components/card/Card";
import Export from "./components/Export";
import { Anchor, Box, Group, Stack, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import FormContent from "./components/FormContent";
import { IconBrandGithub } from "@tabler/icons-react";
import "./fonts.css";
import "./App.css";
import { getFitImageToCardPercentage } from "./utils/utils";

export const CARD_WIDTH = 1280;
export const CARD_HEIGHT = 795;

export type FormsData = {
  image: string | null;
  imageFile: File | null;
  imageDimension: { width: number; height: number } | null;
  logo: string | null;
  logoFile: File | null;
  bgSize: number;
  bgX: number;
  bgY: number;
  manufacturer: string;
  model: string;
  year: number | string;
  country: string;
  power: number | string;
  durability: number | string;
  handling: number | string;
  drivetrain: string;
  // rq: number | string;
  tyres: string;
  fuses: string;
};

const defaultFormData: FormsData = {
  image: null,
  imageFile: null,
  imageDimension: null,
  logo: null,
  logoFile: null,
  bgSize: 100,
  bgX: 50,
  bgY: 50,
  manufacturer: "",
  model: "",
  year: "2010",
  country: "GB",
  power: "99",
  durability: "99",
  handling: "99",
  drivetrain: "RWD",
  // rq: "99",
  tyres: "Street",
  fuses: "No",
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
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [isLargeScreen]);

  const updateField = <K extends keyof FormsData>(
    key: K,
    value: FormsData[K]
  ) => {
    if (exporting) return;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (file: File | null) => {
    if (exporting) return;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageSrc = reader.result as string;

        // Load image to get its dimensions
        const img = new Image();
        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;

          const percentage = getFitImageToCardPercentage(width, height);
          setFormData((prev) => ({
            ...prev,
            image: imageSrc,
            imageFile: file,
            imageDimension: { width: width, height: height },
            bgSize: percentage,
            bgX: 50,
            bgY: 50,
          }));
        };
        img.src = imageSrc;
      };
      reader.readAsDataURL(file);
    } else {
      updateField("image", null);
      updateField("imageFile", null);
      updateField("imageDimension", null);
    }
  };

  const handleLogoChange = (file: File | null) => {
    if (exporting) return;
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        updateField("logo", reader.result as string);
        updateField("logoFile", file);
      };
      reader.readAsDataURL(file);
    } else {
      updateField("logo", null);
      updateField("logoFile", null);
    }
  };

  const fitImageToCard = () => {
    if (!formData.imageDimension) return;
    const { width, height } = formData.imageDimension;

    const percentage = getFitImageToCardPercentage(width, height);

    setFormData((prev) => ({
      ...prev,
      bgSize: percentage,
      bgX: 50,
      bgY: 50,
    }));
  };

  return (
    <Stack align="center" gap="md" className="content">
      <Title order={1} ta="center">
        CDID Fantasy Card Generator
      </Title>
      <Group align="center">
        <Anchor
          href="https://github.com/turb0b00st3d/cdid-card-generator"
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
            fitImageToCard={fitImageToCard}
          />
        </Box>
      </Group>
      <Export
        exporting={exporting}
        setExporting={setExporting}
        formData={formData}
      />
    </Stack>
  );
};

export default App;
