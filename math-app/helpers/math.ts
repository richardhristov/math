export const formulaReplace = (text: string, replace: any) => {
	if (typeof text.replaceAll !== "function") {
		return text;
	}
	Object.entries(replace).forEach(([key, value]) => {
		if (value === null) {
			return;
		}
		text = text.replaceAll(key, value as string);
	});
	return text;
};

export const factorial = (n: number) => (n <= 1 ? 1 : n * factorial(n - 1));

export const gcd = (a: number, b: number) => (b ? gcd(b, a % b) : a);

export const lcm = (a: number, b: number) =>
	!a || !b ? 0 : Math.abs((a * b) / gcd(a, b));

export const fractionSimplify = (numerator: number, denominator: number) => {
	const _gcd = gcd(numerator, denominator);
	return [numerator / _gcd, denominator / _gcd];
};

export const fractionNot = (a: number, b: number) => [b - a, b];

export const fractionAdd = (x1: number, y1: number, x2: number, y2: number) => {
	if (y1 === y2) {
		return [x1 + x2, y1];
	}
	const _lcm = lcm(y1, y2);
	const z1 = x1 / (y1 / _lcm);
	const z2 = x2 / (y2 / _lcm);
	return [z1 + z2, _lcm];
};

export const fractionSubtract = (
	x1: number,
	y1: number,
	x2: number,
	y2: number
) => {
	if (y1 === y2) {
		return [x1 - x2, y1];
	}
	const _lcm = lcm(y1, y2);
	const z1 = x1 / (y1 / _lcm);
	const z2 = x2 / (y2 / _lcm);
	return [z1 - z2, _lcm];
};

export const fractionMultiply = (
	x1: number,
	y1: number,
	x2: number,
	y2: number
) => [x1 * x2, y1 * y2];

export const fractionDivide = (a: number, b: number, c: number, d: number) => [
	a * d,
	b * c,
];

export const fractionSolveCombination = (n: number, r: number) => {
	if (r === 0) {
		return [1, 1];
	}
	let nn = n;
	for (let i = n - 1; i > n - r; i--) {
		nn = nn * i;
	}
	return [nn, factorial(r)];
};

export const fractionPower = (a: number, b: number, k: number) => {
	if (k === 0) {
		return [1, 1];
	}
	if (k <= 1) {
		return [a, b];
	}
	const [c, d] = fractionPower(a, b, k - 1);
	return fractionMultiply(a, b, c, d);
};
