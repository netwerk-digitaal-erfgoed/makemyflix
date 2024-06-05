import { marked } from 'marked';

export default (input: string): string => {
  return marked.parse(input, { async: false }) as string;
}
