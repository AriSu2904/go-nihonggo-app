const quizLevel = {
    MAIN_LETTER: {
        LEVEL: 1,
        NAME: "Main Letter",
    },
    HANDAKUTEN: {
        LEVEL: 2,
        NAME: "Ten&Maru",
    },
    YOON: {
        LEVEL: 3,
        NAME: "Yōon (拗音)",
    }
}

export const generateQuizName = (level: number) => {
    return Object.values(quizLevel).find((quiz) => quiz.LEVEL === level)?.NAME;
}