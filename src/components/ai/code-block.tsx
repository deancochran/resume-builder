"use client";

interface CodeBlockProps {
  node?: Element; // 'node' might be optional or might have a specific structure
  // from the AST. Check the library's documentation.
  inline?: boolean; // Often optional with a default
  className?: string; // Often optional
  children: React.ReactNode; // A common approach, then extract string
  // OR, more specifically if you know children is always the code string:
  // children: string | string[];
}

export function CodeBlock({
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) {
  if (!inline) {
    return (
      <div className="not-prose flex flex-col">
        <pre
          {...props}
          className={`text-sm w-full overflow-x-auto dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl dark:text-zinc-50 text-zinc-900`}
        >
          <code className="whitespace-pre-wrap break-words">{children}</code>
        </pre>
      </div>
    );
  } else {
    return (
      <code
        className={`${className} text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md`}
        {...props}
      >
        {children}
      </code>
    );
  }
}
