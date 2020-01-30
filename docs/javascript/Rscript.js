/// <reference path="../build/linq.d.ts"/>
$ts.mode = Modes.debug;
var CodeStyler = /** @class */ (function () {
    function CodeStyler() {
        this.code = new StringBuilder("", "<br />\n");
        this.rowList = [];
    }
    CodeStyler.prototype.comment = function (text) {
    };
    CodeStyler.prototype.string = function (str) {
    };
    CodeStyler.prototype.appendLine = function () {
    };
    return CodeStyler;
}());
define("Highlights/Syntax", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Syntax = /** @class */ (function () {
        function Syntax(chars) {
            this.chars = chars;
            this.code = new CodeStyler();
            this.escapes = {
                string: false,
                comment: false,
                keyword: false,
                quot: "'"
            };
            this.tokenBuffer = [];
        }
        Syntax.prototype.getTokens = function () {
            while (!this.chars.EndRead) {
                this.walkChar(this.chars.Next);
            }
            return this.code;
        };
        /**
         * ??????????
        */
        Syntax.prototype.walkNewLine = function () {
            // ??????
            if (this.escapes.comment) {
                // vb???????????????????                    
                this.code.comment(this.tokenBuffer.join("").replace("<", "&lt;"));
                this.escapes.comment = false;
                this.tokenBuffer = [];
            }
            else if (this.escapes.string) {
                // vb??????????????????
                // this.token.push("<br />");
                this.code.string(this.tokenBuffer.join(""));
                this.code.appendLine();
                this.tokenBuffer = [];
            }
            else {
                // ?????token
                this.endToken();
                this.code.appendLine();
            }
        };
        Syntax.prototype.endToken = function () {
        };
        Syntax.prototype.walkChar = function (c) {
            var escapes = this.escapes;
            if (c == "\n") {
                this.walkNewLine();
            }
            if (escapes.comment) {
            }
            if (c == "#") {
            }
        };
        return Syntax;
    }());
    exports.Syntax = Syntax;
});
//# sourceMappingURL=Rscript.js.map