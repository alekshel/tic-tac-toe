<template>
    <menu>
        <button>{{ $t("menu.gameStart") }}</button>

        <Languages/>

        <div>
            <span :className="theme != 'light' ? 'opacity' : ''">
                {{ $t("menu.lightTheme") }}
            </span>
            <Switcher 
                :checked="theme == 'light' ? false : true"
                @onChange="value => changeTheme(value.checked)"
            />
            <span :className="theme != 'dark' ? 'opacity' : ''">
                {{ $t("menu.darkTheme") }}
            </span>
        </div>
    </menu>
</template>

<script>
    import Switcher from "./Switcher.vue"
    import Languages from "./Languages.vue"

    export default { 
        name: "Menu",
        props: ["theme", "setTheme"],

        methods: {
            changeTheme(value) {
                let theme = value
                    ? "dark"
                    : "light"

                localStorage.setItem("theme", theme)
                this.setTheme(theme)
            }
        },

        components: {
            Switcher,
            Languages
        }
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
        display: flex;
        justify-content: center;
        align-items: center;
    }

    menu div label {
        margin: 0 10px;
    }

    menu div span {
        color: var(--text-color);
        font-weight: bold;
        transition: all .3s ease-out;
    }

    menu div span.opacity {
        opacity: .5;
    }
</style>