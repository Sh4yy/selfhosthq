---
order: 0
title: "Provisioning a Server in Hetzner Cloud"
shortTitle: "Provisioning"
description: "Learn how to provision a server in Hetzner Cloud."
lastModifiedAt: 2024-06-18
publishedAt: 2024-06-18
---

# Provisioning a Server in Hetzner Cloud

The first step in deploying to Hetzner Cloud is to provision a virtual machine. This is done by creating a new server in the Hetzner Cloud console.

## Prerequisites

Before you begin, ensure you have the following:

- A Hetzner Cloud account.
- Access to the Hetzner Cloud Console.
- An SSH key pair (optional but recommended).

## Creating a Server

When creating a new server, there are a few things you need to know, such as the type of server, location, base image, and more.

In this guide, we'll cover the basics and what you need to get started.

### 1. Location

Choose a location for your server. This is a physical location in the world where your server will be hosted. When choosing a location, consider the following factors:

- **Distance**: The distance from your server to the user.
- **Availability**: The availability of the location.
- **Cost**: The cost of the location.

Additionally, certain jurisdictions may require you to host your data in a specific location. For example, some may require you to host your user data in a specific location. Therefore, you need to ensure that you choose a location that meets the requirements of the jurisdiction.

### 2. Image

Choose from a base image that you want to use for your server. This is the image that will be used to create your server. There are a few options available: Ubuntu, Fedora, Debian, CentOS, Rocky Linux, and more.

### 3. Server Type

Here you select which type of server you want to create, how many resources it should have, and what the pricing should be.

The main thing to consider is the difference between `Shared` and `Dedicated` servers.

- Shared servers are created on shared hardware and are not isolated from each other. This means that all servers on the same hardware share the same resources.
- Dedicated servers are created on dedicated hardware and are isolated from each other. This means that each server has its own resources.

Dedicated servers are usually more expensive than shared servers, but they provide better performance and you don't have to worry about [noisy neighbor](https://en.wikipedia.org/wiki/Cloud_computing_issues#Performance_interference_and_noisy_neighbors) problems.

The resources you decide to allocate to your server will depend on your use case and how much traffic you expect to handle. It's recommended to start with a smaller server type and then scale up if you need more resources.

### 4. Networking

Networking is a crucial part of the process. Here you are given the option to add an IPv4 and/or IPv6 address to your servers or to use a private network so that your server can only be accessed from your local network.

The benefit of using a private network is that it provides better isolation and security. It also makes it easier to ensure fine-grained control over exposing your server to the internet. (We'll cover this in more detail in the [networking](/hetzner/network) section.)

### 5. SSH Keys

Finally, it's time to add your SSH keys to the server. You may skip this step and use password authentication, but using SSH keys is recommended. Add your public SSH key to the server, and then you can use the private key to access the server.

### 7. Advanced Options

For users with more specific needs, Hetzner Cloud offers advanced options such as:

- **Volumes**: Add extra storage volumes to your server.
- **Labels**: Use labels to organize and manage your resources efficiently.
- **Backup**: Set up a backup schedule for your server.
- **Cloud-Init**: Use cloud-init to customize your server during the initial boot.

You can find these options under the "Advanced Options" tab when creating your server.

### 7. Review and Create

Review your server settings, and then click on "Create server" to create your server.
