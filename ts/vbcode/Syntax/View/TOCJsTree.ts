namespace vscode.TOC.View {

    function uri(text: string): string {
        let blanks: RegExp = /\s+/g;
        let lines: string[] = Strings.lineTokens(text);
        let dataUri: string = $ts(lines)
            .Select(line => line.replace(blanks, ""))
            .JoinBy("");

        return dataUri;
    }

    export const vbclass: string = uri(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA
                                        7DAAAOwwHHb6hkAAAAhklEQVR4XrWTwQ2AIBAEqcMqLMkGLMGGLMMibMMPgadmH5coOeZMjJdsgMcOYY
                                        9LbeWcx1LKIWmfuHzzvs6nBBA2b8sgASQ2dyFapZ4ZAW4+L8wPtfkAgGUQCk/S2W52Adi+BsDd8QIygP
                                        P+s9Y6ue008w3AIUIZAEMMARKF+PmL/z1k8ZhfVF3/7pBb/jcAAAAASUVORK5CYII=`);

    export function jsTree(summary: Summary): JSTreeStaticDefaults {

    }
}