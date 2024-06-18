---
title: "Setting up a firewall in Hetzner Cloud"
shortTitle: "Firewall"
description: "Learn how Hetzner Cloud firewalls work and how to set it up for your server."
lastModifiedAt: 2024-06-18
publishedAt: 2024-06-18
---

# Setting up a firewall in Hetzner Cloud

Hetzner's Firewall is a security service offered by Hetzner Cloud. It adds an extra layer of protection for your servers by controlling the traffic that goes in and out.

## Creating a Firewall

To create a firewall, go to your Hetzner Cloud Console. Select your project, and from the left-hand menu, open the "Firewall" section. Here, you can create a new firewall.

## Configuring Firewall Rules

When setting up a new firewall, you can configure both Inbound and Outbound rules to manage the traffic to and from your servers. Each rule consists of:

- Source: The incoming IP address or range (for inbound rules).
- Destination: The outgoing IP address or range (for outbound rules).
- Protocol: The type of protocol (e.g., TCP, UDP).
- Port: The port number.

### Inbound rules

Inbound rules control the traffic that is allowed to enter your server. For example, you can restrict access by IP address, specify which ports are accessible, and define the allowed protocols.

> Note: If no inbound rules are set, the firewall will block all incoming traffic to your server.

Setting up inbound rules is important for protecting your servers from unauthorized access and attacks. It's a good idea to restrict access to essential ports and protocols. For example, you can create an inbound rule to limit SSH access (port `22`) to only your local IP address.

### Outbound rules

Outbound rules control the traffic that is allowed to leave your server. For example, you can restrict which IP addresses your servers can communicate with.

> Note: If no outbound rules are set, the firewall will allow all outgoing traffic from your server.

## Applying a Firewall to a Server

When setting up a web server or any service that needs internet access, you should create a firewall and apply it to the server.

For example, if you have a server running on port `80` and you want to control its access, you can create an inbound rule to allow traffic only from the internet. Here's how:

1. Define a new inbound rule.
2. Set it to allow `Any IPv4` and `Any IPv6` addressess.
3. Specify the protocol as `TCP` and the port as `80`.
4. Optionally, you can restrict access to specific IP addresses or ranges, but for now, we'll allow all internet traffic.

Finally, select the server(s) to which you want to apply the firewall, and then create and apply the firewall rule.

You may similarly create outbound rules to control the traffic that is allowed to leave your server.
