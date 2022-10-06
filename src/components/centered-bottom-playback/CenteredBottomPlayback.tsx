import { ButtonProps } from '@mui/material';
import { FC } from 'react';

import { useVideoStore } from '../../context';
import { PLAYBACK_RATES } from '../../utils/constants';
import { MultiplySymbol } from '../../utils/MultiplySymbol';

import { PlaybackRateButtonStyled } from './components/PlaybackRateButtonStyled';
import { useCenteredBottomPlaybackStyles } from './useCenteredBottomPlaybackStyles';

interface PlayBackButtonProps extends ButtonProps {
	onChangeRate: (playbackRate: number) => void;
	playbackRate: number;
	active: number;
}

const PlayBackButton: FC<PlayBackButtonProps> = ({
	playbackRate,
	onChangeRate,
	active,
	...props
}) => {
	const onClick = () => {
		onChangeRate(playbackRate);
	};

	const isActive = active === playbackRate;

	return (
		<PlaybackRateButtonStyled
			isActive={isActive}
			onClick={onClick}
			variant="text"
			color="primary"
			size="medium"
			data-is-active={isActive}
			{...props}
		>
			{playbackRate}
			<MultiplySymbol />
		</PlaybackRateButtonStyled>
	);
};

export interface CenteredBottomPlaybackProps {}

export const CenteredBottomPlayback: FC<CenteredBottomPlaybackProps> = () => {
	const hasStarted = useVideoStore(state => state.hasPlayedOrSeeked);
	const playbackRate = useVideoStore(state => state.playbackRate);
	const setPlaybackRate = useVideoStore(state => state.setPlaybackRate);

	const onChangePlaybackRate = (rate: number) => {
		setPlaybackRate(rate);
	};

	const { wrapper, playbackWrapper } =
		useCenteredBottomPlaybackStyles().classes;

	if (hasStarted) {
		return null;
	}

	return (
		<div className={wrapper} data-testid="c-playbackRate">
			<div className={playbackWrapper}>
				{PLAYBACK_RATES.map(item => (
					<PlayBackButton
						key={item}
						active={playbackRate}
						onChangeRate={onChangePlaybackRate}
						playbackRate={item}
						data-testid={`c-playbackRate-${playbackRate}`}
					/>
				))}
			</div>
		</div>
	);
};
