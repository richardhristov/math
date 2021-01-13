import {
	factorial,
	formulaReplace,
	fractionAdd,
	fractionDivide,
	fractionMultiply,
	fractionNot,
	fractionSubtract,
} from "../helpers/math";
import { useEffect, useState } from "react";

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
	const [A1, setA1] = useState(1);
	const [A2, setA2] = useState(null);
	const setA = (A1, A2) => {
		setA1(A1);
		setA2(A2);
	};
	const high = formulaReplace("A1", { A1 });
	const low = formulaReplace("A2", { A2 });

	let equals = null;
	if (A1 !== null && A2 !== null) {
		const [highSolved, lowSolved] = fractionNot(A1, A2);
		equals = (
			<>
				<Equals />
				<DivisionSimplifier high={highSolved} low={lowSolved} />
			</>
		);
	}

	return (
		<Equation>
			<InputSingleProbability letter="!P" A1={A1} A2={A2} onChange={setA} />
			<Equals />
			1
			<Minus />
			<Division high={high} low={low} />
			{equals}
		</Equation>
	);
};

const AOrB = () => {
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
		</Equation>
	);
};

const AOrBIndependent = () => {
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
		const [highLeft, lowLeft] = fractionAdd(A1, A2, B1, B2);
		const [highRight, lowRight] = fractionMultiply(A1, A2, B1, B2);
		const [highSolved, lowSolved] = fractionSubtract(
			highLeft,
			lowLeft,
			highRight,
			lowRight
		);
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
			<Minus />
			<Division high={highA} low={lowA} />
			<Multiply />
			<Division high={highB} low={lowB} />
			{equals}
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

const AWhenNotBIndependent = () => {
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
		const [highRight, lowRight] = fractionNot(B1, B2);
		const [highSolved, lowSolved] = fractionDivide(A1, A2, highRight, lowRight);
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
				separator="|!"
				A1={A1}
				A2={A2}
				B1={B1}
				B2={B2}
				onChange={setAB}
			/>
			<Equals />
			<Division high={highA} low={lowA} />
			<Divide />
			<BracketLeft />
			1
			<Minus />
			<Division high={highB} low={lowB} />
			<BracketRight />
			{equals}
		</Equation>
	);
};

const TotalProbability = () => {
	const [n, setN] = useState(2);
	const [states, setStates] = useState([]);
	const setA = (A1, A2, idx) => {
		const _states = [...states];
		_states[idx][0] = A1;
		_states[idx][1] = A2;
		setStates(_states);
	};
	const setB = (A1, A2, idx) => {
		const _states = [...states];
		_states[idx][2] = A1;
		_states[idx][3] = A2;
		setStates(_states);
	};
	useEffect(() => {
		const _As = states.slice(0, n);
		for (let i = _As.length - 1; i < n - 1; i++) {
			_As.push([1, null, 1, null]);
		}
		setStates(_As);
	}, [n]);

	const othersComponents = [];
	const othersSumComponents = [];
	let hasNull = false;
	let [highSolved, lowSolved] = [0, 0];
	for (let i = 0; i < n; i++) {
		const A1 = (states[i] || [])[0];
		const A2 = (states[i] || [])[1];
		const B1 = (states[i] || [])[2];
		const B2 = (states[i] || [])[3];
		othersComponents.push(
			<>
				<InputSingleProbability
					letter="P"
					prefix={`A | B${i} = `}
					A1={A1}
					A2={A2}
					onChange={(A1, A2) => setA(A1, A2, i)}
				/>
				<Multiply />
				<InputSingleProbability
					letter="P"
					A1={B1}
					A2={B2}
					placeholderA1={`B${i}1`}
					placeholderA2={`B${i}2`}
					onChange={(B1, B2) => setB(B1, B2, i)}
				/>
				{i < n - 1 ? <Multiply /> : null}
			</>
		);
		othersSumComponents.push(
			<>
				<Division high={A1} low={A2} />
				<Multiply />
				<Division high={B1} low={B2} />
				{i < n - 1 ? <Plus /> : null}
			</>
		);
		if (A1 === null || A2 === null || B1 === null || B2 === null) {
			hasNull = true;
		} else {
			const [high, low] = fractionMultiply(A1, A2, B1, B2);
			[highSolved, lowSolved] =
				i > 0 ? fractionAdd(high, low, highSolved, lowSolved) : [high, low];
		}
	}

	let equals = null;
	if (!hasNull) {
		equals = (
			<>
				<Equals />
				<DivisionSimplifier high={highSolved} low={lowSolved} />
			</>
		);
	}

	return (
		<>
			n =
			<input
				type="number"
				value={n}
				onChange={(e) => setN(e.target.valueAsNumber)}
			/>
			<Equation>
				{othersComponents}
				<Equals />
				{othersSumComponents}
				{equals}
			</Equation>
		</>
	);
};

const PageHome = () => {
	return (
		<>
			<Head>
				<title>Math</title>
			</Head>
			<h1 id="permutations">0. Permutations</h1>
			<h3>Order = YES, Repetition = YES</h3>
			<VTildenr />
			<h3>Order = YES, Repetition = NO</h3>
			<Vnr />
			<h1 id="combinations">1. Combinations</h1>
			<h3>Order = NO, Repetition = YES</h3>
			<Cnr />
			<h3>Order = NO, Repetition = NO</h3>
			<CTildenr />
			<h1 id="probabilities">2. Probabilities, always in [0, 1]</h1>
			<h3>NOT A</h3>
			<ANot />
			<h3>A OR B, Exclusive = YES, Independent = NO</h3>
			<AOrB />
			<h3>A OR B, Exclusive = NO, Independent = YES</h3>
			<AOrBIndependent />
			<h3>A AND B, Exclusive = YES, Independent = NO</h3>
			<Equation>
				&nbsp;P(A AND B)
				<Equals /> 0
			</Equation>
			<h3>A AND B, Exclusive = NO, Independent = YES</h3>
			<AAndBIndependent />
			<h3>A GIVEN B, Exclusive = YES, Independent = NO</h3>
			<Equation>
				&nbsp;P(A | B)
				<Equals /> 0
			</Equation>
			<h3>A GIVEN NOT B, Exclusive = YES, Independent = NO</h3>
			<AWhenNotBIndependent />
			<h3>A GIVEN B, Exclusive = NO, Independent = YES</h3>
			<Equation>
				&nbsp;P(A | B)
				<Equals /> P(A)
			</Equation>
			<h3>A GIVEN NOT B, Exclusive = NO, Independent = YES</h3>
			<Equation>
				&nbsp;P(A |!B)
				<Equals /> P(A)
			</Equation>
			<h1 id="totalprobability">3. Total probability</h1>
			<TotalProbability />
			Theory of Statistics
		</>
	);
};

export default PageHome;
