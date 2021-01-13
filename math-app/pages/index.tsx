import {
	factorial,
	fractionAdd,
	fractionDivide,
	fractionMultiply,
} from "../helpers/math";

import BracketLeft from "../components/BracketLeft";
import BracketRight from "../components/BracketRight";
import Divide from "../components/Divide";
import Division from "../components/Division";
import DivisionSimplifier from "../components/DivisionSimplifier";
import Equals from "../components/Equals";
import Equation from "../components/Equation";
import Head from "next/head";
import InputDualProbability from "../components/InputDualProbability";
import InputSingleProbability from "../components/InputSingleProbability";
import InputXnr from "../components/InputXnr";
import Minus from "../components/Minus";
import Multiply from "../components/Multiply";
import Plus from "../components/Plus";
import { formulaReplace } from "../helpers/math";
import { useState } from "react";

const VTildenr = () => {
	const [n, setN] = useState(null);
	const [r, setR] = useState(null);
	const setNR = (n, r) => {
		setN(n);
		setR(r);
	};
	const formula = formulaReplace("n^r", { n, r });

	let equals = null;
	if (n !== null && r !== null) {
		const solved = Math.pow(n, r);
		equals = (
			<>
				<Equals />
				{solved}
			</>
		);
	}
	return (
		<Equation>
			<InputXnr letter="~V" n={n} r={r} onChange={setNR} />
			<Equals />
			{formula}
			{equals}
		</Equation>
	);
};

const Vnr = () => {
	const [n, setN] = useState(null);
	const [r, setR] = useState(null);
	const setNR = (n, r) => {
		setN(n);
		setR(r);
	};
	const high = formulaReplace("n!", { n });
	const low = formulaReplace("(n - r)!", { n, r });

	let equals = null;
	if (n !== null && r !== null) {
		const highSolved = factorial(n);
		const lowSolved = factorial(n - r);
		equals = (
			<>
				<Equals />
				<DivisionSimplifier high={highSolved} low={lowSolved} />
			</>
		);
	}
	return (
		<Equation>
			<InputXnr letter="&nbsp;V" n={n} r={r} onChange={setNR} />
			<Equals />
			<Division high={high} low={low} />
			{equals}
		</Equation>
	);
};

const Cnr = () => {
	const [n, setN] = useState(null);
	const [r, setR] = useState(null);
	const setNR = (n, r) => {
		setN(n);
		setR(r);
	};
	const high = formulaReplace("n!", { n });
	const low = formulaReplace("r!(n - r)!", { n, r });

	let equals = null;
	if (n !== null && r !== null) {
		const highSolved = factorial(n);
		const lowSolved = factorial(r) * factorial(n - r);
		equals = (
			<>
				<Equals />
				<DivisionSimplifier high={highSolved} low={lowSolved} />
			</>
		);
	}
	return (
		<Equation>
			<InputXnr letter="&nbsp;C" n={n} r={r} onChange={setNR} />
			<Equals />
			<Division high={high} low={low} />
			{equals}
		</Equation>
	);
};

const CTildenr = () => {
	const [n, setN] = useState(null);
	const [r, setR] = useState(null);
	const setNR = (n, r) => {
		setN(n);
		setR(r);
	};
	const high = formulaReplace("(n + r - 1)!", { n, r });
	const low = formulaReplace("r!(n - 1)!", { n, r });

	let equals = null;
	if (n !== null && r !== null) {
		const highSolved = factorial(n + r - 1);
		const lowSolved = factorial(r) * factorial(n - 1);
		equals = (
			<>
				<Equals />
				<DivisionSimplifier high={highSolved} low={lowSolved} />
			</>
		);
	}

	return (
		<Equation>
			<InputXnr letter="~C" n={n} r={r} onChange={setNR} />
			<Equals />
			<Division high={high} low={low} />
			{equals}
		</Equation>
	);
};

const ANot = () => {
	const [A1, setA1] = useState(null);
	const [A2, setA2] = useState(null);
	const setNR = (A1, A2) => {
		setA1(A1);
		setA2(A2);
	};
	const high = formulaReplace("A1", { A1 });
	const low = formulaReplace("A2", { A2 });

	let equals = null;
	if (A1 !== null && A2 !== null) {
		const [solvedHigh, solvedLow] = [A2 - A1, A2];
		equals = (
			<>
				<Equals />
				<DivisionSimplifier high={solvedHigh} low={solvedLow} />
			</>
		);
	}

	return (
		<Equation>
			<InputSingleProbability letter="!P" A1={A1} A2={A2} onChange={setNR} />
			<Equals />
			1
			<Minus />
			<Division high={high} low={low} />
			{equals}
		</Equation>
	);
};

