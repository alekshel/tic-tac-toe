<template>
    <div class="game">
        <Header
            :players="players"
            :tempPlayers="tempPlayers"
            :fields="fields"
            :gameOver="gameOver"
            :tie="tie"
            :showMenu="showMenu"
            @setValue="setValue"
        />

        <Table
            :players="players"
            :tempPlayers="tempPlayers"
            :fields="fields"
            :gameOver="gameOver"
            :tie="tie"
            @setValue="setValue"
        />

        <VictoryScore
            :players="players"
        />
    </div>
</template>

<script>
    import Table from "./Table.vue"
    import Header from "./Header.vue"
    import VictoryScore from "./VictoryScore.vue"

    export default {
        props: ["showMenu"],

        data() {
            return {
                gameOver: false,
                tie: false,

                tempPlayers: [],
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
                ]
            }
        },

        methods: {
            setValue({fieldName, fieldValue}) {
                if (fieldName.includes(".")) {
                    let field = this

                    fieldName.split(".").forEach(item => {
                        if (typeof field == "object") 
                            field = field[item]
                    })

                    field = fieldValue
                    return
                }

                this[fieldName] = fieldValue
            },

            setTheme(theme) {
                document.documentElement.className = theme
            }
        },

        components: {
            Table,
            Header,
            VictoryScore
        },

        created() {
            this.tempPlayers = [this.players[0].name, this.players[1].name]
        }
    }
</script>

<style scoped>
    .game {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>