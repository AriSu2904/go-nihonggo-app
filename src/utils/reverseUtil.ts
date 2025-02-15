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


const sections = {
    FIRST: 'FIRST',
    SECOND: 'SECOND',
    THIRD: 'THIRD',
}

const reverseSections = {
    ONE: 'Section 1',
    TWO: 'Section 2',
    THREE: 'Section 3',
}

const letterType = {
    LETTER: "Main Letters",
    HANDAKUTEN: "Dakuten(゛) & Handakuten(゜)",
    YOON: "Yōon (拗音)"
}

const description = {
    MAIN_LETTER: {
        SECTION_1: "vowels, ka-gyō, and sa-gyō",
        SECTION_2: "ta-gyō, na-gyō, and ha-gyō",
        SECTION_3: "ma, ya, ra, wa-gyō",
    }
}

export const getSection = (section: string) => {
    switch (section) {
        case sections.FIRST:
            return reverseSections.ONE;
        case sections.SECOND:
            return reverseSections.TWO;
        case sections.THIRD:
            return reverseSections.THREE;
        default:
            return null;
    }
}

export const setSections = (section: string, type: string) => {
    if (type === letterType.LETTER) {
        switch (section) {
            case sections.FIRST:
                return {
                    title: reverseSections.ONE,
                    description: description.MAIN_LETTER.SECTION_1
                }
            case sections.SECOND:
                return {
                    title: reverseSections.TWO,
                    description: description.MAIN_LETTER.SECTION_2
                }

            case sections.THIRD:
                return {
                    title: reverseSections.THREE,
                    description: description.MAIN_LETTER.SECTION_3
                }
            default:
                return {
                    title: null,
                    description: null
                };
        }
    }

    if (type === letterType.HANDAKUTEN) {
        switch (section) {
            case sections.FIRST:
                return {
                    title: reverseSections.ONE,
                    description: description.MAIN_LETTER.SECTION_1
                }
            case sections.SECOND:
                return {
                    title: reverseSections.TWO,
                    description: description.MAIN_LETTER.SECTION_2
                }

            case sections.THIRD:
                return {
                    title: reverseSections.THREE,
                    description: description.MAIN_LETTER.SECTION_3
                }
            default:
                return {
                    title: null,
                    description: null
                };
        }
    }

    if (type === letterType.YOON) {
        switch (section) {
            case sections.FIRST:
                return {
                    title: reverseSections.ONE,
                    description: description.MAIN_LETTER.SECTION_1
                }
            case sections.SECOND:
                return {
                    title: reverseSections.TWO,
                    description: description.MAIN_LETTER.SECTION_2
                }

            case sections.THIRD:
                return {
                    title: reverseSections.THREE,
                    description: description.MAIN_LETTER.SECTION_3
                }
            default:
                return {
                    title: null,
                    description: null
                };
        }
    }
}

export const latestPoint = (history: any, section: string) => {
    const highestPoint = history.find((item: any) => item.section === section);
    const length = highestPoint.scores.length;

    return highestPoint.scores[length - 1];
}

export const hasLatestPoint = (history: any, section: string) => {
    const highestPoint = history.find((item: any) => item.section === section);

    return highestPoint?.inquiryUsed;
}

export const hasHistoryInCurrentSection = (history: any[], section: string) => {
    if (section === sections.FIRST) {
        return true;
    }

    if (section === sections.SECOND) {
        return history.length >= 1 && history[0].inquiryUsed;
    }

    if (section === sections.THIRD) {
        return history.length >= 2 && history[1].inquiryUsed;
    }

    return false;
};

const perfectScoreMessages = [
    "🔥 GG! You're a genius!",
    "🎯 100%! you're unstoppable!",
    "🚀 Perfect! You're on fire!",
    "🏆 Flawless victory!",
    "🌟 You nailed it all!"
];

const highScoreMessages = [
    "💪 Great job!",
    "🔥 Solid effort!",
    "🚀 Almost there!",
    "🎯 Well played!",
    "🏆 Impressive!"
];

const lowScoreMessages = [
    "📚 Every mistake is a lesson!",
    "🔥 you're learning and improving!",
    "💪 A bit more practice and you’ll ace it!",
    "🚀 Progress takes time! Keep at it!",
    "🎯 The next one will be better!"
];

export function randomMessageContext (score: number, totalQuestions: number) {
    const percentage = (score / totalQuestions) * 100;

    if (percentage === 100) {
        return perfectScoreMessages[Math.floor(Math.random() * perfectScoreMessages.length)];
    } else if (percentage > 50) {
        return highScoreMessages[Math.floor(Math.random() * highScoreMessages.length)];
    } else {
        return lowScoreMessages[Math.floor(Math.random() * lowScoreMessages.length)];
    }
};

export const randomIcons = () => {
    const icons = ["🔥", "🎯", "🚀", "🏆", "🌟", "💪", "📚"];
    const index = Math.floor(Math.random() * icons.length);
    return icons[index];
}