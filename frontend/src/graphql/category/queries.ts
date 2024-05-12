import { gql } from "@apollo/client";

export const CATEGORIES_LIST_QUERY = gql`
  query Categories {
    categories {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const CATEGORY_CREATE_MUTATION = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(createCategoryInput: $input) {
      id
    }
  }
`;

export const CATEGORY_DELETE_MUTATION = gql`
  mutation RemoveCategory($id: Int!) {
    removeCategory(id: $id) {
      id
      name
    }
  }
`;

export const CATEGORY_UPDATE_MUTATION = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
