import {
	factorial,
	fractionAdd,
	fractionDivide,
	fractionMultiply,
} from "../helpers/math";

import Division from "../components/Division";
import DivisionSimplifier from "../components/DivisionSimplifier";
import Equals from "../components/Equals";
import Equation from "../components/Equation";
import Head from "next/head";
import InputDualProbability from "../components/InputDualProbability";
import InputXnr from "../components/InputXnr";
import Minus from "../components/Minus";
import Multiply from "../components/Multiply";
import Plus from "../components/Plus";
import { formulaReplace } from "../helpers/math";
import { useState } from "react";

const Rnr = () => {
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
			<InputXnr letter="R" n={n} r={r} onChange={setNR} />
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
			<InputXnr letter="V" n={n} r={r} onChange={setNR} />
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
			<InputXnr letter="C" n={n} r={r} onChange={setNR} />
			<Equals />
			<Division high={high} low={low} />
			{equals}
		</Equation>
	);
};

const CStarnr = () => {
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
			<InputXnr letter="C*" n={n} r={r} onChange={setNR} />
			<Equals />
			<Division high={high} low={low} />
			{equals}
		</Equation>
	);
};

const AOrB = ({ exclusive }) => {
	const [A, setA] = useState(null);
	const [B, setB] = useState(null);
	const setAB = (A, B) => {
		setA(A);
		setB(B);
	};
	const lowA = formulaReplace("A", { A });
	const lowB = formulaReplace("B", { B });

	let equals = null;
	if (A !== null && B !== null) {
		const [highSolved, lowSolved] = fractionAdd(1, A, 1, B);
		equals = (
			<>
				<Equals />
				<DivisionSimplifier high={highSolved} low={lowSolved} />
			</>
		);
	}
	return (
		<Equation>
			<InputDualProbability separator="OR" A={A} B={B} onChange={setAB} />
			<Equals />
			<Division high={1} low={lowA} />
			<Plus />
			<Division high={1} low={lowB} />
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
	const [A, setA] = useState(null);
	const [B, setB] = useState(null);
	const setAB = (A, B) => {
		setA(A);
		setB(B);
	};
	const lowA = formulaReplace("A", { A });
	const lowB = formulaReplace("B", { B });

	let equals = null;
	if (A !== null && B !== null) {
		const [highSolved, lowSolved] = fractionMultiply(1, A, 1, B);
		equals = (
			<>
				<Equals />
				<DivisionSimplifier high={highSolved} low={lowSolved} />
			</>
		);
	}
	return (
		<Equation>
			<InputDualProbability separator="AND" A={A} B={B} onChange={setAB} />
			<Equals />
			<Division high={1} low={lowA} />
			<Multiply />
			<Division high={1} low={lowB} />
			{equals}
		</Equation>
	);
};

const AWhenBIndependent = () => {
	const [A, setA] = useState(null);
	const [B, setB] = useState(null);
	const setAB = (A, B) => {
		setA(A);
		setB(B);
	};
	const lowA = formulaReplace("A", { A });
	const lowB = formulaReplace("B", { B });

	let equals = null;
	if (A !== null && B !== null) {
		const [highHigh, highLow] = fractionMultiply(1, A, 1, B);
		const [highSolved, lowSolved] = fractionDivide(highHigh, highLow, B);
		equals = (
			<>
				<Equals />
				<DivisionSimplifier high={highSolved} low={lowSolved} />
			</>
		);
	}
	return (
		<Equation>
			<InputDualProbability separator="|" A={A} B={B} onChange={setAB} />
			<Equals />
			<Division
				high={
					<>
						<Division high={1} low={lowA} />
						<Multiply />
						<Division high={1} low={lowB} />
					</>
				}
				low={lowB}
			/>
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
			<Rnr />
			<h3>Order = YES, Repetition = NO</h3>
			<Vnr />
			<h1 id="combinations">Combinations</h1>
			<h3>Order = NO, Repetition = YES</h3>
			<Cnr />
			<h3>Order = NO, Repetition = NO</h3>
			<CStarnr />
			<p>Test</p>
			<h1>Probabilities</h1>
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
