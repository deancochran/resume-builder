import ResumeEditorLoadingSkeleton from "@/components/loading/ResumeEditorLoadingSkeleton";
import ResumeEditor from "@/components/ResumeEditor";
import { selectResumeSchema } from "@/db/schema";
import { getResume } from "@/lib/actions/resume";
import { Suspense } from "react";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ filename: string }>;
}) {
  const { filename } = await params;

  const resume = await getResume(filename);
  if (!resume) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Resume not found</h2>
          <p>
            The resume you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  const validation = selectResumeSchema.safeParse(resume);

  if (!validation.success) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Invalid resume data</h2>
          <p>The resume data is corrupted or in an invalid format.</p>
        </div>
      </div>
    );
  }
  return (
    <Suspense fallback={<ResumeEditorLoadingSkeleton />}>
      <ResumeEditor resume={resume} />
    </Suspense>
  );
}
