// src/events/member-join.ts

import { GuildMember } from "discord.js";
import { BotEvent, AutoroleType } from "../types";
import { color } from "../functions";
import Embeds from "../embeds";

const event: BotEvent = {
    name: "guildMemberAdd",
    once: false,
    execute: async (member: GuildMember) => {
        try {
            if (member.user.bot) return;

            const guild = member.guild;
            if (!guild || !guild.available) return;

            const channel = guild.channels.cache.get("1368967038315270194");
            const message = Embeds.build(
                `> Welcome to quova.cc, **${member.user.tag}**\n-# Purchace @ <#1354295138721071186> • Support @ <#1369456575852318792>`
            );
            const row = Embeds.createActionRow([
                {
                    label: "🌐",
                    url: "https://quova.cc",
                },
                {
                    label: "📖",
                    url: "https://quova.cc/tos",
                },
                {
                    label: "💰",
                    url: "https://quova.cc/premium",
                },
            ]);

            if (
                channel &&
                "send" in channel &&
                typeof channel.send === "function"
            ) {
                await channel.send({ content: `${member}`, embeds: [message], components: [row] }).catch(e => e)
            }

            const autoRoles = await member.client.db.select<AutoroleType>("autoroles", {
                guild_id: guild.id,
            });

            if (!autoRoles || autoRoles.length === 0) return;

            console.log(
                color(
                    "text",
                    `Assigning autoroles to ${color(
                        "variable",
                        member.user.tag
                    )} in ${color("variable", guild.name)}`
                )
            );

            const guildRoles = guild.roles.cache;

            let assignedCount = 0;

            for (const autoRole of autoRoles) {
                const role = guildRoles.get(autoRole.role_id);

                if (!role) continue;

                const botMember = guild.members.cache.get(
                    member.client.user.id
                );
                if (!botMember) continue;

                const botHighestRole = botMember.roles.highest;

                //..
            }
        } catch (error) {
            //..
        }
    },
};

export default event;
