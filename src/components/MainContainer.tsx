import BottomContainer from './BottomContainer';
import GameContainer from './GameContainer';
import type { ActiveButtonType, ActiveInvestingButtonType } from '../types/ButtonTypes';
import type { PlayerType } from '../types/PlayerType';
import type { CurrencyPrefix } from '../ts/utils/currencyFormating';
import type { StockInvestmentType } from '../types/InvestingTypes';

function MainContainer({
	activeButton,
	setActiveButton,
	player,
	setPlayer,
	curPrefix,
	activeInvestingButton,
	setActiveInvestingButton,
	stocks,
	setStocks,
}: {
	activeButton: ActiveButtonType;
	setActiveButton: React.Dispatch<React.SetStateAction<ActiveButtonType>>;
	player: PlayerType;
	setPlayer: React.Dispatch<React.SetStateAction<PlayerType>>;
	curPrefix: CurrencyPrefix;
	activeInvestingButton: ActiveInvestingButtonType;
	setActiveInvestingButton: React.Dispatch<React.SetStateAction<ActiveInvestingButtonType>>;
	stocks: StockInvestmentType[];
	setStocks: React.Dispatch<React.SetStateAction<StockInvestmentType[]>>;
}) {
	return (
		<div className='app-container'>
			<GameContainer
				activeButton={activeButton}
				player={player}
				setPlayer={setPlayer}
				curPrefix={curPrefix}
				activeInvestingButton={activeInvestingButton}
				setActiveInvestingButton={setActiveInvestingButton}
				stocks={stocks}
				setStocks={setStocks}
			></GameContainer>
			<BottomContainer
				activeButton={activeButton}
				setActiveButton={setActiveButton}
				activeInvestingButton={activeInvestingButton}
				setActiveInvestingButton={setActiveInvestingButton}
			></BottomContainer>
		</div>
	);
}

export default MainContainer;
