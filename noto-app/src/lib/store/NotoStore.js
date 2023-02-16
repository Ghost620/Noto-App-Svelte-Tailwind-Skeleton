// @ts-nocheck
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const isNotes = writable(false);

const data = browser ? JSON.parse(window.localStorage.getItem('user')) ?? 'false' : 'false'

export const notos = writable(data)
