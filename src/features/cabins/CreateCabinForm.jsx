import styled from "styled-components";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabin = {}, onClose }) {
  const isEdit = Object.keys(cabin).length !== 0; // to determine whatever the form is used for editing OR adding a cabin

  const { id, image: existingImageUrl, ...editValues } = cabin;

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEdit ? editValues : {},
  });
  const { errors } = formState;

  const { mutateCreate, isCreating } = useCreateCabin();
  const { mutateEdit, isEditing } = useEditCabin();

  function onSubmit(data) {
    if (isEdit)
      mutateEdit(
        { id, editedCabin: data },
        {
          onSuccess: () => {
            onClose?.();
          },
        }
      );
    else
      mutateCreate(
        { ...data, image: data.image["0"] },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
  }
  function onError(error) {
    // console.log(error);
  }

  const isPending = isCreating || isEditing;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onClose ? "modal" : "regular"}>
      <FormRow label={"cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", { required: "this field is required!" })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isPending}
          {...register("maxCapacity", {
            required: "this field is required!",
            min: {
              value: 0,
              message: "capacity must be positive!",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isPending}
          {...register("regularPrice", {
            required: "this field is required!",
            min: {
              value: 0,
              message: "regular price must be positive!",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isPending}
          {...register("discount", {
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "discount must be smaller then regular price",
            min: {
              value: 0,
              message: "discount must be positive!",
            },
          })}
        />
      </FormRow>

      <FormRow
        label={"Description for website"}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isPending}
          {...register("description", { required: "this field is required!" })}
        />
      </FormRow>

      {!existingImageUrl && (
        <FormRow label={"Cabin photo"} error={errors?.image?.message}>
          <FileInput
            id="image"
            accept="image/*"
            {...register("image", { required: "this field is required!" })}
          />
        </FormRow>
      )}

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variant="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isPending}>{isEdit ? "edit" : "add"} cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
