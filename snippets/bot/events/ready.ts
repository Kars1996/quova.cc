import { Client, ClientUser, ActivityType } from "discord.js";
import { BotEvent } from "../types";
import { color } from "../functions";
import { updateLeaderboard} from "../service/leaderboard";

const event: BotEvent = {
    name: "ready",
    once: true,
    execute: (client: Client) => {
        const activities = [
            {
                text: "the leaderboard",
                type: ActivityType.Competing,
            },
            {
                text: "for new users",
                type: ActivityType.Watching,
            },
            {
                text: "the API",
                type: ActivityType.Listening,
            },
            {
                text: "the code",
                type: ActivityType.Streaming,
            },
            {
                text: "driving Kars mad 😭🙏",
                type: ActivityType.Custom,
            },
        ];
        const randomActivity = () => {
            const activity = Math.floor(Math.random() * activities.length);
            client.user!.setPresence({
                activities: [
                    {
                        name: activities[activity].text,
                        type: activities[activity].type,
                    },
                ],
                status: "dnd",
            });
        };
        randomActivity();
        setInterval(() => {
            randomActivity();
        }, 1000 * 20);

        setInterval(() => {
            updateLeaderboard();
        }, 1000 * 60 * 15);

        console.log(
            color(
                "text",
                `\n🚀 Logged in as ${color("variable", client.user?.tag)}`
            )
        );
    },
};

export default event;
