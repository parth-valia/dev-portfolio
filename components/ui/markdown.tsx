'use client';

import React from 'react';

type MarkdownProps = {
  content: string;
  className?: string;
};

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g;
const ORDERED = /^\d+\.\s+/;

// Inline marks: `code`, **bold**, *italic*; stray backticks are dropped.
function renderInline(text: string) {
  return text.split(INLINE).map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
      return <code key={idx}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={idx}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={idx}>{part.slice(1, -1)}</em>;
    return <React.Fragment key={idx}>{part.replace(/`+/g, '')}</React.Fragment>;
  });
}

// Very small markdown renderer: supports headings (#, ##, ###), lists (- and 1.), inline marks, and code fences ```
export function Markdown({ content, className }: MarkdownProps) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim().startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={`code-${i}`}>
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      i++; // skip closing ```
      continue;
    }
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="text-xl font-semibold mt-6 mb-2">
          {line.replace(/^###\s+/, '')}
        </h3>
      );
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${i}`} className="text-2xl font-semibold mt-8 mb-3">
          {line.replace(/^##\s+/, '')}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${i}`} className="text-3xl font-bold mt-8 mb-4">
          {line.replace(/^#\s+/, '')}
        </h1>
      );
      i++;
      continue;
    }
    if (line.trim().startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().replace(/^-\s+/, ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc pl-6 my-3 space-y-1">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it)}</li>
          ))}
        </ul>
      );
      continue;
    }
    if (ORDERED.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && ORDERED.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(ORDERED, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal pl-6 my-3 space-y-1">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it)}</li>
          ))}
        </ol>
      );
      continue;
    }
    // Paragraph grouping: collect until blank line
    const paras: string[] = [];
    while (i < lines.length && lines[i].trim() !== '') {
      paras.push(lines[i]);
      i++;
    }
    if (paras.length > 0) {
      elements.push(
        <p key={`p-${i}`} className="my-3">
          {renderInline(paras.join(' '))}
        </p>
      );
    }
    // skip blank line
    i++;
  }
  return <div className={className}>{elements}</div>;
}


