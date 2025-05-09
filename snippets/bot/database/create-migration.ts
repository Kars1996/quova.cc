// scripts/create-migration.ts
import { promises as fs } from "fs";
import * as path from "path";
import * as os from "os";
import * as readline from "readline";
import * as child_process from "child_process";
import { promisify } from "util";
import styles, { spinner, divider } from "./utils/cli-styling";



/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated, or used without prior consent.
Contact me for any enquiries
*/

const exec = promisify(child_process.exec);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (query: string): Promise<string> =>
    new Promise<string>((resolve, reject) => {
        rl.question(styles.info(query), resolve);
    });

/**
 * Generate a migration file with a timestamp
 */
async function generateMigration(): Promise<void> {
    try {
        console.log(styles.header("CREATE MIGRATION"));

        const migrationName =
            process.argv[2] ||
            (await question("Enter migration name (e.g., add_users_table): "));

        if (!migrationName) {
            console.error(styles.error("Migration name is required"));
            process.exit(1);
        }

        const formattedName = migrationName
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "_");

        const timestamp = new Date()
            .toISOString()
            .replace(/[^0-9]/g, "")
            .slice(0, 14);
        const fileName = `${timestamp}_${formattedName}.sql`;

        const spin = await spinner("Setting up migration");
        spin.start();

        // Ensure migrations directory exists
        const migrationsDir = path.join(
            process.cwd(),
            "src",
            "data",
            "migrations"
        );
        await fs.mkdir(migrationsDir, { recursive: true });

        // Create temp file for editing
        const tempFilePath = path.join(os.tmpdir(), fileName);
        //..
    } catch (error) {
        //..
    }
}
