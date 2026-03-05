import type { CurrencyPrefix } from '../../../ts/utils/currencyFormating';
import type { StockInvestmentType } from '../../../types/InvestingTypes';
import './StockOverview.css';
import StockComponent from './StockOverview/StockComponent';
function StockOverview({
	stockInvestments,
	curPrefix,
}: {
	stockInvestments: StockInvestmentType[];
	curPrefix: CurrencyPrefix;
}) {
	return (
		<div className='stock-overview-container'>
			<div className='sorting-toolbar'>
				<button className='stock-overview-toolbar-button'>Alphabetic</button>
				<button className='stock-overview-toolbar-button'>Value</button>
				<button className='stock-overview-toolbar-button'>Dividend</button>
				<button className='stock-overview-toolbar-button'>Owned</button>
			</div>
			<div className='stocks-overview'>
				{stockInvestments.map(stock => {
					return <StockComponent key={stock.name} stock={stock} curPrefix={curPrefix}></StockComponent>;
				})}
			</div>
		</div>
	);
}
export default StockOverview;
