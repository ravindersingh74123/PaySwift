"use strict";
"use server";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOnRampTransaction = createOnRampTransaction;
const index_1 = __importDefault(require("@/db/index"));
const next_auth_1 = require("next-auth");
const auth_1 = require("../auth");
async function createOnRampTransaction(provider, amount) {
    // Ideally the token should come from the banking provider (hdfc/axis)
    const session = await (0, next_auth_1.getServerSession)(auth_1.authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        };
    }
    const token = (Math.random() * 1000).toString();
    await index_1.default.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    });
    return {
        message: "Done"
    };
}
