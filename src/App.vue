<template>
    <main>
        <Game v-if="gameStart == true"/>
    </main>
</template>

<script>
    import Game from "./components/Game.vue"

    export default { 
        data() {
            return {
                gameStart: false
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
            Game
        },

        created() {
            this.setTheme("light")
        }
    }
</script>