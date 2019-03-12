/**
 * Visual Studio Icons
*/
namespace vscode.TOC.View.Icons {

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

    export const vbnamespace: string = uri(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA
                                            7EAAAOxAGVKw4bAAABmElEQVR4XnVTsU7CUBS9YGqR9AcYbPwD4wIkxoWtUhgIowvExAjqx6gbi4kz6N
                                            CYsBDYCJN+AbbdykhbIgXqvS8v8eXxPMnLgXPPPc1r74U0TUFGHMc5PIbw3yBN9lFvVmq8w+NiYYWCI5
                                            Sc3W63wpqH5x4EZIXmpu/7T91u16zVaiCjXq9Dp9M5Rs8jeeUAQrPf74PrutDr9UAGaZ7nwWAwIEEZkA
                                            vDEIrFIhQKhQ8UbKFmk1YqlWC5XDKvIoALWSYl+Xw+BA7+O8lkMrDn5/e/QTqbTqegaRpJP7CPSNd1IA
                                            /iFHuuxCvc2rZtklCtVokmioCJZVlMQO8J0vVfgPDEJEmIDhQBh9vtVnkFwrPjON8kDIdDogtFwDmvAX
                                            pdpBcWwF/SK9JXuVyGzWbDnqYIOFqv10AexCdegwdIwIljAfIoI2mibzQagRwQG4YBs9kMgiCw5FFeLB
                                            aX9AXIg4hUc/DWaDTANE1ot9sgo9VqsRp5EO/iRonL9IBnHkVRijwW9DFOKWlz8oi9/62zrlhnvVKp7K
                                            3zLyx/3SSKVVkEAAAAAElFTkSuQmCC`);

    export const vbinterface: string = uri(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA
                                            7DAAAOwwHHb6hkAAAAkElEQVR4Xu1SIQ6EMBDsT+6ewh/4wLkz/ADDOwiWIPsIFBaD5uyJgmgrC9OEzQ
                                            ICsRI2mXQ7O7PdtFU3CO/92zmnVwQGDZ6LEmttASA/mE1WtkGlFQF78KhD9Bl+/5DXXQRycGiAk3bmcx
                                            MNkXl9GyogZ6MS3/ZjmMyMlbhY30QXgJnAG4gnEN+B/BXk/+CJBc8mVhfGFRsSAAAAAElFTkSuQmCC`);

    export const vbmodule: string = uri(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA
                                         7EAAAOxAGVKw4bAAAAVUlEQVR4Xu2SMQrAMAhFNbh4ot4oa86StTfKiRwtHUoCDkIkBELfIMiXj/hFVY
                                         UI9BYRmXJhZqSvKddtBmrLrpYgwCEGNB7F0LW1G9ioLBtj/P/A5wEG9hVnmCDA8wAAAABJRU5ErkJggg
                                         ==`);

    export const vbmethod: string = uri(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA
                                         7EAAAOxAGVKw4bAAACFUlEQVR4Xp2Tz4sScRjGH2UPoWFBC97qHrg3s5Mrmkx509us5OxJ2iYz135snb
                                         ZNKlwT1iIQvJQdFJJAFLwpG3jph+sG/QHCejDJUdODYN/emcMwDkbQA88ww/B5Zr4vzwvGGPSaTqdnyb
                                         vj8Vjq9Xq/6f4N+QJ0ktkVHXgaQHw+n8fq9fqZYrGIwWCAQCAQIvMU8hpAwmQy9bUpCkjeoS/2y+UyCw
                                         aDTBAEVq1W2edPX1gsFmN+v58VCgU2Go3G8t/JjMwqAZPJpF+r1RbAwU+JSYOh6sPDjywcDjOe51mlUm
                                         HE/FCPYDAYziWTSZjNZty/9wA2mw16rdnW8GQvgcd7u0in03C73asgGaERz28g9WIfz54/Rbd7Aq2Ojl
                                         qIbd8BzUeLLA7Rd82Hdec6SqX3iN+Nw+PxwOv10nMJ7XYbm8Im7PZLCAnX9QGqlGOEQgI47iry7/KgAV
                                         LQFbzMvILFYpHnBa2M+IusViu2bmxBlnhTVOBlMuL/tDzg+Nvxv4DlR2CMnUQiEaRS+zjIHGA4HC6FW6
                                         0WHj7agcvlArV1BkDtwUWO4xIOh0PM5XLGyO1bEGiQDsdlBZzNZjTQt2g0GhBFEU6n8zuADbXKml2wk7
                                         82m025lUrzqDBKO6PRKOt0OozeZ8inVJYu+k1cIW9LkvQrm80yn8/H8vm8XN0ugRw00gfog86TyxTECP
                                         xAXl22zn8AcMBI8DVOMowAAAAASUVORK5CYII=`);

    export const vbfield: string = uri(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA
                                        7EAAAOxAGVKw4bAAABPUlEQVR4XrWSsUvDQBjFv5OCcIKDCuogCM4NAeni5hAcFR0Ewb9Ap6KdBCsoKI
                                        g4OLoVBwctQZ06qYtLLSSb0EEU6iC2Be/W83vBQuBiDIgPHnzf++79skTQD9Ja4zZvDG1jF4J2ePellI
                                        agtCJ7QSndOL9/Mk7xIjJmZLgBnqnola9N2GzBmBNBqcVOuxu3BeJeI0dEj1f1V3evGtLoYD+drc3QxJ
                                        CkNAXPbVo+viNdWXEBcLFAXn4ssfDyoalYqVMtfLNuufiCB/nSTQQ6Wp1GZBVTADYoi/pSbv8HKEwNk7
                                        85i1EBoLAgzFq8Lc8pzxk/4GgS/8EIe5/96T80TaFUNbR0GneU4YY3eItODyp6w3e4wV6vBa2B3cuAoK
                                        1Fh/hriscT9qGU8h25BUgCYbeKWQUQ/FtBGGPoL/oCOaj4maA22jgAAAAASUVORK5CYII=`);

    export const vbproperty: string = uri(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA
                                           7EAAAOxAGVKw4bAAABHUlEQVR4Xo2SMWqFQBCGZ5dU2qTS3hO80jKItSQ3SEDsFFtB8AUEywh2NskN3j
                                           uAB7D0BPZqk0bbl50l6oPoxB8Gcdnv/2eYZUBomqZnAEhEnWBVI+pdUZQrAoyAz33fJ2VZQl3XCx3HMZ
                                           imCb8mZ7aXLOCL7/swjuMC27YNYRjeAy8ctoXJFDx3lewZnPDCvRzHWeA8zyFNU3mPw0FFUQRt20q4qq
                                           oFeDjIy3GCIPhzzjdW94qXdV0HQvMmGr4Bf2K7Xdftwqqqgud5cpV8C8ZZZ62drMlFUYCmafIxMQo2DA
                                           OyLJOJey9RwsMw3FzXvVmWtRT+4zmaAyEc4YNIfhNJX/8ZPB6ASYNvhAiYFBMzPgn2gp2gmSiEr3BQPw
                                           BwoN8BzQiLAAAAAElFTkSuQmCC`);
}