<template>
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
</template>

<script>
    import XPlayerIcon from "./icons/PlayerX.vue"
    import OPlayerIcon from "./icons/PlayerO.vue"

    export default {
        props: ["tempPlayers", "players", "fields", "gameOver", "tie"],

        methods: {
            gameEndText(player) {
                return this.tie
                    ? "Нічия! Спробуйте ще раз"
                    : "Перемога за гравцем: " + player
            },

            gameRestart() {
                if (this.tempPlayers[0] != this.players[0].name) {
                    this.$emit("setValue", {
                        fieldName: "tempPlayers", 
                        fieldValue: this.tempPlayers.reverse()
                    })
                }

                this.$emit("setValue", {
                    fieldName: "fields", 
                    fieldValue: this.fields.map(item => {
                        return ""
                    })
                })

                this.$emit("setValue", {
                    fieldName: "gameOver", 
                    fieldValue: false
                })
                this.$emit("setValue", {
                    fieldName: "tie", 
                    fieldValue: false
                })
            }
        },

        components: {
            XPlayerIcon,
            OPlayerIcon
        },
    }
</script>