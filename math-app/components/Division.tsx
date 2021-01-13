import { FC } from "react";

export interface DivisionProps {
	high: string | Number | JSX.Element;
	low: string | Number | JSX.Element;
}

const Division: FC<DivisionProps> = ({ high, low }) => {
	return (
		<div className="division">
			<div className="division__high">{high}</div>
			<div className="division__low">{low}</div>
		</div>
	);
};

export default Division;
