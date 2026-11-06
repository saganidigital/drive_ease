/**
 * Global Frame Cache & GPU Pre-decode Manager
 * Stores all 240 pre-decoded HTMLImageElement objects in GPU memory
 */
export const TOTAL_FRAMES = 240;
export const frameImages = new Array(TOTAL_FRAMES);

export const getFrameSrc = (idx) => `/frames/${idx}%20frame.webp`;

let isPreloaded = false;

export async function preloadAndDecodeFrames(onProgress) {
  if (isPreloaded) {
    if (onProgress) onProgress(100);
    return;
  }

  let decodedCount = 0;
  const queue = Array.from({ length: TOTAL_FRAMES }, (_, i) => i + 1);
  const concurrency = 16; // Optimal concurrent download & decode threads

  const loadAndDecode = async (idx) => {
    const img = new Image();
    img.src = getFrameSrc(idx);
    frameImages[idx - 1] = img;

    try {
      if ('decode' in img) {
        await img.decode();
      } else {
        await new Promise((res) => {
          img.onload = res;
          img.onerror = res;
        });
      }
    } catch {
      // Graceful fallback if a frame decode is interrupted
    }

    decodedCount++;
    const pct = Math.round((decodedCount / TOTAL_FRAMES) * 100);
    if (onProgress) onProgress(pct);
  };

  const runWorker = async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      if (item) await loadAndDecode(item);
    }
  };

  await Promise.all(Array.from({ length: concurrency }, () => runWorker()));
  isPreloaded = true;
}

