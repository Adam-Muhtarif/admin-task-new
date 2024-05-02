"use client";

import { ChangeEvent } from "react";
import { Modal, Button, Group, Input, Textarea, Select } from "@mantine/core";
import { usePathname } from "next/navigation";
import {
  CATEGORIES_LIST_QUERY,
  CATEGORY_UPDATE_MUTATION,
} from "@graphql/category/queries";
import { POST_UPDATE_MUTATION } from "@graphql/post/queries";
import { useMutation, useQuery } from "@apollo/client";

export default function UpdateModal({
  refetch,
  opened,
  close,
  updateInputs,
  setUpdateInputs,
}: IUpdateModalProps) {
  const path = usePathname();

  // Quires
  let { data: categoriesList } = useQuery(CATEGORIES_LIST_QUERY);
  let selectCategories = categoriesList?.categories.map(
    (category: ICategoryInputsType, i: number) => {
      return { key: i, label: category.name, value: `${category.id}` };
    }
  );

  // Mutations
  const [updatePost] = useMutation(POST_UPDATE_MUTATION);
  const [updateCategory] = useMutation(CATEGORY_UPDATE_MUTATION);

  // Mutations Triggers
  async function handleUpdate() {
    try {
      if (path === "/categories") {
        await updateCategory({
          variables: {
            input: updateInputs,
          },
        }).then(() => refetch());
      }

      if (path === "/posts") {
        await updatePost({
          variables: {
            input: updateInputs,
          },
        }).then(() => refetch());
      }
    } catch (e) {
      console.log(e);
    } finally {
      close();
      setUpdateInputs(null);
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Modal">
        {/* Modal content */}
        {path === "/categories" && (
          <Input.Wrapper label="Name">
            <Input
              placeholder="Category name"
              // value={categoryInputs?.name}
              defaultValue={updateInputs?.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUpdateInputs({
                  ...updateInputs,
                  id: updateInputs?.id,
                  name: e.target.value,
                });
              }}
            />
          </Input.Wrapper>
        )}

        {path === "/posts" && (
          <>
            <Input.Wrapper label="Title">
              <Input
                placeholder="Post title"
                defaultValue={updateInputs?.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setUpdateInputs({
                    ...updateInputs,
                    id: updateInputs?.id,
                    title: e.target.value,
                  });
                }}
              />
            </Input.Wrapper>

            <Textarea
              label="Content"
              placeholder="Input post content"
              defaultValue={updateInputs?.content}
              onChange={(e) => {
                setUpdateInputs({
                  ...updateInputs,
                  id: updateInputs?.id,
                  content: e.target.value,
                });
              }}
            />

            <Select
              label="Category"
              placeholder="Pick category"
              defaultValue={updateInputs?.content}
              data={selectCategories}
              onChange={(value: string | null, option) =>
                setUpdateInputs({
                  ...updateInputs,
                  id: updateInputs?.id,
                  categoryId: Number(value),
                })
              }
            />
          </>
        )}

        <Button className="w-full mt-2" onClick={handleUpdate}>
          Submit
        </Button>
      </Modal>

      <Group className="flex justify-end"></Group>
    </>
  );
}
