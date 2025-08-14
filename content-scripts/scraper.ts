(() => {
  chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    if ('code' in message && message['code'] === 'scrap') {
      const input = message['input'] as {
        nameTarget: string;
        illustrationTarget: string;
        instructionsTarget: string;
      };

      const nameElementContent =
        document.querySelector(`.${input.nameTarget}`)?.textContent?.trim() ?? null;
      const [, name = '', portionsMatch = ''] =
        nameElementContent?.match(/^(.*)\s+\((\d+)\s+\w+\)/i) ?? [];

      const illustrationElement = document.querySelector(`.${input.illustrationTarget}`);
      const illustrationUrl = illustrationElement
        ? extractIllustrationUrl(illustrationElement)
        : null;

      const instructionsElement = getInstructionsElement(input.instructionsTarget);
      const instructions = instructionsElement ? extractInstructions(instructionsElement) : null;

      if (!illustrationUrl || !instructions) {
        throwFailedScrapingError();
      }

      sendResponse({
        name,
        portionsCount: parseInt(portionsMatch, 10) || 1,
        illustrationUrl,
        instructions,
      });
    }

    return true;
  });
})();

function extractIllustrationUrl(element: Element): string | null {
  const style = window.getComputedStyle(element);
  const match = style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
  return match ? match[1] : null;
}

function getInstructionsElement(target: string): Element | null {
  const landmarkElement = Array.from(document.querySelectorAll(`.${target}`)).find(
    element => element.textContent?.trim() === 'Préparations',
  );

  if (!landmarkElement) {
    throwFailedScrapingError();
  }

  let sibling = landmarkElement.nextElementSibling;

  while (sibling && !sibling.querySelector('p')) {
    sibling = sibling.nextElementSibling;
  }

  return sibling;
}

function extractInstructions(element: Element): string | null {
  const paragraphs = Array.from(element.querySelectorAll('p'));

  return paragraphs
    .filter((_, index) => index !== paragraphs.length - 1)
    .map(instructionParagraph => instructionParagraph.textContent?.trim())
    .filter(Boolean)
    .join('\n\n');
}

function throwFailedScrapingError(): never {
  throw new Error('Scraping failed');
}
