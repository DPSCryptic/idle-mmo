import type { ActiveButtonType, ActiveInvestingButtonType } from '../types/ButtonTypes';
import type { PlayerType } from '../types/PlayerType';
import type { CurrencyPrefix } from '../ts/utils/currencyFormating';
import BusinessScreen from './Screens/BusinessScreen';
import EarningsScreen from './Screens/EarningsScreen';
import InvestingScreen from './Screens/InvestingScreen';
import ItemsScreen from './Screens/ItemsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import type { StockInvestmentType } from '../types/InvestingTypes';

function GameContainer({
	activeButton,
	player,
	setPlayer,
	curPrefix,
	activeInvestingButton,
	setActiveInvestingButton,
	stocks,
	setStocks,
}: {
	activeButton: ActiveButtonType;
	player: PlayerType;
	setPlayer: React.Dispatch<React.SetStateAction<PlayerType>>;
	curPrefix: CurrencyPrefix;
	activeInvestingButton: ActiveInvestingButtonType;
	setActiveInvestingButton: React.Dispatch<React.SetStateAction<ActiveInvestingButtonType>>;
	stocks: StockInvestmentType[];
	setStocks: React.Dispatch<React.SetStateAction<StockInvestmentType[]>>;
}) {
	switch (activeButton) {
		case 'INVESTING':
			return (
				<div className='game-container'>
					<InvestingScreen
						activeInvestingButton={activeInvestingButton}
						setActiveInvestingButton={setActiveInvestingButton}
						stocks={stocks}
						setStocks={setStocks}
						curPrefix={curPrefix}
						player={player}
						setPlayer={setPlayer}
					></InvestingScreen>
				</div>
			);
		case 'BUSINESS':
			return (
				<div className='game-container'>
					<BusinessScreen></BusinessScreen>
				</div>
			);
		case 'EARNINGS':
			return (
				<div className='game-container'>
					<EarningsScreen player={player} setPlayer={setPlayer} curPrefix={curPrefix}></EarningsScreen>
				</div>
			);
		case 'ITEMS':
			return (
				<div className='game-container'>
					<ItemsScreen></ItemsScreen>
				</div>
			);
		case 'PROFILE':
			return (
				<div className='game-container'>
					<ProfileScreen></ProfileScreen>
				</div>
			);
		default:
			return <div className='game-container'>Main</div>;
	}
}
export default GameContainer;
