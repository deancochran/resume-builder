import { ResumePreviewRef } from "@/components/ResumePreview";
import { ResumeStyles } from "@/lib/utils/styles";
import { Resume } from "@/localforage";
import type { editor } from "monaco-editor";

// Add custom properties to HTMLDivElement type
declare global {
  interface HTMLDivElement {
    getContentForPrint?: (content: string) => string;
    getScopedSelector?: (selector: string) => string;
    customProperties?: Record<string, string>;
  }
}

// Monaco Editor Range class
export class IRange {
  endColumn: number;
  endLineNumber: number;
  startColumn: number;
  startLineNumber: number;

  constructor(
    endColumn: number,
    endLineNumber: number,
    startColumn: number,
    startLineNumber: number,
  ) {
    this.endColumn = endColumn;
    this.endLineNumber = endLineNumber;
    this.startColumn = startColumn;
    this.startLineNumber = startLineNumber;
  }
}

// AI Modification types
export type Modification = {
  contentType: "markdown" | "css";
  operation: "replace" | "insert" | "append" | "prepend";
  targetContent?: string;
  isRegex?: boolean;
  regexFlags?: string;
  newContent: string;
  position?: {
    line?: number | null;
    column?: number | null;
  };
  reason?: string;
  index?: number;
};

// Tab types
export type EditorTab = "markdown" | "css";
export type PreviewTab = "preview";
export type MobileTab = "markdown" | "css" | "preview";

// Component prop types
export type ResumeEditorProps = {
  resume: Resume;
};

export type EditorMountHandler = (
  ref: React.MutableRefObject<editor.IStandaloneCodeEditor | null>,
  setter: (value: string) => void,
) => (diffEditor: editor.IStandaloneDiffEditor) => void;

// Hook return types
export type UseResumeEditorsReturn = {
  modifiedMarkdown: string;
  modifiedCss: string;
  modifyMarkdown: (value: string) => void;
  modifyCss: (value: string) => void;
  modifiedMarkdownEditorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
  modifiedCssEditorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
  createEditorMount: EditorMountHandler;
  applyModification: (modification: Modification) => void;
};

export type UseResumeActionsReturn = {
  isDeleting: boolean;
  isPrinting: boolean;
  isDuplicating: boolean;
  handleDelete: () => Promise<void>;
  handlePrint: () => void;
  handleDuplicate: () => Promise<void>;
  handleSave: () => Promise<void>;
  isSaving: boolean;
  isDirty: boolean;
};

export type UseTabManagerReturn = {
  editorsTab: EditorTab;
  previewTab: PreviewTab;
  mobileTab: MobileTab;
  setEditorsTab: (tab: EditorTab) => void;
  setPreviewTab: (tab: PreviewTab) => void;
  setMobileTab: (tab: MobileTab) => void;
};



// Shared editor state
export type EditorState = {
  markdown: string;
  css: string;
  modifiedMarkdown: string;
  modifiedCss: string;
  sanitizedMarkdown: string;
  sanitizedCSS: string;
  styles: ResumeStyles;
  setStyles: (styles: ResumeStyles) => void;
};

// Component-specific props
export type ResumeHeaderProps = {
  title: string;
  onTitleChange: (title: string) => void;
  updatedAt: Date | null;
  resumeId: string;
  isSaving: boolean;
  isDirty: boolean;
  isPrinting: boolean;
  isDuplicating: boolean;
  isDeleting: boolean;
  onSave: () => void;
  onPrint: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
};

export type EditorTabsProps = {
  activeTab: EditorTab;
  onTabChange: (tab: EditorTab) => void;
};

export type PreviewTabsProps = {
  activeTab: PreviewTab;
  onTabChange: (tab: PreviewTab) => void;
};

export type MobileTabsProps = {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
};

export type MarkdownEditorProps = {
  originalMarkdown: string;
  modifiedMarkdown: string;
  onMount: (diffEditor: editor.IStandaloneDiffEditor) => void;
  theme: string | undefined;
  isVisible: boolean;
};

export type CSSEditorProps = {
  originalCss: string;
  modifiedCss: string;
  onMount: (diffEditor: editor.IStandaloneDiffEditor) => void;
  theme: string | undefined;
  isVisible: boolean;
  styles: ResumeStyles;
  onStylesChange: (styles: ResumeStyles) => void;
};

export type PreviewPanelProps = {
  markdown: string;
  css: string;
  styles: ResumeStyles;
  resumePreviewRef: React.RefObject<ResumePreviewRef | null>;
  isVisible: boolean;
};

