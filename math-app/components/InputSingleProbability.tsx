import Division from "./Division";
import { FC } from "react";

export interface InputSingleProbabilityProps {
	letter?: string;
	A1: number;
	A2: number;
	onChange: (A1: number, A2: number) => void;
}

const InputSingleProbability: FC<InputSingleProbabilityProps> = ({
	letter = "P",
	A1,
	A2,
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
					onChange={(e) => onChange(e.target.valueAsNumber, A2)}
				/>
			}
			low={
				<input
					className="probability__A"
					placeholder="A2"
					type="number"
					value={A2 || ""}
					onChange={(e) => onChange(A1, e.target.valueAsNumber)}
				/>
			}
		/>
	);
	return (
		<div className="probability probability--dual">
			{letter}({inputA})
		</div>
	);
};

export default InputSingleProbability;
