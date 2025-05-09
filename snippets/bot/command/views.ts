import { Command } from "../../types";
import Embeds from "../../embeds";
import getStats from "../../utils/getStats";
import getBio from "../../utils/getBio";

const command: Command = {
    name: "views",
    desc: "view total views or views of a profile",
    dev: false,
    args: "(url)",
    expectedArgs: 0,
    aliases: ["v"],
    execute: async (message, args) => {
        const profile = args[0];
        if (!profile) {
            const stats = await getStats();
            return Embeds.success(
                `**Total Views:** ${stats.views.toLocaleString()}`,
                message,
                message.author
            );
        }
        const user = await getBio(encodeURI(profile.toLowerCase()));
        if (user.status === "found") {
            return Embeds.success(
                `**${
                    user.displayName
                }'s Views:** ${user.views.toLocaleString()}`,
                message,
                message.author
            );
        } else if (user.status === "not_found") {
            return Embeds.fail(
                "Biolink **not found**",
                message,
                message.author
            );
        } else if (user.status === "banned") {
            return Embeds.fail(
                "This user was **banned**",
                message,
                message.author
            );
        } else {
            return Embeds.fail(
                "An **internal error** occured",
                message,
                message.author
            );
        }
    },
};

export default command;
