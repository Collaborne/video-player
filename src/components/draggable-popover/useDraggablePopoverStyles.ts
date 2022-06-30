import { makeStyles } from '@mui/styles';

interface UseDraggablePopoverStylesProps {
	isExpanded: boolean;
}

export const useDraggablePopoverStyles = makeStyles(theme => ({
	paper: ({ isExpanded }: UseDraggablePopoverStylesProps) => ({
		height: '100%',
		width: '100%',
		display: 'inline-block',
		position: !isExpanded ? 'sticky' : 'initial',
		zIndex: 9999,
		pointerEvents: 'auto',
		overflow: 'hidden',
		margin: 0,
	}),
	portalWrapper: ({ isExpanded }: UseDraggablePopoverStylesProps) => ({
		height: isExpanded ? 'inherit' : `calc(100vh - ${theme.spacing(4)})`,
		width: isExpanded ? '100%' : `calc(100vw - ${theme.spacing(4)})`,
		zIndex: isExpanded ? 0 : 9999,
		background: 'transparent',
		position: isExpanded ? 'relative' : 'fixed',
		top: isExpanded ? 0 : theme.spacing(2),
		left: isExpanded ? 0 : theme.spacing(2),
		pointerEvents: 'none',
		padding: 0,
		margin: 0,
	}),
	progressBar: {
		position: 'absolute',
		bottom: 0,
		borderRadius: 'unset',

		'& .MuiSlider-thumb': {
			width: theme.spacing(0.75),
			height: theme.spacing(0.75),
		},
	},
	resizeSquares: {
		pointerEvents: 'auto',
	},
}));
