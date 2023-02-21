<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUser } from '@/stores/user'

import Dialog from '../containment/Dialog.vue'

const userStore = useUser()
const { user } = storeToRefs(userStore)
const dialog = ref<InstanceType<typeof Dialog> | null>(null)

const changeMod = (mod: number) => userStore.update({ group: mod })

const isPremium = false
const shop = () => { alert('shop') }
</script>


<template>
   
    <Teleport to="body">
        <Dialog
            headline="Mode Selection"
            ref="dialog"
        >
            <button
                v-if="isPremium"
                v-for="mod in [2, 4, 6]"
                class="mod"
                :class="[mod === user?.group && 'selected']"
                @click="changeMod(mod); dialog?.close()"
            >
                {{ mod }} Guests
            </button>

            <template v-else>
                <button
                    class="mod selected"
                    @click="dialog?.close()"
                >
                    2 Guests
                </button>

                <div
                    class="premium"
                    @click="shop"
                >
                    <div class="premium__title"> 4/6 Guests </div>
                    <div class="premium__price"> $2,50 </div>
                </div>
            </template>
        </Dialog>
    </Teleport>

    <span 
        class="material-icons"
        @click="dialog?.open()"
    >
        person
    </span>

</template>


<style scoped lang="scss">
.mod {
    width: 75%;
    max-width: 160px;
    border-radius: $medium-rounded;
    border: 1px solid var(--md-sys-color-primary);
    padding: 17px 0;
    @include minHSize(720px) { padding: 19px 0 }

    &.selected { background-color: var(--md-sys-color-on-secondary) }
}

.premium {
    height: 76px;
    max-width: 170px;
    width: 90%;
    border-radius: $medium-rounded;
    border: 1px solid var(--md-sys-color-primary);
    @include flex($direction: column);
    gap: 4px;
    margin-top: 5px;
    
    &__title { 
        @extend %title-large;
        font-weight: 500;
    }
    &__price { 
        @extend %label-large;
        font-size: 16px;
    }
}

:deep(.body) {
    @include flex($direction: column);
    gap: 20px;
}

:deep(.dialog) {
    width: 65vw; // temporany
    padding: 8vh 24px;
}

:deep(.content) {
    align-items: center!important;
    padding-bottom: 0;
    gap: 30px;
}

:deep(.headline) {
    font-weight: 500;
    white-space: nowrap;
}
</style>