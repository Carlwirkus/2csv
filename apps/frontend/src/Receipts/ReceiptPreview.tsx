"use client";
import { useParseReceiptQuery } from "@/generated";
import { Button } from "@/components/ui/button";
import { SheetIcon } from "lucide-react";
import { useExportToCsv } from "@/lib/Export/Hooks/useExportToCsv";
import { Upload } from "@/src/FileUpload/FileUploader";
import { Spinner } from "@/components/Spinner";

export function ReceiptPreview({ uploads }: { uploads: Upload[] }) {
  const exportToCsv = useExportToCsv();

  return (
    <div className="mt-12 flex flex-col items-center space-y-12">
      {uploads.length > 0 && (
        <Button
          onClick={() => {
            exportToCsv();
          }}
        >
          <SheetIcon className="mr-2 h-4 w-4" /> Export To CSV
        </Button>
      )}
      <ul className="grid max-w-3xl grid-cols-2 gap-3">
        {uploads.map((upload, idx) => {
          return (
            <li key={idx} className="overflow-hidden rounded-md shadow">
              <img
                src={URL.createObjectURL(upload.file)}
                alt="receipt"
                className="w-full object-contain"
              />
              <ReceiptCard url={upload.temporary_url} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ReceiptCard({ url }: { url: string }) {
  const { data } = useParseReceiptQuery(
    {
      url,
    },
    {
      cacheTime: Infinity,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  if (!data) {
    return (
      <div className="flex items-center justify-center p-6">
        <Spinner className="h-10 w-10 text-blue-500" />
      </div>
    );
  }

  const { parseFile: receipt } = data;

  return (
    <div className="p-3">
      <div className="text-2xl font-bold">Receipt #{receipt.reference}</div>
      <p className="text-xs text-gray-500">
        {receipt.paid_to} - {receipt.paid_at}
      </p>
      <div className="mt-3 space-y-1 rounded-md bg-gray-50 p-3 text-xs">
        {(receipt.line_items ?? []).map((item, idx) => (
          <div className="" key={idx}>
            <div className="flex justify-between">
              <div className="line-clamp-1">{item.name}</div>
              <div className="flex-shrink-0 text-right">${item.amount}</div>
            </div>
            <p className="text-xs text-gray-500">
              {item.quantity}x${item.amount}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-end text-right">
        <div className="w-1/2 space-y-2">
          <div>Subtotal: ${receipt.amount_subtotal}</div>
          <div>Tax: ${receipt.amount_tax}</div>
          <div className="border-t border-gray-200 py-2 text-lg font-semibold">
            Total: ${receipt.amount_total}
          </div>
        </div>
      </div>
    </div>
  );
}
