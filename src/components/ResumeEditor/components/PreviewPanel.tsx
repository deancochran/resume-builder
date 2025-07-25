"use client";
import ResumePreview from "@/components/ResumePreview";
import { cx } from "class-variance-authority";
import { PreviewPanelProps } from "../types";

export function PreviewPanel({
  markdown,
  css,
  styles,
  resumePreviewRef,
  isVisible,
}: PreviewPanelProps) {
  return (
    <div
      className={cx(
        "absolute inset-0 flex flex-col justify-between",
        isVisible ? "block" : "hidden",
      )}
    >
      <div className="relative flex-1 h-full overflow-hidden">
        <ResumePreview
          ref={resumePreviewRef}
          markdown={markdown}
          styles={styles}
          customCss={css}
        />
      </div>
    </div>
  );
}
