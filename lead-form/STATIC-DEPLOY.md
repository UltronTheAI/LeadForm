# Static Build Deployment Guide

This guide provides instructions on how to deploy the static build of the LeadForm application to various hosting platforms.

## Preparing for Deployment

The static build of the application is located in the `out` directory. Before deploying, make sure that:

1. You have set up the correct API URL in `.env.production`
2. You have run `npm run export` to generate the static build

## Backend Deployment

Remember that your backend API server still needs to be deployed separately. You can deploy it to:
- Heroku
- Vercel
- Railway
- DigitalOcean
- AWS
- Any other Node.js hosting service

Make sure to update the `.env.production` file with the correct API URL once your backend is deployed.

## Deployment Options

### Vercel (Recommended)

Vercel is perfect for Next.js applications and can host both your frontend and API:

1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root or connect your GitHub repository to Vercel
3. Vercel will automatically detect that this is a Next.js project and deploy it correctly

### Netlify

1. Install the Netlify CLI: `npm install -g netlify-cli`
2. Run `netlify deploy` or connect your GitHub repository to Netlify
3. Set the publish directory to `out`
4. Set up redirects in a `_redirects` file in the `out` directory:
   ```
   /*    /index.html   200
   ```

### GitHub Pages

1. Create a new repository on GitHub
2. Initialize git in your project: `git init`
3. Add GitHub Pages configuration in `next.config.mjs`:
   ```js
   const nextConfig = {
     output: 'export',
     basePath: '/repository-name', // Your GitHub repository name
     images: {
       unoptimized: true,
     },
   };
   ```
4. Add a `.nojekyll` file to the `out` directory:
   ```
   touch out/.nojekyll
   ```
5. Deploy using GitHub Actions or manually

### Amazon S3 + CloudFront

1. Create an S3 bucket and enable static website hosting
2. Upload all contents from the `out` directory to the bucket
3. Set up CloudFront for HTTPS and better performance
4. Configure CloudFront to handle client-side routing

## Configuring the API URL

The API URL is stored in `.env.production` as `NEXT_PUBLIC_API_URL`. Update this value with your deployed backend URL before building:

```
NEXT_PUBLIC_API_URL=https://your-production-api-url.com/api
```

## Testing the Static Build Locally

You can test the static build locally using:

```
npx serve out
```

This will serve the static files on a local development server, typically at http://localhost:3000.

## Additional Considerations

1. **CORS Configuration**: Ensure your backend API allows requests from your frontend domain
2. **SSL/HTTPS**: Make sure both your frontend and backend use HTTPS in production
3. **Environment Variables**: Different hosting platforms handle environment variables differently; refer to their documentation

## Troubleshooting

- If images don't load correctly, make sure the `unoptimized: true` setting is in your `next.config.mjs`
- For routing issues, you may need platform-specific configuration (e.g., `_redirects` for Netlify)
- If API calls fail, check that your `.env.production` file has the correct API URL and that CORS is properly configured on your backend 