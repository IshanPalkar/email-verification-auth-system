import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

import { emailQueue } from "./email.queue";

export const setupBullBoard = () => {
  const serverAdapter = new ExpressAdapter();

  serverAdapter.setBasePath("/queues");

  createBullBoard({
    queues: [
      new BullMQAdapter(emailQueue)
    ],
    serverAdapter
  });

  return serverAdapter;
};