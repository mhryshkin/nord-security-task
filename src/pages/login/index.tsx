import Logo from '../../assets/nord-security.svg';

import LoginForm from './Form';

const LoginPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-teal-200 via-indigo-400 to-blue-500 p-10 flex place-items-center">
      <div className="w-full max-w-md mx-auto flex text-neutral-800">
        <div className="block w-full rounded-lg bg-white shadow-lg">
          <div className="px-4 py-8 md:p-10">
            <div>
              <img className="mx-auto mb-10 w-114" src={Logo} alt="logo" />
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
