import { Forward10Outlined, Replay10Outlined } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { FC } from 'react';

import { toTimestamp } from '../../utils/time';
import { FullscreenEnterIcon, FullscreenExitIcon, PiPIcon } from '../icons';

import {
	PlayPauseReplay,
	PlaybackRateButton,
	VolumeBarStyled,
	VolumeIcon,
} from './components';
import { useBottomControlPanelHook } from './useBottomControlPanelHook';
import { useBottomControlPanelStyles } from './useBottomControlPanelStyles';

const SECONDS_MULTIPLIER = 1000;

export interface BottomControlPanelProps {
	className?: string;
}

export const BottomControlPanel: FC<BottomControlPanelProps> = ({
	className,
}) => {
	const {
		currentTime,
		duration,
		playbackRate,
		volume,
		isFinished,
		isMuted,
		isPlaying,
		isFullscreen,
		showFullscreenIcon,
		showPipIcon,
		showPlaybackRate,
		showVolume,
		onFwd,
		onPlay,
		onRwd,
		onStop,
		onPip,
		onFullscreen,
		onSetPlaybackRate,
		onVolumeChange,
		onToggleClick,
	} = useBottomControlPanelHook();

	// Bottom panel styles
	const { wrapper, gridCentered, timeStampText, playBackRateBtn } =
		useBottomControlPanelStyles().classes;

	return (
		<Grid
			container
			className={clsx(wrapper, className)}
			alignItems="center"
			justifyContent="space-between"
			direction="row"
		>
			<Grid item className={gridCentered} xs>
				<Grid item className={gridCentered} xs justifyContent="flex-start">
					{/*  Video Playing Statuses: Play-Pause-Replay */}
					<PlayPauseReplay
						isFinished={isFinished}
						isPlaying={isPlaying}
						onPlay={onPlay}
						onStop={onStop}
						onReplay={onPlay}
						svgIconSize="medium"
					/>
					{/* Rewind Button */}
					<IconButton size="medium" onClick={onRwd}>
						<Replay10Outlined fontSize="medium" />
					</IconButton>
					{/* Forward Button */}
					<IconButton size="medium" onClick={onFwd}>
						<Forward10Outlined fontSize="medium" />
					</IconButton>
					{/* Volume Slider */}
					{showVolume && (
						<Grid className={gridCentered}>
							<IconButton size="medium" onClick={onToggleClick}>
								<VolumeIcon fontSize="medium" volume={isMuted ? 0 : volume} />
							</IconButton>
							<VolumeBarStyled
								min={0}
								max={100}
								value={volume}
								size="small"
								onChange={onVolumeChange}
							/>
						</Grid>
					)}
				</Grid>
			</Grid>
			<Grid item className={gridCentered} xs justifyContent="center">
				{/* Current Time / Duration */}
				<Typography variant="body2" className={timeStampText} color="inherit">
					{toTimestamp(currentTime * SECONDS_MULTIPLIER)} /{' '}
					{toTimestamp(duration * SECONDS_MULTIPLIER)}
				</Typography>
			</Grid>
			<Grid item className={gridCentered} xs justifyContent="flex-end">
				{/* Playback Rate */}
				{showPlaybackRate && (
					<PlaybackRateButton
						playbackRate={playbackRate}
						onChangeRate={onSetPlaybackRate}
						variant="text"
						className={playBackRateBtn}
					/>
				)}
				{/* Picture In Picture */}
				{showPipIcon && (
					<IconButton size="medium" onClick={onPip}>
						<PiPIcon fontSize="medium" />
					</IconButton>
				)}
				{/* Fullscreen mode */}
				{showFullscreenIcon && (
					<IconButton size="medium" onClick={onFullscreen}>
						{isFullscreen ? (
							<FullscreenExitIcon fontSize="medium" />
						) : (
							<FullscreenEnterIcon fontSize="medium" />
						)}
					</IconButton>
				)}
			</Grid>
		</Grid>
	);
};
