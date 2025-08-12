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

      const instructionsElement = document.querySelector(`.${input.instructionsTarget}`);
      const instructions = instructionsElement ? extractInstructions(instructionsElement) : null;

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

function extractInstructions(element: Element): string | null {
  const instructionElements = Array.from(element.lastElementChild?.children ?? []);
  return instructionElements.map(child => child.textContent).join('\n');
}
