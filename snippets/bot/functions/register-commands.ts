import { Client } from "discord.js";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { color } from "../functions";
import { Command } from "../types";

module.exports = (client: Client) => {
    const commands: Command[] = [];
    let commandsDir = join(__dirname, "../commands");

    readdirSync(commandsDir).forEach((file) => {
        const filePath = join(commandsDir, file);

        if (statSync(filePath).isDirectory()) {
            const categoryFiles = readdirSync(filePath).filter((f) =>
                f.endsWith(".js")
            );
            categoryFiles.forEach((categoryFile) => {
                try {
                    const commandModule = require(join(filePath, categoryFile));
                    if (commandModule && commandModule.default) {
                        const command: Command = commandModule.default;
                        command.category = file;
                        commands.push(command);
                        client.commands.set(command.name, command);
                    } else {
                        console.log(
                            color(
                                "error",
                                `Failed to load command from ${categoryFile}: No default export`
                            )
                        );
                    }
                } catch (error) {
                    console.log(
                        color(
                            "error",
                            `Error loading command from ${categoryFile}: ${error}`
                        )
                    );
                }
            });
        }
    });

    console.log(
        color(
            "text",
            `🔥 Successfully loaded ${color(
                "variable",
                commands.length
            )} command(s)`
        )
    );
};
