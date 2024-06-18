---
order: 1
title: "Setting up a network in Hetzner Cloud"
shortTitle: "Private Network"
description: "Learn how to deploy to Hetzner Cloud."
lastModifiedAt: 2024-06-18
publishedAt: 2024-06-18
---

# Setting up a network in Hetzner Cloud

Virtual Private Networks (VPC) are a part of the Hetzner Cloud that allows you to create a private network that is isolated from the internet. This is useful if you want to create a private network that is only accessible from your local network.

These networks provide a private environment that allows your servers to communicate directly with each other, without the need for a public IP address.

# Why use a Virtual Private Network?

Using a private network offers several advantages:

1. Security: By isolating your servers from the public internet, you reduce exposure to potential threats and attacks.

2. Efficiency: Servers within the same VPC can communicate directly, leading to improved performance and reduced latency for internal traffic.

3. Cost Savings: Internal traffic within a VPC is free, which can help reduce your overall bandwidth costs. Additionally, you no longer need to pay for dedicated IPv4 addresses, as you can use the internal IP addresses that are assigned to your servers.

4. Simplified Management: VPCs provide a flexible and scalable way to manage your network infrastructure.

# Creating your VPC

Hetzner Cloud makes it easy to create a private network. Simply navigate to your project, select the "Networks" tab, and then click the "Create Network" button.

You will then be able to customize your IP range, name your network, and select the region and data center that you want to create your network in.

Once you have filled in all of the required fields, you can then click the "Create" button to create your network.

## Adding a resource to your network

Head to your network, and then click the "Add Resource" button. You will then be able to select the resource that you want to add to your network.

Once you add the resource, Hetzner will automatically assign the resource an IP address within the range of your VPC. Your resource will then be able to communicate with other resources within the same VPC.

## Exposing your VPC to the internet

If you want to expose your VPC to the internet, you can do so by adding a load balancer that will route external traffic to your services within your VPC.

We will cover how to create a load balancer in the [next section](/hetzner/load-balancer).

> **Note:** Even if servers are within a VPC, their public IP addresses are still publicly accessible. You should either create a firewall rule to restrict access to your servers or remove the public IP address and limit access only through the VPC and load balancer.
