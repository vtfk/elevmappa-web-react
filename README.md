# elevmappa-web

## How it works

### For a teacher

1. When they visit https://elevmappa.no they will need to login with theire Azure user + MFA
1. When they are signed in they will be presented with a list of all users they have a teacher-student-relation with
1. When they choose a student from the list:
    1. The [API](https://github.com/vtfk/azf-elevmappa-api) will fetch that students documents from the registered sources
    1. And the documents with their files will be presented in a list
1. When they choose a file to view from the document list:
    1. The [API](https://github.com/vtfk/azf-elevmappa-api) will fetch that students document with that files Base64 from the correct source
    1. The file will be presented to the teacher in a viewer

### For a school counselor (rådgiver 🇳🇴)

1. When they visit https://elevmappa.no they will need to login with theire Azure user + MFA
1. When they are signed in they will be presented with a list of all users on the school(s) they are counselor (rådgiver 🇳🇴) on
1. When they choose a student from the list:
    1. The [API](https://github.com/vtfk/azf-elevmappa-api) will fetch that students documents from the registered sources
    1. And the documents with their files will be presented in a list
1. When they choose a file to view from the document list:
    1. The [API](https://github.com/vtfk/azf-elevmappa-api) will fetch that students document with that files Base64 from the correct source
    1. The file will be presented to the teacher in a viewer

## Setup

Create a `.env` file with the following:
```text
REACT_APP_API_URL=%url-to-the-api%
REACT_APP_AUTH_AUTHORITY=https://login.microsoftonline.com/%azure-tenant-guid%
REACT_APP_AUTH_CLIENT_ID=%app-registration-client-id%
REACT_APP_AUTH_REDIRECT_URL=%url-to-redirect-back-to-after-successfull-login%
REACT_APP_AUTH_POST_LOGOUT_URL=%url-to-redirect-to-after-successfull-logout%
REACT_APP_DOCUMENTS_PR_PAGE=%number-of-documents-to-show-pr-page%
REACT_APP_STUDENTS_PR_PAGE=%number-of-students-to-show-pr-page%
REACT_APP_SENTRY_DSN=%dsn-url%
REACT_APP_SENTRY_ENV=production
```

## Vercel preview
If you need to test your code before deploying to Vercel, commit and push your changes to a branch named "preview". This will generate a preview deployment using the dev-api. The url for visiting the preview is [generated based on the branch name](https://vercel.com/docs/concepts/deployments/generated-urls#url-with-git-branch), and the branch-genereated url is also set up in the app registration for redirection, so you can test authentication as well.

## Sentry

This application uses [Sentry](http://sentry.io/) to log FrontEnd erros. To activate Sentry logging, add correct *dsn* (Data Source Name) from your Sentry project into `REACT_APP_SENTRY_DSN` in your `.env` file. *Environment is used from `NODE_ENV`, or it can be specified in `REACT_APP_SENTRY_ENV`.

# Flow

![draw.io](https://i.imgur.com/fVFHw45.png)
