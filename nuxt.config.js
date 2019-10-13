const env = require("dotenv").config();
const pkg = require("./package");
const path = require("path");

module.exports = {
  mode: "universal",
  env: env.parsed,
  /*
   ** Headers of the page
   */
  head: {
    title: "Dagg",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no"
      },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Rubik:400,700"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/css/tailwind.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    ["@nuxtjs/dotenv", { systemvars: true }],
    "@nuxtjs/pwa",
    "@nuxtjs/moment",
    "nuxt-purgecss"
  ],
  moment: {
    locales: ["sv"]
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    postcss: {
      plugins: {
        tailwindcss: path.resolve(__dirname, "./tailwind.config.js")
      }
    },
    extractCSS: true,
    extend(config, ctx) {}
  }
};
