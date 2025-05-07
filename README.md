# Frontend Mentor - QR code component solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

# Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Improved with](#improved-with)
  - [Tested with](#tested-with)
  - [Iterations](#iterations)
    - [Iteration 1](#iteration-1)
  - [What I learned](#what-i-learned)
    - [Next.js Server Component rendering](#nextjs-server-component-rendering)
    - [MongoDB connection](#mongodb-connection)
    - [MongoDB model](#mongodb-model)
    - [MongoDB URI](#mongodb-uri)
  - [Useful resources](#useful-resources)

# Overview

## Screenshot

## Links

- Solution URL: [TODO - On Frontend Mentor](#)
- Live Site URL: [TODO - On Github Pages](https://radkr.github.io/browser-extensions-manager-ui/)

# My process

## Built with

- Semantic HTML5 markup
- CSS custom properties
- Mobile-first workflow
- Responsive design
- Next.js + React.js

## Improved with

- TODO - Autoprefixer to increase browser coverage

## Tested with

- TODO - WAVE Web Accessibility Evaluation Tool
- Jest + React Testing Library + User Event Testing Library

## Iterations

### Iteration 1

See the product list on my mobile device.

## What I learned

### Next.js Server Component rendering

I want to make this project a bit more closer to a real world scenario by

- fetching the product list from a database so products can be added or removed without needing to rebuild the application while
- preserving server-side rendering as a step towards SEO so the shop's products can be find easier while browsing the internet.

To achieve this, I found that the product list should be [rendered server side](https://nextjs.org/docs/app/building-your-application/rendering/server-components) statically (at build time) but [incrementally regenerated](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration) at runtime by invalidating the cache on the server side at regular intervals.

### MongoDB connection

The singleton pattern is preferred to reuse the MongoDB connection, otherwise Next.js' hot reload (on development) and serverless function cold starts can trigger multiple reconnections, which is bad for performance and can exceed Atlas connection limits.

In Node.js, `global` is the global object (like `window` in the browser) and it persists across hot reloads in Next.js development mode. Even if modules are re-imported (due to Next.js hot reload), `global` is not reset. This makes it a perfect candidate to attach the database connection to that.

For a "hot reload safe" cached database connection pool see `app/_lib/database.js`.

### MongoDB model

Recreating the same Mongoose model multiple times should be avoided, as it can cause runtime errors. That is why Mongoose models should be cached as well.

For a safe, cached model example, see `app/_models/product.js`.

### MongoDB URI

The MongoDB URI should be retrieved from an environment variable to prevent hardcoding sensitive credentials (like database username and password) into the codebase. Environment variables for a Next.js project can be saved in a file named `/.env.local`, which:

- is ignored by Git (because Next.js’s default .gitignore includes .env.local)
- is loaded automatically by Next.js during development and build processes

Later, when deploying the project, environment variables must be provided to the hosting platform (such as Vercel, AWS, etc.), using the platform's environment variable settings.

```javascript
// .env.local

MONGODB_URI =
  "mongodb+srv://<USERNAME>:<PASSWORD>@development.jebfnk5.mongodb.net/<DATABASE_NAME>?retryWrites=true&w=majority&appName=<CLUSTER_NAME>";
```

Using mongoose ODM, the collection name is generated from the model name by pluralizing and lowercasing it (e.g for `Product` the collection name will be `products`).

```javascript
const ProductSchema = new mongoose.Schema({
  /* fields */
});
mongoose.model("Product", ProductSchema);
```

The collection name can beforced as well as follows:

```javascript
const ProductSchema = new mongoose.Schema(
  {
    /* fields */
  },
  { collection: "products" } // explicit
);
mongoose.model("Product", ProductSchema);
```

## Useful resources

TODO
