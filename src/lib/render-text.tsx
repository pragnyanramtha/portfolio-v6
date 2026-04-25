import React from 'react';

/**
 * Parses markdown-like bold syntax (**text**) and returns an array of React elements
 */
export function renderBoldText(text: string) {
  if (!text) return null;
  
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-primary italic underline-offset-4">
          {part.slice(2, -2)}
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
