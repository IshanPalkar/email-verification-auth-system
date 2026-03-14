import morgan from "morgan";

export const apiLogger = morgan(
  ":method :url :status :response-time ms - :res[content-length]"
);