type PriceHistoryType = { prices: number[]; dates: Date[] };
export type BaseInvestmentType = {
	name: string;
	value: number;
	startingPrice: number;
	remaining: number;
	profit: number;
	totalPaid: number;
	amountOwned: number;
	priceHistory: PriceHistoryType;
	trend: number;
	volatility: number;
	momentum: number;
	maxIncrease: number;
};

export type StockInvestmentType = BaseInvestmentType & { dividend: number };
export type CryptoInvestmentType = BaseInvestmentType & { stakeMulti: number };

export type RealEstateBaseInvestmentType = { landTiles: number[]; name: string; value: number };

export type RealEstateEmptyLandType = RealEstateBaseInvestmentType & { mining: boolean };

export type RealEstateHouseUpgradeType = { name: string; price: number };

export type RealEstateHouseType = RealEstateBaseInvestmentType & {
	buildingTiles: number[];
	upgrades: RealEstateHouseUpgradeType[];
	condition: number;
};
