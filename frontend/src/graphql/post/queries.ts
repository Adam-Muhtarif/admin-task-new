import { gql } from "@apollo/client";

export const POSTS_LIST_QUERY = gql`
  query Posts {
    posts {
      id
      title
      content
      categoryId
      createdAt
      updatedAt
      category {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;

export const POST_CREATE_MUTATION = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      id
    }
  }
`;

export const POST_DELETE_MUTATION = gql`
  mutation RemovePost($id: Int!) {
    removePost(id: $id) {
      id
      title
    }
  }
`;

export const POST_UPDATE_MUTATION = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(updatePostInput: $input) {
      id
      title
      content
      categoryId
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;
