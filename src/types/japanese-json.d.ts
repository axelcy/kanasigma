declare module 'japanese-json' {
    export interface KanaEntry {
        Katakana: string
        Hiragana: string
        Romaji: string
    }

    // Seion: sonido puro
    // Dakuon: con tenten
    // Handakuon: con puntito
    export type KanaSoundType = 'Seion' | 'Dakuon' | 'Handakuon'

    export type KanaVowel =
        | 'a' | 'i' | 'u' | 'e' | 'o'
        | 'ya' | 'yu' | 'yo'
        | 'n'

    export type KanaConsonant =
        | '-' | '*'  // - para vocales, * para la n
        | 'k' | 's' | 't' | 'n' | 'h'
        | 'm' | 'y' | 'r' | 'w'

    export type Kana = {
        [C in KanaConsonant]?: {
            [V in KanaVowel]?: {
                [S in KanaSoundType]?: KanaEntry
            }
        }
    }

    export const kana: Kana
}
