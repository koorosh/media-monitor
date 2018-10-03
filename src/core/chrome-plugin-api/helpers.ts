export function isChromePluginContext(): boolean {
  return (!!window.chrome.identity)
}
