// @ts-nocheck
import { v4 as uuidv4 } from 'uuid';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const isNotes = writable(false);

const data = browser ? JSON.parse(window.localStorage.getItem('noto-list')) ?? [] : []

export const notos = writable(data)

notos.subscribe((value) => {
    if (browser) {
        localStorage.setItem('noto-list', JSON.stringify(value))
    }
})



export const addTodo = () => {
    notos.update((currentTodos) => {
        return [...currentTodos, {id: uuidv4(), text: '', complete: false}]
    })
}

// @ts-ignore
export const deleteTodo = (id) => {
    notos.update((currentTodos) => {
        // @ts-ignore
        return currentTodos.filter((todo) => todo.id !== id)
    })
}

export const addNotes = () => {
    notos.update((currentNotes) => {
        return [...currentNotes, {id: uuidv4(), text: '', complete: false}]
    })
}

// @ts-ignore
export const deleteNotes = (id) => {
    notos.update((currentNotes) => {
        // @ts-ignore
        return currentNotes.filter((note) => note.id !== id)
    })
}




// @ts-ignore
export const toggleComplete = (id) => {
    notos.update((currentTodos) => {
        // @ts-ignore
        return currentTodos.map((todo) => {
            if (todo.id === id){
                return {...todo, complete: !todo.complete}
            }
            return todo
        })
    })
}

// @ts-ignore
export const editTodo = (id, text) => {
    notos.update((currentTodos) => {
        // @ts-ignore
        return currentTodos.map((todo) => {
            if (todo.id === id){
                return {...todo, text}
            }
            return todo
        })
    })
}