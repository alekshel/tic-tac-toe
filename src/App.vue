<template>
    <main>
        <Menu 
            v-show="!gameStart"
            :theme="theme"
            :setTheme="setTheme"
            @chageMode="changeMenuMode"
        />
        <Game 
            v-show="gameStart"
            :showMenu="changeMenuMode"
        />
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
            changeMenuMode() {
                this.gameStart = !this.gameStart
            },
            
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
                this.theme = theme
                document.documentElement.className = theme
            }
        },

        components: {
            Menu,
            Game
        },

        created() {
            if (window?.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.theme = "dark"
            }

            if (localStorage.getItem("theme")) {
                this.theme = localStorage.getItem("theme")
            }

            this.setTheme(this.theme)
        }
    }
</script>