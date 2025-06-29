import { FileInput, NumberInput, Slider, TextInput, Select, Grid, Divider, Stack, InputLabel } from "@mantine/core";
import type { FormsData } from "../App";

interface FormContentI {
    formData: FormsData;
    handleImageChange: (file: File | null) => void;
    handleLogoChange: (file: File | null) => void;
    updateField: <K extends keyof FormsData>(key: K, value: FormsData[K]) => void;
	exporting: boolean;
}

const FormContent = ({ formData, handleImageChange, handleLogoChange, updateField, exporting }: FormContentI) => {
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
			</Grid>

			<Divider label="Car Info" labelPosition="center" mt={"1rem"} />

			<Grid>
				<Grid.Col span={6}>
					<TextInput
						label="Manufacturer"
						value={formData.manufacturer}
						disabled={exporting}
						onChange={(e) =>
							updateField("manufacturer", e.currentTarget.value)
						}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<TextInput
						label="Model"
						value={formData.model}
						disabled={exporting}
						onChange={(e) =>
							updateField("model", e.currentTarget.value)
						}
					/>
				</Grid.Col>
				<Grid.Col span={4}>
					<NumberInput
						label="RQ"
						value={formData.rq}
						disabled={exporting}
						onChange={(val) => updateField("rq", val ?? "")}
					/>
				</Grid.Col>
				<Grid.Col span={4}>
					<NumberInput
						label="Year"
						value={formData.year}
						disabled={exporting}
						onChange={(val) =>
							updateField("year", val ?? "")
						}
					/>
				</Grid.Col>
				<Grid.Col span={4}>
					<TextInput
						label="Country code"
						value={formData.country}
						maxLength={2}
						disabled={exporting}
						onChange={(e) =>
							updateField(
								"country",
								e.currentTarget.value.toUpperCase()
							)
						}
					/>
				</Grid.Col>
			</Grid>

			<Grid>
				<Grid.Col span={4}>
					<NumberInput
						label="Top Speed"
						value={formData.topSpeed}
						disabled={exporting}
						onChange={(val) =>
							updateField("topSpeed", val ?? "")
						}
					/>
				</Grid.Col>
				<Grid.Col span={4}>
					<NumberInput
						label="0–60 MPH"
						value={formData.zeroToSixty}
						step={0.1}
						disabled={exporting}
						onChange={(val) =>
							updateField("zeroToSixty", val ?? "")
						}
					/>
				</Grid.Col>
				<Grid.Col span={4}>
					<NumberInput
						label="Handling"
						value={formData.handling}
						disabled={exporting}
						onChange={(val) =>
							updateField("handling", val ?? "")
						}
					/>
				</Grid.Col>
			</Grid>

			<Grid>
				<Grid.Col span={3}>
					<Select
						label="Stars"
						data={["0", "1", "2", "3"]}
						value={formData.fuses}
						disabled={exporting}
						onChange={(val) =>
							updateField("fuses", val ?? "")
						}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<Select
						label="Tyres"
						data={[
							"Performance",
							"Slick",
							"Standard",
							"Off road",
							"All surface",
						]}
						value={formData.tyres}
						disabled={exporting}
						onChange={(val) =>
							updateField("tyres", val ?? "Performance")
						}
					/>
				</Grid.Col>
				<Grid.Col span={3}>
					<Select
						label="Drivetrain"
						data={["RWD", "FWD", "4WD"]}
						value={formData.drivetrain}
						disabled={exporting}
						onChange={(val) =>
							updateField("drivetrain", val ?? "RWD")
						}
					/>
				</Grid.Col>
			</Grid>
        </>
    )
}

export default FormContent;