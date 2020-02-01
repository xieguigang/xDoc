namespace vscode {

    export const keywords: string = `
        let|as|integer|double|boolean|string|function|if|else|next|call
    `;

    export function getKeywords(): string[] {
        return $from(Strings.lineTokens(keywords.trim()))
            .Where(line => !Strings.Empty(line, true))
            .Select(line => line.split("|"))
            .Unlist(a => a)
            .ToArray()
            ;
    }
}