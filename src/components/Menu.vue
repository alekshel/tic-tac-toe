<template>
    <menu>
        <button>Почати гру</button>
        <Switcher 
            :defValue="theme"
            @onChange="value => changeTheme(value.checked)"
        />
    </menu>
</template>

<script>
    import Switcher from "./Switcher.vue"

    export default { 
        props: ["theme", "setTheme"],

        methods: {
            changeTheme(value) {
                if (value) {
                    this.setTheme("dark")
                    return
                }
                this.setTheme("light")
            }
        },

        components: {
            Switcher
        },
    }
</script>

<style scoped>
    menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
    }

    menu button,
    menu div {
        width: 250px;
    }

    menu button {
        height: 55px;
        margin-bottom: 20px;

        font-size: 18px;
        text-transform: uppercase;
        font-weight: bold;
        color: var(--const-red);

        border: 4px solid var(--const-red);
        border-radius: 6px;
        background: none;

        transition: all .3s ease-out;
        cursor: pointer;
    }

    menu button:hover {
        color: var(--const-white);
        background: var(--const-red);;
    }

    menu div {
        width: 250px;
    }
</style>