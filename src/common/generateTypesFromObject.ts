import {
  GraphQLFieldConfigMap,
  GraphQLOutputType,
  Thunk,
  GraphQLInputObjectType,
} from "graphql";

export type CustomGraphQLType = {
  [key: string]: {
    type: GraphQLOutputType;
    options?: { query?: boolean; post?: boolean; patch?: boolean };
  };
};

const defaultOptions = { query: true, post: true, patch: true };

export const generateQueryType = (
  obj: CustomGraphQLType,
  user
): Thunk<GraphQLFieldConfigMap<any, any>> => {
  return Object.entries(obj).reduce(
    (acc, [key, { type, options = defaultOptions }]) => {
      if (!options.query) return acc;

      return {
        ...acc,
        [key]: { type },
      };
    },
    {}
  );
};

export const generatePatchType = (
  name: string,
  obj: CustomGraphQLType,
  user
): GraphQLInputObjectType => {
  return new GraphQLInputObjectType({
    name,
    fields: Object.entries(obj).reduce(
      (acc, [key, { type, options = defaultOptions }]) => {
        if (!options.patch) return acc;

        return {
          ...acc,
          [key]: { type },
        };
      },
      {}
    ),
  });
};

export const generatePostType = (
  name: string,
  obj: CustomGraphQLType,
  user
): GraphQLInputObjectType => {
  return new GraphQLInputObjectType({
    name,
    fields: Object.entries(obj).reduce(
      (acc, [key, { type, options = defaultOptions }]) => {
        if (!options.post) return acc;

        return {
          ...acc,
          [key]: { type },
        };
      },
      {}
    ),
  });
};
