import { FC } from "react";

export interface InputXnrProps {
	letter: string;
	n: number;
	r: number;
	onChange: (n: number, r: number) => void;
}

const InputXnr: FC<InputXnrProps> = ({ letter, n, r, onChange }) => {
	return (
		<div className="xnr">
			<div className="xnr__letter">{letter}</div>
			<div className="xnr__inputs">
				<input
					className="xnr__r"
					placeholder="r"
					type="number"
					value={r || ""}
					onChange={(e) => onChange(n, e.target.valueAsNumber)}
				/>
				<input
					className="xnr__n"
					placeholder="n"
					type="number"
					value={n || ""}
					onChange={(e) => onChange(e.target.valueAsNumber, r)}
				/>
			</div>
		</div>
	);
};

export default InputXnr;
