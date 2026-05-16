"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill with SSR disabled to prevent hydration errors
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something...",
  className,
}: RichTextEditorProps) {
  // Memoize modules so the editor doesn't re-render and lose focus
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link", "image", "video"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "script",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div className={`prose-editor ${className || ""}`}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
      <style jsx global>{`
        .prose-editor .quill {
          background-color: var(--card);
          border-radius: var(--radius);
        }
        .prose-editor .ql-toolbar {
          border-color: var(--border);
          border-top-left-radius: var(--radius);
          border-top-right-radius: var(--radius);
          background-color: var(--muted);
        }
        .prose-editor .ql-container {
          border-color: var(--border);
          border-bottom-left-radius: var(--radius);
          border-bottom-right-radius: var(--radius);
          min-height: 200px;
          font-family: inherit;
          font-size: 1rem;
        }
        .dark .prose-editor .ql-snow .ql-stroke {
          stroke: #fafafa;
        }
        .dark .prose-editor .ql-snow .ql-fill {
          fill: #fafafa;
        }
        .dark .prose-editor .ql-snow .ql-picker {
          color: #fafafa;
        }
      `}</style>
    </div>
  );
}
