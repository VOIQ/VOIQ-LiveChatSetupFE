# VOIQ Live Chat Setup FE
This application configures the VOIQ web voicebots, you must have a valid VOIQ user in order to use it, valid users can be created in the API.

## Deployment
First configure:

````
1. The apiUrl in src/config/voiq.json file
2. The user role permissions in src/config/UserRolePermissions.json
```` 

Then, in the local env just use:

````
yarn start
````

For the actual server deployment refer to [VOIQ-Docker](https://github.com/VOIQ/VOIQ-Docker)
