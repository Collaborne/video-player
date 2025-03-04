import { StoryFn } from '@storybook/react';
import { makeStyles } from 'tss-react/mui';

import {
	MediaPoster,
	PlayPauseReplay,
	CorePlayer,
	CorePlayerProps,
	FwdButton,
	RwdButton,
	TimeDisplay,
} from '../../src/';
import { withDemoCard, withIntl } from '../decorators';

const useStyles = makeStyles()(theme => ({
	dimension: {
		// 16:9 aspect ratio
		width: theme.spacing(90),
		height: theme.spacing(50.625),
	},
	placeholder: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	buttons: {
		position: 'absolute',
		top: '50%',
		right: '50%',
		transform: 'translate(50%,-50%)',
	},
}));

export const Customized: StoryFn<CorePlayerProps> = args => {
	const { dimension, placeholder, buttons } = useStyles().classes;
	return (
		<CorePlayer className={dimension} {...args}>
			<div className={placeholder}>
				<MediaPoster
					img="https://images.unsplash.com/photo-1533827432537-70133748f5c8"
					width="100%"
					height="100%"
				/>
				<div className={buttons}>
					<RwdButton />
					<PlayPauseReplay size="large" />
					<FwdButton />
					<TimeDisplay />
				</div>
			</div>
		</CorePlayer>
	);
};

export default {
	title: 'Audio Player',
	component: Customized,
	decorators: [withDemoCard, withIntl],
	args: {
		url: `https://assets.mixkit.co/sfx/preview/mixkit-game-show-suspense-waiting-667.mp3`,
		audioPlaceholder: undefined,
		mediaType: undefined,
	},
	argTypes: {
		url: {
			name: 'props.url',
			description: 'A media URL. Only file type supported',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: undefined },
			},
		},
		audioPlaceholder: {
			name: 'props.audioPlaceholder',
			description:
				'URL to a image to be a placeholder for audio files in PIP mode',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: undefined },
			},
		},
		mediaType: {
			name: 'props.mediaType',
			description:
				'Initial media type that will enforce to build corresponding UI ',
			table: {
				type: { summary: 'MediaType' },
				defaultValue: { summary: undefined },
			},
		},
	},
	parameters: {
		controls: { expanded: true },
	},
};
