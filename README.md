# Express MongoDB Typescript PoC

## Start

```npm install```
```npm run dev```

## DATABASE

Add connection string in src/models/database.ts

## Add new routes group

add new class in

src/routes/groups and register that group in  src/routes/groups/index.ts

## REST API

### USER

GET http://localhost:3000/v1/users -  List of users
POST http://localhost:3000/v1/users -  Create user
{
        "editor": "5ca36d3769af0d18e07bd5de",
        "email": "vladimir@gmail.com",
        "roles": [
        		{
        		 "groupId": "5ca37cc7cde4681ba2895dad",
                 "role": "manager"	
        		}
        ]
}

editor is ID of user which creating another user

PUT http://localhost:3000/v1/users -  Update user

{
        "editor": "5ca36d3769af0d18e07bd5de",
        "email": "vladimir@gmail.com",
        "roles": [
        		{
        		 "groupId": "5ca37cc7cde4681ba2895dad",
                 "role": "manager"	
        		}
        ]
}

DELETE http://localhost:3000/v1/users -  Delete user

{
    "id": "5ca36d3769af0d18e07bd5de",
    "editor": "5ca36d3769af0d18e07bd5de"
}

### GROUP

GET http://localhost:3000/v1/groups -  List of groups
POST http://localhost:3000/v1/groups -  Create group
{
        "editor": "5ca36d6c250db4190d302121",
        "name": "group1",
        "collectionIds": ["5ca36bb569af0d18e07bd5db"]
}

PUT http://localhost:3000/v1/groups -  Update group

{
        "editor": "5ca36d6c250db4190d302121",
        "id": "5ca36bb569af0d18e07bd5db",
        "name": "group1",
        "collectionIds": ["5ca36bb569af0d18e07bd5db"]
}

DELETE http://localhost:3000/v1/groups -  Delete group

{
    "id": "5ca36d3769af0d18e07bd5de",
    "editor": "5ca36d3769af0d18e07bd5de"
}

### ITEM

GET http://localhost:3000/v1/items -  List of items
POST http://localhost:3000/v1/items -  Create item
{
        "editor": "5ca37cd8cde4681ba2895dae",
        "name": "item1",
        "parentId": "5ca36bb569af0d18e07bd5db"
}

PUT http://localhost:3000/v1/items -  Update item

{
        "id": "5ca36d3769af0d18e07bd5de",
        "editor": "5ca37cd8cde4681ba2895dae",
        "name": "item1",
        "parentId": "5ca36bb569af0d18e07bd5db"
}

DELETE http://localhost:3000/v1/items -  Delete item

{
    "id": "5ca36d3769af0d18e07bd5de",
    "editor": "5ca36d3769af0d18e07bd5de"
}

### COLLECTION

GET http://localhost:3000/v1/items -  List of collections
POST http://localhost:3000/v1/items -  Create collection
{
        "editor": "5ca3735aec712b19c30c0533",
        "name": "col123"
}

PUT http://localhost:3000/v1/items -  Update collection

{
        "id": "5ca36d3769af0d18e07bd5de",
        "editor": "5ca3735aec712b19c30c0533",
        "name": "col123"
}

DELETE http://localhost:3000/v1/items -  Delete collection

{
    "id": "5ca36d3769af0d18e07bd5de",
    "editor": "5ca36d3769af0d18e07bd5de"
}