import { Command, CommandRunner, Option } from 'nest-commander';

@Command({ name: 'hello', description: 'a hello command' })
export class HelloCommand extends CommandRunner {
  constructor() {
    super();
  }

  async run(): Promise<void> {
    console.log("Hello world !");
  }

  @Option({
    flags: '-n, --number [number]',
    description: 'A basic number parser',
  })
  parseNumber(val: string): number {
    return Number(val);
  }
}