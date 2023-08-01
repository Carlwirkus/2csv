import Dropzone from "react-dropzone";
import { useFileUpload } from "@/src/FileUpload/hooks/useFileUpload";
import { ReceiptIcon } from "lucide-react";

export type Upload = { file: File; temporary_url: string };
type FileUploaderProps = {
  onUpload: (uploads: Upload[]) => void;
};
export function FileUploader({ onUpload }: FileUploaderProps) {
  const { mutateAsync } = useFileUpload();

  return (
    <Dropzone
      accept={{
        "image/jpeg": [],
        "image/png": [],
      }}
      onDrop={async (acceptedFiles, fileRejections, event) => {
        const files = await mutateAsync(acceptedFiles);
        onUpload(files);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="mx-auto flex w-80 cursor-pointer flex-col items-center rounded-md border border-dashed border-gray-200 bg-gray-100/50 p-6"
        >
          <ReceiptIcon className="h-10 w-10 text-blue-500" />
          <input {...getInputProps()} />
          <p className="mt-1">Drag & Drop</p>
          <p>
            or <span className="text-blue-500 hover:underline">browse</span>
          </p>

          <p className="mt-3 text-xs text-gray-500">Supports: JPEG, JPG, PNG</p>
        </div>
      )}
    </Dropzone>
  );
}
