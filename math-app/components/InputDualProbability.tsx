import Division from "./Division";
import { FC } from "react";

export interface InputDualProbabilityProps {
	letter?: string;
	separator: string;
	A1: number;
	A2: number;
	B1: number;
	B2: number;
	onChange: (A1: number, A2: number, B1: number, B2: number) => void;
}

const InputDualProbability: FC<InputDualProbabilityProps> = ({
	letter = "P",
	separator,
	A1,
	A2,
	B1,
	B2,
	onChange,
}) => {
	const inputA = (
		<Division
			high={
				<input
					className="probability__A"
					placeholder="A1"
					type="number"
					value={A1 || ""}
					onChange={(e) => onChange(e.target.valueAsNumber, A2, B1, B2)}
				/>
			}
			low={
				<input
					className="probability__A"
					placeholder="A2"
					type="number"
					value={A2 || ""}
					onChange={(e) => onChange(A1, e.target.valueAsNumber, B1, B2)}
				/>
			}
		/>
	);
	const inputB = (
		<Division
			high={
				<input
					className="probability__B"
					placeholder="B1"
					type="number"
					value={B1 || ""}
					onChange={(e) => onChange(A1, A2, e.target.valueAsNumber, B2)}
				/>
			}
			low={
				<input
					className="probability__B"
					placeholder="B2"
					type="number"
					value={B2 || ""}
					onChange={(e) => onChange(A1, A2, B1, e.target.valueAsNumber)}
				/>
			}
		/>
	);
	return (
		<div className="probability probability--dual">
			{letter}({inputA}
			{separator}
			{inputB})
		</div>
	);
};

export default InputDualProbability;
