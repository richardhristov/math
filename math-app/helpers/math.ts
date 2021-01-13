export const formulaReplace = (text: string, replace: any) => {
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

export const fractionAdd = (a1: number, b1: number, a2: number, b2: number) => {
	if (b1 === b2) {
		return [a1 + a2, b1];
	}
	const _lcm = lcm(b1, b2);
	const y1 = a1 / (b1 / _lcm);
	const y2 = a2 / (b2 / _lcm);
	return [y1 + y2, _lcm];
};

export const fractionMultiply = (
	a1: number,
	b1: number,
	a2: number,
	b2: number
) => [a1 * a2, b1 * b2];

export const fractionDivide = (a: number, b: number, c: number) => [a, b * c];
