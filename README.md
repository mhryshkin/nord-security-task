# Nord Security Task

This application provides functionality for users to log in and log out, as well as view a list of servers.

## Running and Testing the Application

1. **Installation**: After cloning the repository to your local machine, navigate to the project folder and run `npm install` to install the necessary dependencies.

2. **Setting up Environment Variables**: Create a `.env` file at the root of your project and include the `VITE_API_URL` variable. Set it to the appropriate API endpoint.

   ```
   VITE_API_URL=<Your API endpoint here>
   ```

3. **Running the Application**: Use the command `npm run dev` to run the application in development mode.

4. **Building the Application**: Run `npm run build` to create a production-ready build.

5. **Previewing the Application**: You can preview the built application using `npm run preview`.

6. **Linting**: To lint your project using eslint, run `npm run lint`.

7. **Testing the Application**: Run `npm run test` to execute the tests.

## Potential Improvements/Things to Consider

1. **Consistent Codebase**: Implement `eslint` and `prettier` to maintain a consistent codebase, particularly when multiple developers are contributing to the repository. Including a linting check in the CI/CD process will assist in preserving code quality.

2. **Comprehensive Testing**: Prioritize the incorporation of integration and end-to-end tests to enhance code reliability and sustainability. Limited time and overlapping vacation schedules hindered comprehensive testing during initial development.

3. **Advanced Application Architecture**: Consider refining the application architecture to utilize more advanced methods, such as a feature/sliced architecture. Given the initial scale of the project, a straightforward React application architecture was employed, but additional contributors and project growth could warrant the inclusion of extra layers, such as modules, widgets, features, entities, etc.

4. **Automated Test Running in CI/CD**: Including automated test runs in the CI/CD pipeline would ensure that every pull request maintains consistent test coverage.

5. **Unified Components**: Design more unified components for the project. Future design and scale uncertainties currently discourage unnecessary unification, but as the project evolves, such an approach might become beneficial.

6. **Secure Token Storage**: Shift from storing the API token in local storage to employing a dedicated backend layer for API interaction. Storing the token in a cookie with an `httpOnly` flag would enhance security and prevent token access via JavaScript.

7. **Server-Side Rendering (SSR)**: If SEO and performance become critical factors for the application, consider utilizing SSR. A solution like Next.js, with its extensive built-in tooling, could be a viable option.

8. **Environment Expansion**: Expand the number of available environments. Currently, only local and production environments exist. However, a more comprehensive setup should include environments such as development, staging, etc., to streamline team workflows.
