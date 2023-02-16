// @ts-nocheck
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const isNotes = writable(false);

const data = browser ? JSON.parse(window.localStorage.getItem('noto-list')) ?? [] : []

export const notos = writable(data)
