import { Theme } from '@mui/material/styles';
import { FC } from 'react';

import { VideoProvider } from '../../context/video';
import { ControlsConfig } from '../../types';
import { DEFAULT_CONTROLS_CONFIG } from '../controls/controls-config';
import { FileActionPanelProps } from '../file-action-panel/FileActionPanel';

import VideoContainer from './VideoContainer';

export interface VideoPlayerProps
	extends Omit<FileActionPanelProps, 'className'> {
	/** The url of the video file to be played */
	videoUrl: string;
	/** CSS class name applied to component  */
	className?: string;
	/** Configuration that enables/disables some parts of the overlay on top of the video player */
	controlsConfig?: ControlsConfig;
	/**  Used when you have multiple videos, and only one video is played at same time. *Ex: Video 1 plays, and video 2 is on pause. Playing video 2, pauses video 1*   */
	currentPlayingUrl?: string;
	/** A function that handles changing of the currentPlayingUrl */
	setCurrentPlayingUrl?: (videoUrl: string) => void;
	/** A MUI theme to control the stylization of the player . */
	theme?: Theme;
	/** CSS class name applied to the file action panel */
	actionPanelClassName?: string;
}

/** A "video-player" from the box. A result of VideoProvider and VideoContainer */
export const VideoPlayer: FC<VideoPlayerProps> = ({
	videoUrl,
	className,
	controlsConfig = DEFAULT_CONTROLS_CONFIG,
	currentPlayingUrl,
	setCurrentPlayingUrl,
	theme,
	onDelete,
	onDownload,
	removeAsCover,
	setAsCover,
	hasImageCover,
	isCover,
	actionPanelClassName,
}) => {
	const hasPlayEnabled = videoUrl === currentPlayingUrl;

	const onPlay = () => setCurrentPlayingUrl?.(videoUrl);

	return (
		<VideoProvider controlsConfig={controlsConfig}>
			<VideoContainer
				className={className}
				videoUrl={videoUrl}
				hasPlayEnabled={hasPlayEnabled}
				onPlay={onPlay}
				onDelete={onDelete}
				onDownload={onDownload}
				removeAsCover={removeAsCover}
				setAsCover={setAsCover}
				actionPanelClassName={actionPanelClassName}
				hasImageCover={hasImageCover}
				isCover={isCover}
				theme={theme}
			/>
		</VideoProvider>
	);
};
