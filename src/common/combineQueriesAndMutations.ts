import { userQuery, userMutations } from "../entities/users/graphql";

export const buildQuery = (user) => {
  return { users: userQuery(user) };
};

export const buildMutation = (user) => {
  return { ...userMutations(user) };
};
