import type { /*CryptoInvestmentType,*/ StockInvestmentType } from '../../types/InvestingTypes';

function randomBetween(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

export function changeStockPrice(investments: StockInvestmentType[], date: Date): StockInvestmentType[] {
	return investments.map(investment => {
		// STEP 1: Calculate the new price
		// We do all our math first, before creating any new objects or arrays.
		// This way, if something goes wrong, we haven't allocated memory yet.

		const deltaTime = randomBetween(1, 15);
		const drift = investment.trend * 0.0005 * deltaTime;
		const noise = randomBetween(-investment.volatility, investment.volatility) * Math.sqrt(deltaTime);

		const maxValue = investment.startingPrice * investment.maxIncrease;
		const saturation = 1 - investment.value / maxValue;
		const resistance = Math.max(0, saturation);

		const heightRatio = investment.value / investment.startingPrice;
		const drag = heightRatio * 0.0003;

		const overshoot = investment.value > maxValue ? (investment.value - maxValue) / maxValue : 0;
		const correction = overshoot * 0.01;

		// Calculate new momentum and value
		let newMomentum = investment.momentum;
		newMomentum += (drift + noise) * resistance - drag - correction;
		newMomentum *= 0.95;

		let newValue = investment.value * (1 + newMomentum);
		newValue = Math.max(newValue, investment.startingPrice * 0.1);

		// Randomly adjust trend
		let newTrend = investment.trend;
		if (Math.random() < 0.001 * deltaTime) {
			newTrend = randomBetween(-1, 1);
		}

		// STEP 2: Handle price history arrays efficiently
		// This is the critical part for preventing memory leaks.
		// We only create new arrays when we absolutely need to modify them.

		let newPrices: number[];
		let newDates: Date[];

		if (investment.priceHistory.prices.length >= 100) {
			// We're at capacity, so we need to remove the oldest entry and add the new one.
			// We use slice(1) to create a new array WITHOUT the first element.
			// This is more efficient than spreading the entire array and then shifting.
			newPrices = [...investment.priceHistory.prices.slice(1), newValue];
			newDates = [...investment.priceHistory.dates.slice(1), date];
		} else {
			// We're not at capacity yet, so just append.
			// We only spread what we need to spread.
			newPrices = [...investment.priceHistory.prices, newValue];
			newDates = [...investment.priceHistory.dates, date];
		}

		// STEP 3: Create and return the new investment object
		// We only create this once, at the very end, with all our calculated values.
		return {
			...investment,
			value: newValue,
			momentum: newMomentum,
			trend: newTrend,
			priceHistory: { prices: newPrices, dates: newDates },
		};
	});
}
