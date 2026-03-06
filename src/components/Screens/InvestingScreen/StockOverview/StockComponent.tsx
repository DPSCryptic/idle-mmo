import { memo, useState } from 'react';
import { formatBigInt, type CurrencyPrefix } from '../../../../ts/utils/currencyFormating';
import type { StockInvestmentType } from '../../../../types/InvestingTypes';
import type { PlayerType } from '../../../../types/PlayerType';
import InvestmentGraph from '../InvestmentGraph';
import './StockComponent.css';

function buyStock(
	amount: number,
	stock: StockInvestmentType,
	stockCallback: React.Dispatch<React.SetStateAction<StockInvestmentType[]>>,
	player: PlayerType,
	playerCallback: React.Dispatch<React.SetStateAction<PlayerType>>
): { status: boolean; message: string } {
	if (isNaN(amount)) {
		return { status: false, message: 'Only NUMBERS allowed!' };
	}
	if (stock.remaining <= 0) {
		return { status: false, message: 'Remaining stock is 0.' };
	}

	if (stock.remaining < amount) {
		amount = stock.remaining;
	}

	const cost = BigInt(Number((stock.value * amount).toFixed(2)) * 100);

	if (player.gold < cost) {
		return { status: false, message: 'Not enough money.' };
	}

	stockCallback(prev =>
		prev.map(s =>
			s.name === stock.name
				? {
						...s,
						remaining: s.remaining - amount,
						amountOwned: s.amountOwned + amount,
						totalPaid: s.totalPaid + cost,
					}
				: s
		)
	);

	playerCallback(prev => ({ ...prev, gold: prev.gold - cost }));

	return { status: true, message: `Bought ${amount} shares of ${stock.name} for ${amount * stock.value}` };
}
const StockComponent = memo(
	({
		stock,
		setStocks,
		curPrefix,
		player,
		setPlayer,
	}: {
		stock: StockInvestmentType;
		setStocks: React.Dispatch<React.SetStateAction<StockInvestmentType[]>>;
		curPrefix: CurrencyPrefix;
		player: PlayerType;
		setPlayer: React.Dispatch<React.SetStateAction<PlayerType>>;
	}) => {
		const [amount, setAmount] = useState(0);
		const [resultMessage, setResultMessage] = useState<{ status: boolean; message: string } | undefined>(undefined);
		return (
			<div className='stock-component-container'>
				<div className='stock-component-title'>{stock.name}</div>
				<div className='stock-component-info-container'>
					<div className='stock-component-info-text'>
						<div>Value: {`${curPrefix}${stock.value.toFixed(2)}`}</div>
						<div>Owned: {stock.amountOwned}</div>
						<div>Total Paid: {`${curPrefix}${formatBigInt(stock.totalPaid)}`}</div>
						<div>
							Profit:{' '}
							{`${curPrefix}${(stock.amountOwned * stock.value - Number(stock.totalPaid) / 100).toFixed(2)}`}
						</div>
						<div>Remaining: {stock.remaining}</div>
						<div>Dividend: {stock.dividend}%</div>
					</div>
					<div className='stock-component-info-graph'>
						<InvestmentGraph stock={stock}></InvestmentGraph>
					</div>
				</div>
				<div style={{ display: 'flex' }}>
					<input
						type='tel'
						placeholder='Amount to buy or sell'
						onChange={e => {
							setAmount(Number(e.target.value));
						}}
					></input>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<button
							onClick={() => {
								const result = buyStock(amount, stock, setStocks, player, setPlayer);
								setResultMessage(result);
							}}
						>
							BUY
						</button>
						<button>SELL</button>
					</div>
					<div>{`${resultMessage?.status === false ? resultMessage?.message : ''}`}</div>
				</div>
			</div>
		);
	}
);

export default StockComponent;
