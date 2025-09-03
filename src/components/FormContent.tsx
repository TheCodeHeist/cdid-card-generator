import {
  FileInput,
  NumberInput,
  Slider,
  TextInput,
  Select,
  Grid,
  Divider,
  Stack,
  InputLabel,
  Button,
} from "@mantine/core";
import type { FormsData } from "../App";
import { useMediaQuery } from "@mantine/hooks";

interface FormContentI {
  formData: FormsData;
  handleImageChange: (file: File | null) => void;
  handleLogoChange: (file: File | null) => void;
  updateField: <K extends keyof FormsData>(key: K, value: FormsData[K]) => void;
  fitImageToCard: () => void;
  exporting: boolean;
}

const FormContent = ({
  formData,
  handleImageChange,
  handleLogoChange,
  updateField,
  fitImageToCard,
  exporting,
}: FormContentI) => {
  const isMobile = useMediaQuery("(min-width: 700px)");
  const fitImageButtonText = isMobile ? "Fit Image to Card" : "Fit Image";

  return (
    <>
      <Divider label="Images" labelPosition="center" />
      <Grid>
        <Grid.Col span={6}>
          <FileInput
            label="Background Image"
            accept="image/*"
            value={formData.imageFile}
            onChange={handleImageChange}
            placeholder="Choose image"
            clearable={true}
            disabled={exporting}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <FileInput
            label="Logo"
            accept="image/*"
            value={formData.logoFile}
            onChange={handleLogoChange}
            placeholder="Choose logo"
            clearable={true}
            disabled={exporting}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={4}>
          <InputLabel>Background Size (%)</InputLabel>
          <Stack gap="xs">
            <Slider
              value={formData.bgSize}
              onChange={(val) => updateField("bgSize", val)}
              min={10}
              max={200}
              style={{ flex: 1 }}
              disabled={exporting}
            />
            <NumberInput
              value={formData.bgSize}
              onChange={(val) => updateField("bgSize", Number(val) ?? 100)}
              min={10}
              max={200}
              disabled={exporting}
            />
          </Stack>
        </Grid.Col>

        <Grid.Col span={4}>
          <InputLabel>Background X (%)</InputLabel>
          <Stack gap="xs">
            <Slider
              value={formData.bgX}
              onChange={(val) => updateField("bgX", val)}
              min={0}
              max={100}
              style={{ flex: 1 }}
              disabled={exporting}
            />
            <NumberInput
              value={formData.bgX}
              onChange={(val) => updateField("bgX", Number(val) ?? 50)}
              min={0}
              max={100}
              disabled={exporting}
            />
          </Stack>
        </Grid.Col>

        <Grid.Col span={4}>
          <InputLabel>Background Y (%)</InputLabel>
          <Stack gap="xs">
            <Slider
              value={formData.bgY}
              onChange={(val) => updateField("bgY", val)}
              min={0}
              max={100}
              style={{ flex: 1 }}
              disabled={exporting}
            />
            <NumberInput
              value={formData.bgY}
              onChange={(val) => updateField("bgY", Number(val) ?? 50)}
              min={0}
              max={100}
              disabled={exporting}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Button onClick={fitImageToCard} fullWidth disabled={exporting}>
            {fitImageButtonText}
          </Button>
        </Grid.Col>
      </Grid>

      <Divider label="Car Info" labelPosition="center" mt={"1rem"} />

      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Manufacturer"
            value={formData.manufacturer}
            disabled={exporting}
            onChange={(e) => updateField("manufacturer", e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Model"
            value={formData.model}
            disabled={exporting}
            onChange={(e) => updateField("model", e.currentTarget.value)}
          />
        </Grid.Col>
        {/* <Grid.Col span={4}>
					<NumberInput
						label="RQ"
						value={formData.rq}
						disabled={exporting}
						onChange={(val) => updateField("rq", val ?? "")}
					/>
				</Grid.Col> */}
        <Grid.Col span={6}>
          <NumberInput
            label="Year"
            value={formData.year}
            disabled={exporting}
            onChange={(val) => updateField("year", val ?? "")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Country code"
            value={formData.country}
            maxLength={2}
            disabled={exporting}
            onChange={(e) =>
              updateField("country", e.currentTarget.value.toUpperCase())
            }
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={4}>
          <NumberInput
            label="Power"
            value={formData.power}
            disabled={exporting}
            onChange={(val) => updateField("power", val ?? "")}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            label="Handling"
            value={formData.handling}
            disabled={exporting}
            onChange={(val) => updateField("handling", val ?? "")}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            label="Durability"
            value={formData.durability}
            disabled={exporting}
            onChange={(val) => updateField("durability", val ?? "")}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={3}>
          <Select
            label="Specialized"
            data={["No", "Yes"]}
            value={formData.fuses}
            disabled={exporting}
            onChange={(val) => updateField("fuses", val ?? "")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Tyres"
            data={["Street", "Drag", "Slick", "Off road", "Rally"]}
            value={formData.tyres}
            disabled={exporting}
            onChange={(val) => updateField("tyres", val ?? "Performance")}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Select
            label="Drivetrain"
            data={["RWD", "FWD", "4WD"]}
            value={formData.drivetrain}
            disabled={exporting}
            onChange={(val) => updateField("drivetrain", val ?? "RWD")}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default FormContent;
