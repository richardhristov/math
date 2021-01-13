import Division from "./Division";
import Equals from "./Equals";
import { FC } from "react";
import { fractionSimplify } from "../helpers/math";

export interface DivisionSimpliferProps {
	high: number;
	low: number;
}

const DivisionSimplifier: FC<DivisionSimpliferProps> = ({ high, low }) => {
	const [highSimplified, lowSimplified] = fractionSimplify(high, low);

	let equals = null;
	if (highSimplified !== high && lowSimplified !== low) {
		equals = (
			<>
				<Equals />
				{lowSimplified !== 1 ? (
					<Division high={highSimplified} low={lowSimplified} />
				) : (
					<div className="division">{highSimplified}</div>
				)}
			</>
		);
	}
	return (
		<>
			{low !== 1 ? (
				<Division high={high} low={low} />
			) : (
				<div className="division">{high}</div>
			)}
			{equals}
		</>
	);
};

export default DivisionSimplifier;
