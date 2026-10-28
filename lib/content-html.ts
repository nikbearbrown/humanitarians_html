import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
// Server-only rendering. Never execute scripts or fetch resources while parsing.
const window = new JSDOM('').window;
const purifier = createDOMPurify(window as unknown as Parameters<typeof createDOMPurify>[0]);
purifier.addHook('afterSanitizeAttributes', node => {
  if (node.tagName === 'IFRAME') {
    const src = node.getAttribute('src') || '';
    try {
      const url = new URL(src);
      if (url.protocol !== 'https:' || url.username || url.password) { node.remove(); return; }
    } catch { node.remove(); return; }
    // An imported embed must not execute with this site's origin/cookies.
    node.setAttribute('sandbox', 'allow-scripts allow-forms allow-popups');
    node.setAttribute('referrerpolicy', 'no-referrer');
  }
  if (node.tagName === 'A') node.setAttribute('rel', 'noopener noreferrer');
});
export function contentHtml(value: string): string {
  return purifier.sanitize(value, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen'],
    FORBID_TAGS: ['form', 'input', 'button', 'textarea', 'select', 'style'],
    FORBID_ATTR: ['srcdoc', 'style'],
  });
}
