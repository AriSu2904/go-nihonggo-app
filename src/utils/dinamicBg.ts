const material = {
    HIRAGANA: 'HIRAGANA',
    KATAKANA: 'KATAKANA',
    KANJI5: 'KANJI N5',
}

export const setMaterialBg = (materialName: string) => {
    switch (materialName) {
        case material.HIRAGANA:
            return 'bg-red-400';
        case material.KATAKANA:
            return 'bg-blue-400';
        case material.KANJI5:
            return 'bg-green-400';
        default:
            return 'bg-white';
    }
}