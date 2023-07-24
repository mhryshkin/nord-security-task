import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { required } from '../../utils/validations';
import authApi from '../../api/authApi';
import { FormValues } from '../../types/formValues';
import Logo from '../../assets/nord-security.svg';
import { useAuthContext } from '../../context/AuthContext';
import LoadingOverlay from '../../components/LoadingOverlay';

import Input from './Input';
import { AxiosError } from 'axios';

const LoginPage = () => {
  const { token, isLoaded, updateToken } = useAuthContext();
  const navigate = useNavigate();

  const {
    mutate: loginMutation,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: (values: FormValues) => {
      return authApi.login(values);
    },
  });

  useEffect(() => {
    if (isSuccess || (isLoaded && token)) {
      navigate('/servers');
    }
  }, [isLoaded, token, isSuccess]);

  const renderSubmitErrorMessage = (error: unknown) => {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError;
      switch (axiosError.response?.status) {
        case 401:
          return 'Incorrect username or password.';
        default:
          return 'Unexpected error. Please, contact support.';
      }
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-teal-200 via-indigo-400 to-blue-500 flex p-3 md:p-10">
      {isError && (
        <div className="absolute shadow-md p-4 flex flex-row rounded-lg bg-white bg-opacity-50 z-10 right-3 left-3 max-w-[768px] mx-auto animate-fade-out">
          <div className="bg-red-500 inline-block rounded-lg p-1 mr-1"></div>
          <p className="p-1">{renderSubmitErrorMessage(error)}</p>
        </div>
      )}
      <div className="w-full h-auto max-w-md mx-auto flex text-neutral-800 flex place-items-center">
        <div className="relative block w-full rounded-lg bg-white shadow-lg">
          {isLoading && <LoadingOverlay />}
          {isLoaded && !token ? (
            <div className="px-4 py-8 md:p-10">
              <div>
                <img className="mx-auto mb-10 w-114" src={Logo} alt="logo" />

                <Formik
                  initialValues={{ username: '', password: '' }}
                  onSubmit={(values: FormValues) => {
                    loginMutation(values, {
                      onSuccess: ({ token }) => updateToken(token),
                    });
                  }}
                >
                  {({ dirty, isValid, errors, touched }) => {
                    return (
                      <Form>
                        <Field
                          name="username"
                          label="Username"
                          type="text"
                          component={Input}
                          validate={required}
                          error={touched.username && errors.username ? errors.username : null}
                        />

                        <Field
                          name="password"
                          label="Password"
                          type="password"
                          component={Input}
                          validate={required}
                          error={touched.password && errors.password ? errors.password : null}
                        />

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
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
