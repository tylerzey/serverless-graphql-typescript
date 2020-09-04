export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  users?: Maybe<Array<Maybe<UserQuery>>>;
};


export type RootQueryUsersArgs = {
  id?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
};

export type UserQuery = {
  __typename?: 'UserQuery';
  metadata?: Maybe<UserMetadataQuery>;
};

export type UserMetadataQuery = {
  __typename?: 'UserMetadataQuery';
  fullName?: Maybe<Scalars['String']>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  userPatch?: Maybe<UserPatch>;
  userPost?: Maybe<UserPost>;
};


export type RootMutationUserPatchArgs = {
  id: Scalars['String'];
  metadata?: Maybe<UserPatchMutation>;
};


export type RootMutationUserPostArgs = {
  metadata: UserPostMutation;
};

export type UserPatch = {
  __typename?: 'UserPatch';
  metadata?: Maybe<UserMetadataPatch>;
};

export type UserMetadataPatch = {
  __typename?: 'UserMetadataPatch';
  fullName?: Maybe<Scalars['String']>;
};

export type UserPatchMutation = {
  fullName?: Maybe<Scalars['String']>;
};

export type UserPost = {
  __typename?: 'UserPost';
  metadata?: Maybe<UserMetadataPost>;
};

export type UserMetadataPost = {
  __typename?: 'UserMetadataPost';
  fullName?: Maybe<Scalars['String']>;
};

export type UserPostMutation = {
  fullName?: Maybe<Scalars['String']>;
};
