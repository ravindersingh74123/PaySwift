
// import dotenv from 'dotenv';
// dotenv.config();
// import express from "express";
// import prisma from "../../db/index.js";
// const app = express();
// console.log('Loaded DATABASE_URL:', process.env.DATABASE_URL);

// app.use(express.json())

// app.post("/hdfcWebhook", async (req, res) => {
//     //TODO: Add zod validation here?
//     //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
//     const paymentInformation: {
//         token: string;
//         userId: string;
//         amount: string
//     } = {
//         token: req.body.token,
//         userId: req.body.user_identifier,
//         amount: req.body.amount
//     };

//     try {
//         await prisma.$transaction([
//             prisma.balance.updateMany({
//                 where: {
//                     userId: Number(paymentInformation.userId)
//                 },
//                 data: {
//                     amount: {
//                         // You can also get this from your prisma
//                         increment: Number(paymentInformation.amount)
//                     }
//                 }
//             }),
//             prisma.onRampTransaction.updateMany({
//                 where: {
//                     token: paymentInformation.token
//                 }, 
//                 data: {
//                     status: "Success",
//                 }
//             })
//         ]);

//         res.json({
//             message: "Captured"
//         })
//     } catch(e) {
//         console.error(e);
//         res.status(411).json({
//             message: "Error while processing webhook"
//         })
//     }

// })

// app.listen(3003);













import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import prisma from "@db";

const app = express();
console.log('Loaded DATABASE_URL:', process.env.DATABASE_URL);

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {

    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    console.log("Received webhook:", paymentInformation);

    try {

        const transaction = await prisma.onRampTransaction.findFirst({
            where: { token: paymentInformation.token }
        });

        if (!transaction) {
            console.log("Transaction not found for token:", paymentInformation.token);
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        // Then update in a transaction
        const result = await prisma.$transaction([
            prisma.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            prisma.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ], {
            timeout: 10000, // 10 second timeout
        });

        console.log("Transaction completed:", result);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error("Webhook error:", e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
});

app.listen(3003, () => {
    console.log("Server running on port 3003");
});