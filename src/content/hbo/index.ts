namespace Hbo {
	const attemptSkip = () => {
		const collection = document.querySelectorAll('[data-testid="SkipButton"]');
		const buttons = [].map.call(collection, (l) => l) as HTMLElement[];
		buttons.forEach((btn) => {
			btn.click();
		});
	};

	setInterval(attemptSkip, 250);
}
