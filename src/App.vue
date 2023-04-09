<template>

    <main>
        <header>
            <h1>Хрестики нолики</h1>
            <section class="game-info">
                <div v-if="!gameOver">
                    <p>Хід гравця: </p>
                    <XPlayerIcon v-if="tempPlayers[0] == players[0].name"/>
                    <OPlayerIcon v-if="tempPlayers[0] == players[1].name"/>
                </div>
                <div v-else>
                    <p>{{ this.gameEndText(this.tempPlayers[0]) }}</p>
                    <button @click="gameRestart">Перезавантажити</button>
                </div>
            </section> 
        </header>

        <section class="table">
            <div 
                class="field"
                v-for="field, key in fields"
                :key="key"
                @click="setFieldValue(key)"
            >
                <XPlayerIcon v-if="field == players[0].name"/>
                <OPlayerIcon v-if="field == players[1].name"/>
            </div>
        </section>

        <section class="victory-score">
            <p>Рахунок</p>
            <div>
                <XPlayerIcon/>
                <span>{{ players[0].winsCount }}</span>
            </div>
            <div>
                <OPlayerIcon/>
                <span>{{ players[1].winsCount }}</span>
            </div>
        </section>
    </main>

</template>

<script>
    import XPlayerIcon from "./components/icons/PlayerX.vue"
    import OPlayerIcon from "./components/icons/PlayerO.vue"

    export default { 
        data() {
            return {
                gameOver: false,
                tie: false,

                players: [
                    {
                        name: "X",
                        winsCount: 0
                    },
                    {
                        name: "O",
                        winsCount: 0
                    }
                ],

                fields: [
                    "", "", "", "", "", "", "", "", ""
                ],

                winCombinations: [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [6, 4, 2],
                ],
            }
        },

        methods: {
            gameEndText(player) {
                return this.tie
                    ? "Нічия! Спробуйте ще раз"
                    : "Перемога за гравцем: " + player
            },

            setFieldValue(key) {
                if (this.gameOver) {
                    return false
                }

                if (!this.fields[key]) {
                    this.fields[key] = this.tempPlayers[0]
                }

                if (this.winCheck(this.tempPlayers[0])) {
                    this.gameOver = true
                    this.players.filter(player => {
                        if (player.name == this.tempPlayers[0]) {
                            player.winsCount++
                        }
                    })
                    return
                }

                if (this.isTie()) {
                    this.tie = true
                    this.gameOver = true
                    return
                }

                this.tempPlayers.reverse()
            },

            winCheck(player) {
                let win = false
                let combinations = this.getCombinationsByPlayer(player)

                for (let index = 0; index < this.winCombinations.length; index++) {
                    const winCombination = this.winCombinations[index]
                    
                    if (winCombination.every(item => combinations.includes(item))) {
                        return true
                    }
                }
                return win
            },

            getCombinationsByPlayer(player) {
                let combinations = []

                this.fields.forEach((value, key) => {
                    if (player == value) {
                        combinations.push(key)
                    }
                })

                return combinations
            },

            gameRestart() {
                if (this.tempPlayers[0] != this.players[0].name) {
                    this.tempPlayers.reverse()
                }

                this.fields = this.fields.map(item => {
                    return ""
                })

                this.gameOver = false
            },

            isTie() {
                return this.fields.filter(
                    item => item == ""
                ).length == 0
            }
        },

        components: {
            XPlayerIcon,
            OPlayerIcon
        },

        created() {
            this.tempPlayers = [this.players[0].name, this.players[1].name]
        }
    }
</script>