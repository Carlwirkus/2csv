"use client";
import {
  ReceiptInput,
  useConnectionsQuery,
  useParseReceiptQuery,
  useSyncXeroReceiptMutation,
} from "@/generated";
import { useExportToCsv } from "@/lib/Export/Hooks/useExportToCsv";
import { Upload } from "@/src/FileUpload/FileUploader";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { PlusIcon, TableIcon, TrashIcon } from "lucide-react";
import { useXeroAccountLink } from "@/src/Connections/Hooks/useXeroAccountLink";
import { useAuth } from "@clerk/nextjs";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Field,
  FieldArray,
  FieldArrayRenderProps,
  FieldProps,
  Form,
  Formik,
  FormikProps,
} from "formik";
import { cn } from "@/lib/utils";
import * as Yup from "yup";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoogleSheetsIcon } from "@/lib/Icons/GoogleSheetsIcon";
import { ComingSoonBadge } from "@/components/ComingSoonBadge";
import { XeroIcon } from "@/lib/Icons/XeroIcon";
import { QuickBooksIcon } from "@/lib/Icons/QuickBooksIcon";

export function ReceiptPreview({
  uploads,
  onDelete,
}: {
  uploads: Upload[];
  onDelete: (idx: number) => void;
}) {
  const { isSignedIn } = useAuth();
  const exportToCsv = useExportToCsv();
  const { mutateAsync } = useXeroAccountLink();
  const { mutateAsync: syncXeroReceipt } = useSyncXeroReceiptMutation();

  const { data } = useConnectionsQuery(
    {},
    {
      enabled: isSignedIn,
    }
  );

  const itemsRef = useRef<
    {
      formik: FormikProps<any>;
      setExternalUrl: (url: string) => void;
    }[]
  >([]);
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, uploads?.length);
  }, [uploads.length]);

  const { toast } = useToast();

  return (
    <div className="mt-12 flex flex-col items-center space-y-12 px-3">
      <ul className="grid max-w-3xl grid-cols-1 gap-3 md:grid-cols-2">
        {uploads.map((upload, idx) => {
          return (
            <li
              key={idx}
              className="relative overflow-hidden rounded-md shadow"
            >
              <div className="absolute right-1 top-1 rounded-full p-3 text-red-500">
                <button
                  onClick={() => {
                    onDelete(idx);
                  }}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(upload.file)}
                alt="receipt"
                className="w-full object-contain"
              />
              <Foo
                url={upload.temporary_url}
                ref={(ref) => ((itemsRef.current[idx] as any) = ref)}
              />
            </li>
          );
        })}
      </ul>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Export</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          <DropdownMenuLabel>Free</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              const data = itemsRef.current.map((ref, index) => {
                return ref.formik.values as ReceiptInput;
              });

              exportToCsv(data);
            }}
          >
            <TableIcon className="mr-2 h-6 w-6" />
            <span>CSV</span>
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <GoogleSheetsIcon className="mr-2 h-6 w-6" />
            Google Docs
            <DropdownMenuShortcut className="opacity-100">
              <ComingSoonBadge />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuGroup>
            <DropdownMenuLabel>Premium</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {data?.connections.xero ? (
              <DropdownMenuItem
                onClick={async () => {
                  const promises = itemsRef.current
                    .map(async (ref, index) => {
                      await ref.formik.validateForm();

                      if (!ref.formik.isValid) {
                        return null;
                      }

                      ref.formik.setSubmitting(true);
                      const values = ref.formik.values as ReceiptInput;

                      return syncXeroReceipt({
                        input: values,
                      }).then((res) => {
                        ref.formik.setSubmitting(false);
                        ref.setExternalUrl(res.xeroSyncReceipt);
                      });
                    })
                    .filter(Boolean);

                  if (promises.length === 0) {
                    return;
                  }

                  const { dismiss } = toast({
                    title: "Syncing to Xero",
                    duration: Infinity,
                  });

                  await Promise.allSettled(promises);

                  dismiss();
                }}
              >
                <XeroIcon className="mr-2 h-6 w-6" />
                Xero
                <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
              </DropdownMenuItem>
            ) : null}

            {data?.connections.quick_books ? (
              <DropdownMenuItem disabled>
                <QuickBooksIcon className="mr-2 h-6 w-6" />
                QuickBooks
              </DropdownMenuItem>
            ) : null}

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <PlusIcon className="mr-2 h-6 w-6" />
                Add Connection
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuLabel>
                    Login to access premium features
                  </DropdownMenuLabel>

                  <DropdownMenuItem
                    disabled={!isSignedIn}
                    onClick={async () => {
                      await mutateAsync({
                        redirectUrl: window.location.href,
                      });
                    }}
                  >
                    <XeroIcon className="mr-2 h-6 w-6" />
                    Xero
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <QuickBooksIcon className="mr-2 h-6 w-6" />
                    QuickBooks
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ReceiptCard({ url }: { url: string }, ref: any) {
  const [externalUrl, setExternalUrl] = useState<string | null>(null);
  const formikRef = useRef<any>();
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

  useImperativeHandle(ref, () => ({
    formik: formikRef.current,
    setExternalUrl,
  }));

  if (!data) {
    return (
      <div className="flex items-center justify-center p-6">
        <Spinner className="h-10 w-10 text-blue-500" />
      </div>
    );
  }

  const { parseFile: receipt } = data;

  return (
    <Formik<ReceiptInput>
      validationSchema={Yup.object({
        reference: Yup.string(),
        amount_subtotal: Yup.number().required(),
        amount_tax: Yup.number().required(),
        amount_total: Yup.number().required(),
        paid_at: Yup.date().required(),
        paid_to: Yup.string().required(),
        line_items: Yup.array().of(
          Yup.object({
            amount: Yup.number().required(),
            name: Yup.string().required(),
            quantity: Yup.number().required(),
            unit_price: Yup.number().required(),
          })
        ),
      })}
      innerRef={formikRef}
      initialValues={{
        reference: receipt.reference ?? "",
        amount_subtotal: receipt.amount_subtotal,
        amount_tax: receipt.amount_tax,
        amount_total: receipt.amount_total,
        paid_at: receipt.paid_at,
        paid_to: receipt.paid_to,
        line_items: receipt.line_items.map((item) => ({
          amount: item.amount!,
          code: item.code!,
          name: item.name!,
          quantity: item.quantity!,
          unit_price: item.unit_price!,
        })),
      }}
      onSubmit={async (values) => {
        return;
      }}
    >
      <Form>
        <div className="p-3">
          <div className="text-2xl font-bold">
            <InlineTextField name="reference" />
          </div>
          <p className="flex justify-between text-xs text-gray-500">
            <InlineTextField name="paid_to" />
            <InlineTextField name="paid_at" type="date" />
          </p>
          <FieldArray name="line_items">
            {({}: FieldArrayRenderProps) => {
              return (
                <div className="mt-3 space-y-1 rounded-md bg-gray-50 p-3 text-xs">
                  {(receipt.line_items ?? []).map((item, idx) => (
                    <div className="" key={idx}>
                      <div className="flex justify-between">
                        <div className="line-clamp-1 w-full">
                          <InlineTextField
                            name={`line_items.${idx}.name`}
                            className="w-full pr-2"
                          />
                        </div>
                        <div className="flex-shrink-0 text-right font-bold">
                          $
                          <InlineTextField
                            name={`line_items.${idx}.amount`}
                            className="w-20"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        <InlineTextField
                          name={`line_items.${idx}.quantity`}
                          className="w-10"
                          type="number"
                        />
                        {"x $"}
                        <InlineTextField
                          name={`line_items.${idx}.unit_price`}
                          type="number"
                          className="w-20"
                        />
                      </p>
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
          <div className="mt-3 flex justify-end text-right">
            <div className="w-1/2 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal: </span>
                <span>
                  $
                  <InlineTextField
                    type="number"
                    name="amount_subtotal"
                    className="w-20 text-right"
                  />
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>
                  $
                  <InlineTextField
                    type="number"
                    name="amount_tax"
                    className="w-20 text-right"
                  />
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total: $</span>
                <span>
                  $
                  <InlineTextField
                    type="number"
                    name="amount_total"
                    className="w-20 text-right"
                  />
                </span>
              </div>
            </div>
          </div>

          {externalUrl ? (
            <Button
              onClick={() => {
                window.open(externalUrl, "_blank");
              }}
            >
              View
            </Button>
          ) : null}
        </div>
      </Form>
    </Formik>
  );
}

const Foo = forwardRef(ReceiptCard);

function InlineTextField({
  name,
  type = "text",
  inputProps,
  className,
}: {
  name: string;
  type?: string;
  inputProps?: any;
  className?: string;
}) {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => (
        <div className="inline">
          <input
            type={type}
            placeholder="--"
            {...field}
            className={cn("bg-inherit", className)}
            {...inputProps}
          />
          {meta.touched && meta.error && (
            <div className="text-xs font-normal text-red-500">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
}
