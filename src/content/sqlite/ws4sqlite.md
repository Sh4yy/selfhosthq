---
order: 1
shortTitle: "ws4sqlite"
title: "Deploying a SQLite database with ws4sqlite"
description: "ws4sqlite is a server-side application that allows performing SQL queries and statements on SQLite files via REST (JSON over HTTP). It enables remote access to SQLite databases, making it useful for remote applications, serverless environments, or web pages."
lastModifiedAt: 2024-06-20
publishedAt: 2024-06-19
---

# Deploying a SQLite database with ws4sqlite

ws4sqlite is a server-side application that creates a REST API for interacting with SQLite databases. It basically converts SQLite into a REST API that you can interact with using HTTP requests.

It makes it easy to use SQLite over a remote connection, for example, from a serverless function or directly from a client-side application.

## Installing ws4sqlite

ws4sqlite is a Go application which you can download the binary directly from the [GitHub releases](https://github.com/proofrock/ws4sqlite/releases) page, or build from source.

## Running ws4sqlite

Once you have downloaded or built ws4sqlite, you can run your server and create a new SQLite database.

```bash
❯ ./ws4sqlite --db selfhost.db  # [!code focus]

ws4sqlite v0.16.1, based on sqlite v3.45.2
- Serving database 'selfhost' from selfhost.db?_pragma=journal_mode(WAL)
  + No valid config file specified, using defaults
  + File not present, it will be created
  + Using WAL
- Web Service listening on 0.0.0.0:12321
```

With our server up and running, we can now start interacting with our SQLite database over the network.

### Creating a table

To perform a SQL query or statement, all we need to do is send a POST request to the `/<database>` endpoint with the SQL statement in the body.

```python
import requests

url = "http://localhost:12321/selfhost"
payload = {
    "transaction": [
        {
            "statement": """
                CREATE TABLE USERS (
                    ID INT PRIMARY KEY,
                    FIRST_NAME VARCHAR(50),
                    LAST_NAME VARCHAR(50)
                );
            """
        }
    ]
}

response = requests.post(url, json=payload)
```

On success, the response will be a 200 status code with the following JSON body:

```json
{
  "results": [
    {
      "success": true,
      "rowsUpdated": 0
    }
  ]
}
```

### Inserting data

Similarly, to insert data into our `USERS` table, we can send a POST request to the `/<database>` endpoint with the SQL statement in the body.

```python
import requests

url = "http://localhost:12321/selfhost"
payload = {
    "transaction": [
        {
            "statement": """
                INSERT INTO USERS (ID, FIRST_NAME, LAST_NAME)
                VALUES (:id, :first_name, :last_name)
            """,
            "values": {
                "id": 1,
                "first_name": "John",
                "last_name": "Doe"
            }
        }
    ]
}

response = requests.post(url, json=payload)
print(response.json())
```

On success, the response will be a 200 status code with the following JSON body:

```json
{
  "results": [
    {
      "success": true,
      "rowsUpdated": 1
    }
  ]
}
```

### Querying data

Finally, to query data from our `USERS` table, we can send another POST request with a `query` transaction.

```python
import requests

url = "http://localhost:12321/selfhost"
payload = {
    "transaction": {
      "query": {
        "statement": "SELECT * FROM USERS;"
      }
    }
}

response = requests.post(url, json=payload)
print(response.json())
```

On success, the response will be a 200 status code with the following JSON body:

```json
{
  "results": [
    {
      "success": true,
      "resultHeaders": ["ID", "FIRST_NAME", "LAST_NAME"],
      "resultSet": [
        {
          "ID": 1,
          "FIRST_NAME": "John",
          "LAST_NAME": "Doe"
        }
      ]
    }
  ]
}
```

That's it! We've created a SQLite database, created a table, inserted data, and queried data.

## Authentication

A common use case for ws4sqlite is to expose a SQLite database over a remote connection. This opens up the ability to interact with the database from a remote client, such as a serverless function or a client-side application.

To make sure we're not exposing our database to the public, we can use basic authentication. Luckily, ws4sqlite has built-in support for basic authentication. Let's enable it and require authentication for all requests.

### Defining users

To define users, we need to create a new config file, and then update it to define the users.

In ws4sqlite, we can define config files by creating a `.yaml` file with the same name as the database. For example, if we're using the `selfhost.db` database, we can create a `selfhost.yaml` file.

```yaml
auth:
  mode: HTTP
  byCredentials:
    - user: user1
      password: password
```

This will create a new user called `user1` with the password `password`. Now, we can simply run our server again, and it will automatically use the new config file.

```bash
❯ ./ws4sqlite --db selfhost.db # [!code focus]

ws4sqlite v0.16.1, based on sqlite v3.45.2
- Serving database 'selfhost' from selfhost.db?_pragma=journal_mode(WAL)
  + Parsed companion config file: selfhost.yaml
  + Using WAL
  + Authentication enabled, with 1 credential
- Web Service listening on 0.0.0.0:12321
```

Now, to run queries against our database, we will have to pass the username and password as basic authentication credentials.

```python
import requests

url = "http://localhost:12321/selfhost"
payload = {
    "transaction": {
      "query": "SELECT * FROM USERS;"
    }
}

response = requests.post(url, json=payload, auth=("user1", "password"))
print(response.json())
```

On success, the response will be a 200 with the same JSON body as before. If we were to pass the wrong credentials, the response will be a 401 Unauthorized status code.

### Hashing passwords

Additionally, ws4sqlite supports hashing passwords. This is a good practice to use when storing passwords instead of plain text.

To do this, we can simply replace the `password` field with `hashedPassword` in our config file and provide a SHA-256 hashed password.

```bash
❯ echo -n "password" | sha256sum # [!code focus]

5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8  -
```

```yaml
auth:
  mode: HTTP
  byCredentials:
    - user: user1
      password: password
    - user: user2
      hashedPassword: 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
```

Now, we can run our server again, and this time pass the hashed username and password as basic authentication credentials.

## Backups

When running any database, it's important to ensure that we have regular database backups in case of any issues. There are multiple ways to backup a SQLite database, and fortunately, ws4sqlite has built-in support for this.

To schedule a backup, we need to head back to our `selfhost.yaml` file, and schedule a backup task.

```yaml
auth: // ...
scheduledTasks:
  - schedule: "1 * * * *" # Every hour
    doBackup: true
    backupTemplate: ./backups/dump_%s.db
    numFiles: 3
```

This will schedule a backup task to run every hour, store the backups in the `./backups` directory, and keep the last 3 backups. Of course, you may adjust the schedule, backup template, and number of files to meet your needs.

### Restoring from a backup

To restore from a backup, we can simply copy the backup file to the database file, and run our server again.

```bash
❯ ./ws4sqlite --db selfhost.db # [!code focus]
```

## Conclusion

ws4sqlite is a powerful tool that allows you to expose a SQLite database over a remote connection. It's a good choice for running a SQLite database in a serverless environment, or for running a SQLite database in a client-side application.

You can find the source code for ws4sqlite on [GitHub](https://github.com/proofrock/ws4sqlite).
