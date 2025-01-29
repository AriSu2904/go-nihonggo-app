const material = {
    HIRAGANA: 'HIRAGANA',
    KATAKANA: 'KATAKANA',
    KANJI5: 'KANJI N5',
}

export const setMaterialBg = (materialName: string) => {
    switch (materialName) {
        case material.HIRAGANA:
            return 'bg-red-300';
        case material.KATAKANA:
            return 'bg-blue-300';
        case material.KANJI5:
            return 'bg-green-300';
        default:
            return 'bg-white';
    }
}