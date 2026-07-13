export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

export type LogContext = Readonly<Record<string, string | number | boolean | null | undefined>> & {
  requestId?: string;
};

type LogEntry = {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  error?: { name: string; message: string; stack?: string };
};

const levelPriority: Record<LogLevel, number> = { DEBUG: 10, INFO: 20, WARN: 30, ERROR: 40 };
const minimumLevel: LogLevel = process.env.NODE_ENV === "production" ? "INFO" : "DEBUG";

function serializeError(error: unknown): LogEntry["error"] {
  if (error instanceof Error) return { name: error.name, message: error.message, stack: error.stack };
  return { name: "UnknownError", message: String(error) };
}

function shouldLog(level: LogLevel) {
  return levelPriority[level] >= levelPriority[minimumLevel];
}

function write(entry: LogEntry) {
  if (!shouldLog(entry.level)) return;
  const payload = JSON.stringify(entry);
  if (entry.level === "ERROR") console.error(payload);
  else if (entry.level === "WARN") console.warn(payload);
  else console.log(payload);
}

export const logger = {
  debug: (message: string, context?: LogContext) => write({ level: "DEBUG", message, context, timestamp: new Date().toISOString() }),
  info: (message: string, context?: LogContext) => write({ level: "INFO", message, context, timestamp: new Date().toISOString() }),
  warn: (message: string, context?: LogContext) => write({ level: "WARN", message, context, timestamp: new Date().toISOString() }),
  error: (message: string, error?: unknown, context?: LogContext) =>
    write({ level: "ERROR", message, context, error: serializeError(error), timestamp: new Date().toISOString() }),
  child: (context: LogContext) => ({
    debug: (message: string, additionalContext?: LogContext) => logger.debug(message, { ...context, ...additionalContext }),
    info: (message: string, additionalContext?: LogContext) => logger.info(message, { ...context, ...additionalContext }),
    warn: (message: string, additionalContext?: LogContext) => logger.warn(message, { ...context, ...additionalContext }),
    error: (message: string, error?: unknown, additionalContext?: LogContext) => logger.error(message, error, { ...context, ...additionalContext }),
  }),
};
