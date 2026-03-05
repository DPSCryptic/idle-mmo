import type { /*CryptoInvestmentType,*/ StockInvestmentType } from '../../types/InvestingTypes';

function randomBetween(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

export function changeStockPrice(investments: StockInvestmentType[], date: Date): StockInvestmentType[] {
	return investments.map(investment => {
		const updated = {
			...investment,
			priceHistory: { prices: [...investment.priceHistory.prices], dates: [...investment.priceHistory.dates] },
		};

		const deltaTime = randomBetween(1, 15);
		const drift = updated.trend * 0.0005 * deltaTime;

		const noise = randomBetween(-updated.volatility, updated.volatility) * Math.sqrt(deltaTime);

		const maxValue = updated.startingPrice * updated.maxIncrease;
		const saturation = 1 - updated.value / maxValue;
		const resistance = Math.max(0, saturation);

		const heightRatio = updated.value / updated.startingPrice;
		const drag = heightRatio * 0.0003;

		const overshoot = updated.value > maxValue ? (updated.value - maxValue) / maxValue : 0;

		const correction = overshoot * 0.01;

		updated.momentum += (drift + noise) * resistance - drag - correction;
		updated.momentum *= 0.95;

		updated.value *= 1 + updated.momentum;
		updated.value = Math.max(updated.value, updated.startingPrice * 0.1);

		if (Math.random() < 0.001 * deltaTime) {
			updated.trend = randomBetween(-1, 1);
		}

		updated.priceHistory.prices.push(updated.value);
		updated.priceHistory.dates.push(date);
		if (updated.priceHistory.prices.length > 100 && updated.priceHistory.dates.length > 100) {
			updated.priceHistory.prices.slice(-100);
			updated.priceHistory.dates.slice(-100);
		}

		// console.log(updated);

		return updated; // 👈 return the new object
	});
}
