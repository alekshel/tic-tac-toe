<template>
    <div class="languages">

        <button
            v-for="language, index in languages"
            :key="index"
            @click="setLanguage(language)"
            :className="language.status ? 'active' : ''"
        >{{ language.title }}</button>

    </div>
</template>

<script>
    export default { 
        data() {
            return {
                languages: [
                    {
                        title: "Українська",
                        name: "uk",
                        status: false
                    },

                    {
                        title: "English",
                        name: "en",
                        status: false
                    }
                ],
            }
        },

        methods: {
            setStatus(name) {
                this.languages.filter(language => {
                    if (language.name == name) {
                        language.status = true
                    }
                })
            },

            setLanguage(language) {
                this.clear()

                this.$i18n.locale = language.name
                localStorage.setItem("language", language.name)
                
                this.setStatus(language.name)
            },

            clear() {
                this.languages.forEach(language => {
                    language.status = false
                })
            }
        },

        mounted() {
            this.setStatus(this.$i18n.locale)
        }
    }
</script>

<style scoped>
    .languages {
        margin-bottom: 50px;
    }

    .languages button {
        padding: 5px 10px;
        border: 0;
        border-radius: 4px;
        color: var(--text-color-reverse);
        background: var(--text-color);
        
        transition: all .3s ease-out;
        cursor: pointer;
    }

    .languages button:nth-last-child(n+2) {
        margin-right: 10px;
    }

    .languages button:hover {
        opacity: .8;
    }

    .languages button.active {
        color: var(--const-white);
        background: var(--const-red);
    }
</style>