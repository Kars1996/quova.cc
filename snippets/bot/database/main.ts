import { Database } from "sqlite3";
import { readFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { promisify } from "util";



/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated, or used without prior consent.
Contact me for any enquiries
*/

interface Migration {
    id: number;
    name: string;
    sql: string;
    applied: boolean;
}

interface OperationResult<T> {
    success: boolean;
    data?: T;
    error?: Error;
}

export default class DatabaseManager {
    private db: Database;
    private schemaPath: string;
    private migrations: Migration[] = [];
    private migrationsDir: string;
    private migrationsTableCreated: boolean = false;

    /**
     * Constructor
     * @param dbPath Path to the database file
     * @param schemaPath Path to the schema file
     * @param migrationsDir Path to the migrations directory
     */
    constructor(
        dbPath: string = join(process.cwd(), "src", "data", "data.db"),
        schemaPath: string = join(
            process.cwd(),
            "src",
            "data",
            "schema",
            "schema.sql"
        ),
        migrationsDir: string = join(process.cwd(), "src", "data", "migrations")
    ) {
        // Ensure the directory exists
        const dbDir = dirname(dbPath);
        if (!existsSync(dbDir)) {
            mkdirSync(dbDir, { recursive: true });
        }

        if (!existsSync(migrationsDir)) {
            mkdirSync(migrationsDir, { recursive: true });
        }

        this.db = new Database(dbPath);
        this.schemaPath = schemaPath;
        this.migrationsDir = migrationsDir;
    }

    /**
     * Initialize the database
     * @returns Promise<boolean> Whether initialization was successful
     */
    async initialize(): Promise<boolean> {
        try {
            await Promise.all([
                this.createMigrationsTable(),
                this.applyInitialSchema(),
                this.applyMigrations()
            ]);

            return true;
        } catch (error) {
            console.error("Error initializing database:", error);
            return false;
        }
    }

    //..
}