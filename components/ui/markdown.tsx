'use client';

import React from 'react';

type MarkdownProps = {
  content: string;
};

// Very small markdown renderer: supports headings (#, ##, ###), lists (-), inline code `code`, and code fences ```
export function Markdown({ content }: MarkdownProps) {
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
        <pre key={`code-${i}`} className="rounded-md bg-muted p-4 overflow-auto text-sm">
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
            <li key={idx}>{it}</li>
          ))}
        </ul>
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
      const paragraph = paras.join(' ');
      // If inline backticks are unmatched, strip them to avoid displaying stray ` characters
      const backtickCount = (paragraph.match(/`/g) || []).length;
      if (backtickCount < 2 || backtickCount % 2 !== 0) {
        elements.push(
          <p key={`p-${i}`} className="my-3">
            {paragraph.replace(/`+/g, '')}
          </p>
        );
      } else {
        // Inline code replacement: `code` -> <code>code</code>
        const parts = paragraph.split(/(`[^`]+`)/g);
        elements.push(
          <p key={`p-${i}`} className="my-3">
            {parts.map((part, idx) => {
              if (part.startsWith('`') && part.endsWith('`')) {
                return (
                  <code key={idx} className="px-1 py-0.5 rounded bg-muted text-sm">
                    {part.slice(1, -1)}
                  </code>
                );
              }
              return <span key={idx}>{part}</span>;
            })}
          </p>
        );
      }
    }
    // skip blank line
    i++;
  }
  return <div className="prose dark:prose-invert max-w-none">{elements}</div>;
}


