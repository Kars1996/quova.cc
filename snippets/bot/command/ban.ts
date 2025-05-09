import { Command } from "../../types";
import Embeds from "../../embeds";
import { PermissionFlagsBits } from "discord.js";



/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated, or used without prior consent.
Contact me for any enquiries
*/

const command: Command = {
    name: "ban",
    desc: "ban a user",
    dev: false,
    args: "<user> (reason)",
    expectedArgs: 1,
    aliases: ["b"],
    permissions: [PermissionFlagsBits.BanMembers],
    execute: async (message, args) => {
        const user =
            message.guild?.members.cache.get(args[0]) ||
            message.mentions.members?.first() ||
            message.guild?.members.cache.find(
                (member) =>
                    member.user.username === args[0] ||
                    member.user.tag === args[0]
            );
        if (!user) {
            return Embeds.fail("User **not found**", message, message.author);
        }
        if (user.id === message.author.id) {
            return Embeds.fail(
                "You **cannot** ban yourself",
                message,
                message.author
            );
        }
        if (user.id === message.client.user?.id) {
            return Embeds.fail(
                "You **cannot** ban me",
                message,
                message.author
            );
        }
        if (user.id === message.guild?.ownerId) {
            return Embeds.fail(
                "You **cannot** ban the server owner",
                message,
                message.author
            );
        }

        const userTopRole = user.roles.highest.position;
        const botMember = message.guild?.members.cache.get(
            message.client.user.id
        );
        if (!botMember) return;
        const botTopRole = botMember.roles.highest.position;

        if (userTopRole > botTopRole) {
            return Embeds.fail(
                "I **cannot** ban this user",
                message,
                message.author
            );
        }

        // ..
    },
};

export default command;
