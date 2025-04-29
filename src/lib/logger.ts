import chalk from 'chalk';

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

const logColors = {
  [LogLevel.DEBUG]: chalk.blue,
  [LogLevel.INFO]: chalk.green,
  [LogLevel.WARN]: chalk.yellow,
  [LogLevel.ERROR]: chalk.red
};

const logPrefixes = {
  [LogLevel.DEBUG]: '🐛',
  [LogLevel.INFO]: 'ℹ️',
  [LogLevel.WARN]: '⚠️',
  [LogLevel.ERROR]: '🚨'
};

class Logger {
  private static log(level: LogLevel, message: string, ...args: any[]) {
    const color = logColors[level];
    const prefix = logPrefixes[level];
    const timestamp = new Date().toISOString();
    console.log(
      color(`${prefix} [${timestamp}] [${level}] ${message}`),
      ...args
    );
  }

  static debug(message: string, ...args: any[]) {
    Logger.log(LogLevel.DEBUG, message, ...args);
  }

  static info(message: string, ...args: any[]) {
    Logger.log(LogLevel.INFO, message, ...args);
  }

  static warn(message: string, ...args: any[]) {
    Logger.log(LogLevel.WARN, message, ...args);
  }

  static error(message: string, ...args: any[]) {
    Logger.log(LogLevel.ERROR, message, ...args);
  }
}

export default Logger;
