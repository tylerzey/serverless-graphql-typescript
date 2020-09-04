import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { graphql, GraphQLSchema, GraphQLObjectType } from "graphql";
import {
  buildCorsSuccessResponse,
  buildErrorResponse,
} from "./responseWrappers";
import { buildQuery, buildMutation } from "./combineQueriesAndMutations";

export const buildSchema = (authedUser) =>
  new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "RootQuery",
      fields: { ...buildQuery(authedUser) },
    }),
    mutation: new GraphQLObjectType({
      name: "RootMutation",
      fields: { ...buildMutation(authedUser) },
    }),
  });

export type RootType = Record<string, unknown>;
export type ContextType = Record<string, unknown>;

export const commonHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { query, variables } = JSON.parse(event.body);

    const authedUser = {};
    const context: ContextType = {};
    const root: RootType = { root: "root" };

    const { data, errors } = await graphql(
      buildSchema(authedUser),
      query,
      root,
      context,
      variables
    );

    // todo scrub out gql errors

    return buildCorsSuccessResponse(JSON.stringify({ data, errors }));
  } catch (error) {
    console.error(error);

    return buildErrorResponse("Error baby");
  }
};
