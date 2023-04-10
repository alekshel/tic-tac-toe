<template>
    <section class="table">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>

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
</template>

<script>
    import XPlayerIcon from "./icons/PlayerX.vue"
    import OPlayerIcon from "./icons/PlayerO.vue"

    export default { 
        data() {
            return {
                winCombinations: [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [6, 4, 2],
                ]
            }
        },

        props: ["tempPlayers", "players", "fields", "gameOver", "tie"],

        methods: {
            setFieldValue(key) {
                if (this.gameOver) {
                    return false
                }

                if (!this.fields[key]) {
                    this.fields[key] = this.tempPlayers[0]
                }

                if (this.winCheck(this.tempPlayers[0])) {
                    this.$emit("setValue", {
                        fieldName: "gameOver", 
                        fieldValue: true
                    })

                    this.players.filter(player => {
                        if (player.name == this.tempPlayers[0]) {
                            this.$emit("setValue", {
                                fieldName: "player.winsCount", 
                                fieldValue: player.winsCount++
                            })
                        }
                    })
                    return
                }

                if (this.isTie()) {
                    this.$emit("setValue", {
                        fieldName: "gameOver", 
                        fieldValue: true
                    })

                    this.$emit("setValue", {
                        fieldName: "tie", 
                        fieldValue: true
                    })

                    return
                }

                this.$emit("setValue", {
                    fieldName: "tempPlayers", 
                    fieldValue: this.tempPlayers.reverse()
                })
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

            isTie() {
                return this.fields.filter(
                    item => item == ""
                ).length == 0
            }
        },

        components: {
            XPlayerIcon,
            OPlayerIcon
        }
    }
</script>