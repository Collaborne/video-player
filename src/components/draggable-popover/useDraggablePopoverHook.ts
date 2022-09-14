import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import { Position, ResizeEnable } from 'react-rnd';
import useWindowSize from 'react-use/lib/useWindowSize';

import { useVideo } from '../../hooks';
import { DEFAULT_PIP_SIZE, OVERLAY_HIDE_DELAY } from '../../utils/constants';

export type Size = {
	width: string | number;
	height: string | number;
};
interface UseDraggablePopoverHookProps {
	disablePortal?: boolean;
}

interface UseDraggablePopoverHook {
	/** Default player size */
	defaultWidth: Size;
	/** Default positioning on layout */
	defaultPosition: Position;
	/** "Corners"  where we allow to start resizing */
	enableResizing: ResizeEnable;
	onMouseMove: VoidFunction;
	onMouseLeave: VoidFunction;
}

/** Space from viewport borders(vertical and horizontal) */
const POPOVER_MARGIN = 16;
const vw = window.innerWidth;
const vh = window.innerHeight;
export const useDraggablePopoverHook = ({
	disablePortal,
}: UseDraggablePopoverHookProps): UseDraggablePopoverHook => {
	const { api } = useVideo();
	const isPip = api?.getPictureInPicture?.();
	const isPaused = api?.getPaused?.();

	// Detecting mouse movements for displaying PipControls
	const [showControls, setShowControls] = useState(false);
	const onMouseLeave = debounce(() => {
		if (!isPip) {
			return;
		}
		setShowControls(false);
	}, OVERLAY_HIDE_DELAY);
	const onMouseMove = () => {
		if (!isPip) {
			return;
		}
		setShowControls(true);
	};

	// Updating video state with show controls
	useEffect(() => {
		if (isPaused && isPip) {
			setShowControls(true);
			api?.setShowPipControls?.(showControls);
			return;
		}
		if (isPip) {
			api?.setShowPipControls?.(showControls);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showControls, isPip, isPaused]);
	// Pause causes displaying controls

	// DraggablePopover DnD params:
	const windowSize = useWindowSize();

	const defaultWidth = disablePortal
		? { width: '100%', height: '100%' }
		: { ...DEFAULT_PIP_SIZE };

	const defaultPosition = (() => {
		if (disablePortal) {
			return { x: 0, y: 0 };
		}

		// Get player width + margin on 2 sides
		const pipPlayerWidth = DEFAULT_PIP_SIZE.width + POPOVER_MARGIN * 2;
		const pipPlayerHight = DEFAULT_PIP_SIZE.height + POPOVER_MARGIN * 2;

		return {
			y: (windowSize?.height || vh) - pipPlayerHight,
			x: (windowSize?.width || vw) - pipPlayerWidth,
		};
	})();

	const enableResizing = disablePortal
		? false
		: {
				topLeft: true,
				topRight: true,
				bottomLeft: true,
				bottomRight: true,
		  };
	return {
		defaultPosition,
		defaultWidth,
		enableResizing,
		onMouseMove,
		onMouseLeave,
	};
};
