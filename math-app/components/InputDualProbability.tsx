import Division from "./Division";
import { FC } from "react";

export interface InputDualProbabilityProps {
	letter?: string | JSX.Element;
	separator: string;
	A1: number;
	A2: number;
	B1: number;
	B2: number;
	onChange: (A1: number, A2: number, B1: number, B2: number) => void;
	placeholderA1?: string;
	placeholderA2?: string;
	placeholderB1?: string;
	placeholderB2?: string;
}

const InputDualProbability: FC<InputDualProbabilityProps> = ({
	letter = "P",
	separator,
	A1,
	A2,
	B1,
	B2,
	onChange,
	placeholderA1 = "A1",
	placeholderA2 = "A2",
	placeholderB1 = "B1",
	placeholderB2 = "B2",
}) => {
	const inputA = (
		<Division
			high={
				<input
					className="probability__A"
					placeholder={placeholderA1}
					type="number"
					value={A1 || ""}
					onChange={(e) => onChange(e.target.valueAsNumber, A2, B1, B2)}
				/>
			}
			low={
				<input
					className="probability__A"
					placeholder={placeholderA2}
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
					placeholder={placeholderB1}
					type="number"
					value={B1 || ""}
					onChange={(e) => onChange(A1, A2, e.target.valueAsNumber, B2)}
				/>
			}
			low={
				<input
					className="probability__B"
					placeholder={placeholderB2}
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
