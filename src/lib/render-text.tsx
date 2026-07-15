import React from 'react';

type MdToken =
  | { type: 'text'; value: string }
  | { type: 'bold'; children: MdToken[] }
  | { type: 'italic'; children: MdToken[] }
  | { type: 'link'; href: string; children: MdToken[] }
  | { type: 'code'; value: string };

/**
 * Tokenize inline markdown: **bold**, *italic*, [link](url), `code`
 */
function tokenizeInline(md: string): MdToken[] {
  const tokens: MdToken[] = [];
  // Order matters: bold before italic so ** isn't eaten as *...*
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(md))) {
    if (m.index > last) {
      tokens.push({ type: 'text', value: md.slice(last, m.index) });
    }
    if (m[1] !== undefined) {
      tokens.push({ type: 'bold', children: tokenizeInline(m[1]) });
    } else if (m[2] !== undefined) {
      tokens.push({ type: 'italic', children: tokenizeInline(m[2]) });
    } else if (m[3] !== undefined) {
      tokens.push({ type: 'link', href: m[4], children: tokenizeInline(m[3]) });
    } else if (m[5] !== undefined) {
      tokens.push({ type: 'code', value: m[5] });
    }
    last = m.index + m[0].length;
  }
  if (last < md.length) {
    tokens.push({ type: 'text', value: md.slice(last) });
  }
  return tokens;
}

function renderTokens(tokens: MdToken[]): React.ReactNode[] {
  return tokens.map((t, i) => {
    switch (t.type) {
      case 'text':
        return <React.Fragment key={i}>{t.value}</React.Fragment>;
      case 'bold':
        return (
          <strong key={i} className="font-bold text-primary underline-offset-4">
            {renderTokens(t.children)}
          </strong>
        );
      case 'italic':
        return (
          <em key={i} className="italic text-primary/80">
            {renderTokens(t.children)}
          </em>
        );
      case 'link':
        return (
          <a
            key={i}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary italic underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            {renderTokens(t.children)}
          </a>
        );
      case 'code':
        return (
          <code key={i} className="font-mono text-sm bg-primary/10 px-1.5 py-0.5 rounded">
            {t.value}
          </code>
        );
    }
  });
}

/**
 * Renders inline markdown: **bold**, *italic*, [text](url), `code`
 */
export function renderBoldText(text: string) {
  if (!text) return null;
  return <>{renderTokens(tokenizeInline(text))}</>;
}

/**
 * Renders inline markdown in blog content: **bold**, *italic*, [text](url), `code`
 * Uses the same tokenizer as renderBoldText but with blog-specific styling.
 */
export function renderBlogMarkdown(text: string) {
  if (!text) return null;
  const tokens = tokenizeInline(text);
  return <>{renderBlogTokens(tokens)}</>;
}

function renderBlogTokens(tokens: MdToken[]): React.ReactNode[] {
  return tokens.map((t, i) => {
    switch (t.type) {
      case 'text':
        return <React.Fragment key={i}>{t.value}</React.Fragment>;
      case 'bold':
        return (
          <strong key={i} className="font-semibold text-foreground">
            {renderBlogTokens(t.children)}
          </strong>
        );
      case 'italic':
        return (
          <em key={i} className="italic text-foreground/80">
            {renderBlogTokens(t.children)}
          </em>
        );
      case 'link':
        return (
          <a
            key={i}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
          >
            {renderBlogTokens(t.children)}
          </a>
        );
      case 'code':
        return (
          <code key={i} className="font-mono text-sm bg-foreground/10 px-1.5 py-0.5 rounded">
            {t.value}
          </code>
        );
    }
  });
}
