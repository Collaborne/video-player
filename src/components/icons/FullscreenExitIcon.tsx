import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

/**
 * Wrapper that holds all the UI Components for Controls
 * @category React Component
 * @category UI Controls
 * @category Custom Icons
 */
export const FullscreenExitIcon: FC<SvgIconProps> = props => (
	<SvgIcon viewBox="0 0 24 24" {...props}>
		<path d="M3.83334 16.6666H7.33334V20.1666H9.66667V14.3333H3.83334V16.6666ZM7.33334 7.33331H3.83334V9.66665H9.66667V3.83331H7.33334V7.33331ZM14.3333 20.1666H16.6667V16.6666H20.1667V14.3333H14.3333V20.1666ZM16.6667 7.33331V3.83331H14.3333V9.66665H20.1667V7.33331H16.6667Z" />
	</SvgIcon>
);
