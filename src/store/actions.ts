import { VideoActions } from '../types/actions';
import { getVideoEl } from '../utils';

export const videoActions: VideoActions = {
	// all public actions (not prefixed with `_`)
	// set "lastActivityRef" to a new Date
	// lastActivityRef is used to figure out when to hide/show player controls.
	play: state => {
		state.emitter.emit('play');

		const video = getVideoEl(state);

		if (
			video?.currentTime &&
			(video.currentTime >= state.endTime ||
				video.currentTime < state.startTime)
		) {
			video.currentTime = state.startTime;
			state.playPromiseRef.current = video?.play();
			return {
				playing: true,
				currentTime: state.startTime,
				currentRelativeTime: 0,
				hasPlayedOrSeeked: true,
			};
		}

		if (video) {
			state.playPromiseRef.current = video.play();
		}

		return { playing: true, hasPlayedOrSeeked: true };
	},

	setNewBounds: (state, { startTime, endTime }) => {
		// Do nothing if time hasn't changed.
		if (state.startTime === startTime && state.endTime === endTime) {
			return state;
		}

		const video = getVideoEl(state);
		if (video) {
			video.currentTime = startTime;
		}

		return {
			playing: false,
			currentTime: startTime,
			currentRelativeTime: 0,
			startTime,
			endTime,
			duration: endTime - startTime,
		};
	},
	pause: state => {
		state.emitter?.emit('pause');
		const video = getVideoEl(state);

		// Playing a video is async operation
		// details: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
		// pausing a video is sync: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause
		if (video && state.playPromiseRef?.current) {
			void state.playPromiseRef.current.then(() => video.pause());
		}
		return { playing: false };
	},
	mute: state => {
		state.emitter?.emit('mute');

		return {
			muted: true,
		};
	},
	unmute: state => {
		state.emitter?.emit('unnmute');

		return {
			muted: false,
		};
	},
	setLoop: (_state, loop) => ({ loop }),
	setPlaybackRate: (state, playbackRate) => {
		state.emitter?.emit('setPlaybackRate', { playbackRate });
		return { playbackRate };
	},
	setVolume: (_state, volume) => ({ volume: Math.min(Math.max(volume, 0), 1) }),
	setCurrentTime: (state, relativeSeconds) => {
		relativeSeconds = Math.min(state?.duration, Math.max(0, relativeSeconds));
		const videoEl = getVideoEl(state);
		if (videoEl) {
			const diffMs = (relativeSeconds - videoEl.currentTime) * 1000;
			videoEl.currentTime = state.startTime + relativeSeconds;
			state.emitter?.emit('seeked', { diffMs });
			state.emitter?.emit('timeupdate', {
				seconds: relativeSeconds,
				duration: state.duration,
			});
		}

		return {
			currentTime: state.startTime + relativeSeconds,
			currentRelativeTime: relativeSeconds,
			hasPlayedOrSeeked: true,
		};
	},
	setHasPipTriggeredByClick: (_state, hasPipTriggeredByClick) => ({
		hasPipTriggeredByClick,
	}),

	setStartTime: (_state, startTime) => ({ startTime }),
	setEndTime: (_state, endTime) => ({ endTime }),

	setDuration: (state, duration) => {
		if (state.duration > 0) {
			return state;
		}

		return {
			duration,
			endTime: state.startTime + duration,
			currentRelativeTime: 0,
			startTime: 0,
			currentTime: 0,
		};
	},

	requestPip: state => {
		state.emitter.emit('pipEnter');
		return {
			pip: true,
		};
	},
	exitPip: state => {
		state.emitter.emit('pipExit');
		return { pip: false };
	},
	setShowControls: (state, isUpdated) => {
		state.emitter.emit('showControls', { isUpdated });
		return { showControls: isUpdated };
	},
	setShowPipControls: (state, isUpdated) => {
		state.emitter.emit('showPipControls', { isUpdated });
		return { showPipControls: isUpdated };
	},
	// Private Actions
	_setReady: state => {
		// In safari, any seeking that happens before a video is ready is canceled as soon
		// as the video loads.
		// Counteract this by re-seeking to state time on the first ready.
		const videoEl = getVideoEl(state);
		if (videoEl && !state.ready && videoEl.currentTime !== state.currentTime) {
			videoEl.currentTime = state.currentTime;
		}
		return { ready: true };
	},
	_handleProgress: (state, currentTime) => {
		const currentRelativeTime = Math.min(
			state.endTime,
			Math.max(0, currentTime - state.startTime),
		);

		if (state.playing) {
			state.emitter?.emit('timeupdate', {
				seconds: currentRelativeTime,
				duration: state.duration,
			});
			state.emitter?.emit('progress', {
				seconds: currentRelativeTime,
				duration: state.duration,
			});
		}
		if (currentTime >= state.endTime) {
			state.emitter?.emit('end');
		}
		let { playing } = state;

		// If the currentTime is *approaching* the soft stop point but hasn't reached it yet,
		// go ahead and stop. We only receive time updates every 50ms, so we want to stop once
		// the video "almost" reaches the point.
		if (currentTime >= state.startTime + state.duration) {
			playing = false;
			state.emitter?.emit('relativeEnd');
		}

		return {
			currentTime,
			currentRelativeTime,
			playing,
		};
	},
};
