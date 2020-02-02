namespace vscode {

    export interface CSS {
        string: string;
        comment: string;
        keyword: string;
        attribute: string;
        /**
         * 用户类型的颜色样式值
        */
        type: string;
        directive: string;

        globalFont: CanvasHelper.CSSFont;
        lineHeight: string;
    }

    export enum themes {
        default
    }

    export const styles = {
        default: defaultStyle
    }

    export function getStyle(theme: themes): CSS {
        return styles[themes[theme]];
    }
}