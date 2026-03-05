import type { CurrencyPrefix } from '../../../../ts/utils/currencyFormating';
import type { StockInvestmentType } from '../../../../types/InvestingTypes';
import InvestmentGraph from '../InvestmentGraph';
import './StockComponent.css';
function StockComponent({ stock, curPrefix }: { stock: StockInvestmentType; curPrefix: CurrencyPrefix }) {
	return (
		<div className='stock-component-container'>
			<div className='stock-component-title'>{stock.name}</div>
			<div className='stock-component-info-container'>
				<div className='stock-component-info-text'>
					<div>Value: {`${curPrefix}${stock.value.toFixed(2)}`}</div>
					<div>Owned: {stock.amountOwned}</div>
					<div>Total Paid: {`${curPrefix}${stock.totalPaid.toFixed(2)}`}</div>
					<div>Profit: {`${curPrefix}${stock.profit.toFixed(2)}`}</div>
					<div>Remaining: {stock.remaining}</div>
					<div>Dividend: {stock.dividend}%</div>
				</div>
				<div className='stock-component-info-graph'>
					<InvestmentGraph stock={stock}></InvestmentGraph>
				</div>
			</div>
		</div>
	);
}

export default StockComponent;
