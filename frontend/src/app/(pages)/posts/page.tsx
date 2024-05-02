"use client";

import { useState } from "react";
import { Button, Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery } from "@apollo/client";
import { useDisclosure } from "@mantine/hooks";
import { POST_DELETE_MUTATION, POSTS_LIST_QUERY } from "@graphql/post/queries";

import AddModal from "@components/modals/addModal";
import UpdateModal from "@components/modals/updateModal";

export default function PostsPage() {
  // Add & Update Modals Hide/Show Controller
  const [addModalOpened, { open: addModalOpen, close: addModalClose }] =
    useDisclosure(false);
  const [
    updateModalOpened,
    { open: updateModalOpen, close: updateModalClose },
  ] = useDisclosure(false);

  // State For Storing Updated Data
  const [updateInputs, setUpdateInputs] = useState<IInputsType | null>(null);

  // Quires
  let {
    loading,
    error,
    data: postsList,
    refetch: refetchPosts,
  } = useQuery(POSTS_LIST_QUERY);

  // Mutations
  const [deletePost] = useMutation(POST_DELETE_MUTATION);

  // Mutations Triggers
  async function handleDeleteCategory(id: number) {
    try {
      const confirmDelete = confirm("Are you sure?");
      if (confirmDelete)
        await deletePost({ variables: { id } }).then(
          async () => await refetchPosts()
        );
    } catch (e) {
      console.log(e);
    }
  }

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error.message}</span>;
  return (
    <>
      <AddModal
        refetch={refetchPosts}
        opened={addModalOpened}
        open={addModalOpen}
        close={addModalClose}
      />
      <UpdateModal
        refetch={refetchPosts}
        opened={updateModalOpened}
        close={updateModalClose}
        updateInputs={updateInputs}
        setUpdateInputs={setUpdateInputs}
      />

      <Button onClick={async () => await refetchPosts()}>Refresh</Button>
      <section>
        <Table className="mt-5 overflow-x-auto max-w-full">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Content</Table.Th>
              <Table.Th>Created Date</Table.Th>
              <Table.Th>Updated Date</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {postsList.posts.length > 0 ? (
              postsList.posts.map((post: IPostType) => (
                <Table.Tr key={post.id}>
                  <Table.Td>{post.id}</Table.Td>
                  <Table.Td>{post.category.name}</Table.Td>
                  <Table.Td>{post.title}</Table.Td>
                  <Table.Td className="truncate max-w-10">
                    {post.content}
                  </Table.Td>
                  <Table.Td>
                    {new Date(+post.createdAt).toDateString()}
                  </Table.Td>
                  <Table.Td>
                    {new Date(+post.updatedAt).toDateString()}
                  </Table.Td>
                  <Table.Td className="flex items-center gap-2">
                    <IconEdit
                      className="text-blue-600 cursor-pointer"
                      onClick={() => {
                        updateModalOpen();
                        setUpdateInputs({
                          id: post.id,
                          title: post.title,
                          content: post.content,
                          categoryId: post.category.id,
                        });
                      }}
                    />
                    <IconTrash
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDeleteCategory(post.id)}
                    />
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={7} className="text-center">
                  There is no data available
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </section>
    </>
  );
}
