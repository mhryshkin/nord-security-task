import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { required } from '../../utils/validations';
import authApi from '../../api/authApi';
import { FormValues } from '../../types/formValues';
import Logo from '../../assets/nord-security.svg';
import { useAuthContext } from '../../context/AuthContext';

import Input from './Input';
import CustomErrorMessage from './ErrorMessage';

const LoginPage = () => {
  const { token, isLoaded, login } = useAuthContext();
  const navigate = useNavigate();

  const {
    mutate: loginMutation,
    isSuccess,
    isLoading,
  } = useMutation({
    mutationFn: (values: FormValues) => {
      return authApi.login(values);
    },
  });

  if (isSuccess || (isLoaded && token)) {
    navigate('/servers');
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-teal-200 via-indigo-400 to-blue-500 p-10 flex place-items-center">
      <div className="w-full max-w-md mx-auto flex text-neutral-800">
        <div className="relative block w-full rounded-lg bg-white shadow-lg">
          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full rounded-lg flex justify-center items-center backdrop-blur-sm z-10">
              Loading
            </div>
          )}
          <div className="px-4 py-8 md:p-10">
            <div>
              <img className="mx-auto mb-10 w-114" src={Logo} alt="logo" />

              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={(values: FormValues) => {
                  loginMutation(values, {
                    onSuccess: ({ token }) => login(token),
                  });
                }}
              >
                {({ dirty, isValid }) => {
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
