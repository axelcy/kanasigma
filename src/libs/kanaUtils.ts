import type { KanaPair } from '@/types/kana'
import { kana as japaneseJson, type KanaEntry } from 'japanese-json'

const seionList: KanaEntry[] = Object.values(japaneseJson).flatMap(consonant => 
    Object.values(consonant).flatMap(vowel => 
        Object.values(vowel).map(seion => seion)
    )
)

function extractKanas(type: 'Hiragana' | 'Katakana' | 'Romanji'): string[] {
    const result: string[] = []
    seionList.forEach(seion => {
        if (type === 'Hiragana') result.push(seion.Hiragana)
        else if (type === 'Katakana') result.push(seion.Katakana)
        else result.push(seion.Romaji)
    })
    return result
}

function createKanaMap(): { hiraPairs: KanaPair[], kanaPairs: KanaPair[] } {
    const hiraPairs: KanaPair[] = [], kanaPairs: KanaPair[] = []
    seionList.forEach(seion => {
        hiraPairs.push({ kana: seion.Hiragana, romaji: seion.Romaji })
        kanaPairs.push({ kana: seion.Katakana, romaji: seion.Romaji })
    })
    return { hiraPairs, kanaPairs }
}

// letters
export const hiraganas: string[] = extractKanas('Hiragana')
export const katakanas: string[] = extractKanas('Katakana')
export const allKanas: string[] = [...hiraganas, ...katakanas]
export const romanjis: string[] = extractKanas('Romanji')

// pairs
const allPairsObj = createKanaMap()
export const hiraPairs: KanaPair[] = allPairsObj.hiraPairs
export const kanaPairs: KanaPair[] = allPairsObj.kanaPairs
export const allPairs = [...allPairsObj.hiraPairs, ...allPairsObj.kanaPairs]

// function
export function matchKanaPair(kanaPair: KanaPair): boolean {
    console.log(`matchKana: ${kanaPair}`)
    return true
}


export function getRandomRomanji(): string {
    return romanjis[Math.floor(Math.random() * romanjis.length)]
}

export function getRandomKana(): string {
    return allKanas[Math.floor(Math.random() * allKanas.length)]
}

export function getRandomKanaPair(kanas: KanaPair[] = allPairs): KanaPair {
    return kanas[Math.floor(Math.random() * kanas.length)]
}