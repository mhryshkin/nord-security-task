import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import { Field, Form, Formik } from 'formik';
import Input from '../../../../pages/login/Input';
import { required } from '../../../../utils/validations';

describe('<Input />', () => {
  it('renders without crashing', () => {
    render(
      <Formik initialValues={{ test: '' }} onSubmit={jest.fn()}>
        <Form>
          <Field component={Input} name="test" type="text" label="Test" />
        </Form>
      </Formik>
    );
  });

  it('displays the label', () => {
    render(
      <Formik initialValues={{ test: '' }} onSubmit={jest.fn()}>
        <Form>
          <Field component={Input} name="test" type="text" label="Test" />
        </Form>
      </Formik>
    );
    expect(screen.getByLabelText('Test')).toBeInTheDocument();
  });
  it('displays error message', async () => {
    render(
      <Formik
        initialValues={{ test: '' }}
        validate={(values) => {
          const errors = {} as any;
          if (required(values.test)) {
            errors.test = 'Test Error';
          }
          return errors;
        }}
        onSubmit={jest.fn()}
      >
        {({ errors }) => {
          return (
            <Form>
              <Field component={Input} name="test" type="text" label="Test" error={errors.test} />
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Test Error')).toBeInTheDocument();
    });
  });

  it('handles input value', async () => {
    render(
      <Formik initialValues={{ test: '' }} onSubmit={jest.fn()}>
        <Form>
          <Field component={Input} name="test" type="text" label="Test" />
        </Form>
      </Formik>
    );

    const input = screen.getByLabelText('Test');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Test Value' } });
    });

    expect(input).toHaveValue('Test Value');
  });
});
