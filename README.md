# Vinköls Bygdegård

## Contribution

### Code of Conduct

1. We code and document in English.
2. We write git commit messages using the "This commit will" stadard where the commit message follows an imagined "this commit will" sentence, but starting with a capital letter. Examples:  
   `Add the photo gallery feature`  
   `Fix the indentation bug in the index file`  
   `Update the CMS documentation`  
   `Remove the old text formatting`  
   `Refactor the guest book component`  
   `Move the photo gallery to the top of the page`

3. We use pull requests to get code into master.

## Features and Functionality

### Quick notes:

1. The [CMS](https://vinkol.mikael.green/admin) is [Decap](https://decapcms.org) - [`docs`](https://decapcms.org/docs/intro/)
2. The website is a [React](https://react.dev) app. - [`docs`](https://react.dev/learn)
3. The hosting is Cloudflare Pages. - [`docs`](https://developers.cloudflare.com/pages)  
   Any changes to the `main` branch will trigger a new build and deploy.  
   The authorization that lets you in to the CMS is dependent on the files in `./functions`
