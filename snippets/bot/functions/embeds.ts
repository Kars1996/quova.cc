import {
    EmbedBuilder,
    TextChannel,
    Message,
    ChatInputCommandInteraction,
    User,
    ColorResolvable,
    DMChannel,
    NewsChannel,
    ThreadChannel,
    CommandInteraction,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageActionRowComponentBuilder,
    InteractionReplyOptions,
    MessageCreateOptions,
} from "discord.js";
import { themeColors } from "@quova/constants";



/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated, or used without prior consent.
Contact me for any enquiries
*/

export type MessageType = "text" | "success" | "error" | "variable";
export type colorType = "text" | "variable" | "error" | "success";
export type MessageDestination =
    | TextChannel
    | DMChannel
    | NewsChannel
    | ThreadChannel
    | CommandInteraction
    | ChatInputCommandInteraction
    | Message;

export interface ButtonConfig {
    id?: string;
    label: string;
    style?: ButtonStyle;
    emoji?: string;
    disabled?: boolean;
    url?: string;
}

const getThemeColor = (color: colorType): number | string => {
    return color in themeColors
        ? Number(`0x${themeColors[color].substring(1)}`)
        : themeColors.text;
};

export default class Embeds {
    private static createEmbed(
        text?: string,
        title?: string,
        type: MessageType = "text",
    ): EmbedBuilder {
        const color = getThemeColor(type as colorType) as ColorResolvable;
        const embed = new EmbedBuilder().setColor(color);

        if (title) embed.setTitle(title);

        if (text) {
            embed.setDescription(text);
        }

        return embed;
    }

    /**
     * Creates a button from the provided configuration
     * @param config The button configuration
     * @returns A ButtonBuilder instance
     */
    static createButton(config: ButtonConfig): ButtonBuilder {
        const button = new ButtonBuilder()
            .setLabel(config.label)
            .setStyle(config.style || ButtonStyle.Primary);

        if (config.emoji) button.setEmoji(config.emoji);
        if (config.disabled) button.setDisabled(true);
        if (config.url) {
            button.setURL(config.url);
            button.setStyle(ButtonStyle.Link);
        } else {
            button.setCustomId(config.id!);
        }

        return button;
    }
    //..
}