import { useEffect, useState } from 'react';
import './App.css';
import MainContainer from './components/MainContainer';
import TopContainer from './components/TopContainer';
import type { CurrencyPrefix } from './ts/utils/currencyFormating';
import type { PlayerType } from './types/PlayerType';
import type { ActiveButtonType, ActiveInvestingButtonType } from './types/ButtonTypes';
import type { StockInvestmentType } from './types/InvestingTypes';
import { changeStockPrice } from './ts/investing/investmentUtils';

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const stockInvestments: StockInvestmentType[] = [
	{
		name: 'ElectroX',
		value: 1.0,
		startingPrice: 1.0,
		remaining: 100000,
		dividend: 1.05,
		profit: 0.0,
		totalPaid: 0n,
		amountOwned: 0,
		priceHistory: { prices: [1.0], dates: [yesterday] },
		trend: 0,
		volatility: 0.05,
		momentum: 0,
		maxIncrease: 12,
	},
	{
		name: 'HyperCash',
		value: 2.0,
		startingPrice: 2.0,
		remaining: 120000,
		dividend: 1.15,
		profit: 0.0,
		totalPaid: 0n,
		amountOwned: 0,
		priceHistory: { prices: [2.0], dates: [yesterday] },
		trend: 0.1,
		volatility: 0.005,
		momentum: 0,
		maxIncrease: 4,
	},
	// {
	// 	name: 'Diamond Efficient',
	// 	value: 15.0,
	// 	startingPrice: 15.0,
	// 	remaining: 100000,
	// 	dividend: 1.05,
	// 	profit: 0.0,
	// 	totalPaid: 0n,
	// 	amountOwned: 0,
	// 	priceHistory: { prices: [15.0], dates: [yesterday] },
	// 	trend: 0,
	// 	volatility: 0.05,
	// 	momentum: 0,
	// 	maxIncrease: 12,
	// },
	// {
	// 	name: 'Build Wealth',
	// 	value: 22.0,
	// 	startingPrice: 22.0,
	// 	remaining: 120000,
	// 	dividend: 1.15,
	// 	profit: 0.0,
	// 	totalPaid: 0n,
	// 	amountOwned: 0,
	// 	priceHistory: { prices: [22.0], dates: [yesterday] },
	// 	trend: 0.1,
	// 	volatility: 0.005,
	// 	momentum: 0,
	// 	maxIncrease: 4,
	// },
	// {
	// 	name: 'ExoMoney',
	// 	value: 33.0,
	// 	startingPrice: 33.0,
	// 	remaining: 100000,
	// 	dividend: 1.05,
	// 	profit: 0.0,
	// 	totalPaid: 0n,
	// 	amountOwned: 0,
	// 	priceHistory: { prices: [33.0], dates: [yesterday] },
	// 	trend: 0,
	// 	volatility: 0.05,
	// 	momentum: 0,
	// 	maxIncrease: 12,
	// },
	// {
	// 	name: 'Troll Cash',
	// 	value: 5.0,
	// 	startingPrice: 5.0,
	// 	remaining: 120000,
	// 	dividend: 1.15,
	// 	profit: 0.0,
	// 	totalPaid: 0n,
	// 	amountOwned: 0,
	// 	priceHistory: { prices: [5.0], dates: [yesterday] },
	// 	trend: 0.1,
	// 	volatility: 0.005,
	// 	momentum: 0,
	// 	maxIncrease: 4,
	// },
];
function App() {
	const [activeButton, setActiveButton] = useState<ActiveButtonType>('EARNINGS');
	const [activeInvestingButton, setActiveInvestingButton] = useState<ActiveInvestingButtonType | undefined>(
		undefined
	);
	const [player, setPlayer] = useState<PlayerType>({
		name: 'Cryptic',
		gold: 0n,
		totalEarned: 0n,
		totalClicks: 0,
		clickUpgrades: 0,
	});
	const [curPrefix, setCurPrefix] = useState<CurrencyPrefix>('€');
	const [date, setDate] = useState(new Date());

	const [stocks, setStocks] = useState<StockInvestmentType[]>(stockInvestments);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();

			// Update date
			setDate(prevDate => {
				const newDate = new Date(prevDate);
				newDate.setDate(newDate.getDate() + 1);
				return newDate;
			});

			// Update stocks independently
			setStocks(prevStocks => {
				const newDate = new Date(now);
				newDate.setDate(newDate.getDate() + 1);
				return changeStockPrice(prevStocks, newDate);
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className='global-container'>
			<TopContainer player={player} curPrefix={curPrefix} setCurPrefix={setCurPrefix} date={date}></TopContainer>
			<MainContainer
				activeButton={activeButton}
				setActiveButton={setActiveButton}
				player={player}
				setPlayer={setPlayer}
				curPrefix={curPrefix}
				activeInvestingButton={activeInvestingButton}
				setActiveInvestingButton={setActiveInvestingButton}
				stocks={stocks}
				setStocks={setStocks}
			></MainContainer>
		</div>
	);
}

export default App;
