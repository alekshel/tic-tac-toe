<template>
    <header>
        <div class="header-line">
            <button 
                class="back-to-menu"
                @click="showMenu"
            >   
                <Back/>
                <span>Меню</span>
            </button>
            <h1>Хрестики нолики</h1>
        </div>

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
    import Back from "./icons/Back.vue"
    import XPlayerIcon from "./icons/PlayerX.vue"
    import OPlayerIcon from "./icons/PlayerO.vue"

    export default {
        props: ["showMenu", "tempPlayers", "players", "fields", "gameOver", "tie"],

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
            Back,
            XPlayerIcon,
            OPlayerIcon
        },
    }
</script>

<style scoped>
    .header-line {
        display: flex;
        align-items: center;
    }

    .back-to-menu {
        display: flex;
        align-items: center;
        padding: 3px 6px;
        margin-right: 20px;
        
        border: 0;
        border-radius: 4px;

        color: var(--text-color-reverse) !important;
        background: var(--color-background-reverse);

        transition: all .3s ease-out;
        cursor: pointer;
    }

    .back-to-menu:hover {
        opacity: .8;
    }

    .back-to-menu svg {
        width: 15px;
    }
</style>