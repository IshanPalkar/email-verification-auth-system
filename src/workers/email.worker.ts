import dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";
import { sendVerificationEmail } from "../services/email.service";

const worker = new Worker(
  "emailQueue",
  async job => {

    if (job.name === "sendVerificationEmail") {

      const { email, token } = job.data;

      const verificationLink =
        `http://localhost:3000/auth/verify?token=${token}`;

      await sendVerificationEmail(email, verificationLink);

      console.log("Email sent:", email);

    }

  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379
    }
  }
);

worker.on("completed", job => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});