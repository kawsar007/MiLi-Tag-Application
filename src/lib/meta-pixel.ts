declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const trackMetaEvent = (
  event: string,
  data?: Record<string, unknown>,
) => {
  if (typeof window === "undefined") return;

  // console.log("[Meta Pixel]", event, data); // Log the event and data to the console for debugging purposes

  if (!window.fbq) {
    console.warn("Meta Pixel is not initialized yet.");
    return;
  }

  window.fbq("track", event, data);
};