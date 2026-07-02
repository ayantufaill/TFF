import { useState } from "react";
import { MessageSquareQuote } from "lucide-react";
import TestimonialSubmission from "./TestimonialSubmission";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

interface TestimonialReviewModalProps {
  mainCourseId: string;
  courseName: string;
}

export default function TestimonialReviewModal({
  mainCourseId,
  courseName,
}: TestimonialReviewModalProps) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="flex justify-center">
        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="h-12 rounded-xl bg-[#1B2A4A] px-6 font-bold text-white hover:bg-[#122038]"
        >
          <MessageSquareQuote className="w-5 h-5" />
          Share Your Review
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="w-[calc(100vw-24px)] max-w-2xl border-0 bg-transparent p-0 shadow-none"
          style={{ maxHeight: "92vh", overflowY: "auto" }}
        >
          <DialogTitle className="sr-only">Share your course review</DialogTitle>
          <DialogDescription className="sr-only">
            Submit a written review with an optional photo or video.
          </DialogDescription>

          <div className="relative">
            <TestimonialSubmission
              mainCourseId={mainCourseId}
              courseName={courseName}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
