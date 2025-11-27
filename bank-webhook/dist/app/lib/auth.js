"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOptions = void 0;
const index_1 = __importDefault(require("@/db/index"));
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.authOptions = {
    providers: [
        (0, credentials_1.default)({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                    placeholder: "1231231231",
                    required: true,
                },
                password: { label: "Password", type: "password", required: true },
            },
            async authorize(credentials) {
                if (!credentials)
                    return null;
                const existingUser = await index_1.default.user.findFirst({
                    where: { number: credentials.email },
                });
                if (existingUser) {
                    const isValid = await bcrypt_1.default.compare(credentials.password, existingUser.password);
                    if (isValid) {
                        return {
                            id: existingUser.id.toString(),
                            email: existingUser.email,
                        };
                    }
                    return null;
                }
                const hashedPassword = await bcrypt_1.default.hash(credentials.password, 10);
                try {
                    const newUser = await index_1.default.user.create({
                        data: {
                            number: credentials.email,
                            password: hashedPassword,
                        },
                    });
                    return {
                        id: newUser.id.toString(),
                        email: newUser.email,
                    };
                }
                catch (e) {
                    console.error(e);
                    return null;
                }
            },
        }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email; // <-- Add this
            }
            return token;
        },
        async session({ token, session }) {
            session.user.id = token.id;
            session.user.email = token.email; // <-- And this
            return session;
        }
    }
};
