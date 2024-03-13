import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; // import elements from yup library used for validation
// we want to use 'yup' variable to generate a shape of how our form should look like

// schema 'for validation' is used for shaping how our form should look like
export const Form = () => {
  
  // used the shape function, then we identify the identity of each -
  //object in the schema
  const schema = yup.object().shape({ // we're saying our schema (form) would look like an object
    fullName: yup.string().required("Your Full Name is Required!"), // this shows this must be a string
    email: yup.string().email().required(),
    age: yup.number().positive().integer().min(18).required(),  // this shows this must be a number, positive, an intiger/whole number, minimum age of 18+
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(), // min max numbers of your password
    confirmPassword: yup
      .string() 
      .oneOf([yup.ref("password"), null], "Passwords Don't Match") // to get the same value inputed in 'password'
      .required(),
  });

  // we are getting back an object 'from the form' with all the data

  const {
    register, handleSubmit, formState: { errors }, // to display errors from the form state
  } = useForm({ // a resolver is where we specify how our schema would look like
    resolver: yupResolver(schema), // 'yupResolver' is a function from the 'hookform library' that we are passing the schema into to tell the resolver 'this is how the form should be'
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Full Name..." {...register("fullName")} />
      <p>{errors.fullName?.message}</p>
      <input type="text" placeholder="Email..." {...register("email")} />
      <p>{errors.email?.message}</p>
      <input type="number" placeholder="Age..." {...register("age")} />
      <p>{errors.age?.message}</p>
      <input
        type="password"
        placeholder="Password..."
        {...register("password")}
      />
      <p>{errors.password?.message}</p>
      <input
        type="password"
        placeholder="Confirm Password..."
        {...register("confirmPassword")}
      />
      <p>{errors.confirmPassword?.message}</p>
      <input type="submit" />
    </form>
  );
};
