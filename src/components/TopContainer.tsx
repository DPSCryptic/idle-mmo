import type { PlayerType } from '../types/PlayerType';
import { formatBigInt, type CurrencyPrefix } from '../ts/utils/currencyFormating';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import './TopContainer.css';

const options = [
	{ value: '€', label: 'EUR' },
	{ value: '$', label: 'USD' },
	{ value: '£', label: 'GBP' },
];

function TopContainer({
	player,
	curPrefix,
	setCurPrefix,
	date,
}: {
	player: PlayerType;
	curPrefix: CurrencyPrefix;
	setCurPrefix: React.Dispatch<React.SetStateAction<CurrencyPrefix>>;
	date: Date;
}) {
	return (
		<div className='top-container'>
			<div className='player-money'>{curPrefix + formatBigInt(player.gold)}</div>
			<div className='top-toolbar-extra'>
				<div>{date.toLocaleDateString('nl-NL')}</div>
				<Select
					defaultValue={'€'}
					variant={'outlined'}
					size={'sm'}
					sx={{ width: 120, backgroundColor: 'lightgray', borderColor: 'red', color: 'black' }}
					onChange={(_e, newValue) => {
						setCurPrefix(newValue as CurrencyPrefix);
					}}
				>
					{options.map(option => {
						return (
							<Option key={option.label} value={option.value}>
								{option.label}
							</Option>
						);
					})}
				</Select>
			</div>
		</div>
	);
}

export default TopContainer;
