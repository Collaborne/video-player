import '@testing-library/jest-dom';
import { VideoContext } from '../../../context';
import {
	render,
	renderWithProviders,
	TestingVideoProvider,
	userEvent,
} from '../../../utils/testing-render';
import { DEFAULT_CONTROLS_CONFIG } from '../../controls/controls-config';
import { BottomControlPanel } from '../BottomControlPanel';

describe('<BottomControlPanel />', () => {
	const api: VideoContext['api'] = {
		play: jest.fn(),
		pause: jest.fn(),
		mute: jest.fn(),
		setCurrentTime: jest.fn(),
		setPlaybackRate: jest.fn(),
		getPictureInPicture: jest.fn(),
	};
	it('displays play button on first mount', async () => {
		const { getByTestId } = renderWithProviders(<BottomControlPanel />);
		expect(getByTestId('icon-play')).toBeInTheDocument();
	});

	it('displays pause button while the video plays', async () => {
		const { getByTestId } = renderWithProviders(<BottomControlPanel />);
		await userEvent.click(getByTestId('icon-play'));
		expect(getByTestId('icon-pause')).toBeInTheDocument();
	});

	it('click on play icon', async () => {
		const { getByTestId } = render(
			<TestingVideoProvider api={api} controlsConfig={DEFAULT_CONTROLS_CONFIG}>
				<BottomControlPanel />
			</TestingVideoProvider>,
		);
		const playButton = getByTestId('icon-play');
		await userEvent.click(playButton);
		expect(api.play).toHaveBeenCalledTimes(1);
	});

	it('click on mute icon', async () => {
		const { getByTestId } = render(
			<TestingVideoProvider api={api} controlsConfig={DEFAULT_CONTROLS_CONFIG}>
				<BottomControlPanel />
			</TestingVideoProvider>,
		);
		const volumeButton = getByTestId('icon-volume');
		await userEvent.click(volumeButton);
		expect(api.mute).toHaveBeenCalledTimes(1);
	});

	it('click on fwd icon', async () => {
		const { getByTestId } = render(
			<TestingVideoProvider api={api} controlsConfig={DEFAULT_CONTROLS_CONFIG}>
				<BottomControlPanel />
			</TestingVideoProvider>,
		);

		const fwdButton = getByTestId('icon-fwd');
		await userEvent.click(fwdButton);
		expect(api.setCurrentTime).toHaveBeenCalledTimes(1);
	});

	it('click on rwd icon', async () => {
		const { getByTestId } = render(
			<TestingVideoProvider api={api} controlsConfig={DEFAULT_CONTROLS_CONFIG}>
				<BottomControlPanel />
			</TestingVideoProvider>,
		);
		const rwdButton = getByTestId('icon-rwd');
		await userEvent.click(rwdButton);
		expect(api.setCurrentTime).toHaveBeenCalledTimes(1);
	});

	it('click on playbackRate icon', async () => {
		const { getByTestId } = render(
			<TestingVideoProvider api={api} controlsConfig={DEFAULT_CONTROLS_CONFIG}>
				<BottomControlPanel />
			</TestingVideoProvider>,
		);
		const rateBtn = getByTestId('icon-playback-rate');
		await userEvent.click(rateBtn);
		expect(api.setPlaybackRate).toHaveBeenCalledTimes(1);
	});

	it('click on pip icon', async () => {
		const { getByTestId } = render(
			<TestingVideoProvider api={api} controlsConfig={DEFAULT_CONTROLS_CONFIG}>
				<BottomControlPanel />
			</TestingVideoProvider>,
		);
		const pip = getByTestId('icon-pip');
		await userEvent.click(pip);
		// NOTE: we should test `api.setPictureInPicture` - setter for PIP mode, but it wont be called
		// because first we check if it runs in PIP mode(api.getPictureInPicture), after that we change "video-state" + calling `api.setPictureInPicture`
		expect(api.getPictureInPicture).toHaveBeenCalledTimes(1);
	});
});
