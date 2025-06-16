function truncateText({ text = '', maxLength = 100 }: { text?: string; maxLength?: number }) {
  if (typeof text !== 'string') return '';

  if (text?.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }

  return text;
}

export default truncateText;
