import type { PlayerType } from '../../types/PlayerType';
import { formatBigInt, type CurrencyPrefix } from '../../ts/utils/currencyFormating';
import './EarningsScreen.css';

function EarningsScreen({
	player,
	setPlayer,
	curPrefix,
}: {
	player: PlayerType;
	setPlayer: React.Dispatch<React.SetStateAction<PlayerType>>;
	curPrefix: CurrencyPrefix;
}) {
	const pGold = player.gold;

	const BASE_COST = 100n * 100n;
	const MULTIPLIER_NUM = 145n;
	const MULTIPLIER_DEN = 100n;
	let uGold = BASE_COST;
	for (let i = 0; i < player.clickUpgrades; i++) {
		uGold = (uGold * MULTIPLIER_NUM) / MULTIPLIER_DEN;
	}
	return (
		<div className='earnings-container'>
			<div className='earnings-buttons-container'>
				<div className='click-to-earn'>
					<button
						onClick={() => {
							console.log(player.gold);
							setPlayer(prev => ({
								...prev,
								gold: prev.gold + (100n + BigInt(prev.clickUpgrades) * 100n),
								totalClicks: prev.totalClicks + 1,
								totalEarned: prev.totalEarned + (100n + BigInt(prev.clickUpgrades) * 100n),
							}));
						}}
					>
						CLICK TO EARN
					</button>
				</div>

				<div className='upgrade-click'>
					<button
						onClick={() => {
							if (pGold >= uGold) {
								setPlayer(prev => ({
									...prev,
									clickUpgrades: prev.clickUpgrades + 1,
									gold: prev.gold - uGold,
								}));
							}
						}}
					>
						<big>UPGRADE CLICK</big>
						<p>costs: {curPrefix + formatBigInt(uGold)}</p>
					</button>
				</div>
			</div>
			<div className='earnings-overview'>
				<div>Name: {player.name}</div>
				<div>Total Earned: {curPrefix + formatBigInt(player.totalEarned)}</div>
				<div>Click Upgrades: {player.clickUpgrades}</div>
				<div>Total Clicks: {player.totalClicks}</div>
			</div>
		</div>
	);
}

export default EarningsScreen;
