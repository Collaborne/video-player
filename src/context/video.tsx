import { RefObject, createContext } from 'react';
import type ReactPlayer from 'react-player';

import { CorePlayerProps } from '../components/core-player/CorePlayer';
import {
	FullscreenApi,
	Highlight,
	ReactPlayerProps,
	VideoApi,
	MediaState,
} from '../types';

export interface VideoContext {
	/** A collection of getters, setters, emitters for the video  */
	api?: VideoApi;
	/** Props that will be provided to ReactPlayer */
	reactPlayerProps?: ReactPlayerProps;
	/** Video state */
	state?: MediaState;
	/** Instance ref for the ReactPlayer */
	reactPlayerRef?: RefObject<ReactPlayer>;
	/** Ref to the container of the <video>. Used mostly for fullscreen */
	videoContainerRef: RefObject<HTMLDivElement>;
	/** Fullscreen API getter and setters */
	fullScreenApi?: FullscreenApi;
	/** Blending colors for highlights presented in `<ProgressBar` */
	getHighlightColorBlended?: CorePlayerProps['getHighlightColorBlended'];
	/** Blending colors for highlights presented in `<ProgressBar` */
	onContext?: (context: VideoContext) => void;
	highlights?: Highlight[];
}

/** A React Context - to share video api through components */
export const VideoContext = createContext<VideoContext | null>(null);
