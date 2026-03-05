import type { CurrencyPrefix } from '../../ts/utils/currencyFormating';
import type { ActiveInvestingButtonType } from '../../types/ButtonTypes';
import type { StockInvestmentType } from '../../types/InvestingTypes';
import type { PlayerType } from '../../types/PlayerType';
import './InvestingScreen.css';
import CryptoOverview from './InvestingScreen/CryptoOverview';
import InvestingOverview from './InvestingScreen/InvestingOverview';
import RealEstateOverview from './InvestingScreen/RealEstateOverview';
import StockOverview from './InvestingScreen/StockOverview';

function InvestingScreen({
	activeInvestingButton,
	setActiveInvestingButton,
	stocks,
	setStocks,
	curPrefix,
	player,
	setPlayer,
}: {
	activeInvestingButton: ActiveInvestingButtonType;
	setActiveInvestingButton: React.Dispatch<React.SetStateAction<ActiveInvestingButtonType>>;
	stocks: StockInvestmentType[];
	setStocks: React.Dispatch<React.SetStateAction<StockInvestmentType[]>>;
	curPrefix: CurrencyPrefix;
	player: PlayerType;
	setPlayer: React.Dispatch<React.SetStateAction<PlayerType>>;
}) {
	const buttonLabels: ActiveInvestingButtonType[] = ['STOCK', 'REAL ESTATE', 'CRYPTO'];

	let content;

	switch (activeInvestingButton) {
		case 'STOCK':
			content = (
				<StockOverview
					stocks={stocks}
					setStocks={setStocks}
					curPrefix={curPrefix}
					player={player}
					setPlayer={setPlayer}
				/>
			);
			break;
		case 'REAL ESTATE':
			content = <RealEstateOverview />;
			break;
		case 'CRYPTO':
			content = <CryptoOverview />;
			break;
		default:
			content = <InvestingOverview />;
	}
	return (
		<div className='investing-container'>
			<div className='investing-toolbar'>
				{buttonLabels.map((label, index) => (
					<button
						key={index}
						className={`toolbar-buttons ${activeInvestingButton === label ? 'active-button' : ''}`}
						onClick={() => setActiveInvestingButton(label)}
					>
						{label}
					</button>
				))}
			</div>
			<div className='investing-content-container'>{content}</div>
		</div>
	);
}

export default InvestingScreen;
