import React from 'react';

/**
 * Parses markdown-like bold syntax (**text**) and returns an array of React elements
 */
export function renderBoldText(text: string) {
  if (!text) return null;
  
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      const linkMatch = /^\[(.+?)\]\((.+?)\)$/.exec(inner);
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary italic underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return (
        <strong key={index} className="font-bold text-primary italic underline-offset-4">
          {inner}
        </strong>
      );
    }
    return part;
  });
}

export function renderBlogMarkdown(text: string) {
  if (!text) return null;

  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}
