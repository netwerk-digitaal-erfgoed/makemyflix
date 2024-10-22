## Table of Contents

1. [Introduction](#introduction-to-makemyflix)
2. [Technical Requirements](#technical-requirements)
3. [Local Development](#local-development)
4. [Required Setup](#required-setup)
5. [Contributing](#contributing)

## Introduction to MakeMyFlix

Welcome to **MakeMyFlix**, an innovative project designed to empower users to create their own "flix".
A "flix" is a visual representation of a dataset, crafted to follow specific rules and present data in an accessible manner.
By leveraging linked open data, MakeMyFlix simplifies the process of displaying complex datasets,
making them easily understandable and available to the public.

## Technical Requirements
This project relies on several services to run correctly

1. Postgress database service
2. S3 compatible file service
3. Node

Although each project can run on their own given the correct env variables,
for development purposes we use the docker compose approach to make this easier to run.

## Local Development

1. **Clone the repository:**

    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Set up environment variables:**

    Copy the example environment file and modify it as needed:

    ```sh
    cp .env.example .env
    ```

3. **Run the project:**

    ```sh
    docker compose up
    ```

## Required Setup
To make the Nuxt / Strapi connection a bit more secure, it requires a token.
This is not something that is part of the installation and needs to be done afterwards.

1. **Create superadmin account**

    To create a superadmin account, goto: [Strapi](http://localhost:1001/admin)\
    This only works if no superadmin account exists*

2. **Create an API Token**

    After creating the superadmin, goto: [API Tokens](http://localhost:1001/admin/settings/api-tokens)\
    After creating the token, copy the token and paste it inside the `nuxt/.env` file.

3. **Restart services**

    Unfortunately Nuxt needs to reload to get the new setup, so restart the docker compose to do so using `docker compose restart`

## Contributing
We welcome contributions! Please follow these steps to contribute:

Fork the repository.

1. Create a new branch:
    ```
    git checkout -b my-feature-branch
    ```

2. Make your changes.

3. Commit your changes:
    ```
    git commit -m "Add some feature"
    ```

4. Push to the branch:
    ```
    git push origin my-feature-branch
    ```

5. Create a pull request.
