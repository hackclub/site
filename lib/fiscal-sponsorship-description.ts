const DESCRIPTION_PREVIEW_LENGTH = 180;
const MIN_SENTENCE_BREAK_INDEX = Math.floor(DESCRIPTION_PREVIEW_LENGTH * 0.6);

export function buildOrganizationDescriptionPreview(description: string) {
  const normalizedDescription = description.replace(/\s+/g, " ").trim();

  if (normalizedDescription.length <= DESCRIPTION_PREVIEW_LENGTH) {
    return normalizedDescription;
  }

  const preview = normalizedDescription.slice(0, DESCRIPTION_PREVIEW_LENGTH);
  const sentenceBoundary = Math.max(
    preview.lastIndexOf("."),
    preview.lastIndexOf("!"),
    preview.lastIndexOf("?"),
  );

  if (sentenceBoundary >= MIN_SENTENCE_BREAK_INDEX) {
    return preview.slice(0, sentenceBoundary + 1).trim();
  }

  const wordBoundary = preview.lastIndexOf(" ");
  const cutoff =
    wordBoundary >= MIN_SENTENCE_BREAK_INDEX ? wordBoundary : DESCRIPTION_PREVIEW_LENGTH;

  return `${preview.slice(0, cutoff).trim()}...`;
}
