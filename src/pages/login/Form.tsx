import { Formik, Form, Field, ErrorMessage } from 'formik';

import Input from './Input';
import CustomErrorMessage from './ErrorMessage';

import { required } from '../../utils/validations';

type FormValues = {
  username: string;
  password: string;
};

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values: FormValues) => {
        console.log('onSubmit', values);
      }}
    >
      {({ dirty, isValid, isValidating }) => {
        return (
          <Form>
            <Field
              name="username"
              label="Username"
              type="text"
              component={Input}
              validate={required}
            />
            <ErrorMessage name="username" component={CustomErrorMessage} />

            <Field
              name="password"
              label="Password"
              type="password"
              component={Input}
              validate={required}
            />
            <ErrorMessage name="password" component={CustomErrorMessage} />

            <button
              className="block mx-auto mt-4 rounded-lg bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-400 px-6 py-2 text-sm text-white transition duration-150 ease-in-out"
              type="submit"
              disabled={!isValid || !dirty}
            >
              Log in
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
