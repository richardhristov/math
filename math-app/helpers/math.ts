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