const AOrB = ({ exclusive }) => {
	const [A1, setA1] = useState(1);
	const [A2, setA2] = useState(null);
	const [B1, setB1] = useState(1);
	const [B2, setB2] = useState(null);
	const setAB = (A1, A2, B1, B2) => {
		setA1(A1);
		setA2(A2);
		setB1(B1);
		setB2(B2);
	};
	const highA = formulaReplace("A1", { A1 });
	const lowA = formulaReplace("A2", { A2 });
	const highB = formulaReplace("B1", { B1 });
	const lowB = formulaReplace("B2", { B2 });

	let equals = null;
	if (A1 !== null && A2 !== null && B1 !== null && B2 !== null) {
		const [highSolved, lowSolved] = fractionAdd(A1, A2, B1, B2);
		equals = (
			<>
				<Equals />
				<DivisionSimplifier high={highSolved} low={lowSolved} />
			</>
		);
	}
	return (
		<Equation>
			<InputDualProbability
				letter="&nbsp;P"
				separator="OR"
				A1={A1}
				A2={A2}
				B1={B1}
				B2={B2}
				onChange={setAB}
			/>
			<Equals />
			<Division high={highA} low={lowA} />
			<Plus />
			<Division high={highB} low={lowB} />
			{equals}
			{!exclusive ? (
				<>
					<Minus />
					<>P(A AND B)</>
				</>
			) : null}
		</Equation>
	);
};

const AAndBIndependent = () => {
	const [A1, setA1] = useState(1);
	const [A2, setA2] = useState(null);
	const [B1, setB1] = useState(1);
	const [B2, setB2] = useState(null);
	const setAB = (A1, A2, B1, B2) => {
		setA1(A1);
		setA2(A2);
		setB1(B1);
		setB2(B2);
	};
	const highA = formulaReplace("A1", { A1 });
	const lowA = formulaReplace("A2", { A2 });
	const highB = formulaReplace("B1", { B1 });
	const lowB = formulaReplace("B2", { B2 });

	let equals = null;
	if (A1 !== null && A2 !== null && B1 !== null && B2 !== null) {
		const [highSolved, lowSolved] = fractionMultiply(A1, A2, B1, B2);
		equals = (
			<>
				<Equals />
				<DivisionSimplifier high={highSolved} low={lowSolved} />
			</>
		);
	}
	return (
		<Equation>
			<InputDualProbability
				letter="&nbsp;P"
				separator="AND"
				A1={A1}
				A2={A2}
				B1={B1}
				B2={B2}
				onChange={setAB}
			/>
			<Equals />
			<Division high={highA} low={lowA} />
			<Multiply />
			<Division high={highB} low={lowB} />
			{equals}
		</Equation>
	);
};

const AWhenBIndependent = () => {
	const [A1, setA1] = useState(1);
	const [A2, setA2] = useState(null);
	const [B1, setB1] = useState(1);
	const [B2, setB2] = useState(null);
	const setAB = (A1, A2, B1, B2) => {
		setA1(A1);
		setA2(A2);
		setB1(B1);
		setB2(B2);
	};
	const highA = formulaReplace("A1", { A1 });
	const lowA = formulaReplace("A2", { A2 });
	const highB = formulaReplace("B1", { B1 });
	const lowB = formulaReplace("B2", { B2 });

	let equals = null;
	if (A1 !== null && A2 !== null && B1 !== null && B2 !== null) {
		const [highHigh, highLow] = fractionMultiply(A1, A2, B1, B2);
		const [highSolved, lowSolved] = fractionDivide(highHigh, highLow, B1, B2);
		equals = (
			<>
				<Equals />
				<DivisionSimplifier high={highSolved} low={lowSolved} />
			</>
		);
	}
	return (
		<Equation>
			<InputDualProbability
				letter="&nbsp;P"
				separator="|"
				A1={A1}
				A2={A2}
				B1={B1}
				B2={B2}
				onChange={setAB}
			/>
			<Equals />
			<BracketLeft />
			<Division high={highA} low={lowA} />
			<Multiply />
			<Division high={highB} low={lowB} />
			<BracketRight />
			<Divide />
			<Division high={highB} low={lowB} />
			{equals}
		</Equation>
	);
};

const PageHome = () => {
	return (
		<>
			<Head>
				<title>Math</title>
			</Head>
			<h1 id="permutations">Permutations</h1>
			<h3>Order = YES, Repetition = YES</h3>
			<VTildenr />
			<h3>Order = YES, Repetition = NO</h3>
			<Vnr />
			<h1 id="combinations">Combinations</h1>
			<h3>Order = NO, Repetition = YES</h3>
			<Cnr />
			<h3>Order = NO, Repetition = NO</h3>
			<CTildenr />
			<h1>Probabilities, always in [0, 1]</h1>
			<h3>Reverse A</h3>
			<ANot />
			<h3>A or B, Mutually exclusive = YES</h3>
			<AOrB exclusive={true} />
			<h3>A or B, Mutually exclusive = NO</h3>
			<AOrB exclusive={false} />
			<h3>A and B, Independent = YES</h3>
			<AAndBIndependent />
			<h3>A when B, Independent = YES</h3>
			<AWhenBIndependent />
		</>
	);
};

export default PageHome;
