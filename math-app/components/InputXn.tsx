import { FC } from "react";

export interface InputXnProps {
	letter?: string;
	n: number;
	onChange: (n: number) => void;
	placeholderN?: string;
}

const InputXn: FC<InputXnProps> = ({
	letter,
	n,
	onChange,
	placeholderN = "n",
}) => {
	return (
		<div className="xnr">
			<div className="xnr__letter">{letter}</div>
			<div className="xnr__inputs">
				<div></div>
				<input
					className="xnr__n"
					placeholder={placeholderN}
					type="number"
					value={typeof n === "number" ? n : ""}
					onChange={(e) => onChange(e.target.valueAsNumber)}
				/>
			</div>
		</div>
	);
};

export default InputXn;
