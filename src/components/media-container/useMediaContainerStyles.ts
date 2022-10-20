import { makeStyles } from 'tss-react/mui';

export const useMediaContainerStyles = makeStyles()(theme => ({
	wrapper: {
		position: 'relative',
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		backgroundSize: 'cover',
		overflow: 'hidden',
	},
	pipText: {
		margin: theme.spacing(1, 0, 0, 2),
	},
	reactPlayer: {
		cursor: 'pointer',
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
	},
}));

export const useFilePlayerStyles = makeStyles()({
	wrapper: {
		aspectRatio: '16 / 9',
		width: '100%',
	},
});
