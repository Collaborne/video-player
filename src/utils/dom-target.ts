import type { MutableRefObject } from 'react';
export type TargetValue<T> = T | undefined | null;

export type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> =
	| (() => TargetValue<T>)
	| TargetValue<T>
	| MutableRefObject<TargetValue<T>>;

export const getTargetElement = <T extends TargetType>(
	target: BasicTarget<T>,
	defaultElement?: T,
): TargetValue<T> => {
	if (!target) {
		return defaultElement;
	}

	let targetElement: TargetValue<T>;

	if (typeof target === 'function') {
		targetElement = target();
	} else if ('current' in target) {
		targetElement = target.current;
	} else {
		targetElement = target;
	}

	return targetElement;
};
