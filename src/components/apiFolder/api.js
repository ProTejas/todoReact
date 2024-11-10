import { Client, Databases, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67028d4d001fb9bd0732');

const databases = new Databases(client);

const promise = databases.createDocument(
    '670295d0001b10f7d6f2',
    '670295e700298af65761',
    ID.unique(),
    {
        "title": "Hamlet",
        "Descriptipon": "Tejas Salunke"
    }
);

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});