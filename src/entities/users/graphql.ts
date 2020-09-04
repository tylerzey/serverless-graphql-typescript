import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import {
  generateQueryType,
  generatePatchType,
  CustomGraphQLType,
  generatePostType,
} from "../../common/generateTypesFromObject";
import {
  RootMutationUserPostArgs,
  RootMutationUserPatchArgs,
  RootQueryUsersArgs,
} from "../../generated/schemaTypes";
import { ContextType, RootType } from "../../common/handler";
import { postUser } from "./model";

const metadata: CustomGraphQLType = {
  userId: { type: GraphQLString, options: { post: false, patch: false } },
  fullName: { type: GraphQLString },
};

const userMetadataType = (authedUser, type: string) =>
  new GraphQLObjectType({
    name: `UserMetadata${type}`,
    fields: generateQueryType(metadata, authedUser),
  });

const userType = (authedUser, type: string) =>
  new GraphQLObjectType({
    name: `User${type}`,
    fields: () => {
      return {
        metadata: { type: userMetadataType(authedUser, type) },
      };
    },
  });

export const userQuery = (authedUser) => ({
  name: "UserQuery",
  type: new GraphQLList(userType(authedUser, "Query")),
  args: {
    id: { type: GraphQLString },
    search: { type: GraphQLString },
  },
  resolve: async (
    root: RootType,
    args: RootQueryUsersArgs,
    context: ContextType
  ) => {
    console.log("PostQuery graphql query resolving on ", args);
    // const { id, search } = args;

    // if (id) {
    //   const data = await findById(id);
    //   if (!data) throw new Error("Not found");

    //   return [data];
    // } else if (search) {
    //   const data = await postModel.find({});

    //   return data;
    // }

    // throw new Error("Invalid query. Specify id or search.");
  },
});

const userPatchMutation = (authedUser) => ({
  type: userType(authedUser, "Patch"),
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    metadata: {
      type: generatePatchType("UserPatchMutation", metadata, authedUser),
    },
  },
  resolve: async (
    root: RootType,
    args: RootMutationUserPatchArgs,
    context: ContextType
  ) => {
    return {};
  },
});

const userPostMutation = (authedUser) => ({
  type: userType(authedUser, "Post"),
  args: {
    metadata: {
      type: new GraphQLNonNull(
        generatePostType("UserPostMutation", metadata, authedUser)
      ),
    },
  },
  resolve: async (
    root: RootType,
    args: RootMutationUserPostArgs,
    context: ContextType
  ) => {
    return postUser(args);
  },
});

export const userMutations = (authedUser) => ({
  userPatch: userPatchMutation(authedUser),
  userPost: userPostMutation(authedUser),
});
