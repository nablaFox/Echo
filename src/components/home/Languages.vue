<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUser } from '@/stores/user'

import Dialog from '../containment/Dialog.vue'
import ListItem from '../containment/ListItem.vue'
import Icon from '../actions/Icon.vue'

const userStore = useUser()
const { user } = storeToRefs(userStore)
const dialog = ref<InstanceType<typeof Dialog> | null>(null)

const languages = {
    English: 'EN',
    Français: 'FR',
    Español: 'ESP',
    Deutsch: 'DE',
    Italiano: 'IT',
    Русский: 'RUS'
}

const selected = ref<Array<string>>(user?.value?.languages)

const updateLang = () => userStore.update({ languages: selected.value })

function changeLang(event: any, iso: string) {
    if (
        selected.value.length == 1
        && !event.target.checked
    ) { 
        event.target.checked = true
        return
    }
    
    selected.value.includes(iso) ?
    selected.value.splice(selected.value.indexOf(iso), 1) :
    selected.value.push(iso)
}
</script>


<template>

    <Teleport to="body">
        <Dialog
            ref="dialog"
            headline="Language Selection"
            supporting-text="Diversity is funny!"
            divider
            :actions="['Cancel', 'Ok']"
            @confirm="updateLang"
        >
            <ListItem
                v-for="iso, language in languages"
                :headline="language"
            >
                <template #trailing>
                    <input 
                        type="checkbox" 
                        :checked="user?.languages.includes(iso)"
                        @change.prevent="e => changeLang(e, iso)"
                    >
                </template>
            </ListItem>
        </Dialog>
    </Teleport>

    <Icon 
        icon="language"
        @click="dialog?.open()" 
    />

</template>


<style scoped lang="scss">
:deep(.body) {
    max-height: 23vh;
    overflow: scroll;
}

.list-item:active::before { opacity: 0 }
</style>