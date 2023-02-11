namespace Netflix {
	const skipButtonClass = "watch-video--skip-content-button";

	const attemptSkip = () => {
		const collection = document.getElementsByClassName(skipButtonClass);
		const buttons = [].map.call(collection, (l) => l) as HTMLElement[];
		buttons.forEach((btn) => {
			if (btn.tagName === "BUTTON") btn.click();
		});
	};

	setInterval(attemptSkip, 250);
}
