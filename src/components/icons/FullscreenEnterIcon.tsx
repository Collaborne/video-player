import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

/**
 * Wrapper that holds all the UI Components for Controls
 * @category React Component
 * @category UI Controls
 * @category Custom Icons
 */
export const FullscreenEnterIcon: FC<SvgIconProps> = props => (
	<SvgIcon viewBox="0 0 24 24" {...props}>
		<path d="M6.16666 14.3333H3.83333V20.1666H9.66666V17.8333H6.16666V14.3333ZM3.83333 9.66665H6.16666V6.16665H9.66666V3.83331H3.83333V9.66665ZM17.8333 17.8333H14.3333V20.1666H20.1667V14.3333H17.8333V17.8333ZM14.3333 3.83331V6.16665H17.8333V9.66665H20.1667V3.83331H14.3333Z" />
	</SvgIcon>
);
