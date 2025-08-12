export const illustrationBlobMaxBytesSize = 100_000;

export function isValidIllustrationBlob(blob: Blob): boolean {
  return blob.type === 'image/webp' && blob.size < illustrationBlobMaxBytesSize;
}
