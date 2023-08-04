"use client";

import { FileUploader, Upload } from "@/src/FileUpload/FileUploader";
import { ReceiptPreview } from "@/src/Receipts/ReceiptPreview";
import { useState } from "react";

export function HomeScreen() {
  const [imageUrls, setImageUrls] = useState<Upload[]>([]);

  return (
    <div className="mt-6">
      <FileUploader
        onUpload={(uploads) => {
          setImageUrls((old) => [...old, ...uploads]);
        }}
      />
      <ReceiptPreview
        uploads={imageUrls}
        onDelete={(idx) => {
          setImageUrls((old) => {
            const copy = [...old];
            copy.splice(idx, 1);
            return copy;
          });
        }}
      />
    </div>
  );
}
