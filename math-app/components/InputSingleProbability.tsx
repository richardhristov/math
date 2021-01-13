import Division from "./Division";
import { FC } from "react";

export interface InputSingleProbabilityProps {
	letter?: string;
	A1: number;
	A2: number;
	onChange: (A1: number, A2: number) => void;
	placeholderA1?: string;
	placeholderA2?: string;
	prefix?: string;
}

const InputSingleProbability: FC<InputSingleProbabilityProps> = ({
	letter = "P",
	A1,
	A2,
	onChange,
	placeholderA1 = "A1",
	placeholderA2 = "A2",
	prefix,
}) => {
	const inputA = (
		<Division
			high={
				<input
					className="probability__A"
					placeholder={placeholderA1}
					type="number"
					value={A1 || ""}
					onChange={(e) => onChange(e.target.valueAsNumber, A2)}
				/>
			}
			low={
				<input
					className="probability__A"
					placeholder={placeholderA2}
					type="number"
					value={A2 || ""}
					onChange={(e) => onChange(A1, e.target.valueAsNumber)}
				/>
			}
		/>
	);
	return (
		<div className="probability probability--dual">
			{letter}({prefix || ""}
			{inputA})
		</div>
	);
};

export default InputSingleProbability;
