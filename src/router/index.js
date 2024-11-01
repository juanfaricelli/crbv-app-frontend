// Composables
import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "home",
    path: "/home",
    meta: { needsAuth: true },
    components: {
      default: () => import("@/layouts/MainLayout.vue"),
      content: () => import("@/views/Home.vue"),
    },
  },
  {
    path: "/patient/:patientId",
    name: "patient",
    meta: { needsAuth: true },
    components: {
      default: () => import("@/layouts/MainLayout.vue"),
      content: () => import("@/views/patient/PatientView.vue"),
    },
    children: [
      {
        path: "/patient/:patientId",
        name: "patient-info",
        meta: { needsAuth: true },
        components: {
          content: () => import("@/views/patient/PatientInfo.vue"),
        },
        // // route level code-splitting
        // // this generates a separate chunk (Home-[hash].js) for this route
        // // which is lazy-loaded when the route is visited.
        // component: () => import("@/views/PatientView.vue"),
      },
      {
        path: "/patient/new/:patientId?",
        name: "patient-new",
        meta: { needsAuth: true },
        props: true,
        components: {
          content: () => import("@/views/patient/PatientDataForm.vue"),
        },
      },
      {
        path: "/patient/update/:patientId?/update=:update?",
        name: "patient-update",
        meta: { needsAuth: true },
        props: true,
        components: {
          content: () => import("@/views/patient/PatientDataForm.vue"),
        },
      },
      {
        path: "/patient/medical-record/:patientId",
        name: "patient-medical-record",
        meta: { needsAuth: true },
        props: true,
        components: {
          content: () => import("@/views/patient/PatientMedicalRecords.vue"),
        },
        children: [
          {
            path: "new-entry",
            name: "patient-medical-record-new-entry",
            component: () =>
              import("@/components/medical-record/MedicalRecordForm.vue"),
            props: true,
          },
          {
            path: "history",
            name: "patient-medical-record-history",
            component: () =>
              import("@/views/patient/PatientMedicalRecords.vue"),
            props: true,
          },
        ],
      },
    ],
  },
  {
    name: "login",
    path: "/",
    meta: { needsAuth: true },
    component: () => import("@/layouts/LogInLayout.vue"),
  },
  // {
  //   path: '/',
  //   component: () => import('@/layouts/default/Default.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'Home',
  //       // route level code-splitting
  //       // this generates a separate chunk (Home-[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import('@/views/Home.vue'),
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// before navigating to a page this is executed
router.beforeEach((to, from, next) => {
  // to --> the page we are navigating to
  // from --> the page were we are coming from
  // next --> function to call to allow or cancel the incoming navigation
  console.log("beforeEach", to, from);
  if (to.meta.needsAuth) {
    next(store.getters.getIsAuthenticated);
  }
});

export default router;
