const game = {
    letters: [],
    inputedWords: [],
    word: '',
    error: false,
    repeated: false,
    streak: 0,
    newGame: function () {
        this.letters = [];
        this.inputedWords = [];

        let alphabet = 'abcdefghijlmnopqrstuvxz'

        this.letters = new Array(3).fill().map(() => {
            const randomIndex = Math.floor(Math.random() * alphabet.length)
            return alphabet[randomIndex]
        });

        this.word = ''
        this.error = false
        this.repeated = false
        this.streak = 0
    },
    validateWord: async function (word) {
        const containsAllLetters = this.letters.every((letter) => word.includes(letter))
        const rawData = await fetch(`https://api.dicionario-aberto.net/word/${word}`)
        const data = await rawData.json()

        this.repeated = this.inputedWords.includes(word)
        const correct = !!data.length && containsAllLetters

        this.error = !correct
        this.streak += correct && !this.repeated ? 1 : -this.streak

        if (correct) this.inputedWords.push(word);
        return correct
    }
}

export { game }