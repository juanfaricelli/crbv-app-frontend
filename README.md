# CLINICA REGINAL PRIVADA APP
# CRBV App Frontend

## Features
- Historias Clinicas
- Seguimiento de pacientes
- Gestion y seguimiento de turnos

## Project Setup
```sh
# npm
npm install
```

### Compiles and Hot-reloads for Development
```sh
# npm
npm run dev
```

### Compiles and Minifies for Production
```sh
# npm
npm run build
```

## Scripts

The following scripts are available in the project:

### Development
- `"dev": "vite"`: Starts the Vite development server.
- `"start-local": "NODE_ENV=local NODE_HTTPS=false vite"`: Starts the development server with the local environment configuration without HTTPS.
- `"start-local-https": "NODE_ENV=local NODE_HTTPS=true vite"`: Starts the development server with the local environment configuration with HTTPS.
- `"start-dev": "NODE_ENV=development NODE_HTTPS=false vite"`: Starts the development server with the development environment configuration without HTTPS.
- `"start-dev-https": "NODE_ENV=development NODE_HTTPS=true vite"`: Starts the development server with the development environment configuration with HTTPS.

### Production
- `"build": "vite build"`: Builds the project for production.
- `"preview": "vite preview"`: Previews the production build.
- `"start": "NODE_ENV=production NODE_HTTPS=false vite"`: Starts the production server without HTTPS.
- `"start-https": "NODE_ENV=production NODE_HTTPS=true vite"`: Starts the production server with HTTPS.

### Testing
- `"test": "NODE_ENV=test vite"`: Runs tests in the test environment.

### Linting
- `"lint": "eslint . --fix --ignore-path .gitignore"`: Lints the codebase and automatically fixes issues where possible, ignoring files specified in `.gitignore`.

## Customize Configuration

Check vite.config.js . For more information check [Configuration Reference](https://vitejs.dev/config/).

## Project Structure

- **public/**: Static assets and the main `index.html` file.
- **src/**: Main source directory.
  - **App.vue**: Root Vue component.
  - **assets/**: Static assets like images and styles.
  - **components/**: Reusable Vue components.
    - **DrawerContent.vue**: Component for drawer content.
    - **LoginForm.vue**: Component for the login form.
    - **patient/**: Directory for patient-related components.
  - **constants/**: TypeScript constants.
    - **index.ts**: Main constants file.
  - **helpers/**: JavaScript helper functions.
    - **constants.js**: JavaScript constants.
    - **encoderHelper.js**: Helper functions for encoding.
    - **mixins.js**: Vue mixins.
  - **layouts/**: Layout components.
    - **LogInLayout.vue**: Layout for the login page.
    - **MainLayout.vue**: Main application layout.
  - **plugins/**: Vue plugins.
    - **iconsMdi.js**: Plugin for Material Design Icons.
    - **index.js**: Main plugin file.
    - **vuetify.js**: Vuetify configuration.
  - **router/**: Vue Router configuration.
  - **store/**: Vuex store configuration.
  - **views/**: Vue components for different views.
- **.vscode/**: Visual Studio Code settings.
  - **settings.json**: Workspace-specific settings.
- **.browserslistrc**: Browser compatibility configuration.
- **.editorconfig**: Editor configuration.
- **.env.\***: Environment configuration files.
- **.eslintrc.js**: ESLint configuration.
- **.gitignore**: Git ignore file.
- **jsconfig.json**: JavaScript configuration for VSCode.
- **package.json**: Project metadata and dependencies.
- **vite.config.js**: Vite configuration file.

### Project Color Pallete
<div style="color: #000;">
  <div style="background-color: #9ebbe4; padding: 10px;">
    #9EBBE4
  </div>
  <div style="background-color: #7693ba; padding: 10px;">
    #7693BA
  </div>
  <div style="background-color: #4f6d92; padding: 10px;">
    #4F6D92
  </div>
  <div style="background-color: #28496b; padding: 10px;">
    #28496B
  </div>
  <div style="background-color: #002847; padding: 10px;">
    #002847
  </div>
</div>

Check other palettes generated at 
[My Color Space](https://mycolor.space/?hex=%239EBBE4&sub=1).
[Another variant](https://mycolor.space/?hex=%23D7DEE3&sub=1).

<img width="1512" alt="image" src="https://github.com/user-attachments/assets/957cda20-cd39-4c28-9d5c-5d5f4c0dd57a">
[coolors.co](https://coolors.co/d7dee3-2589bd-187795-38686a-a27e8e)
