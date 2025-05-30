import {type RefObject, useEffect, useState} from "react";

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export function useIsVisible(ref: RefObject<HTMLElement | null>, options?: IntersectionObserverInit): boolean {
    const [isIntersecting, setIntersecting] = useState<boolean>(false);

    useEffect(() => {
        // Create an IntersectionObserver to observe the ref's visibility
        const observer = new IntersectionObserver(
            // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
            (entryList: Array<IntersectionObserverEntry>): void => {
                setIntersecting(entryList.at(0)?.isIntersecting ?? false);
            },
            options
        );

        const {current: observableNode} = ref;

        if (observableNode) {
            // Start observing the element
            observer.observe(observableNode);
        }

        // Cleanup the observer when the component unmounts or ref changes
        return (): void => {
            observer.disconnect();
        };
    }, [ref, options]);

    return isIntersecting;
}
