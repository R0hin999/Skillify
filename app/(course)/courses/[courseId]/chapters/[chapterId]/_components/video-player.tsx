"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import toast, { Toast } from "react-hot-toast";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";

interface VideoPlayerProps {
  chapterId: string;
  courseId: string;
  title: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  video: string;
}

export const VideoPlayer = ({
  chapterId,
  courseId,
  nextChapterId,
  title,
  video,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) => {
  const { data } = useSession();
  // @ts-ignore
  const userId = data?.user?.id as string;
  const [isReady, setIsReady] = useState(false);
  const confetti = useConfettiStore();
  const router = useRouter();
  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
            userId: userId,
          }
        );
      }
      if (!nextChapterId) {
        confetti.onOpen();
      }
      toast.success("Progress updated");
      router.refresh();
      if (nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="size-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="size-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          accentColor="#6d28d9"
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          src={video}
          onEnded={onEnd}
          autoPlay
        />
      )}
    </div>
  );
};
