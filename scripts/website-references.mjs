export function hasObsoleteWebsiteReference(text, siteUrl) {
  const configuredHost = new URL(siteUrl).hostname;
  const legacyReferences = text.matchAll(/(?:https?:)?\/\/((?:www\.)?ilsevandenbroeck\.be)(?![\w.-])/gi);
  return [...legacyReferences].some(([, hostname]) => hostname.toLowerCase() !== configuredHost);
}
