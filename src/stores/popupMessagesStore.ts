import { writable } from 'svelte/store';

const messagePopUpStore = writable([]);


export const popUpMessageStore = {
    subscribe: messagePopUpStore.subscribe,
    addMessage: (message: string) => {
        messagePopUpStore.update((existingMessages) => {
            return [message, ...existingMessages]
        })
    },
    removeMessage: (index: number) => {
        messagePopUpStore.update((existingMessages) => {
            existingMessages.splice(index, 1)
            return existingMessages
        })
    }
};
