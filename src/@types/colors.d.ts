type HexDigit =
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f';

interface ColorCode {
    char: HexDigit;
    code: `&${HexDigit}`;
    color: number;
    shadowColor: number;
}
