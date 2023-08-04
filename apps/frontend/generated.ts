import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { fetcher } from '@/lib/GraphQL/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Mixed: { input: any; output: any; }
};

export type Connections = {
  __typename?: 'Connections';
  quick_books: Scalars['Boolean']['output'];
  xero: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSignedStorageUrl: SignedStorageUrl;
  xeroAccountLink: Scalars['String']['output'];
  xeroSyncReceipt: Scalars['String']['output'];
};


export type MutationXeroAccountLinkArgs = {
  redirect_url: Scalars['String']['input'];
};


export type MutationXeroSyncReceiptArgs = {
  input: ReceiptInput;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

export type Query = {
  __typename?: 'Query';
  connections: Connections;
  parseFile: Receipt;
};


export type QueryParseFileArgs = {
  url: Scalars['String']['input'];
};

export type Receipt = {
  __typename?: 'Receipt';
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  line_items: Array<ReceiptLineItem>;
  paid_at?: Maybe<Scalars['String']['output']>;
  paid_to?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
};

export type ReceiptInput = {
  amount_subtotal?: InputMaybe<Scalars['Float']['input']>;
  amount_tax?: InputMaybe<Scalars['Float']['input']>;
  amount_total?: InputMaybe<Scalars['Float']['input']>;
  line_items: Array<ReceiptLineItemInput>;
  paid_at?: InputMaybe<Scalars['String']['input']>;
  paid_to?: InputMaybe<Scalars['String']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
};

export type ReceiptLineItem = {
  __typename?: 'ReceiptLineItem';
  amount?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  unit_price?: Maybe<Scalars['Float']['output']>;
};

export type ReceiptLineItemInput = {
  amount: Scalars['Float']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  quantity: Scalars['Float']['input'];
  unit_price: Scalars['Float']['input'];
};

export type SignedStorageUrl = {
  __typename?: 'SignedStorageUrl';
  bucket: Scalars['String']['output'];
  headers: Scalars['Mixed']['output'];
  key: Scalars['String']['output'];
  url: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type XeroAccount = {
  __typename?: 'XeroAccount';
  id: Scalars['ID']['output'];
  xero_tenant_id: Scalars['String']['output'];
};

export type ParseReceiptQueryVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type ParseReceiptQuery = { __typename?: 'Query', parseFile: { __typename?: 'Receipt', reference?: string | null, amount_subtotal?: number | null, amount_tax?: number | null, amount_total?: number | null, paid_at?: string | null, paid_to?: string | null, line_items: Array<{ __typename?: 'ReceiptLineItem', name?: string | null, amount?: number | null, code?: string | null, quantity?: number | null, unit_price?: number | null }> } };

export type ConnectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ConnectionsQuery = { __typename?: 'Query', connections: { __typename?: 'Connections', quick_books: boolean, xero: boolean } };

export type CreateXeroAccountLinkMutationVariables = Exact<{
  redirectUrl: Scalars['String']['input'];
}>;


export type CreateXeroAccountLinkMutation = { __typename?: 'Mutation', xeroAccountLink: string };

export type SyncXeroReceiptMutationVariables = Exact<{
  input: ReceiptInput;
}>;


export type SyncXeroReceiptMutation = { __typename?: 'Mutation', xeroSyncReceipt: string };

export type CreateSignedUploadUrlMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateSignedUploadUrlMutation = { __typename?: 'Mutation', createSignedStorageUrl: { __typename?: 'SignedStorageUrl', uuid: string, url: string, key: string, bucket: string, headers: any } };


export const ParseReceiptDocument = `
    query ParseReceipt($url: String!) {
  parseFile(url: $url) {
    reference
    amount_subtotal
    amount_tax
    amount_total
    paid_at
    paid_to
    line_items {
      name
      amount
      code
      quantity
      unit_price
    }
  }
}
    `;
export const useParseReceiptQuery = <
      TData = ParseReceiptQuery,
      TError = unknown
    >(
      variables: ParseReceiptQueryVariables,
      options?: UseQueryOptions<ParseReceiptQuery, TError, TData>
    ) =>
    useQuery<ParseReceiptQuery, TError, TData>(
      ['ParseReceipt', variables],
      fetcher<ParseReceiptQuery, ParseReceiptQueryVariables>(ParseReceiptDocument, variables),
      options
    );
export const ConnectionsDocument = `
    query Connections {
  connections {
    quick_books
    xero
  }
}
    `;
export const useConnectionsQuery = <
      TData = ConnectionsQuery,
      TError = unknown
    >(
      variables?: ConnectionsQueryVariables,
      options?: UseQueryOptions<ConnectionsQuery, TError, TData>
    ) =>
    useQuery<ConnectionsQuery, TError, TData>(
      variables === undefined ? ['Connections'] : ['Connections', variables],
      fetcher<ConnectionsQuery, ConnectionsQueryVariables>(ConnectionsDocument, variables),
      options
    );
export const CreateXeroAccountLinkDocument = `
    mutation CreateXeroAccountLink($redirectUrl: String!) {
  xeroAccountLink(redirect_url: $redirectUrl)
}
    `;
export const useCreateXeroAccountLinkMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateXeroAccountLinkMutation, TError, CreateXeroAccountLinkMutationVariables, TContext>) =>
    useMutation<CreateXeroAccountLinkMutation, TError, CreateXeroAccountLinkMutationVariables, TContext>(
      ['CreateXeroAccountLink'],
      (variables?: CreateXeroAccountLinkMutationVariables) => fetcher<CreateXeroAccountLinkMutation, CreateXeroAccountLinkMutationVariables>(CreateXeroAccountLinkDocument, variables)(),
      options
    );
export const SyncXeroReceiptDocument = `
    mutation SyncXeroReceipt($input: ReceiptInput!) {
  xeroSyncReceipt(input: $input)
}
    `;
export const useSyncXeroReceiptMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SyncXeroReceiptMutation, TError, SyncXeroReceiptMutationVariables, TContext>) =>
    useMutation<SyncXeroReceiptMutation, TError, SyncXeroReceiptMutationVariables, TContext>(
      ['SyncXeroReceipt'],
      (variables?: SyncXeroReceiptMutationVariables) => fetcher<SyncXeroReceiptMutation, SyncXeroReceiptMutationVariables>(SyncXeroReceiptDocument, variables)(),
      options
    );
export const CreateSignedUploadUrlDocument = `
    mutation CreateSignedUploadUrl {
  createSignedStorageUrl {
    uuid
    url
    key
    bucket
    headers
  }
}
    `;
export const useCreateSignedUploadUrlMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateSignedUploadUrlMutation, TError, CreateSignedUploadUrlMutationVariables, TContext>) =>
    useMutation<CreateSignedUploadUrlMutation, TError, CreateSignedUploadUrlMutationVariables, TContext>(
      ['CreateSignedUploadUrl'],
      (variables?: CreateSignedUploadUrlMutationVariables) => fetcher<CreateSignedUploadUrlMutation, CreateSignedUploadUrlMutationVariables>(CreateSignedUploadUrlDocument, variables)(),
      options
    );