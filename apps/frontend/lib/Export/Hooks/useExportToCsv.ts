import { useQueryClient } from "@tanstack/react-query";
import { ParseReceiptQuery } from "@/generated";

type Column =
  | "reference"
  | "amount_subtotal"
  | "amount_tax"
  | "amount_total"
  | "paid_at"
  | "paid_to"
  | "line_items";
const columns: {
  [key in Column]: {
    process: (value: ParseReceiptQuery["parseFile"]) => string;
  };
} = {
  reference: {
    process: (value) => value.reference ?? "",
  },
  amount_subtotal: {
    process: (value) => value.amount_subtotal?.toString() ?? "",
  },
  amount_tax: {
    process: (value) => value.amount_tax?.toString() ?? "",
  },
  amount_total: {
    process: (value) => value.amount_total?.toString() ?? "",
  },
  paid_at: {
    process: (value) => value.paid_at?.toString() ?? "",
  },
  paid_to: {
    process: (value) => value.paid_to?.toString() ?? "",
  },
  line_items: {
    process: (value) =>
      value.line_items
        .map((item) => {
          return `${item.name} ${item.code} ${item.quantity}x$${item.unit_price} $${item.amount}`;
        })
        .join("|"),
  },
};

export function useExportToCsv() {
  const queryClient = useQueryClient();

  return () => {
    const data = queryClient
      .getQueriesData<ParseReceiptQuery>(["ParseReceipt"])
      .map(([, item]) => {
        if (!item) return null;

        return Object.keys(columns)
          .map((key) => {
            return columns[key as Column].process(item.parseFile);
          })
          .map(String) // convert every value to String
          .map((v) => v.replaceAll('"', '""')) // escape double colons
          .map((v) => `"${v}"`) // quote it
          .join(",");
      })
      .filter(Boolean)
      .join("\n");

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(columns).join(",") +
      "\n" +
      data;

    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  };
}
