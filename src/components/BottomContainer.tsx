import type { ActiveButtonType, ActiveInvestingButtonType } from '../types/ButtonTypes';
import './BottomContainer.css';

function BottomContainer({
	activeButton,
	setActiveButton,
	activeInvestingButton,
	setActiveInvestingButton,
}: {
	activeButton: ActiveButtonType;
	setActiveButton: React.Dispatch<React.SetStateAction<ActiveButtonType>>;
	activeInvestingButton: ActiveInvestingButtonType;
	setActiveInvestingButton: React.Dispatch<React.SetStateAction<ActiveInvestingButtonType>>;
}) {
	const buttonLabels: ActiveButtonType[] = ['INVESTING', 'BUSINESS', 'EARNINGS', 'ITEMS', 'PROFILE'];

	return (
		<div className='bottom-buttons-container'>
			{buttonLabels.map(label => (
				<button
					key={label}
					onClick={() => {
						setActiveButton(label);
						if (activeInvestingButton) {
							setActiveInvestingButton(undefined);
						}
					}}
					className={`toolbar-buttons ${activeButton === label ? 'active-button' : ''}`}
				>
					{label}
				</button>
			))}
		</div>
	);
}

export default BottomContainer;
