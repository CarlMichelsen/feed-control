namespace Youtube {
	const guideSectionRendererTagName = "ytd-guide-section-renderer";
	const miniGuideSectionRendererTagName = "ytd-mini-guide-entry-renderer";
	const richShelfRendererTagName = "ytd-rich-shelf-renderer";
	const menuItemTagName = "ytd-guide-entry-renderer";
	let interval: number | null = null;

	const toHtmlArray = (elements: HTMLCollectionOf<Element>): HTMLElement[] => {
		return [].map.call(elements, (l) => l) as HTMLElement[];
	};

	const getElementsByTagName = (tagName: string): HTMLElement[] => {
		const collection = document.getElementsByTagName(tagName);
		return toHtmlArray(collection);
	};

	const loaded = () => {
		const sections = getElementsByTagName(guideSectionRendererTagName);
		const miniItems = getElementsByTagName(miniGuideSectionRendererTagName);
		const richShelves = getElementsByTagName(richShelfRendererTagName);

		const shouldHideShelf =
			window.location.pathname.trim().toLowerCase() === "/" && !!richShelves[0];
		if (shouldHideShelf) {
			richShelves[0].setAttribute("hidden", "");
		}

		if (!!miniItems[1]) {
			miniItems[1].setAttribute("hidden", "");
			if (interval !== null) clearInterval(interval);
		}

		if (!!sections[0]) {
			const sectionItems = toHtmlArray(
				sections[0].getElementsByTagName(menuItemTagName)
			);
			if (!!sectionItems[1]) {
				sectionItems[1].setAttribute("hidden", "");
				if (interval !== null) clearInterval(interval);
			}
		}
	};

	const startsWith = (str: string, startsWith: string) => {
		const start = str.substring(0, startsWith.length);
		return start === startsWith;
	};

	const panicIfShort = () => {
		const path = window.location.pathname.toLowerCase().trim();
		if (startsWith(path, "/shorts")) {
			console.error("No more shorts for you!");
			history.back();
		}
	};

	const changedPage = (url: string) => {
		panicIfShort();
	};

	let prevUrl = window.location.href;
	const forceCheckUrlBecauseYoutube = () => {
		const url = window.location.href;
		if (prevUrl !== url) {
			changedPage(url);
			prevUrl = url;
		}
	};

	panicIfShort();
	interval = setInterval(loaded, 50);
	setInterval(forceCheckUrlBecauseYoutube, 50);
}
