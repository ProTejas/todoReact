import { Client, Account, Databases } from 'appwrite';

const client = new Client();

const endpoint = process.env.REACT_APP_APPWRITE_ENDPOINT;
const projectId = process.env.REACT_APP_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
    console.error('Appwrite endpoint or project ID is not defined. Please check your .env file.');
}

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId); // Your project ID

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };