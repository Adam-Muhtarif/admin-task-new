"use client";

import { ChangeEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { Modal, Button, Group, Input, Textarea, Select } from "@mantine/core";
import { POST_CREATE_MUTATION } from "@graphql/post/queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  CATEGORIES_LIST_QUERY,
  CATEGORY_CREATE_MUTATION,
} from "@graphql/category/queries";

export default function AddModal({
  refetch,
  opened,
  open,
  close,
}: IAddModalProps) {
  const [inputs, setInputs] = useState<IInputsType | null>(null);
  const path = usePathname();

  // Quires
  let { data: categoriesList } = useQuery(CATEGORIES_LIST_QUERY);

  // For The Select Input Data
  let selectCategories = categoriesList?.categories.map(
    (category: ICategoryType, i: number) => {
      return { key: i, label: category?.name, value: `${category?.id}` };
    }
  );

  // Mutations
  const [addCategory] = useMutation(CATEGORY_CREATE_MUTATION);
  const [addPost] = useMutation(POST_CREATE_MUTATION);

  // Mutations Triggers
  async function handleAdd() {
    try {
      if (path === "/categories") {
        if (inputs?.name) {
          await addCategory({ variables: { input: inputs } }).then(() =>
            refetch()
          );
        } else alert(`fill the input`);
      }

      if (path === "/posts") {
        if (inputs?.title && inputs?.content && inputs?.categoryId) {
          await addPost({
            variables: {
              input: inputs,
            },
          }).then(() => refetch());
        } else alert(`fill the inputs`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      close();
      setInputs(null);
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Modal">
        {/* Modal content */}
        {path === "/categories" && (
          <Input.Wrapper label="Name">
            <Input
              placeholder="Category name"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputs({
                  name: e.target.value,
                })
              }
            />
          </Input.Wrapper>
        )}

        {path === "/posts" && (
          <>
            <Input.Wrapper label="Title">
              <Input
                placeholder="Post title"
                value={inputs?.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputs({
                    ...inputs,
                    title: e.target.value,
                  })
                }
              />
            </Input.Wrapper>

            <Textarea
              label="Content"
              placeholder="Input post content"
              value={inputs?.content}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  content: e.target.value,
                })
              }
            />

            <Select
              label="Category"
              placeholder="Pick category"
              data={selectCategories}
              value={`${inputs?.categoryId}`}
              onChange={(value: string | null, option) =>
                setInputs({
                  ...inputs,
                  categoryId: Number(value),
                })
              }
            />
          </>
        )}

        <Button className="w-full mt-2" onClick={handleAdd}>
          Submit
        </Button>
      </Modal>

      <Group className="flex justify-end">
        <Button onClick={open}>Add</Button>
      </Group>
    </>
  );
}
