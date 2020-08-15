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

        return `data:image/png;base64,${dataUri}`;
    }

    export const vbclass: string = uri(`
        iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXM
        AAA7DAAAOwwHHb6hkAAAAhklEQVR4XrWTwQ2AIBAEqcMqLMkGLMGGLM
        MibMMPgadmH5coOeZMjJdsgMcOYY9LbeWcx1LKIWmfuHzzvs6nBBA2b
        8sgASQ2dyFapZ4ZAW4+L8wPtfkAgGUQCk/S2W52Adi+BsDd8QIygPP+
        s9Y6ue008w3AIUIZAEMMARKF+PmL/z1k8ZhfVF3/7pBb/jcAAAAASUV
        ORK5CYII=
    `);

    export const vbnamespace: string = uri(`
        iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXM
        AAA7EAAAOxAGVKw4bAAABmElEQVR4XnVTsU7CUBS9YGqR9AcYbPwD4w
        IkxoWtUhgIowvExAjqx6gbi4kz6NCYsBDYCJN+AbbdykhbIgXqvS8v8
        eXxPMnLgXPPPc1r74U0TUFGHMc5PIbw3yBN9lFvVmq8w+NiYYWCI5Sc
        3W63wpqH5x4EZIXmpu/7T91u16zVaiCjXq9Dp9M5Rs8jeeUAQrPf74P
        rutDr9UAGaZ7nwWAwIEEZkAvDEIrFIhQKhQ8UbKFmk1YqlWC5XDKvIo
        ALWSYl+Xw+BA7+O8lkMrDn5/e/QTqbTqegaRpJP7CPSNd1IA/iFHuux
        Cvc2rZtklCtVokmioCJZVlMQO8J0vVfgPDEJEmIDhQBh9vtVnkFwrPj
        ON8kDIdDogtFwDmvAXpdpBcWwF/SK9JXuVyGzWbDnqYIOFqv10AexCd
        egwdIwIljAfIoI2mibzQagRwQG4YBs9kMgiCw5FFeLBaX9AXIg4hUc/
        DWaDTANE1ot9sgo9VqsRp5EO/iRonL9IBnHkVRijwW9DFOKWlz8oi9/
        62zrlhnvVKp7K3zLyx/3SSKVVkEAAAAAElFTkSuQmCC
    `);

    export const vbinterface: string = uri(`
        iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXM
        AAA7DAAAOwwHHb6hkAAAAkElEQVR4Xu1SIQ6EMBDsT+6ewh/4wLkz/A
        DDOwiWIPsIFBaD5uyJgmgrC9OEzQICsRI2mXQ7O7PdtFU3CO/92zmnV
        wQGDZ6LEmttASA/mE1WtkGlFQF78KhD9Bl+/5DXXQRycGiAk3bmcxMN
        kXl9GyogZ6MS3/ZjmMyMlbhY30QXgJnAG4gnEN+B/BXk/+CJBc8mVhf
        GFRsSAAAAAElFTkSuQmCC
    `);

    export const vbmodule: string = uri(`
        iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXM
        AAA7EAAAOxAGVKw4bAAAAVUlEQVR4Xu2SMQrAMAhFNbh4ot4oa86StT
        fKiRwtHUoCDkIkBELfIMiXj/hFVYUI9BYRmXJhZqSvKddtBmrLrpYgw
        CEGNB7F0LW1G9ioLBtj/P/A5wEG9hVnmCDA8wAAAABJRU5ErkJggg==
    `);

    export const vbmethod: string = uri(`
        iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXM
        AAA7EAAAOxAGVKw4bAAACFUlEQVR4Xp2Tz4sScRjGH2UPoWFBC97qHr
        g3s5Mrmkx509us5OxJ2iYz135snbZNKlwT1iIQvJQdFJJAFLwpG3jph
        +sG/QHCejDJUdODYN/emcMwDkbQA88ww/B5Zr4vzwvGGPSaTqdnybvj
        8Vjq9Xq/6f4N+QJ0ktkVHXgaQHw+n8fq9fqZYrGIwWCAQCAQIvMU8hp
        AwmQy9bUpCkjeoS/2y+UyCwaDTBAEVq1W2edPX1gsFmN+v58VCgU2Go
        3G8t/JjMwqAZPJpF+r1RbAwU+JSYOh6sPDjywcDjOe51mlUmHE/FCPY
        DAYziWTSZjNZty/9wA2mw16rdnW8GQvgcd7u0in03C73asgGaERz28g
        9WIfz54/Rbd7Aq2OjlqIbd8BzUeLLA7Rd82Hdec6SqX3iN+Nw+PxwOv
        10nMJ7XYbm8Im7PZLCAnX9QGqlGOEQgI47iry7/KgAVLQFbzMvILFYp
        HnBa2M+IusViu2bmxBlnhTVOBlMuL/tDzg+Nvxv4DlR2CMnUQiEaRS+
        zjIHGA4HC6FW60WHj7agcvlArV1BkDtwUWO4xIOh0PM5XLGyO1bEGiQ
        DsdlBZzNZjTQt2g0GhBFEU6n8zuADbXKml2wk782m025lUrzqDBKO6P
        RKOt0OozeZ8inVJYu+k1cIW9LkvQrm80yn8/H8vm8XN0ugRw00gfog8
        6TyxTECPxAXl22zn8AcMBI8DVOMowAAAAASUVORK5CYII=
    `);

    export const vbfield: string = uri(`
        iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXM
        AAA7EAAAOxAGVKw4bAAABPUlEQVR4XrWSsUvDQBjFv5OCcIKDCuogCM
        4NAeni5hAcFR0Ewb9Ap6KdBCsoKI
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

    export const vboperator: string = uri(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA
                                           7EAAAOxAGVKw4bAAAAyklEQVR4Xr1TMQoCQQzMHoJyhYogNoovsBT8w1UWNoKFINjZ+gb9gSBYCDYW2v
                                           gHwVJ/oI0I4lkExWLFhTm4VLcrOrBLSJgkk+wqZtb0BVKfy+8snMg8b5MnnbdpiyyABF9KQGVpVwdrCv
                                           klu0IsniDfW4Ic2UpFMTcJWtvNANX+O0RPrDB2AMzjMA6Mv5hNiy0kaH8/Cqhc8Kk72dLl/rST0KxXDP
                                           l0ZVrtjuIdCAmyo1IuQ7N+w5Brww1CySWcwwf8P3rK+FWueAMBAUSsTmsB9QAAAABJRU5ErkJggg==`);

    export const vbdelegate: string = uri(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA
                                           7EAAAOxAGVKw4bAAAA7klEQVR4Xu2SsYrCQBCGZ3MYuKB9iryCdmInYhPxFeSKFIKdhfgUNlceaSyCr6
                                           CxOcTWzt4uFlpYmRUiZm/m2IUQWYho6Qc/YSfz/dUwyME5b+EnwDi5XxHmy7KsVVYw4J7AH4XOsOFDNj
                                           STxXo45yyOuehXv0W0Owh8/+e4P9FMvSt5ycYsMKkUsstCM0ulYzOSf2fbzvxnA9fkBkUomR/QHdSh3a
                                           uFBgqukotCu+SQSwVMyZO1B59lUyuqHUI6zIAneVHBu0DQYRDj5hQu50QrqB1COoIKlnhVavDQJZLL6J
                                           5RoFoXw6AYgmSM9wcPYZvgS2IeIQAAAABJRU5ErkJggg==`);

    export const vbstructure: string = uri(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA
                                            7EAAAOxAGVKw4bAAAAWUlEQVR4XtVT7QrAIAjM8I89YrCnG+wR86fRYDAa9CVRO1CQQ7njEETEaGCNEp
                                            gaMw/JICLAZ3DH1bUcTq+2sMkBfHmaogDuKuCTQq6oxtuGrP+eQo1f/40RbSkZGavw6UEAAAAASUVORK
                                            5CYII=`);

    export const vbIcon: string = uri(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA
                                       7DAAAOwwHHb6hkAAAA6UlEQVR4Xu1SvQ4BQRC+N+ANeALxBN5ApaXWKERLoVJoTn2RSCSikis0rqFQKe
                                       QaiZJoFCQn2fsp18xkjRE5ejHJ5L6d++abn13rRyyOY/3wKIpGgG3EH9wOgiD7ImBVhjpXn2ql1AHOfq
                                       E1w9ibZ2pj7Xg7EmEBqLoq9xZE2J8u+ny9ETYxcm975HOpM9eYIwWaoEpE/AosBTCRcMNZYwcuCyRJkp
                                       dVq4MlYYiljcAdsJm5kYC7oGpmNywmO6J/0kCx23d9JgAmkhyhPdmkC4RhWIQFMgEwkr6PIM1cISUyFi
                                       7fyvMd/O0On1xdHoEvwbIAAAAASUVORK5CYII=`);

}