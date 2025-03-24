import { generateObfuscatedId } from './randomId';

export const autoInjectRandomIds = (
  tags = ['div', 'input', 'label', 'form', 'button'],
  force = false,
  excludedIds = ['root', 'show', 'wldrout']
) => {
  if (typeof document === 'undefined') return;

  tags.forEach((selector) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      const tag = selector.toLowerCase();
      const isExcluded = el.id && excludedIds.includes(el.id);
      if (isExcluded) return;

      // Generate unique IDs for each attribute
      const id = generateObfuscatedId(`${tag}-id`);
      const dataUia = generateObfuscatedId(`${tag}-uia`);
      const describedBy = generateObfuscatedId(`${tag}-desc`);
      const htmlFor = generateObfuscatedId(`${tag}-for`);

      // ID
      if (force || !el.id) {
        el.setAttribute('id', id);
      }

      // data-uia
      el.setAttribute('data-uia', dataUia);

      // aria-describedby
      el.setAttribute('aria-describedby', describedBy);

      // htmlFor and for (for labels)
      if (tag === 'label') {
        el.setAttribute('htmlFor', htmlFor);
        el.setAttribute('for', htmlFor);
      }
    });
  });
};
