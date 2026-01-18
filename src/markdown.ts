import { Album } from "./interfaces";

const replacements: Array<[RegExp, string]> = [
  [/\*/g, "\\*"],
  [/#/g, "\\#"],
  [/\//g, "\\/"],
  [/\(/g, "\\("],
  [/\)/g, "\\)"],
  [/\[/g, "\\["],
  [/\]/g, "\\]"],
  [/</g, "&lt;"],
  [/>/g, "&gt;"],
  [/_/g, "\\_"],
  [/`/g, "\\`"],
  [/\|/g, "\\|"],
];

function esc(string: string): string {
  return replacements.reduce(function (string: string, replacement: [RegExp, string]): string {
    return string.replace(replacement[0], replacement[1]);
  }, string);
}

/** Returns list of albums as Markdown list */
export function albumsToMarkdownOutput(albums: Album[]): string {
    return albums
      .map((al: any) => {
        return `- [**${esc(al.title)}** by ${esc(al.artist)}](${al.url})`;
      })
      .join("\n");
    }