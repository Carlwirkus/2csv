import axios from "axios";
import { useCreateSignedUploadUrlMutation } from "@/generated";
import { useMutation } from "@tanstack/react-query";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export type UploadedFile = {
  file: File;
  temporary_url: string;
};

export function useFileUpload() {
  const { mutateAsync } = useCreateSignedUploadUrlMutation({
    onSuccess: () => {
      return;
    },
  });

  return useMutation({
    mutationKey: ["SignedS3Upload"],
    mutationFn: async (files: File[]) => {
      const controller = new AbortController();

      const { id, update, dismiss } = toast({
        title: "Uploading...",
        description: <ToastProgress files={files} />,
        duration: Infinity,
        action: (
          <ToastAction
            altText="Cancel"
            onClick={() => {
              controller.abort();
            }}
          >
            Cancel
          </ToastAction>
        ),
      });

      const promises = files.map(async (file, idx) => {
        //Create the signed url to upload
        const { createSignedStorageUrl } = await mutateAsync({});
        const headers = createSignedStorageUrl.headers;

        if ("Host" in headers) {
          delete headers.Host;
        }

        //Upload the file
        await axios.put(createSignedStorageUrl.url, file, {
          signal: controller.signal,
          headers: {
            ...createSignedStorageUrl.headers,
            "Content-Type": file.type,
          },
          withCredentials: false,
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent);

            update({
              id,
              description: (
                <ToastProgress
                  files={files}
                  progressUpdate={{
                    index: idx,
                    percent: (progressEvent.progress ?? 0) * 100,
                  }}
                />
              ),
            });
          },
        });

        return {
          file,
          temporary_url: createSignedStorageUrl.key,
        };
      });

      const res = await Promise.all(promises);
      dismiss();
      return res;
    },
  });
}

function ToastProgress({
  files = [],
  progressUpdate,
}: {
  files?: File[];
  progressUpdate?: { index: number; percent: number };
}) {
  const [progress, setProgress] = useState(
    Array.from({ length: files.length }, () => 0)
  );

  useEffect(() => {
    if (progressUpdate) {
      setProgress((prev) => {
        const newProgress = [...prev];
        newProgress[progressUpdate.index] = progressUpdate.percent;
        return newProgress;
      });
    }
  }, [progressUpdate]);

  return (
    <ul>
      {files.map((file, index) => {
        return (
          <li key={file.name}>
            {file.name} {progress[index].toFixed(0)}%
          </li>
        );
      })}
    </ul>
  );
}
