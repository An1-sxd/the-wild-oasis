import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;

  const { signup, isSigningUp } = useSignup();

  function onValid(data) {
    console.log(data);
    const { email, password, fullName } = data;
    signup(
      { email, password, fullName },
      {
        onSettled: reset,
      }
    );
  }

  function onNotValid(errors) {}

  return (
    <Form onSubmit={handleSubmit(onValid, onNotValid)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", { required: "fullname is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "this email is not valid",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 8,
              message: "password needs minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "password confirming is required",
            validate: (value) =>
              value === getValues().password || "passwords need to match!",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variant="secondary" type="reset" disabled={isSigningUp}>
          Cancel
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
