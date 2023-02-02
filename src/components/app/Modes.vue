<script setup lang="ts">
import Dialog from '../containment/Dialog.vue'
import { useUser } from '@/stores/user'

const userStore = useUser()
const dialog = <InstanceType<typeof Dialog> | null>(null)

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
}

:deep(.body) {
    @include flex($direction: column);
    gap: 10px;
}

:deep(.dialog) {
    width: 200px;
}

:deep(.content) {
    align-items: center!important;;
}
</style>