import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
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

export type Mutation = {
  __typename?: 'Mutation';
  createSignedStorageUrl: SignedStorageUrl;
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

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int']['output'];
  /** Index of the current page. */
  currentPage: Scalars['Int']['output'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']['output']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean']['output'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']['output']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int']['output'];
  /** Number of items per page. */
  perPage: Scalars['Int']['output'];
  /** Number of total available items. */
  total: Scalars['Int']['output'];
};

/** Indicates what fields are available at the top level of a query operation. */
export type Query = {
  __typename?: 'Query';
  parseFile: Receipt;
  /** Find a single user by an identifying attribute. */
  user?: Maybe<User>;
  /** List multiple users. */
  users: UserPaginator;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryParseFileArgs = {
  url: Scalars['String']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryUsersArgs = {
  first?: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
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

export type ReceiptLineItem = {
  __typename?: 'ReceiptLineItem';
  amount?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  unit_price?: Maybe<Scalars['Float']['output']>;
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

/** Account of a person who utilizes this application. */
export type User = {
  __typename?: 'User';
  /** When the account was created. */
  created_at: Scalars['DateTime']['output'];
  /** Unique email address. */
  email: Scalars['String']['output'];
  /** When the email was verified. */
  email_verified_at?: Maybe<Scalars['DateTime']['output']>;
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  /** Non-unique name. */
  name: Scalars['String']['output'];
  /** When the account was last updated. */
  updated_at: Scalars['DateTime']['output'];
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type CreateSignedUploadUrlMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateSignedUploadUrlMutation = { __typename?: 'Mutation', createSignedStorageUrl: { __typename?: 'SignedStorageUrl', uuid: string, url: string, key: string, bucket: string, headers: any } };

export type ParseReceiptQueryVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type ParseReceiptQuery = { __typename?: 'Query', parseFile: { __typename?: 'Receipt', reference?: string | null, amount_subtotal?: number | null, amount_tax?: number | null, amount_total?: number | null, paid_at?: string | null, paid_to?: string | null, line_items: Array<{ __typename?: 'ReceiptLineItem', name?: string | null, amount?: number | null, code?: string | null, quantity?: number | null, unit_price?: number | null }> } };


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