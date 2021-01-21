import { FC } from "react";

export interface InputXnrProps {
	letter?: string;
	n: number;
	r: number;
	onChange: (n: number, r: number) => void;
	placeholderN?: string;
	placeholderR?: string;
}

const InputXnr: FC<InputXnrProps> = ({
	letter,
	n,
	r,
	onChange,
	placeholderN = "n",
	placeholderR = "r",
}) => {
	return (
		<div className="xnr">
			<div className="xnr__letter">{letter}</div>
			<div className="xnr__inputs">
				<input
					className="xnr__r"
					placeholder={placeholderR}
					type="number"
					value={typeof r !== "number" ? "" : r}
					onChange={(e) => onChange(n, e.target.valueAsNumber)}
				/>
				<input
					className="xnr__n"
					placeholder={placeholderN}
					type="number"
					value={typeof n !== "number" ? "" : n}
					onChange={(e) => onChange(e.target.valueAsNumber, r)}
				/>
			</div>
		</div>
	);
};

export default InputXnr;
