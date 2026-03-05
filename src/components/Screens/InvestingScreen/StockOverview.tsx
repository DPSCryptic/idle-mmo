import type { CurrencyPrefix } from '../../../ts/utils/currencyFormating';
import type { StockInvestmentType } from '../../../types/InvestingTypes';
import type { PlayerType } from '../../../types/PlayerType';
import './StockOverview.css';
import StockComponent from './StockOverview/StockComponent';
function StockOverview({
	stocks,
	setStocks,
	curPrefix,
	player,
	setPlayer,
}: {
	stocks: StockInvestmentType[];
	setStocks: React.Dispatch<React.SetStateAction<StockInvestmentType[]>>;
	curPrefix: CurrencyPrefix;
	player: PlayerType;
	setPlayer: React.Dispatch<React.SetStateAction<PlayerType>>;
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
				{stocks.map(stock => {
					return (
						<StockComponent
							key={stock.name}
							stock={stock}
							setStocks={setStocks}
							curPrefix={curPrefix}
							player={player}
							setPlayer={setPlayer}
						></StockComponent>
					);
				})}
			</div>
		</div>
	);
}
export default StockOverview;
