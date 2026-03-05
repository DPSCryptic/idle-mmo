// function formatNumber(number: bigint): string {
// 	const suffix: string[] = ['', 'k', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx'];
// 	let scale: number = 0;
// 	let v = Number(number);
// 	v /= 100;
// 	while (v >= 1000) {
// 		v /= 1000;
// 		scale++;
// 		if (scale >= suffix.length) return number.toString();
// 	}
// 	return '' + v.toFixed(2).toString() + suffix[scale];
// }

// const currencyPrefix = ['€', '$', '£'];
export type CurrencyPrefix = '€' | '$' | '£';

export function formatBigInt(number: bigint): string {
	const suffix = ['', 'k', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx'];
	let scale = 0;
	let n = number;

	// Determine suffix
	while (n >= 1000n * 100n) {
		n /= 1000n;
		scale++;
		if (scale >= suffix.length) return '€' + (number / 100n).toString();
	}

	// Convert BigInt to Number safely (small value < 1e15)
	const value = Number(n) / 100; // divide cents to get actual currency
	return value.toFixed(2) + suffix[scale];
}
