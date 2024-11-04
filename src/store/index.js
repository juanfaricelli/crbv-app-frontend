import { createStore } from 'vuex';

import app from './modules/app.js';
import auth from './modules/auth.js';
import patients from './modules/patients.js';
import medicalRecords from './modules/medicalRecords.js';

const store = createStore({
  modules: {
    app,
    auth,
    patients,
    medicalRecords,
  },
});

export default store;
