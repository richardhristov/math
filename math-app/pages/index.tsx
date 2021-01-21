import {
	factorial,
	formulaReplace,
	fractionAdd,
	fractionDivide,
	fractionMultiply,
	fractionNot,
	fractionPower,
	fractionSimplify,
	fractionSolveCombination,
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
import InputXn from "../components/InputXn";
import InputXnr from "../components/InputXnr";
import Minus from "../components/Minus";
import Multiply from "../components/Multiply";
import Plus from "../components/Plus";
import Power from "../components/Power";

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
	if (n !== null && r !== null && n >= r) {
		const lowSimplified = formulaReplace("r!", { r });
		let highSimplified = n;
		for (let i = n - 1; i > n - r; i--) {
			highSimplified = highSimplified + "." + i;
		}
		const [highSolved, lowSolved] = fractionSolveCombination(n, r);
		equals = (
			<>
				<Equals />
				{r !== 0 ? (
					<>
						<Division high={highSimplified} low={lowSimplified} />
						<Equals />
					</>
				) : null}
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

const ANot = () => {
	const [A1, setA1] = useState(null);
	const [A2, setA2] = useState(null);
	useEffect(() => setA1(1), []);
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
	const [A1, setA1] = useState(null);
	const [A2, setA2] = useState(null);
	const [B1, setB1] = useState(null);
	const [B2, setB2] = useState(null);
	useEffect(() => setA1(1), []);
	useEffect(() => setB1(1), []);
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
	const [A1, setA1] = useState(null);
	const [A2, setA2] = useState(null);
	const [B1, setB1] = useState(null);
	const [B2, setB2] = useState(null);
	useEffect(() => setA1(1), []);
	useEffect(() => setB1(1), []);
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
	const [A1, setA1] = useState(null);
	const [A2, setA2] = useState(null);
	const [B1, setB1] = useState(null);
	const [B2, setB2] = useState(null);
	useEffect(() => setA1(1), []);
	useEffect(() => setB1(1), []);
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
	const [A1, setA1] = useState(null);
	const [A2, setA2] = useState(null);
	const [B1, setB1] = useState(null);
	const [B2, setB2] = useState(null);
	useEffect(() => setA1(1), []);
	useEffect(() => setB1(1), []);
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

const AWhenBGivenAB = () => {
	const [AB1, setAB1] = useState(null);
	const [AB2, setAB2] = useState(null);
	const [B1, setB1] = useState(null);
	const [B2, setB2] = useState(null);
	useEffect(() => setAB1(1), []);
	useEffect(() => setB1(1), []);
	const setAB = (AB1, AB2) => {
		setAB1(AB1);
		setAB2(AB2);
	};
	const setB = (B1, B2) => {
		setB1(B1);
		setB2(B2);
	};
	const highAB = formulaReplace("AB1", { AB1 });
	const lowAB = formulaReplace("AB2", { AB2 });
	const highB = formulaReplace("B1", { B1 });
	const lowB = formulaReplace("B2", { B2 });

	let equals = null;
	if (AB1 !== null && AB2 !== null && B1 !== null && B2 !== null) {
		const [highSolved, lowSolved] = fractionDivide(AB1, AB2, B1, B2);
		equals = (
			<>
				<Equals />
				<DivisionSimplifier high={highSolved} low={lowSolved} />
			</>
		);
	}
	return (
		<Equation>
			<InputSingleProbability
				letter="&nbsp;P"
				prefix="A|"
				A1={B1}
				A2={B2}
				placeholderA1="B1"
				placeholderA2="B2"
				onChange={setB}
			/>
			<Equals />
			<Division
				high={
					<InputSingleProbability
						A1={AB1}
						A2={AB2}
						placeholderA1="AB1"
						placeholderA2="AB2"
						onChange={setAB}
					/>
				}
				low={<Division high={highB} low={lowB} />}
			/>
			<Equals />
			<Division high={highAB} low={lowAB} />
			<Divide />
			<Division high={highB} low={lowB} />
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
			<span key={i}>
				<InputSingleProbability
					letter={i === 0 ? <>&nbsp;P</> : "P"}
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
			</span>
		);
		othersSumComponents.push(
			<span key={i}>
				<Division high={A1} low={A2} />
				<Multiply />
				<Division high={B1} low={B2} />
				{i < n - 1 ? <Plus /> : null}
			</span>
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
			<Equation>
				&nbsp;n <Equals />
				<input
					type="number"
					value={n}
					onChange={(e) => setN(e.target.valueAsNumber)}
				/>
			</Equation>
			<Equation>
				{othersComponents}
				<Equals />
				{othersSumComponents}
				{equals}
			</Equation>
		</>
	);
};

const BinomialProbability = () => {
	const [n, setN] = useState(null);
	const [k, setK] = useState(null);
	const [A1, setA1] = useState(null);
	const [A2, setA2] = useState(null);
	useEffect(() => setA1(1), []);
	const setNK = (N, K) => {
		setN(N);
		setK(K);
	};
	const setA = (A1, A2) => {
		setA1(A1);
		setA2(A2);
	};
	const highA = formulaReplace("A1", { A1 });
	const lowA = formulaReplace("A2", { A2 });
	const powerK = formulaReplace("k", { k });
	const powerNMinusK = formulaReplace("n - k", { n, k });

	let equals = null;
	if (A1 !== null && A2 !== null && n !== null && k !== null && n > 0) {
		const [highC, lowC] = fractionSolveCombination(n, k);
		const [highPPower, lowPPower] = fractionPower(A1, A2, k);
		const [highNotP, lowNotP] = fractionNot(A1, A2);
		const nMinusK = n - k;
		const [highNotPPower, lowNotPPower] = fractionPower(
			highNotP,
			lowNotP,
			nMinusK
		);
		const [highSolved1, lowSolved1] = fractionMultiply(
			highC,
			lowC,
			highPPower,
			lowPPower
		);
		const [highSolved, lowSolved] = fractionMultiply(
			highNotPPower,
			lowNotPPower,
			highSolved1,
			lowSolved1
		);
		equals = (
			<>
				<Equals />
				<Division high={highC} low={lowC} />
				<Multiply />
				<Division high={highPPower} low={lowPPower} />
				<Multiply />
				<Division high={highNotP} low={lowNotP} />
				<Power>{nMinusK}</Power>
				<Equals />
				<DivisionSimplifier high={highSolved} low={lowSolved} />
			</>
		);
	}
	return (
		<Equation>
			<InputXn letter="&nbsp;P(" n={k} placeholderN="k" onChange={setK} />
			<BracketRight />
			<Equals />
			<InputXnr letter="C" n={n} r={k} onChange={setNK} placeholderR="k" />
			<Multiply />
			<InputSingleProbability letter="" A1={A1} A2={A2} onChange={setA} />
			<Power>{powerK}</Power>
			<Multiply />
			<BracketLeft />
			1
			<Minus />
			<Division high={highA} low={lowA} />
			<BracketRight />
			<Power>
				<BracketLeft />
				{powerNMinusK}
				<BracketRight />
			</Power>
			{equals}
		</Equation>
	);
};

const FreeWeightsTable = () => {
	const [n, setN] = useState(1);
	const [states, setStates] = useState([]);
	const setX = (x, idx) => {
		const _states = [...states];
		_states[idx][0] = x;
		setStates(_states);
	};
	const setP = (A1, A2, idx) => {
		const _states = [...states];
		_states[idx][1] = A1;
		_states[idx][2] = A2;
		setStates(_states);
	};
	useEffect(() => {
		const _As = states.slice(0, n);
		for (let i = _As.length; i < n; i++) {
			_As.push([i, null, null]);
		}
		setStates(_As);
	}, [n]);

	const thComponents = [];
	const tdComponents = [];
	const averages = [];
	let pSum = [0, 0];
	let avgSum = [0, 0];
	for (let i = 0; i < n; i++) {
		const x = (states[i] || [])[0];
		const P1 = (states[i] || [])[1];
		const P2 = (states[i] || [])[2];
		if (P1 !== null && P2 !== null) {
			pSum = fractionAdd(pSum[0], pSum[1], P1, P2);
		}
		if (P1 !== null && P2 !== null && x !== null) {
			averages.push([x, P1, P2]);
			const [multHigh, multLow] = fractionMultiply(x, 1, P1, P2);
			avgSum = fractionAdd(avgSum[0], avgSum[1], multHigh, multLow);
		}
		thComponents.push(
			<InputXn n={x} placeholderN={`x${i}`} onChange={(x) => setX(x, i)} />
		);
		tdComponents.push(
			<InputSingleProbability
				A1={P1}
				A2={P2}
				placeholderA1={`P${i}1`}
				placeholderA2={`P${i}2`}
				onChange={(P1, P2) => setP(P1, P2, i)}
			/>
		);
	}

	let solution = null;
	if (pSum[0] === pSum[1] && pSum[0] > 0) {
		const disps = [];
		let dispSum = [0, 0];
		const xx = [];
		const yy = [];
		let yySum = [0, 0];
		for (let i = 0; i < n; i++) {
			const x = (states[i] || [])[0];
			const P1 = (states[i] || [])[1];
			const P2 = (states[i] || [])[2];
			if (P1 !== null && P2 !== null && x !== null) {
				const [subHigh, subLow] = fractionSubtract(x, 1, avgSum[0], avgSum[1]);
				const [powHigh, powLow] = fractionPower(subHigh, subLow, 2);
				const [dispHigh, dispLow] = fractionMultiply(powHigh, powLow, P1, P2);
				dispSum = fractionAdd(dispHigh, dispLow, dispSum[0], dispSum[1]);
				disps.push([x, P1, P2]);
				xx.push(i);
				yySum = fractionAdd(yySum[0], yySum[1], P1, P2);
				yy.push([yySum[0], yySum[1]]);
			}
		}
		const avgSumSimplified = fractionSimplify(avgSum[0], avgSum[1]);
		const dispSumSimplified = fractionSimplify(dispSum[0], dispSum[1]);
		solution = (
			<>
				<h3>Average</h3>
				<Equation>
					{averages.map(([x, high, low]) => (
						<>
							<Plus />
							{x}
							<Multiply />
							<Division high={high} low={low} />
						</>
					))}
					<Equals />
					<DivisionSimplifier high={avgSum[0]} low={avgSum[1]} />
				</Equation>
				<h3>Dispersion</h3>
				<Equation>
					{disps.map(([x, high, low]) => (
						<>
							<Plus />
							<BracketLeft />
							{x}
							<Minus />
							<Division high={avgSumSimplified[0]} low={avgSumSimplified[1]} />
							<BracketRight />
							<Power>2</Power>
							<Multiply />
							<Division high={high} low={low} />
						</>
					))}
					<Equals />
					<DivisionSimplifier high={dispSum[0]} low={dispSum[1]} />
				</Equation>
				<h3>
					Std deviation = sqrt({dispSumSimplified[0]}/{dispSumSimplified[1]})
				</h3>
				<Fn xx={xx} yy={yy} />
			</>
		);
	}

	return (
		<>
			<Equation>
				&nbsp;n <Equals />
				<input
					type="number"
					value={n}
					onChange={(e) => setN(e.target.valueAsNumber)}
				/>
			</Equation>
			<table className="table">
				<thead>
					<tr>
						<th key={-1}>x</th>
						{thComponents.map((t, idx) => (
							<th key={idx}>{t}</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td key={-1}>p</td>
						{tdComponents.map((t, idx) => (
							<td key={idx}>{t}</td>
						))}
					</tr>
				</tbody>
			</table>
			{pSum[0] !== pSum[1]
				? `Sum of P is invalid = ${pSum[0]}/${pSum[1]}`
				: null}
			{solution}
		</>
	);
};

const Fn = ({ xx, yy }) => {
	const lowestX = xx.length > 0 ? xx[0] : 0;
	const highestX = xx.length > 0 ? xx[xx.length - 1] : 0;
	return (
		<div className="fn">
			<div className="fn__letter">F(x) =</div>
			<div className="fn__table">
				<div className="fn__row" key={-1}>
					<Division high={yy[0][0]} low={yy[0][1]} /> when x &lt; {lowestX}
				</div>
				{xx.slice(1, -1).map((x, idx) => (
					<div className="fn__row" key={idx}>
						<Division high={yy[idx + 1][0]} low={yy[idx + 1][1]} />
						when {xx[idx]} &lt;= x &lt; {x}
					</div>
				))}
				<div className="fn__row" key={-2}>
					1 when x &gt; {highestX}
				</div>
			</div>
		</div>
	);
};

const Permutations = () => {
	return (
		<>
			<h1 id="permutations">0. Permutations</h1>
			<h3>Order = YES, Repetition = YES</h3>
			<VTildenr />
			<h3>Order = YES, Repetition = NO</h3>
			<Vnr />
		</>
	);
};

const Combinations = () => {
	return (
		<>
			<h1 id="combinations">1. Combinations</h1>
			<h3>Order = NO, Repetition = YES</h3>
			<CTildenr />
			<h3>Order = NO, Repetition = NO</h3>
			<Cnr />
		</>
	);
};

const Probabilities = () => {
	return (
		<>
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
			<h3>A WHEN B, Exclusive = YES, Independent = NO</h3>
			<Equation>
				&nbsp;P(A | B)
				<Equals /> 0
			</Equation>
			<h3>A WHEN NOT B, Exclusive = YES, Independent = NO</h3>
			<AWhenNotBIndependent />
			<h3>A WHEN B, Exclusive = NO, Independent = YES</h3>
			<Equation>
				&nbsp;P(A | B)
				<Equals /> P(A)
			</Equation>
			<h3>A WHEN NOT B, Exclusive = NO, Independent = YES</h3>
			<Equation>
				&nbsp;P(A |!B)
				<Equals /> P(A)
			</Equation>
			<h3>A WHEN B GIVEN B AB, Exclusive = NO, Independent = YES</h3>
			<AWhenBGivenAB />
		</>
	);
};

const NProbabilities = () => {
	return (
		<>
			<h1 id="n-probabilies">3. N Probabilities</h1>
			<h3>Total Probability</h3>
			<TotalProbability />
			<h3>Bernouli's Attempts/Binomial Probability</h3>
			<BinomialProbability />
			<h3>Binomial Probability find N</h3>
			Use the Bernouli's Attempts calculator, put k = 0 and brute force N
		</>
	);
};

const FreeWeights = () => {
	return (
		<>
			<h1 id="n-probabilies">4. Free Weights</h1>
			<h3>Free Weights/Probability Table</h3>
			<FreeWeightsTable />
		</>
	);
};

const PageHome = () => {
	const [black, setBlack] = useState(false);
	useEffect(() => {
		if (!localStorage.getItem("black")) {
			return;
		}
		setBlack(true);
	}, []);
	const onBlackClick = () => {
		setBlack(true);
		localStorage.setItem("black", "true");
	};
	return (
		<>
			<Head>
				<title>Math</title>
			</Head>
			{!black ? (
				<button type="button" onClick={onBlackClick}>
					Black
				</button>
			) : null}
			<div
				className={`content ${black ? "black" : null}`}
				style={{ paddingLeft: "14px" }}
			>
				<Permutations />
				<Combinations />
				<Probabilities />
				<NProbabilities />
				<FreeWeights />
				<p>Theory of Statistics</p>
			</div>
		</>
	);
};

export default PageHome;
