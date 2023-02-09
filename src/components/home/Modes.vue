<script setup lang="ts">
import { ref } from 'vue';
import { useUser } from '@/stores/user'

import Dialog from '../containment/Dialog.vue'

const userStore = useUser()
const dialog = ref<InstanceType<typeof Dialog> | null>(null)

const modes = [2, 4, 6]
const changeMod = (mod: number) => userStore.update({ group: mod })
</script>


<template>

    <Dialog
        headline="Mode"
        ref="dialog"
    > 
        <template #body>
            <button
                v-for="mod in modes"
                class="mod"
                @click="changeMod(mod); dialog?.close()"
            >
                {{ mod }}
            </button>
        </template>
    </Dialog>

    <span 
        class="material-icons"
        @click="dialog?.open()"
    >
        person
    </span>

</template>


<style scoped lang="scss">
.mod {
    width: 100%;
    height: 80px;
    border-radius: $medium-rounded;
    background-color: var(--md-sys-color-surface2);
    @include maxHSize(719px) { height: 70px }
}

:deep(.body) {
    @include flex($direction: column);
    gap: 10px;
}

:deep(.dialog) {
    width: 200px; // temporany
}

:deep(.content) {
    align-items: center!important;;
}
</style>