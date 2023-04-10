<template>
    <section class="victory-score">
        <p>Рахунок</p>
        
        <div>
            <div>
                <XPlayerIcon/>
                <span>{{ players[0].winsCount }}</span>
            </div>
            <div>
                <OPlayerIcon/>
                <span>{{ players[1].winsCount }}</span>
            </div>
        </div>
    </section>
</template>

<script>
    import XPlayerIcon from "./icons/PlayerX.vue"
    import OPlayerIcon from "./icons/PlayerO.vue"

    export default { 
        props: ["players"],

        components: {
            XPlayerIcon,
            OPlayerIcon
        }
    }
</script>