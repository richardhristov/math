import Division from "./Division";
import { FC } from "react";

export interface InputDualProbabilityProps {
	separator: string;
	A: number;
	B: number;
	onChange: (A: number, B: number) => void;
}

const InputDualProbability: FC<InputDualProbabilityProps> = ({
	separator,
	A,
	B,
	onChange,
}) => {
	const inputA = (
		<Division
			high={1}
			low={
				<input
					className="probability__A"
					placeholder="A"
					type="number"
					value={A || ""}
					onChange={(e) => onChange(e.target.valueAsNumber, B)}
				/>
			}
		/>
	);
	const inputB = (
		<Division
			high={1}
			low={
				<input
					className="probability__B"
					placeholder="B"
					type="number"
					value={B || ""}
					onChange={(e) => onChange(A, e.target.valueAsNumber)}
				/>
			}
		/>
	);
	return (
		<div className="probability probability--dual">
			P({inputA}
			{separator}
			{inputB})
		</div>
	);
};

export default InputDualProbability;
