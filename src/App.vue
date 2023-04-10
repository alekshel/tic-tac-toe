<template>
    <main>
        <Menu 
            :theme="theme"
            :setTheme="setTheme"
        />
        <Game v-if="gameStart == true"/>
    </main>
</template>

<script>
    import Menu from "./components/Menu.vue"
    import Game from "./components/Game.vue"

    export default { 
        data() {
            return {
                theme: "light",
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
            Menu,
            Game
        },

        created() {
            this.setTheme(this.theme)
        }
    }
</script>