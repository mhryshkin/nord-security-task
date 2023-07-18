import Logo from '../../assets/nord-security.svg';

const LoginPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-teal-200 via-indigo-400 to-blue-500 p-10 flex place-items-center">
      <div className="w-full max-w-md mx-auto flex text-neutral-800">
        <div className="block w-full rounded-lg bg-white shadow-lg">
          <div className="px-4 py-8 md:p-10">
            <div>
              <img className="mx-auto w-114" src={Logo} alt="logo" />

              <form className="mt-10">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="username"
                    className="
                        peer block w-full rounded border px-3 py-1 outline-none placeholder:text-transparent
                        transition-all duration-200 ease-linear motion-reduce:transition-none
                        focus:outline-none focus:shadow-outline"
                    id="username"
                  />
                  <label
                    htmlFor="username"
                    className="
                        pointer-events-none absolute left-3 top-1 max-w-[90%] origin-[0_0] truncate text-neutral-500
                        transition-all duration-200 ease-out
                        -translate-y-[0.9rem] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-[0.9rem]
                        scale-[0.8] peer-placeholder-shown:scale-[1] peer-focus:scale-[0.8]
                        peer-focus:text-primary bg-white peer-focus:bg-white peer-placeholder-shown:bg-transparent
                        motion-reduce:transition-none"
                  >
                    Username
                  </label>
                </div>

                <div className="relative mb-4">
                  <input
                    type="password"
                    placeholder="password"
                    className="
                        peer block w-full rounded border px-3 py-1 outline-none placeholder:text-transparent
                        transition-all duration-200 ease-linear motion-reduce:transition-none
                        focus:outline-none focus:shadow-outline"
                    id="password"
                  />
                  <label
                    htmlFor="password"
                    className="
                        pointer-events-none absolute left-3 top-1 max-w-[90%] origin-[0_0] truncate text-neutral-500
                        transition-all duration-200 ease-out
                        -translate-y-[0.9rem] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-[0.9rem]
                        scale-[0.8] peer-placeholder-shown:scale-[1] peer-focus:scale-[0.8]
                        peer-focus:text-primary bg-white peer-focus:bg-white peer-placeholder-shown:bg-transparent
                        motion-reduce:transition-none"
                  >
                    Password
                  </label>
                </div>

                <button
                  className="block mx-auto rounded-lg bg-indigo-500 hover:bg-indigo-400 px-6 py-2 text-sm text-white transition duration-150 ease-in-out"
                  type="button"
                >
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
