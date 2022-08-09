import { uuid } from 'uuidv4';

import { Highlight } from '../../types';
import { getRailSegments } from '../highlights';

function createHighlight(startTime: number, endTime: number): Highlight {
	return {
		startTime,
		endTime,
		color: '#fff',
		id: uuid(),
	};
}

describe('getRailSegments', () => {
	it('creates segments for overlapping highlights', () => {
		const highlights = [createHighlight(0, 20), createHighlight(10, 30)];

		const segments = getRailSegments(highlights, 30);

		expect(segments).toStrictEqual([
			{ start: 0, end: 10 },
			{ start: 10, end: 20 },
			{ start: 20, end: 30 },
		]);
	});

	it('creates segments before/after the highlight', () => {
		const highlights = [createHighlight(10, 20)];

		const segments = getRailSegments(highlights, 30);

		expect(segments).toStrictEqual([
			{ start: 0, end: 10 },
			{ start: 10, end: 20 },
			{ start: 20, end: 30 },
		]);
	});

	it('creates segments for a highlight that starts at the beginning of the video', () => {
		const highlights = [createHighlight(0, 20)];

		const segments = getRailSegments(highlights, 30);

		expect(segments).toStrictEqual([
			{ start: 0, end: 20 },
			{ start: 20, end: 30 },
		]);
	});

	it('creates segments for a highlight that spans to the end of the video', () => {
		const highlights = [createHighlight(20, 30)];

		const segments = getRailSegments(highlights, 30);

		expect(segments).toStrictEqual([
			{ start: 0, end: 20 },
			{ start: 20, end: 30 },
		]);
	});

	it('returns no segments if there are no highlights', () => {
		const segments = getRailSegments([], 30);
		expect(segments).toStrictEqual([]);
	});
});
