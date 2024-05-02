"use client";
import { useState } from "react";
import { Button, Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery } from "@apollo/client";
import { useDisclosure } from "@mantine/hooks";
import {
  CATEGORIES_LIST_QUERY,
  CATEGORY_DELETE_MUTATION,
} from "@graphql/category/queries";

import AddModal from "@components/modals/addModal";
import UpdateModal from "@components/modals/updateModal";

export default function CategoriesPage() {
  // Add & Update Modals Hide/Show Controller
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);
  const [
    updateModalOpened,
    { open: openUpdateModal, close: closeUpdateModal },
  ] = useDisclosure(false);

  // State For Storing Updated Data
  const [updateInputs, setUpdateInputs] = useState<IInputsType | null>(null);

  // Quires
  let {
    loading,
    error,
    data: categoriesList,
    refetch: refetchCategories,
  } = useQuery(CATEGORIES_LIST_QUERY);

  // Mutations
  const [deleteCategory] = useMutation(CATEGORY_DELETE_MUTATION);

  // Mutations Triggers
  async function handleDeleteCategory(id: number) {
    try {
      const confirmDelete = confirm("Are you sure?");
      if (confirmDelete)
        await deleteCategory({ variables: { id } }).then(() =>
          refetchCategories()
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
        refetch={refetchCategories}
        opened={addModalOpened}
        open={openAddModal}
        close={closeAddModal}
      />
      <UpdateModal
        refetch={refetchCategories}
        opened={updateModalOpened}
        close={closeUpdateModal}
        updateInputs={updateInputs}
        setUpdateInputs={setUpdateInputs}
      />

      <Button onClick={async () => await refetchCategories()}>Refresh</Button>
      <section>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Created Date</Table.Th>
              <Table.Th>Updated Date</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {categoriesList.categories.length > 0 ? (
              categoriesList.categories.map((category: ICategoryType) => (
                <Table.Tr key={category.id}>
                  <Table.Td>{category.id}</Table.Td>
                  <Table.Td>{category.name}</Table.Td>
                  <Table.Td>
                    {new Date(+category.createdAt).toDateString()}
                  </Table.Td>
                  <Table.Td>
                    {new Date(+category.updatedAt).toDateString()}
                  </Table.Td>
                  <Table.Td className="flex items-center gap-2">
                    <IconEdit
                      className="text-blue-600 cursor-pointer"
                      onClick={() => {
                        openUpdateModal();
                        setUpdateInputs({
                          id: category.id,
                          name: category.name,
                        });
                      }}
                    />
                    <IconTrash
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDeleteCategory(category.id)}
                    />
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5} className="text-center">There is no data available</Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </section>
    </>
  );
}
